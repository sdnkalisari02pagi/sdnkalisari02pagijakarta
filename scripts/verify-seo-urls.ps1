$urls = @(
    "https://sdnkalisari02pagijakarta.sch.id/favicon.ico",
    "https://sdnkalisari02pagijakarta.sch.id/logo.png",
    "https://sdnkalisari02pagijakarta.sch.id/manifest.webmanifest",
    "https://sdnkalisari02pagijakarta.sch.id/robots.txt",
    "https://sdnkalisari02pagijakarta.sch.id/sitemap.xml"
)

Write-Output "Verifying SEO URLs on production website..."
Write-Output "--------------------------------------------"

foreach ($url in $urls) {
    try {
        $response = Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
        $statusCode = $response.StatusCode
        Write-Output "✅ [HTTP $statusCode] $url"
    } catch {
        $statusCode = $_.Exception.Response.StatusCode
        if ($statusCode) {
            Write-Output "❌ [HTTP $statusCode] $url"
        } else {
            Write-Output "❌ [Error: $($_.Exception.Message)] $url"
        }
    }
}
