package meta

import _ "embed"

// Version is the semver of the application. It's value is injected at build time with -ldflags.
var Version string
