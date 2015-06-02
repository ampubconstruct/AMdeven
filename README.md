###(動作確認)
windows7

###(開発環境)
#### my choco
	choco install -yf io.js nodejs githubforwindows cmder atom notepadplusplus ruby googlechrome clover dexpot autoit.commandline autoit
	choco install -yf firefox-dev -pre
#### atom
	apm install atom-color-highlight highlight-selected save-session
#### ruby
	gem source -a http://rubygems.org/
	gem install sass
#### chrome拡張機能
	CoffeeConsole2
	uBlock Origin
#### download
electron - https://github.com/atom/electron  
clibor - http://www.amunsnet.com/


#### cloud9
	git clone
	nvm install v1.* #iojs

###(配置)
	/electron-version/
	/this_sample/
		run.bat(execute)
		/contents/
			/nodejs/
				NodeApp.coffee

			/proj/
				/atom/ # atom project
				/node/ # node
				/web/ #
					/mylib/CommonJs.coffee # クライアント、サーバー共通ポート設定
#

###(初回実行)
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
