class UsersStore extends Miwo.Store

	entity: require('../entity/User')

	sort:
		role: 'asc'


	init: ->
		@setData([
			 {id: 1, name: 'Dusan Kmet', role: 'admin'},
			 {id: 2, name: 'Petr Janosik', role: 'agent'},
			 {id: 3, name: 'John Doe', role: 'agent'},
			 {id: 4, name: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum', role: 'root'},
			 {id: 5, name: 'Miro Kmet', role: 'admin'}
		 ])
		return

module.exports = UsersStore