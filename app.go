package main

import (
	"context"
	"fmt"
	"kinesis-customizer/vdrive"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	vol, err := vdrive.GetVolumeInfo(vdrive.FSEdgeRGB)
	if err != nil {
		fmt.Printf("ERROR: can't get volume info: %v", err)
	}
	if vol != nil {
		fmt.Printf("Volume info: %#v\n", vol)
	}
}

func (a *App) shutdown(ctx context.Context) {
	// TODO: auto dismount
}
