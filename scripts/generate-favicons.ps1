Add-Type -AssemblyName System.Drawing

function Get-PngBytes {
    param (
        $SourceImage,
        [int]$Width,
        [int]$Height
    )
    $dest = New-Object System.Drawing.Bitmap($Width, $Height)
    $g = [System.Drawing.Graphics]::FromImage($dest)
    
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    
    # Clear with transparent color
    $g.Clear([System.Drawing.Color]::Transparent)
    
    $g.DrawImage($SourceImage, 0, 0, $Width, $Height)
    
    $ms = New-Object System.IO.MemoryStream
    $dest.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
    $bytes = $ms.ToArray()
    
    $ms.Close()
    $g.Dispose()
    $dest.Dispose()
    
    return $bytes
}

function Save-PngImage {
    param (
        $SourceImage,
        [string]$DestinationPath,
        [int]$Width,
        [int]$Height
    )
    $dest = New-Object System.Drawing.Bitmap($Width, $Height)
    $g = [System.Drawing.Graphics]::FromImage($dest)
    
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    
    $g.Clear([System.Drawing.Color]::Transparent)
    $g.DrawImage($SourceImage, 0, 0, $Width, $Height)
    
    $dest.Save($DestinationPath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    $g.Dispose()
    $dest.Dispose()
}

function Create-Ico {
    param (
        [string]$SourcePath,
        [string]$DestinationPath
    )
    $src = [System.Drawing.Image]::FromFile($SourcePath)
    
    # Generate transparent PNG bytes for sizes 16, 32, and 48
    $png16 = Get-PngBytes -SourceImage $src -Width 16 -Height 16
    $png32 = Get-PngBytes -SourceImage $src -Width 32 -Height 32
    $png48 = Get-PngBytes -SourceImage $src -Width 48 -Height 48
    
    $src.Dispose()
    
    $size16 = $png16.Length
    $size32 = $png32.Length
    $size48 = $png48.Length
    
    # Offset starts right after Header (6 bytes) + 3 Directory entries (3 * 16 bytes = 48 bytes) = 54 bytes
    $offset16 = 54
    $offset32 = $offset16 + $size16
    $offset48 = $offset32 + $size32
    
    # Use MemoryStream to write binary file safely without type casting issues
    $ms = New-Object System.IO.MemoryStream
    
    # ICO Header (6 bytes): Reserved(2), Type(2), ImageCount(2)
    $ms.WriteByte(0)
    $ms.WriteByte(0)
    $ms.WriteByte(1)
    $ms.WriteByte(0)
    $ms.WriteByte(3)
    $ms.WriteByte(0)
    
    # Directory entry structure (16 bytes):
    # Width(1), Height(1), Colors(1), Reserved(1), Planes(2), BPP(2), DataSize(4), DataOffset(4)
    
    # 16x16 Entry
    $ms.WriteByte(16)
    $ms.WriteByte(16)
    $ms.WriteByte(0)
    $ms.WriteByte(0)
    $ms.Write([System.BitConverter]::GetBytes([UInt16]1), 0, 2)
    $ms.Write([System.BitConverter]::GetBytes([UInt16]32), 0, 2)
    $ms.Write([System.BitConverter]::GetBytes([Int32]$size16), 0, 4)
    $ms.Write([System.BitConverter]::GetBytes([Int32]$offset16), 0, 4)
    
    # 32x32 Entry
    $ms.WriteByte(32)
    $ms.WriteByte(32)
    $ms.WriteByte(0)
    $ms.WriteByte(0)
    $ms.Write([System.BitConverter]::GetBytes([UInt16]1), 0, 2)
    $ms.Write([System.BitConverter]::GetBytes([UInt16]32), 0, 2)
    $ms.Write([System.BitConverter]::GetBytes([Int32]$size32), 0, 4)
    $ms.Write([System.BitConverter]::GetBytes([Int32]$offset32), 0, 4)
    
    # 48x48 Entry
    $ms.WriteByte(48)
    $ms.WriteByte(48)
    $ms.WriteByte(0)
    $ms.WriteByte(0)
    $ms.Write([System.BitConverter]::GetBytes([UInt16]1), 0, 2)
    $ms.Write([System.BitConverter]::GetBytes([UInt16]32), 0, 2)
    $ms.Write([System.BitConverter]::GetBytes([Int32]$size48), 0, 4)
    $ms.Write([System.BitConverter]::GetBytes([Int32]$offset48), 0, 4)
    
    # Write transparent image data
    $ms.Write($png16, 0, $png16.Length)
    $ms.Write($png32, 0, $png32.Length)
    $ms.Write($png48, 0, $png48.Length)
    
    # Save stream to file
    $bytes = $ms.ToArray()
    [System.IO.File]::WriteAllBytes($DestinationPath, $bytes)
    $ms.Close()
}

$srcPath = (Get-Item "public/logo.png").FullName

Write-Output "Generating multi-size ICO and high-res PNG favicons with true alpha transparency from $srcPath..."

# 1. Generate favicon.ico with embedded 16, 32, and 48px transparent PNGs
Create-Ico -SourcePath $srcPath -DestinationPath "public/favicon.ico"

# 2. Generate other sizes
$src = [System.Drawing.Image]::FromFile($srcPath)
Save-PngImage -SourceImage $src -DestinationPath "public/icon.png" -Width 96 -Height 96
Save-PngImage -SourceImage $src -DestinationPath "public/icon-192.png" -Width 192 -Height 192
Save-PngImage -SourceImage $src -DestinationPath "public/icon-512.png" -Width 512 -Height 512
Save-PngImage -SourceImage $src -DestinationPath "public/apple-touch-icon.png" -Width 180 -Height 180
$src.Dispose()

Write-Output "Favicons generated successfully with preserved transparency!"
