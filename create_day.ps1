# Take argument for day number and create a new .ts files for that day

$day = $args[0]
$path = "./2024/"

if ($null -eq $day) {
	Write-Host "Please provide a day number"
	exit
}

$dayFormatted = "{0:D2}" -f [int]$day

# Create the file
New-Item -Path "$path$dayFormatted.ts" -ItemType File
New-Item -Path "$path${dayFormatted}_pt2.ts" -ItemType File
New-Item -Path "$path$dayFormatted.txt" -ItemType File

Write-Host "Files created for day $dayFormatted"