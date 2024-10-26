package vdrive

import (
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

const MacOSVDrivePath = "/Volumes/FS EDGE RGB"

var MacOSVersionPath = filepath.Join(MacOSVDrivePath, "firmware", "version.txt")

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
