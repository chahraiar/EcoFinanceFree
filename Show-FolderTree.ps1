function Get-TreeStructure {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory = $true)]
        [string]$Path
    )

    function Show-Tree {
        param (
            [string]$Folder,
            [string]$Prefix = ""
        )

        $items = Get-ChildItem -LiteralPath $Folder -Force | Where-Object {
            $_.Name -ne 'node_modules'
        } | Sort-Object -Property { !$_.PSIsContainer }, Name

        $count = $items.Count

        for ($i = 0; $i -lt $count; $i++) {
            $item = $items[$i]
            $isLast = ($i -eq $count - 1)
            $marker = if ($isLast) { "└──" } else { "├──" }

            Write-Host "$Prefix$marker $($item.Name)"

            if ($item.PSIsContainer) {
                $newPrefix = if ($isLast) { "$Prefix    " } else { "$Prefix│   " }
                Show-Tree -Folder $item.FullName -Prefix $newPrefix
            }
        }
    }

    if (-Not (Test-Path $Path)) {
        Write-Host "Chemin invalide : $Path"
        return
    }

    Write-Host "$(Split-Path -Path $Path -Leaf)/"
    Show-Tree -Folder $Path
}

Get-TreeStructure -Path "D:\Dev\EcoFinanceFree\"
