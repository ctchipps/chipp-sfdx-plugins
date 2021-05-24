chipp-sfdx-plugins
==================

sfdx plugins by Clay Chipps

[![Version](https://img.shields.io/npm/v/chipp-sfdx-plugins.svg)](https://npmjs.org/package/chipp-sfdx-plugins)
[![CircleCI](https://circleci.com/gh/ctchipps/chipp-sfdx-plugins/tree/master.svg?style=shield)](https://circleci.com/gh/ctchipps/chipp-sfdx-plugins/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/ctchipps/chipp-sfdx-plugins?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/chipp-sfdx-plugins/branch/master)
[![Codecov](https://codecov.io/gh/ctchipps/chipp-sfdx-plugins/branch/master/graph/badge.svg)](https://codecov.io/gh/ctchipps/chipp-sfdx-plugins)
[![Known Vulnerabilities](https://snyk.io/test/github/ctchipps/chipp-sfdx-plugins/badge.svg)](https://snyk.io/test/github/ctchipps/chipp-sfdx-plugins)
[![Downloads/week](https://img.shields.io/npm/dw/chipp-sfdx-plugins.svg)](https://npmjs.org/package/chipp-sfdx-plugins)
[![License](https://img.shields.io/npm/l/chipp-sfdx-plugins.svg)](https://github.com/ctchipps/chipp-sfdx-plugins/blob/master/package.json)

<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g chipp-sfdx-plugins
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
chipp-sfdx-plugins/0.1.0 win32-x64 node-v14.17.0
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
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
<!-- debugging-your-plugin -->
# Debugging your plugin
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!
