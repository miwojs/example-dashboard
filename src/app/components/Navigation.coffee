class Navigation extends Miwo.navside.Navigation

	doInit: () ->
		super
		@addItem 'visitors',
			text: miwo.tr('app.nav.visitors')
			icon: 'glyphicon glyphicon-comment'
			target: '#visitors'
			badge: '14'
		@addItem 'channels',
			text: miwo.tr('app.nav.channels')
			icon: 'glyphicon glyphicon-folder-open'
			target: '#channels'

		group = @addItemGroup 'management',
			text: miwo.tr('app.nav.management')
			icon: 'glyphicon glyphicon-cog'
		group.addItem 'users',
			text: miwo.tr('app.nav.users')
			target: '#users'
		group.addItem 'emails',
			text: miwo.tr('app.nav.emails')
			target: '#emails'

		group = @addItemGroup 'settings',
			text: miwo.tr('app.nav.settings')
			icon: 'glyphicon glyphicon-wrench'
		group.addItem 'account',
			text: miwo.tr('app.nav.account')
			target: '#account'
		group.addItem 'profile',
			text: miwo.tr('app.nav.profile')
			target: '#profile'
		return


module.exports = Navigation