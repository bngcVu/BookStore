@echo off
setlocal

cd /d %~dp0

echo Starting BookStore backend...
call mvnw.cmd clean spring-boot:run -Dspring-boot.run.jvmArguments="-Dspring.devtools.restart.enabled=false"

endlocal
