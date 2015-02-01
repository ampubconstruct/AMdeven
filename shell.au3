#cs ----------------------------------------------------------------------------

 AutoIt Version: 3.3.12.0
 Author:         myName

 Script Function:
	Template AutoIt script.

#ce ----------------------------------------------------------------------------

; Script Start - Add your code below here
#include <AutoItConstants.au3>


Func Terminate()
   ;ConsoleWrite($pid)
   ;ProcessClose($pid)
   Exit
EndFunc

HotKeySet("{esc}", "Terminate")

$i = 0
While $i < 100
   Send("^{e}")
   $i += 1
WEnd

Exit

$pid = WinGetProcess ("I am a Title.")
;ProcessClose($pid)
StdinWrite($pid)
If @error Then
   ConsoleWrite(12&@CRLF)
EndIf
Sleep(10)
$sOutput = StdoutRead($pid)
ConsoleWrite($pid)
ConsoleWrite($sOutput)
Exit
