DefaultView = require '../views/users/DefaultView'


class UsersController extends Miwo.app.Controller


	startup: () ->
		return


	beforeRender: () ->
		return


	afterRender: () ->
		return


	actionDefault: (params) ->
		console.log('users default')
		return


	createDefaultView: (config) ->
		# custom view factory (see VisitorsControler registerView)
		return new DefaultView(config)


module.exports = UsersController