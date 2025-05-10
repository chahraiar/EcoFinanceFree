function Export-FilesWithContent {
    param (
        [Parameter(Mandatory = $true)]
        [string]$SourceFolder
    )

    $outputDir = 'D:\log'
    if (-not (Test-Path -LiteralPath $outputDir)) {
        New-Item -LiteralPath $outputDir -ItemType Directory | Out-Null
    }

    $timestamp = Get-Date -Format 'yyyyMMdd_HHmmss'
    $outputFile = Join-Path $outputDir "liste_fichiers_$timestamp.txt"

    # Extensions à exclure
    $extensionsToExclude = @(
        '.txt', '.ps1',
        '.jpg', '.jpeg', '.png', '.gif',
        '.bmp', '.svg', '.ico', '.webp'
    )

    Get-ChildItem -LiteralPath $SourceFolder -Recurse -File -Force |
    Where-Object {
        $_.FullName -notmatch '\\node_modules\\' -and
        $_.FullName -notmatch '\\assets\\' -and
        $_.FullName -notmatch '\\.expo\\' -and
        $_.FullName -notmatch '\\.bolt\\' -and
        $_.Extension -notin $extensionsToExclude -and
        $_.Name -ne 'package-lock.json'
    } |
    ForEach-Object {
        $filePath = $_.FullName
        Add-Content -LiteralPath $outputFile -Value "Fichier : $filePath"
        Add-Content -LiteralPath $outputFile -Value "Contenu :"
        try {
            Get-Content -LiteralPath $filePath | Add-Content -LiteralPath $outputFile
        }
        catch {
            Add-Content -LiteralPath $outputFile -Value "[Erreur lors de la lecture du fichier]"
        }
        Add-Content -LiteralPath $outputFile -Value "`n---`n"
    }

    Write-Output "Fichier généré : $outputFile"
}

# Appel de la fonction
Export-FilesWithContent -SourceFolder "D:\Dev\EcoFinanceFree"
