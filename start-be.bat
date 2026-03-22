@echo off
setlocal

set "ROOT_DIR=%~dp0"
set "BACKEND_DIR=%ROOT_DIR%backend"

if not exist "%BACKEND_DIR%\mvnw.cmd" (
    echo [ERROR] Khong tim thay backend\mvnw.cmd
    exit /b 1
)

cd /d "%BACKEND_DIR%"
echo Starting BookStore backend from %BACKEND_DIR% ...
call mvnw.cmd clean spring-boot:run -Dspring-boot.run.jvmArguments="-Dspring.devtools.restart.enabled=false"

endlocal
