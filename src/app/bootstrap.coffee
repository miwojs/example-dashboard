module.exports = (params)=>
	# create di injector
	return miwo.init (configurator)=>
		configurator.setConfig(require './config.coffee')
		configurator.setConfig({params:params}) if params
		return