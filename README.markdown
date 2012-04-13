# jQuery Treefy - A Tree Plugin - http://wbotelhos.com/treefy

jQuery Treefy is a plugin that transforms an unordered list into an expandable and collapsable tree.

## Version

	@version        0.1.0
	@since          2012.02.10
	@author         Washington Botelho
	@documentation  wbotelhos.com/treefy
	@twitter        twitter.com/wbotelhos

## Required Files

	jquery.treefy.min.js
	jquery.treefy.css
	checked.png
	closed.png
	icons.png
	opened.png
	partial.png
	unchecked.png

## Default values

	always                  : undefined           // Function executed when the tree finish the request.
	checkbox                : false               // Enables the checkbox on the side of each element.
	checkDown               : true                // Check all children when a folder is checked.
	checkedClass            : 'checked'           // Class with background used as icon on checked values.
	checkUp                 : true                // Check all parents folder.
	data                    : undefined           // A JSON data passed to Treefy manually.
	dataType                : 'json'              // The data type of the ajax request.
	disabledCheckedClass    : 'disabled-checked'  // Class with background used as icon on checkbox is checked but disabled.
	disabledClass           : 'disabled'          // Class with background used as icon on checkbox is disabled.
	disableFolder           : true                // Enables sending the value of items that are folders.
	done                    : undefined           // Function executed when the tree loads successfully.
	fail                    : undefined           // Function executed when occurs an error.
	icon                    : true                // Enables the display of icons next to each item.
	jsonp                   : undefined           // Override the callback function name in a JSONP request.
	jsonpCallback           : undefined           // Specify the callback function name for a JSONP request.	
	childrenName            : 'children'          // Name of the node that represents the children.
	params                  : {}                  // Disables the partial icon of the folder.
	partial                 : true                // Enables the partial icon of the folder.
	partialClass            : 'partial'           // Class with background used as icon on checkbox is disabled.
	type                    : 'get'               // Type of the HTTP request.
	uncheckDown             : true                // Uncheck all children when a folder is unchecked.
	uncheckUp               : true                // Uncheck all parents folder when a child is check.
	uncheckedClass          : 'unchecked'         // Class with background used as icon on checkbox unchecked.
	url                    	: undefined           // URL to request the data.

## Usage JSON data

	<div id="tree"></div>

	var json = '{ "tree": [ { "name": "Ruby" }, { "name": "NoSQL", "children": [ { "name": "MongoDB" } ] } ] }';

	$('#tree').treefy({ data: json });

## Usage with manual build

	<div id="tree">
		<ul>
			<li>
				<span>
					<span class="treefy-empty"></span>
					<span class="treefy-file"></span>
					<a href="javascript:void(0);">Ruby</a>
				</span>
			</li>
			<li>
				<span class="treefy-closed">
					<span class="treefy-flick"></span>
					<span class="treefy-folder"></span>
					<a href="#">NoSQL</a>
				</span>

				<ul>
					<li>
						<span>
							<span class="treefy-empty"></span>
							<span class="treefy-file"></span>
							<a href="#">MongoDB</a>
						</span>
					</li>
				</ul>
			</li>
		</ul>
	</div>

	$('#tree').treefy();

## Public functions

	$('#ruby').treefy('check', true);	// Check or uncheck the checkbox.

	$('#java').treefy('enable', false);	// Disable or enable the checkbox.

## Licence

The MIT License

Copyright (c) 2012 Washington Botelho

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Buy me a coffee

You can do it by [PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=X8HEP2878NDEG&item_name=jQuery%20Treefy). Thanks! (:
