@echo off
setlocal enabledelayedexpansion

:: ============================================================
:: DAILY OBSERVER — Auto-generates daily notes from project activity
:: Runs every 30 min via Task Scheduler
:: ============================================================

set VAULT=C:\Users\DIANA\Documents\img-creator-obsidian
set DAILY=%VAULT%\Daily

:: Get today's date in YYYY-MM-DD format
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set DT=%%I
set TODAY=%DT:~0,4%-%DT:~4,2%-%DT:~6,2%
set HOUR=%DT:~8,2%
set MINUTE=%DT:~10,2%
set TIMESTAMP=%HOUR%:%MINUTE%

set NOTE=%DAILY%\%TODAY%.md

:: Create Daily folder if needed
if not exist "%DAILY%" mkdir "%DAILY%"

:: If note doesn't exist yet, create the header
if not exist "%NOTE%" (
    echo # %TODAY%>> "%NOTE%"
    echo.>> "%NOTE%"
    echo ## Observations>> "%NOTE%"
    echo.>> "%NOTE%"
    echo ## Git Activity>> "%NOTE%"
    echo.>> "%NOTE%"
    echo ## Tasks>> "%NOTE%"
    echo - [ ]>> "%NOTE%"
    echo.>> "%NOTE%"
)

:: ============================================================
:: IMG CREATOR MAX — git activity in last 30 min
:: ============================================================
set PROJECT1=C:\Users\DIANA\Downloads\IMG CREATOR MAX
if exist "%PROJECT1%\.git" (
    cd /d "%PROJECT1%"
    for /f "delims=" %%L in ('git log --since="30 minutes ago" --oneline --no-merges 2^>nul') do (
        findstr /c:"%%L" "%NOTE%" >nul 2>&1
        if errorlevel 1 (
            echo - [%TIMESTAMP%] **IMG Creator**: %%L>> "%NOTE%"
        )
    )
    :: Check for uncommitted changes
    git diff --stat --quiet 2>nul
    if errorlevel 1 (
        for /f "delims=" %%F in ('git diff --name-only 2^>nul') do (
            set FOUND=0
            findstr /c:"working on: %%F" "%NOTE%" >nul 2>&1 && set FOUND=1
            if !FOUND!==0 (
                echo - [%TIMESTAMP%] **IMG Creator** working on: %%F>> "%NOTE%"
            )
        )
    )
)

:: ============================================================
:: AD SCRAPER — git activity in last 30 min
:: ============================================================
set PROJECT2=C:\Users\DIANA\Downloads\SCRAPER
if exist "%PROJECT2%\.git" (
    cd /d "%PROJECT2%"
    for /f "delims=" %%L in ('git log --since="30 minutes ago" --oneline --no-merges 2^>nul') do (
        findstr /c:"%%L" "%NOTE%" >nul 2>&1
        if errorlevel 1 (
            echo - [%TIMESTAMP%] **Ad Scraper**: %%L>> "%NOTE%"
        )
    )
    git diff --stat --quiet 2>nul
    if errorlevel 1 (
        for /f "delims=" %%F in ('git diff --name-only 2^>nul') do (
            set FOUND=0
            findstr /c:"working on: %%F" "%NOTE%" >nul 2>&1 && set FOUND=1
            if !FOUND!==0 (
                echo - [%TIMESTAMP%] **Ad Scraper** working on: %%F>> "%NOTE%"
            )
        )
    )
)

endlocal
