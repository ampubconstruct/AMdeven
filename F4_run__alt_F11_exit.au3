#cs ----------------------------------------------------------------------------

 AutoIt Version: 3.3.8.1
 Author:         myName

 Script Function:
	Template AutoIt script.

#ce ----------------------------------------------------------------------------

; Script Start - Add your code below here


HotKeySet("{F4}", "exe")
HotKeySet("!{F11}", "terminate")

Func terminate()
   Exit
EndFunc

Func exe()
   Run("run.bat")
EndFunc


While True
   Sleep(10000)
WEnd
