# chipp-sfdx-plugins

Utilities developed by Clay Chipps (@ctchipps)

[![Version](https://img.shields.io/npm/v/chipp-sfdx-plugins.svg)](https://npmjs.org/package/chipp-sfdx-plugins)
[![Codecov](https://codecov.io/gh/ctchipps/chipp-sfdx-plugins/branch/master/graph/badge.svg)](https://codecov.io/gh/ctchipps/chipp-sfdx-plugins)
[![Known Vulnerabilities](https://snyk.io/test/github/ctchipps/chipp-sfdx-plugins/badge.svg)](https://snyk.io/test/github/ctchipps/chipp-sfdx-plugins)
[![Downloads/week](https://img.shields.io/npm/dw/chipp-sfdx-plugins.svg)](https://npmjs.org/package/chipp-sfdx-plugins)
[![License](https://img.shields.io/npm/l/chipp-sfdx-plugins.svg)](https://github.com/ctchipps/chipp-sfdx-plugins/blob/master/package.json)

<!-- toc -->
* [Contents](#contents)
* [Setup](#setup)
* [Commands](#commands)
<!-- tocstop -->
<!-- install -->

## Setup

### **Install as a SalesforceDX Plugin**

```bash  
sfdx plugins:install chipp-sfdx-plugins
```

You will be prompted to confirm that you want to install an unsigned plugin. Choose "yes"

```bash
This plugin is not digitally signed and its authenticity cannot be verified. Continue installation y/n?: y
```

To whitelist this plugin, [add an entry for it in $HOME/.config/sfdx/unsignedPluginWhiteList.json](https://developer.salesforce.com/blogs/2017/10/salesforce-dx-cli-plugin-update.html).

### **Install from source**

1. Clone the repository

```bash  
git clone https://github.com/ctchipps/chipp-sfdx-plugins.git
```

1. Link the plugin:

```bash
sfdx plugins:link .
```

## Commands

<!-- commands -->
* [`sfdx chipp:data:files:upload -p <filepath> [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-chippdatafilesupload--p-filepath--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx chipp:data:files:upload -p <filepath> [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

upload multiple files based on a csv as standalone files or linked to records

```
USAGE
  $ sfdx chipp:data:files:upload -p <filepath> [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -p, --pathtocsv=pathtocsv                                                         (required) path to csv

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  sfdx chipp:data:files:upload -p ~/FilesToUpload.csv
```

_See code: [src/commands/chipp/data/files/upload.ts](https://github.com/ctchipps/chipp-sfdx-plugins/blob/v0.1.0/src/commands/chipp/data/files/upload.ts)_
<!-- commandsstop -->
