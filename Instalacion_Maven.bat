@echo off
echo === Configurando entorno para Maven ===

REM Eliminar MVND_HOME si existe (opcional)
reg delete "HKCU\Environment" /v MVND_HOME /f >nul 2>&1
reg delete "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v MVND_HOME /f >nul 2>&1

REM Crear MAVEN_HOME como variable de sistema
setx MAVEN_HOME "C:\Archivos de programa\apache-maven-3.9.9" /M

REM Leer el Path actual del sistema
for /f "tokens=2*" %%A in ('reg query "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v Path 2^>nul') do (
    set "currentPath=%%B"
)

REM Verificar si ya está presente
echo %currentPath% | find /I "%MAVEN_HOME%\bin" >nul
if %errorlevel%==0 (
    echo El path ya contiene Maven.
) else (
    echo Añadiendo %MAVEN_HOME%\bin al Path...
    setx Path "%currentPath%;%%MAVEN_HOME%%\bin" /M
)

echo.
echo ✅ Maven configurado correctamente. Reinicia el sistema o cierra sesión para aplicar los cambios.
pause
