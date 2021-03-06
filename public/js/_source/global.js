var global = {
	init:function(fn) {
		if(fn!=null) {
			fn();
		}
	},
	settings: {
		SITE: {
			TICKET: '',
			STREAM_HOST: '',
			SHARE_URL: ''
		},
		TEXT: {
			LOADING: '',
			DOWNLOAD: '',
			SHARE: '',
			SHARE_TITLE: '',
			PLAYLIST_SEARCH_NO_RESULTS: '',
			PLAYLIST_NO_SONGS: '',
			OPTIONS_PLAY: '',
			OPTIONS_PLAY_AFTER: '',
			OPTIONS_PLAYLIST_ADD: '',
			DIALOG_NOW_PLAYING: '',
			DIALOG_PLAY_NEXT: '',
			DIALOG_PLAYLIST_REMOVE: '',
			DIALOG_PLAYLIST_ADD: '',
			DIALOG_FLASH_PLAYER: '',
			DIALOG_PLAYLIST_MULTIPLE_ADD: ''
		}
	},
	utils: {
		getSection: function(p,def) {
			p = (p==null) ? window.location.toString().split('#') : p.split('#');
    		if(typeof(p[1]) != 'undefined') {
    			p = p[1];
    			p = p.split('?');
    			return p[0].toLowerCase();
    		}
    		return (def != null) ? def : '';
		},
		getPath: function() {
			var loc = window.location.toString().split('#');
			if(typeof(loc[1]) != 'undefined') {
				if(loc[1] != '') {
					return loc[1];
				}
			}
			return '';
		},
		center: function(el) {
			var e = $(el);
		    e.css('position','absolute');
		    e.css('top', ($(window).height()-e.outerHeight())/2+$(window).scrollTop()+'px');
		    e.css('left', ($(window).width()-e.outerWidth())/2+$(window).scrollLeft()+'px');
		},
		setDelimiter: function(q) {
			return (q.indexOf('?') > -1) ? '&' : '?';
		},
		getSong: function(href) {
			var i = href.indexOf('#');
			if(i > -1) {
				return href.substr(i+1);
			}
			return null;
		},
		hasFocus: function(el) {
			var e = $(el);
			if(e.length > 0) {
			    var docViewTop = $(window).scrollTop();
			    var docViewBottom = docViewTop + $(window).height();
			    var elemTop = e.offset().top;
			    var elemBottom = elemTop + e.height();
			    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));
			}
		}
	},
	gui: {
		message: {
			timer: null,
			remove: function() {
				$('.dialog-information').slideUp(90, function() {
					$(this).remove();
				});
			},
			show: function(text, timeout) {
				var c = $('.dialog-information');
				if(c.length > 0) {
					clearTimeout(this.timer);
					c.find('div:first').html(text);
					var t = this;
					this.timer = setTimeout(function() {
						t.remove();
					}, timeout);
				} else {
					$('body').prepend('<div class="dialog-information"><div>'+text+'</div></div>');
					var t = this;
					$('.dialog-information').slideDown(100, function() {
						if(timeout != null) {
							t.timer = setTimeout(function() {
								t.remove();
							}, timeout);
						}
					}).bind('click', function() {
						clearTimeout(t.timer);
						t.remove();
					});
				}
			}
		}
	}
};