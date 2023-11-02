$creds = Get-Credential
$pc = "mullardt-dc.mullardt.local"
$s = New-PSSession -ComputerName $pc -Credential $creds

#start of remote session
Invoke-Command -session $s -ScriptBlock{
    Import-Module ActiveDirectory

    Function Get-User($SAMAccountName){
        $user = Get-ADUser -identity $SAMAccountName
        Write-Host "Searching for user..." -ForegroundColor Yellow
        Start-Sleep -Seconds 2
        if ($user.Enabled -like "False"){
            Write-Host("User is already disabled. Shutting down.")
            Exit
        }
        Write-Host "User found!" -ForegroundColor Green
        Start-Sleep -Seconds 2
    }

    # takes input $SAMAccountName to disable user
    Function Disable-User($SAMAccountName){
        Write-Host "Are you sure you want to disable user"$SAMAccountName "?" -ForegroundColor Yellow
        Disable-ADAccount -identity $SAMAccountName -confirm
        Write-Host "User disabled." -ForegroundColor Green
    }

    # START OF RUN
    # $userExists, used to loop $SAMAccountName input until provided a valid user
    $userExists = $false
    while (-not $userExists)
    {
        #gets input and searches for ADuser with SAM provided.
        try {
            $SAMAccountName = Read-Host -prompt "Enter the user SAM"
            Get-User($SAMAccountName)
            $userExists = $true
        }
        catch { 
            #loops back to try block to re-enter user SAM
            Write-Host ("Failed to find user " + $SAMAccountName + ".") -ForegroundColor Red
            continue}
    }
        Disable-User($SAMAccountName)
}
Exit
