class UsersDefaultView extends Miwo.Container

	template: 'path:users/default'


	doInit: ->
		super
		@add('usersGrid', @createComponentUsersGrid())
		return


	createComponentUsersGrid: ->
		grid = new Miwo.Grid
			paginator: true
		grid.setStore(miwo.store('user'))

		# columns
		grid.addTextColumn 'name',
			text: 'Username'
		grid.addTextColumn 'role',
			text: 'Agent Role'
			align:'right'
			width: 150

		# actions
		grid.addAction 'edit',
			text: 'Edit'
			inline: true
			callback: (record) =>
				# open edit window
				win = @get('window')
				win.form.loadRecord(record)
				win.open()
				return
		grid.addAction 'delete',
			text: 'Delete'
			confirm: true
			callback: (record) ->
				miwo.store('user').remove(record)
				return

		# operations
		grid.addOperation 'delete',
			text: 'Delete rows'
			confirm: true
			callback: (records) ->
				miwo.store('user').remove(records)
				return

		return grid


	createComponentWindow: ->
		win = new Miwo.FormWindow
			title: 'Edit user'

		# build form
		win.form.addText 'name',
			label: 'Username'
		win.form.addSelect 'role',
			label: 'Agent role'
			items: ['admin', 'root', 'agent', 'guest']
		win.addCloseButton('Cancel')
		win.addSubmitButton('Save')

		win.on 'success', (win, form) ->
			# save form values to loaded record
			form.updateRecord()
			# hide edit window
			win.close()
			return

		return win


	createComponentPaginator: ->
		pager = new Miwo.nav.Pager({navigate:true})
		#pager.paginator.setItemsPerPage(10)
		#pager.paginator.setItemCount(200)
		#pager.paginator.setPage(1)
		pager.setStore(miwo.store('user'))
		return pager


module.exports = UsersDefaultView