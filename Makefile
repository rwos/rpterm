all: localinstall

localinstall:
	npm install
	# http://electron.atom.io/docs/v0.27.0/tutorial/using-native-node-modules/
	./node_modules/.bin/electron-rebuild

run:
	npm start

debug:
	DEBUG=yesplease npm start

lint:
	./node_modules/.bin/eslint ./ || ./node_modules/.bin/eslint --fix ./

install:
	mkdir -p /opt/rpterm
	cp -R ./ /opt/rpterm
	@echo you may want to add /opt/rpterm to your PATH
	@echo
	@echo "echo 'export PATH=\"/opt/rpterm:\$$PATH\"' >> ~/.bashrc"
	@echo "source ~/.bashrc"
