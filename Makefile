MODULE   := $(shell awk 'NR==1{print $$2}' go.mod)
UNAME    := $(shell uname)
VERSION  := $(shell echo $$(ver=$$(git tag -l --points-at HEAD) && [ -z $$ver ] && ver=$$(git describe --always --dirty); echo $$ver))
LDFLAGS  := -s -w -X $(MODULE)/meta.Version=$(VERSION) 
FLAGS    := -trimpath
DIST     := dist/
APP_NAME := $(shell ([ $(UNAME) = Darwin ] && echo FreestyleRGBConfigurator) || echo freestyle-rgb-configurator))
APP_DIST := $(DIST)/$(APP_NAME)

start:
	wails dev

dev: start

build:
	wails build -clean -ldflags "$(LDFLAGS)" -webview2 -o $(APP_DIST)
