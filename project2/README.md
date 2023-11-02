# Project 2

## Description
Project 2 for Scripting Language. Allows you to remotely disable Active Directory users login, as well as M365 if linked. 

## Requirements
1. Ensure WinRM service is running on remote computer.
      Test with command
         `Test-WSMan -ComputerName <Name>`  
        
2. Remote computer needs Active Directory Module Installed
      Run command on remote computer
         `Install-Module ActiveDirectory`
   
3. Edit $pc variable to your remote computer name on line 2

## Instructions

The script will run entirely on the remote computer in a domain. It will prompt for credentials to 
remote pc. Input your credentials.

You will then be prompted for the user SAM you wish to disable. Enter the information.
If the user entered doesn't exist, you will be prompted again. If they are already
disabled, the program will shut down. Otherwise, you will be asked to confirm the
action. Entering yes will disable both AD and M365 sign-on.

Run ADSync on DC to update changes.

## Variables
- SAMAccountName - Input containing AD user SAM string
- userExists - Set to false until valid user SAM is provided. Continues to loop for input. Boolean
- user - Holds provided user object from Get-ADUser

## ScriptBlocks
- $script_DisableUser :: Runs Get-ADUser with SAMAccountName to disable user. Confirms selection.
    - (Param) SAMAccountName

- $script_GetADUser :: Runs Get-ADUser with SAMAccountName to find user. Checks if user exists. If already disabled, ends runtime. 
  - (Param) SAMAccountName
