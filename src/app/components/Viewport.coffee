Navigation = require './Navigation'
Header = require './Header'


class Viewport extends Miwo.app.Viewport


	doInit: () ->
		super()
		navWidth = 200
		headerHeight = 52

		@addContent
			left: navWidth
			right: 0
			top: headerHeight
			bottom: 0
			cls: 'dash-content'

		@add 'navigation', new Navigation
			top: headerHeight
			bottom: 0
			width: navWidth
			cls: 'dash-navigation'

		@add 'header', new Header
			height: headerHeight
			left: 0
			right: 0
			cls: 'dash-header'
		return



module.exports = Viewport