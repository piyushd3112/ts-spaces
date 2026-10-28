$ErrorActionPreference = 'Stop'
$workspace = Split-Path -Parent $PSScriptRoot
$stage = Join-Path $workspace 'dist\cpanel'
$archive = Join-Path $workspace 'dist\TS-SPACES-cPanel.zip'
New-Item -ItemType Directory -Path $stage -Force | Out-Null
# Include only PHP runtime files and original public assets, never Node dependencies.
Get-ChildItem -LiteralPath (Join-Path $workspace 'public') -Force | Copy-Item -Destination $stage -Recurse -Force
$phpStage = Join-Path $stage 'php'
New-Item -ItemType Directory -Path $phpStage -Force | Out-Null
Get-ChildItem -LiteralPath (Join-Path $workspace 'php') -Force | Copy-Item -Destination $phpStage -Recurse -Force
Copy-Item -LiteralPath (Join-Path $workspace 'config.example.php') -Destination $stage -Force
Copy-Item -LiteralPath (Join-Path $workspace 'CPANEL-SETUP.txt') -Destination $stage -Force
Add-Type -AssemblyName System.IO.Compression.FileSystem
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression
# Build ZIP entries explicitly so hidden .htaccess files are included.
$stream = [System.IO.File]::Open($archive, [System.IO.FileMode]::Create)
$zip = New-Object System.IO.Compression.ZipArchive($stream, [System.IO.Compression.ZipArchiveMode]::Create)
try {
    Get-ChildItem -LiteralPath $stage -Recurse -File -Force | ForEach-Object {
        $relative = $_.FullName.Substring($stage.Length + 1).Replace('\', '/')
        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $_.FullName, $relative) | Out-Null
    }
} finally {
    $zip.Dispose()
    $stream.Dispose()
}
Write-Output $archive
