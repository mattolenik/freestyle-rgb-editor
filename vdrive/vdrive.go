package vdrive

import (
	"context"
	"errors"
	"fmt"
	"kinesis-customizer/keyboard"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strings"
	"time"
)

type VolumeInfo struct {
	Volume, MountPoint string
}

func (vi *VolumeInfo) String() string {
	return fmt.Sprintf("%q [%s]", vi.MountPoint, vi.Volume)
}

func (vi *VolumeInfo) Path(parts ...string) string {
	return filepath.Join(append([]string{vi.MountPoint}, parts...)...)
}

type VDrive interface {
	GetVolumeInfo() (*VolumeInfo, error)
	Unmount() (*VolumeInfo, error)
	Watch(context.Context)
}

type keyboardVDrive struct {
	VDrive
	name keyboard.KeyboardName
}

func New(kbName keyboard.KeyboardName) VDrive {
	return &keyboardVDrive{name: kbName}
}

func (d *keyboardVDrive) GetVolumeInfo() (*VolumeInfo, error) {
	volumeScript := volumeInfoCommand(d.name)
	cmd := exec.Command("/bin/sh", "-c", volumeScript)
	out, err := cmd.Output()
	if err != nil {
		return nil, fmt.Errorf("failed trying to find volume info for keyboard %q: %w", d.name, err)
	}
	outStr := strings.TrimSpace(string(out))
	if len(outStr) == 0 {
		return nil, nil
	}
	parts := strings.Split(outStr, ",")
	if len(parts) != 2 {
		return nil, fmt.Errorf("invalid volume info: %q", outStr)
	}
	return &VolumeInfo{
		Volume:     parts[0],
		MountPoint: parts[1],
	}, nil
}

func (d *keyboardVDrive) Unmount() (*VolumeInfo, error) {
	vi, err := d.GetVolumeInfo()
	if err != nil {
		return nil, fmt.Errorf("failed to check if keyboard %s's vdrive is mounted: %w", d.name, err)
	}
	if vi == nil {
		// Not mounted
		return nil, nil
	}
	cmd := unmountCommand(vi.Volume)
	out, err := cmd.CombinedOutput()
	if err != nil {
		return nil, fmt.Errorf("failed to unmount vdrive for keyboard %s: %w", d.name, err)
	}
	fmt.Println(strings.TrimSpace(string(out)))
	return vi, nil
}

func (d *keyboardVDrive) Watch(ctx context.Context) {
	var currentVolInfo *VolumeInfo
	for {
		select {
		case <-ctx.Done():
			return
		default:
			vol, err := d.GetVolumeInfo()
			if err != nil {
				fmt.Printf("ERROR: can't get volume info: %v\n", err)
			} else if currentVolInfo == nil && vol != nil {
				fmt.Printf("Mounted %v\n", vol)
				currentVolInfo = vol
				info, err := d.readVersionInfo(vol)
				if err != nil {
					fmt.Printf("ERROR: failed reading version info: %v\n", err)
				} else {
					fmt.Printf("%#v\n", info)
				}
			} else if currentVolInfo != nil && vol == nil {
				// no longer mounted
				fmt.Printf("Unmounted %v\n", currentVolInfo)
				currentVolInfo = nil
			}
		}
		time.Sleep(100 * time.Millisecond)
	}
}

func volumeInfoCommand(kbName keyboard.KeyboardName) string {
	switch runtime.GOOS {
	case "windows":
		panic("windows not supported yet")
	default:
		return fmt.Sprintf(`mount | awk -F'[(]| on ' '/%s/ {print $1","$2}'`, kbName)
	}
}

func unmountCommand(volume string) *exec.Cmd {
	switch runtime.GOOS {
	case "windows":
		panic("windows not supported yet")
	case "darwin":
		return exec.Command("diskutil", "unmount", volume)
	default:
		return exec.Command("umount", volume)
	}
}

// FirmwareInfo holds detailed firmware information
type FirmwareInfo struct {
	Version     string
	FileSize    string
	ReleaseDate string
}

// VersionInfo holds information about the keyboard
type VersionInfo struct {
	ModelName        string
	KeyboardFirmware FirmwareInfo
	LEDFirmware      string
	LEDBootloader    string
}

func (d *keyboardVDrive) ReadVersionInfo() (*VersionInfo, error) {
	vi, err := d.GetVolumeInfo()
	if err != nil {
		return nil, fmt.Errorf("couldn't find keyboard volume when trying to read version info: %w", err)
	}
	return d.readVersionInfo(vi)
}

// ReadKeyboardInfo converts the parsed firmware map into a strongly typed KeyboardInfo struct
func (d *keyboardVDrive) readVersionInfo(vi *VolumeInfo) (*VersionInfo, error) {
	data, err := readVersionFile(vi.Path("firmware", "version.txt"))
	if err != nil {
		return nil, fmt.Errorf("failed to read keyboard info: %w", err)
	}
	// Create the KeyboardInfo instance
	info := &VersionInfo{}
	var ok bool

	// Map the raw data to the appropriate fields
	if info.ModelName, ok = data["Model name"]; !ok {
		fmt.Println("No model name found")
	}

	if kbdFirmware, ok := data["KBD Firmware"]; ok {
		// Use strings.FieldsFunc to split the firmware string based on custom delimiters
		parts := strings.FieldsFunc(kbdFirmware, func(c rune) bool {
			return c == ',' || c == '(' || c == ')' || c == ' '
		})

		// Ensure that we have enough parts to populate the FirmwareInfo
		if len(parts) < 3 {
			return nil, fmt.Errorf("invalid KBD Firmware format: %s", kbdFirmware)
		}

		// Populate the FirmwareInfo struct
		info.KeyboardFirmware = FirmwareInfo{
			Version:     parts[0],
			FileSize:    parts[1],
			ReleaseDate: parts[2],
		}
	} else {
		fmt.Println("No keyboard firmware info found")
	}

	if info.LEDFirmware, ok = data["LED Firmware"]; !ok {
		fmt.Println("No LED firmware info found")
	}

	if info.LEDBootloader, ok = data["LED Bootloader"]; !ok {
		fmt.Println("No LED bootloader info found")
	}

	return info, nil
}

// readVersionFile reads the data from a file specified by filePath and parses it into a map.
// It splits each line at the first colon, using the left half as the key and the right half as the value.
func readVersionFile(filePath string) (map[string]string, error) {
	// Read the entire file content
	data, err := os.ReadFile(filePath)
	if err != nil {
		return nil, err
	}

	// Create a map to store the parsed key-value pairs
	firmwareInfo := make(map[string]string)

	// Split the content into lines
	lines := strings.Split(string(data), "\n")
	for _, line := range lines {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		// Split the line by the first colon
		parts := strings.SplitN(line, ":", 2)

		// Check if the split produced both key and value
		if len(parts) != 2 {
			return nil, errors.New("invalid line format: missing colon")
		}

		// Trim any leading or trailing whitespace
		key := strings.TrimSpace(parts[0])
		value := strings.TrimSpace(parts[1])

		// Store the key-value pair in the map
		firmwareInfo[key] = value
	}

	return firmwareInfo, nil
}
