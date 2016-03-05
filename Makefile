all: install

install:
	npm install
	# http://electron.atom.io/docs/v0.27.0/tutorial/using-native-node-modules/
	./node_modules/.bin/electron-rebuild

run:
	npm start

debug:
	DEBUG=yesplease npm start
