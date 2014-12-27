class VisitorsController extends Miwo.app.Controller

	# register view factories
	@registerView 'default', require '../views/visitors/DefaultView'


	startup: ->
		return


	beforeRender: () ->
		return


	afterRender: () ->
		return


	actionDefault: (params) ->
		console.log('visitors default')
		return


	renderDefault: (params) ->
		return


	actionOverview: () ->
		@setView('default')
		return


module.exports = VisitorsController