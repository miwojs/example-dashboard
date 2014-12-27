module.exports = (params)=>
	# create di injector
	return miwo.init (configurator)=>
		configurator.setConfig(require './config')
		configurator.setConfig({params:params}) if params
		return