###(動作確認)
windows7

###(開発環境)

coffeescript, sass

	Windows7
		electron(https://github.com/atom/electron)
		npm
		ruby
		rubygems
			gem install sass
		### my choco ###
		choco install githubforwindows cmder atom notepadplusplus ruby rubygems
		choco install googlechrome clover dexpot autoit.commandline
		choco install firefox-dev -pre

###(配置)
	/electron-version/
	/this_sample/
		run.bat(execute)
		/contents/
			/nodejs/
				NodeApp.coffee
			/web/
				index.html
#

###(初回実行)
	bat_npm.bat
	compiler.bat
	run.bat

---
####node.js application
そのままcloneし、`node server`で起動。


---
###package
electronと同じディレクトリに入れ、run.batを起動する
