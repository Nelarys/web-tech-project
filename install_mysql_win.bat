@echo off
REM Install MySQL using a batch script

REM Set variables
SET MYSQL_VERSION=mysql-installer-web-community-8.0.34.0.msi
SET MYSQL_URL=https://dev.mysql.com/get/Downloads/MySQLInstaller/%MYSQL_VERSION%
SET INSTALLER_PATH=%USERPROFILE%\Downloads\%MYSQL_VERSION%

REM Step 1: Download MySQL Installer
echo Downloading MySQL installer...
curl -L -o %INSTALLER_PATH% %MYSQL_URL%

IF EXIST %INSTALLER_PATH% (
    echo MySQL Installer downloaded successfully.
) ELSE (
    echo Failed to download MySQL installer. Exiting...
    exit /b 1
)

REM Step 2: Install MySQL silently
echo Installing MySQL silently...
msiexec /i %INSTALLER_PATH% /quiet

REM Step 3: Check if MySQL is installed
REM You can customize this part to check the MySQL installation more thoroughly
IF EXIST "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" (
    echo MySQL installed successfully.
) ELSE (
    echo MySQL installation failed. Please check the logs.
    exit /b 1
)

REM Clean up installer
echo Cleaning up...
del /f /q %INSTALLER_PATH%

echo Installation complete!
pause