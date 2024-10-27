package vdrive

import (
	"errors"
	"fmt"
	"kinesis-customizer/maps"
	"os"
	"os/exec"
	"runtime"
	"strings"
)

const FSEdgeRGB = "FS EDGE RGB"

type VolumeInfo struct {
	Volume, MountPoint string
}

func GetVolumeInfo(kbName string) (*VolumeInfo, error) {
	volumeScript := volumeInfoCommand(kbName)
	cmd := exec.Command("sh", "-c", volumeScript)
	out, err := cmd.Output()
	if err != nil {
		return nil, fmt.Errorf("failed trying to find volume info for keyboard %q: %w", kbName, err)
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

func Unmount(kbName string) error {
	vi, err := GetVolumeInfo(kbName)
	if err != nil {
		return fmt.Errorf("failed to check if keyboard %s's vdrive is mounted: %w", kbName, err)
	}
	cmd := unmountCommand(vi.Volume)
	err = cmd.Run()
	if err != nil {
		return fmt.Errorf("failed to unmount vdrive for keyboard %s: %w", kbName, err)
	}
	return nil
}

func volumeInfoCommand(kbName string) string {
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
		return exec.Command("diskutil", "eject", volume)
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

// KeyboardInfo holds information about the keyboard
type KeyboardInfo struct {
	ModelName        string
	KeyboardFirmware FirmwareInfo
	LEDFirmware      string
	LEDBootloader    string
}

// ReadKeyboardInfo converts the parsed firmware map into a strongly typed KeyboardInfo struct
func ReadKeyboardInfo(filePath string) (*KeyboardInfo, error) {
	data, err := readVersionInfo(filePath)
	if err != nil {
		return nil, fmt.Errorf("failed to read keyboard info: %w", err)
	}
	// Create the KeyboardInfo instance
	info := &KeyboardInfo{}
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

// readVersionInfo reads the data from a file specified by filePath and parses it into a map.
// It splits each line at the first colon, using the left half as the key and the right half as the value.
func readVersionInfo(filePath string) (map[string]string, error) {
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

type KeyInfo struct {
	ID, Name string
}

var FSEdgeRGBKeys = maps.ToStableMap([]*KeyInfo{
	{ID: "hk0", Name: "«"},
	{ID: "esc", Name: "Escape"},
	{ID: "F1", Name: "F1"},
	{ID: "F2", Name: "F2"},
	{ID: "F3", Name: "F3"},
	{ID: "F4", Name: "F4"},
	{ID: "F5", Name: "F5"},
	{ID: "F6", Name: "F6"},
	{ID: "F7", Name: "F7"},
	{ID: "F8", Name: "F8"},
	{ID: "F9", Name: "F9"},
	{ID: "F10", Name: "F10"},
	{ID: "F11", Name: "F11"},
	{ID: "F12", Name: "F12"},
	{ID: "prnt", Name: "Printscreen"},
	{ID: "pause", Name: "Pause"},
	{ID: "del", Name: "Delete"},
	{ID: "hk1", Name: "①"},
	{ID: "hk2", Name: "②"},
	{ID: "tilde", Name: "Tilde"},
	{ID: "1", Name: "1"},
	{ID: "2", Name: "2"},
	{ID: "3", Name: "3"},
	{ID: "4", Name: "4"},
	{ID: "5", Name: "5"},
	{ID: "6", Name: "6"},
	{ID: "7", Name: "7"},
	{ID: "8", Name: "8"},
	{ID: "9", Name: "9"},
	{ID: "0", Name: "0"},
	{ID: "hyph", Name: "Hyphen"},
	{ID: "=", Name: "Equals"},
	{ID: "bspc", Name: "Backspace"},
	{ID: "home", Name: "Home"},
	{ID: "hk3", Name: "③"},
	{ID: "hk4", Name: "④"},
	{ID: "tab", Name: "Tab"},
	{ID: "q", Name: "Q"},
	{ID: "w", Name: "W"},
	{ID: "e", Name: "E"},
	{ID: "r", Name: "R"},
	{ID: "t", Name: "T"},
	{ID: "y", Name: "Y"},
	{ID: "u", Name: "U"},
	{ID: "i", Name: "I"},
	{ID: "o", Name: "O"},
	{ID: "p", Name: "P"},
	{ID: "obrk", Name: "Bracket Open"},
	{ID: "cbrk", Name: "Bracket Close"},
	{ID: `\`, Name: "Backslash"},
	{ID: "end", Name: "End"},
	{ID: "hk5", Name: "⑤"},
	{ID: "hk6", Name: "⑥"},
	{ID: "caps", Name: "Capslock"},
	{ID: "a", Name: "A"},
	{ID: "s", Name: "S"},
	{ID: "d", Name: "D"},
	{ID: "f", Name: "F"},
	{ID: "g", Name: "G"},
	{ID: "h", Name: "H"},
	{ID: "j", Name: "J"},
	{ID: "k", Name: "K"},
	{ID: "l", Name: "L"},
	{ID: "colon", Name: "Colon"},
	{ID: "apos", Name: "Apostrophe"},
	{ID: "ent", Name: "Enter"},
	{ID: "pup", Name: "Page Up"},
	{ID: "hk7", Name: "⑦"},
	{ID: "hk8", Name: "⑧"},
	{ID: "lshft", Name: "Shift (Left)"},
	{ID: "z", Name: "Z"},
	{ID: "x", Name: "X"},
	{ID: "c", Name: "C"},
	{ID: "v", Name: "V"},
	{ID: "b", Name: "B"},
	{ID: "n", Name: "N"},
	{ID: "m", Name: "M"},
	{ID: "com", Name: "Comma"},
	{ID: "per", Name: "Period"},
	{ID: "/", Name: "Slash"},
	{ID: "rshft", Name: "Shift (Right)"},
	{ID: "up", Name: "Up"},
	{ID: "pdn", Name: "Page Down"},
	{ID: "hk9", Name: "FN"},
	{ID: "lctrl", Name: "Ctrl (Left)"},
	{ID: "lwin", Name: "Win (Left)"},
	{ID: "lalt", Name: "Alt (Left)"},
	{ID: "lspc", Name: "Space (Left)"},
	{ID: "rspc", Name: "Space (Right)"},
	{ID: "ralt", Name: "Alt (Right)"},
	{ID: "rctrl", Name: "Ctrl (Right)"},
	{ID: "lft", Name: "Left"},
	{ID: "dwn", Name: "Down"},
	{ID: "rght", Name: "Right"},
}, func(item *KeyInfo) (string, *KeyInfo) { return item.Name, item })
