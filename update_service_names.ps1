$rootPath = "d:\company\website\ApolloPT-website\APT_public\zh"
$files = Get-ChildItem -Path $rootPath -Filter "*.html" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    
    # 替换服务名称
    $content = $content -replace '([\>"])设计服务([\<"])', '$1图纸设计$2'
    $content = $content -replace '([\>"])铸造服务([\<"])', '$1铸造$2'
    $content = $content -replace '([\>"])加工服务([\<"])', '$1机加工$2'
    $content = $content -replace '([\>"])故障排除([\<"])', '$1故障分析$2'
    $content = $content -replace '([\>"])资料下载([\<"])', '$1文件下载$2'
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Updated: $($file.FullName)"
    }
}

Write-Host "`nDone! All files have been updated."
