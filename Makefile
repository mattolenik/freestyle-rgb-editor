MODULE   := $(shell awk 'NR==1{print $$2}' go.mod)
VERSION  := $(shell echo $$(ver=$$(git tag -l --points-at HEAD) && [ -z $$ver ] && ver=$$(git describe --always --dirty); echo $$ver))
LDFLAGS  := -s -w -X $(MODULE)/meta.Version=$(VERSION)
DIST     := build/bin
WAILS    := go run -mod=vendor github.com/wailsapp/wails/v2/cmd/wails

start:
	$(WAILS) dev -ldflags "$(LDFLAGS)"

dev: start

build:
	$(WAILS) build -clean -ldflags "$(LDFLAGS)" -webview2 embed

test:
	# TODO: test execution

dist: clean test build

clean:
	rm -rf $(DIST)/*

.PHONY: start dev build clean test dist
