<#
    Disable AD/M365 User Account Script
    Version 1.0
    Dylan Mullarkey

    Requirements
    ---------------
    1. Ensure WinRM service is running on remote computer.
        :: Test with command
            Test-WSMan -ComputerName <Name>  
        
    2. Remote computer needs Active Directory Module Installed
        :: Run command on remote computer
            Install-Module ActiveDirectory
    
    3. Edit $pc variable to your remote computer name on line 53
    
    Instructions
    ---------------
      The script will run entirely on the remote computer in a domain. It will prompt for credentials to 
    remote pc. Input your credentials.

      You will then be prompted for the user SAM you wish to disable. Enter the information.
    If the user entered doesn't exist, you will be prompted again. If they are already
    disabled, the program will shut down. Otherwise, you will be asked to confirm the
    action. Entering yes will disable both AD and M365 sign-on.

      Run ADSync on DC to update changes.

    Variables
    ---------------
    + SAMAccountName - Input containing AD user SAM string
    + userExists - Set to false until valid user SAM is provided. Continues to loop for input. Boolean
    + user - Holds provided user object from Get-ADUser


    ScriptBlocks
    ---------------
      $script_DisableUser :: Runs Get-ADUser with SAMAccountName to disable user. Confirms selection.
        (Param) SAMAccountName

      $script_GetADUser :: Runs Get-ADUser with SAMAccountName to find user. Checks if user exists.
                           If already disabled, ends runtime. 
        (Param) SAMAccountName

    Updates
    ---------------
    Version 1.0 || 10.26.2023: Script disables users AD/M365 account based on SAM.
    Version 1.1 || 10.31.2023: Add logging and change nested scripts to functions
#>

$creds = Get-Credential
$pc = "dc.mullardt."
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
            Exit-PSSession
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
