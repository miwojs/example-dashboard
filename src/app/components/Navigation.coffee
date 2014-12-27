class Navigation extends Miwo.navside.Navigation

	doInit: () ->
		super
		@addItem('visitors', miwo.tr('app.nav.visitors'))
			.set('icon', 'glyphicon glyphicon-comment')
			.set('target', '#visitors')

		@addItem('channels', miwo.tr('app.nav.channels'))
			.set('icon', 'glyphicon glyphicon-folder-open')
			.set('target', '#channels')


		group = @addItemGroup('management', miwo.tr('app.nav.management'))
		group.set('icon', 'glyphicon glyphicon-cog')

		group.addItem('users', miwo.tr('app.nav.users'))
			.set('target', '#users')

		group.addItem('emails', miwo.tr('app.nav.emails'))
			.set('target', '#emails')


		group = @addItemGroup('settings', miwo.tr('app.nav.settings'))
		group.set('icon', 'glyphicon glyphicon-wrench')

		group.addItem('account', miwo.tr('app.nav.account'))
			.set('target', '#account')

		group.addItem('profile', miwo.tr('app.nav.profile'))
			.set('target', '#profile')
		return


module.exports = Navigation