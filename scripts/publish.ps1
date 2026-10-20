param()
$ErrorActionPreference = 'Stop'
$taskRoot = Split-Path $PSScriptRoot -Parent
. (Join-Path $taskRoot '..\AppDock.at365\scripts\publish-paths.ps1')
$taskOutput = Get-PublishDirectory $taskRoot
$taskDestination = Join-Path $taskOutput 'extensions\at365.profile'
New-Item -ItemType Directory -Path $taskDestination -Force | Out-Null
foreach ($taskFile in @('extension.json', 'index.cjs')) {
    Copy-Item -LiteralPath (Join-Path $taskRoot $taskFile) -Destination (Join-Path $taskDestination $taskFile) -Force
}
& (Join-Path $taskRoot '..\AppDock.at365\scripts\pack-applet-update.ps1') -SourceDirectory $taskDestination -OutputDirectory $taskOutput
if (-not $?) { throw 'Applet update packaging failed.' }
Install-PublishedDeployment $taskRoot $taskOutput
Write-Host "Published: $taskOutput"
