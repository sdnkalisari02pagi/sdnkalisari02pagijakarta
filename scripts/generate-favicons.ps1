Add-Type -AssemblyName System.Drawing

function Resize-Image {
    param (
        [string]$SourcePath,
        [string]$DestinationPath,
        [int]$Width,
        [int]$Height,
        [bool]$SaveAsIco = $false
    )
    $src = [System.Drawing.Image]::FromFile($SourcePath)
    $dest = New-Object System.Drawing.Bitmap($Width, $Height)
    $g = [System.Drawing.Graphics]::FromImage($dest)
    
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    
    $g.DrawImage($src, 0, 0, $Width, $Height)
    
    if ($SaveAsIco) {
        $hIcon = $dest.GetHicon()
        $icon = [System.Drawing.Icon]::FromHandle($hIcon)
        $stream = New-Object System.IO.FileStream($DestinationPath, [System.IO.FileMode]::Create)
        $icon.Save($stream)
        $stream.Close()
        $icon.Dispose()
        # DestroyIcon is required to release the native handle
        [System.Runtime.InteropServices.Marshal]::DestroyStructure($hIcon, [System.Type]::GetType("System.IntPtr"))
    } else {
        $dest.Save($DestinationPath, [System.Drawing.Imaging.ImageFormat]::Png)
    }
    
    $g.Dispose()
    $dest.Dispose()
    $src.Dispose()
}

$srcPath = (Get-Item "public/logo.png").FullName

Write-Output "Generating favicons from $srcPath..."

# Generate the requested formats
Resize-Image -SourcePath $srcPath -DestinationPath "public/favicon.ico" -Width 48 -Height 48 -SaveAsIco $true
Resize-Image -SourcePath $srcPath -DestinationPath "public/icon.png" -Width 96 -Height 96
Resize-Image -SourcePath $srcPath -DestinationPath "public/icon-192.png" -Width 192 -Height 192
Resize-Image -SourcePath $srcPath -DestinationPath "public/icon-512.png" -Width 512 -Height 512
Resize-Image -SourcePath $srcPath -DestinationPath "public/apple-touch-icon.png" -Width 180 -Height 180

Write-Output "Favicons generated successfully!"
