SET project_path=%~dp0
cd ../
SET atom_shell_path=%cd%\atom-shell-v0.20.2-win32-ia32
cd %project_path%
%atom_shell_path%\atom.exe %project_path%
