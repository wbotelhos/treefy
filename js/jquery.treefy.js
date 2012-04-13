/*!
 * jQuery Treefy - A Tree Plugin - http://wbotelhos.com/treefy
 * -----------------------------------------------------------------------------------
 *
 * jQuery Treefy is a plugin that transforms an unordered list into an expandable and collapsable tree.
 *
 * Licensed under The MIT License
 *
 * @version        0.1.0
 * @since          2012.02.10
 * @author         Washington Botelho
 * @documentation  wbotelhos.com/treefy
 * @twitter        twitter.com/wbotelhos
 *
 * Usage with default values:
 * -----------------------------------------------------------------------------------
 * var json = '{ "tree": [ { "name": "Ruby" }, { "name": "NoSQL", "children": [ { "name": "MongoDB" } ] } ] }';
 *
 * $('#tree').treefy({ data: json });
 *
 * <div id="tree"></div>
 *
 */

;(function($) {

	var methods = {
		init: function(settings) {
			return this.each(function() {

				var self	= this,
					$this	= $(self);

				self.opt = $.extend({}, $.fn.treefy.defaults, settings);

				$this.data('settings', self.opt);

				if (self.opt.checkbox) {
					self.checked			= 'treefy-' + self.opt.checkedClass;
					self.disabled			= 'treefy-' + self.opt.disabledClass,
					self.disabledChecked	= 'treefy-' + self.opt.disabledCheckedClass,
					self.partial			= 'treefy-' + self.opt.partialClass;
					self.unchecked			= 'treefy-' + self.opt.uncheckedClass;
				}

				if (self.opt.url) {
					methods.process.call(self);
				} else {
					if (self.opt.data) {
						methods.build.call(self, self.opt.data);
					}

					methods.execute.call(self);
				}
			});
		}, build: function(data) {
			if (typeof(data) == 'string') {
				data = $.parseJSON(data);
			}

			var self	= this,
				tree	= data.tree,
				build	= '<ul class="treefy">';

			for (var index in tree) {
				build += methods.nextNode.call(self, tree[index]);
			}

			build += '</ul>';

			$(self).html(build);
		}, cascadeDown: function(label, checkbox) {
			var boxInner	= label.closest('li').children('ul'),
				isFolder	= boxInner.length;
	
			if (isFolder) {
				var checkBoxes			= boxInner.find('.treefy-checkbox'),
					childrenLabels		= checkBoxes.children('label'),
					childrenCheckboxes	= childrenLabels.next('input');

				if (checkbox.is(':checked')) {
					childrenLabels.addClass(this.checked).removeClass(this.unchecked).removeClass(this.partial);
					childrenCheckboxes.attr('checked', 'checked');
				} else {
					childrenLabels.addClass(this.unchecked).removeClass(this.checked).removeClass(this.partial);
					childrenCheckboxes.removeAttr('checked');
				}
			}
		}, cascadeUp: function(box) {
			if (box.hasClass('treefy')) {
				return;
			}

			var checkboxes		= box.find('input[type="checkbox"]'),
				checkeds		= checkboxes.filter(':checked'),
				checkedNumber	= checkeds.length,
				isFullChecked	= checkboxes.length == checkedNumber,
				header			= box.prev('span'),
				label			= header.children('.treefy-checkbox').children('label'),
				checkbox		= label.next('input');

			if (isFullChecked) {
				label.addClass(this.checked).removeClass(this.partial).removeClass(this.unchecked);
				checkbox.attr('checked', 'checked');
			} else {
				if (checkedNumber > 0) {
					if (this.opt.partial) {
						label.addClass(this.partial).removeClass(this.checked).removeClass(this.unchecked);
						checkbox.removeAttr('checked');
					} else {
						label.addClass(this.checked).removeClass(this.partial).removeClass(this.unchecked);
						checkbox.attr('checked', 'checked');
					}
				} else {
					label.addClass(this.unchecked).removeClass(this.partial).removeClass(this.checked);
					checkbox.removeAttr('checked');
				}
			}

			var $boxPrevious = box.parent('li').closest('ul');

			methods.cascadeUp.call(this, $boxPrevious);
		}, enable: function(isEnable) {
			return this.each(function() {
				var $this			= $(this),
					context			= $this.closest('ul.treefy').parent(),
					opt				= context.data('settings'),
					checked 		= 'treefy-' + opt.checkedClass,
					disabled		= 'treefy-' + opt.disabledClass,
					disabledChecked	= 'treefy-' + opt.disabledCheckedClass,
					unchecked		= 'treefy-' + opt.uncheckedClass,
					label			= $this.prev('label');

				if (isEnable) {
					$this.removeAttr('disabled');

					if (label.hasClass(disabled)) {
						label.addClass(unchecked).removeClass(disabled);
					} else if (label.hasClass(disabledChecked)) {
						label.addClass(checked).removeClass(disabledChecked);
					}

					label.css({ 'cursor': 'pointer', 'opacity': '1' });
				} else {
					$this.attr('disabled', 'disabled');

					if (label.hasClass(checked)) {
						label.addClass(disabledChecked).removeClass(checked);						
					} else {
						label.addClass(disabled).removeClass(unchecked);
					}

					label.css({ 'cursor': 'default', 'opacity': '.6' });
				}
			});
		}, execute: function() {
			if (this.opt.checkbox) {
				this.checkboxes = $(this).find('input[type="checkbox"]');

				methods.styly.call(this);
				methods.setCheckbox.call(this);
			}

			methods.setFlick.call(this);
			methods.setState.call(this);
		}, getNode: function(item, type) {
			var build =
				'<span{state}>' +
					'<span class="treefy-' + ((type == 'folder') ? 'flick' : 'empty') + '"></span>';

			var state = '';

			if (type != 'file') {
				state = (item.state) ? ' class="treefy-' + item.state + '"' : ' class="treefy-closed"';
			}

			build = build.replace('{state}', state);

			if (item.checkbox) {
				if (!item.checkbox.id) {
					$.error("The 'checkbox.id' JSON element missing!");
				}

				var isChecked	= item.checkbox.checked === true || item.checkbox.checked == 'checked' || item.checkbox.checked == '',
					isDisabled	= item.checkbox.disabled === true || item.checkbox.disabled == 'disabled' || item.checkbox.disabled == '';

				build +=
					'<label for="' + item.checkbox.id + '"></label>' +
					'<input id="' + item.checkbox.id + '" type="checkbox"' +
						((item.checkbox.name) ? ' name="' + item.checkbox.name + '"' : '') +
						((item.checkbox.value) ? ' value="' + item.checkbox.value + '"' : '') +
						((isChecked) ? ' checked="checked"' : '') +
						((isDisabled) ? ' disabled="disabled"' : '') +
						((item.checkbox['class']) ? ' class="' + item.checkbox['class'] + '"' : '') +
					'/>';
			}

			if (this.opt.icon) {
				build += '<span class="treefy-' + type + '"></span>';
			}

			var text = item.text || '???text???';

			if (item.link) {
				build += '<a href="' + (item.link || 'javascript:void(0);') + '"' + ((item.target) ? ' target="' + item.target + '"' : '') + '>' + text + '</a>';
			} else {
				build += '<span class="treefy-text">' + text + '</span>';
			}

			build += '</span>';

			return build;
		}, nextNode: function(item) {
			var children	= item[this.opt.childrenName],
				type		= (children) ? 'folder' : (item.icon || 'file'),
				build		= '<li>';

			build += methods.getNode.call(this, item, type);

			if (children) {
				if (type == 'folder') {
					build += '<ul>';
				}

				for (var index in children) {
					build += methods.nextNode.call(this, children[index]);
				}

				if (type == 'folder') {
					build += '</ul>';
				}
			}

			build += '</li>';

			return build;
		}, setCheckbox: function() {
			var self = this;

			self.checkboxes.prev('label').click(function(evt) {
				evt.preventDefault();

				var label		= $(this),
					checkbox	= label.next('input');

				if (!label.hasClass(self.disabled) && !label.hasClass(self.disabledChecked)) {
					if (label.hasClass(self.checked)) {
						label.addClass(self.unchecked).removeClass(self.checked).removeClass(self.partial);
						checkbox.removeAttr('checked');
					} else {
						label.addClass(self.checked).removeClass(self.unchecked).removeClass(self.partial);
						checkbox.attr('checked', 'checked');
					}
	
					if (self.opt.checkDown && label.hasClass(self.checked) || self.opt.uncheckDown && label.hasClass(self.unchecked)) {
						methods.cascadeDown.call(self, label, checkbox);
					}
	
					if (self.opt.checkUp && label.hasClass(self.checked) || self.opt.uncheckUp && label.hasClass(self.unchecked)) {
						var $boxCurrent = label.closest('ul');
	
						methods.cascadeUp.call(self, $boxCurrent);
					}
				}
			});
		}, setFlick: function() {
			$(this).find('.treefy-flick').click(function() {
				var header	= $(this).parent('span'),
					$box	= header.next('ul');

				if (header.hasClass('treefy-opened')) {
					header.addClass('treefy-closed').removeClass('treefy-opened');
					$box.hide();
				} else {
					header.addClass('treefy-opened').removeClass('treefy-closed');
					$box.show();
				}
			});
		}, setState: function() {
			var self		= this,
				tree		= $(self).children('ul'),
				headers	= tree.find('ul').prev('span');
	
			tree.children('li:last').addClass('treefy-last');
	
			if (headers.length) {
				var header;
	
				$.each(headers, function() {
					header = $(this);
	
					if (!header.hasClass('treefy-opened')) {
						header.next('ul').hide();
					}
				});
			}
	
			if (self.opt.disableFolder) {
				tree.find('li:has("ul")').children('span').find('input').attr('disabled', 'disabled');
			}
		}, check: function(check) {
			return this.each(function() {
				var $this			= $(this),
					context			= $this.closest('ul.treefy').parent(),
					opt				= context.data('settings'),
					checked 		= 'treefy-' + opt.checkedClass,
					disabled		= 'treefy-' + opt.disabledClass,
					disabledChecked	= 'treefy-' + opt.disabledCheckedClass,
					unchecked		= 'treefy-' + opt.uncheckedClass,
					label			= $this.prev('label');

				if (!label.hasClass(disabled) && !label.hasClass(disabledChecked)) {
					if (check) {
						label.addClass(checked).removeClass(unchecked);
						$this.attr('checked', 'checked');
					} else {
						label.addClass(unchecked).removeClass(checked);
						$this.removeAttr('checked');
					}

					if (opt.checkUp) {
						context.opt = opt;
						context.checked = checked;
						context.unchecked = unchecked;
						context.partial = 'treefy-' + opt.partialClass;

						methods.cascadeUp.call(context, label.closest('li').parent('ul'));
					}
				}
			});
		}, styly: function() {
			var self = this;

			self.checkboxes.each(function() {
				var checkbox	= $(this).hide(),
					label		= checkbox.prev('label');

				if (checkbox.is(':checked')) {
					if (checkbox.is(':enabled')) {
						label.addClass(self.checked);
					} else {
						label.addClass(self.disabledChecked);
						label.css({ 'cursor': 'default', 'opacity': '.6' });
					}
				} else {
					if (checkbox.is(':enabled')) {
						label.addClass(self.unchecked);
					} else {
						label.addClass(self.disabled);
						label.css({ 'cursor': 'default', 'opacity': '.6' });
					}
				}

				$('<span class="treefy-checkbox" />').insertBefore(label).append(label, checkbox);
			});
		}, process: function() {
			var self	= this,
				data	= {};
			
			for (var prop in self.opt.params) {
				data[prop] = self.opt.params[prop];
			}

			$.ajax({
				dataType		: self.opt.dataType,
				jsonp			: self.opt.jsonp,
				jsonpCallback	: self.opt.jsonpCallback,
				type			: self.opt.type,
				url				: self.opt.url,
				data			: data
			}).done(function(data, textStatus, jqXHR) {
				methods.build.call(self, data);
				methods.execute.call(self);

				if (self.opt.done) {
					self.opt.done.call(self, data, textStatus, jqXHR);
				}
			}).fail(function(jqXHR, textStatus, errorThrown) {
				if (self.opt.fail) {
					opt.fail.call(self, jqXHR, textStatus, errorThrown);
				}
			}).always(function(jqXHR, textStatus) {
				if (self.opt.always) {
					self.opt.always.call(self, jqXHR, textStatus);
				}
			});
		}
	};

	$.fn.treefy = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist!');
		}
	};

	$.fn.treefy.defaults = {
		always					: undefined,
		checkbox				: false,
		checkDown				: true,
		checkedClass			: 'checked',
		checkUp					: true,
		data					: undefined,
		dataType				: 'json',
		disabledCheckedClass	: 'disabled-checked',
		disabledClass			: 'disabled',
		disableFolder			: true,
		done					: undefined,
		fail					: undefined,
		icon					: true,
		jsonp					: undefined,
		jsonpCallback			: undefined,
		childrenName			: 'children',
		params					: {},
		partial					: true,
		partialClass			: 'partial',
		type					: 'get',
		uncheckDown				: true,
		uncheckUp				: true,
		uncheckedClass			: 'unchecked',
		url						: undefined
	};

})(jQuery);
