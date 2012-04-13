describe('Manual Build', function() {

	beforeEach(function() {
	    $('body').append(
    		'<div id="tree">' +
				'<ul class="treefy">' +
					'<li>' +
						'<span>' +
							'<span class="treefy-empty"></span>' +
							'<span class="treefy-file"></span>' +
							'<a href="javascript:void(0);" target="_blank">Java</a>' +
						'</span>' +
					'</li>' +
					'<li>' +
						'<span>' +
							'<span class="treefy-empty"></span>' +
							'<span class="treefy-file"></span>' +
							'<span>Ruby</span>' +
						'</span>' +
					'</li>' +
					'<li>' +
						'<span class="treefy-opened">' +
							'<span class="treefy-flick"></span>' +
							'<span class="treefy-folder"></span>' +
							'<span>NoSQL</span>' +
						'</span>' +
	
						'<ul>' +
							'<li>' +
								'<span>' +
									'<span class="treefy-empty"></span>' +
									'<span class="treefy-file"></span>' +
									'<span>Neo4j</span>' +
								'</span>' +
							'</li>' +
							'<li>' +
								'<span class="treefy-closed">' +
									'<span class="treefy-flick"></span>' +
									'<span class="treefy-folder"></span>' +
									'<span>Document</span>' +
								'</span>' +
	
								'<ul>' +
									'<li>' +
										'<span>' +
											'<span class="treefy-empty"></span>' +
											'<span class="treefy-file"></span>' +
											'<span>MongoDB</span>' +
										'</span>' +
									'</li>' +
									'<li>' +
										'<span>' +
											'<span class="treefy-empty"></span>' +
											'<span class="treefy-file"></span>' +
											'<span>CouchDB</span>' +
										'</span>' +
									'</li>' +
								'</ul>' +
							'</li>' +
						'</ul>' +
					'</li>' +
				'</ul>' +
			'</div>'
		);
	});

	afterEach(function() {
		$('#tree').remove();
	});

	it ('should chainable', function() {
		// given
		var $this		= $('#tree'),
			className	= 'my-class';

		// when
		$this.treefy().addClass(className);

		// then
	    expect($this).toHaveClass(className);
	});

	it ('should have main class', function() {
		// given
		var $this = $('#tree');

		// when
		$this.treefy();

		// then
	    expect($this.children('ul')).toHaveClass('treefy');
	});

	it ('should build with the closed and opened conditions', function() {
		// given
		var $this		= $('#tree'),
			children1		= $this.find('li').eq(2).children('span'),
			flick1		= children1.children('span').eq(0),
			folder1	= children1.children('span').eq(1),
			children2		= $this.find('li').eq(2).children('ul').children('li').eq(1).children('span'),
			flick2		= children2.children('span').eq(0),
			folder2	= children2.children('span').eq(1);

		// when
		$this.treefy();

		// then
		expect(children1).toHaveClass('treefy-opened');
	    expect(flick1).toHaveClass('treefy-flick');
	    expect(folder1).toHaveClass('treefy-folder');
	    expect(children2).toHaveClass('treefy-closed');
	    expect(flick2).toHaveClass('treefy-flick');
	    expect(folder2).toHaveClass('treefy-folder');
	});

	it ('should collapse', function() {
		// given
		var $this		= $('#tree').treefy(),
			children	= $this.find('li').eq(2).children('span'),
			flick		= children.children('span').eq(0),
			folder		= children.children('span').eq(1);

		// when
		flick.click();

		// then
	    expect(children).toHaveClass('treefy-closed');
	    expect(flick).toHaveClass('treefy-flick');
	    expect(folder).toHaveClass('treefy-folder');
	});

	it ('should expand', function() {
		// given
		var $this		= $('#tree').treefy(),
			children	= $this.find('li').eq(2).children('ul').children('li').eq(1).children('span'),
			flick		= children.children('span').eq(0),
			folder		= children.children('span').eq(1);

		// when
		flick.click();

		// then
	    expect(children).toHaveClass('treefy-opened');
	    expect(flick).toHaveClass('treefy-flick');
	    expect(folder).toHaveClass('treefy-folder');
	});

	it ('should apply the last style', function() {
		// given
		var $this = $('#tree');

		// when
		$this.treefy();

		// then
	    expect($this.children('ul').children('li:last')).toHaveClass('treefy-last');
	});

});

describe('JSON Data Build', function() {

	beforeEach(function() {
	    $('body').append('<div id="tree"></div>');
	});

	afterEach(function() {
		$('#tree').remove();
	});

	it ('should chainable', function() {
		// given
		var $this		= $('#tree'),
			className	= 'my-class';

		// when
		$this.treefy().addClass(className);

		// then
	    expect($this).toHaveClass(className);
	});

	it ('should build the right tree', function() {
		// given
		var $this	= $('#tree'),
			json	= '{ "tree": [ { "text": "Java", "link": "http://wbotelhos.com", "target": "_blank" }, { "text": "Ruby" }, { "text": "NoSQL", "state": "opened", "children": [ { "text": "Neo4j" }, { "text": "Document", "children": [ { "text": "MongoDB" }, { "text": "CouchDB" } ] } ] } ] }';

		// when
		$this.treefy({ data: json });

		// then
		var tree			= $this.children('ul'),  
			items			= tree.children('li'),  
			$java			= items.eq(0),
			ruby			= items.eq(1),
			nosqlFolder		= items.eq(2),
			nosqlItems		= nosqlFolder.children('ul').children('li'),
			neo4j			= nosqlItems.eq(0),
			documentFolder	= nosqlItems.eq(1),
			documentItems	= documentFolder.children('ul').children('li'),
			mongodb			= documentItems.eq(0),
			couchdb			= documentItems.eq(1);

		expect($java.children('span').children('span').eq(0)).toHaveClass('treefy-empty');
		expect($java.children('span').children('span').eq(1)).toHaveClass('treefy-file');
		expect($java.children('span').children('a').eq(0)).toHaveAttr('target', '_blank');
		expect($java.children('span').children('a').eq(0)).toHaveAttr('href', 'http://wbotelhos.com');
		expect($java.children('span').children('a').eq(0)).toHaveHtml('Java');

		expect(ruby.children('span').children('span').eq(0)).toHaveClass('treefy-empty');
		expect(ruby.children('span').children('span').eq(1)).toHaveClass('treefy-file');
		expect(ruby.children('span').children('span').eq(2)).toHaveHtml('Ruby');

		expect(nosqlFolder).toHaveClass('treefy-last');
		expect(nosqlFolder.children('span').eq(0)).toHaveClass('treefy-opened');
		expect(nosqlFolder.children('span').children('span').eq(0)).toHaveClass('treefy-flick');
		expect(nosqlFolder.children('span').children('span').eq(1)).toHaveClass('treefy-folder');
		expect(nosqlFolder.children('span').children('span').eq(2)).toHaveHtml('NoSQL');

		expect(neo4j.children('span').children('span').eq(0)).toHaveClass('treefy-empty');
		expect(neo4j.children('span').children('span').eq(1)).toHaveClass('treefy-file');
		expect(neo4j.children('span').children('span').eq(2)).toHaveHtml('Neo4j');

		expect(documentFolder.children('span').eq(0)).toHaveClass('treefy-closed');
		expect(documentFolder.children('span').children('span').eq(0)).toHaveClass('treefy-flick');
		expect(documentFolder.children('span').children('span').eq(1)).toHaveClass('treefy-folder');
		expect(documentFolder.children('span').children('span').eq(2)).toHaveHtml('Document');

		expect(mongodb.children('span').children('span').eq(0)).toHaveClass('treefy-empty');
		expect(mongodb.children('span').children('span').eq(1)).toHaveClass('treefy-file');
		expect(mongodb.children('span').children('span').eq(2)).toHaveHtml('MongoDB');

		expect(couchdb.children('span').children('span').eq(0)).toHaveClass('treefy-empty');
		expect(couchdb.children('span').children('span').eq(1)).toHaveClass('treefy-file');
		expect(couchdb.children('span').children('span').eq(2)).toHaveHtml('CouchDB');
	});

	it ('should set custom icon', function() {
		// given
		var $this	= $('#tree'),
			json	= '{ "tree": [ { "text": "Java", "icon": "star" } ] }';

		// when
		$this.treefy({ data: json });

		// then
		var tree			= $this.children('ul'),  
			items			= tree.children('li'),  
			$java			= items.eq(0);

		expect($java.children('span').children('span').eq(0)).toHaveClass('treefy-empty');
		expect($java.children('span').children('span').eq(1)).toHaveClass('treefy-star');

	});

	it ('should set custom checkbox', function() {
		// given
		var json 	= '{ "tree": [ { "text": "Java", "checkbox": { "id": "java", "name": "entity.java", "value": "true", "class": "options" } } ] }',
			$this	= $('#tree');

		// when
		$this.treefy({ checkbox: true, data: json });

		// then
		var tree		= $this.children('ul'),  
			items		= tree.children('li'),  
			$java		= items.eq(0),
			label		= $java.children('span').find('label');
			checkbox	= $java.children('span').find('input:checkbox');

		expect(label).toHaveAttr('for', 'java');
		expect(checkbox).toHaveId('java');
		expect(checkbox).toHaveAttr('name', 'entity.java');
		expect(checkbox).toHaveValue('true');
		expect(checkbox).toHaveClass('options');
	});

	it ('should disable the input of the folder when disableFolder is true', function() {
		// given
		var json		= '{ "tree": [ { "text": "NoSQL", "checkbox": { "id": "nosql" }, "children": [ ] } ] }',
			$this		= $('#tree').treefy({ checkbox: true, data: json }),
			items		= $this.children('ul').children('li'),

			nosql		= items.eq(0).children('span'),
			nosqlLabel	= nosql.find('label'),
			nosqlInput	= nosqlLabel.next('input');

		// when
		nosqlLabel.click();

		// then
		expect(nosqlLabel).toHaveClass('treefy-checked');
		expect(nosqlInput).toBeChecked();
		expect(nosqlInput).toBeDisabled();
	});

	it ('should not disable the input without children when disableFolder is true', function() {
		// given
		var json	= '{ "tree": [ { "text": "NoSQL", "checkbox": { "id": "nosql" }, "children": [ { "text": "MongoDB", "checkbox": { "id": "mongodb" } } ] } ] }',
			$this	= $('#tree');

		// when
		$this.treefy({ checkbox: true, data: json });

		// then
		var	items			= $this.children('ul').children('li'),
			nosql			= items.eq(0).children('span'),
			nosqlLabel		= nosql.find('label'),
			nosqlInput		= nosqlLabel.next('input'),
			nosqlItems		= nosql.next('ul').children('li'),

			mongodb			= nosqlItems.eq(0).children('span'),
			mongodbLabel	= mongodb.find('label'),
			mongodbInput	= mongodbLabel.next('input');

		expect(nosqlInput).toBeDisabled();
		expect(mongodbInput).not.toBeDisabled();
	});

	it ('should not disable the input of the folder when disableFolder is false', function() {
		// given
		var json		= '{ "tree": [ { "text": "NoSQL", "checkbox": { "id": "nosql" }, "children": [ ] } ] }',
			$this		= $('#tree').treefy({ checkbox: true, data: json, disableFolder: false }),
			items		= $this.children('ul').children('li'),

			nosql		= items.eq(0).children('span'),
			nosqlLabel	= nosql.find('label'),
			nosqlInput	= nosqlLabel.next('input');

		// when
		nosqlLabel.click();

		// then
		expect(nosqlLabel).toHaveClass('treefy-checked');
		expect(nosqlInput).not.toBeDisabled();
		expect(nosqlInput).toBeChecked();
	});

	it ('should check', function() {
		// given
		var json		= '{ "tree": [ { "text": "Java", "checkbox": { "id": "java" } } ] }',
			$this		= $('#tree').treefy({ checkbox: true, data: json }),
			tree		= $this.children('ul'),  
			items		= tree.children('li'),  
			$java		= items.eq(0),
			label		= $java.children('span').find('label');
			checkbox	= $java.children('span').find('input:checkbox');

		// when
		label.click();

		// then
		expect(checkbox).toBeChecked();
	});

	it ('should uncheck', function() {
		// given
		var json		= '{ "tree": [ { "text": "Java", "checkbox": { "id": "java" } } ] }',
			$this		= $('#tree').treefy({ checkbox: true, data: json }),
			tree		= $this.children('ul'),  
			items		= tree.children('li'),  
			$java		= items.eq(0),
			label		= $java.children('span').find('label');
			checkbox	= $java.children('span').find('input:checkbox');

		// when
		label.click().click();

		// then
		expect(checkbox).not.toBeChecked();
	});

	it ('should check only one on root level', function() {
		// given
		var json			= '{ "tree": [ { "text": "Ruby", "checkbox": { "id": "ruby" } }, { "text": "NoSQL", "checkbox": { "id": "nosql" }, "state": "opened", "children": [ { "text": "Neo4j", "checkbox": { "id": "neo4j" } }, { "text": "Document", "checkbox": { "id": "document" }, "children": [ { "text": "MongoDB", "checkbox": { "id": "mongodb" } }, { "text": "CouchDB", "checkbox": { "id": "couchdb" } } ] } ] } ] }',
			$this			= $('#tree').treefy({ checkbox: true, data: json }),
			items			= $this.children('ul').children('li'),

			ruby			= items.eq(0).children('span'),
			rubyLabel		= ruby.find('label'),
			rubyInput		= ruby.find('input'),

			nosql			= items.eq(1).children('span'),
			nosqlLabel		= nosql.find('label'),
			nosqlInput		= nosql.find('input'),
			nosqlItems		= nosql.next('ul').children('li'),

			neo4j			= nosqlItems.eq(0).children('span'),
			neo4jLabel		= neo4j.find('label'),
			neo4jInput		= neo4j.find('input'),

			document		= nosqlItems.eq(1).children('span'),
			documentLabel	= document.find('label'),
			documentInput	= document.find('input'),
			documentItems	= document.next('ul').children('li'),

			mongodb			= documentItems.eq(0).children('span'),
			mongodbLabel	= mongodb.find('label'),
			mongodbInput	= mongodb.find('input'),

			couchdb			= documentItems.eq(1).children('span'),
			couchdbLabel	= couchdb.find('label'),
			couchdbInput	= couchdb.next('input');

		// when
		rubyLabel.click();

		// then
		expect(rubyLabel).toHaveClass('treefy-checked');
		expect(rubyInput).toBeChecked();

		expect(nosqlLabel).toHaveClass('treefy-unchecked');
		expect(nosqlInput).not.toBeChecked();

		expect(neo4jLabel).toHaveClass('treefy-unchecked');
		expect(neo4jInput).not.toBeChecked();

		expect(documentLabel).toHaveClass('treefy-unchecked');
		expect(documentInput).not.toBeChecked();

		expect(mongodbLabel).toHaveClass('treefy-unchecked');
		expect(mongodbInput).not.toBeChecked();

		expect(couchdbLabel).toHaveClass('treefy-unchecked');
		expect(couchdbInput).not.toBeChecked();
	});

	it ('should check all second levels by cascade', function() {
		// given
		var json			= '{ "tree": [ { "text": "Ruby", "checkbox": { "id": "ruby" } }, { "text": "NoSQL", "checkbox": { "id": "nosql" }, "state": "opened", "children": [ { "text": "Neo4j", "checkbox": { "id": "neo4j" } }, { "text": "Document", "checkbox": { "id": "document" }, "children": [ { "text": "MongoDB", "checkbox": { "id": "mongodb" } }, { "text": "CouchDB", "checkbox": { "id": "couchdb" } } ] } ] } ] }',
			$this			= $('#tree').treefy({ checkbox: true, data: json }),
			items			= $this.children('ul').children('li'),

			ruby			= items.eq(0).children('span'),
			rubyLabel		= ruby.find('label'),
			rubyInput		= ruby.find('input'),

			nosql			= items.eq(1).children('span'),
			nosqlLabel		= nosql.find('label'),
			nosqlInput		= nosqlLabel.next('input'),
			nosqlItems		= nosql.next('ul').children('li'),

			neo4j			= nosqlItems.eq(0).children('span'),
			neo4jLabel		= neo4j.find('label'),
			neo4jInput		= neo4jLabel.next('input'),

			document		= nosqlItems.eq(1).children('span'),
			documentLabel	= document.find('label'),
			documentInput	= documentLabel.next('input'),
			documentItems	= document.next('ul').children('li'),

			mongodb			= documentItems.eq(0).children('span'),
			mongodbLabel	= mongodb.find('label'),
			mongodbInput	= mongodbLabel.next('input'),

			couchdb			= documentItems.eq(1).children('span'),
			couchdbLabel	= couchdb.find('label'),
			couchdbInput	= couchdbLabel.next('input');

		// when
		nosqlLabel.click();

		// then
		expect(rubyLabel).toHaveClass('treefy-unchecked');
		expect(rubyInput).not.toBeChecked();

		expect(nosqlLabel).toHaveClass('treefy-checked');
		expect(nosqlInput).toBeChecked();

		expect(neo4jLabel).toHaveClass('treefy-checked');
		expect(neo4jInput).toBeChecked();

		expect(documentLabel).toHaveClass('treefy-checked');
		expect(documentInput).toBeChecked();

		expect(mongodbLabel).toHaveClass('treefy-checked');
		expect(mongodbInput).toBeChecked();

		expect(couchdbLabel).toHaveClass('treefy-checked');
		expect(couchdbInput).toBeChecked();
	});

	it ('should check all second folder level with partial on first', function() {
		// given
		var json			= '{ "tree": [ { "text": "Ruby", "checkbox": { "id": "ruby" } }, { "text": "NoSQL", "checkbox": { "id": "nosql" }, "state": "opened", "children": [ { "text": "Neo4j", "checkbox": { "id": "neo4j" } }, { "text": "Document", "checkbox": { "id": "document" }, "children": [ { "text": "MongoDB", "checkbox": { "id": "mongodb" } }, { "text": "CouchDB", "checkbox": { "id": "couchdb" } } ] } ] } ] }',
			$this			= $('#tree').treefy({ checkbox: true, data: json }),
			items			= $this.children('ul').children('li'),

			ruby			= items.eq(0).children('span'),
			rubyLabel		= ruby.find('label'),
			rubyInput		= rubyLabel.next('input'),

			nosql			= items.eq(1).children('span'),
			nosqlLabel		= nosql.find('label'),
			nosqlInput		= nosqlLabel.next('input'),
			nosqlItems		= nosql.next('ul').children('li'),

			neo4j			= nosqlItems.eq(0).children('span'),
			neo4jLabel		= neo4j.find('label'),
			neo4jInput		= neo4jLabel.next('input'),

			document		= nosqlItems.eq(1).children('span'),
			documentLabel	= document.find('label'),
			documentInput	= documentLabel.next('input'),
			documentItems	= document.next('ul').children('li'),

			mongodb			= documentItems.eq(0).children('span'),
			mongodbLabel	= mongodb.find('label'),
			mongodbInput	= mongodbLabel.next('input'),

			couchdb			= documentItems.eq(1).children('span'),
			couchdbLabel	= couchdb.find('label'),
			couchdbInput	= couchdbLabel.next('input');

		// when
		documentLabel.click();

		// then
		expect(rubyLabel).toHaveClass('treefy-unchecked');
		expect(rubyInput).not.toBeChecked();

		expect(nosqlLabel).toHaveClass('treefy-partial');
		expect(nosqlInput).not.toBeChecked();

		expect(neo4jLabel).toHaveClass('treefy-unchecked');
		expect(neo4jInput).not.toBeChecked();

		expect(documentLabel).toHaveClass('treefy-checked');
		expect(documentInput).toBeChecked();

		expect(mongodbLabel).toHaveClass('treefy-checked');
		expect(mongodbInput).toBeChecked();

		expect(couchdbLabel).toHaveClass('treefy-checked');
		expect(couchdbInput).toBeChecked();
	});

	it ('should partial all folder levels', function() {
		// given
		var json			= '{ "tree": [ { "text": "Ruby", "checkbox": { "id": "ruby" } }, { "text": "NoSQL", "checkbox": { "id": "nosql" }, "state": "opened", "children": [ { "text": "Neo4j", "checkbox": { "id": "neo4j" } }, { "text": "Document", "checkbox": { "id": "document" }, "children": [ { "text": "MongoDB", "checkbox": { "id": "mongodb" } }, { "text": "CouchDB", "checkbox": { "id": "couchdb" } } ] } ] } ] }',
			$this			= $('#tree').treefy({ checkbox: true, data: json }),
			items			= $this.children('ul').children('li'),

			ruby			= items.eq(0).children('span'),
			rubyLabel		= ruby.find('label'),
			rubyInput		= ruby.find('input'),

			nosql			= items.eq(1).children('span'),
			nosqlLabel		= nosql.find('label'),
			nosqlInput		= nosql.find('input'),
			nosqlItems		= nosql.next('ul').children('li'),

			neo4j			= nosqlItems.eq(0).children('span'),
			neo4jLabel		= neo4j.find('label'),
			neo4jInput		= neo4j.find('input'),

			document		= nosqlItems.eq(1).children('span'),
			documentLabel	= document.find('label'),
			documentInput	= document.find('input'),
			documentItems	= document.next('ul').children('li'),

			mongodb			= documentItems.eq(0).children('span'),
			mongodbLabel	= mongodb.find('label'),
			mongodbInput	= mongodb.find('input'),

			couchdb			= documentItems.eq(1).children('span'),
			couchdbLabel	= couchdb.find('label'),
			couchdbInput	= couchdb.next('input');

		// when
		mongodbLabel.click();

		// then
		expect(rubyLabel).toHaveClass('treefy-unchecked');
		expect(rubyInput).not.toBeChecked();

		expect(nosqlLabel).toHaveClass('treefy-partial');
		expect(nosqlInput).not.toBeChecked();

		expect(neo4jLabel).toHaveClass('treefy-unchecked');
		expect(neo4jInput).not.toBeChecked();

		expect(documentLabel).toHaveClass('treefy-partial');
		expect(documentInput).not.toBeChecked();

		expect(mongodbLabel).toHaveClass('treefy-checked');
		expect(mongodbInput).toBeChecked();

		expect(couchdbLabel).toHaveClass('treefy-unchecked');
		expect(couchdbInput).not.toBeChecked();
	});

	it ('should partial first folder level and check second when check all second items', function() {
		// given
		var json			= '{ "tree": [ { "text": "Ruby", "checkbox": { "id": "ruby" } }, { "text": "NoSQL", "checkbox": { "id": "nosql" }, "state": "opened", "children": [ { "text": "Neo4j", "checkbox": { "id": "neo4j" } }, { "text": "Document", "checkbox": { "id": "document" }, "children": [ { "text": "MongoDB", "checkbox": { "id": "mongodb" } }, { "text": "CouchDB", "checkbox": { "id": "couchdb" } } ] } ] } ] }',
			$this			= $('#tree').treefy({ checkbox: true, data: json }),
			items			= $this.children('ul').children('li'),

			ruby			= items.eq(0).children('span'),
			rubyLabel		= ruby.find('label'),
			rubyInput		= ruby.find('input'),

			nosql			= items.eq(1).children('span'),
			nosqlLabel		= nosql.find('label'),
			nosqlInput		= nosqlLabel.next('input'),
			nosqlItems		= nosql.next('ul').children('li'),

			neo4j			= nosqlItems.eq(0).children('span'),
			neo4jLabel		= neo4j.find('label'),
			neo4jInput		= neo4jLabel.next('input'),

			document		= nosqlItems.eq(1).children('span'),
			documentLabel	= document.find('label'),
			documentInput	= documentLabel.next('input'),
			documentItems	= document.next('ul').children('li'),

			mongodb			= documentItems.eq(0).children('span'),
			mongodbLabel	= mongodb.find('label'),
			mongodbInput	= mongodbLabel.next('input'),

			couchdb			= documentItems.eq(1).children('span'),
			couchdbLabel	= couchdb.find('label'),
			couchdbInput	= couchdbLabel.next('input');

		// when
		mongodbLabel.click();
		couchdbLabel.click();

		// then
		expect(rubyLabel).toHaveClass('treefy-unchecked');
		expect(rubyInput).not.toBeChecked();

		expect(nosqlLabel).toHaveClass('treefy-partial');
		expect(nosqlInput).not.toBeChecked();

		expect(neo4jLabel).toHaveClass('treefy-unchecked');
		expect(neo4jInput).not.toBeChecked();

		expect(documentLabel).toHaveClass('treefy-checked');
		expect(documentInput).toBeChecked();

		expect(mongodbLabel).toHaveClass('treefy-checked');
		expect(mongodbInput).toBeChecked();

		expect(couchdbLabel).toHaveClass('treefy-checked');
		expect(couchdbInput).toBeChecked();
	});

	it ('should check first folder level and check second when check all first and second items', function() {
		// given
		var json			= '{ "tree": [ { "text": "Ruby", "checkbox": { "id": "ruby" } }, { "text": "NoSQL", "checkbox": { "id": "nosql" }, "state": "opened", "children": [ { "text": "Neo4j", "checkbox": { "id": "neo4j" } }, { "text": "Document", "checkbox": { "id": "document" }, "children": [ { "text": "MongoDB", "checkbox": { "id": "mongodb" } }, { "text": "CouchDB", "checkbox": { "id": "couchdb" } } ] } ] } ] }',
			$this			= $('#tree').treefy({ checkbox: true, data: json }),
			items			= $this.children('ul').children('li'),

			ruby			= items.eq(0).children('span'),
			rubyLabel		= ruby.find('label'),
			rubyInput		= ruby.find('input'),

			nosql			= items.eq(1).children('span'),
			nosqlLabel		= nosql.find('label'),
			nosqlInput		= nosqlLabel.next('input'),
			nosqlItems		= nosql.next('ul').children('li'),

			neo4j			= nosqlItems.eq(0).children('span'),
			neo4jLabel		= neo4j.find('label'),
			neo4jInput		= neo4jLabel.next('input'),

			document		= nosqlItems.eq(1).children('span'),
			documentLabel	= document.find('label'),
			documentInput	= documentLabel.next('input'),
			documentItems	= document.next('ul').children('li'),

			mongodb			= documentItems.eq(0).children('span'),
			mongodbLabel	= mongodb.find('label'),
			mongodbInput	= mongodbLabel.next('input'),

			couchdb			= documentItems.eq(1).children('span'),
			couchdbLabel	= couchdb.find('label'),
			couchdbInput	= couchdbLabel.next('input');

		// when
		mongodbLabel.click();
		couchdbLabel.click();
		neo4jLabel.click();

		// then
		expect(rubyLabel).toHaveClass('treefy-unchecked');
		expect(rubyInput).not.toBeChecked();

		expect(nosqlLabel).toHaveClass('treefy-checked');
		expect(nosqlInput).toBeChecked();

		expect(neo4jLabel).toHaveClass('treefy-checked');
		expect(neo4jInput).toBeChecked();

		expect(documentLabel).toHaveClass('treefy-checked');
		expect(documentInput).toBeChecked();

		expect(mongodbLabel).toHaveClass('treefy-checked');
		expect(mongodbInput).toBeChecked();

		expect(couchdbLabel).toHaveClass('treefy-checked');
		expect(couchdbInput).toBeChecked();
	});

	it ('should uncheck all folder levels by cascade', function() {
		// given
		var json			= '{ "tree": [ { "text": "Ruby", "checkbox": { "id": "ruby" } }, { "text": "NoSQL", "checkbox": { "id": "nosql" }, "state": "opened", "children": [ { "text": "Neo4j", "checkbox": { "id": "neo4j" } }, { "text": "Document", "checkbox": { "id": "document" }, "children": [ { "text": "MongoDB", "checkbox": { "id": "mongodb" } }, { "text": "CouchDB", "checkbox": { "id": "couchdb" } } ] } ] } ] }',
			$this			= $('#tree').treefy({ checkbox: true, data: json }),
			items			= $this.children('ul').children('li'),

			ruby			= items.eq(0).children('span'),
			rubyLabel		= ruby.find('label'),
			rubyInput		= ruby.find('input'),

			nosql			= items.eq(1).children('span'),
			nosqlLabel		= nosql.find('label'),
			nosqlInput		= nosqlLabel.next('input'),
			nosqlItems		= nosql.next('ul').children('li'),

			neo4j			= nosqlItems.eq(0).children('span'),
			neo4jLabel		= neo4j.find('label'),
			neo4jInput		= neo4jLabel.next('input'),

			document		= nosqlItems.eq(1).children('span'),
			documentLabel	= document.find('label'),
			documentInput	= documentLabel.next('input'),
			documentItems	= document.next('ul').children('li'),

			mongodb			= documentItems.eq(0).children('span'),
			mongodbLabel	= mongodb.find('label'),
			mongodbInput	= mongodbLabel.next('input'),

			couchdb			= documentItems.eq(1).children('span'),
			couchdbLabel	= couchdb.find('label'),
			couchdbInput	= couchdbLabel.next('input');

		// when
		nosqlLabel.click().click();

		// then
		expect(rubyLabel).toHaveClass('treefy-unchecked');
		expect(rubyInput).not.toBeChecked();

		expect(nosqlLabel).toHaveClass('treefy-unchecked');
		expect(nosqlInput).not.toBeChecked();

		expect(neo4jLabel).toHaveClass('treefy-unchecked');
		expect(neo4jInput).not.toBeChecked();

		expect(documentLabel).toHaveClass('treefy-unchecked');
		expect(documentInput).not.toBeChecked();

		expect(mongodbLabel).toHaveClass('treefy-unchecked');
		expect(mongodbInput).not.toBeChecked();

		expect(couchdbLabel).toHaveClass('treefy-unchecked');
		expect(couchdbInput).not.toBeChecked();
	});

	it ('should uncheck all second folder level by cascade and partial on first', function() {
		// given
		var json			= '{ "tree": [ { "text": "Ruby", "checkbox": { "id": "ruby" } }, { "text": "NoSQL", "checkbox": { "id": "nosql" }, "state": "opened", "children": [ { "text": "Neo4j", "checkbox": { "id": "neo4j" } }, { "text": "Document", "checkbox": { "id": "document" }, "children": [ { "text": "MongoDB", "checkbox": { "id": "mongodb" } }, { "text": "CouchDB", "checkbox": { "id": "couchdb" } } ] } ] } ] }',
			$this			= $('#tree').treefy({ checkbox: true, data: json }),
			items			= $this.children('ul').children('li'),

			ruby			= items.eq(0).children('span'),
			rubyLabel		= ruby.find('label'),
			rubyInput		= ruby.find('input'),

			nosql			= items.eq(1).children('span'),
			nosqlLabel		= nosql.find('label'),
			nosqlInput		= nosqlLabel.next('input'),
			nosqlItems		= nosql.next('ul').children('li'),

			neo4j			= nosqlItems.eq(0).children('span'),
			neo4jLabel		= neo4j.find('label'),
			neo4jInput		= neo4jLabel.next('input'),

			document		= nosqlItems.eq(1).children('span'),
			documentLabel	= document.find('label'),
			documentInput	= documentLabel.next('input'),
			documentItems	= document.next('ul').children('li'),

			mongodb			= documentItems.eq(0).children('span'),
			mongodbLabel	= mongodb.find('label'),
			mongodbInput	= mongodbLabel.next('input'),

			couchdb			= documentItems.eq(1).children('span'),
			couchdbLabel	= couchdb.find('label'),
			couchdbInput	= couchdbLabel.next('input');

		// when
		nosqlLabel.click();
		documentLabel.click();

		// then
		expect(rubyLabel).toHaveClass('treefy-unchecked');
		expect(rubyInput).not.toBeChecked();

		expect(nosqlLabel).toHaveClass('treefy-partial');
		expect(nosqlInput).not.toBeChecked();

		expect(neo4jLabel).toHaveClass('treefy-checked');
		expect(neo4jInput).toBeChecked();

		expect(documentLabel).toHaveClass('treefy-unchecked');
		expect(documentInput).not.toBeChecked();

		expect(mongodbLabel).toHaveClass('treefy-unchecked');
		expect(mongodbInput).not.toBeChecked();

		expect(couchdbLabel).toHaveClass('treefy-unchecked');
		expect(couchdbInput).not.toBeChecked();
	});

	it ('should partial all levels when uncheck one item from last level', function() {
		// given
		var json			= '{ "tree": [ { "text": "Ruby", "checkbox": { "id": "ruby" } }, { "text": "NoSQL", "checkbox": { "id": "nosql" }, "state": "opened", "children": [ { "text": "Neo4j", "checkbox": { "id": "neo4j" } }, { "text": "Document", "checkbox": { "id": "document" }, "children": [ { "text": "MongoDB", "checkbox": { "id": "mongodb" } }, { "text": "CouchDB", "checkbox": { "id": "couchdb" } } ] } ] } ] }',
			$this			= $('#tree').treefy({ checkbox: true, data: json }),
			items			= $this.children('ul').children('li'),

			ruby			= items.eq(0).children('span'),
			rubyLabel		= ruby.find('label'),
			rubyInput		= ruby.find('input'),

			nosql			= items.eq(1).children('span'),
			nosqlLabel		= nosql.find('label'),
			nosqlInput		= nosqlLabel.next('input'),
			nosqlItems		= nosql.next('ul').children('li'),

			neo4j			= nosqlItems.eq(0).children('span'),
			neo4jLabel		= neo4j.find('label'),
			neo4jInput		= neo4jLabel.next('input'),

			document		= nosqlItems.eq(1).children('span'),
			documentLabel	= document.find('label'),
			documentInput	= documentLabel.next('input'),
			documentItems	= document.next('ul').children('li'),

			mongodb			= documentItems.eq(0).children('span'),
			mongodbLabel	= mongodb.find('label'),
			mongodbInput	= mongodbLabel.next('input'),

			couchdb			= documentItems.eq(1).children('span'),
			couchdbLabel	= couchdb.find('label'),
			couchdbInput	= couchdbLabel.next('input');

		// when
		nosqlLabel.click();
		couchdbLabel.click();

		// then
		expect(rubyLabel).toHaveClass('treefy-unchecked');
		expect(rubyInput).not.toBeChecked();

		expect(nosqlLabel).toHaveClass('treefy-partial');
		expect(nosqlInput).not.toBeChecked();

		expect(neo4jLabel).toHaveClass('treefy-checked');
		expect(neo4jInput).toBeChecked();

		expect(documentLabel).toHaveClass('treefy-partial');
		expect(documentInput).not.toBeChecked();

		expect(mongodbLabel).toHaveClass('treefy-checked');
		expect(mongodbInput).toBeChecked();

		expect(couchdbLabel).toHaveClass('treefy-unchecked');
		expect(couchdbInput).not.toBeChecked();
	});

	it ('should not check all second levels by cascade when checkDown is false', function() {
		// given
		var json			= '{ "tree": [ { "text": "Ruby", "checkbox": { "id": "ruby" } }, { "text": "NoSQL", "checkbox": { "id": "nosql" }, "state": "opened", "children": [ { "text": "Neo4j", "checkbox": { "id": "neo4j" } }, { "text": "Document", "checkbox": { "id": "document" }, "children": [ { "text": "MongoDB", "checkbox": { "id": "mongodb" } }, { "text": "CouchDB", "checkbox": { "id": "couchdb" } } ] } ] } ] }',
			$this			= $('#tree').treefy({ checkDown: false, checkbox: true, data: json }),
			items			= $this.children('ul').children('li'),

			ruby			= items.eq(0).children('span'),
			rubyLabel		= ruby.find('label'),
			rubyInput		= ruby.find('input'),

			nosql			= items.eq(1).children('span'),
			nosqlLabel		= nosql.find('label'),
			nosqlInput		= nosqlLabel.next('input'),
			nosqlItems		= nosql.next('ul').children('li'),

			neo4j			= nosqlItems.eq(0).children('span'),
			neo4jLabel		= neo4j.find('label'),
			neo4jInput		= neo4jLabel.next('input'),

			document		= nosqlItems.eq(1).children('span'),
			documentLabel	= document.find('label'),
			documentInput	= documentLabel.next('input'),
			documentItems	= document.next('ul').children('li'),

			mongodb			= documentItems.eq(0).children('span'),
			mongodbLabel	= mongodb.find('label'),
			mongodbInput	= mongodbLabel.next('input'),

			couchdb			= documentItems.eq(1).children('span'),
			couchdbLabel	= couchdb.find('label'),
			couchdbInput	= couchdbLabel.next('input');

		// when
		nosqlLabel.click();

		// then
		expect(rubyLabel).toHaveClass('treefy-unchecked');
		expect(rubyInput).not.toBeChecked();

		expect(nosqlLabel).toHaveClass('treefy-checked');
		expect(nosqlInput).toBeChecked();

		expect(neo4jLabel).toHaveClass('treefy-unchecked');
		expect(neo4jInput).not.toBeChecked();

		expect(documentLabel).toHaveClass('treefy-unchecked');
		expect(documentInput).not.toBeChecked();

		expect(mongodbLabel).toHaveClass('treefy-unchecked');
		expect(mongodbInput).not.toBeChecked();

		expect(couchdbLabel).toHaveClass('treefy-unchecked');
		expect(couchdbInput).not.toBeChecked();
	});

	it ('should not check parent folders when checkUp is false', function() {
		// given
		var json			= '{ "tree": [ { "text": "Ruby", "checkbox": { "id": "ruby" } }, { "text": "NoSQL", "checkbox": { "id": "nosql" }, "state": "opened", "children": [ { "text": "Neo4j", "checkbox": { "id": "neo4j" } }, { "text": "Document", "checkbox": { "id": "document" }, "children": [ { "text": "MongoDB", "checkbox": { "id": "mongodb" } }, { "text": "CouchDB", "checkbox": { "id": "couchdb" } } ] } ] } ] }',
			$this			= $('#tree').treefy({ checkUp: false, checkbox: true, data: json }),
			items			= $this.children('ul').children('li'),

			ruby			= items.eq(0).children('span'),
			rubyLabel		= ruby.find('label'),
			rubyInput		= ruby.find('input'),

			nosql			= items.eq(1).children('span'),
			nosqlLabel		= nosql.find('label'),
			nosqlInput		= nosqlLabel.next('input'),
			nosqlItems		= nosql.next('ul').children('li'),

			neo4j			= nosqlItems.eq(0).children('span'),
			neo4jLabel		= neo4j.find('label'),
			neo4jInput		= neo4jLabel.next('input'),

			document		= nosqlItems.eq(1).children('span'),
			documentLabel	= document.find('label'),
			documentInput	= documentLabel.next('input'),
			documentItems	= document.next('ul').children('li'),

			mongodb				= documentItems.eq(0).children('span'),
			mongodbLabel	= mongodb.find('label'),
			mongodbInput	= mongodbLabel.next('input'),

			couchdb				= documentItems.eq(1).children('span'),
			couchdbLabel	= couchdb.find('label'),
			couchdbInput	= couchdbLabel.next('input');

		// when
		mongodbLabel.click();
		couchdbLabel.click();

		// then
		expect(rubyLabel).toHaveClass('treefy-unchecked');
		expect(rubyInput).not.toBeChecked();

		expect(nosqlLabel).toHaveClass('treefy-unchecked');
		expect(nosqlInput).not.toBeChecked();

		expect(neo4jLabel).toHaveClass('treefy-unchecked');
		expect(neo4jInput).not.toBeChecked();

		expect(documentLabel).toHaveClass('treefy-unchecked');
		expect(documentInput).not.toBeChecked();

		expect(mongodbLabel).toHaveClass('treefy-checked');
		expect(mongodbInput).toBeChecked();

		expect(couchdbLabel).toHaveClass('treefy-checked');
		expect(couchdbInput).toBeChecked();
	});

	it ('should check parent folders as checked when partial is false and has at least one children selected', function() {
		// given
		var json			= '{ "tree": [ { "text": "Ruby", "checkbox": { "id": "ruby" } }, { "text": "NoSQL", "checkbox": { "id": "nosql" }, "state": "opened", "children": [ { "text": "Neo4j", "checkbox": { "id": "neo4j" } }, { "text": "Document", "checkbox": { "id": "document" }, "children": [ { "text": "MongoDB", "checkbox": { "id": "mongodb" } }, { "text": "CouchDB", "checkbox": { "id": "couchdb" } } ] } ] } ] }',
			$this			= $('#tree').treefy({ checkbox: true, data: json, partial: false }),
			items			= $this.children('ul').children('li'),

			ruby			= items.eq(0).children('span'),
			rubyLabel		= ruby.find('label'),
			rubyInput		= ruby.find('input'),

			nosql			= items.eq(1).children('span'),
			nosqlLabel		= nosql.find('label'),
			nosqlInput		= nosqlLabel.next('input'),
			nosqlItems		= nosql.next('ul').children('li'),

			neo4j			= nosqlItems.eq(0).children('span'),
			neo4jLabel		= neo4j.find('label'),
			neo4jInput		= neo4jLabel.next('input'),

			document		= nosqlItems.eq(1).children('span'),
			documentLabel	= document.find('label'),
			documentInput	= documentLabel.next('input'),
			documentItems	= document.next('ul').children('li'),

			mongodb			= documentItems.eq(0).children('span'),
			mongodbLabel	= mongodb.find('label'),
			mongodbInput	= mongodbLabel.next('input'),

			couchdb			= documentItems.eq(1).children('span'),
			couchdbLabel	= couchdb.find('label'),
			couchdbInput	= couchdbLabel.next('input');

		// when
		mongodbLabel.click();

		// then
		expect(rubyLabel).toHaveClass('treefy-unchecked');
		expect(rubyInput).not.toBeChecked();

		expect(nosqlLabel).toHaveClass('treefy-checked');
		expect(nosqlInput).toBeChecked();

		expect(neo4jLabel).toHaveClass('treefy-unchecked');
		expect(neo4jInput).not.toBeChecked();

		expect(documentLabel).toHaveClass('treefy-checked');
		expect(documentInput).toBeChecked();

		expect(mongodbLabel).toHaveClass('treefy-checked');
		expect(mongodbInput).toBeChecked();

		expect(couchdbLabel).toHaveClass('treefy-unchecked');
		expect(couchdbInput).not.toBeChecked();
	});

	it ('should check with cascade up via function', function() {
		// given
		var json			= '{ "tree": [ { "text": "NoSQL", "checkbox": { "id": "nosql" }, "children": [ { "text": "MongoDB", "checkbox": { "id": "mongodb" } } ] } ] }',
			$this			= $('#tree').treefy({ checkbox: true, data: json }),
			items			= $this.children('ul').children('li'),
			nosql			= items.eq(0).children('span'),
			nosqlLabel		= nosql.find('label'),
			nosqlInput		= nosqlLabel.next('input'),
			nosqlItems		= nosql.next('ul').children('li'),

			mongodb			= nosqlItems.eq(0).children('span'),
			mongodbLabel	= mongodb.find('label'),
			mongodbInput	= mongodbLabel.next('input');

		// when
		mongodbInput.treefy('check', true);

		// then
		expect(nosqlLabel).toHaveClass('treefy-checked');
		expect(nosqlInput).toBeChecked();
		expect(mongodbLabel).toHaveClass('treefy-checked');
		expect(mongodbInput).toBeChecked();
	});

	it ('should not UNcheck all second levels by cascade when uncheckDown is false', function() {
		// given
		var json			= '{ "tree": [ { "text": "Ruby", "checkbox": { "id": "ruby" } }, { "text": "NoSQL", "checkbox": { "id": "nosql" }, "state": "opened", "children": [ { "text": "Neo4j", "checkbox": { "id": "neo4j" } }, { "text": "Document", "checkbox": { "id": "document" }, "children": [ { "text": "MongoDB", "checkbox": { "id": "mongodb" } }, { "text": "CouchDB", "checkbox": { "id": "couchdb" } } ] } ] } ] }',
			$this			= $('#tree').treefy({ uncheckDown: false, checkbox: true, data: json }),
			items			= $this.children('ul').children('li'),

			ruby			= items.eq(0).children('span'),
			rubyLabel		= ruby.find('label'),
			rubyInput		= ruby.find('input'),

			nosql			= items.eq(1).children('span'),
			nosqlLabel		= nosql.find('label'),
			nosqlInput		= nosqlLabel.next('input'),
			nosqlItems		= nosql.next('ul').children('li'),

			neo4j			= nosqlItems.eq(0).children('span'),
			neo4jLabel		= neo4j.find('label'),
			neo4jInput		= neo4jLabel.next('input'),

			document		= nosqlItems.eq(1).children('span'),
			documentLabel	= document.find('label'),
			documentInput	= documentLabel.next('input'),
			documentItems	= document.next('ul').children('li'),

			mongodb			= documentItems.eq(0).children('span'),
			mongodbLabel	= mongodb.find('label'),
			mongodbInput	= mongodbLabel.next('input'),

			couchdb			= documentItems.eq(1).children('span'),
			couchdbLabel	= couchdb.find('label'),
			couchdbInput	= couchdbLabel.next('input');

		// when
		nosqlLabel.click().click();

		// then
		expect(rubyLabel).toHaveClass('treefy-unchecked');
		expect(rubyInput).not.toBeChecked();

		expect(nosqlLabel).toHaveClass('treefy-unchecked');
		expect(nosqlInput).not.toBeChecked();

		expect(neo4jLabel).toHaveClass('treefy-checked');
		expect(neo4jInput).toBeChecked();

		expect(documentLabel).toHaveClass('treefy-checked');
		expect(documentInput).toBeChecked();

		expect(mongodbLabel).toHaveClass('treefy-checked');
		expect(mongodbInput).toBeChecked();

		expect(couchdbLabel).toHaveClass('treefy-checked');
		expect(couchdbInput).toBeChecked();
	});

	it ('[text] should be a link when JSON has the link element', function() {
		// given
		var $this	= $('#tree'),
			 json	= '{ "tree": [ { "text": "Ruby", "icon": "star", "link": "http://link", "target": "_blank", "checkbox": { "id": "ruby" } } ] }';

		// when
		$this.treefy({ checkbox: true, data: json });

		// then
		var tree	= $this.children('ul'),  
			items	= tree.children('li'),  
			java	= items.eq(0);

		expect(java.children('span').children('a')).toExist();
		expect(java.children('span').children('a')).toHaveHtml('Ruby');
		expect(java.children('span').children('a')).toHaveAttr('target', '_blank');
	});

	it ('[text] should be a label when JSON has not the link element', function() {
		// given
		var $this	= $('#tree'),
			 json	= '{ "tree": [ { "text": "Ruby", "icon": "star", "checkbox": { "id": "ruby" } } ] }';

		// when
		$this.treefy({ checkbox: true, data: json });

		// then
		var tree	= $this.children('ul'),  
			items	= tree.children('li'),  
			java	= items.eq(0);

		expect(java.children('span').children('a')).not.toExist();
		expect(java.children('span').children('span').eq(3)).toHaveHtml('Ruby');
	});

	it ('[text] should be a label when JSON has not the link element', function() {
		// given
		var $this	= $('#tree'),
			 json	= '{ "tree": [ { "text": "Ruby", "icon": "star", "checkbox": { "id": "ruby" } } ] }';

		// when
		$this.treefy({ checkbox: true, data: json });

		// then
		var tree	= $this.children('ul'),  
			items	= tree.children('li'),  
			java	= items.eq(0);

		expect(java.children('span').children('a')).not.toExist();
		expect(java.children('span').children('span').eq(3)).toHaveHtml('Ruby');
	});

	it ('[checkbox] should start checked with checked value', function() {
		// given
		var json	= '{ "tree": [ { "text": "Ruby", "checkbox": { "id": "ruby", "checked": "checked" } } ] }';

		// when
		var $this = $('#tree').treefy({ checkbox: true, data: json });

		// then
		var items		= $this.children('ul').children('li'),
			ruby		= items.eq(0).children('span'),
			rubyLabel	= ruby.find('label'),
			rubyInput	= ruby.find('input');

		expect(rubyLabel).toHaveClass('treefy-checked');
		expect(rubyInput).toHaveAttr('checked', 'checked');
		expect(rubyInput).toBeChecked();
		expect(rubyLabel).not.toHaveClass('treefy-disabled');
		expect(rubyInput).not.toBeDisabled();
	});

	it ('[checkbox] should start checked with true value', function() {
		// given
		var json	= '{ "tree": [ { "text": "Ruby", "checkbox": { "id": "ruby", "checked": true } } ] }';

		// when
		var $this = $('#tree').treefy({ checkbox: true, data: json });

		// then
		var items		= $this.children('ul').children('li'),
			ruby		= items.eq(0).children('span'),
			rubyLabel	= ruby.find('label'),
			rubyInput	= ruby.find('input');

		expect(rubyLabel).toHaveClass('treefy-checked');
		expect(rubyInput).toHaveAttr('checked', 'checked');
		expect(rubyInput).toBeChecked();
		expect(rubyLabel).not.toHaveClass('treefy-disabled');
		expect(rubyInput).not.toBeDisabled();
	});

	it ('[checkbox] should start checked with empty value', function() {
		// given
		var json	= '{ "tree": [ { "text": "Ruby", "checkbox": { "id": "ruby", "checked": "" } } ] }';

		// when
		var $this = $('#tree').treefy({ checkbox: true, data: json });

		// then
		var items		= $this.children('ul').children('li'),
			ruby		= items.eq(0).children('span'),
			rubyLabel	= ruby.find('label'),
			rubyInput	= ruby.find('input');

		expect(rubyLabel).toHaveClass('treefy-checked');
		expect(rubyInput).toHaveAttr('checked', 'checked');
		expect(rubyInput).toBeChecked();
		expect(rubyLabel).not.toHaveClass('treefy-disabled');
		expect(rubyInput).not.toBeDisabled();
	});

	it ('[checkbox] should start disabled with disabled value', function() {
		// given
		var json	= '{ "tree": [ { "text": "Ruby", "checkbox": { "id": "ruby", "disabled": "disabled" } } ] }';

		// when
		var $this = $('#tree').treefy({ checkbox: true, data: json });

		// then
		var items		= $this.children('ul').children('li'),
			ruby		= items.eq(0).children('span'),
			rubyLabel	= ruby.find('label'),
			rubyInput	= ruby.find('input');

		expect(rubyLabel).toHaveClass('treefy-disabled');
		expect(rubyLabel).toHaveAttr('style', 'cursor: default; opacity: 0.6;');
		expect(rubyInput).toHaveAttr('disabled', 'disabled');
		expect(rubyInput).not.toBeChecked();
		expect(rubyInput).toBeDisabled();
	});

	it ('[checkbox] should start disabled with true value', function() {
		// given
		var json	= '{ "tree": [ { "text": "Ruby", "checkbox": { "id": "ruby", "disabled": true } } ] }';

		// when
		var $this = $('#tree').treefy({ checkbox: true, data: json });

		// then
		var items		= $this.children('ul').children('li'),
			ruby		= items.eq(0).children('span'),
			rubyLabel	= ruby.find('label'),
			rubyInput	= ruby.find('input');

		expect(rubyLabel).toHaveClass('treefy-disabled');
		expect(rubyLabel).toHaveAttr('style', 'cursor: default; opacity: 0.6;');
		expect(rubyInput).toHaveAttr('disabled', 'disabled');
		expect(rubyInput).not.toBeChecked();
		expect(rubyInput).toBeDisabled();
	});

	it ('[checkbox] should start disabled with empty value', function() {
		// given
		var json	= '{ "tree": [ { "text": "Ruby", "checkbox": { "id": "ruby", "disabled": "" } } ] }';

		// when
		var $this = $('#tree').treefy({ checkbox: true, data: json });

		// then
		var items		= $this.children('ul').children('li'),
			ruby		= items.eq(0).children('span'),
			rubyLabel	= ruby.find('label'),
			rubyInput	= ruby.find('input');

		expect(rubyLabel).toHaveClass('treefy-disabled');
		expect(rubyLabel).toHaveAttr('style', 'cursor: default; opacity: 0.6;');
		expect(rubyInput).toHaveAttr('disabled', 'disabled');
		expect(rubyInput).not.toBeChecked();
		expect(rubyInput).toBeDisabled();
	});

	it ('[checkbox] should start checked and disabled', function() {
		// given
		var json	= '{ "tree": [ { "text": "Ruby", "checkbox": { "id": "ruby", "checked": true, "disabled": true } } ] }';

		// when
		var $this = $('#tree').treefy({ checkbox: true, data: json });

		// then
		var items		= $this.children('ul').children('li'),
			ruby		= items.eq(0).children('span'),
			rubyLabel	= ruby.find('label'),
			rubyInput	= ruby.find('input');

		expect(rubyLabel).toHaveClass('treefy-disabled-checked');
		expect(rubyLabel).toHaveAttr('style', 'cursor: default; opacity: 0.6;');
		expect(rubyInput).toHaveAttr('disabled', 'disabled');
		expect(rubyInput).toHaveAttr('checked', 'checked');
		expect(rubyInput).toBeChecked();
		expect(rubyInput).toBeDisabled();
	});

});

describe('Functions', function() {

	beforeEach(function() {
	    $('body').append('<div id="tree"></div>');
	});

	afterEach(function() {
		$('#tree').remove();
	});

	it ('should disable unchecked item', function() {
		// given
		var json		= '{ "tree": [ { "text": "Ruby", "checkbox": { "id": "ruby" } } ] }',
			$this		= $('#tree').treefy({ uncheckDown: false, checkbox: true, data: json }),
			items		= $this.children('ul').children('li'),
	
			ruby		= items.eq(0).children('span'),
			rubyLabel	= ruby.find('label'),
			rubyInput	= ruby.find('input');
	
		// when
		rubyInput.treefy('enable', false);
	
		// then
		expect(rubyLabel).toHaveClass('treefy-disabled');
		expect(rubyLabel).not.toHaveClass('treefy-unchecked');
		expect(rubyInput).toBeDisabled();
		expect(rubyInput).not.toBeChecked();
	});
	
	it ('should disable checked item', function() {
		// given
		var json		= '{ "tree": [ { "text": "Ruby", "checkbox": { "id": "ruby" } } ] }',
			$this		= $('#tree').treefy({ uncheckDown: false, checkbox: true, data: json }),
			items		= $this.children('ul').children('li'),
	
			ruby		= items.eq(0).children('span'),
			rubyLabel	= ruby.find('label'),
			rubyInput	= ruby.find('input');
	
		// when
		rubyInput.treefy('check', true).treefy('enable', false);
	
		// then
		expect(rubyLabel).toHaveClass('treefy-disabled-checked');
		expect(rubyLabel).not.toHaveClass('treefy-unchecked');
		expect(rubyInput).toBeDisabled();
		expect(rubyInput).toBeChecked();
	});
	
	it ('should enable checked item', function() {
		// given
		var json		= '{ "tree": [ { "text": "Ruby", "checkbox": { "id": "ruby" } } ] }',
			$this		= $('#tree').treefy({ uncheckDown: false, checkbox: true, data: json }),
			items		= $this.children('ul').children('li'),
	
			ruby		= items.eq(0).children('span'),
			rubyLabel	= ruby.find('label'),
			rubyInput	= ruby.find('input');
	
		// when
		rubyInput.treefy('check', true).treefy('enable', true);
	
		// then
		expect(rubyLabel).not.toHaveClass('treefy-disabled-checked');
		expect(rubyLabel).toHaveClass('treefy-checked');
		expect(rubyInput).not.toBeDisabled();
		expect(rubyInput).toBeChecked();
	});
	
	it ('[enable] should not check when it is disabled', function() {
		// given
		var json	= '{ "tree": [ { "text": "Ruby", "checkbox": { "id": "ruby" } } ] }',
			$this	= $('#tree').treefy({ checkbox: true, data: json }),
			items	= $this.children('ul').children('li'),
	
			ruby		= items.eq(0).children('span'),
			rubyLabel	= ruby.find('label'),
			rubyInput	= ruby.find('input');
	
		// when
		rubyInput.treefy('enable', false);
		rubyLabel.click();
	
		// then
		expect(rubyLabel).toHaveClass('treefy-disabled');
		expect(rubyLabel).not.toHaveClass('treefy-checked');
		expect(rubyInput).toBeDisabled();
		expect(rubyInput).not.toBeChecked();
	});
	
	it ('[enable] should not uncheck when it is disabled', function() {
		// given
		var json	= '{ "tree": [ { "text": "Ruby", "checkbox": { "id": "ruby" } } ] }',
			$this	= $('#tree').treefy({ checkbox: true, data: json }),
			items	= $this.children('ul').children('li'),
	
			ruby		= items.eq(0).children('span'),
			rubyLabel	= ruby.find('label'),
			rubyInput	= ruby.find('input');
	
		// when
		rubyLabel.click();
		rubyInput.treefy('enable', false);
		rubyLabel.click();
	
		// then
		expect(rubyLabel).toHaveClass('treefy-disabled-checked');
		expect(rubyLabel).not.toHaveClass('treefy-disabled');
		expect(rubyLabel).not.toHaveClass('treefy-checked');
		expect(rubyInput).toBeDisabled();
		expect(rubyInput).toBeChecked();
	});

	it ('[enable] should not check with function when it is disabled', function() {
		// given
		var json	= '{ "tree": [ { "text": "Ruby", "checkbox": { "id": "ruby" } } ] }',
			$this	= $('#tree').treefy({ checkbox: true, data: json }),
			items	= $this.children('ul').children('li'),
	
			ruby		= items.eq(0).children('span'),
			rubyLabel	= ruby.find('label'),
			rubyInput	= ruby.find('input');
	
		// when
		rubyInput.treefy('enable', false).treefy('check', true);
	
		// then
		expect(rubyLabel).toHaveClass('treefy-disabled');
		expect(rubyLabel).not.toHaveClass('treefy-checked');
		expect(rubyInput).toBeDisabled();
		expect(rubyInput).not.toBeChecked();
	});

	it ('[enable] should not uncheck with function when it is disabled', function() {
		// given
		var json	= '{ "tree": [ { "text": "Ruby", "checkbox": { "id": "ruby" } } ] }',
			$this	= $('#tree').treefy({ checkbox: true, data: json }),
			items	= $this.children('ul').children('li'),
	
			ruby		= items.eq(0).children('span'),
			rubyLabel	= ruby.find('label'),
			rubyInput	= ruby.find('input');
	
		// when
		rubyInput.treefy('check', true).treefy('enable', false).treefy('check', false);
	
		// then
		expect(rubyLabel).toHaveClass('treefy-disabled-checked');
		expect(rubyLabel).not.toHaveClass('treefy-disabled');
		expect(rubyLabel).not.toHaveClass('treefy-checked');
		expect(rubyInput).toBeDisabled();
		expect(rubyInput).toBeChecked();
	});

	it ('[enable] should apply default cursor and opacity on enable false', function() {
		// given
		var json	= '{ "tree": [ { "text": "Ruby", "checkbox": { "id": "ruby" } } ] }',
			$this	= $('#tree').treefy({ checkbox: true, data: json }),
			items	= $this.children('ul').children('li'),
	
			ruby		= items.eq(0).children('span'),
			rubyLabel	= ruby.find('label'),
			rubyInput	= ruby.find('input');
	
		// when
		rubyInput.treefy('enable', false);
	
		// then
		expect(rubyLabel).toHaveAttr('style', 'cursor: default; opacity: 0.6;');
	});

	it ('[enable] should apply pointer cursor and opacity 1 on enable false', function() {
		// given
		var json	= '{ "tree": [ { "text": "Ruby", "checkbox": { "id": "ruby" } } ] }',
			$this	= $('#tree').treefy({ checkbox: true, data: json }),
			items	= $this.children('ul').children('li'),
	
			ruby		= items.eq(0).children('span'),
			rubyLabel	= ruby.find('label'),
			rubyInput	= ruby.find('input');
	
		// when
		rubyInput.treefy('enable', false).treefy('enable', true);
	
		// then
		expect(rubyLabel).toHaveAttr('style', 'cursor: pointer; opacity: 1;');
	});

});
