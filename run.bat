SET project_path=%~dp0
cd %project_path%
electron ./
rem SET version=electron-v0.27.2-win32-x64
rem cd ../
rem SET atom_shell_path=%cd%\%version%
rem cd %project_path%
rem start %atom_shell_path%\electron.exe %project_path%
