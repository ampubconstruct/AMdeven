###(動作確認)
windows7

###(開発環境)

coffeescript, sass

	Windows7
		electron(https://github.com/atom/electron)
		nodejs
		npm
		ruby
		rubygems
			gem source -a http://rubygems.org/ # if error
			gem install sass
		### my choco for dev ###
		choco install nodejs githubforwindows cmder atom notepadplusplus ruby rubygems
		choco install googlechrome clover dexpot autoit.commandline
		choco install firefox-dev -pre
	cloud9
		clone
		nvm install v1.* #iojs

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

			/sample_proj/ # new project, copy and rename to proj
				/atom/ # atom project
				/node/ # node
				/web/ # access to DOMAIN/web/
#

###(初回実行)
	contents内、sample_projをコピーしprojとする。
	bat_npm.bat
	compiler.bat
	run.bat

###(設定)
port設定
	/contents/proj/CommonJs.coffee


###reload server
* http://localhost:8081/?ws&all # all file
* http://localhost:8081/?ws&g=index.html,main.js # specified file

---
####as node.js application
そのままcloneし、`node server`で起動。


---
###package
配置を参考に、elecronがあるフォルダと同じフォルダに入れrun.batを起動する
