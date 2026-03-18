@echo off
setlocal

cd /d %~dp0

echo Starting BookStore backend...
call mvnw.cmd spring-boot:run

endlocal
