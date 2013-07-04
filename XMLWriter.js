//CREAR XML v3.0
function XMLWriter(encoding, version) {
	if (encoding)
		this.encoding = encoding;
	if (version)
		this.version = version;
};
(function () {

	XMLWriter.prototype = {
		basic: false,
		encoding: 'UTF-8', // what is the encoding 'ISO-8859-1'
		version: '1.0', //what xml version to use
		formatting: 'indented', //how to format the output (indented/none)  ?
		indentChar: '\t', //char to use for indent
		indentation: 1, //how many indentChar to add per level
		newLine: '\n', //character to separate nodes when formatting
		//start a new document, cleanup if we are reusing
		writeStartDocument: function (isBasic) {
			basic = isBasic;
			this.close(); //cleanup
			this.stack = [];
		},
		//get back to the root
		writeEndDocument: function () {
			this.active = this.root;
			this.stack = [];
		},
		//set the text of the doctype
		writeDocType: function (dt) {
			this.doctype = dt;
		},
		//start a new node with this name, and an optional namespace
		writeStartElement: function (name, ns) {
			if (ns)//namespace
				name = ns + ':' + name;

			var node = { n: name, a: {}, c: [] }; //(n)ame, (a)ttributes, (c)hildren

			if (this.active) {
				this.active.c.push(node);
				this.stack.push(this.active);
			} else
				this.root = node;
			this.active = node;
		},
		//go up one node, if we are in the root, ignore it
		writeEndElement: function () {
			this.active = this.stack.pop() || this.root;
		},
		//add an attribute to the active node
		writeAttributeString: function (name, value) {
			if (this.active)
				this.active.a[name] = MNS(value);
		},
		//add a text node to the active node
		writeString: function (text) {
			if (this.active)
				this.active.c.push(text);
		},
		//shortcut, open an element, write the text and close
		writeElementString: function (name, text, ns) {
			this.writeStartElement(name, ns);
			var str =MNS(text)
			if(str.length > 0) this.writeString(str);
			this.writeEndElement();
		},
		//add a text node wrapped with CDATA
		writeCDATA: function (text) {
			this.writeString('<![CDATA[' + text + ']]>');
		},
		//add a text node wrapped in a comment
		writeComment: function (text) {
			this.writeString('<!-- ' + text + ' -->');
		},
		//generate the xml string, you can skip closing the last nodes
		flush: function () {
			if (this.stack && this.stack[0])//ensure it's closed
				this.writeEndDocument();

			var 
			chr = '', indent = '', num = this.indentation,
			formatting = this.formatting.toLowerCase() == 'indented',
			buffer = (this.basic) ? '' : '<?xml version="' + this.version + '" encoding="' + this.encoding + '" ?>';

			buffer = [buffer];

			if (this.doctype && this.root)
				buffer.push('<!DOCTYPE ' + this.root.n + ' ' + this.doctype + '>');

			if (formatting) {
				while (num--)
					chr += this.indentChar;
			}

			if (this.root)//skip if no element was added
				format(this.root, indent, chr, buffer);

			return buffer.join(formatting ? this.newLine : '');
		},
		//agregar encabezado 
		addHead :  function(){
		
		},
		//cleanup, don't use again without calling startDocument
		close: function () {
			if (this.root)
				clean(this.root);
			this.active = this.root = this.stack = null;
		},
		getDocument: window.ActiveXObject
		? function () { //MSIE
			var doc = new ActiveXObject('Microsoft.XMLDOM');
			doc.async = false;
			doc.loadXML(this.flush());
			return doc;
		}
		: function () {// Mozilla, Firefox, Opera, etc.
			return (new DOMParser()).parseFromString(this.flush(), 'text/xml');
		}
	};

	//utility, you don't need it
	function clean(node) {
		var l = node.c.length;
		while (l--) {
			if (typeof node.c[l] == 'object')
				clean(node.c[l]);
		}
		node.n = node.a = node.c = null;
	};

	//utility, you don't need it
	function format(node, indent, chr, buffer) {
		var 
		xml = indent + '<' + node.n,
		nc = node.c.length,
		attr, child, i = 0;

		for (attr in node.a)
			xml += ' ' + attr + '="' + node.a[attr] + '"';

		xml += nc ? '>' : ' />';

		buffer.push(xml);

		if (nc) {
			do {
				child = node.c[i++];
				if (typeof child == 'string') {
					if (nc == 1)//single text node
						return buffer.push(buffer.pop() + child + '</' + node.n + '>');
					else //regular text node
						buffer.push(indent + chr + child);
				} else if (typeof child == 'object') //element node
					format(child, indent + chr, chr, buffer);
			} while (i < nc);
			buffer.push(indent + '</' + node.n + '>');
		}
	};

})();
//XMLWriter for Javascript //http://demos.flesler.com/XMLWriter/
//Introduction
//This is a Javascript class, based on .NET's XMLTextWriter.
//This is not a port, but a reduced and adapted version. 

//Constructor

//The constructor accepts 2 optional arguments: encoding, and version. You call it like this:
//var xw = new XMLWriter( 'UTF-8', '1.0' );
//Methods

//Class instances have the following methods:
//writeStartDocument([ bool standalone ])

//Opens a new document, must be call on start, if standalone is specified, standalone="true/false" will be added to the header.
//writeEndDocument()

//Closes the active document, it's not really mandatory to call it.
//writeDocType( string declarations )

//Adds a doctype to the document, can be called at anytime. If specified, a doctype will be included in the generated xml, in this form:
//<!DOCTYPE root-element declarations>
//writeStartElement( string name [, string ns ] )

//Creates a new node element with this name, and it becomes the active element. A namespace can be specified.
//writeEndElement()

//Closes the active element and goes up one level.
//writeAttributeString( string attr, string value )

//Adds an attribute to the active element.
//writeString( string text )

//Adds a text node to the active element.
//writeElementString( string name, string txt [, string ns ] )

//Shortcut method, creates an element, adds the text and closes it.
//writeCDATA( string text )

//Adds a text node wrapped with CDATA, to the active element.
//writeComment( string text )

//Adds a comment node to the active element.
//flush(): string

//Generates the XML string and returns it.
//close()

//Closes the writer and cleans up.
//getDocument()

//Generates a real XMLDocument from the writer. This method doesn't belong to the original class.
//Formatting

//You can choose whether the generated XML is formatted or not, and how. You can modify the following options for each instance or from XMLWriter.prototype to affect them all:
//encoding 'ISO-8859-1' by default.
//version '1.0' by default.
//formatting 'indented'(default) or 'none'.
//indentChar '\t' by default, char to indent.
//indentation # of chars added per level, 1 by default.
//newLine '\n' by default, char to separate lines.
//If you choose formatting = 'none', you don't need to modify indentChar, indentation or newLine. 
