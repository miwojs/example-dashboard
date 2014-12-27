module.exports =

	"miwo-app":
		namespace: 'App'
		defaultController: 'visitors'
		defaultAction: 'default'
		controllers:
			visitors: require('./controllers/VisitorsController')
			users: require('./controllers/UsersController')

	"miwo-templates":
		dir: 'dist/templates'

	"miwo-data":
		stores:
			user: require('./stores/UserStore')
		entities:
			user: require('./entity/User')

	services:
		viewport:
			type: require('./components/Viewport')
