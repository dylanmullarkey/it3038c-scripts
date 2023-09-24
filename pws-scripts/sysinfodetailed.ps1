function getIP{
    (get-netipaddress).ipv4address | select-string "192.*"
}

$IP = getIP
$User = $env:USERNAME
$ver = $HOST.Version
$HOSTNAME = hostname
$DATE = Get-Date

$BODY = "This machine's IP is $IP. User is $User. Hostname is $HOSTNAME. PowerShell $ver. Today's date is $DATE."

$BODY > c:\sysinfodetail.txt