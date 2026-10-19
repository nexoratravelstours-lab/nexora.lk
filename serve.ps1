# Simple & robust static server using .NET Stream CopyTo
$port = 8080
$prefix = "http://localhost:$port/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Host "Server successfully started at $prefix"

$root = (Get-Location).Path

$mime = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css"
    ".js"   = "application/javascript"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".json" = "application/json"
    ".ico"  = "image/x-icon"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $req = $context.Request
        $res = $context.Response

        try {
            $urlPath = $req.Url.LocalPath.TrimStart('/')
            if ([string]::IsNullOrWhiteSpace($urlPath)) {
                $urlPath = "index.html"
            }

            $filePath = Join-Path $root $urlPath
            if (Test-Path $filePath -PathType Container) {
                $filePath = Join-Path $filePath "index.html"
            }
            if (-not (Test-Path $filePath) -and (Test-Path "$filePath.html")) {
                $filePath = "$filePath.html"
            }

            if (Test-Path $filePath -PathType Leaf) {
                $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                $contentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { "application/octet-stream" }
                $res.ContentType = $contentType
                $res.AddHeader("Access-Control-Allow-Origin", "*")

                if ($req.HttpMethod -ne "HEAD") {
                    $inStream = [System.IO.File]::OpenRead($filePath)
                    $res.ContentLength64 = $inStream.Length
                    $inStream.CopyTo($res.OutputStream)
                    $inStream.Close()
                } else {
                    $fileInfo = New-Object System.IO.FileInfo($filePath)
                    $res.ContentLength64 = $fileInfo.Length
                }
            } else {
                $res.StatusCode = 404
                $err = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $urlPath")
                $res.ContentType = "text/plain"
                $res.ContentLength64 = $err.Length
                if ($req.HttpMethod -ne "HEAD") {
                    $res.OutputStream.Write($err, 0, $err.Length)
                }
            }
        } catch {
            # Ignore client abort
        } finally {
            try { $res.Close() } catch {}
        }
    }
} finally {
    try { $listener.Stop(); $listener.Close() } catch {}
}
