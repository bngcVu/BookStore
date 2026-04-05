@echo off
setlocal EnableDelayedExpansion

set "ROOT_DIR=%~dp0"
set "BACKEND_DIR=%ROOT_DIR%backend"

if not exist "%BACKEND_DIR%\mvnw.cmd" (
    echo [ERROR] Khong tim thay backend\mvnw.cmd
    exit /b 1
)

cd /d "%BACKEND_DIR%"

where docker-compose >nul 2>&1
if %errorlevel%==0 (
    echo [INFO] Dung app container de tranh trung cong 8080...
    docker-compose stop app >nul 2>&1

    echo [INFO] Khoi dong db container...
    docker-compose up -d db >nul 2>&1

    echo [INFO] Cho MySQL san sang tren cong 3308...
    set "DB_READY=0"
    for /l %%i in (1,1,30) do (
        powershell -NoProfile -Command "if (Test-NetConnection -ComputerName localhost -Port 3308 -InformationLevel Quiet) { exit 0 } else { exit 1 }" >nul 2>&1
        if !errorlevel! == 0 (
            set "DB_READY=1"
            goto :db_ready
        )
        timeout /t 1 >nul
    )
    :db_ready
    if "!DB_READY!"=="0" (
        echo [WARN] MySQL chua san sang sau 30s. Van tiep tuc start backend.
    )
)

echo Starting BookStore backend from %BACKEND_DIR% ...
call mvnw.cmd clean spring-boot:run -Dspring-boot.run.jvmArguments="-Dspring.devtools.restart.enabled=false"

endlocal
