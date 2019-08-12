window.addEventListener('load', function() {
	"use strict";
	
	function viewedAlready() {
		if (window.location.hash === '#view-intro') {
			return false;
		}
		try {
			return window.localStorage.getItem('user-guide') === 'viewed';
		} catch (e) {
			//sometimes localStorage is blocked by security settings. try cookies
			return document.cookie.indexOf('userguide=viewed') >= 0;
		}
	}
	
	function setViewed() {
		try {
			window.localStorage.setItem('user-guide', 'viewed');
		} catch (e) {
			document.cookie = "userguide=viewed;max-age=31536000;path=/";
		}
	}

	function setup() {
		return new Promise(function(resolve, reject) {
			if (viewedAlready()) {
				return reject();
			}

			if ('introJs' in window) {
				return resolve();
			}

			var link = document.createElement('link');
			link.rel = "stylesheet";
			link.href = "/intro.js/introjs.css";
			document.head.insertBefore(link, document.getElementById('typetools-main-css'))

			var ugcss = document.createElement('link');
			ugcss.rel = "stylesheet";
			ugcss.href = "/user-guide.css";
			document.head.insertBefore(ugcss, document.getElementById('typetools-main-css'))
		
			var script = document.createElement('script');
			script.src="/intro.js/intro.js";
			script.addEventListener('load', resolve);
			document.head.appendChild(script);
		});
	}
	
	setup().then(function() {
		var intro = introJs();
		intro.setOptions({
			'tooltipPosition': 'right',
			'steps': [
			{
				'intro': "Welcome to Type Tools! This is a playground for experimenting with <a href='https://medium.com/variable-fonts/https-medium-com-tiro-introducing-opentype-variable-fonts-12ba6cd2369'>OpenType variable fonts</a> in a variety of ways."
			}, {
				'element': document.getElementById('select-layout-container'),
				'intro': "Pick a page layout! Each layout allows you to examine different aspects of the variable font design space."
			}, {
				'element': document.getElementById('select-font-container'),
				'intro': "Choose from a selection of Type Network-affiliated fonts, or drag-and-drop your own TTF, OTF, or WOFF file onto the window to load your own variable font."
			}, {
				'element': document.getElementById('typography-container'),
				'intro': "Standard typographic controls include size, leading, alignment and color. Font sizes are measured in CSS points."
			}, {
				'element': document.getElementById('axis-inputs'),
				'intro': "Sliders for variable font axes will appear here. Click the “View All Axes” checkbox to show extra design dimensions beyond the standard weight/width/slant/italic/optical-size space."
			}, {
				'element': document.getElementById('show-stuff-container'),
				'intro': "Options to show various output information about the currently configured axes."
/*
			}, {
				'element': document.getElementById('meta-stuff-container'),
				'intro': "Options to show various output information about the currently configured axes."
*/
			}]
		});
		intro.start();
		setViewed();
	}).catch(function() {
		//already viewed
	});
	
});