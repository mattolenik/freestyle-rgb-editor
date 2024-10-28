package main

import (
	"context"
	"fmt"
	"kinesis-customizer/keyboard"
	"kinesis-customizer/vdrive"
)

// App struct
type App struct {
	ctx        context.Context
	cancelFunc context.CancelFunc
	drive      vdrive.VDrive
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx, a.cancelFunc = context.WithCancel(ctx)
	a.drive = vdrive.New(keyboard.FSEdgeRGB)
	go a.drive.Watch(a.ctx)
}

func (a *App) shutdown(ctx context.Context) {
	a.cancelFunc()
	fmt.Printf("Unmounting vdrive (if mounted)\n")
	if vi, err := a.drive.Unmount(); err != nil {
		fmt.Printf("failed to unmount vdrive: %s\n", err)
	} else {
		fmt.Printf("unmounted %v\n", vi)
	}
}
