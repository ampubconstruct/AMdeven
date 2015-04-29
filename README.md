###(動作確認)
windows7

###(開発環境)

coffeescript, sass

	Windows7
		electron(https://github.com/atom/electron)
		npm
		ruby
		rubygems
			gem source -a http://rubygems.org/
			gem install sass
		### my choco ###
		choco install githubforwindows cmder atom notepadplusplus ruby rubygems
		choco install googlechrome clover dexpot autoit.commandline
		choco install firefox-dev -pre
	cloud9
		clone
		nvm install v1.*

###(配置)
	/electron-version/
	/this_sample/
		run.bat(execute)
		/contents/
			/nodejs/
				NodeApp.coffee
			/web/ # share, access to DOMAIN/
				index.html
				/mylib/CommonJs.coffee # クライアント、サーバー共通ポート設定

			/proj/ # new project git
				/atom/ # atom project
				/node/ # node
				/web/ # access to DOMAIN/web/
#

###(初回実行)
	bat_npm.bat
	compiler.bat
	run.bat

###reload server
* http://localhost:8081/?ws&all # all file
* http://localhost:8081/?ws&g=index.html,main.js # specified file

---
####as node.js application
そのままcloneし、`node server`で起動。


---
###package
配置を参考に、elecronがあるフォルダと同じフォルダに入れrun.batを起動する
