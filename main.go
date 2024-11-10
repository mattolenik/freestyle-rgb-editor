package main

import (
	"embed"
	"fmt"
	"kinesis-customizer/meta"
	"os"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/mac"
)

//go:embed all:frontend/dist
var assets embed.FS

//go:embed build/appicon.png
var appicon []byte

func main() {
	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:         "Kinesis Keyboard Customizer",
		Width:         1200,
		Height:        1200,
		DisableResize: true,
		Fullscreen:    false,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		OnShutdown:       app.shutdown,
		Bind: []interface{}{
			app,
		},
		Mac: &mac.Options{
			About: &mac.AboutInfo{
				Title:   "Kinesis Keyboard Customizer",
				Message: fmt.Sprintf("v%s\nhttps://github.com/mattolenik/kinesis-customizer", meta.Version),
				Icon:    appicon,
			},
		},
	})

	if err != nil {
		println("Error:", err.Error())
		os.Exit(1)
	}
}
