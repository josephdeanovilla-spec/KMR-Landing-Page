$p = "c:\Users\Joseph\Documents\KMR-Luxe-Landing-Page\KMR-Landing-Page\index.html"
$c = [System.IO.File]::ReadAllText($p, [System.Text.Encoding]::UTF8)

# Peso sign (double-encoded): bytes C3 A2 E2 80 9A C2 B1
$peso = [System.Text.Encoding]::UTF8.GetString([byte[]]@(0xC3, 0xA2, 0xE2, 0x80, 0x9A, 0xC2, 0xB1))
$c = $c.Replace($peso, '&#8369;')

# Star emoji: bytes E2 AD 90
$star = [System.Text.Encoding]::UTF8.GetString([byte[]]@(0xE2, 0xAD, 0x90))
$c = $c.Replace($star, '&#11088;')

# Email emoji (double-encoded): bytes C3 B0 C5 B8 E2 80 9C C2 A7
$email = [System.Text.Encoding]::UTF8.GetString([byte[]]@(0xC3, 0xB0, 0xC5, 0xB8, 0xE2, 0x80, 0x9C, 0xC2, 0xA7))
$c = $c.Replace($email, '&#128231;')

# Phone emoji (double-encoded): bytes C3 B0 C5 B8 E2 80 9C C2 B1
$phone = [System.Text.Encoding]::UTF8.GetString([byte[]]@(0xC3, 0xB0, 0xC5, 0xB8, 0xE2, 0x80, 0x9C, 0xC2, 0xB1))
$c = $c.Replace($phone, '&#128241;')

# Middle dot: bytes C2 B7
$mid = [System.Text.Encoding]::UTF8.GetString([byte[]]@(0xC2, 0xB7))
$c = $c.Replace($mid, '&#183;')

# Copyright: bytes C2 A9
$copy = [System.Text.Encoding]::UTF8.GetString([byte[]]@(0xC2, 0xA9))
$c = $c.Replace($copy, '&copy;')

# Times/close X (double-encoded): bytes C3 83 E2 80 94
$times = [System.Text.Encoding]::UTF8.GetString([byte[]]@(0xC3, 0x83, 0xE2, 0x80, 0x94))
$c = $c.Replace($times, '&times;')

[System.IO.File]::WriteAllText($p, $c, [System.Text.Encoding]::UTF8)
Write-Host "Done"
