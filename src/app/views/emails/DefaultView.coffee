class EmailsDefaultView extends Miwo.Container

	template: """
	<div class="container-fluid">
		<h1>Emails.Default:</h1>
		{component grid}
	</div>
	"""

	doInit: ->
		super
		@add('grid', @createComponentGrid())
		return


	createComponentGrid: ->
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

		# operations
		grid.addOperation 'delete',
			text: 'Delete rows'
			confirm: true
			callback: (records) ->
				miwo.store('user').remove(records)
				return

		return grid


module.exports = EmailsDefaultView