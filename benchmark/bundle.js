(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* jshint evil:true */

var Benchmark = require('benchmark')
  , fs = require('fs')
  , Fragment = require('../lib/fragment')
  , suite = new Benchmark.Suite
    // All javascript keywords as of ES6
  , keywords = require('./js-keywords.json')
  , v8regex
  , automaton = new Fragment('')
  , i = 0
  , ii = 0
  , jquery = "(function( global, factory ) {\n\n  if ( typeof module === \"object\" && typeof module.exports === \"object\" ) {\n    // For CommonJS and CommonJS-like environments where a proper window is present,\n    // execute the factory and get jQuery\n    // For environments that do not inherently posses a window with a document\n    // (such as Node.js), expose a jQuery-making factory as module.exports\n    // This accentuates the need for the creation of a real window\n    // e.g. var jQuery = require(\"jquery\")(window);\n    // See ticket #14549 for more info\n    module.exports = global.document ?\n      factory( global, true ) :\n      function( w ) {\n        if ( !w.document ) {\n          throw new Error( \"jQuery requires a window with a document\" );\n        }\n        return factory( w );\n      };\n  } else {\n    factory( global );\n  }\n\n// Pass this if window is not defined yet\n}(typeof window !== \"undefined\" ? window : this, function( window, noGlobal ) {\n\n// Can't do this because several apps including ASP.NET trace\n// the stack via arguments.caller.callee and Firefox dies if\n// you try to trace through \"use strict\" call chains. (#13335)\n// Support: Firefox 18+\n//\n\nvar deletedIds = [];\n\nvar slice = deletedIds.slice;\n\nvar concat = deletedIds.concat;\n\nvar push = deletedIds.push;\n\nvar indexOf = deletedIds.indexOf;\n\nvar class2type = {};\n\nvar toString = class2type.toString;\n\nvar hasOwn = class2type.hasOwnProperty;\n\nvar support = {};\n\n\n\nvar\n  version = \"1.11.1\",\n\n  // Define a local copy of jQuery\n  jQuery = function( selector, context ) {\n    // The jQuery object is actually just the init constructor 'enhanced'\n    // Need init if jQuery is called (just allow error to be thrown if not included)\n    return new jQuery.fn.init( selector, context );\n  },\n\n  // Support: Android<4.1, IE<9\n  // Make sure we trim BOM and NBSP\n  rtrim = /^[\\s\\uFEFF\\xA0]+|[\\s\\uFEFF\\xA0]+$/g,\n\n  // Matches dashed string for camelizing\n  rmsPrefix = /^-ms-/,\n  rdashAlpha = /-([\\da-z])/gi,\n\n  // Used by jQuery.camelCase as callback to replace()\n  fcamelCase = function( all, letter ) {\n    return letter.toUpperCase();\n  };\n\njQuery.fn = jQuery.prototype = {\n  // The current version of jQuery being used\n  jquery: version,\n\n  constructor: jQuery,\n\n  // Start with an empty selector\n  selector: \"\",\n\n  // The default length of a jQuery object is 0\n  length: 0,\n\n  toArray: function() {\n    return slice.call( this );\n  },\n\n  // Get the Nth element in the matched element set OR\n  // Get the whole matched element set as a clean array\n  get: function( num ) {\n    return num != null ?\n\n      // Return just the one element from the set\n      ( num < 0 ? this[ num + this.length ] : this[ num ] ) :\n\n      // Return all the elements in a clean array\n      slice.call( this );\n  },\n\n  // Take an array of elements and push it onto the stack\n  // (returning the new matched element set)\n  pushStack: function( elems ) {\n\n    // Build a new jQuery matched element set\n    var ret = jQuery.merge( this.constructor(), elems );\n\n    // Add the old object onto the stack (as a reference)\n    ret.prevObject = this;\n    ret.context = this.context;\n\n    // Return the newly-formed element set\n    return ret;\n  },\n\n  // Execute a callback for every element in the matched set.\n  // (You can seed the arguments with an array of args, but this is\n  // only used internally.)\n  each: function( callback, args ) {\n    return jQuery.each( this, callback, args );\n  },\n\n  map: function( callback ) {\n    return this.pushStack( jQuery.map(this, function( elem, i ) {\n      return callback.call( elem, i, elem );\n    }));\n  },\n\n  slice: function() {\n    return this.pushStack( slice.apply( this, arguments ) );\n  },\n\n  first: function() {\n    return this.eq( 0 );\n  },\n\n  last: function() {\n    return this.eq( -1 );\n  },\n\n  eq: function( i ) {\n    var len = this.length,\n      j = +i + ( i < 0 ? len : 0 );\n    return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );\n  },\n\n  end: function() {\n    return this.prevObject || this.constructor(null);\n  },\n\n  // For internal use only.\n  // Behaves like an Array's method, not like a jQuery method.\n  push: push,\n  sort: deletedIds.sort,\n  splice: deletedIds.splice\n};\n\njQuery.extend = jQuery.fn.extend = function() {\n  var src, copyIsArray, copy, name, options, clone,\n    target = arguments[0] || {},\n    i = 1,\n    length = arguments.length,\n    deep = false;\n\n  // Handle a deep copy situation\n  if ( typeof target === \"boolean\" ) {\n    deep = target;\n\n    // skip the boolean and the target\n    target = arguments[ i ] || {};\n    i++;\n  }\n\n  // Handle case when target is a string or something (possible in deep copy)\n  if ( typeof target !== \"object\" && !jQuery.isFunction(target) ) {\n    target = {};\n  }\n\n  // extend jQuery itself if only one argument is passed\n  if ( i === length ) {\n    target = this;\n    i--;\n  }\n\n  for ( ; i < length; i++ ) {\n    // Only deal with non-null/undefined values\n    if ( (options = arguments[ i ]) != null ) {\n      // Extend the base object\n      for ( name in options ) {\n        src = target[ name ];\n        copy = options[ name ];\n\n        // Prevent never-ending loop\n        if ( target === copy ) {\n          continue;\n        }\n\n        // Recurse if we're merging plain objects or arrays\n        if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {\n          if ( copyIsArray ) {\n            copyIsArray = false;\n            clone = src && jQuery.isArray(src) ? src : [];\n\n          } else {\n            clone = src && jQuery.isPlainObject(src) ? src : {};\n          }\n\n          // Never move original objects, clone them\n          target[ name ] = jQuery.extend( deep, clone, copy );\n\n        // Don't bring in undefined values\n        } else if ( copy !== undefined ) {\n          target[ name ] = copy;\n        }\n      }\n    }\n  }\n\n  // Return the modified object\n  return target;\n};\n\njQuery.extend({\n  // Unique for each copy of jQuery on the page\n  expando: \"jQuery\" + ( version + Math.random() ).replace( /\\D/g, \"\" ),\n\n  // Assume jQuery is ready without the ready module\n  isReady: true,\n\n  error: function( msg ) {\n    throw new Error( msg );\n  },\n\n  noop: function() {},\n\n  // See test/unit/core.js for details concerning isFunction.\n  // Since version 1.3, DOM methods and functions like alert\n  // aren't supported. They return false on IE (#2968).\n  isFunction: function( obj ) {\n    return jQuery.type(obj) === \"function\";\n  },\n\n  isArray: Array.isArray || function( obj ) {\n    return jQuery.type(obj) === \"array\";\n  },\n\n  isWindow: function( obj ) {\n    /* jshint eqeqeq: false */\n    return obj != null && obj == obj.window;\n  },\n\n  isNumeric: function( obj ) {\n    // parseFloat NaNs numeric-cast false positives (null|true|false|\"\")\n    // ...but misinterprets leading-number strings, particularly hex literals (\"0x...\")\n    // subtraction forces infinities to NaN\n    return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;\n  },\n\n  isEmptyObject: function( obj ) {\n    var name;\n    for ( name in obj ) {\n      return false;\n    }\n    return true;\n  },\n\n  isPlainObject: function( obj ) {\n    var key;\n\n    // Must be an Object.\n    // Because of IE, we also have to check the presence of the constructor property.\n    // Make sure that DOM nodes and window objects don't pass through, as well\n    if ( !obj || jQuery.type(obj) !== \"object\" || obj.nodeType || jQuery.isWindow( obj ) ) {\n      return false;\n    }\n\n    try {\n      // Not own constructor property must be Object\n      if ( obj.constructor &&\n        !hasOwn.call(obj, \"constructor\") &&\n        !hasOwn.call(obj.constructor.prototype, \"isPrototypeOf\") ) {\n        return false;\n      }\n    } catch ( e ) {\n      // IE8,9 Will throw exceptions on certain host objects #9897\n      return false;\n    }\n\n    // Support: IE<9\n    // Handle iteration over inherited properties before own properties.\n    if ( support.ownLast ) {\n      for ( key in obj ) {\n        return hasOwn.call( obj, key );\n      }\n    }\n\n    // Own properties are enumerated firstly, so to speed up,\n    // if last one is own, then all properties are own.\n    for ( key in obj ) {}\n\n    return key === undefined || hasOwn.call( obj, key );\n  },\n\n  type: function( obj ) {\n    if ( obj == null ) {\n      return obj + \"\";\n    }\n    return typeof obj === \"object\" || typeof obj === \"function\" ?\n      class2type[ toString.call(obj) ] || \"object\" :\n      typeof obj;\n  },\n\n  // Evaluates a script in a global context\n  // Workarounds based on findings by Jim Driscoll\n  // http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context\n  globalEval: function( data ) {\n    if ( data && jQuery.trim( data ) ) {\n      // We use execScript on Internet Explorer\n      // We use an anonymous function so that context is window\n      // rather than jQuery in Firefox\n      ( window.execScript || function( data ) {\n        window[ \"eval\" ].call( window, data );\n      } )( data );\n    }\n  },\n\n  // Convert dashed to camelCase; used by the css and data modules\n  // Microsoft forgot to hump their vendor prefix (#9572)\n  camelCase: function( string ) {\n    return string.replace( rmsPrefix, \"ms-\" ).replace( rdashAlpha, fcamelCase );\n  },\n\n  nodeName: function( elem, name ) {\n    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();\n  },\n\n  // args is for internal usage only\n  each: function( obj, callback, args ) {\n    var value,\n      i = 0,\n      length = obj.length,\n      isArray = isArraylike( obj );\n\n    if ( args ) {\n      if ( isArray ) {\n        for ( ; i < length; i++ ) {\n          value = callback.apply( obj[ i ], args );\n\n          if ( value === false ) {\n            break;\n          }\n        }\n      } else {\n        for ( i in obj ) {\n          value = callback.apply( obj[ i ], args );\n\n          if ( value === false ) {\n            break;\n          }\n        }\n      }\n\n    // A special, fast, case for the most common use of each\n    } else {\n      if ( isArray ) {\n        for ( ; i < length; i++ ) {\n          value = callback.call( obj[ i ], i, obj[ i ] );\n\n          if ( value === false ) {\n            break;\n          }\n        }\n      } else {\n        for ( i in obj ) {\n          value = callback.call( obj[ i ], i, obj[ i ] );\n\n          if ( value === false ) {\n            break;\n          }\n        }\n      }\n    }\n\n    return obj;\n  },\n\n  // Support: Android<4.1, IE<9\n  trim: function( text ) {\n    return text == null ?\n      \"\" :\n      ( text + \"\" ).replace( rtrim, \"\" );\n  },\n\n  // results is for internal usage only\n  makeArray: function( arr, results ) {\n    var ret = results || [];\n\n    if ( arr != null ) {\n      if ( isArraylike( Object(arr) ) ) {\n        jQuery.merge( ret,\n          typeof arr === \"string\" ?\n          [ arr ] : arr\n        );\n      } else {\n        push.call( ret, arr );\n      }\n    }\n\n    return ret;\n  },\n\n  inArray: function( elem, arr, i ) {\n    var len;\n\n    if ( arr ) {\n      if ( indexOf ) {\n        return indexOf.call( arr, elem, i );\n      }\n\n      len = arr.length;\n      i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;\n\n      for ( ; i < len; i++ ) {\n        // Skip accessing in sparse arrays\n        if ( i in arr && arr[ i ] === elem ) {\n          return i;\n        }\n      }\n    }\n\n    return -1;\n  },\n\n  merge: function( first, second ) {\n    var len = +second.length,\n      j = 0,\n      i = first.length;\n\n    while ( j < len ) {\n      first[ i++ ] = second[ j++ ];\n    }\n\n    // Support: IE<9\n    // Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)\n    if ( len !== len ) {\n      while ( second[j] !== undefined ) {\n        first[ i++ ] = second[ j++ ];\n      }\n    }\n\n    first.length = i;\n\n    return first;\n  },\n\n  grep: function( elems, callback, invert ) {\n    var callbackInverse,\n      matches = [],\n      i = 0,\n      length = elems.length,\n      callbackExpect = !invert;\n\n    // Go through the array, only saving the items\n    // that pass the validator function\n    for ( ; i < length; i++ ) {\n      callbackInverse = !callback( elems[ i ], i );\n      if ( callbackInverse !== callbackExpect ) {\n        matches.push( elems[ i ] );\n      }\n    }\n\n    return matches;\n  },\n\n  // arg is for internal usage only\n  map: function( elems, callback, arg ) {\n    var value,\n      i = 0,\n      length = elems.length,\n      isArray = isArraylike( elems ),\n      ret = [];\n\n    // Go through the array, translating each of the items to their new values\n    if ( isArray ) {\n      for ( ; i < length; i++ ) {\n        value = callback( elems[ i ], i, arg );\n\n        if ( value != null ) {\n          ret.push( value );\n        }\n      }\n\n    // Go through every key on the object,\n    } else {\n      for ( i in elems ) {\n        value = callback( elems[ i ], i, arg );\n\n        if ( value != null ) {\n          ret.push( value );\n        }\n      }\n    }\n\n    // Flatten any nested arrays\n    return concat.apply( [], ret );\n  },\n\n  // A global GUID counter for objects\n  guid: 1,\n\n  // Bind a function to a context, optionally partially applying any\n  // arguments.\n  proxy: function( fn, context ) {\n    var args, proxy, tmp;\n\n    if ( typeof context === \"string\" ) {\n      tmp = fn[ context ];\n      context = fn;\n      fn = tmp;\n    }\n\n    // Quick check to determine if target is callable, in the spec\n    // this throws a TypeError, but we will just return undefined.\n    if ( !jQuery.isFunction( fn ) ) {\n      return undefined;\n    }\n\n    // Simulated bind\n    args = slice.call( arguments, 2 );\n    proxy = function() {\n      return fn.apply( context || this, args.concat( slice.call( arguments ) ) );\n    };\n\n    // Set the guid of unique handler to the same of original handler, so it can be removed\n    proxy.guid = fn.guid = fn.guid || jQuery.guid++;\n\n    return proxy;\n  },\n\n  now: function() {\n    return +( new Date() );\n  },\n\n  // jQuery.support is not used in Core but other projects attach their\n  // properties to it so it needs to exist.\n  support: support\n});\n\n// Populate the class2type map\njQuery.each(\"Boolean Number String Function Array Date RegExp Object Error\".split(\" \"), function(i, name) {\n  class2type[ \"[object \" + name + \"]\" ] = name.toLowerCase();\n});\n\nfunction isArraylike( obj ) {\n  var length = obj.length,\n    type = jQuery.type( obj );\n\n  if ( type === \"function\" || jQuery.isWindow( obj ) ) {\n    return false;\n  }\n\n  if ( obj.nodeType === 1 && length ) {\n    return true;\n  }\n\n  return type === \"array\" || length === 0 ||\n    typeof length === \"number\" && length > 0 && ( length - 1 ) in obj;\n}\nvar Sizzle =\n/*!\n * Sizzle CSS Selector Engine v1.10.19\n * http://sizzlejs.com/\n *\n * Copyright 2013 jQuery Foundation, Inc. and other contributors\n * Released under the MIT license\n * http://jquery.org/license\n *\n * Date: 2014-04-18\n */\n(function( window ) {\n\nvar i,\n  support,\n  Expr,\n  getText,\n  isXML,\n  tokenize,\n  compile,\n  select,\n  outermostContext,\n  sortInput,\n  hasDuplicate,\n\n  // Local document vars\n  setDocument,\n  document,\n  docElem,\n  documentIsHTML,\n  rbuggyQSA,\n  rbuggyMatches,\n  matches,\n  contains,\n\n  // Instance-specific data\n  expando = \"sizzle\" + -(new Date()),\n  preferredDoc = window.document,\n  dirruns = 0,\n  done = 0,\n  classCache = createCache(),\n  tokenCache = createCache(),\n  compilerCache = createCache(),\n  sortOrder = function( a, b ) {\n    if ( a === b ) {\n      hasDuplicate = true;\n    }\n    return 0;\n  },\n\n  // General-purpose constants\n  strundefined = typeof undefined,\n  MAX_NEGATIVE = 1 << 31,\n\n  // Instance methods\n  hasOwn = ({}).hasOwnProperty,\n  arr = [],\n  pop = arr.pop,\n  push_native = arr.push,\n  push = arr.push,\n  slice = arr.slice,\n  // Use a stripped-down indexOf if we can't use a native one\n  indexOf = arr.indexOf || function( elem ) {\n    var i = 0,\n      len = this.length;\n    for ( ; i < len; i++ ) {\n      if ( this[i] === elem ) {\n        return i;\n      }\n    }\n    return -1;\n  },\n\n  booleans = \"checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped\",\n\n  // Regular expressions\n\n  // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace\n  whitespace = \"[\\\\x20\\\\t\\\\r\\\\n\\\\f]\",\n  // http://www.w3.org/TR/css3-syntax/#characters\n  characterEncoding = \"(?:\\\\\\\\.|[\\\\w-]|[^\\\\x00-\\\\xa0])+\",\n\n  // Loosely modeled on CSS identifier characters\n  // An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors\n  // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier\n  identifier = characterEncoding.replace( \"w\", \"w#\" ),\n\n  // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors\n  attributes = \"\\\\[\" + whitespace + \"*(\" + characterEncoding + \")(?:\" + whitespace +\n    // Operator (capture 2)\n    \"*([*^$|!~]?=)\" + whitespace +\n    // \"Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]\"\n    \"*(?:'((?:\\\\\\\\.|[^\\\\\\\\'])*)'|\\\"((?:\\\\\\\\.|[^\\\\\\\\\\\"])*)\\\"|(\" + identifier + \"))|)\" + whitespace +\n    \"*\\\\]\",\n\n  pseudos = \":(\" + characterEncoding + \")(?:\\\\((\" +\n    // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:\n    // 1. quoted (capture 3; capture 4 or capture 5)\n    \"('((?:\\\\\\\\.|[^\\\\\\\\'])*)'|\\\"((?:\\\\\\\\.|[^\\\\\\\\\\\"])*)\\\")|\" +\n    // 2. simple (capture 6)\n    \"((?:\\\\\\\\.|[^\\\\\\\\()[\\\\]]|\" + attributes + \")*)|\" +\n    // 3. anything else (capture 2)\n    \".*\" +\n    \")\\\\)|)\",\n\n  // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter\n  rtrim = new RegExp( \"^\" + whitespace + \"+|((?:^|[^\\\\\\\\])(?:\\\\\\\\.)*)\" + whitespace + \"+$\", \"g\" ),\n\n  rcomma = new RegExp( \"^\" + whitespace + \"*,\" + whitespace + \"*\" ),\n  rcombinators = new RegExp( \"^\" + whitespace + \"*([>+~]|\" + whitespace + \")\" + whitespace + \"*\" ),\n\n  rattributeQuotes = new RegExp( \"=\" + whitespace + \"*([^\\\\]'\\\"]*?)\" + whitespace + \"*\\\\]\", \"g\" ),\n\n  rpseudo = new RegExp( pseudos ),\n  ridentifier = new RegExp( \"^\" + identifier + \"$\" ),\n\n  matchExpr = {\n    \"ID\": new RegExp( \"^#(\" + characterEncoding + \")\" ),\n    \"CLASS\": new RegExp( \"^\\\\.(\" + characterEncoding + \")\" ),\n    \"TAG\": new RegExp( \"^(\" + characterEncoding.replace( \"w\", \"w*\" ) + \")\" ),\n    \"ATTR\": new RegExp( \"^\" + attributes ),\n    \"PSEUDO\": new RegExp( \"^\" + pseudos ),\n    \"CHILD\": new RegExp( \"^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\\\(\" + whitespace +\n      \"*(even|odd|(([+-]|)(\\\\d*)n|)\" + whitespace + \"*(?:([+-]|)\" + whitespace +\n      \"*(\\\\d+)|))\" + whitespace + \"*\\\\)|)\", \"i\" ),\n    \"bool\": new RegExp( \"^(?:\" + booleans + \")$\", \"i\" ),\n    // For use in libraries implementing .is()\n    // We use this for POS matching in `select`\n    \"needsContext\": new RegExp( \"^\" + whitespace + \"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\\\(\" +\n      whitespace + \"*((?:-\\\\d)?\\\\d*)\" + whitespace + \"*\\\\)|)(?=[^-]|$)\", \"i\" )\n  },\n\n  rinputs = /^(?:input|select|textarea|button)$/i,\n  rheader = /^h\\d$/i,\n\n  rnative = /^[^{]+\\{\\s*\\[native \\w/,\n\n  // Easily-parseable/retrievable ID or TAG or CLASS selectors\n  rquickExpr = /^(?:#([\\w-]+)|(\\w+)|\\.([\\w-]+))$/,\n\n  rsibling = /[+~]/,\n  rescape = /'|\\\\/g,\n\n  // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters\n  runescape = new RegExp( \"\\\\\\\\([\\\\da-f]{1,6}\" + whitespace + \"?|(\" + whitespace + \")|.)\", \"ig\" ),\n  funescape = function( _, escaped, escapedWhitespace ) {\n    var high = \"0x\" + escaped - 0x10000;\n    // NaN means non-codepoint\n    // Support: Firefox<24\n    // Workaround erroneous numeric interpretation of +\"0x\"\n    return high !== high || escapedWhitespace ?\n      escaped :\n      high < 0 ?\n        // BMP codepoint\n        String.fromCharCode( high + 0x10000 ) :\n        // Supplemental Plane codepoint (surrogate pair)\n        String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );\n  };\n\n// Optimize for push.apply( _, NodeList )\ntry {\n  push.apply(\n    (arr = slice.call( preferredDoc.childNodes )),\n    preferredDoc.childNodes\n  );\n  // Support: Android<4.0\n  // Detect silently failing push.apply\n  arr[ preferredDoc.childNodes.length ].nodeType;\n} catch ( e ) {\n  push = { apply: arr.length ?\n\n    // Leverage slice if possible\n    function( target, els ) {\n      push_native.apply( target, slice.call(els) );\n    } :\n\n    // Support: IE<9\n    // Otherwise append directly\n    function( target, els ) {\n      var j = target.length,\n        i = 0;\n      // Can't trust NodeList.length\n      while ( (target[j++] = els[i++]) ) {}\n      target.length = j - 1;\n    }\n  };\n}\n\nfunction Sizzle( selector, context, results, seed ) {\n  var match, elem, m, nodeType,\n    // QSA vars\n    i, groups, old, nid, newContext, newSelector;\n\n  if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {\n    setDocument( context );\n  }\n\n  context = context || document;\n  results = results || [];\n\n  if ( !selector || typeof selector !== \"string\" ) {\n    return results;\n  }\n\n  if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {\n    return [];\n  }\n\n  if ( documentIsHTML && !seed ) {\n\n    // Shortcuts\n    if ( (match = rquickExpr.exec( selector )) ) {\n      // Speed-up: Sizzle(\"#ID\")\n      if ( (m = match[1]) ) {\n        if ( nodeType === 9 ) {\n          elem = context.getElementById( m );\n          // Check parentNode to catch when Blackberry 4.6 returns\n          // nodes that are no longer in the document (jQuery #6963)\n          if ( elem && elem.parentNode ) {\n            // Handle the case where IE, Opera, and Webkit return items\n            // by name instead of ID\n            if ( elem.id === m ) {\n              results.push( elem );\n              return results;\n            }\n          } else {\n            return results;\n          }\n        } else {\n          // Context is not a document\n          if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&\n            contains( context, elem ) && elem.id === m ) {\n            results.push( elem );\n            return results;\n          }\n        }\n\n      // Speed-up: Sizzle(\"TAG\")\n      } else if ( match[2] ) {\n        push.apply( results, context.getElementsByTagName( selector ) );\n        return results;\n\n      // Speed-up: Sizzle(\".CLASS\")\n      } else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {\n        push.apply( results, context.getElementsByClassName( m ) );\n        return results;\n      }\n    }\n\n    // QSA path\n    if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {\n      nid = old = expando;\n      newContext = context;\n      newSelector = nodeType === 9 && selector;\n\n      // qSA works strangely on Element-rooted queries\n      // We can work around this by specifying an extra ID on the root\n      // and working up from there (Thanks to Andrew Dupont for the technique)\n      // IE 8 doesn't work on object elements\n      if ( nodeType === 1 && context.nodeName.toLowerCase() !== \"object\" ) {\n        groups = tokenize( selector );\n\n        if ( (old = context.getAttribute(\"id\")) ) {\n          nid = old.replace( rescape, \"\\\\$&\" );\n        } else {\n          context.setAttribute( \"id\", nid );\n        }\n        nid = \"[id='\" + nid + \"'] \";\n\n        i = groups.length;\n        while ( i-- ) {\n          groups[i] = nid + toSelector( groups[i] );\n        }\n        newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;\n        newSelector = groups.join(\",\");\n      }\n\n      if ( newSelector ) {\n        try {\n          push.apply( results,\n            newContext.querySelectorAll( newSelector )\n          );\n          return results;\n        } catch(qsaError) {\n        } finally {\n          if ( !old ) {\n            context.removeAttribute(\"id\");\n          }\n        }\n      }\n    }\n  }\n\n  // All others\n  return select( selector.replace( rtrim, \"$1\" ), context, results, seed );\n}\n\n/**\n * Create key-value caches of limited size\n * @returns {Function(string, Object)} Returns the Object data after storing it on itself with\n *  property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)\n *  deleting the oldest entry\n */\nfunction createCache() {\n  var keys = [];\n\n  function cache( key, value ) {\n    // Use (key + \" \") to avoid collision with native prototype properties (see Issue #157)\n    if ( keys.push( key + \" \" ) > Expr.cacheLength ) {\n      // Only keep the most recent entries\n      delete cache[ keys.shift() ];\n    }\n    return (cache[ key + \" \" ] = value);\n  }\n  return cache;\n}\n\n/**\n * Mark a function for special use by Sizzle\n * @param {Function} fn The function to mark\n */\nfunction markFunction( fn ) {\n  fn[ expando ] = true;\n  return fn;\n}\n\n/**\n * Support testing using an element\n * @param {Function} fn Passed the created div and expects a boolean result\n */\nfunction assert( fn ) {\n  var div = document.createElement(\"div\");\n\n  try {\n    return !!fn( div );\n  } catch (e) {\n    return false;\n  } finally {\n    // Remove from its parent by default\n    if ( div.parentNode ) {\n      div.parentNode.removeChild( div );\n    }\n    // release memory in IE\n    div = null;\n  }\n}\n\n/**\n * Adds the same handler for all of the specified attrs\n * @param {String} attrs Pipe-separated list of attributes\n * @param {Function} handler The method that will be applied\n */\nfunction addHandle( attrs, handler ) {\n  var arr = attrs.split(\"|\"),\n    i = attrs.length;\n\n  while ( i-- ) {\n    Expr.attrHandle[ arr[i] ] = handler;\n  }\n}\n\n/**\n * Checks document order of two siblings\n * @param {Element} a\n * @param {Element} b\n * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b\n */\nfunction siblingCheck( a, b ) {\n  var cur = b && a,\n    diff = cur && a.nodeType === 1 && b.nodeType === 1 &&\n      ( ~b.sourceIndex || MAX_NEGATIVE ) -\n      ( ~a.sourceIndex || MAX_NEGATIVE );\n\n  // Use IE sourceIndex if available on both nodes\n  if ( diff ) {\n    return diff;\n  }\n\n  // Check if b follows a\n  if ( cur ) {\n    while ( (cur = cur.nextSibling) ) {\n      if ( cur === b ) {\n        return -1;\n      }\n    }\n  }\n\n  return a ? 1 : -1;\n}\n\n/**\n * Returns a function to use in pseudos for input types\n * @param {String} type\n */\nfunction createInputPseudo( type ) {\n  return function( elem ) {\n    var name = elem.nodeName.toLowerCase();\n    return name === \"input\" && elem.type === type;\n  };\n}\n\n/**\n * Returns a function to use in pseudos for buttons\n * @param {String} type\n */\nfunction createButtonPseudo( type ) {\n  return function( elem ) {\n    var name = elem.nodeName.toLowerCase();\n    return (name === \"input\" || name === \"button\") && elem.type === type;\n  };\n}\n\n/**\n * Returns a function to use in pseudos for positionals\n * @param {Function} fn\n */\nfunction createPositionalPseudo( fn ) {\n  return markFunction(function( argument ) {\n    argument = +argument;\n    return markFunction(function( seed, matches ) {\n      var j,\n        matchIndexes = fn( [], seed.length, argument ),\n        i = matchIndexes.length;\n\n      // Match elements found at the specified indexes\n      while ( i-- ) {\n        if ( seed[ (j = matchIndexes[i]) ] ) {\n          seed[j] = !(matches[j] = seed[j]);\n        }\n      }\n    });\n  });\n}\n\n/**\n * Checks a node for validity as a Sizzle context\n * @param {Element|Object=} context\n * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value\n */\nfunction testContext( context ) {\n  return context && typeof context.getElementsByTagName !== strundefined && context;\n}\n\n// Expose support vars for convenience\nsupport = Sizzle.support = {};\n\n/**\n * Detects XML nodes\n * @param {Element|Object} elem An element or a document\n * @returns {Boolean} True iff elem is a non-HTML XML node\n */\nisXML = Sizzle.isXML = function( elem ) {\n  // documentElement is verified for cases where it doesn't yet exist\n  // (such as loading iframes in IE - #4833)\n  var documentElement = elem && (elem.ownerDocument || elem).documentElement;\n  return documentElement ? documentElement.nodeName !== \"HTML\" : false;\n};\n\n/**\n * Sets document-related variables once based on the current document\n * @param {Element|Object} [doc] An element or document object to use to set the document\n * @returns {Object} Returns the current document\n */\nsetDocument = Sizzle.setDocument = function( node ) {\n  var hasCompare,\n    doc = node ? node.ownerDocument || node : preferredDoc,\n    parent = doc.defaultView;\n\n  // If no document and documentElement is available, return\n  if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {\n    return document;\n  }\n\n  // Set our document\n  document = doc;\n  docElem = doc.documentElement;\n\n  // Support tests\n  documentIsHTML = !isXML( doc );\n\n  // Support: IE>8\n  // If iframe document is assigned to \"document\" variable and if iframe has been reloaded,\n  // IE will throw \"permission denied\" error when accessing \"document\" variable, see jQuery #13936\n  // IE6-8 do not support the defaultView property so parent will be undefined\n  if ( parent && parent !== parent.top ) {\n    // IE11 does not have attachEvent, so all must suffer\n    if ( parent.addEventListener ) {\n      parent.addEventListener( \"unload\", function() {\n        setDocument();\n      }, false );\n    } else if ( parent.attachEvent ) {\n      parent.attachEvent( \"onunload\", function() {\n        setDocument();\n      });\n    }\n  }\n\n  /* Attributes\n  ---------------------------------------------------------------------- */\n\n  // Support: IE<8\n  // Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)\n  support.attributes = assert(function( div ) {\n    div.className = \"i\";\n    return !div.getAttribute(\"className\");\n  });\n\n  /* getElement(s)By*\n  ---------------------------------------------------------------------- */\n\n  // Check if getElementsByTagName(\"*\") returns only elements\n  support.getElementsByTagName = assert(function( div ) {\n    div.appendChild( doc.createComment(\"\") );\n    return !div.getElementsByTagName(\"*\").length;\n  });\n\n  // Check if getElementsByClassName can be trusted\n  support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {\n    div.innerHTML = \"<div class='a'></div><div class='a i'></div>\";\n\n    // Support: Safari<4\n    // Catch class over-caching\n    div.firstChild.className = \"i\";\n    // Support: Opera<10\n    // Catch gEBCN failure to find non-leading classes\n    return div.getElementsByClassName(\"i\").length === 2;\n  });\n\n  // Support: IE<10\n  // Check if getElementById returns elements by name\n  // The broken getElementById methods don't pick up programatically-set names,\n  // so use a roundabout getElementsByName test\n  support.getById = assert(function( div ) {\n    docElem.appendChild( div ).id = expando;\n    return !doc.getElementsByName || !doc.getElementsByName( expando ).length;\n  });\n\n  // ID find and filter\n  if ( support.getById ) {\n    Expr.find[\"ID\"] = function( id, context ) {\n      if ( typeof context.getElementById !== strundefined && documentIsHTML ) {\n        var m = context.getElementById( id );\n        // Check parentNode to catch when Blackberry 4.6 returns\n        // nodes that are no longer in the document #6963\n        return m && m.parentNode ? [ m ] : [];\n      }\n    };\n    Expr.filter[\"ID\"] = function( id ) {\n      var attrId = id.replace( runescape, funescape );\n      return function( elem ) {\n        return elem.getAttribute(\"id\") === attrId;\n      };\n    };\n  } else {\n    // Support: IE6/7\n    // getElementById is not reliable as a find shortcut\n    delete Expr.find[\"ID\"];\n\n    Expr.filter[\"ID\"] =  function( id ) {\n      var attrId = id.replace( runescape, funescape );\n      return function( elem ) {\n        var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode(\"id\");\n        return node && node.value === attrId;\n      };\n    };\n  }\n\n  // Tag\n  Expr.find[\"TAG\"] = support.getElementsByTagName ?\n    function( tag, context ) {\n      if ( typeof context.getElementsByTagName !== strundefined ) {\n        return context.getElementsByTagName( tag );\n      }\n    } :\n    function( tag, context ) {\n      var elem,\n        tmp = [],\n        i = 0,\n        results = context.getElementsByTagName( tag );\n\n      // Filter out possible comments\n      if ( tag === \"*\" ) {\n        while ( (elem = results[i++]) ) {\n          if ( elem.nodeType === 1 ) {\n            tmp.push( elem );\n          }\n        }\n\n        return tmp;\n      }\n      return results;\n    };\n\n  // Class\n  Expr.find[\"CLASS\"] = support.getElementsByClassName && function( className, context ) {\n    if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {\n      return context.getElementsByClassName( className );\n    }\n  };\n\n  /* QSA/matchesSelector\n  ---------------------------------------------------------------------- */\n\n  // QSA and matchesSelector support\n\n  // matchesSelector(:active) reports false when true (IE9/Opera 11.5)\n  rbuggyMatches = [];\n\n  // qSa(:focus) reports false when true (Chrome 21)\n  // We allow this because of a bug in IE8/9 that throws an error\n  // whenever `document.activeElement` is accessed on an iframe\n  // So, we allow :focus to pass through QSA all the time to avoid the IE error\n  // See http://bugs.jquery.com/ticket/13378\n  rbuggyQSA = [];\n\n  if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {\n    // Build QSA regex\n    // Regex strategy adopted from Diego Perini\n    assert(function( div ) {\n      // Select is set to empty string on purpose\n      // This is to test IE's treatment of not explicitly\n      // setting a boolean content attribute,\n      // since its presence should be enough\n      // http://bugs.jquery.com/ticket/12359\n      div.innerHTML = \"<select msallowclip=''><option selected=''></option></select>\";\n\n      // Support: IE8, Opera 11-12.16\n      // Nothing should be selected when empty strings follow ^= or $= or *=\n      // The test attribute must be unknown in Opera but \"safe\" for WinRT\n      // http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section\n      if ( div.querySelectorAll(\"[msallowclip^='']\").length ) {\n        rbuggyQSA.push( \"[*^$]=\" + whitespace + \"*(?:''|\\\"\\\")\" );\n      }\n\n      // Support: IE8\n      // Boolean attributes and \"value\" are not treated correctly\n      if ( !div.querySelectorAll(\"[selected]\").length ) {\n        rbuggyQSA.push( \"\\\\[\" + whitespace + \"*(?:value|\" + booleans + \")\" );\n      }\n\n      // Webkit/Opera - :checked should return selected option elements\n      // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked\n      // IE8 throws error here and will not see later tests\n      if ( !div.querySelectorAll(\":checked\").length ) {\n        rbuggyQSA.push(\":checked\");\n      }\n    });\n\n    assert(function( div ) {\n      // Support: Windows 8 Native Apps\n      // The type and name attributes are restricted during .innerHTML assignment\n      var input = doc.createElement(\"input\");\n      input.setAttribute( \"type\", \"hidden\" );\n      div.appendChild( input ).setAttribute( \"name\", \"D\" );\n\n      // Support: IE8\n      // Enforce case-sensitivity of name attribute\n      if ( div.querySelectorAll(\"[name=d]\").length ) {\n        rbuggyQSA.push( \"name\" + whitespace + \"*[*^$|!~]?=\" );\n      }\n\n      // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)\n      // IE8 throws error here and will not see later tests\n      if ( !div.querySelectorAll(\":enabled\").length ) {\n        rbuggyQSA.push( \":enabled\", \":disabled\" );\n      }\n\n      // Opera 10-11 does not throw on post-comma invalid pseudos\n      div.querySelectorAll(\"*,:x\");\n      rbuggyQSA.push(\",.*:\");\n    });\n  }\n\n  if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||\n    docElem.webkitMatchesSelector ||\n    docElem.mozMatchesSelector ||\n    docElem.oMatchesSelector ||\n    docElem.msMatchesSelector) )) ) {\n\n    assert(function( div ) {\n      // Check to see if it's possible to do matchesSelector\n      // on a disconnected node (IE 9)\n      support.disconnectedMatch = matches.call( div, \"div\" );\n\n      // This should fail with an exception\n      // Gecko does not error, returns false instead\n      matches.call( div, \"[s!='']:x\" );\n      rbuggyMatches.push( \"!=\", pseudos );\n    });\n  }\n\n  rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join(\"|\") );\n  rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join(\"|\") );\n\n  /* Contains\n  ---------------------------------------------------------------------- */\n  hasCompare = rnative.test( docElem.compareDocumentPosition );\n\n  // Element contains another\n  // Purposefully does not implement inclusive descendent\n  // As in, an element does not contain itself\n  contains = hasCompare || rnative.test( docElem.contains ) ?\n    function( a, b ) {\n      var adown = a.nodeType === 9 ? a.documentElement : a,\n        bup = b && b.parentNode;\n      return a === bup || !!( bup && bup.nodeType === 1 && (\n        adown.contains ?\n          adown.contains( bup ) :\n          a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16\n      ));\n    } :\n    function( a, b ) {\n      if ( b ) {\n        while ( (b = b.parentNode) ) {\n          if ( b === a ) {\n            return true;\n          }\n        }\n      }\n      return false;\n    };\n\n  /* Sorting\n  ---------------------------------------------------------------------- */\n\n  // Document order sorting\n  sortOrder = hasCompare ?\n  function( a, b ) {\n\n    // Flag for duplicate removal\n    if ( a === b ) {\n      hasDuplicate = true;\n      return 0;\n    }\n\n    // Sort on method existence if only one input has compareDocumentPosition\n    var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;\n    if ( compare ) {\n      return compare;\n    }\n\n    // Calculate position if both inputs belong to the same document\n    compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?\n      a.compareDocumentPosition( b ) :\n\n      // Otherwise we know they are disconnected\n      1;\n\n    // Disconnected nodes\n    if ( compare & 1 ||\n      (!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {\n\n      // Choose the first element that is related to our preferred document\n      if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {\n        return -1;\n      }\n      if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {\n        return 1;\n      }\n\n      // Maintain original order\n      return sortInput ?\n        ( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :\n        0;\n    }\n\n    return compare & 4 ? -1 : 1;\n  } :\n  function( a, b ) {\n    // Exit early if the nodes are identical\n    if ( a === b ) {\n      hasDuplicate = true;\n      return 0;\n    }\n\n    var cur,\n      i = 0,\n      aup = a.parentNode,\n      bup = b.parentNode,\n      ap = [ a ],\n      bp = [ b ];\n\n    // Parentless nodes are either documents or disconnected\n    if ( !aup || !bup ) {\n      return a === doc ? -1 :\n        b === doc ? 1 :\n        aup ? -1 :\n        bup ? 1 :\n        sortInput ?\n        ( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :\n        0;\n\n    // If the nodes are siblings, we can do a quick check\n    } else if ( aup === bup ) {\n      return siblingCheck( a, b );\n    }\n\n    // Otherwise we need full lists of their ancestors for comparison\n    cur = a;\n    while ( (cur = cur.parentNode) ) {\n      ap.unshift( cur );\n    }\n    cur = b;\n    while ( (cur = cur.parentNode) ) {\n      bp.unshift( cur );\n    }\n\n    // Walk down the tree looking for a discrepancy\n    while ( ap[i] === bp[i] ) {\n      i++;\n    }\n\n    return i ?\n      // Do a sibling check if the nodes have a common ancestor\n      siblingCheck( ap[i], bp[i] ) :\n\n      // Otherwise nodes in our document sort first\n      ap[i] === preferredDoc ? -1 :\n      bp[i] === preferredDoc ? 1 :\n      0;\n  };\n\n  return doc;\n};\n\nSizzle.matches = function( expr, elements ) {\n  return Sizzle( expr, null, null, elements );\n};\n\nSizzle.matchesSelector = function( elem, expr ) {\n  // Set document vars if needed\n  if ( ( elem.ownerDocument || elem ) !== document ) {\n    setDocument( elem );\n  }\n\n  // Make sure that attribute selectors are quoted\n  expr = expr.replace( rattributeQuotes, \"='$1']\" );\n\n  if ( support.matchesSelector && documentIsHTML &&\n    ( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&\n    ( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {\n\n    try {\n      var ret = matches.call( elem, expr );\n\n      // IE 9's matchesSelector returns false on disconnected nodes\n      if ( ret || support.disconnectedMatch ||\n          // As well, disconnected nodes are said to be in a document\n          // fragment in IE 9\n          elem.document && elem.document.nodeType !== 11 ) {\n        return ret;\n      }\n    } catch(e) {}\n  }\n\n  return Sizzle( expr, document, null, [ elem ] ).length > 0;\n};\n\nSizzle.contains = function( context, elem ) {\n  // Set document vars if needed\n  if ( ( context.ownerDocument || context ) !== document ) {\n    setDocument( context );\n  }\n  return contains( context, elem );\n};\n\nSizzle.attr = function( elem, name ) {\n  // Set document vars if needed\n  if ( ( elem.ownerDocument || elem ) !== document ) {\n    setDocument( elem );\n  }\n\n  var fn = Expr.attrHandle[ name.toLowerCase() ],\n    // Don't get fooled by Object.prototype properties (jQuery #13807)\n    val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?\n      fn( elem, name, !documentIsHTML ) :\n      undefined;\n\n  return val !== undefined ?\n    val :\n    support.attributes || !documentIsHTML ?\n      elem.getAttribute( name ) :\n      (val = elem.getAttributeNode(name)) && val.specified ?\n        val.value :\n        null;\n};\n\nSizzle.error = function( msg ) {\n  throw new Error( \"Syntax error, unrecognized expression: \" + msg );\n};\n\n/**\n * Document sorting and removing duplicates\n * @param {ArrayLike} results\n */\nSizzle.uniqueSort = function( results ) {\n  var elem,\n    duplicates = [],\n    j = 0,\n    i = 0;\n\n  // Unless we *know* we can detect duplicates, assume their presence\n  hasDuplicate = !support.detectDuplicates;\n  sortInput = !support.sortStable && results.slice( 0 );\n  results.sort( sortOrder );\n\n  if ( hasDuplicate ) {\n    while ( (elem = results[i++]) ) {\n      if ( elem === results[ i ] ) {\n        j = duplicates.push( i );\n      }\n    }\n    while ( j-- ) {\n      results.splice( duplicates[ j ], 1 );\n    }\n  }\n\n  // Clear input after sorting to release objects\n  // See https://github.com/jquery/sizzle/pull/225\n  sortInput = null;\n\n  return results;\n};\n\n/**\n * Utility function for retrieving the text value of an array of DOM nodes\n * @param {Array|Element} elem\n */\ngetText = Sizzle.getText = function( elem ) {\n  var node,\n    ret = \"\",\n    i = 0,\n    nodeType = elem.nodeType;\n\n  if ( !nodeType ) {\n    // If no nodeType, this is expected to be an array\n    while ( (node = elem[i++]) ) {\n      // Do not traverse comment nodes\n      ret += getText( node );\n    }\n  } else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {\n    // Use textContent for elements\n    // innerText usage removed for consistency of new lines (jQuery #11153)\n    if ( typeof elem.textContent === \"string\" ) {\n      return elem.textContent;\n    } else {\n      // Traverse its children\n      for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {\n        ret += getText( elem );\n      }\n    }\n  } else if ( nodeType === 3 || nodeType === 4 ) {\n    return elem.nodeValue;\n  }\n  // Do not include comment or processing instruction nodes\n\n  return ret;\n};\n\nExpr = Sizzle.selectors = {\n\n  // Can be adjusted by the user\n  cacheLength: 50,\n\n  createPseudo: markFunction,\n\n  match: matchExpr,\n\n  attrHandle: {},\n\n  find: {},\n\n  relative: {\n    \">\": { dir: \"parentNode\", first: true },\n    \" \": { dir: \"parentNode\" },\n    \"+\": { dir: \"previousSibling\", first: true },\n    \"~\": { dir: \"previousSibling\" }\n  },\n\n  preFilter: {\n    \"ATTR\": function( match ) {\n      match[1] = match[1].replace( runescape, funescape );\n\n      // Move the given value to match[3] whether quoted or unquoted\n      match[3] = ( match[3] || match[4] || match[5] || \"\" ).replace( runescape, funescape );\n\n      if ( match[2] === \"~=\" ) {\n        match[3] = \" \" + match[3] + \" \";\n      }\n\n      return match.slice( 0, 4 );\n    },\n\n    \"CHILD\": function( match ) {\n      /* matches from matchExpr[\"CHILD\"]\n        1 type (only|nth|...)\n        2 what (child|of-type)\n        3 argument (even|odd|\\d*|\\d*n([+-]\\d+)?|...)\n        4 xn-component of xn+y argument ([+-]?\\d*n|)\n        5 sign of xn-component\n        6 x of xn-component\n        7 sign of y-component\n        8 y of y-component\n      */\n      match[1] = match[1].toLowerCase();\n\n      if ( match[1].slice( 0, 3 ) === \"nth\" ) {\n        // nth-* requires argument\n        if ( !match[3] ) {\n          Sizzle.error( match[0] );\n        }\n\n        // numeric x and y parameters for Expr.filter.CHILD\n        // remember that false/true cast respectively to 0/1\n        match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === \"even\" || match[3] === \"odd\" ) );\n        match[5] = +( ( match[7] + match[8] ) || match[3] === \"odd\" );\n\n      // other types prohibit arguments\n      } else if ( match[3] ) {\n        Sizzle.error( match[0] );\n      }\n\n      return match;\n    },\n\n    \"PSEUDO\": function( match ) {\n      var excess,\n        unquoted = !match[6] && match[2];\n\n      if ( matchExpr[\"CHILD\"].test( match[0] ) ) {\n        return null;\n      }\n\n      // Accept quoted arguments as-is\n      if ( match[3] ) {\n        match[2] = match[4] || match[5] || \"\";\n\n      // Strip excess characters from unquoted arguments\n      } else if ( unquoted && rpseudo.test( unquoted ) &&\n        // Get excess from tokenize (recursively)\n        (excess = tokenize( unquoted, true )) &&\n        // advance to the next closing parenthesis\n        (excess = unquoted.indexOf( \")\", unquoted.length - excess ) - unquoted.length) ) {\n\n        // excess is a negative index\n        match[0] = match[0].slice( 0, excess );\n        match[2] = unquoted.slice( 0, excess );\n      }\n\n      // Return only captures needed by the pseudo filter method (type and argument)\n      return match.slice( 0, 3 );\n    }\n  },\n\n  filter: {\n\n    \"TAG\": function( nodeNameSelector ) {\n      var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();\n      return nodeNameSelector === \"*\" ?\n        function() { return true; } :\n        function( elem ) {\n          return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;\n        };\n    },\n\n    \"CLASS\": function( className ) {\n      var pattern = classCache[ className + \" \" ];\n\n      return pattern ||\n        (pattern = new RegExp( \"(^|\" + whitespace + \")\" + className + \"(\" + whitespace + \"|$)\" )) &&\n        classCache( className, function( elem ) {\n          return pattern.test( typeof elem.className === \"string\" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute(\"class\") || \"\" );\n        });\n    },\n\n    \"ATTR\": function( name, operator, check ) {\n      return function( elem ) {\n        var result = Sizzle.attr( elem, name );\n\n        if ( result == null ) {\n          return operator === \"!=\";\n        }\n        if ( !operator ) {\n          return true;\n        }\n\n        result += \"\";\n\n        return operator === \"=\" ? result === check :\n          operator === \"!=\" ? result !== check :\n          operator === \"^=\" ? check && result.indexOf( check ) === 0 :\n          operator === \"*=\" ? check && result.indexOf( check ) > -1 :\n          operator === \"$=\" ? check && result.slice( -check.length ) === check :\n          operator === \"~=\" ? ( \" \" + result + \" \" ).indexOf( check ) > -1 :\n          operator === \"|=\" ? result === check || result.slice( 0, check.length + 1 ) === check + \"-\" :\n          false;\n      };\n    },\n\n    \"CHILD\": function( type, what, argument, first, last ) {\n      var simple = type.slice( 0, 3 ) !== \"nth\",\n        forward = type.slice( -4 ) !== \"last\",\n        ofType = what === \"of-type\";\n\n      return first === 1 && last === 0 ?\n\n        // Shortcut for :nth-*(n)\n        function( elem ) {\n          return !!elem.parentNode;\n        } :\n\n        function( elem, context, xml ) {\n          var cache, outerCache, node, diff, nodeIndex, start,\n            dir = simple !== forward ? \"nextSibling\" : \"previousSibling\",\n            parent = elem.parentNode,\n            name = ofType && elem.nodeName.toLowerCase(),\n            useCache = !xml && !ofType;\n\n          if ( parent ) {\n\n            // :(first|last|only)-(child|of-type)\n            if ( simple ) {\n              while ( dir ) {\n                node = elem;\n                while ( (node = node[ dir ]) ) {\n                  if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {\n                    return false;\n                  }\n                }\n                // Reverse direction for :only-* (if we haven't yet done so)\n                start = dir = type === \"only\" && !start && \"nextSibling\";\n              }\n              return true;\n            }\n\n            start = [ forward ? parent.firstChild : parent.lastChild ];\n\n            // non-xml :nth-child(...) stores cache data on `parent`\n            if ( forward && useCache ) {\n              // Seek `elem` from a previously-cached index\n              outerCache = parent[ expando ] || (parent[ expando ] = {});\n              cache = outerCache[ type ] || [];\n              nodeIndex = cache[0] === dirruns && cache[1];\n              diff = cache[0] === dirruns && cache[2];\n              node = nodeIndex && parent.childNodes[ nodeIndex ];\n\n              while ( (node = ++nodeIndex && node && node[ dir ] ||\n\n                // Fallback to seeking `elem` from the start\n                (diff = nodeIndex = 0) || start.pop()) ) {\n\n                // When found, cache indexes on `parent` and break\n                if ( node.nodeType === 1 && ++diff && node === elem ) {\n                  outerCache[ type ] = [ dirruns, nodeIndex, diff ];\n                  break;\n                }\n              }\n\n            // Use previously-cached element index if available\n            } else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {\n              diff = cache[1];\n\n            // xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)\n            } else {\n              // Use the same loop as above to seek `elem` from the start\n              while ( (node = ++nodeIndex && node && node[ dir ] ||\n                (diff = nodeIndex = 0) || start.pop()) ) {\n\n                if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {\n                  // Cache the index of each encountered element\n                  if ( useCache ) {\n                    (node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];\n                  }\n\n                  if ( node === elem ) {\n                    break;\n                  }\n                }\n              }\n            }\n\n            // Incorporate the offset, then check against cycle size\n            diff -= last;\n            return diff === first || ( diff % first === 0 && diff / first >= 0 );\n          }\n        };\n    },\n\n    \"PSEUDO\": function( pseudo, argument ) {\n      // pseudo-class names are case-insensitive\n      // http://www.w3.org/TR/selectors/#pseudo-classes\n      // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters\n      // Remember that setFilters inherits from pseudos\n      var args,\n        fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||\n          Sizzle.error( \"unsupported pseudo: \" + pseudo );\n\n      // The user may use createPseudo to indicate that\n      // arguments are needed to create the filter function\n      // just as Sizzle does\n      if ( fn[ expando ] ) {\n        return fn( argument );\n      }\n\n      // But maintain support for old signatures\n      if ( fn.length > 1 ) {\n        args = [ pseudo, pseudo, \"\", argument ];\n        return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?\n          markFunction(function( seed, matches ) {\n            var idx,\n              matched = fn( seed, argument ),\n              i = matched.length;\n            while ( i-- ) {\n              idx = indexOf.call( seed, matched[i] );\n              seed[ idx ] = !( matches[ idx ] = matched[i] );\n            }\n          }) :\n          function( elem ) {\n            return fn( elem, 0, args );\n          };\n      }\n\n      return fn;\n    }\n  },\n\n  pseudos: {\n    // Potentially complex pseudos\n    \"not\": markFunction(function( selector ) {\n      // Trim the selector passed to compile\n      // to avoid treating leading and trailing\n      // spaces as combinators\n      var input = [],\n        results = [],\n        matcher = compile( selector.replace( rtrim, \"$1\" ) );\n\n      return matcher[ expando ] ?\n        markFunction(function( seed, matches, context, xml ) {\n          var elem,\n            unmatched = matcher( seed, null, xml, [] ),\n            i = seed.length;\n\n          // Match elements unmatched by `matcher`\n          while ( i-- ) {\n            if ( (elem = unmatched[i]) ) {\n              seed[i] = !(matches[i] = elem);\n            }\n          }\n        }) :\n        function( elem, context, xml ) {\n          input[0] = elem;\n          matcher( input, null, xml, results );\n          return !results.pop();\n        };\n    }),\n\n    \"has\": markFunction(function( selector ) {\n      return function( elem ) {\n        return Sizzle( selector, elem ).length > 0;\n      };\n    }),\n\n    \"contains\": markFunction(function( text ) {\n      return function( elem ) {\n        return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;\n      };\n    }),\n\n    // \"Whether an element is represented by a :lang() selector\n    // is based solely on the element's language value\n    // being equal to the identifier C,\n    // or beginning with the identifier C immediately followed by \"-\".\n    // The matching of C against the element's language value is performed case-insensitively.\n    // The identifier C does not have to be a valid language name.\"\n    // http://www.w3.org/TR/selectors/#lang-pseudo\n    \"lang\": markFunction( function( lang ) {\n      // lang value must be a valid identifier\n      if ( !ridentifier.test(lang || \"\") ) {\n        Sizzle.error( \"unsupported lang: \" + lang );\n      }\n      lang = lang.replace( runescape, funescape ).toLowerCase();\n      return function( elem ) {\n        var elemLang;\n        do {\n          if ( (elemLang = documentIsHTML ?\n            elem.lang :\n            elem.getAttribute(\"xml:lang\") || elem.getAttribute(\"lang\")) ) {\n\n            elemLang = elemLang.toLowerCase();\n            return elemLang === lang || elemLang.indexOf( lang + \"-\" ) === 0;\n          }\n        } while ( (elem = elem.parentNode) && elem.nodeType === 1 );\n        return false;\n      };\n    }),\n\n    // Miscellaneous\n    \"target\": function( elem ) {\n      var hash = window.location && window.location.hash;\n      return hash && hash.slice( 1 ) === elem.id;\n    },\n\n    \"root\": function( elem ) {\n      return elem === docElem;\n    },\n\n    \"focus\": function( elem ) {\n      return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);\n    },\n\n    // Boolean properties\n    \"enabled\": function( elem ) {\n      return elem.disabled === false;\n    },\n\n    \"disabled\": function( elem ) {\n      return elem.disabled === true;\n    },\n\n    \"checked\": function( elem ) {\n      // In CSS3, :checked should return both checked and selected elements\n      // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked\n      var nodeName = elem.nodeName.toLowerCase();\n      return (nodeName === \"input\" && !!elem.checked) || (nodeName === \"option\" && !!elem.selected);\n    },\n\n    \"selected\": function( elem ) {\n      // Accessing this property makes selected-by-default\n      // options in Safari work properly\n      if ( elem.parentNode ) {\n        elem.parentNode.selectedIndex;\n      }\n\n      return elem.selected === true;\n    },\n\n    // Contents\n    \"empty\": function( elem ) {\n      // http://www.w3.org/TR/selectors/#empty-pseudo\n      // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),\n      //   but not by others (comment: 8; processing instruction: 7; etc.)\n      // nodeType < 6 works because attributes (2) do not appear as children\n      for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {\n        if ( elem.nodeType < 6 ) {\n          return false;\n        }\n      }\n      return true;\n    },\n\n    \"parent\": function( elem ) {\n      return !Expr.pseudos[\"empty\"]( elem );\n    },\n\n    // Element/input types\n    \"header\": function( elem ) {\n      return rheader.test( elem.nodeName );\n    },\n\n    \"input\": function( elem ) {\n      return rinputs.test( elem.nodeName );\n    },\n\n    \"button\": function( elem ) {\n      var name = elem.nodeName.toLowerCase();\n      return name === \"input\" && elem.type === \"button\" || name === \"button\";\n    },\n\n    \"text\": function( elem ) {\n      var attr;\n      return elem.nodeName.toLowerCase() === \"input\" &&\n        elem.type === \"text\" &&\n\n        // Support: IE<8\n        // New HTML5 attribute values (e.g., \"search\") appear with elem.type === \"text\"\n        ( (attr = elem.getAttribute(\"type\")) == null || attr.toLowerCase() === \"text\" );\n    },\n\n    // Position-in-collection\n    \"first\": createPositionalPseudo(function() {\n      return [ 0 ];\n    }),\n\n    \"last\": createPositionalPseudo(function( matchIndexes, length ) {\n      return [ length - 1 ];\n    }),\n\n    \"eq\": createPositionalPseudo(function( matchIndexes, length, argument ) {\n      return [ argument < 0 ? argument + length : argument ];\n    }),\n\n    \"even\": createPositionalPseudo(function( matchIndexes, length ) {\n      var i = 0;\n      for ( ; i < length; i += 2 ) {\n        matchIndexes.push( i );\n      }\n      return matchIndexes;\n    }),\n\n    \"odd\": createPositionalPseudo(function( matchIndexes, length ) {\n      var i = 1;\n      for ( ; i < length; i += 2 ) {\n        matchIndexes.push( i );\n      }\n      return matchIndexes;\n    }),\n\n    \"lt\": createPositionalPseudo(function( matchIndexes, length, argument ) {\n      var i = argument < 0 ? argument + length : argument;\n      for ( ; --i >= 0; ) {\n        matchIndexes.push( i );\n      }\n      return matchIndexes;\n    }),\n\n    \"gt\": createPositionalPseudo(function( matchIndexes, length, argument ) {\n      var i = argument < 0 ? argument + length : argument;\n      for ( ; ++i < length; ) {\n        matchIndexes.push( i );\n      }\n      return matchIndexes;\n    })\n  }\n};\n\nExpr.pseudos[\"nth\"] = Expr.pseudos[\"eq\"];\n\n// Add button/input type pseudos\nfor ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {\n  Expr.pseudos[ i ] = createInputPseudo( i );\n}\nfor ( i in { submit: true, reset: true } ) {\n  Expr.pseudos[ i ] = createButtonPseudo( i );\n}\n\n// Easy API for creating new setFilters\nfunction setFilters() {}\nsetFilters.prototype = Expr.filters = Expr.pseudos;\nExpr.setFilters = new setFilters();\n\ntokenize = Sizzle.tokenize = function( selector, parseOnly ) {\n  var matched, match, tokens, type,\n    soFar, groups, preFilters,\n    cached = tokenCache[ selector + \" \" ];\n\n  if ( cached ) {\n    return parseOnly ? 0 : cached.slice( 0 );\n  }\n\n  soFar = selector;\n  groups = [];\n  preFilters = Expr.preFilter;\n\n  while ( soFar ) {\n\n    // Comma and first run\n    if ( !matched || (match = rcomma.exec( soFar )) ) {\n      if ( match ) {\n        // Don't consume trailing commas as valid\n        soFar = soFar.slice( match[0].length ) || soFar;\n      }\n      groups.push( (tokens = []) );\n    }\n\n    matched = false;\n\n    // Combinators\n    if ( (match = rcombinators.exec( soFar )) ) {\n      matched = match.shift();\n      tokens.push({\n        value: matched,\n        // Cast descendant combinators to space\n        type: match[0].replace( rtrim, \" \" )\n      });\n      soFar = soFar.slice( matched.length );\n    }\n\n    // Filters\n    for ( type in Expr.filter ) {\n      if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||\n        (match = preFilters[ type ]( match ))) ) {\n        matched = match.shift();\n        tokens.push({\n          value: matched,\n          type: type,\n          matches: match\n        });\n        soFar = soFar.slice( matched.length );\n      }\n    }\n\n    if ( !matched ) {\n      break;\n    }\n  }\n\n  // Return the length of the invalid excess\n  // if we're just parsing\n  // Otherwise, throw an error or return tokens\n  return parseOnly ?\n    soFar.length :\n    soFar ?\n      Sizzle.error( selector ) :\n      // Cache the tokens\n      tokenCache( selector, groups ).slice( 0 );\n};\n\nfunction toSelector( tokens ) {\n  var i = 0,\n    len = tokens.length,\n    selector = \"\";\n  for ( ; i < len; i++ ) {\n    selector += tokens[i].value;\n  }\n  return selector;\n}\n\nfunction addCombinator( matcher, combinator, base ) {\n  var dir = combinator.dir,\n    checkNonElements = base && dir === \"parentNode\",\n    doneName = done++;\n\n  return combinator.first ?\n    // Check against closest ancestor/preceding element\n    function( elem, context, xml ) {\n      while ( (elem = elem[ dir ]) ) {\n        if ( elem.nodeType === 1 || checkNonElements ) {\n          return matcher( elem, context, xml );\n        }\n      }\n    } :\n\n    // Check against all ancestor/preceding elements\n    function( elem, context, xml ) {\n      var oldCache, outerCache,\n        newCache = [ dirruns, doneName ];\n\n      // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching\n      if ( xml ) {\n        while ( (elem = elem[ dir ]) ) {\n          if ( elem.nodeType === 1 || checkNonElements ) {\n            if ( matcher( elem, context, xml ) ) {\n              return true;\n            }\n          }\n        }\n      } else {\n        while ( (elem = elem[ dir ]) ) {\n          if ( elem.nodeType === 1 || checkNonElements ) {\n            outerCache = elem[ expando ] || (elem[ expando ] = {});\n            if ( (oldCache = outerCache[ dir ]) &&\n              oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {\n\n              // Assign to newCache so results back-propagate to previous elements\n              return (newCache[ 2 ] = oldCache[ 2 ]);\n            } else {\n              // Reuse newcache so results back-propagate to previous elements\n              outerCache[ dir ] = newCache;\n\n              // A match means we're done; a fail means we have to keep checking\n              if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {\n                return true;\n              }\n            }\n          }\n        }\n      }\n    };\n}\n\nfunction elementMatcher( matchers ) {\n  return matchers.length > 1 ?\n    function( elem, context, xml ) {\n      var i = matchers.length;\n      while ( i-- ) {\n        if ( !matchers[i]( elem, context, xml ) ) {\n          return false;\n        }\n      }\n      return true;\n    } :\n    matchers[0];\n}\n\nfunction multipleContexts( selector, contexts, results ) {\n  var i = 0,\n    len = contexts.length;\n  for ( ; i < len; i++ ) {\n    Sizzle( selector, contexts[i], results );\n  }\n  return results;\n}\n\nfunction condense( unmatched, map, filter, context, xml ) {\n  var elem,\n    newUnmatched = [],\n    i = 0,\n    len = unmatched.length,\n    mapped = map != null;\n\n  for ( ; i < len; i++ ) {\n    if ( (elem = unmatched[i]) ) {\n      if ( !filter || filter( elem, context, xml ) ) {\n        newUnmatched.push( elem );\n        if ( mapped ) {\n          map.push( i );\n        }\n      }\n    }\n  }\n\n  return newUnmatched;\n}\n\nfunction setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {\n  if ( postFilter && !postFilter[ expando ] ) {\n    postFilter = setMatcher( postFilter );\n  }\n  if ( postFinder && !postFinder[ expando ] ) {\n    postFinder = setMatcher( postFinder, postSelector );\n  }\n  return markFunction(function( seed, results, context, xml ) {\n    var temp, i, elem,\n      preMap = [],\n      postMap = [],\n      preexisting = results.length,\n\n      // Get initial elements from seed or context\n      elems = seed || multipleContexts( selector || \"*\", context.nodeType ? [ context ] : context, [] ),\n\n      // Prefilter to get matcher input, preserving a map for seed-results synchronization\n      matcherIn = preFilter && ( seed || !selector ) ?\n        condense( elems, preMap, preFilter, context, xml ) :\n        elems,\n\n      matcherOut = matcher ?\n        // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,\n        postFinder || ( seed ? preFilter : preexisting || postFilter ) ?\n\n          // ...intermediate processing is necessary\n          [] :\n\n          // ...otherwise use results directly\n          results :\n        matcherIn;\n\n    // Find primary matches\n    if ( matcher ) {\n      matcher( matcherIn, matcherOut, context, xml );\n    }\n\n    // Apply postFilter\n    if ( postFilter ) {\n      temp = condense( matcherOut, postMap );\n      postFilter( temp, [], context, xml );\n\n      // Un-match failing elements by moving them back to matcherIn\n      i = temp.length;\n      while ( i-- ) {\n        if ( (elem = temp[i]) ) {\n          matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);\n        }\n      }\n    }\n\n    if ( seed ) {\n      if ( postFinder || preFilter ) {\n        if ( postFinder ) {\n          // Get the final matcherOut by condensing this intermediate into postFinder contexts\n          temp = [];\n          i = matcherOut.length;\n          while ( i-- ) {\n            if ( (elem = matcherOut[i]) ) {\n              // Restore matcherIn since elem is not yet a final match\n              temp.push( (matcherIn[i] = elem) );\n            }\n          }\n          postFinder( null, (matcherOut = []), temp, xml );\n        }\n\n        // Move matched elements from seed to results to keep them synchronized\n        i = matcherOut.length;\n        while ( i-- ) {\n          if ( (elem = matcherOut[i]) &&\n            (temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {\n\n            seed[temp] = !(results[temp] = elem);\n          }\n        }\n      }\n\n    // Add elements to results, through postFinder if defined\n    } else {\n      matcherOut = condense(\n        matcherOut === results ?\n          matcherOut.splice( preexisting, matcherOut.length ) :\n          matcherOut\n      );\n      if ( postFinder ) {\n        postFinder( null, results, matcherOut, xml );\n      } else {\n        push.apply( results, matcherOut );\n      }\n    }\n  });\n}\n\nfunction matcherFromTokens( tokens ) {\n  var checkContext, matcher, j,\n    len = tokens.length,\n    leadingRelative = Expr.relative[ tokens[0].type ],\n    implicitRelative = leadingRelative || Expr.relative[\" \"],\n    i = leadingRelative ? 1 : 0,\n\n    // The foundational matcher ensures that elements are reachable from top-level context(s)\n    matchContext = addCombinator( function( elem ) {\n      return elem === checkContext;\n    }, implicitRelative, true ),\n    matchAnyContext = addCombinator( function( elem ) {\n      return indexOf.call( checkContext, elem ) > -1;\n    }, implicitRelative, true ),\n    matchers = [ function( elem, context, xml ) {\n      return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (\n        (checkContext = context).nodeType ?\n          matchContext( elem, context, xml ) :\n          matchAnyContext( elem, context, xml ) );\n    } ];\n\n  for ( ; i < len; i++ ) {\n    if ( (matcher = Expr.relative[ tokens[i].type ]) ) {\n      matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];\n    } else {\n      matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );\n\n      // Return special upon seeing a positional matcher\n      if ( matcher[ expando ] ) {\n        // Find the next relative operator (if any) for proper handling\n        j = ++i;\n        for ( ; j < len; j++ ) {\n          if ( Expr.relative[ tokens[j].type ] ) {\n            break;\n          }\n        }\n        return setMatcher(\n          i > 1 && elementMatcher( matchers ),\n          i > 1 && toSelector(\n            // If the preceding token was a descendant combinator, insert an implicit any-element `*`\n            tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === \" \" ? \"*\" : \"\" })\n          ).replace( rtrim, \"$1\" ),\n          matcher,\n          i < j && matcherFromTokens( tokens.slice( i, j ) ),\n          j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),\n          j < len && toSelector( tokens )\n        );\n      }\n      matchers.push( matcher );\n    }\n  }\n\n  return elementMatcher( matchers );\n}\n\nfunction matcherFromGroupMatchers( elementMatchers, setMatchers ) {\n  var bySet = setMatchers.length > 0,\n    byElement = elementMatchers.length > 0,\n    superMatcher = function( seed, context, xml, results, outermost ) {\n      var elem, j, matcher,\n        matchedCount = 0,\n        i = \"0\",\n        unmatched = seed && [],\n        setMatched = [],\n        contextBackup = outermostContext,\n        // We must always have either seed elements or outermost context\n        elems = seed || byElement && Expr.find[\"TAG\"]( \"*\", outermost ),\n        // Use integer dirruns iff this is the outermost matcher\n        dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),\n        len = elems.length;\n\n      if ( outermost ) {\n        outermostContext = context !== document && context;\n      }\n\n      // Add elements passing elementMatchers directly to results\n      // Keep `i` a string if there are no elements so `matchedCount` will be \"00\" below\n      // Support: IE<9, Safari\n      // Tolerate NodeList properties (IE: \"length\"; Safari: <number>) matching elements by id\n      for ( ; i !== len && (elem = elems[i]) != null; i++ ) {\n        if ( byElement && elem ) {\n          j = 0;\n          while ( (matcher = elementMatchers[j++]) ) {\n            if ( matcher( elem, context, xml ) ) {\n              results.push( elem );\n              break;\n            }\n          }\n          if ( outermost ) {\n            dirruns = dirrunsUnique;\n          }\n        }\n\n        // Track unmatched elements for set filters\n        if ( bySet ) {\n          // They will have gone through all possible matchers\n          if ( (elem = !matcher && elem) ) {\n            matchedCount--;\n          }\n\n          // Lengthen the array for every element, matched or not\n          if ( seed ) {\n            unmatched.push( elem );\n          }\n        }\n      }\n\n      // Apply set filters to unmatched elements\n      matchedCount += i;\n      if ( bySet && i !== matchedCount ) {\n        j = 0;\n        while ( (matcher = setMatchers[j++]) ) {\n          matcher( unmatched, setMatched, context, xml );\n        }\n\n        if ( seed ) {\n          // Reintegrate element matches to eliminate the need for sorting\n          if ( matchedCount > 0 ) {\n            while ( i-- ) {\n              if ( !(unmatched[i] || setMatched[i]) ) {\n                setMatched[i] = pop.call( results );\n              }\n            }\n          }\n\n          // Discard index placeholder values to get only actual matches\n          setMatched = condense( setMatched );\n        }\n\n        // Add matches to results\n        push.apply( results, setMatched );\n\n        // Seedless set matches succeeding multiple successful matchers stipulate sorting\n        if ( outermost && !seed && setMatched.length > 0 &&\n          ( matchedCount + setMatchers.length ) > 1 ) {\n\n          Sizzle.uniqueSort( results );\n        }\n      }\n\n      // Override manipulation of globals by nested matchers\n      if ( outermost ) {\n        dirruns = dirrunsUnique;\n        outermostContext = contextBackup;\n      }\n\n      return unmatched;\n    };\n\n  return bySet ?\n    markFunction( superMatcher ) :\n    superMatcher;\n}\n\ncompile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {\n  var i,\n    setMatchers = [],\n    elementMatchers = [],\n    cached = compilerCache[ selector + \" \" ];\n\n  if ( !cached ) {\n    // Generate a function of recursive functions that can be used to check each element\n    if ( !match ) {\n      match = tokenize( selector );\n    }\n    i = match.length;\n    while ( i-- ) {\n      cached = matcherFromTokens( match[i] );\n      if ( cached[ expando ] ) {\n        setMatchers.push( cached );\n      } else {\n        elementMatchers.push( cached );\n      }\n    }\n\n    // Cache the compiled function\n    cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );\n\n    // Save selector and tokenization\n    cached.selector = selector;\n  }\n  return cached;\n};\n\n/**\n * A low-level selection function that works with Sizzle's compiled\n *  selector functions\n * @param {String|Function} selector A selector or a pre-compiled\n *  selector function built with Sizzle.compile\n * @param {Element} context\n * @param {Array} [results]\n * @param {Array} [seed] A set of elements to match against\n */\nselect = Sizzle.select = function( selector, context, results, seed ) {\n  var i, tokens, token, type, find,\n    compiled = typeof selector === \"function\" && selector,\n    match = !seed && tokenize( (selector = compiled.selector || selector) );\n\n  results = results || [];\n\n  // Try to minimize operations if there is no seed and only one group\n  if ( match.length === 1 ) {\n\n    // Take a shortcut and set the context if the root selector is an ID\n    tokens = match[0] = match[0].slice( 0 );\n    if ( tokens.length > 2 && (token = tokens[0]).type === \"ID\" &&\n        support.getById && context.nodeType === 9 && documentIsHTML &&\n        Expr.relative[ tokens[1].type ] ) {\n\n      context = ( Expr.find[\"ID\"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];\n      if ( !context ) {\n        return results;\n\n      // Precompiled matchers will still verify ancestry, so step up a level\n      } else if ( compiled ) {\n        context = context.parentNode;\n      }\n\n      selector = selector.slice( tokens.shift().value.length );\n    }\n\n    // Fetch a seed set for right-to-left matching\n    i = matchExpr[\"needsContext\"].test( selector ) ? 0 : tokens.length;\n    while ( i-- ) {\n      token = tokens[i];\n\n      // Abort if we hit a combinator\n      if ( Expr.relative[ (type = token.type) ] ) {\n        break;\n      }\n      if ( (find = Expr.find[ type ]) ) {\n        // Search, expanding context for leading sibling combinators\n        if ( (seed = find(\n          token.matches[0].replace( runescape, funescape ),\n          rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context\n        )) ) {\n\n          // If seed is empty or no tokens remain, we can return early\n          tokens.splice( i, 1 );\n          selector = seed.length && toSelector( tokens );\n          if ( !selector ) {\n            push.apply( results, seed );\n            return results;\n          }\n\n          break;\n        }\n      }\n    }\n  }\n\n  // Compile and execute a filtering function if one is not provided\n  // Provide `match` to avoid retokenization if we modified the selector above\n  ( compiled || compile( selector, match ) )(\n    seed,\n    context,\n    !documentIsHTML,\n    results,\n    rsibling.test( selector ) && testContext( context.parentNode ) || context\n  );\n  return results;\n};\n\n// One-time assignments\n\n// Sort stability\nsupport.sortStable = expando.split(\"\").sort( sortOrder ).join(\"\") === expando;\n\n// Support: Chrome<14\n// Always assume duplicates if they aren't passed to the comparison function\nsupport.detectDuplicates = !!hasDuplicate;\n\n// Initialize against the default document\nsetDocument();\n\n// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)\n// Detached nodes confoundingly follow *each other*\nsupport.sortDetached = assert(function( div1 ) {\n  // Should return 1, but returns 4 (following)\n  return div1.compareDocumentPosition( document.createElement(\"div\") ) & 1;\n});\n\n// Support: IE<8\n// Prevent attribute/property \"interpolation\"\n// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx\nif ( !assert(function( div ) {\n  div.innerHTML = \"<a href='#'></a>\";\n  return div.firstChild.getAttribute(\"href\") === \"#\" ;\n}) ) {\n  addHandle( \"type|href|height|width\", function( elem, name, isXML ) {\n    if ( !isXML ) {\n      return elem.getAttribute( name, name.toLowerCase() === \"type\" ? 1 : 2 );\n    }\n  });\n}\n\n// Support: IE<9\n// Use defaultValue in place of getAttribute(\"value\")\nif ( !support.attributes || !assert(function( div ) {\n  div.innerHTML = \"<input/>\";\n  div.firstChild.setAttribute( \"value\", \"\" );\n  return div.firstChild.getAttribute( \"value\" ) === \"\";\n}) ) {\n  addHandle( \"value\", function( elem, name, isXML ) {\n    if ( !isXML && elem.nodeName.toLowerCase() === \"input\" ) {\n      return elem.defaultValue;\n    }\n  });\n}\n\n// Support: IE<9\n// Use getAttributeNode to fetch booleans when getAttribute lies\nif ( !assert(function( div ) {\n  return div.getAttribute(\"disabled\") == null;\n}) ) {\n  addHandle( booleans, function( elem, name, isXML ) {\n    var val;\n    if ( !isXML ) {\n      return elem[ name ] === true ? name.toLowerCase() :\n          (val = elem.getAttributeNode( name )) && val.specified ?\n          val.value :\n        null;\n    }\n  });\n}\n\nreturn Sizzle;\n\n})( window );\n\n\n\njQuery.find = Sizzle;\njQuery.expr = Sizzle.selectors;\njQuery.expr[\":\"] = jQuery.expr.pseudos;\njQuery.unique = Sizzle.uniqueSort;\njQuery.text = Sizzle.getText;\njQuery.isXMLDoc = Sizzle.isXML;\njQuery.contains = Sizzle.contains;\n\n\n\nvar rneedsContext = jQuery.expr.match.needsContext;\n\nvar rsingleTag = (/^<(\\w+)\\s*\\/?>(?:<\\/\\1>|)$/);\n\n\n\nvar risSimple = /^.[^:#\\[\\.,]*$/;\n\n// Implement the identical functionality for filter and not\nfunction winnow( elements, qualifier, not ) {\n  if ( jQuery.isFunction( qualifier ) ) {\n    return jQuery.grep( elements, function( elem, i ) {\n      /* jshint -W018 */\n      return !!qualifier.call( elem, i, elem ) !== not;\n    });\n\n  }\n\n  if ( qualifier.nodeType ) {\n    return jQuery.grep( elements, function( elem ) {\n      return ( elem === qualifier ) !== not;\n    });\n\n  }\n\n  if ( typeof qualifier === \"string\" ) {\n    if ( risSimple.test( qualifier ) ) {\n      return jQuery.filter( qualifier, elements, not );\n    }\n\n    qualifier = jQuery.filter( qualifier, elements );\n  }\n\n  return jQuery.grep( elements, function( elem ) {\n    return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;\n  });\n}\n\njQuery.filter = function( expr, elems, not ) {\n  var elem = elems[ 0 ];\n\n  if ( not ) {\n    expr = \":not(\" + expr + \")\";\n  }\n\n  return elems.length === 1 && elem.nodeType === 1 ?\n    jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :\n    jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {\n      return elem.nodeType === 1;\n    }));\n};\n\njQuery.fn.extend({\n  find: function( selector ) {\n    var i,\n      ret = [],\n      self = this,\n      len = self.length;\n\n    if ( typeof selector !== \"string\" ) {\n      return this.pushStack( jQuery( selector ).filter(function() {\n        for ( i = 0; i < len; i++ ) {\n          if ( jQuery.contains( self[ i ], this ) ) {\n            return true;\n          }\n        }\n      }) );\n    }\n\n    for ( i = 0; i < len; i++ ) {\n      jQuery.find( selector, self[ i ], ret );\n    }\n\n    // Needed because $( selector, context ) becomes $( context ).find( selector )\n    ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );\n    ret.selector = this.selector ? this.selector + \" \" + selector : selector;\n    return ret;\n  },\n  filter: function( selector ) {\n    return this.pushStack( winnow(this, selector || [], false) );\n  },\n  not: function( selector ) {\n    return this.pushStack( winnow(this, selector || [], true) );\n  },\n  is: function( selector ) {\n    return !!winnow(\n      this,\n\n      // If this is a positional/relative selector, check membership in the returned set\n      // so $(\"p:first\").is(\"p:last\") won't return true for a doc with two \"p\".\n      typeof selector === \"string\" && rneedsContext.test( selector ) ?\n        jQuery( selector ) :\n        selector || [],\n      false\n    ).length;\n  }\n});\n\n\n// Initialize a jQuery object\n\n\n// A central reference to the root jQuery(document)\nvar rootjQuery,\n\n  // Use the correct document accordingly with window argument (sandbox)\n  document = window.document,\n\n  // A simple way to check for HTML strings\n  // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)\n  // Strict HTML recognition (#11290: must start with <)\n  rquickExpr = /^(?:\\s*(<[\\w\\W]+>)[^>]*|#([\\w-]*))$/,\n\n  init = jQuery.fn.init = function( selector, context ) {\n    var match, elem;\n\n    // HANDLE: $(\"\"), $(null), $(undefined), $(false)\n    if ( !selector ) {\n      return this;\n    }\n\n    // Handle HTML strings\n    if ( typeof selector === \"string\" ) {\n      if ( selector.charAt(0) === \"<\" && selector.charAt( selector.length - 1 ) === \">\" && selector.length >= 3 ) {\n        // Assume that strings that start and end with <> are HTML and skip the regex check\n        match = [ null, selector, null ];\n\n      } else {\n        match = rquickExpr.exec( selector );\n      }\n\n      // Match html or make sure no context is specified for #id\n      if ( match && (match[1] || !context) ) {\n\n        // HANDLE: $(html) -> $(array)\n        if ( match[1] ) {\n          context = context instanceof jQuery ? context[0] : context;\n\n          // scripts is true for back-compat\n          // Intentionally let the error be thrown if parseHTML is not present\n          jQuery.merge( this, jQuery.parseHTML(\n            match[1],\n            context && context.nodeType ? context.ownerDocument || context : document,\n            true\n          ) );\n\n          // HANDLE: $(html, props)\n          if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {\n            for ( match in context ) {\n              // Properties of context are called as methods if possible\n              if ( jQuery.isFunction( this[ match ] ) ) {\n                this[ match ]( context[ match ] );\n\n              // ...and otherwise set as attributes\n              } else {\n                this.attr( match, context[ match ] );\n              }\n            }\n          }\n\n          return this;\n\n        // HANDLE: $(#id)\n        } else {\n          elem = document.getElementById( match[2] );\n\n          // Check parentNode to catch when Blackberry 4.6 returns\n          // nodes that are no longer in the document #6963\n          if ( elem && elem.parentNode ) {\n            // Handle the case where IE and Opera return items\n            // by name instead of ID\n            if ( elem.id !== match[2] ) {\n              return rootjQuery.find( selector );\n            }\n\n            // Otherwise, we inject the element directly into the jQuery object\n            this.length = 1;\n            this[0] = elem;\n          }\n\n          this.context = document;\n          this.selector = selector;\n          return this;\n        }\n\n      // HANDLE: $(expr, $(...))\n      } else if ( !context || context.jquery ) {\n        return ( context || rootjQuery ).find( selector );\n\n      // HANDLE: $(expr, context)\n      // (which is just equivalent to: $(context).find(expr)\n      } else {\n        return this.constructor( context ).find( selector );\n      }\n\n    // HANDLE: $(DOMElement)\n    } else if ( selector.nodeType ) {\n      this.context = this[0] = selector;\n      this.length = 1;\n      return this;\n\n    // HANDLE: $(function)\n    // Shortcut for document ready\n    } else if ( jQuery.isFunction( selector ) ) {\n      return typeof rootjQuery.ready !== \"undefined\" ?\n        rootjQuery.ready( selector ) :\n        // Execute immediately if ready is not present\n        selector( jQuery );\n    }\n\n    if ( selector.selector !== undefined ) {\n      this.selector = selector.selector;\n      this.context = selector.context;\n    }\n\n    return jQuery.makeArray( selector, this );\n  };\n\n// Give the init function the jQuery prototype for later instantiation\ninit.prototype = jQuery.fn;\n\n// Initialize central reference\nrootjQuery = jQuery( document );\n\n\nvar rparentsprev = /^(?:parents|prev(?:Until|All))/,\n  // methods guaranteed to produce a unique set when starting from a unique set\n  guaranteedUnique = {\n    children: true,\n    contents: true,\n    next: true,\n    prev: true\n  };\n\njQuery.extend({\n  dir: function( elem, dir, until ) {\n    var matched = [],\n      cur = elem[ dir ];\n\n    while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {\n      if ( cur.nodeType === 1 ) {\n        matched.push( cur );\n      }\n      cur = cur[dir];\n    }\n    return matched;\n  },\n\n  sibling: function( n, elem ) {\n    var r = [];\n\n    for ( ; n; n = n.nextSibling ) {\n      if ( n.nodeType === 1 && n !== elem ) {\n        r.push( n );\n      }\n    }\n\n    return r;\n  }\n});\n\njQuery.fn.extend({\n  has: function( target ) {\n    var i,\n      targets = jQuery( target, this ),\n      len = targets.length;\n\n    return this.filter(function() {\n      for ( i = 0; i < len; i++ ) {\n        if ( jQuery.contains( this, targets[i] ) ) {\n          return true;\n        }\n      }\n    });\n  },\n\n  closest: function( selectors, context ) {\n    var cur,\n      i = 0,\n      l = this.length,\n      matched = [],\n      pos = rneedsContext.test( selectors ) || typeof selectors !== \"string\" ?\n        jQuery( selectors, context || this.context ) :\n        0;\n\n    for ( ; i < l; i++ ) {\n      for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {\n        // Always skip document fragments\n        if ( cur.nodeType < 11 && (pos ?\n          pos.index(cur) > -1 :\n\n          // Don't pass non-elements to Sizzle\n          cur.nodeType === 1 &&\n            jQuery.find.matchesSelector(cur, selectors)) ) {\n\n          matched.push( cur );\n          break;\n        }\n      }\n    }\n\n    return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );\n  },\n\n  // Determine the position of an element within\n  // the matched set of elements\n  index: function( elem ) {\n\n    // No argument, return index in parent\n    if ( !elem ) {\n      return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;\n    }\n\n    // index in selector\n    if ( typeof elem === \"string\" ) {\n      return jQuery.inArray( this[0], jQuery( elem ) );\n    }\n\n    // Locate the position of the desired element\n    return jQuery.inArray(\n      // If it receives a jQuery object, the first element is used\n      elem.jquery ? elem[0] : elem, this );\n  },\n\n  add: function( selector, context ) {\n    return this.pushStack(\n      jQuery.unique(\n        jQuery.merge( this.get(), jQuery( selector, context ) )\n      )\n    );\n  },\n\n  addBack: function( selector ) {\n    return this.add( selector == null ?\n      this.prevObject : this.prevObject.filter(selector)\n    );\n  }\n});\n\nfunction sibling( cur, dir ) {\n  do {\n    cur = cur[ dir ];\n  } while ( cur && cur.nodeType !== 1 );\n\n  return cur;\n}\n\njQuery.each({\n  parent: function( elem ) {\n    var parent = elem.parentNode;\n    return parent && parent.nodeType !== 11 ? parent : null;\n  },\n  parents: function( elem ) {\n    return jQuery.dir( elem, \"parentNode\" );\n  },\n  parentsUntil: function( elem, i, until ) {\n    return jQuery.dir( elem, \"parentNode\", until );\n  },\n  next: function( elem ) {\n    return sibling( elem, \"nextSibling\" );\n  },\n  prev: function( elem ) {\n    return sibling( elem, \"previousSibling\" );\n  },\n  nextAll: function( elem ) {\n    return jQuery.dir( elem, \"nextSibling\" );\n  },\n  prevAll: function( elem ) {\n    return jQuery.dir( elem, \"previousSibling\" );\n  },\n  nextUntil: function( elem, i, until ) {\n    return jQuery.dir( elem, \"nextSibling\", until );\n  },\n  prevUntil: function( elem, i, until ) {\n    return jQuery.dir( elem, \"previousSibling\", until );\n  },\n  siblings: function( elem ) {\n    return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );\n  },\n  children: function( elem ) {\n    return jQuery.sibling( elem.firstChild );\n  },\n  contents: function( elem ) {\n    return jQuery.nodeName( elem, \"iframe\" ) ?\n      elem.contentDocument || elem.contentWindow.document :\n      jQuery.merge( [], elem.childNodes );\n  }\n}, function( name, fn ) {\n  jQuery.fn[ name ] = function( until, selector ) {\n    var ret = jQuery.map( this, fn, until );\n\n    if ( name.slice( -5 ) !== \"Until\" ) {\n      selector = until;\n    }\n\n    if ( selector && typeof selector === \"string\" ) {\n      ret = jQuery.filter( selector, ret );\n    }\n\n    if ( this.length > 1 ) {\n      // Remove duplicates\n      if ( !guaranteedUnique[ name ] ) {\n        ret = jQuery.unique( ret );\n      }\n\n      // Reverse order for parents* and prev-derivatives\n      if ( rparentsprev.test( name ) ) {\n        ret = ret.reverse();\n      }\n    }\n\n    return this.pushStack( ret );\n  };\n});\nvar rnotwhite = (/\\S+/g);\n\n\n\n// String to Object options format cache\nvar optionsCache = {};\n\n// Convert String-formatted options into Object-formatted ones and store in cache\nfunction createOptions( options ) {\n  var object = optionsCache[ options ] = {};\n  jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {\n    object[ flag ] = true;\n  });\n  return object;\n}\n\n/*\n * Create a callback list using the following parameters:\n *\n *  options: an optional list of space-separated options that will change how\n *      the callback list behaves or a more traditional option object\n *\n * By default a callback list will act like an event callback list and can be\n * \"fired\" multiple times.\n *\n * Possible options:\n *\n *  once:     will ensure the callback list can only be fired once (like a Deferred)\n *\n *  memory:     will keep track of previous values and will call any callback added\n *          after the list has been fired right away with the latest \"memorized\"\n *          values (like a Deferred)\n *\n *  unique:     will ensure a callback can only be added once (no duplicate in the list)\n *\n *  stopOnFalse:  interrupt callings when a callback returns false\n *\n */\njQuery.Callbacks = function( options ) {\n\n  // Convert options from String-formatted to Object-formatted if needed\n  // (we check in cache first)\n  options = typeof options === \"string\" ?\n    ( optionsCache[ options ] || createOptions( options ) ) :\n    jQuery.extend( {}, options );\n\n  var // Flag to know if list is currently firing\n    firing,\n    // Last fire value (for non-forgettable lists)\n    memory,\n    // Flag to know if list was already fired\n    fired,\n    // End of the loop when firing\n    firingLength,\n    // Index of currently firing callback (modified by remove if needed)\n    firingIndex,\n    // First callback to fire (used internally by add and fireWith)\n    firingStart,\n    // Actual callback list\n    list = [],\n    // Stack of fire calls for repeatable lists\n    stack = !options.once && [],\n    // Fire callbacks\n    fire = function( data ) {\n      memory = options.memory && data;\n      fired = true;\n      firingIndex = firingStart || 0;\n      firingStart = 0;\n      firingLength = list.length;\n      firing = true;\n      for ( ; list && firingIndex < firingLength; firingIndex++ ) {\n        if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {\n          memory = false; // To prevent further calls using add\n          break;\n        }\n      }\n      firing = false;\n      if ( list ) {\n        if ( stack ) {\n          if ( stack.length ) {\n            fire( stack.shift() );\n          }\n        } else if ( memory ) {\n          list = [];\n        } else {\n          self.disable();\n        }\n      }\n    },\n    // Actual Callbacks object\n    self = {\n      // Add a callback or a collection of callbacks to the list\n      add: function() {\n        if ( list ) {\n          // First, we save the current length\n          var start = list.length;\n          (function add( args ) {\n            jQuery.each( args, function( _, arg ) {\n              var type = jQuery.type( arg );\n              if ( type === \"function\" ) {\n                if ( !options.unique || !self.has( arg ) ) {\n                  list.push( arg );\n                }\n              } else if ( arg && arg.length && type !== \"string\" ) {\n                // Inspect recursively\n                add( arg );\n              }\n            });\n          })( arguments );\n          // Do we need to add the callbacks to the\n          // current firing batch?\n          if ( firing ) {\n            firingLength = list.length;\n          // With memory, if we're not firing then\n          // we should call right away\n          } else if ( memory ) {\n            firingStart = start;\n            fire( memory );\n          }\n        }\n        return this;\n      },\n      // Remove a callback from the list\n      remove: function() {\n        if ( list ) {\n          jQuery.each( arguments, function( _, arg ) {\n            var index;\n            while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {\n              list.splice( index, 1 );\n              // Handle firing indexes\n              if ( firing ) {\n                if ( index <= firingLength ) {\n                  firingLength--;\n                }\n                if ( index <= firingIndex ) {\n                  firingIndex--;\n                }\n              }\n            }\n          });\n        }\n        return this;\n      },\n      // Check if a given callback is in the list.\n      // If no argument is given, return whether or not list has callbacks attached.\n      has: function( fn ) {\n        return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );\n      },\n      // Remove all callbacks from the list\n      empty: function() {\n        list = [];\n        firingLength = 0;\n        return this;\n      },\n      // Have the list do nothing anymore\n      disable: function() {\n        list = stack = memory = undefined;\n        return this;\n      },\n      // Is it disabled?\n      disabled: function() {\n        return !list;\n      },\n      // Lock the list in its current state\n      lock: function() {\n        stack = undefined;\n        if ( !memory ) {\n          self.disable();\n        }\n        return this;\n      },\n      // Is it locked?\n      locked: function() {\n        return !stack;\n      },\n      // Call all callbacks with the given context and arguments\n      fireWith: function( context, args ) {\n        if ( list && ( !fired || stack ) ) {\n          args = args || [];\n          args = [ context, args.slice ? args.slice() : args ];\n          if ( firing ) {\n            stack.push( args );\n          } else {\n            fire( args );\n          }\n        }\n        return this;\n      },\n      // Call all the callbacks with the given arguments\n      fire: function() {\n        self.fireWith( this, arguments );\n        return this;\n      },\n      // To know if the callbacks have already been called at least once\n      fired: function() {\n        return !!fired;\n      }\n    };\n\n  return self;\n};\n\n\njQuery.extend({\n\n  Deferred: function( func ) {\n    var tuples = [\n        // action, add listener, listener list, final state\n        [ \"resolve\", \"done\", jQuery.Callbacks(\"once memory\"), \"resolved\" ],\n        [ \"reject\", \"fail\", jQuery.Callbacks(\"once memory\"), \"rejected\" ],\n        [ \"notify\", \"progress\", jQuery.Callbacks(\"memory\") ]\n      ],\n      state = \"pending\",\n      promise = {\n        state: function() {\n          return state;\n        },\n        always: function() {\n          deferred.done( arguments ).fail( arguments );\n          return this;\n        },\n        then: function( /* fnDone, fnFail, fnProgress */ ) {\n          var fns = arguments;\n          return jQuery.Deferred(function( newDefer ) {\n            jQuery.each( tuples, function( i, tuple ) {\n              var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];\n              // deferred[ done | fail | progress ] for forwarding actions to newDefer\n              deferred[ tuple[1] ](function() {\n                var returned = fn && fn.apply( this, arguments );\n                if ( returned && jQuery.isFunction( returned.promise ) ) {\n                  returned.promise()\n                    .done( newDefer.resolve )\n                    .fail( newDefer.reject )\n                    .progress( newDefer.notify );\n                } else {\n                  newDefer[ tuple[ 0 ] + \"With\" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );\n                }\n              });\n            });\n            fns = null;\n          }).promise();\n        },\n        // Get a promise for this deferred\n        // If obj is provided, the promise aspect is added to the object\n        promise: function( obj ) {\n          return obj != null ? jQuery.extend( obj, promise ) : promise;\n        }\n      },\n      deferred = {};\n\n    // Keep pipe for back-compat\n    promise.pipe = promise.then;\n\n    // Add list-specific methods\n    jQuery.each( tuples, function( i, tuple ) {\n      var list = tuple[ 2 ],\n        stateString = tuple[ 3 ];\n\n      // promise[ done | fail | progress ] = list.add\n      promise[ tuple[1] ] = list.add;\n\n      // Handle state\n      if ( stateString ) {\n        list.add(function() {\n          // state = [ resolved | rejected ]\n          state = stateString;\n\n        // [ reject_list | resolve_list ].disable; progress_list.lock\n        }, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );\n      }\n\n      // deferred[ resolve | reject | notify ]\n      deferred[ tuple[0] ] = function() {\n        deferred[ tuple[0] + \"With\" ]( this === deferred ? promise : this, arguments );\n        return this;\n      };\n      deferred[ tuple[0] + \"With\" ] = list.fireWith;\n    });\n\n    // Make the deferred a promise\n    promise.promise( deferred );\n\n    // Call given func if any\n    if ( func ) {\n      func.call( deferred, deferred );\n    }\n\n    // All done!\n    return deferred;\n  },\n\n  // Deferred helper\n  when: function( subordinate /* , ..., subordinateN */ ) {\n    var i = 0,\n      resolveValues = slice.call( arguments ),\n      length = resolveValues.length,\n\n      // the count of uncompleted subordinates\n      remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,\n\n      // the master Deferred. If resolveValues consist of only a single Deferred, just use that.\n      deferred = remaining === 1 ? subordinate : jQuery.Deferred(),\n\n      // Update function for both resolve and progress values\n      updateFunc = function( i, contexts, values ) {\n        return function( value ) {\n          contexts[ i ] = this;\n          values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;\n          if ( values === progressValues ) {\n            deferred.notifyWith( contexts, values );\n\n          } else if ( !(--remaining) ) {\n            deferred.resolveWith( contexts, values );\n          }\n        };\n      },\n\n      progressValues, progressContexts, resolveContexts;\n\n    // add listeners to Deferred subordinates; treat others as resolved\n    if ( length > 1 ) {\n      progressValues = new Array( length );\n      progressContexts = new Array( length );\n      resolveContexts = new Array( length );\n      for ( ; i < length; i++ ) {\n        if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {\n          resolveValues[ i ].promise()\n            .done( updateFunc( i, resolveContexts, resolveValues ) )\n            .fail( deferred.reject )\n            .progress( updateFunc( i, progressContexts, progressValues ) );\n        } else {\n          --remaining;\n        }\n      }\n    }\n\n    // if we're not waiting on anything, resolve the master\n    if ( !remaining ) {\n      deferred.resolveWith( resolveContexts, resolveValues );\n    }\n\n    return deferred.promise();\n  }\n});\n\n\n// The deferred used on DOM ready\nvar readyList;\n\njQuery.fn.ready = function( fn ) {\n  // Add the callback\n  jQuery.ready.promise().done( fn );\n\n  return this;\n};\n\njQuery.extend({\n  // Is the DOM ready to be used? Set to true once it occurs.\n  isReady: false,\n\n  // A counter to track how many items to wait for before\n  // the ready event fires. See #6781\n  readyWait: 1,\n\n  // Hold (or release) the ready event\n  holdReady: function( hold ) {\n    if ( hold ) {\n      jQuery.readyWait++;\n    } else {\n      jQuery.ready( true );\n    }\n  },\n\n  // Handle when the DOM is ready\n  ready: function( wait ) {\n\n    // Abort if there are pending holds or we're already ready\n    if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {\n      return;\n    }\n\n    // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).\n    if ( !document.body ) {\n      return setTimeout( jQuery.ready );\n    }\n\n    // Remember that the DOM is ready\n    jQuery.isReady = true;\n\n    // If a normal DOM Ready event fired, decrement, and wait if need be\n    if ( wait !== true && --jQuery.readyWait > 0 ) {\n      return;\n    }\n\n    // If there are functions bound, to execute\n    readyList.resolveWith( document, [ jQuery ] );\n\n    // Trigger any bound ready events\n    if ( jQuery.fn.triggerHandler ) {\n      jQuery( document ).triggerHandler( \"ready\" );\n      jQuery( document ).off( \"ready\" );\n    }\n  }\n});\n\n/**\n * Clean-up method for dom ready events\n */\nfunction detach() {\n  if ( document.addEventListener ) {\n    document.removeEventListener( \"DOMContentLoaded\", completed, false );\n    window.removeEventListener( \"load\", completed, false );\n\n  } else {\n    document.detachEvent( \"onreadystatechange\", completed );\n    window.detachEvent( \"onload\", completed );\n  }\n}\n\n/**\n * The ready event handler and self cleanup method\n */\nfunction completed() {\n  // readyState === \"complete\" is good enough for us to call the dom ready in oldIE\n  if ( document.addEventListener || event.type === \"load\" || document.readyState === \"complete\" ) {\n    detach();\n    jQuery.ready();\n  }\n}\n\njQuery.ready.promise = function( obj ) {\n  if ( !readyList ) {\n\n    readyList = jQuery.Deferred();\n\n    // Catch cases where $(document).ready() is called after the browser event has already occurred.\n    // we once tried to use readyState \"interactive\" here, but it caused issues like the one\n    // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15\n    if ( document.readyState === \"complete\" ) {\n      // Handle it asynchronously to allow scripts the opportunity to delay ready\n      setTimeout( jQuery.ready );\n\n    // Standards-based browsers support DOMContentLoaded\n    } else if ( document.addEventListener ) {\n      // Use the handy event callback\n      document.addEventListener( \"DOMContentLoaded\", completed, false );\n\n      // A fallback to window.onload, that will always work\n      window.addEventListener( \"load\", completed, false );\n\n    // If IE event model is used\n    } else {\n      // Ensure firing before onload, maybe late but safe also for iframes\n      document.attachEvent( \"onreadystatechange\", completed );\n\n      // A fallback to window.onload, that will always work\n      window.attachEvent( \"onload\", completed );\n\n      // If IE and not a frame\n      // continually check to see if the document is ready\n      var top = false;\n\n      try {\n        top = window.frameElement == null && document.documentElement;\n      } catch(e) {}\n\n      if ( top && top.doScroll ) {\n        (function doScrollCheck() {\n          if ( !jQuery.isReady ) {\n\n            try {\n              // Use the trick by Diego Perini\n              // http://javascript.nwbox.com/IEContentLoaded/\n              top.doScroll(\"left\");\n            } catch(e) {\n              return setTimeout( doScrollCheck, 50 );\n            }\n\n            // detach all dom ready events\n            detach();\n\n            // and execute any waiting functions\n            jQuery.ready();\n          }\n        })();\n      }\n    }\n  }\n  return readyList.promise( obj );\n};\n\n\nvar strundefined = typeof undefined;\n\n\n\n// Support: IE<9\n// Iteration over object's inherited properties before its own\nvar i;\nfor ( i in jQuery( support ) ) {\n  break;\n}\nsupport.ownLast = i !== \"0\";\n\n// Note: most support tests are defined in their respective modules.\n// false until the test is run\nsupport.inlineBlockNeedsLayout = false;\n\n// Execute ASAP in case we need to set body.style.zoom\njQuery(function() {\n  // Minified: var a,b,c,d\n  var val, div, body, container;\n\n  body = document.getElementsByTagName( \"body\" )[ 0 ];\n  if ( !body || !body.style ) {\n    // Return for frameset docs that don't have a body\n    return;\n  }\n\n  // Setup\n  div = document.createElement( \"div\" );\n  container = document.createElement( \"div\" );\n  container.style.cssText = \"position:absolute;border:0;width:0;height:0;top:0;left:-9999px\";\n  body.appendChild( container ).appendChild( div );\n\n  if ( typeof div.style.zoom !== strundefined ) {\n    // Support: IE<8\n    // Check if natively block-level elements act like inline-block\n    // elements when setting their display to 'inline' and giving\n    // them layout\n    div.style.cssText = \"display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1\";\n\n    support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;\n    if ( val ) {\n      // Prevent IE 6 from affecting layout for positioned elements #11048\n      // Prevent IE from shrinking the body in IE 7 mode #12869\n      // Support: IE<8\n      body.style.zoom = 1;\n    }\n  }\n\n  body.removeChild( container );\n});\n\n\n\n\n(function() {\n  var div = document.createElement( \"div\" );\n\n  // Execute the test only if not already executed in another module.\n  if (support.deleteExpando == null) {\n    // Support: IE<9\n    support.deleteExpando = true;\n    try {\n      delete div.test;\n    } catch( e ) {\n      support.deleteExpando = false;\n    }\n  }\n\n  // Null elements to avoid leaks in IE.\n  div = null;\n})();\n\n\n/**\n * Determines whether an object can have data\n */\njQuery.acceptData = function( elem ) {\n  var noData = jQuery.noData[ (elem.nodeName + \" \").toLowerCase() ],\n    nodeType = +elem.nodeType || 1;\n\n  // Do not set data on non-element DOM nodes because it will not be cleared (#8335).\n  return nodeType !== 1 && nodeType !== 9 ?\n    false :\n\n    // Nodes accept data unless otherwise specified; rejection can be conditional\n    !noData || noData !== true && elem.getAttribute(\"classid\") === noData;\n};\n\n\nvar rbrace = /^(?:\\{[\\w\\W]*\\}|\\[[\\w\\W]*\\])$/,\n  rmultiDash = /([A-Z])/g;\n\nfunction dataAttr( elem, key, data ) {\n  // If nothing was found internally, try to fetch any\n  // data from the HTML5 data-* attribute\n  if ( data === undefined && elem.nodeType === 1 ) {\n\n    var name = \"data-\" + key.replace( rmultiDash, \"-$1\" ).toLowerCase();\n\n    data = elem.getAttribute( name );\n\n    if ( typeof data === \"string\" ) {\n      try {\n        data = data === \"true\" ? true :\n          data === \"false\" ? false :\n          data === \"null\" ? null :\n          // Only convert to a number if it doesn't change the string\n          +data + \"\" === data ? +data :\n          rbrace.test( data ) ? jQuery.parseJSON( data ) :\n          data;\n      } catch( e ) {}\n\n      // Make sure we set the data so it isn't changed later\n      jQuery.data( elem, key, data );\n\n    } else {\n      data = undefined;\n    }\n  }\n\n  return data;\n}\n\n// checks a cache object for emptiness\nfunction isEmptyDataObject( obj ) {\n  var name;\n  for ( name in obj ) {\n\n    // if the public data object is empty, the private is still empty\n    if ( name === \"data\" && jQuery.isEmptyObject( obj[name] ) ) {\n      continue;\n    }\n    if ( name !== \"toJSON\" ) {\n      return false;\n    }\n  }\n\n  return true;\n}\n\nfunction internalData( elem, name, data, pvt /* Internal Use Only */ ) {\n  if ( !jQuery.acceptData( elem ) ) {\n    return;\n  }\n\n  var ret, thisCache,\n    internalKey = jQuery.expando,\n\n    // We have to handle DOM nodes and JS objects differently because IE6-7\n    // can't GC object references properly across the DOM-JS boundary\n    isNode = elem.nodeType,\n\n    // Only DOM nodes need the global jQuery cache; JS object data is\n    // attached directly to the object so GC can occur automatically\n    cache = isNode ? jQuery.cache : elem,\n\n    // Only defining an ID for JS objects if its cache already exists allows\n    // the code to shortcut on the same path as a DOM node with no cache\n    id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;\n\n  // Avoid doing any more work than we need to when trying to get data on an\n  // object that has no data at all\n  if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === \"string\" ) {\n    return;\n  }\n\n  if ( !id ) {\n    // Only DOM nodes need a new unique ID for each element since their data\n    // ends up in the global cache\n    if ( isNode ) {\n      id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;\n    } else {\n      id = internalKey;\n    }\n  }\n\n  if ( !cache[ id ] ) {\n    // Avoid exposing jQuery metadata on plain JS objects when the object\n    // is serialized using JSON.stringify\n    cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };\n  }\n\n  // An object can be passed to jQuery.data instead of a key/value pair; this gets\n  // shallow copied over onto the existing cache\n  if ( typeof name === \"object\" || typeof name === \"function\" ) {\n    if ( pvt ) {\n      cache[ id ] = jQuery.extend( cache[ id ], name );\n    } else {\n      cache[ id ].data = jQuery.extend( cache[ id ].data, name );\n    }\n  }\n\n  thisCache = cache[ id ];\n\n  // jQuery data() is stored in a separate object inside the object's internal data\n  // cache in order to avoid key collisions between internal data and user-defined\n  // data.\n  if ( !pvt ) {\n    if ( !thisCache.data ) {\n      thisCache.data = {};\n    }\n\n    thisCache = thisCache.data;\n  }\n\n  if ( data !== undefined ) {\n    thisCache[ jQuery.camelCase( name ) ] = data;\n  }\n\n  // Check for both converted-to-camel and non-converted data property names\n  // If a data property was specified\n  if ( typeof name === \"string\" ) {\n\n    // First Try to find as-is property data\n    ret = thisCache[ name ];\n\n    // Test for null|undefined property data\n    if ( ret == null ) {\n\n      // Try to find the camelCased property\n      ret = thisCache[ jQuery.camelCase( name ) ];\n    }\n  } else {\n    ret = thisCache;\n  }\n\n  return ret;\n}\n\nfunction internalRemoveData( elem, name, pvt ) {\n  if ( !jQuery.acceptData( elem ) ) {\n    return;\n  }\n\n  var thisCache, i,\n    isNode = elem.nodeType,\n\n    // See jQuery.data for more information\n    cache = isNode ? jQuery.cache : elem,\n    id = isNode ? elem[ jQuery.expando ] : jQuery.expando;\n\n  // If there is already no cache entry for this object, there is no\n  // purpose in continuing\n  if ( !cache[ id ] ) {\n    return;\n  }\n\n  if ( name ) {\n\n    thisCache = pvt ? cache[ id ] : cache[ id ].data;\n\n    if ( thisCache ) {\n\n      // Support array or space separated string names for data keys\n      if ( !jQuery.isArray( name ) ) {\n\n        // try the string as a key before any manipulation\n        if ( name in thisCache ) {\n          name = [ name ];\n        } else {\n\n          // split the camel cased version by spaces unless a key with the spaces exists\n          name = jQuery.camelCase( name );\n          if ( name in thisCache ) {\n            name = [ name ];\n          } else {\n            name = name.split(\" \");\n          }\n        }\n      } else {\n        // If \"name\" is an array of keys...\n        // When data is initially created, via (\"key\", \"val\") signature,\n        // keys will be converted to camelCase.\n        // Since there is no way to tell _how_ a key was added, remove\n        // both plain key and camelCase key. #12786\n        // This will only penalize the array argument path.\n        name = name.concat( jQuery.map( name, jQuery.camelCase ) );\n      }\n\n      i = name.length;\n      while ( i-- ) {\n        delete thisCache[ name[i] ];\n      }\n\n      // If there is no data left in the cache, we want to continue\n      // and let the cache object itself get destroyed\n      if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {\n        return;\n      }\n    }\n  }\n\n  // See jQuery.data for more information\n  if ( !pvt ) {\n    delete cache[ id ].data;\n\n    // Don't destroy the parent cache unless the internal data object\n    // had been the only thing left in it\n    if ( !isEmptyDataObject( cache[ id ] ) ) {\n      return;\n    }\n  }\n\n  // Destroy the cache\n  if ( isNode ) {\n    jQuery.cleanData( [ elem ], true );\n\n  // Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)\n  /* jshint eqeqeq: false */\n  } else if ( support.deleteExpando || cache != cache.window ) {\n    /* jshint eqeqeq: true */\n    delete cache[ id ];\n\n  // When all else fails, null\n  } else {\n    cache[ id ] = null;\n  }\n}\n\njQuery.extend({\n  cache: {},\n\n  // The following elements (space-suffixed to avoid Object.prototype collisions)\n  // throw uncatchable exceptions if you attempt to set expando properties\n  noData: {\n    \"applet \": true,\n    \"embed \": true,\n    // ...but Flash objects (which have this classid) *can* handle expandos\n    \"object \": \"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\"\n  },\n\n  hasData: function( elem ) {\n    elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];\n    return !!elem && !isEmptyDataObject( elem );\n  },\n\n  data: function( elem, name, data ) {\n    return internalData( elem, name, data );\n  },\n\n  removeData: function( elem, name ) {\n    return internalRemoveData( elem, name );\n  },\n\n  // For internal use only.\n  _data: function( elem, name, data ) {\n    return internalData( elem, name, data, true );\n  },\n\n  _removeData: function( elem, name ) {\n    return internalRemoveData( elem, name, true );\n  }\n});\n\njQuery.fn.extend({\n  data: function( key, value ) {\n    var i, name, data,\n      elem = this[0],\n      attrs = elem && elem.attributes;\n\n    // Special expections of .data basically thwart jQuery.access,\n    // so implement the relevant behavior ourselves\n\n    // Gets all values\n    if ( key === undefined ) {\n      if ( this.length ) {\n        data = jQuery.data( elem );\n\n        if ( elem.nodeType === 1 && !jQuery._data( elem, \"parsedAttrs\" ) ) {\n          i = attrs.length;\n          while ( i-- ) {\n\n            // Support: IE11+\n            // The attrs elements can be null (#14894)\n            if ( attrs[ i ] ) {\n              name = attrs[ i ].name;\n              if ( name.indexOf( \"data-\" ) === 0 ) {\n                name = jQuery.camelCase( name.slice(5) );\n                dataAttr( elem, name, data[ name ] );\n              }\n            }\n          }\n          jQuery._data( elem, \"parsedAttrs\", true );\n        }\n      }\n\n      return data;\n    }\n\n    // Sets multiple values\n    if ( typeof key === \"object\" ) {\n      return this.each(function() {\n        jQuery.data( this, key );\n      });\n    }\n\n    return arguments.length > 1 ?\n\n      // Sets one value\n      this.each(function() {\n        jQuery.data( this, key, value );\n      }) :\n\n      // Gets one value\n      // Try to fetch any internally stored data first\n      elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;\n  },\n\n  removeData: function( key ) {\n    return this.each(function() {\n      jQuery.removeData( this, key );\n    });\n  }\n});\n\n\njQuery.extend({\n  queue: function( elem, type, data ) {\n    var queue;\n\n    if ( elem ) {\n      type = ( type || \"fx\" ) + \"queue\";\n      queue = jQuery._data( elem, type );\n\n      // Speed up dequeue by getting out quickly if this is just a lookup\n      if ( data ) {\n        if ( !queue || jQuery.isArray(data) ) {\n          queue = jQuery._data( elem, type, jQuery.makeArray(data) );\n        } else {\n          queue.push( data );\n        }\n      }\n      return queue || [];\n    }\n  },\n\n  dequeue: function( elem, type ) {\n    type = type || \"fx\";\n\n    var queue = jQuery.queue( elem, type ),\n      startLength = queue.length,\n      fn = queue.shift(),\n      hooks = jQuery._queueHooks( elem, type ),\n      next = function() {\n        jQuery.dequeue( elem, type );\n      };\n\n    // If the fx queue is dequeued, always remove the progress sentinel\n    if ( fn === \"inprogress\" ) {\n      fn = queue.shift();\n      startLength--;\n    }\n\n    if ( fn ) {\n\n      // Add a progress sentinel to prevent the fx queue from being\n      // automatically dequeued\n      if ( type === \"fx\" ) {\n        queue.unshift( \"inprogress\" );\n      }\n\n      // clear up the last queue stop function\n      delete hooks.stop;\n      fn.call( elem, next, hooks );\n    }\n\n    if ( !startLength && hooks ) {\n      hooks.empty.fire();\n    }\n  },\n\n  // not intended for public consumption - generates a queueHooks object, or returns the current one\n  _queueHooks: function( elem, type ) {\n    var key = type + \"queueHooks\";\n    return jQuery._data( elem, key ) || jQuery._data( elem, key, {\n      empty: jQuery.Callbacks(\"once memory\").add(function() {\n        jQuery._removeData( elem, type + \"queue\" );\n        jQuery._removeData( elem, key );\n      })\n    });\n  }\n});\n\njQuery.fn.extend({\n  queue: function( type, data ) {\n    var setter = 2;\n\n    if ( typeof type !== \"string\" ) {\n      data = type;\n      type = \"fx\";\n      setter--;\n    }\n\n    if ( arguments.length < setter ) {\n      return jQuery.queue( this[0], type );\n    }\n\n    return data === undefined ?\n      this :\n      this.each(function() {\n        var queue = jQuery.queue( this, type, data );\n\n        // ensure a hooks for this queue\n        jQuery._queueHooks( this, type );\n\n        if ( type === \"fx\" && queue[0] !== \"inprogress\" ) {\n          jQuery.dequeue( this, type );\n        }\n      });\n  },\n  dequeue: function( type ) {\n    return this.each(function() {\n      jQuery.dequeue( this, type );\n    });\n  },\n  clearQueue: function( type ) {\n    return this.queue( type || \"fx\", [] );\n  },\n  // Get a promise resolved when queues of a certain type\n  // are emptied (fx is the type by default)\n  promise: function( type, obj ) {\n    var tmp,\n      count = 1,\n      defer = jQuery.Deferred(),\n      elements = this,\n      i = this.length,\n      resolve = function() {\n        if ( !( --count ) ) {\n          defer.resolveWith( elements, [ elements ] );\n        }\n      };\n\n    if ( typeof type !== \"string\" ) {\n      obj = type;\n      type = undefined;\n    }\n    type = type || \"fx\";\n\n    while ( i-- ) {\n      tmp = jQuery._data( elements[ i ], type + \"queueHooks\" );\n      if ( tmp && tmp.empty ) {\n        count++;\n        tmp.empty.add( resolve );\n      }\n    }\n    resolve();\n    return defer.promise( obj );\n  }\n});\nvar pnum = (/[+-]?(?:\\d*\\.|)\\d+(?:[eE][+-]?\\d+|)/).source;\n\nvar cssExpand = [ \"Top\", \"Right\", \"Bottom\", \"Left\" ];\n\nvar isHidden = function( elem, el ) {\n    // isHidden might be called from jQuery#filter function;\n    // in that case, element will be second argument\n    elem = el || elem;\n    return jQuery.css( elem, \"display\" ) === \"none\" || !jQuery.contains( elem.ownerDocument, elem );\n  };\n\n\n\n// Multifunctional method to get and set values of a collection\n// The value/s can optionally be executed if it's a function\nvar access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {\n  var i = 0,\n    length = elems.length,\n    bulk = key == null;\n\n  // Sets many values\n  if ( jQuery.type( key ) === \"object\" ) {\n    chainable = true;\n    for ( i in key ) {\n      jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );\n    }\n\n  // Sets one value\n  } else if ( value !== undefined ) {\n    chainable = true;\n\n    if ( !jQuery.isFunction( value ) ) {\n      raw = true;\n    }\n\n    if ( bulk ) {\n      // Bulk operations run against the entire set\n      if ( raw ) {\n        fn.call( elems, value );\n        fn = null;\n\n      // ...except when executing function values\n      } else {\n        bulk = fn;\n        fn = function( elem, key, value ) {\n          return bulk.call( jQuery( elem ), value );\n        };\n      }\n    }\n\n    if ( fn ) {\n      for ( ; i < length; i++ ) {\n        fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );\n      }\n    }\n  }\n\n  return chainable ?\n    elems :\n\n    // Gets\n    bulk ?\n      fn.call( elems ) :\n      length ? fn( elems[0], key ) : emptyGet;\n};\nvar rcheckableType = (/^(?:checkbox|radio)$/i);\n\n\n\n(function() {\n  // Minified: var a,b,c\n  var input = document.createElement( \"input\" ),\n    div = document.createElement( \"div\" ),\n    fragment = document.createDocumentFragment();\n\n  // Setup\n  div.innerHTML = \"  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>\";\n\n  // IE strips leading whitespace when .innerHTML is used\n  support.leadingWhitespace = div.firstChild.nodeType === 3;\n\n  // Make sure that tbody elements aren't automatically inserted\n  // IE will insert them into empty tables\n  support.tbody = !div.getElementsByTagName( \"tbody\" ).length;\n\n  // Make sure that link elements get serialized correctly by innerHTML\n  // This requires a wrapper element in IE\n  support.htmlSerialize = !!div.getElementsByTagName( \"link\" ).length;\n\n  // Makes sure cloning an html5 element does not cause problems\n  // Where outerHTML is undefined, this still works\n  support.html5Clone =\n    document.createElement( \"nav\" ).cloneNode( true ).outerHTML !== \"<:nav></:nav>\";\n\n  // Check if a disconnected checkbox will retain its checked\n  // value of true after appended to the DOM (IE6/7)\n  input.type = \"checkbox\";\n  input.checked = true;\n  fragment.appendChild( input );\n  support.appendChecked = input.checked;\n\n  // Make sure textarea (and checkbox) defaultValue is properly cloned\n  // Support: IE6-IE11+\n  div.innerHTML = \"<textarea>x</textarea>\";\n  support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;\n\n  // #11217 - WebKit loses check when the name is after the checked attribute\n  fragment.appendChild( div );\n  div.innerHTML = \"<input type='radio' checked='checked' name='t'/>\";\n\n  // Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3\n  // old WebKit doesn't clone checked state correctly in fragments\n  support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;\n\n  // Support: IE<9\n  // Opera does not clone events (and typeof div.attachEvent === undefined).\n  // IE9-10 clones events bound via attachEvent, but they don't trigger with .click()\n  support.noCloneEvent = true;\n  if ( div.attachEvent ) {\n    div.attachEvent( \"onclick\", function() {\n      support.noCloneEvent = false;\n    });\n\n    div.cloneNode( true ).click();\n  }\n\n  // Execute the test only if not already executed in another module.\n  if (support.deleteExpando == null) {\n    // Support: IE<9\n    support.deleteExpando = true;\n    try {\n      delete div.test;\n    } catch( e ) {\n      support.deleteExpando = false;\n    }\n  }\n})();\n\n\n(function() {\n  var i, eventName,\n    div = document.createElement( \"div\" );\n\n  // Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)\n  for ( i in { submit: true, change: true, focusin: true }) {\n    eventName = \"on\" + i;\n\n    if ( !(support[ i + \"Bubbles\" ] = eventName in window) ) {\n      // Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)\n      div.setAttribute( eventName, \"t\" );\n      support[ i + \"Bubbles\" ] = div.attributes[ eventName ].expando === false;\n    }\n  }\n\n  // Null elements to avoid leaks in IE.\n  div = null;\n})();\n\n\nvar rformElems = /^(?:input|select|textarea)$/i,\n  rkeyEvent = /^key/,\n  rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,\n  rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,\n  rtypenamespace = /^([^.]*)(?:\\.(.+)|)$/;\n\nfunction returnTrue() {\n  return true;\n}\n\nfunction returnFalse() {\n  return false;\n}\n\nfunction safeActiveElement() {\n  try {\n    return document.activeElement;\n  } catch ( err ) { }\n}\n\n/*\n * Helper functions for managing events -- not part of the public interface.\n * Props to Dean Edwards' addEvent library for many of the ideas.\n */\njQuery.event = {\n\n  global: {},\n\n  add: function( elem, types, handler, data, selector ) {\n    var tmp, events, t, handleObjIn,\n      special, eventHandle, handleObj,\n      handlers, type, namespaces, origType,\n      elemData = jQuery._data( elem );\n\n    // Don't attach events to noData or text/comment nodes (but allow plain objects)\n    if ( !elemData ) {\n      return;\n    }\n\n    // Caller can pass in an object of custom data in lieu of the handler\n    if ( handler.handler ) {\n      handleObjIn = handler;\n      handler = handleObjIn.handler;\n      selector = handleObjIn.selector;\n    }\n\n    // Make sure that the handler has a unique ID, used to find/remove it later\n    if ( !handler.guid ) {\n      handler.guid = jQuery.guid++;\n    }\n\n    // Init the element's event structure and main handler, if this is the first\n    if ( !(events = elemData.events) ) {\n      events = elemData.events = {};\n    }\n    if ( !(eventHandle = elemData.handle) ) {\n      eventHandle = elemData.handle = function( e ) {\n        // Discard the second event of a jQuery.event.trigger() and\n        // when an event is called after a page has unloaded\n        return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?\n          jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :\n          undefined;\n      };\n      // Add elem as a property of the handle fn to prevent a memory leak with IE non-native events\n      eventHandle.elem = elem;\n    }\n\n    // Handle multiple events separated by a space\n    types = ( types || \"\" ).match( rnotwhite ) || [ \"\" ];\n    t = types.length;\n    while ( t-- ) {\n      tmp = rtypenamespace.exec( types[t] ) || [];\n      type = origType = tmp[1];\n      namespaces = ( tmp[2] || \"\" ).split( \".\" ).sort();\n\n      // There *must* be a type, no attaching namespace-only handlers\n      if ( !type ) {\n        continue;\n      }\n\n      // If event changes its type, use the special event handlers for the changed type\n      special = jQuery.event.special[ type ] || {};\n\n      // If selector defined, determine special event api type, otherwise given type\n      type = ( selector ? special.delegateType : special.bindType ) || type;\n\n      // Update special based on newly reset type\n      special = jQuery.event.special[ type ] || {};\n\n      // handleObj is passed to all event handlers\n      handleObj = jQuery.extend({\n        type: type,\n        origType: origType,\n        data: data,\n        handler: handler,\n        guid: handler.guid,\n        selector: selector,\n        needsContext: selector && jQuery.expr.match.needsContext.test( selector ),\n        namespace: namespaces.join(\".\")\n      }, handleObjIn );\n\n      // Init the event handler queue if we're the first\n      if ( !(handlers = events[ type ]) ) {\n        handlers = events[ type ] = [];\n        handlers.delegateCount = 0;\n\n        // Only use addEventListener/attachEvent if the special events handler returns false\n        if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {\n          // Bind the global event handler to the element\n          if ( elem.addEventListener ) {\n            elem.addEventListener( type, eventHandle, false );\n\n          } else if ( elem.attachEvent ) {\n            elem.attachEvent( \"on\" + type, eventHandle );\n          }\n        }\n      }\n\n      if ( special.add ) {\n        special.add.call( elem, handleObj );\n\n        if ( !handleObj.handler.guid ) {\n          handleObj.handler.guid = handler.guid;\n        }\n      }\n\n      // Add to the element's handler list, delegates in front\n      if ( selector ) {\n        handlers.splice( handlers.delegateCount++, 0, handleObj );\n      } else {\n        handlers.push( handleObj );\n      }\n\n      // Keep track of which events have ever been used, for event optimization\n      jQuery.event.global[ type ] = true;\n    }\n\n    // Nullify elem to prevent memory leaks in IE\n    elem = null;\n  },\n\n  // Detach an event or set of events from an element\n  remove: function( elem, types, handler, selector, mappedTypes ) {\n    var j, handleObj, tmp,\n      origCount, t, events,\n      special, handlers, type,\n      namespaces, origType,\n      elemData = jQuery.hasData( elem ) && jQuery._data( elem );\n\n    if ( !elemData || !(events = elemData.events) ) {\n      return;\n    }\n\n    // Once for each type.namespace in types; type may be omitted\n    types = ( types || \"\" ).match( rnotwhite ) || [ \"\" ];\n    t = types.length;\n    while ( t-- ) {\n      tmp = rtypenamespace.exec( types[t] ) || [];\n      type = origType = tmp[1];\n      namespaces = ( tmp[2] || \"\" ).split( \".\" ).sort();\n\n      // Unbind all events (on this namespace, if provided) for the element\n      if ( !type ) {\n        for ( type in events ) {\n          jQuery.event.remove( elem, type + types[ t ], handler, selector, true );\n        }\n        continue;\n      }\n\n      special = jQuery.event.special[ type ] || {};\n      type = ( selector ? special.delegateType : special.bindType ) || type;\n      handlers = events[ type ] || [];\n      tmp = tmp[2] && new RegExp( \"(^|\\\\.)\" + namespaces.join(\"\\\\.(?:.*\\\\.|)\") + \"(\\\\.|$)\" );\n\n      // Remove matching events\n      origCount = j = handlers.length;\n      while ( j-- ) {\n        handleObj = handlers[ j ];\n\n        if ( ( mappedTypes || origType === handleObj.origType ) &&\n          ( !handler || handler.guid === handleObj.guid ) &&\n          ( !tmp || tmp.test( handleObj.namespace ) ) &&\n          ( !selector || selector === handleObj.selector || selector === \"**\" && handleObj.selector ) ) {\n          handlers.splice( j, 1 );\n\n          if ( handleObj.selector ) {\n            handlers.delegateCount--;\n          }\n          if ( special.remove ) {\n            special.remove.call( elem, handleObj );\n          }\n        }\n      }\n\n      // Remove generic event handler if we removed something and no more handlers exist\n      // (avoids potential for endless recursion during removal of special event handlers)\n      if ( origCount && !handlers.length ) {\n        if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {\n          jQuery.removeEvent( elem, type, elemData.handle );\n        }\n\n        delete events[ type ];\n      }\n    }\n\n    // Remove the expando if it's no longer used\n    if ( jQuery.isEmptyObject( events ) ) {\n      delete elemData.handle;\n\n      // removeData also checks for emptiness and clears the expando if empty\n      // so use it instead of delete\n      jQuery._removeData( elem, \"events\" );\n    }\n  },\n\n  trigger: function( event, data, elem, onlyHandlers ) {\n    var handle, ontype, cur,\n      bubbleType, special, tmp, i,\n      eventPath = [ elem || document ],\n      type = hasOwn.call( event, \"type\" ) ? event.type : event,\n      namespaces = hasOwn.call( event, \"namespace\" ) ? event.namespace.split(\".\") : [];\n\n    cur = tmp = elem = elem || document;\n\n    // Don't do events on text and comment nodes\n    if ( elem.nodeType === 3 || elem.nodeType === 8 ) {\n      return;\n    }\n\n    // focus/blur morphs to focusin/out; ensure we're not firing them right now\n    if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {\n      return;\n    }\n\n    if ( type.indexOf(\".\") >= 0 ) {\n      // Namespaced trigger; create a regexp to match event type in handle()\n      namespaces = type.split(\".\");\n      type = namespaces.shift();\n      namespaces.sort();\n    }\n    ontype = type.indexOf(\":\") < 0 && \"on\" + type;\n\n    // Caller can pass in a jQuery.Event object, Object, or just an event type string\n    event = event[ jQuery.expando ] ?\n      event :\n      new jQuery.Event( type, typeof event === \"object\" && event );\n\n    // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)\n    event.isTrigger = onlyHandlers ? 2 : 3;\n    event.namespace = namespaces.join(\".\");\n    event.namespace_re = event.namespace ?\n      new RegExp( \"(^|\\\\.)\" + namespaces.join(\"\\\\.(?:.*\\\\.|)\") + \"(\\\\.|$)\" ) :\n      null;\n\n    // Clean up the event in case it is being reused\n    event.result = undefined;\n    if ( !event.target ) {\n      event.target = elem;\n    }\n\n    // Clone any incoming data and prepend the event, creating the handler arg list\n    data = data == null ?\n      [ event ] :\n      jQuery.makeArray( data, [ event ] );\n\n    // Allow special events to draw outside the lines\n    special = jQuery.event.special[ type ] || {};\n    if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {\n      return;\n    }\n\n    // Determine event propagation path in advance, per W3C events spec (#9951)\n    // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)\n    if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {\n\n      bubbleType = special.delegateType || type;\n      if ( !rfocusMorph.test( bubbleType + type ) ) {\n        cur = cur.parentNode;\n      }\n      for ( ; cur; cur = cur.parentNode ) {\n        eventPath.push( cur );\n        tmp = cur;\n      }\n\n      // Only add window if we got to document (e.g., not plain obj or detached DOM)\n      if ( tmp === (elem.ownerDocument || document) ) {\n        eventPath.push( tmp.defaultView || tmp.parentWindow || window );\n      }\n    }\n\n    // Fire handlers on the event path\n    i = 0;\n    while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {\n\n      event.type = i > 1 ?\n        bubbleType :\n        special.bindType || type;\n\n      // jQuery handler\n      handle = ( jQuery._data( cur, \"events\" ) || {} )[ event.type ] && jQuery._data( cur, \"handle\" );\n      if ( handle ) {\n        handle.apply( cur, data );\n      }\n\n      // Native handler\n      handle = ontype && cur[ ontype ];\n      if ( handle && handle.apply && jQuery.acceptData( cur ) ) {\n        event.result = handle.apply( cur, data );\n        if ( event.result === false ) {\n          event.preventDefault();\n        }\n      }\n    }\n    event.type = type;\n\n    // If nobody prevented the default action, do it now\n    if ( !onlyHandlers && !event.isDefaultPrevented() ) {\n\n      if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&\n        jQuery.acceptData( elem ) ) {\n\n        // Call a native DOM method on the target with the same name name as the event.\n        // Can't use an .isFunction() check here because IE6/7 fails that test.\n        // Don't do default actions on window, that's where global variables be (#6170)\n        if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {\n\n          // Don't re-trigger an onFOO event when we call its FOO() method\n          tmp = elem[ ontype ];\n\n          if ( tmp ) {\n            elem[ ontype ] = null;\n          }\n\n          // Prevent re-triggering of the same event, since we already bubbled it above\n          jQuery.event.triggered = type;\n          try {\n            elem[ type ]();\n          } catch ( e ) {\n            // IE<9 dies on focus/blur to hidden element (#1486,#12518)\n            // only reproducible on winXP IE8 native, not IE9 in IE8 mode\n          }\n          jQuery.event.triggered = undefined;\n\n          if ( tmp ) {\n            elem[ ontype ] = tmp;\n          }\n        }\n      }\n    }\n\n    return event.result;\n  },\n\n  dispatch: function( event ) {\n\n    // Make a writable jQuery.Event from the native event object\n    event = jQuery.event.fix( event );\n\n    var i, ret, handleObj, matched, j,\n      handlerQueue = [],\n      args = slice.call( arguments ),\n      handlers = ( jQuery._data( this, \"events\" ) || {} )[ event.type ] || [],\n      special = jQuery.event.special[ event.type ] || {};\n\n    // Use the fix-ed jQuery.Event rather than the (read-only) native event\n    args[0] = event;\n    event.delegateTarget = this;\n\n    // Call the preDispatch hook for the mapped type, and let it bail if desired\n    if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {\n      return;\n    }\n\n    // Determine handlers\n    handlerQueue = jQuery.event.handlers.call( this, event, handlers );\n\n    // Run delegates first; they may want to stop propagation beneath us\n    i = 0;\n    while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {\n      event.currentTarget = matched.elem;\n\n      j = 0;\n      while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {\n\n        // Triggered event must either 1) have no namespace, or\n        // 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).\n        if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {\n\n          event.handleObj = handleObj;\n          event.data = handleObj.data;\n\n          ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )\n              .apply( matched.elem, args );\n\n          if ( ret !== undefined ) {\n            if ( (event.result = ret) === false ) {\n              event.preventDefault();\n              event.stopPropagation();\n            }\n          }\n        }\n      }\n    }\n\n    // Call the postDispatch hook for the mapped type\n    if ( special.postDispatch ) {\n      special.postDispatch.call( this, event );\n    }\n\n    return event.result;\n  },\n\n  handlers: function( event, handlers ) {\n    var sel, handleObj, matches, i,\n      handlerQueue = [],\n      delegateCount = handlers.delegateCount,\n      cur = event.target;\n\n    // Find delegate handlers\n    // Black-hole SVG <use> instance trees (#13180)\n    // Avoid non-left-click bubbling in Firefox (#3861)\n    if ( delegateCount && cur.nodeType && (!event.button || event.type !== \"click\") ) {\n\n      /* jshint eqeqeq: false */\n      for ( ; cur != this; cur = cur.parentNode || this ) {\n        /* jshint eqeqeq: true */\n\n        // Don't check non-elements (#13208)\n        // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)\n        if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== \"click\") ) {\n          matches = [];\n          for ( i = 0; i < delegateCount; i++ ) {\n            handleObj = handlers[ i ];\n\n            // Don't conflict with Object.prototype properties (#13203)\n            sel = handleObj.selector + \" \";\n\n            if ( matches[ sel ] === undefined ) {\n              matches[ sel ] = handleObj.needsContext ?\n                jQuery( sel, this ).index( cur ) >= 0 :\n                jQuery.find( sel, this, null, [ cur ] ).length;\n            }\n            if ( matches[ sel ] ) {\n              matches.push( handleObj );\n            }\n          }\n          if ( matches.length ) {\n            handlerQueue.push({ elem: cur, handlers: matches });\n          }\n        }\n      }\n    }\n\n    // Add the remaining (directly-bound) handlers\n    if ( delegateCount < handlers.length ) {\n      handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });\n    }\n\n    return handlerQueue;\n  },\n\n  fix: function( event ) {\n    if ( event[ jQuery.expando ] ) {\n      return event;\n    }\n\n    // Create a writable copy of the event object and normalize some properties\n    var i, prop, copy,\n      type = event.type,\n      originalEvent = event,\n      fixHook = this.fixHooks[ type ];\n\n    if ( !fixHook ) {\n      this.fixHooks[ type ] = fixHook =\n        rmouseEvent.test( type ) ? this.mouseHooks :\n        rkeyEvent.test( type ) ? this.keyHooks :\n        {};\n    }\n    copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;\n\n    event = new jQuery.Event( originalEvent );\n\n    i = copy.length;\n    while ( i-- ) {\n      prop = copy[ i ];\n      event[ prop ] = originalEvent[ prop ];\n    }\n\n    // Support: IE<9\n    // Fix target property (#1925)\n    if ( !event.target ) {\n      event.target = originalEvent.srcElement || document;\n    }\n\n    // Support: Chrome 23+, Safari?\n    // Target should not be a text node (#504, #13143)\n    if ( event.target.nodeType === 3 ) {\n      event.target = event.target.parentNode;\n    }\n\n    // Support: IE<9\n    // For mouse/key events, metaKey==false if it's undefined (#3368, #11328)\n    event.metaKey = !!event.metaKey;\n\n    return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;\n  },\n\n  // Includes some event props shared by KeyEvent and MouseEvent\n  props: \"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which\".split(\" \"),\n\n  fixHooks: {},\n\n  keyHooks: {\n    props: \"char charCode key keyCode\".split(\" \"),\n    filter: function( event, original ) {\n\n      // Add which for key events\n      if ( event.which == null ) {\n        event.which = original.charCode != null ? original.charCode : original.keyCode;\n      }\n\n      return event;\n    }\n  },\n\n  mouseHooks: {\n    props: \"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement\".split(\" \"),\n    filter: function( event, original ) {\n      var body, eventDoc, doc,\n        button = original.button,\n        fromElement = original.fromElement;\n\n      // Calculate pageX/Y if missing and clientX/Y available\n      if ( event.pageX == null && original.clientX != null ) {\n        eventDoc = event.target.ownerDocument || document;\n        doc = eventDoc.documentElement;\n        body = eventDoc.body;\n\n        event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );\n        event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );\n      }\n\n      // Add relatedTarget, if necessary\n      if ( !event.relatedTarget && fromElement ) {\n        event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;\n      }\n\n      // Add which for click: 1 === left; 2 === middle; 3 === right\n      // Note: button is not normalized, so don't use it\n      if ( !event.which && button !== undefined ) {\n        event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );\n      }\n\n      return event;\n    }\n  },\n\n  special: {\n    load: {\n      // Prevent triggered image.load events from bubbling to window.load\n      noBubble: true\n    },\n    focus: {\n      // Fire native event if possible so blur/focus sequence is correct\n      trigger: function() {\n        if ( this !== safeActiveElement() && this.focus ) {\n          try {\n            this.focus();\n            return false;\n          } catch ( e ) {\n            // Support: IE<9\n            // If we error on focus to hidden element (#1486, #12518),\n            // let .trigger() run the handlers\n          }\n        }\n      },\n      delegateType: \"focusin\"\n    },\n    blur: {\n      trigger: function() {\n        if ( this === safeActiveElement() && this.blur ) {\n          this.blur();\n          return false;\n        }\n      },\n      delegateType: \"focusout\"\n    },\n    click: {\n      // For checkbox, fire native event so checked state will be right\n      trigger: function() {\n        if ( jQuery.nodeName( this, \"input\" ) && this.type === \"checkbox\" && this.click ) {\n          this.click();\n          return false;\n        }\n      },\n\n      // For cross-browser consistency, don't fire native .click() on links\n      _default: function( event ) {\n        return jQuery.nodeName( event.target, \"a\" );\n      }\n    },\n\n    beforeunload: {\n      postDispatch: function( event ) {\n\n        // Support: Firefox 20+\n        // Firefox doesn't alert if the returnValue field is not set.\n        if ( event.result !== undefined && event.originalEvent ) {\n          event.originalEvent.returnValue = event.result;\n        }\n      }\n    }\n  },\n\n  simulate: function( type, elem, event, bubble ) {\n    // Piggyback on a donor event to simulate a different one.\n    // Fake originalEvent to avoid donor's stopPropagation, but if the\n    // simulated event prevents default then we do the same on the donor.\n    var e = jQuery.extend(\n      new jQuery.Event(),\n      event,\n      {\n        type: type,\n        isSimulated: true,\n        originalEvent: {}\n      }\n    );\n    if ( bubble ) {\n      jQuery.event.trigger( e, null, elem );\n    } else {\n      jQuery.event.dispatch.call( elem, e );\n    }\n    if ( e.isDefaultPrevented() ) {\n      event.preventDefault();\n    }\n  }\n};\n\njQuery.removeEvent = document.removeEventListener ?\n  function( elem, type, handle ) {\n    if ( elem.removeEventListener ) {\n      elem.removeEventListener( type, handle, false );\n    }\n  } :\n  function( elem, type, handle ) {\n    var name = \"on\" + type;\n\n    if ( elem.detachEvent ) {\n\n      // #8545, #7054, preventing memory leaks for custom events in IE6-8\n      // detachEvent needed property on element, by name of that event, to properly expose it to GC\n      if ( typeof elem[ name ] === strundefined ) {\n        elem[ name ] = null;\n      }\n\n      elem.detachEvent( name, handle );\n    }\n  };\n\njQuery.Event = function( src, props ) {\n  // Allow instantiation without the 'new' keyword\n  if ( !(this instanceof jQuery.Event) ) {\n    return new jQuery.Event( src, props );\n  }\n\n  // Event object\n  if ( src && src.type ) {\n    this.originalEvent = src;\n    this.type = src.type;\n\n    // Events bubbling up the document may have been marked as prevented\n    // by a handler lower down the tree; reflect the correct value.\n    this.isDefaultPrevented = src.defaultPrevented ||\n        src.defaultPrevented === undefined &&\n        // Support: IE < 9, Android < 4.0\n        src.returnValue === false ?\n      returnTrue :\n      returnFalse;\n\n  // Event type\n  } else {\n    this.type = src;\n  }\n\n  // Put explicitly provided properties onto the event object\n  if ( props ) {\n    jQuery.extend( this, props );\n  }\n\n  // Create a timestamp if incoming event doesn't have one\n  this.timeStamp = src && src.timeStamp || jQuery.now();\n\n  // Mark it as fixed\n  this[ jQuery.expando ] = true;\n};\n\n// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding\n// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html\njQuery.Event.prototype = {\n  isDefaultPrevented: returnFalse,\n  isPropagationStopped: returnFalse,\n  isImmediatePropagationStopped: returnFalse,\n\n  preventDefault: function() {\n    var e = this.originalEvent;\n\n    this.isDefaultPrevented = returnTrue;\n    if ( !e ) {\n      return;\n    }\n\n    // If preventDefault exists, run it on the original event\n    if ( e.preventDefault ) {\n      e.preventDefault();\n\n    // Support: IE\n    // Otherwise set the returnValue property of the original event to false\n    } else {\n      e.returnValue = false;\n    }\n  },\n  stopPropagation: function() {\n    var e = this.originalEvent;\n\n    this.isPropagationStopped = returnTrue;\n    if ( !e ) {\n      return;\n    }\n    // If stopPropagation exists, run it on the original event\n    if ( e.stopPropagation ) {\n      e.stopPropagation();\n    }\n\n    // Support: IE\n    // Set the cancelBubble property of the original event to true\n    e.cancelBubble = true;\n  },\n  stopImmediatePropagation: function() {\n    var e = this.originalEvent;\n\n    this.isImmediatePropagationStopped = returnTrue;\n\n    if ( e && e.stopImmediatePropagation ) {\n      e.stopImmediatePropagation();\n    }\n\n    this.stopPropagation();\n  }\n};\n\n// Create mouseenter/leave events using mouseover/out and event-time checks\njQuery.each({\n  mouseenter: \"mouseover\",\n  mouseleave: \"mouseout\",\n  pointerenter: \"pointerover\",\n  pointerleave: \"pointerout\"\n}, function( orig, fix ) {\n  jQuery.event.special[ orig ] = {\n    delegateType: fix,\n    bindType: fix,\n\n    handle: function( event ) {\n      var ret,\n        target = this,\n        related = event.relatedTarget,\n        handleObj = event.handleObj;\n\n      // For mousenter/leave call the handler if related is outside the target.\n      // NB: No relatedTarget if the mouse left/entered the browser window\n      if ( !related || (related !== target && !jQuery.contains( target, related )) ) {\n        event.type = handleObj.origType;\n        ret = handleObj.handler.apply( this, arguments );\n        event.type = fix;\n      }\n      return ret;\n    }\n  };\n});\n\n// IE submit delegation\nif ( !support.submitBubbles ) {\n\n  jQuery.event.special.submit = {\n    setup: function() {\n      // Only need this for delegated form submit events\n      if ( jQuery.nodeName( this, \"form\" ) ) {\n        return false;\n      }\n\n      // Lazy-add a submit handler when a descendant form may potentially be submitted\n      jQuery.event.add( this, \"click._submit keypress._submit\", function( e ) {\n        // Node name check avoids a VML-related crash in IE (#9807)\n        var elem = e.target,\n          form = jQuery.nodeName( elem, \"input\" ) || jQuery.nodeName( elem, \"button\" ) ? elem.form : undefined;\n        if ( form && !jQuery._data( form, \"submitBubbles\" ) ) {\n          jQuery.event.add( form, \"submit._submit\", function( event ) {\n            event._submit_bubble = true;\n          });\n          jQuery._data( form, \"submitBubbles\", true );\n        }\n      });\n      // return undefined since we don't need an event listener\n    },\n\n    postDispatch: function( event ) {\n      // If form was submitted by the user, bubble the event up the tree\n      if ( event._submit_bubble ) {\n        delete event._submit_bubble;\n        if ( this.parentNode && !event.isTrigger ) {\n          jQuery.event.simulate( \"submit\", this.parentNode, event, true );\n        }\n      }\n    },\n\n    teardown: function() {\n      // Only need this for delegated form submit events\n      if ( jQuery.nodeName( this, \"form\" ) ) {\n        return false;\n      }\n\n      // Remove delegated handlers; cleanData eventually reaps submit handlers attached above\n      jQuery.event.remove( this, \"._submit\" );\n    }\n  };\n}\n\n// IE change delegation and checkbox/radio fix\nif ( !support.changeBubbles ) {\n\n  jQuery.event.special.change = {\n\n    setup: function() {\n\n      if ( rformElems.test( this.nodeName ) ) {\n        // IE doesn't fire change on a check/radio until blur; trigger it on click\n        // after a propertychange. Eat the blur-change in special.change.handle.\n        // This still fires onchange a second time for check/radio after blur.\n        if ( this.type === \"checkbox\" || this.type === \"radio\" ) {\n          jQuery.event.add( this, \"propertychange._change\", function( event ) {\n            if ( event.originalEvent.propertyName === \"checked\" ) {\n              this._just_changed = true;\n            }\n          });\n          jQuery.event.add( this, \"click._change\", function( event ) {\n            if ( this._just_changed && !event.isTrigger ) {\n              this._just_changed = false;\n            }\n            // Allow triggered, simulated change events (#11500)\n            jQuery.event.simulate( \"change\", this, event, true );\n          });\n        }\n        return false;\n      }\n      // Delegated event; lazy-add a change handler on descendant inputs\n      jQuery.event.add( this, \"beforeactivate._change\", function( e ) {\n        var elem = e.target;\n\n        if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, \"changeBubbles\" ) ) {\n          jQuery.event.add( elem, \"change._change\", function( event ) {\n            if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {\n              jQuery.event.simulate( \"change\", this.parentNode, event, true );\n            }\n          });\n          jQuery._data( elem, \"changeBubbles\", true );\n        }\n      });\n    },\n\n    handle: function( event ) {\n      var elem = event.target;\n\n      // Swallow native change events from checkbox/radio, we already triggered them above\n      if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== \"radio\" && elem.type !== \"checkbox\") ) {\n        return event.handleObj.handler.apply( this, arguments );\n      }\n    },\n\n    teardown: function() {\n      jQuery.event.remove( this, \"._change\" );\n\n      return !rformElems.test( this.nodeName );\n    }\n  };\n}\n\n// Create \"bubbling\" focus and blur events\nif ( !support.focusinBubbles ) {\n  jQuery.each({ focus: \"focusin\", blur: \"focusout\" }, function( orig, fix ) {\n\n    // Attach a single capturing handler on the document while someone wants focusin/focusout\n    var handler = function( event ) {\n        jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );\n      };\n\n    jQuery.event.special[ fix ] = {\n      setup: function() {\n        var doc = this.ownerDocument || this,\n          attaches = jQuery._data( doc, fix );\n\n        if ( !attaches ) {\n          doc.addEventListener( orig, handler, true );\n        }\n        jQuery._data( doc, fix, ( attaches || 0 ) + 1 );\n      },\n      teardown: function() {\n        var doc = this.ownerDocument || this,\n          attaches = jQuery._data( doc, fix ) - 1;\n\n        if ( !attaches ) {\n          doc.removeEventListener( orig, handler, true );\n          jQuery._removeData( doc, fix );\n        } else {\n          jQuery._data( doc, fix, attaches );\n        }\n      }\n    };\n  });\n}\n\njQuery.fn.extend({\n\n  on: function( types, selector, data, fn, /*INTERNAL*/ one ) {\n    var type, origFn;\n\n    // Types can be a map of types/handlers\n    if ( typeof types === \"object\" ) {\n      // ( types-Object, selector, data )\n      if ( typeof selector !== \"string\" ) {\n        // ( types-Object, data )\n        data = data || selector;\n        selector = undefined;\n      }\n      for ( type in types ) {\n        this.on( type, selector, data, types[ type ], one );\n      }\n      return this;\n    }\n\n    if ( data == null && fn == null ) {\n      // ( types, fn )\n      fn = selector;\n      data = selector = undefined;\n    } else if ( fn == null ) {\n      if ( typeof selector === \"string\" ) {\n        // ( types, selector, fn )\n        fn = data;\n        data = undefined;\n      } else {\n        // ( types, data, fn )\n        fn = data;\n        data = selector;\n        selector = undefined;\n      }\n    }\n    if ( fn === false ) {\n      fn = returnFalse;\n    } else if ( !fn ) {\n      return this;\n    }\n\n    if ( one === 1 ) {\n      origFn = fn;\n      fn = function( event ) {\n        // Can use an empty set, since event contains the info\n        jQuery().off( event );\n        return origFn.apply( this, arguments );\n      };\n      // Use same guid so caller can remove using origFn\n      fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );\n    }\n    return this.each( function() {\n      jQuery.event.add( this, types, fn, data, selector );\n    });\n  },\n  one: function( types, selector, data, fn ) {\n    return this.on( types, selector, data, fn, 1 );\n  },\n  off: function( types, selector, fn ) {\n    var handleObj, type;\n    if ( types && types.preventDefault && types.handleObj ) {\n      // ( event )  dispatched jQuery.Event\n      handleObj = types.handleObj;\n      jQuery( types.delegateTarget ).off(\n        handleObj.namespace ? handleObj.origType + \".\" + handleObj.namespace : handleObj.origType,\n        handleObj.selector,\n        handleObj.handler\n      );\n      return this;\n    }\n    if ( typeof types === \"object\" ) {\n      // ( types-object [, selector] )\n      for ( type in types ) {\n        this.off( type, selector, types[ type ] );\n      }\n      return this;\n    }\n    if ( selector === false || typeof selector === \"function\" ) {\n      // ( types [, fn] )\n      fn = selector;\n      selector = undefined;\n    }\n    if ( fn === false ) {\n      fn = returnFalse;\n    }\n    return this.each(function() {\n      jQuery.event.remove( this, types, fn, selector );\n    });\n  },\n\n  trigger: function( type, data ) {\n    return this.each(function() {\n      jQuery.event.trigger( type, data, this );\n    });\n  },\n  triggerHandler: function( type, data ) {\n    var elem = this[0];\n    if ( elem ) {\n      return jQuery.event.trigger( type, data, elem, true );\n    }\n  }\n});\n\n\nfunction createSafeFragment( document ) {\n  var list = nodeNames.split( \"|\" ),\n    safeFrag = document.createDocumentFragment();\n\n  if ( safeFrag.createElement ) {\n    while ( list.length ) {\n      safeFrag.createElement(\n        list.pop()\n      );\n    }\n  }\n  return safeFrag;\n}\n\nvar nodeNames = \"abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|\" +\n    \"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video\",\n  rinlinejQuery = / jQuery\\d+=\"(?:null|\\d+)\"/g,\n  rnoshimcache = new RegExp(\"<(?:\" + nodeNames + \")[\\\\s/>]\", \"i\"),\n  rleadingWhitespace = /^\\s+/,\n  rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\\w:]+)[^>]*)\\/>/gi,\n  rtagName = /<([\\w:]+)/,\n  rtbody = /<tbody/i,\n  rhtml = /<|&#?\\w+;/,\n  rnoInnerhtml = /<(?:script|style|link)/i,\n  // checked=\"checked\" or checked\n  rchecked = /checked\\s*(?:[^=]|=\\s*.checked.)/i,\n  rscriptType = /^$|\\/(?:java|ecma)script/i,\n  rscriptTypeMasked = /^true\\/(.*)/,\n  rcleanScript = /^\\s*<!(?:\\[CDATA\\[|--)|(?:\\]\\]|--)>\\s*$/g,\n\n  // We have to close these tags to support XHTML (#13200)\n  wrapMap = {\n    option: [ 1, \"<select multiple='multiple'>\", \"</select>\" ],\n    legend: [ 1, \"<fieldset>\", \"</fieldset>\" ],\n    area: [ 1, \"<map>\", \"</map>\" ],\n    param: [ 1, \"<object>\", \"</object>\" ],\n    thead: [ 1, \"<table>\", \"</table>\" ],\n    tr: [ 2, \"<table><tbody>\", \"</tbody></table>\" ],\n    col: [ 2, \"<table><tbody></tbody><colgroup>\", \"</colgroup></table>\" ],\n    td: [ 3, \"<table><tbody><tr>\", \"</tr></tbody></table>\" ],\n\n    // IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,\n    // unless wrapped in a div with non-breaking characters in front of it.\n    _default: support.htmlSerialize ? [ 0, \"\", \"\" ] : [ 1, \"X<div>\", \"</div>\"  ]\n  },\n  safeFragment = createSafeFragment( document ),\n  fragmentDiv = safeFragment.appendChild( document.createElement(\"div\") );\n\nwrapMap.optgroup = wrapMap.option;\nwrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;\nwrapMap.th = wrapMap.td;\n\nfunction getAll( context, tag ) {\n  var elems, elem,\n    i = 0,\n    found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || \"*\" ) :\n      typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || \"*\" ) :\n      undefined;\n\n  if ( !found ) {\n    for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {\n      if ( !tag || jQuery.nodeName( elem, tag ) ) {\n        found.push( elem );\n      } else {\n        jQuery.merge( found, getAll( elem, tag ) );\n      }\n    }\n  }\n\n  return tag === undefined || tag && jQuery.nodeName( context, tag ) ?\n    jQuery.merge( [ context ], found ) :\n    found;\n}\n\n// Used in buildFragment, fixes the defaultChecked property\nfunction fixDefaultChecked( elem ) {\n  if ( rcheckableType.test( elem.type ) ) {\n    elem.defaultChecked = elem.checked;\n  }\n}\n\n// Support: IE<8\n// Manipulating tables requires a tbody\nfunction manipulationTarget( elem, content ) {\n  return jQuery.nodeName( elem, \"table\" ) &&\n    jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, \"tr\" ) ?\n\n    elem.getElementsByTagName(\"tbody\")[0] ||\n      elem.appendChild( elem.ownerDocument.createElement(\"tbody\") ) :\n    elem;\n}\n\n// Replace/restore the type attribute of script elements for safe DOM manipulation\nfunction disableScript( elem ) {\n  elem.type = (jQuery.find.attr( elem, \"type\" ) !== null) + \"/\" + elem.type;\n  return elem;\n}\nfunction restoreScript( elem ) {\n  var match = rscriptTypeMasked.exec( elem.type );\n  if ( match ) {\n    elem.type = match[1];\n  } else {\n    elem.removeAttribute(\"type\");\n  }\n  return elem;\n}\n\n// Mark scripts as having already been evaluated\nfunction setGlobalEval( elems, refElements ) {\n  var elem,\n    i = 0;\n  for ( ; (elem = elems[i]) != null; i++ ) {\n    jQuery._data( elem, \"globalEval\", !refElements || jQuery._data( refElements[i], \"globalEval\" ) );\n  }\n}\n\nfunction cloneCopyEvent( src, dest ) {\n\n  if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {\n    return;\n  }\n\n  var type, i, l,\n    oldData = jQuery._data( src ),\n    curData = jQuery._data( dest, oldData ),\n    events = oldData.events;\n\n  if ( events ) {\n    delete curData.handle;\n    curData.events = {};\n\n    for ( type in events ) {\n      for ( i = 0, l = events[ type ].length; i < l; i++ ) {\n        jQuery.event.add( dest, type, events[ type ][ i ] );\n      }\n    }\n  }\n\n  // make the cloned public data object a copy from the original\n  if ( curData.data ) {\n    curData.data = jQuery.extend( {}, curData.data );\n  }\n}\n\nfunction fixCloneNodeIssues( src, dest ) {\n  var nodeName, e, data;\n\n  // We do not need to do anything for non-Elements\n  if ( dest.nodeType !== 1 ) {\n    return;\n  }\n\n  nodeName = dest.nodeName.toLowerCase();\n\n  // IE6-8 copies events bound via attachEvent when using cloneNode.\n  if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {\n    data = jQuery._data( dest );\n\n    for ( e in data.events ) {\n      jQuery.removeEvent( dest, e, data.handle );\n    }\n\n    // Event data gets referenced instead of copied if the expando gets copied too\n    dest.removeAttribute( jQuery.expando );\n  }\n\n  // IE blanks contents when cloning scripts, and tries to evaluate newly-set text\n  if ( nodeName === \"script\" && dest.text !== src.text ) {\n    disableScript( dest ).text = src.text;\n    restoreScript( dest );\n\n  // IE6-10 improperly clones children of object elements using classid.\n  // IE10 throws NoModificationAllowedError if parent is null, #12132.\n  } else if ( nodeName === \"object\" ) {\n    if ( dest.parentNode ) {\n      dest.outerHTML = src.outerHTML;\n    }\n\n    // This path appears unavoidable for IE9. When cloning an object\n    // element in IE9, the outerHTML strategy above is not sufficient.\n    // If the src has innerHTML and the destination does not,\n    // copy the src.innerHTML into the dest.innerHTML. #10324\n    if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {\n      dest.innerHTML = src.innerHTML;\n    }\n\n  } else if ( nodeName === \"input\" && rcheckableType.test( src.type ) ) {\n    // IE6-8 fails to persist the checked state of a cloned checkbox\n    // or radio button. Worse, IE6-7 fail to give the cloned element\n    // a checked appearance if the defaultChecked value isn't also set\n\n    dest.defaultChecked = dest.checked = src.checked;\n\n    // IE6-7 get confused and end up setting the value of a cloned\n    // checkbox/radio button to an empty string instead of \"on\"\n    if ( dest.value !== src.value ) {\n      dest.value = src.value;\n    }\n\n  // IE6-8 fails to return the selected option to the default selected\n  // state when cloning options\n  } else if ( nodeName === \"option\" ) {\n    dest.defaultSelected = dest.selected = src.defaultSelected;\n\n  // IE6-8 fails to set the defaultValue to the correct value when\n  // cloning other types of input fields\n  } else if ( nodeName === \"input\" || nodeName === \"textarea\" ) {\n    dest.defaultValue = src.defaultValue;\n  }\n}\n\njQuery.extend({\n  clone: function( elem, dataAndEvents, deepDataAndEvents ) {\n    var destElements, node, clone, i, srcElements,\n      inPage = jQuery.contains( elem.ownerDocument, elem );\n\n    if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( \"<\" + elem.nodeName + \">\" ) ) {\n      clone = elem.cloneNode( true );\n\n    // IE<=8 does not properly clone detached, unknown element nodes\n    } else {\n      fragmentDiv.innerHTML = elem.outerHTML;\n      fragmentDiv.removeChild( clone = fragmentDiv.firstChild );\n    }\n\n    if ( (!support.noCloneEvent || !support.noCloneChecked) &&\n        (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {\n\n      // We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2\n      destElements = getAll( clone );\n      srcElements = getAll( elem );\n\n      // Fix all IE cloning issues\n      for ( i = 0; (node = srcElements[i]) != null; ++i ) {\n        // Ensure that the destination node is not null; Fixes #9587\n        if ( destElements[i] ) {\n          fixCloneNodeIssues( node, destElements[i] );\n        }\n      }\n    }\n\n    // Copy the events from the original to the clone\n    if ( dataAndEvents ) {\n      if ( deepDataAndEvents ) {\n        srcElements = srcElements || getAll( elem );\n        destElements = destElements || getAll( clone );\n\n        for ( i = 0; (node = srcElements[i]) != null; i++ ) {\n          cloneCopyEvent( node, destElements[i] );\n        }\n      } else {\n        cloneCopyEvent( elem, clone );\n      }\n    }\n\n    // Preserve script evaluation history\n    destElements = getAll( clone, \"script\" );\n    if ( destElements.length > 0 ) {\n      setGlobalEval( destElements, !inPage && getAll( elem, \"script\" ) );\n    }\n\n    destElements = srcElements = node = null;\n\n    // Return the cloned set\n    return clone;\n  },\n\n  buildFragment: function( elems, context, scripts, selection ) {\n    var j, elem, contains,\n      tmp, tag, tbody, wrap,\n      l = elems.length,\n\n      // Ensure a safe fragment\n      safe = createSafeFragment( context ),\n\n      nodes = [],\n      i = 0;\n\n    for ( ; i < l; i++ ) {\n      elem = elems[ i ];\n\n      if ( elem || elem === 0 ) {\n\n        // Add nodes directly\n        if ( jQuery.type( elem ) === \"object\" ) {\n          jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );\n\n        // Convert non-html into a text node\n        } else if ( !rhtml.test( elem ) ) {\n          nodes.push( context.createTextNode( elem ) );\n\n        // Convert html into DOM nodes\n        } else {\n          tmp = tmp || safe.appendChild( context.createElement(\"div\") );\n\n          // Deserialize a standard representation\n          tag = (rtagName.exec( elem ) || [ \"\", \"\" ])[ 1 ].toLowerCase();\n          wrap = wrapMap[ tag ] || wrapMap._default;\n\n          tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, \"<$1></$2>\" ) + wrap[2];\n\n          // Descend through wrappers to the right content\n          j = wrap[0];\n          while ( j-- ) {\n            tmp = tmp.lastChild;\n          }\n\n          // Manually add leading whitespace removed by IE\n          if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {\n            nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );\n          }\n\n          // Remove IE's autoinserted <tbody> from table fragments\n          if ( !support.tbody ) {\n\n            // String was a <table>, *may* have spurious <tbody>\n            elem = tag === \"table\" && !rtbody.test( elem ) ?\n              tmp.firstChild :\n\n              // String was a bare <thead> or <tfoot>\n              wrap[1] === \"<table>\" && !rtbody.test( elem ) ?\n                tmp :\n                0;\n\n            j = elem && elem.childNodes.length;\n            while ( j-- ) {\n              if ( jQuery.nodeName( (tbody = elem.childNodes[j]), \"tbody\" ) && !tbody.childNodes.length ) {\n                elem.removeChild( tbody );\n              }\n            }\n          }\n\n          jQuery.merge( nodes, tmp.childNodes );\n\n          // Fix #12392 for WebKit and IE > 9\n          tmp.textContent = \"\";\n\n          // Fix #12392 for oldIE\n          while ( tmp.firstChild ) {\n            tmp.removeChild( tmp.firstChild );\n          }\n\n          // Remember the top-level container for proper cleanup\n          tmp = safe.lastChild;\n        }\n      }\n    }\n\n    // Fix #11356: Clear elements from fragment\n    if ( tmp ) {\n      safe.removeChild( tmp );\n    }\n\n    // Reset defaultChecked for any radios and checkboxes\n    // about to be appended to the DOM in IE 6/7 (#8060)\n    if ( !support.appendChecked ) {\n      jQuery.grep( getAll( nodes, \"input\" ), fixDefaultChecked );\n    }\n\n    i = 0;\n    while ( (elem = nodes[ i++ ]) ) {\n\n      // #4087 - If origin and destination elements are the same, and this is\n      // that element, do not do anything\n      if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {\n        continue;\n      }\n\n      contains = jQuery.contains( elem.ownerDocument, elem );\n\n      // Append to fragment\n      tmp = getAll( safe.appendChild( elem ), \"script\" );\n\n      // Preserve script evaluation history\n      if ( contains ) {\n        setGlobalEval( tmp );\n      }\n\n      // Capture executables\n      if ( scripts ) {\n        j = 0;\n        while ( (elem = tmp[ j++ ]) ) {\n          if ( rscriptType.test( elem.type || \"\" ) ) {\n            scripts.push( elem );\n          }\n        }\n      }\n    }\n\n    tmp = null;\n\n    return safe;\n  },\n\n  cleanData: function( elems, /* internal */ acceptData ) {\n    var elem, type, id, data,\n      i = 0,\n      internalKey = jQuery.expando,\n      cache = jQuery.cache,\n      deleteExpando = support.deleteExpando,\n      special = jQuery.event.special;\n\n    for ( ; (elem = elems[i]) != null; i++ ) {\n      if ( acceptData || jQuery.acceptData( elem ) ) {\n\n        id = elem[ internalKey ];\n        data = id && cache[ id ];\n\n        if ( data ) {\n          if ( data.events ) {\n            for ( type in data.events ) {\n              if ( special[ type ] ) {\n                jQuery.event.remove( elem, type );\n\n              // This is a shortcut to avoid jQuery.event.remove's overhead\n              } else {\n                jQuery.removeEvent( elem, type, data.handle );\n              }\n            }\n          }\n\n          // Remove cache only if it was not already removed by jQuery.event.remove\n          if ( cache[ id ] ) {\n\n            delete cache[ id ];\n\n            // IE does not allow us to delete expando properties from nodes,\n            // nor does it have a removeAttribute function on Document nodes;\n            // we must handle all of these cases\n            if ( deleteExpando ) {\n              delete elem[ internalKey ];\n\n            } else if ( typeof elem.removeAttribute !== strundefined ) {\n              elem.removeAttribute( internalKey );\n\n            } else {\n              elem[ internalKey ] = null;\n            }\n\n            deletedIds.push( id );\n          }\n        }\n      }\n    }\n  }\n});\n\njQuery.fn.extend({\n  text: function( value ) {\n    return access( this, function( value ) {\n      return value === undefined ?\n        jQuery.text( this ) :\n        this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );\n    }, null, value, arguments.length );\n  },\n\n  append: function() {\n    return this.domManip( arguments, function( elem ) {\n      if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {\n        var target = manipulationTarget( this, elem );\n        target.appendChild( elem );\n      }\n    });\n  },\n\n  prepend: function() {\n    return this.domManip( arguments, function( elem ) {\n      if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {\n        var target = manipulationTarget( this, elem );\n        target.insertBefore( elem, target.firstChild );\n      }\n    });\n  },\n\n  before: function() {\n    return this.domManip( arguments, function( elem ) {\n      if ( this.parentNode ) {\n        this.parentNode.insertBefore( elem, this );\n      }\n    });\n  },\n\n  after: function() {\n    return this.domManip( arguments, function( elem ) {\n      if ( this.parentNode ) {\n        this.parentNode.insertBefore( elem, this.nextSibling );\n      }\n    });\n  },\n\n  remove: function( selector, keepData /* Internal Use Only */ ) {\n    var elem,\n      elems = selector ? jQuery.filter( selector, this ) : this,\n      i = 0;\n\n    for ( ; (elem = elems[i]) != null; i++ ) {\n\n      if ( !keepData && elem.nodeType === 1 ) {\n        jQuery.cleanData( getAll( elem ) );\n      }\n\n      if ( elem.parentNode ) {\n        if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {\n          setGlobalEval( getAll( elem, \"script\" ) );\n        }\n        elem.parentNode.removeChild( elem );\n      }\n    }\n\n    return this;\n  },\n\n  empty: function() {\n    var elem,\n      i = 0;\n\n    for ( ; (elem = this[i]) != null; i++ ) {\n      // Remove element nodes and prevent memory leaks\n      if ( elem.nodeType === 1 ) {\n        jQuery.cleanData( getAll( elem, false ) );\n      }\n\n      // Remove any remaining nodes\n      while ( elem.firstChild ) {\n        elem.removeChild( elem.firstChild );\n      }\n\n      // If this is a select, ensure that it displays empty (#12336)\n      // Support: IE<9\n      if ( elem.options && jQuery.nodeName( elem, \"select\" ) ) {\n        elem.options.length = 0;\n      }\n    }\n\n    return this;\n  },\n\n  clone: function( dataAndEvents, deepDataAndEvents ) {\n    dataAndEvents = dataAndEvents == null ? false : dataAndEvents;\n    deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;\n\n    return this.map(function() {\n      return jQuery.clone( this, dataAndEvents, deepDataAndEvents );\n    });\n  },\n\n  html: function( value ) {\n    return access( this, function( value ) {\n      var elem = this[ 0 ] || {},\n        i = 0,\n        l = this.length;\n\n      if ( value === undefined ) {\n        return elem.nodeType === 1 ?\n          elem.innerHTML.replace( rinlinejQuery, \"\" ) :\n          undefined;\n      }\n\n      // See if we can take a shortcut and just use innerHTML\n      if ( typeof value === \"string\" && !rnoInnerhtml.test( value ) &&\n        ( support.htmlSerialize || !rnoshimcache.test( value )  ) &&\n        ( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&\n        !wrapMap[ (rtagName.exec( value ) || [ \"\", \"\" ])[ 1 ].toLowerCase() ] ) {\n\n        value = value.replace( rxhtmlTag, \"<$1></$2>\" );\n\n        try {\n          for (; i < l; i++ ) {\n            // Remove element nodes and prevent memory leaks\n            elem = this[i] || {};\n            if ( elem.nodeType === 1 ) {\n              jQuery.cleanData( getAll( elem, false ) );\n              elem.innerHTML = value;\n            }\n          }\n\n          elem = 0;\n\n        // If using innerHTML throws an exception, use the fallback method\n        } catch(e) {}\n      }\n\n      if ( elem ) {\n        this.empty().append( value );\n      }\n    }, null, value, arguments.length );\n  },\n\n  replaceWith: function() {\n    var arg = arguments[ 0 ];\n\n    // Make the changes, replacing each context element with the new content\n    this.domManip( arguments, function( elem ) {\n      arg = this.parentNode;\n\n      jQuery.cleanData( getAll( this ) );\n\n      if ( arg ) {\n        arg.replaceChild( elem, this );\n      }\n    });\n\n    // Force removal if there was no new content (e.g., from empty arguments)\n    return arg && (arg.length || arg.nodeType) ? this : this.remove();\n  },\n\n  detach: function( selector ) {\n    return this.remove( selector, true );\n  },\n\n  domManip: function( args, callback ) {\n\n    // Flatten any nested arrays\n    args = concat.apply( [], args );\n\n    var first, node, hasScripts,\n      scripts, doc, fragment,\n      i = 0,\n      l = this.length,\n      set = this,\n      iNoClone = l - 1,\n      value = args[0],\n      isFunction = jQuery.isFunction( value );\n\n    // We can't cloneNode fragments that contain checked, in WebKit\n    if ( isFunction ||\n        ( l > 1 && typeof value === \"string\" &&\n          !support.checkClone && rchecked.test( value ) ) ) {\n      return this.each(function( index ) {\n        var self = set.eq( index );\n        if ( isFunction ) {\n          args[0] = value.call( this, index, self.html() );\n        }\n        self.domManip( args, callback );\n      });\n    }\n\n    if ( l ) {\n      fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );\n      first = fragment.firstChild;\n\n      if ( fragment.childNodes.length === 1 ) {\n        fragment = first;\n      }\n\n      if ( first ) {\n        scripts = jQuery.map( getAll( fragment, \"script\" ), disableScript );\n        hasScripts = scripts.length;\n\n        // Use the original fragment for the last item instead of the first because it can end up\n        // being emptied incorrectly in certain situations (#8070).\n        for ( ; i < l; i++ ) {\n          node = fragment;\n\n          if ( i !== iNoClone ) {\n            node = jQuery.clone( node, true, true );\n\n            // Keep references to cloned scripts for later restoration\n            if ( hasScripts ) {\n              jQuery.merge( scripts, getAll( node, \"script\" ) );\n            }\n          }\n\n          callback.call( this[i], node, i );\n        }\n\n        if ( hasScripts ) {\n          doc = scripts[ scripts.length - 1 ].ownerDocument;\n\n          // Reenable scripts\n          jQuery.map( scripts, restoreScript );\n\n          // Evaluate executable scripts on first document insertion\n          for ( i = 0; i < hasScripts; i++ ) {\n            node = scripts[ i ];\n            if ( rscriptType.test( node.type || \"\" ) &&\n              !jQuery._data( node, \"globalEval\" ) && jQuery.contains( doc, node ) ) {\n\n              if ( node.src ) {\n                // Optional AJAX dependency, but won't run scripts if not present\n                if ( jQuery._evalUrl ) {\n                  jQuery._evalUrl( node.src );\n                }\n              } else {\n                jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || \"\" ).replace( rcleanScript, \"\" ) );\n              }\n            }\n          }\n        }\n\n        // Fix #11809: Avoid leaking memory\n        fragment = first = null;\n      }\n    }\n\n    return this;\n  }\n});\n\njQuery.each({\n  appendTo: \"append\",\n  prependTo: \"prepend\",\n  insertBefore: \"before\",\n  insertAfter: \"after\",\n  replaceAll: \"replaceWith\"\n}, function( name, original ) {\n  jQuery.fn[ name ] = function( selector ) {\n    var elems,\n      i = 0,\n      ret = [],\n      insert = jQuery( selector ),\n      last = insert.length - 1;\n\n    for ( ; i <= last; i++ ) {\n      elems = i === last ? this : this.clone(true);\n      jQuery( insert[i] )[ original ]( elems );\n\n      // Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()\n      push.apply( ret, elems.get() );\n    }\n\n    return this.pushStack( ret );\n  };\n});\n\n\nvar iframe,\n  elemdisplay = {};\n\n/**\n * Retrieve the actual display of a element\n * @param {String} name nodeName of the element\n * @param {Object} doc Document object\n */\n// Called only from within defaultDisplay\nfunction actualDisplay( name, doc ) {\n  var style,\n    elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),\n\n    // getDefaultComputedStyle might be reliably used only on attached element\n    display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?\n\n      // Use of this method is a temporary fix (more like optmization) until something better comes along,\n      // since it was removed from specification and supported only in FF\n      style.display : jQuery.css( elem[ 0 ], \"display\" );\n\n  // We don't have any data stored on the element,\n  // so use \"detach\" method as fast way to get rid of the element\n  elem.detach();\n\n  return display;\n}\n\n/**\n * Try to determine the default display value of an element\n * @param {String} nodeName\n */\nfunction defaultDisplay( nodeName ) {\n  var doc = document,\n    display = elemdisplay[ nodeName ];\n\n  if ( !display ) {\n    display = actualDisplay( nodeName, doc );\n\n    // If the simple way fails, read from inside an iframe\n    if ( display === \"none\" || !display ) {\n\n      // Use the already-created iframe if possible\n      iframe = (iframe || jQuery( \"<iframe frameborder='0' width='0' height='0'/>\" )).appendTo( doc.documentElement );\n\n      // Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse\n      doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;\n\n      // Support: IE\n      doc.write();\n      doc.close();\n\n      display = actualDisplay( nodeName, doc );\n      iframe.detach();\n    }\n\n    // Store the correct default display\n    elemdisplay[ nodeName ] = display;\n  }\n\n  return display;\n}\n\n\n(function() {\n  var shrinkWrapBlocksVal;\n\n  support.shrinkWrapBlocks = function() {\n    if ( shrinkWrapBlocksVal != null ) {\n      return shrinkWrapBlocksVal;\n    }\n\n    // Will be changed later if needed.\n    shrinkWrapBlocksVal = false;\n\n    // Minified: var b,c,d\n    var div, body, container;\n\n    body = document.getElementsByTagName( \"body\" )[ 0 ];\n    if ( !body || !body.style ) {\n      // Test fired too early or in an unsupported environment, exit.\n      return;\n    }\n\n    // Setup\n    div = document.createElement( \"div\" );\n    container = document.createElement( \"div\" );\n    container.style.cssText = \"position:absolute;border:0;width:0;height:0;top:0;left:-9999px\";\n    body.appendChild( container ).appendChild( div );\n\n    // Support: IE6\n    // Check if elements with layout shrink-wrap their children\n    if ( typeof div.style.zoom !== strundefined ) {\n      // Reset CSS: box-sizing; display; margin; border\n      div.style.cssText =\n        // Support: Firefox<29, Android 2.3\n        // Vendor-prefix box-sizing\n        \"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;\" +\n        \"box-sizing:content-box;display:block;margin:0;border:0;\" +\n        \"padding:1px;width:1px;zoom:1\";\n      div.appendChild( document.createElement( \"div\" ) ).style.width = \"5px\";\n      shrinkWrapBlocksVal = div.offsetWidth !== 3;\n    }\n\n    body.removeChild( container );\n\n    return shrinkWrapBlocksVal;\n  };\n\n})();\nvar rmargin = (/^margin/);\n\nvar rnumnonpx = new RegExp( \"^(\" + pnum + \")(?!px)[a-z%]+$\", \"i\" );\n\n\n\nvar getStyles, curCSS,\n  rposition = /^(top|right|bottom|left)$/;\n\nif ( window.getComputedStyle ) {\n  getStyles = function( elem ) {\n    return elem.ownerDocument.defaultView.getComputedStyle( elem, null );\n  };\n\n  curCSS = function( elem, name, computed ) {\n    var width, minWidth, maxWidth, ret,\n      style = elem.style;\n\n    computed = computed || getStyles( elem );\n\n    // getPropertyValue is only needed for .css('filter') in IE9, see #12537\n    ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;\n\n    if ( computed ) {\n\n      if ( ret === \"\" && !jQuery.contains( elem.ownerDocument, elem ) ) {\n        ret = jQuery.style( elem, name );\n      }\n\n      // A tribute to the \"awesome hack by Dean Edwards\"\n      // Chrome < 17 and Safari 5.0 uses \"computed value\" instead of \"used value\" for margin-right\n      // Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels\n      // this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values\n      if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {\n\n        // Remember the original values\n        width = style.width;\n        minWidth = style.minWidth;\n        maxWidth = style.maxWidth;\n\n        // Put in the new values to get a computed value out\n        style.minWidth = style.maxWidth = style.width = ret;\n        ret = computed.width;\n\n        // Revert the changed values\n        style.width = width;\n        style.minWidth = minWidth;\n        style.maxWidth = maxWidth;\n      }\n    }\n\n    // Support: IE\n    // IE returns zIndex value as an integer.\n    return ret === undefined ?\n      ret :\n      ret + \"\";\n  };\n} else if ( document.documentElement.currentStyle ) {\n  getStyles = function( elem ) {\n    return elem.currentStyle;\n  };\n\n  curCSS = function( elem, name, computed ) {\n    var left, rs, rsLeft, ret,\n      style = elem.style;\n\n    computed = computed || getStyles( elem );\n    ret = computed ? computed[ name ] : undefined;\n\n    // Avoid setting ret to empty string here\n    // so we don't default to auto\n    if ( ret == null && style && style[ name ] ) {\n      ret = style[ name ];\n    }\n\n    // From the awesome hack by Dean Edwards\n    // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291\n\n    // If we're not dealing with a regular pixel number\n    // but a number that has a weird ending, we need to convert it to pixels\n    // but not position css attributes, as those are proportional to the parent element instead\n    // and we can't measure the parent instead because it might trigger a \"stacking dolls\" problem\n    if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {\n\n      // Remember the original values\n      left = style.left;\n      rs = elem.runtimeStyle;\n      rsLeft = rs && rs.left;\n\n      // Put in the new values to get a computed value out\n      if ( rsLeft ) {\n        rs.left = elem.currentStyle.left;\n      }\n      style.left = name === \"fontSize\" ? \"1em\" : ret;\n      ret = style.pixelLeft + \"px\";\n\n      // Revert the changed values\n      style.left = left;\n      if ( rsLeft ) {\n        rs.left = rsLeft;\n      }\n    }\n\n    // Support: IE\n    // IE returns zIndex value as an integer.\n    return ret === undefined ?\n      ret :\n      ret + \"\" || \"auto\";\n  };\n}\n\n\n\n\nfunction addGetHookIf( conditionFn, hookFn ) {\n  // Define the hook, we'll check on the first run if it's really needed.\n  return {\n    get: function() {\n      var condition = conditionFn();\n\n      if ( condition == null ) {\n        // The test was not ready at this point; screw the hook this time\n        // but check again when needed next time.\n        return;\n      }\n\n      if ( condition ) {\n        // Hook not needed (or it's not possible to use it due to missing dependency),\n        // remove it.\n        // Since there are no other hooks for marginRight, remove the whole object.\n        delete this.get;\n        return;\n      }\n\n      // Hook needed; redefine it so that the support test is not executed again.\n\n      return (this.get = hookFn).apply( this, arguments );\n    }\n  };\n}\n\n\n(function() {\n  // Minified: var b,c,d,e,f,g, h,i\n  var div, style, a, pixelPositionVal, boxSizingReliableVal,\n    reliableHiddenOffsetsVal, reliableMarginRightVal;\n\n  // Setup\n  div = document.createElement( \"div\" );\n  div.innerHTML = \"  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>\";\n  a = div.getElementsByTagName( \"a\" )[ 0 ];\n  style = a && a.style;\n\n  // Finish early in limited (non-browser) environments\n  if ( !style ) {\n    return;\n  }\n\n  style.cssText = \"float:left;opacity:.5\";\n\n  // Support: IE<9\n  // Make sure that element opacity exists (as opposed to filter)\n  support.opacity = style.opacity === \"0.5\";\n\n  // Verify style float existence\n  // (IE uses styleFloat instead of cssFloat)\n  support.cssFloat = !!style.cssFloat;\n\n  div.style.backgroundClip = \"content-box\";\n  div.cloneNode( true ).style.backgroundClip = \"\";\n  support.clearCloneStyle = div.style.backgroundClip === \"content-box\";\n\n  // Support: Firefox<29, Android 2.3\n  // Vendor-prefix box-sizing\n  support.boxSizing = style.boxSizing === \"\" || style.MozBoxSizing === \"\" ||\n    style.WebkitBoxSizing === \"\";\n\n  jQuery.extend(support, {\n    reliableHiddenOffsets: function() {\n      if ( reliableHiddenOffsetsVal == null ) {\n        computeStyleTests();\n      }\n      return reliableHiddenOffsetsVal;\n    },\n\n    boxSizingReliable: function() {\n      if ( boxSizingReliableVal == null ) {\n        computeStyleTests();\n      }\n      return boxSizingReliableVal;\n    },\n\n    pixelPosition: function() {\n      if ( pixelPositionVal == null ) {\n        computeStyleTests();\n      }\n      return pixelPositionVal;\n    },\n\n    // Support: Android 2.3\n    reliableMarginRight: function() {\n      if ( reliableMarginRightVal == null ) {\n        computeStyleTests();\n      }\n      return reliableMarginRightVal;\n    }\n  });\n\n  function computeStyleTests() {\n    // Minified: var b,c,d,j\n    var div, body, container, contents;\n\n    body = document.getElementsByTagName( \"body\" )[ 0 ];\n    if ( !body || !body.style ) {\n      // Test fired too early or in an unsupported environment, exit.\n      return;\n    }\n\n    // Setup\n    div = document.createElement( \"div\" );\n    container = document.createElement( \"div\" );\n    container.style.cssText = \"position:absolute;border:0;width:0;height:0;top:0;left:-9999px\";\n    body.appendChild( container ).appendChild( div );\n\n    div.style.cssText =\n      // Support: Firefox<29, Android 2.3\n      // Vendor-prefix box-sizing\n      \"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;\" +\n      \"box-sizing:border-box;display:block;margin-top:1%;top:1%;\" +\n      \"border:1px;padding:1px;width:4px;position:absolute\";\n\n    // Support: IE<9\n    // Assume reasonable values in the absence of getComputedStyle\n    pixelPositionVal = boxSizingReliableVal = false;\n    reliableMarginRightVal = true;\n\n    // Check for getComputedStyle so that this code is not run in IE<9.\n    if ( window.getComputedStyle ) {\n      pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== \"1%\";\n      boxSizingReliableVal =\n        ( window.getComputedStyle( div, null ) || { width: \"4px\" } ).width === \"4px\";\n\n      // Support: Android 2.3\n      // Div with explicit width and no margin-right incorrectly\n      // gets computed margin-right based on width of container (#3333)\n      // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right\n      contents = div.appendChild( document.createElement( \"div\" ) );\n\n      // Reset CSS: box-sizing; display; margin; border; padding\n      contents.style.cssText = div.style.cssText =\n        // Support: Firefox<29, Android 2.3\n        // Vendor-prefix box-sizing\n        \"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;\" +\n        \"box-sizing:content-box;display:block;margin:0;border:0;padding:0\";\n      contents.style.marginRight = contents.style.width = \"0\";\n      div.style.width = \"1px\";\n\n      reliableMarginRightVal =\n        !parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );\n    }\n\n    // Support: IE8\n    // Check if table cells still have offsetWidth/Height when they are set\n    // to display:none and there are still other visible table cells in a\n    // table row; if so, offsetWidth/Height are not reliable for use when\n    // determining if an element has been hidden directly using\n    // display:none (it is still safe to use offsets if a parent element is\n    // hidden; don safety goggles and see bug #4512 for more information).\n    div.innerHTML = \"<table><tr><td></td><td>t</td></tr></table>\";\n    contents = div.getElementsByTagName( \"td\" );\n    contents[ 0 ].style.cssText = \"margin:0;border:0;padding:0;display:none\";\n    reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;\n    if ( reliableHiddenOffsetsVal ) {\n      contents[ 0 ].style.display = \"\";\n      contents[ 1 ].style.display = \"none\";\n      reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;\n    }\n\n    body.removeChild( container );\n  }\n\n})();\n\n\n// A method for quickly swapping in/out CSS properties to get correct calculations.\njQuery.swap = function( elem, options, callback, args ) {\n  var ret, name,\n    old = {};\n\n  // Remember the old values, and insert the new ones\n  for ( name in options ) {\n    old[ name ] = elem.style[ name ];\n    elem.style[ name ] = options[ name ];\n  }\n\n  ret = callback.apply( elem, args || [] );\n\n  // Revert the old values\n  for ( name in options ) {\n    elem.style[ name ] = old[ name ];\n  }\n\n  return ret;\n};\n\n\nvar\n    ralpha = /alpha\\([^)]*\\)/i,\n  ropacity = /opacity\\s*=\\s*([^)]*)/,\n\n  // swappable if display is none or starts with table except \"table\", \"table-cell\", or \"table-caption\"\n  // see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display\n  rdisplayswap = /^(none|table(?!-c[ea]).+)/,\n  rnumsplit = new RegExp( \"^(\" + pnum + \")(.*)$\", \"i\" ),\n  rrelNum = new RegExp( \"^([+-])=(\" + pnum + \")\", \"i\" ),\n\n  cssShow = { position: \"absolute\", visibility: \"hidden\", display: \"block\" },\n  cssNormalTransform = {\n    letterSpacing: \"0\",\n    fontWeight: \"400\"\n  },\n\n  cssPrefixes = [ \"Webkit\", \"O\", \"Moz\", \"ms\" ];\n\n\n// return a css property mapped to a potentially vendor prefixed property\nfunction vendorPropName( style, name ) {\n\n  // shortcut for names that are not vendor prefixed\n  if ( name in style ) {\n    return name;\n  }\n\n  // check for vendor prefixed names\n  var capName = name.charAt(0).toUpperCase() + name.slice(1),\n    origName = name,\n    i = cssPrefixes.length;\n\n  while ( i-- ) {\n    name = cssPrefixes[ i ] + capName;\n    if ( name in style ) {\n      return name;\n    }\n  }\n\n  return origName;\n}\n\nfunction showHide( elements, show ) {\n  var display, elem, hidden,\n    values = [],\n    index = 0,\n    length = elements.length;\n\n  for ( ; index < length; index++ ) {\n    elem = elements[ index ];\n    if ( !elem.style ) {\n      continue;\n    }\n\n    values[ index ] = jQuery._data( elem, \"olddisplay\" );\n    display = elem.style.display;\n    if ( show ) {\n      // Reset the inline display of this element to learn if it is\n      // being hidden by cascaded rules or not\n      if ( !values[ index ] && display === \"none\" ) {\n        elem.style.display = \"\";\n      }\n\n      // Set elements which have been overridden with display: none\n      // in a stylesheet to whatever the default browser style is\n      // for such an element\n      if ( elem.style.display === \"\" && isHidden( elem ) ) {\n        values[ index ] = jQuery._data( elem, \"olddisplay\", defaultDisplay(elem.nodeName) );\n      }\n    } else {\n      hidden = isHidden( elem );\n\n      if ( display && display !== \"none\" || !hidden ) {\n        jQuery._data( elem, \"olddisplay\", hidden ? display : jQuery.css( elem, \"display\" ) );\n      }\n    }\n  }\n\n  // Set the display of most of the elements in a second loop\n  // to avoid the constant reflow\n  for ( index = 0; index < length; index++ ) {\n    elem = elements[ index ];\n    if ( !elem.style ) {\n      continue;\n    }\n    if ( !show || elem.style.display === \"none\" || elem.style.display === \"\" ) {\n      elem.style.display = show ? values[ index ] || \"\" : \"none\";\n    }\n  }\n\n  return elements;\n}\n\nfunction setPositiveNumber( elem, value, subtract ) {\n  var matches = rnumsplit.exec( value );\n  return matches ?\n    // Guard against undefined \"subtract\", e.g., when used as in cssHooks\n    Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || \"px\" ) :\n    value;\n}\n\nfunction augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {\n  var i = extra === ( isBorderBox ? \"border\" : \"content\" ) ?\n    // If we already have the right measurement, avoid augmentation\n    4 :\n    // Otherwise initialize for horizontal or vertical properties\n    name === \"width\" ? 1 : 0,\n\n    val = 0;\n\n  for ( ; i < 4; i += 2 ) {\n    // both box models exclude margin, so add it if we want it\n    if ( extra === \"margin\" ) {\n      val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );\n    }\n\n    if ( isBorderBox ) {\n      // border-box includes padding, so remove it if we want content\n      if ( extra === \"content\" ) {\n        val -= jQuery.css( elem, \"padding\" + cssExpand[ i ], true, styles );\n      }\n\n      // at this point, extra isn't border nor margin, so remove border\n      if ( extra !== \"margin\" ) {\n        val -= jQuery.css( elem, \"border\" + cssExpand[ i ] + \"Width\", true, styles );\n      }\n    } else {\n      // at this point, extra isn't content, so add padding\n      val += jQuery.css( elem, \"padding\" + cssExpand[ i ], true, styles );\n\n      // at this point, extra isn't content nor padding, so add border\n      if ( extra !== \"padding\" ) {\n        val += jQuery.css( elem, \"border\" + cssExpand[ i ] + \"Width\", true, styles );\n      }\n    }\n  }\n\n  return val;\n}\n\nfunction getWidthOrHeight( elem, name, extra ) {\n\n  // Start with offset property, which is equivalent to the border-box value\n  var valueIsBorderBox = true,\n    val = name === \"width\" ? elem.offsetWidth : elem.offsetHeight,\n    styles = getStyles( elem ),\n    isBorderBox = support.boxSizing && jQuery.css( elem, \"boxSizing\", false, styles ) === \"border-box\";\n\n  // some non-html elements return undefined for offsetWidth, so check for null/undefined\n  // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285\n  // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668\n  if ( val <= 0 || val == null ) {\n    // Fall back to computed then uncomputed css if necessary\n    val = curCSS( elem, name, styles );\n    if ( val < 0 || val == null ) {\n      val = elem.style[ name ];\n    }\n\n    // Computed unit is not pixels. Stop here and return.\n    if ( rnumnonpx.test(val) ) {\n      return val;\n    }\n\n    // we need the check for style in case a browser which returns unreliable values\n    // for getComputedStyle silently falls back to the reliable elem.style\n    valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );\n\n    // Normalize \"\", auto, and prepare for extra\n    val = parseFloat( val ) || 0;\n  }\n\n  // use the active box-sizing model to add/subtract irrelevant styles\n  return ( val +\n    augmentWidthOrHeight(\n      elem,\n      name,\n      extra || ( isBorderBox ? \"border\" : \"content\" ),\n      valueIsBorderBox,\n      styles\n    )\n  ) + \"px\";\n}\n\njQuery.extend({\n  // Add in style property hooks for overriding the default\n  // behavior of getting and setting a style property\n  cssHooks: {\n    opacity: {\n      get: function( elem, computed ) {\n        if ( computed ) {\n          // We should always get a number back from opacity\n          var ret = curCSS( elem, \"opacity\" );\n          return ret === \"\" ? \"1\" : ret;\n        }\n      }\n    }\n  },\n\n  // Don't automatically add \"px\" to these possibly-unitless properties\n  cssNumber: {\n    \"columnCount\": true,\n    \"fillOpacity\": true,\n    \"flexGrow\": true,\n    \"flexShrink\": true,\n    \"fontWeight\": true,\n    \"lineHeight\": true,\n    \"opacity\": true,\n    \"order\": true,\n    \"orphans\": true,\n    \"widows\": true,\n    \"zIndex\": true,\n    \"zoom\": true\n  },\n\n  // Add in properties whose names you wish to fix before\n  // setting or getting the value\n  cssProps: {\n    // normalize float css property\n    \"float\": support.cssFloat ? \"cssFloat\" : \"styleFloat\"\n  },\n\n  // Get and set the style property on a DOM Node\n  style: function( elem, name, value, extra ) {\n    // Don't set styles on text and comment nodes\n    if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {\n      return;\n    }\n\n    // Make sure that we're working with the right name\n    var ret, type, hooks,\n      origName = jQuery.camelCase( name ),\n      style = elem.style;\n\n    name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );\n\n    // gets hook for the prefixed version\n    // followed by the unprefixed version\n    hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];\n\n    // Check if we're setting a value\n    if ( value !== undefined ) {\n      type = typeof value;\n\n      // convert relative number strings (+= or -=) to relative numbers. #7345\n      if ( type === \"string\" && (ret = rrelNum.exec( value )) ) {\n        value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );\n        // Fixes bug #9237\n        type = \"number\";\n      }\n\n      // Make sure that null and NaN values aren't set. See: #7116\n      if ( value == null || value !== value ) {\n        return;\n      }\n\n      // If a number was passed in, add 'px' to the (except for certain CSS properties)\n      if ( type === \"number\" && !jQuery.cssNumber[ origName ] ) {\n        value += \"px\";\n      }\n\n      // Fixes #8908, it can be done more correctly by specifing setters in cssHooks,\n      // but it would mean to define eight (for every problematic property) identical functions\n      if ( !support.clearCloneStyle && value === \"\" && name.indexOf(\"background\") === 0 ) {\n        style[ name ] = \"inherit\";\n      }\n\n      // If a hook was provided, use that value, otherwise just set the specified value\n      if ( !hooks || !(\"set\" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {\n\n        // Support: IE\n        // Swallow errors from 'invalid' CSS values (#5509)\n        try {\n          style[ name ] = value;\n        } catch(e) {}\n      }\n\n    } else {\n      // If a hook was provided get the non-computed value from there\n      if ( hooks && \"get\" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {\n        return ret;\n      }\n\n      // Otherwise just get the value from the style object\n      return style[ name ];\n    }\n  },\n\n  css: function( elem, name, extra, styles ) {\n    var num, val, hooks,\n      origName = jQuery.camelCase( name );\n\n    // Make sure that we're working with the right name\n    name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );\n\n    // gets hook for the prefixed version\n    // followed by the unprefixed version\n    hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];\n\n    // If a hook was provided get the computed value from there\n    if ( hooks && \"get\" in hooks ) {\n      val = hooks.get( elem, true, extra );\n    }\n\n    // Otherwise, if a way to get the computed value exists, use that\n    if ( val === undefined ) {\n      val = curCSS( elem, name, styles );\n    }\n\n    //convert \"normal\" to computed value\n    if ( val === \"normal\" && name in cssNormalTransform ) {\n      val = cssNormalTransform[ name ];\n    }\n\n    // Return, converting to number if forced or a qualifier was provided and val looks numeric\n    if ( extra === \"\" || extra ) {\n      num = parseFloat( val );\n      return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;\n    }\n    return val;\n  }\n});\n\njQuery.each([ \"height\", \"width\" ], function( i, name ) {\n  jQuery.cssHooks[ name ] = {\n    get: function( elem, computed, extra ) {\n      if ( computed ) {\n        // certain elements can have dimension info if we invisibly show them\n        // however, it must have a current display style that would benefit from this\n        return rdisplayswap.test( jQuery.css( elem, \"display\" ) ) && elem.offsetWidth === 0 ?\n          jQuery.swap( elem, cssShow, function() {\n            return getWidthOrHeight( elem, name, extra );\n          }) :\n          getWidthOrHeight( elem, name, extra );\n      }\n    },\n\n    set: function( elem, value, extra ) {\n      var styles = extra && getStyles( elem );\n      return setPositiveNumber( elem, value, extra ?\n        augmentWidthOrHeight(\n          elem,\n          name,\n          extra,\n          support.boxSizing && jQuery.css( elem, \"boxSizing\", false, styles ) === \"border-box\",\n          styles\n        ) : 0\n      );\n    }\n  };\n});\n\nif ( !support.opacity ) {\n  jQuery.cssHooks.opacity = {\n    get: function( elem, computed ) {\n      // IE uses filters for opacity\n      return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || \"\" ) ?\n        ( 0.01 * parseFloat( RegExp.$1 ) ) + \"\" :\n        computed ? \"1\" : \"\";\n    },\n\n    set: function( elem, value ) {\n      var style = elem.style,\n        currentStyle = elem.currentStyle,\n        opacity = jQuery.isNumeric( value ) ? \"alpha(opacity=\" + value * 100 + \")\" : \"\",\n        filter = currentStyle && currentStyle.filter || style.filter || \"\";\n\n      // IE has trouble with opacity if it does not have layout\n      // Force it by setting the zoom level\n      style.zoom = 1;\n\n      // if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652\n      // if value === \"\", then remove inline opacity #12685\n      if ( ( value >= 1 || value === \"\" ) &&\n          jQuery.trim( filter.replace( ralpha, \"\" ) ) === \"\" &&\n          style.removeAttribute ) {\n\n        // Setting style.filter to null, \"\" & \" \" still leave \"filter:\" in the cssText\n        // if \"filter:\" is present at all, clearType is disabled, we want to avoid this\n        // style.removeAttribute is IE Only, but so apparently is this code path...\n        style.removeAttribute( \"filter\" );\n\n        // if there is no filter style applied in a css rule or unset inline opacity, we are done\n        if ( value === \"\" || currentStyle && !currentStyle.filter ) {\n          return;\n        }\n      }\n\n      // otherwise, set new filter values\n      style.filter = ralpha.test( filter ) ?\n        filter.replace( ralpha, opacity ) :\n        filter + \" \" + opacity;\n    }\n  };\n}\n\njQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,\n  function( elem, computed ) {\n    if ( computed ) {\n      // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right\n      // Work around by temporarily setting element display to inline-block\n      return jQuery.swap( elem, { \"display\": \"inline-block\" },\n        curCSS, [ elem, \"marginRight\" ] );\n    }\n  }\n);\n\n// These hooks are used by animate to expand properties\njQuery.each({\n  margin: \"\",\n  padding: \"\",\n  border: \"Width\"\n}, function( prefix, suffix ) {\n  jQuery.cssHooks[ prefix + suffix ] = {\n    expand: function( value ) {\n      var i = 0,\n        expanded = {},\n\n        // assumes a single number if not a string\n        parts = typeof value === \"string\" ? value.split(\" \") : [ value ];\n\n      for ( ; i < 4; i++ ) {\n        expanded[ prefix + cssExpand[ i ] + suffix ] =\n          parts[ i ] || parts[ i - 2 ] || parts[ 0 ];\n      }\n\n      return expanded;\n    }\n  };\n\n  if ( !rmargin.test( prefix ) ) {\n    jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;\n  }\n});\n\njQuery.fn.extend({\n  css: function( name, value ) {\n    return access( this, function( elem, name, value ) {\n      var styles, len,\n        map = {},\n        i = 0;\n\n      if ( jQuery.isArray( name ) ) {\n        styles = getStyles( elem );\n        len = name.length;\n\n        for ( ; i < len; i++ ) {\n          map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );\n        }\n\n        return map;\n      }\n\n      return value !== undefined ?\n        jQuery.style( elem, name, value ) :\n        jQuery.css( elem, name );\n    }, name, value, arguments.length > 1 );\n  },\n  show: function() {\n    return showHide( this, true );\n  },\n  hide: function() {\n    return showHide( this );\n  },\n  toggle: function( state ) {\n    if ( typeof state === \"boolean\" ) {\n      return state ? this.show() : this.hide();\n    }\n\n    return this.each(function() {\n      if ( isHidden( this ) ) {\n        jQuery( this ).show();\n      } else {\n        jQuery( this ).hide();\n      }\n    });\n  }\n});\n\n\nfunction Tween( elem, options, prop, end, easing ) {\n  return new Tween.prototype.init( elem, options, prop, end, easing );\n}\njQuery.Tween = Tween;\n\nTween.prototype = {\n  constructor: Tween,\n  init: function( elem, options, prop, end, easing, unit ) {\n    this.elem = elem;\n    this.prop = prop;\n    this.easing = easing || \"swing\";\n    this.options = options;\n    this.start = this.now = this.cur();\n    this.end = end;\n    this.unit = unit || ( jQuery.cssNumber[ prop ] ? \"\" : \"px\" );\n  },\n  cur: function() {\n    var hooks = Tween.propHooks[ this.prop ];\n\n    return hooks && hooks.get ?\n      hooks.get( this ) :\n      Tween.propHooks._default.get( this );\n  },\n  run: function( percent ) {\n    var eased,\n      hooks = Tween.propHooks[ this.prop ];\n\n    if ( this.options.duration ) {\n      this.pos = eased = jQuery.easing[ this.easing ](\n        percent, this.options.duration * percent, 0, 1, this.options.duration\n      );\n    } else {\n      this.pos = eased = percent;\n    }\n    this.now = ( this.end - this.start ) * eased + this.start;\n\n    if ( this.options.step ) {\n      this.options.step.call( this.elem, this.now, this );\n    }\n\n    if ( hooks && hooks.set ) {\n      hooks.set( this );\n    } else {\n      Tween.propHooks._default.set( this );\n    }\n    return this;\n  }\n};\n\nTween.prototype.init.prototype = Tween.prototype;\n\nTween.propHooks = {\n  _default: {\n    get: function( tween ) {\n      var result;\n\n      if ( tween.elem[ tween.prop ] != null &&\n        (!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {\n        return tween.elem[ tween.prop ];\n      }\n\n      // passing an empty string as a 3rd parameter to .css will automatically\n      // attempt a parseFloat and fallback to a string if the parse fails\n      // so, simple values such as \"10px\" are parsed to Float.\n      // complex values such as \"rotate(1rad)\" are returned as is.\n      result = jQuery.css( tween.elem, tween.prop, \"\" );\n      // Empty strings, null, undefined and \"auto\" are converted to 0.\n      return !result || result === \"auto\" ? 0 : result;\n    },\n    set: function( tween ) {\n      // use step hook for back compat - use cssHook if its there - use .style if its\n      // available and use plain properties where available\n      if ( jQuery.fx.step[ tween.prop ] ) {\n        jQuery.fx.step[ tween.prop ]( tween );\n      } else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {\n        jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );\n      } else {\n        tween.elem[ tween.prop ] = tween.now;\n      }\n    }\n  }\n};\n\n// Support: IE <=9\n// Panic based approach to setting things on disconnected nodes\n\nTween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {\n  set: function( tween ) {\n    if ( tween.elem.nodeType && tween.elem.parentNode ) {\n      tween.elem[ tween.prop ] = tween.now;\n    }\n  }\n};\n\njQuery.easing = {\n  linear: function( p ) {\n    return p;\n  },\n  swing: function( p ) {\n    return 0.5 - Math.cos( p * Math.PI ) / 2;\n  }\n};\n\njQuery.fx = Tween.prototype.init;\n\n// Back Compat <1.8 extension point\njQuery.fx.step = {};\n\n\n\n\nvar\n  fxNow, timerId,\n  rfxtypes = /^(?:toggle|show|hide)$/,\n  rfxnum = new RegExp( \"^(?:([+-])=|)(\" + pnum + \")([a-z%]*)$\", \"i\" ),\n  rrun = /queueHooks$/,\n  animationPrefilters = [ defaultPrefilter ],\n  tweeners = {\n    \"*\": [ function( prop, value ) {\n      var tween = this.createTween( prop, value ),\n        target = tween.cur(),\n        parts = rfxnum.exec( value ),\n        unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? \"\" : \"px\" ),\n\n        // Starting value computation is required for potential unit mismatches\n        start = ( jQuery.cssNumber[ prop ] || unit !== \"px\" && +target ) &&\n          rfxnum.exec( jQuery.css( tween.elem, prop ) ),\n        scale = 1,\n        maxIterations = 20;\n\n      if ( start && start[ 3 ] !== unit ) {\n        // Trust units reported by jQuery.css\n        unit = unit || start[ 3 ];\n\n        // Make sure we update the tween properties later on\n        parts = parts || [];\n\n        // Iteratively approximate from a nonzero starting point\n        start = +target || 1;\n\n        do {\n          // If previous iteration zeroed out, double until we get *something*\n          // Use a string for doubling factor so we don't accidentally see scale as unchanged below\n          scale = scale || \".5\";\n\n          // Adjust and apply\n          start = start / scale;\n          jQuery.style( tween.elem, prop, start + unit );\n\n        // Update scale, tolerating zero or NaN from tween.cur()\n        // And breaking the loop if scale is unchanged or perfect, or if we've just had enough\n        } while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );\n      }\n\n      // Update tween properties\n      if ( parts ) {\n        start = tween.start = +start || +target || 0;\n        tween.unit = unit;\n        // If a +=/-= token was provided, we're doing a relative animation\n        tween.end = parts[ 1 ] ?\n          start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :\n          +parts[ 2 ];\n      }\n\n      return tween;\n    } ]\n  };\n\n// Animations created synchronously will run synchronously\nfunction createFxNow() {\n  setTimeout(function() {\n    fxNow = undefined;\n  });\n  return ( fxNow = jQuery.now() );\n}\n\n// Generate parameters to create a standard animation\nfunction genFx( type, includeWidth ) {\n  var which,\n    attrs = { height: type },\n    i = 0;\n\n  // if we include width, step value is 1 to do all cssExpand values,\n  // if we don't include width, step value is 2 to skip over Left and Right\n  includeWidth = includeWidth ? 1 : 0;\n  for ( ; i < 4 ; i += 2 - includeWidth ) {\n    which = cssExpand[ i ];\n    attrs[ \"margin\" + which ] = attrs[ \"padding\" + which ] = type;\n  }\n\n  if ( includeWidth ) {\n    attrs.opacity = attrs.width = type;\n  }\n\n  return attrs;\n}\n\nfunction createTween( value, prop, animation ) {\n  var tween,\n    collection = ( tweeners[ prop ] || [] ).concat( tweeners[ \"*\" ] ),\n    index = 0,\n    length = collection.length;\n  for ( ; index < length; index++ ) {\n    if ( (tween = collection[ index ].call( animation, prop, value )) ) {\n\n      // we're done with this property\n      return tween;\n    }\n  }\n}\n\nfunction defaultPrefilter( elem, props, opts ) {\n  /* jshint validthis: true */\n  var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,\n    anim = this,\n    orig = {},\n    style = elem.style,\n    hidden = elem.nodeType && isHidden( elem ),\n    dataShow = jQuery._data( elem, \"fxshow\" );\n\n  // handle queue: false promises\n  if ( !opts.queue ) {\n    hooks = jQuery._queueHooks( elem, \"fx\" );\n    if ( hooks.unqueued == null ) {\n      hooks.unqueued = 0;\n      oldfire = hooks.empty.fire;\n      hooks.empty.fire = function() {\n        if ( !hooks.unqueued ) {\n          oldfire();\n        }\n      };\n    }\n    hooks.unqueued++;\n\n    anim.always(function() {\n      // doing this makes sure that the complete handler will be called\n      // before this completes\n      anim.always(function() {\n        hooks.unqueued--;\n        if ( !jQuery.queue( elem, \"fx\" ).length ) {\n          hooks.empty.fire();\n        }\n      });\n    });\n  }\n\n  // height/width overflow pass\n  if ( elem.nodeType === 1 && ( \"height\" in props || \"width\" in props ) ) {\n    // Make sure that nothing sneaks out\n    // Record all 3 overflow attributes because IE does not\n    // change the overflow attribute when overflowX and\n    // overflowY are set to the same value\n    opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];\n\n    // Set display property to inline-block for height/width\n    // animations on inline elements that are having width/height animated\n    display = jQuery.css( elem, \"display\" );\n\n    // Test default display if display is currently \"none\"\n    checkDisplay = display === \"none\" ?\n      jQuery._data( elem, \"olddisplay\" ) || defaultDisplay( elem.nodeName ) : display;\n\n    if ( checkDisplay === \"inline\" && jQuery.css( elem, \"float\" ) === \"none\" ) {\n\n      // inline-level elements accept inline-block;\n      // block-level elements need to be inline with layout\n      if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === \"inline\" ) {\n        style.display = \"inline-block\";\n      } else {\n        style.zoom = 1;\n      }\n    }\n  }\n\n  if ( opts.overflow ) {\n    style.overflow = \"hidden\";\n    if ( !support.shrinkWrapBlocks() ) {\n      anim.always(function() {\n        style.overflow = opts.overflow[ 0 ];\n        style.overflowX = opts.overflow[ 1 ];\n        style.overflowY = opts.overflow[ 2 ];\n      });\n    }\n  }\n\n  // show/hide pass\n  for ( prop in props ) {\n    value = props[ prop ];\n    if ( rfxtypes.exec( value ) ) {\n      delete props[ prop ];\n      toggle = toggle || value === \"toggle\";\n      if ( value === ( hidden ? \"hide\" : \"show\" ) ) {\n\n        // If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden\n        if ( value === \"show\" && dataShow && dataShow[ prop ] !== undefined ) {\n          hidden = true;\n        } else {\n          continue;\n        }\n      }\n      orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );\n\n    // Any non-fx value stops us from restoring the original display value\n    } else {\n      display = undefined;\n    }\n  }\n\n  if ( !jQuery.isEmptyObject( orig ) ) {\n    if ( dataShow ) {\n      if ( \"hidden\" in dataShow ) {\n        hidden = dataShow.hidden;\n      }\n    } else {\n      dataShow = jQuery._data( elem, \"fxshow\", {} );\n    }\n\n    // store state if its toggle - enables .stop().toggle() to \"reverse\"\n    if ( toggle ) {\n      dataShow.hidden = !hidden;\n    }\n    if ( hidden ) {\n      jQuery( elem ).show();\n    } else {\n      anim.done(function() {\n        jQuery( elem ).hide();\n      });\n    }\n    anim.done(function() {\n      var prop;\n      jQuery._removeData( elem, \"fxshow\" );\n      for ( prop in orig ) {\n        jQuery.style( elem, prop, orig[ prop ] );\n      }\n    });\n    for ( prop in orig ) {\n      tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );\n\n      if ( !( prop in dataShow ) ) {\n        dataShow[ prop ] = tween.start;\n        if ( hidden ) {\n          tween.end = tween.start;\n          tween.start = prop === \"width\" || prop === \"height\" ? 1 : 0;\n        }\n      }\n    }\n\n  // If this is a noop like .hide().hide(), restore an overwritten display value\n  } else if ( (display === \"none\" ? defaultDisplay( elem.nodeName ) : display) === \"inline\" ) {\n    style.display = display;\n  }\n}\n\nfunction propFilter( props, specialEasing ) {\n  var index, name, easing, value, hooks;\n\n  // camelCase, specialEasing and expand cssHook pass\n  for ( index in props ) {\n    name = jQuery.camelCase( index );\n    easing = specialEasing[ name ];\n    value = props[ index ];\n    if ( jQuery.isArray( value ) ) {\n      easing = value[ 1 ];\n      value = props[ index ] = value[ 0 ];\n    }\n\n    if ( index !== name ) {\n      props[ name ] = value;\n      delete props[ index ];\n    }\n\n    hooks = jQuery.cssHooks[ name ];\n    if ( hooks && \"expand\" in hooks ) {\n      value = hooks.expand( value );\n      delete props[ name ];\n\n      // not quite $.extend, this wont overwrite keys already present.\n      // also - reusing 'index' from above because we have the correct \"name\"\n      for ( index in value ) {\n        if ( !( index in props ) ) {\n          props[ index ] = value[ index ];\n          specialEasing[ index ] = easing;\n        }\n      }\n    } else {\n      specialEasing[ name ] = easing;\n    }\n  }\n}\n\nfunction Animation( elem, properties, options ) {\n  var result,\n    stopped,\n    index = 0,\n    length = animationPrefilters.length,\n    deferred = jQuery.Deferred().always( function() {\n      // don't match elem in the :animated selector\n      delete tick.elem;\n    }),\n    tick = function() {\n      if ( stopped ) {\n        return false;\n      }\n      var currentTime = fxNow || createFxNow(),\n        remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),\n        // archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)\n        temp = remaining / animation.duration || 0,\n        percent = 1 - temp,\n        index = 0,\n        length = animation.tweens.length;\n\n      for ( ; index < length ; index++ ) {\n        animation.tweens[ index ].run( percent );\n      }\n\n      deferred.notifyWith( elem, [ animation, percent, remaining ]);\n\n      if ( percent < 1 && length ) {\n        return remaining;\n      } else {\n        deferred.resolveWith( elem, [ animation ] );\n        return false;\n      }\n    },\n    animation = deferred.promise({\n      elem: elem,\n      props: jQuery.extend( {}, properties ),\n      opts: jQuery.extend( true, { specialEasing: {} }, options ),\n      originalProperties: properties,\n      originalOptions: options,\n      startTime: fxNow || createFxNow(),\n      duration: options.duration,\n      tweens: [],\n      createTween: function( prop, end ) {\n        var tween = jQuery.Tween( elem, animation.opts, prop, end,\n            animation.opts.specialEasing[ prop ] || animation.opts.easing );\n        animation.tweens.push( tween );\n        return tween;\n      },\n      stop: function( gotoEnd ) {\n        var index = 0,\n          // if we are going to the end, we want to run all the tweens\n          // otherwise we skip this part\n          length = gotoEnd ? animation.tweens.length : 0;\n        if ( stopped ) {\n          return this;\n        }\n        stopped = true;\n        for ( ; index < length ; index++ ) {\n          animation.tweens[ index ].run( 1 );\n        }\n\n        // resolve when we played the last frame\n        // otherwise, reject\n        if ( gotoEnd ) {\n          deferred.resolveWith( elem, [ animation, gotoEnd ] );\n        } else {\n          deferred.rejectWith( elem, [ animation, gotoEnd ] );\n        }\n        return this;\n      }\n    }),\n    props = animation.props;\n\n  propFilter( props, animation.opts.specialEasing );\n\n  for ( ; index < length ; index++ ) {\n    result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );\n    if ( result ) {\n      return result;\n    }\n  }\n\n  jQuery.map( props, createTween, animation );\n\n  if ( jQuery.isFunction( animation.opts.start ) ) {\n    animation.opts.start.call( elem, animation );\n  }\n\n  jQuery.fx.timer(\n    jQuery.extend( tick, {\n      elem: elem,\n      anim: animation,\n      queue: animation.opts.queue\n    })\n  );\n\n  // attach callbacks from options\n  return animation.progress( animation.opts.progress )\n    .done( animation.opts.done, animation.opts.complete )\n    .fail( animation.opts.fail )\n    .always( animation.opts.always );\n}\n\njQuery.Animation = jQuery.extend( Animation, {\n  tweener: function( props, callback ) {\n    if ( jQuery.isFunction( props ) ) {\n      callback = props;\n      props = [ \"*\" ];\n    } else {\n      props = props.split(\" \");\n    }\n\n    var prop,\n      index = 0,\n      length = props.length;\n\n    for ( ; index < length ; index++ ) {\n      prop = props[ index ];\n      tweeners[ prop ] = tweeners[ prop ] || [];\n      tweeners[ prop ].unshift( callback );\n    }\n  },\n\n  prefilter: function( callback, prepend ) {\n    if ( prepend ) {\n      animationPrefilters.unshift( callback );\n    } else {\n      animationPrefilters.push( callback );\n    }\n  }\n});\n\njQuery.speed = function( speed, easing, fn ) {\n  var opt = speed && typeof speed === \"object\" ? jQuery.extend( {}, speed ) : {\n    complete: fn || !fn && easing ||\n      jQuery.isFunction( speed ) && speed,\n    duration: speed,\n    easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing\n  };\n\n  opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === \"number\" ? opt.duration :\n    opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;\n\n  // normalize opt.queue - true/undefined/null -> \"fx\"\n  if ( opt.queue == null || opt.queue === true ) {\n    opt.queue = \"fx\";\n  }\n\n  // Queueing\n  opt.old = opt.complete;\n\n  opt.complete = function() {\n    if ( jQuery.isFunction( opt.old ) ) {\n      opt.old.call( this );\n    }\n\n    if ( opt.queue ) {\n      jQuery.dequeue( this, opt.queue );\n    }\n  };\n\n  return opt;\n};\n\njQuery.fn.extend({\n  fadeTo: function( speed, to, easing, callback ) {\n\n    // show any hidden elements after setting opacity to 0\n    return this.filter( isHidden ).css( \"opacity\", 0 ).show()\n\n      // animate to the value specified\n      .end().animate({ opacity: to }, speed, easing, callback );\n  },\n  animate: function( prop, speed, easing, callback ) {\n    var empty = jQuery.isEmptyObject( prop ),\n      optall = jQuery.speed( speed, easing, callback ),\n      doAnimation = function() {\n        // Operate on a copy of prop so per-property easing won't be lost\n        var anim = Animation( this, jQuery.extend( {}, prop ), optall );\n\n        // Empty animations, or finishing resolves immediately\n        if ( empty || jQuery._data( this, \"finish\" ) ) {\n          anim.stop( true );\n        }\n      };\n      doAnimation.finish = doAnimation;\n\n    return empty || optall.queue === false ?\n      this.each( doAnimation ) :\n      this.queue( optall.queue, doAnimation );\n  },\n  stop: function( type, clearQueue, gotoEnd ) {\n    var stopQueue = function( hooks ) {\n      var stop = hooks.stop;\n      delete hooks.stop;\n      stop( gotoEnd );\n    };\n\n    if ( typeof type !== \"string\" ) {\n      gotoEnd = clearQueue;\n      clearQueue = type;\n      type = undefined;\n    }\n    if ( clearQueue && type !== false ) {\n      this.queue( type || \"fx\", [] );\n    }\n\n    return this.each(function() {\n      var dequeue = true,\n        index = type != null && type + \"queueHooks\",\n        timers = jQuery.timers,\n        data = jQuery._data( this );\n\n      if ( index ) {\n        if ( data[ index ] && data[ index ].stop ) {\n          stopQueue( data[ index ] );\n        }\n      } else {\n        for ( index in data ) {\n          if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {\n            stopQueue( data[ index ] );\n          }\n        }\n      }\n\n      for ( index = timers.length; index--; ) {\n        if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {\n          timers[ index ].anim.stop( gotoEnd );\n          dequeue = false;\n          timers.splice( index, 1 );\n        }\n      }\n\n      // start the next in the queue if the last step wasn't forced\n      // timers currently will call their complete callbacks, which will dequeue\n      // but only if they were gotoEnd\n      if ( dequeue || !gotoEnd ) {\n        jQuery.dequeue( this, type );\n      }\n    });\n  },\n  finish: function( type ) {\n    if ( type !== false ) {\n      type = type || \"fx\";\n    }\n    return this.each(function() {\n      var index,\n        data = jQuery._data( this ),\n        queue = data[ type + \"queue\" ],\n        hooks = data[ type + \"queueHooks\" ],\n        timers = jQuery.timers,\n        length = queue ? queue.length : 0;\n\n      // enable finishing flag on private data\n      data.finish = true;\n\n      // empty the queue first\n      jQuery.queue( this, type, [] );\n\n      if ( hooks && hooks.stop ) {\n        hooks.stop.call( this, true );\n      }\n\n      // look for any active animations, and finish them\n      for ( index = timers.length; index--; ) {\n        if ( timers[ index ].elem === this && timers[ index ].queue === type ) {\n          timers[ index ].anim.stop( true );\n          timers.splice( index, 1 );\n        }\n      }\n\n      // look for any animations in the old queue and finish them\n      for ( index = 0; index < length; index++ ) {\n        if ( queue[ index ] && queue[ index ].finish ) {\n          queue[ index ].finish.call( this );\n        }\n      }\n\n      // turn off finishing flag\n      delete data.finish;\n    });\n  }\n});\n\njQuery.each([ \"toggle\", \"show\", \"hide\" ], function( i, name ) {\n  var cssFn = jQuery.fn[ name ];\n  jQuery.fn[ name ] = function( speed, easing, callback ) {\n    return speed == null || typeof speed === \"boolean\" ?\n      cssFn.apply( this, arguments ) :\n      this.animate( genFx( name, true ), speed, easing, callback );\n  };\n});\n\n// Generate shortcuts for custom animations\njQuery.each({\n  slideDown: genFx(\"show\"),\n  slideUp: genFx(\"hide\"),\n  slideToggle: genFx(\"toggle\"),\n  fadeIn: { opacity: \"show\" },\n  fadeOut: { opacity: \"hide\" },\n  fadeToggle: { opacity: \"toggle\" }\n}, function( name, props ) {\n  jQuery.fn[ name ] = function( speed, easing, callback ) {\n    return this.animate( props, speed, easing, callback );\n  };\n});\n\njQuery.timers = [];\njQuery.fx.tick = function() {\n  var timer,\n    timers = jQuery.timers,\n    i = 0;\n\n  fxNow = jQuery.now();\n\n  for ( ; i < timers.length; i++ ) {\n    timer = timers[ i ];\n    // Checks the timer has not already been removed\n    if ( !timer() && timers[ i ] === timer ) {\n      timers.splice( i--, 1 );\n    }\n  }\n\n  if ( !timers.length ) {\n    jQuery.fx.stop();\n  }\n  fxNow = undefined;\n};\n\njQuery.fx.timer = function( timer ) {\n  jQuery.timers.push( timer );\n  if ( timer() ) {\n    jQuery.fx.start();\n  } else {\n    jQuery.timers.pop();\n  }\n};\n\njQuery.fx.interval = 13;\n\njQuery.fx.start = function() {\n  if ( !timerId ) {\n    timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );\n  }\n};\n\njQuery.fx.stop = function() {\n  clearInterval( timerId );\n  timerId = null;\n};\n\njQuery.fx.speeds = {\n  slow: 600,\n  fast: 200,\n  // Default speed\n  _default: 400\n};\n\n\n// Based off of the plugin by Clint Helfers, with permission.\n// http://blindsignals.com/index.php/2009/07/jquery-delay/\njQuery.fn.delay = function( time, type ) {\n  time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;\n  type = type || \"fx\";\n\n  return this.queue( type, function( next, hooks ) {\n    var timeout = setTimeout( next, time );\n    hooks.stop = function() {\n      clearTimeout( timeout );\n    };\n  });\n};\n\n\n(function() {\n  // Minified: var a,b,c,d,e\n  var input, div, select, a, opt;\n\n  // Setup\n  div = document.createElement( \"div\" );\n  div.setAttribute( \"className\", \"t\" );\n  div.innerHTML = \"  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>\";\n  a = div.getElementsByTagName(\"a\")[ 0 ];\n\n  // First batch of tests.\n  select = document.createElement(\"select\");\n  opt = select.appendChild( document.createElement(\"option\") );\n  input = div.getElementsByTagName(\"input\")[ 0 ];\n\n  a.style.cssText = \"top:1px\";\n\n  // Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)\n  support.getSetAttribute = div.className !== \"t\";\n\n  // Get the style information from getAttribute\n  // (IE uses .cssText instead)\n  support.style = /top/.test( a.getAttribute(\"style\") );\n\n  // Make sure that URLs aren't manipulated\n  // (IE normalizes it by default)\n  support.hrefNormalized = a.getAttribute(\"href\") === \"/a\";\n\n  // Check the default checkbox/radio value (\"\" on WebKit; \"on\" elsewhere)\n  support.checkOn = !!input.value;\n\n  // Make sure that a selected-by-default option has a working selected property.\n  // (WebKit defaults to false instead of true, IE too, if it's in an optgroup)\n  support.optSelected = opt.selected;\n\n  // Tests for enctype support on a form (#6743)\n  support.enctype = !!document.createElement(\"form\").enctype;\n\n  // Make sure that the options inside disabled selects aren't marked as disabled\n  // (WebKit marks them as disabled)\n  select.disabled = true;\n  support.optDisabled = !opt.disabled;\n\n  // Support: IE8 only\n  // Check if we can trust getAttribute(\"value\")\n  input = document.createElement( \"input\" );\n  input.setAttribute( \"value\", \"\" );\n  support.input = input.getAttribute( \"value\" ) === \"\";\n\n  // Check if an input maintains its value after becoming a radio\n  input.value = \"t\";\n  input.setAttribute( \"type\", \"radio\" );\n  support.radioValue = input.value === \"t\";\n})();\n\n\nvar rreturn = /\\r/g;\n\njQuery.fn.extend({\n  val: function( value ) {\n    var hooks, ret, isFunction,\n      elem = this[0];\n\n    if ( !arguments.length ) {\n      if ( elem ) {\n        hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];\n\n        if ( hooks && \"get\" in hooks && (ret = hooks.get( elem, \"value\" )) !== undefined ) {\n          return ret;\n        }\n\n        ret = elem.value;\n\n        return typeof ret === \"string\" ?\n          // handle most common string cases\n          ret.replace(rreturn, \"\") :\n          // handle cases where value is null/undef or number\n          ret == null ? \"\" : ret;\n      }\n\n      return;\n    }\n\n    isFunction = jQuery.isFunction( value );\n\n    return this.each(function( i ) {\n      var val;\n\n      if ( this.nodeType !== 1 ) {\n        return;\n      }\n\n      if ( isFunction ) {\n        val = value.call( this, i, jQuery( this ).val() );\n      } else {\n        val = value;\n      }\n\n      // Treat null/undefined as \"\"; convert numbers to string\n      if ( val == null ) {\n        val = \"\";\n      } else if ( typeof val === \"number\" ) {\n        val += \"\";\n      } else if ( jQuery.isArray( val ) ) {\n        val = jQuery.map( val, function( value ) {\n          return value == null ? \"\" : value + \"\";\n        });\n      }\n\n      hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];\n\n      // If set returns undefined, fall back to normal setting\n      if ( !hooks || !(\"set\" in hooks) || hooks.set( this, val, \"value\" ) === undefined ) {\n        this.value = val;\n      }\n    });\n  }\n});\n\njQuery.extend({\n  valHooks: {\n    option: {\n      get: function( elem ) {\n        var val = jQuery.find.attr( elem, \"value\" );\n        return val != null ?\n          val :\n          // Support: IE10-11+\n          // option.text throws exceptions (#14686, #14858)\n          jQuery.trim( jQuery.text( elem ) );\n      }\n    },\n    select: {\n      get: function( elem ) {\n        var value, option,\n          options = elem.options,\n          index = elem.selectedIndex,\n          one = elem.type === \"select-one\" || index < 0,\n          values = one ? null : [],\n          max = one ? index + 1 : options.length,\n          i = index < 0 ?\n            max :\n            one ? index : 0;\n\n        // Loop through all the selected options\n        for ( ; i < max; i++ ) {\n          option = options[ i ];\n\n          // oldIE doesn't update selected after form reset (#2551)\n          if ( ( option.selected || i === index ) &&\n              // Don't return options that are disabled or in a disabled optgroup\n              ( support.optDisabled ? !option.disabled : option.getAttribute(\"disabled\") === null ) &&\n              ( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, \"optgroup\" ) ) ) {\n\n            // Get the specific value for the option\n            value = jQuery( option ).val();\n\n            // We don't need an array for one selects\n            if ( one ) {\n              return value;\n            }\n\n            // Multi-Selects return an array\n            values.push( value );\n          }\n        }\n\n        return values;\n      },\n\n      set: function( elem, value ) {\n        var optionSet, option,\n          options = elem.options,\n          values = jQuery.makeArray( value ),\n          i = options.length;\n\n        while ( i-- ) {\n          option = options[ i ];\n\n          if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {\n\n            // Support: IE6\n            // When new option element is added to select box we need to\n            // force reflow of newly added node in order to workaround delay\n            // of initialization properties\n            try {\n              option.selected = optionSet = true;\n\n            } catch ( _ ) {\n\n              // Will be executed only in IE6\n              option.scrollHeight;\n            }\n\n          } else {\n            option.selected = false;\n          }\n        }\n\n        // Force browsers to behave consistently when non-matching value is set\n        if ( !optionSet ) {\n          elem.selectedIndex = -1;\n        }\n\n        return options;\n      }\n    }\n  }\n});\n\n// Radios and checkboxes getter/setter\njQuery.each([ \"radio\", \"checkbox\" ], function() {\n  jQuery.valHooks[ this ] = {\n    set: function( elem, value ) {\n      if ( jQuery.isArray( value ) ) {\n        return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );\n      }\n    }\n  };\n  if ( !support.checkOn ) {\n    jQuery.valHooks[ this ].get = function( elem ) {\n      // Support: Webkit\n      // \"\" is returned instead of \"on\" if a value isn't specified\n      return elem.getAttribute(\"value\") === null ? \"on\" : elem.value;\n    };\n  }\n});\n\n\n\n\nvar nodeHook, boolHook,\n  attrHandle = jQuery.expr.attrHandle,\n  ruseDefault = /^(?:checked|selected)$/i,\n  getSetAttribute = support.getSetAttribute,\n  getSetInput = support.input;\n\njQuery.fn.extend({\n  attr: function( name, value ) {\n    return access( this, jQuery.attr, name, value, arguments.length > 1 );\n  },\n\n  removeAttr: function( name ) {\n    return this.each(function() {\n      jQuery.removeAttr( this, name );\n    });\n  }\n});\n\njQuery.extend({\n  attr: function( elem, name, value ) {\n    var hooks, ret,\n      nType = elem.nodeType;\n\n    // don't get/set attributes on text, comment and attribute nodes\n    if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {\n      return;\n    }\n\n    // Fallback to prop when attributes are not supported\n    if ( typeof elem.getAttribute === strundefined ) {\n      return jQuery.prop( elem, name, value );\n    }\n\n    // All attributes are lowercase\n    // Grab necessary hook if one is defined\n    if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {\n      name = name.toLowerCase();\n      hooks = jQuery.attrHooks[ name ] ||\n        ( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );\n    }\n\n    if ( value !== undefined ) {\n\n      if ( value === null ) {\n        jQuery.removeAttr( elem, name );\n\n      } else if ( hooks && \"set\" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {\n        return ret;\n\n      } else {\n        elem.setAttribute( name, value + \"\" );\n        return value;\n      }\n\n    } else if ( hooks && \"get\" in hooks && (ret = hooks.get( elem, name )) !== null ) {\n      return ret;\n\n    } else {\n      ret = jQuery.find.attr( elem, name );\n\n      // Non-existent attributes return null, we normalize to undefined\n      return ret == null ?\n        undefined :\n        ret;\n    }\n  },\n\n  removeAttr: function( elem, value ) {\n    var name, propName,\n      i = 0,\n      attrNames = value && value.match( rnotwhite );\n\n    if ( attrNames && elem.nodeType === 1 ) {\n      while ( (name = attrNames[i++]) ) {\n        propName = jQuery.propFix[ name ] || name;\n\n        // Boolean attributes get special treatment (#10870)\n        if ( jQuery.expr.match.bool.test( name ) ) {\n          // Set corresponding property to false\n          if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {\n            elem[ propName ] = false;\n          // Support: IE<9\n          // Also clear defaultChecked/defaultSelected (if appropriate)\n          } else {\n            elem[ jQuery.camelCase( \"default-\" + name ) ] =\n              elem[ propName ] = false;\n          }\n\n        // See #9699 for explanation of this approach (setting first, then removal)\n        } else {\n          jQuery.attr( elem, name, \"\" );\n        }\n\n        elem.removeAttribute( getSetAttribute ? name : propName );\n      }\n    }\n  },\n\n  attrHooks: {\n    type: {\n      set: function( elem, value ) {\n        if ( !support.radioValue && value === \"radio\" && jQuery.nodeName(elem, \"input\") ) {\n          // Setting the type on a radio button after the value resets the value in IE6-9\n          // Reset value to default in case type is set after value during creation\n          var val = elem.value;\n          elem.setAttribute( \"type\", value );\n          if ( val ) {\n            elem.value = val;\n          }\n          return value;\n        }\n      }\n    }\n  }\n});\n\n// Hook for boolean attributes\nboolHook = {\n  set: function( elem, value, name ) {\n    if ( value === false ) {\n      // Remove boolean attributes when set to false\n      jQuery.removeAttr( elem, name );\n    } else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {\n      // IE<8 needs the *property* name\n      elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );\n\n    // Use defaultChecked and defaultSelected for oldIE\n    } else {\n      elem[ jQuery.camelCase( \"default-\" + name ) ] = elem[ name ] = true;\n    }\n\n    return name;\n  }\n};\n\n// Retrieve booleans specially\njQuery.each( jQuery.expr.match.bool.source.match( /\\w+/g ), function( i, name ) {\n\n  var getter = attrHandle[ name ] || jQuery.find.attr;\n\n  attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?\n    function( elem, name, isXML ) {\n      var ret, handle;\n      if ( !isXML ) {\n        // Avoid an infinite loop by temporarily removing this function from the getter\n        handle = attrHandle[ name ];\n        attrHandle[ name ] = ret;\n        ret = getter( elem, name, isXML ) != null ?\n          name.toLowerCase() :\n          null;\n        attrHandle[ name ] = handle;\n      }\n      return ret;\n    } :\n    function( elem, name, isXML ) {\n      if ( !isXML ) {\n        return elem[ jQuery.camelCase( \"default-\" + name ) ] ?\n          name.toLowerCase() :\n          null;\n      }\n    };\n});\n\n// fix oldIE attroperties\nif ( !getSetInput || !getSetAttribute ) {\n  jQuery.attrHooks.value = {\n    set: function( elem, value, name ) {\n      if ( jQuery.nodeName( elem, \"input\" ) ) {\n        // Does not return so that setAttribute is also used\n        elem.defaultValue = value;\n      } else {\n        // Use nodeHook if defined (#1954); otherwise setAttribute is fine\n        return nodeHook && nodeHook.set( elem, value, name );\n      }\n    }\n  };\n}\n\n// IE6/7 do not support getting/setting some attributes with get/setAttribute\nif ( !getSetAttribute ) {\n\n  // Use this for any attribute in IE6/7\n  // This fixes almost every IE6/7 issue\n  nodeHook = {\n    set: function( elem, value, name ) {\n      // Set the existing or create a new attribute node\n      var ret = elem.getAttributeNode( name );\n      if ( !ret ) {\n        elem.setAttributeNode(\n          (ret = elem.ownerDocument.createAttribute( name ))\n        );\n      }\n\n      ret.value = value += \"\";\n\n      // Break association with cloned elements by also using setAttribute (#9646)\n      if ( name === \"value\" || value === elem.getAttribute( name ) ) {\n        return value;\n      }\n    }\n  };\n\n  // Some attributes are constructed with empty-string values when not defined\n  attrHandle.id = attrHandle.name = attrHandle.coords =\n    function( elem, name, isXML ) {\n      var ret;\n      if ( !isXML ) {\n        return (ret = elem.getAttributeNode( name )) && ret.value !== \"\" ?\n          ret.value :\n          null;\n      }\n    };\n\n  // Fixing value retrieval on a button requires this module\n  jQuery.valHooks.button = {\n    get: function( elem, name ) {\n      var ret = elem.getAttributeNode( name );\n      if ( ret && ret.specified ) {\n        return ret.value;\n      }\n    },\n    set: nodeHook.set\n  };\n\n  // Set contenteditable to false on removals(#10429)\n  // Setting to empty string throws an error as an invalid value\n  jQuery.attrHooks.contenteditable = {\n    set: function( elem, value, name ) {\n      nodeHook.set( elem, value === \"\" ? false : value, name );\n    }\n  };\n\n  // Set width and height to auto instead of 0 on empty string( Bug #8150 )\n  // This is for removals\n  jQuery.each([ \"width\", \"height\" ], function( i, name ) {\n    jQuery.attrHooks[ name ] = {\n      set: function( elem, value ) {\n        if ( value === \"\" ) {\n          elem.setAttribute( name, \"auto\" );\n          return value;\n        }\n      }\n    };\n  });\n}\n\nif ( !support.style ) {\n  jQuery.attrHooks.style = {\n    get: function( elem ) {\n      // Return undefined in the case of empty string\n      // Note: IE uppercases css property names, but if we were to .toLowerCase()\n      // .cssText, that would destroy case senstitivity in URL's, like in \"background\"\n      return elem.style.cssText || undefined;\n    },\n    set: function( elem, value ) {\n      return ( elem.style.cssText = value + \"\" );\n    }\n  };\n}\n\n\n\n\nvar rfocusable = /^(?:input|select|textarea|button|object)$/i,\n  rclickable = /^(?:a|area)$/i;\n\njQuery.fn.extend({\n  prop: function( name, value ) {\n    return access( this, jQuery.prop, name, value, arguments.length > 1 );\n  },\n\n  removeProp: function( name ) {\n    name = jQuery.propFix[ name ] || name;\n    return this.each(function() {\n      // try/catch handles cases where IE balks (such as removing a property on window)\n      try {\n        this[ name ] = undefined;\n        delete this[ name ];\n      } catch( e ) {}\n    });\n  }\n});\n\njQuery.extend({\n  propFix: {\n    \"for\": \"htmlFor\",\n    \"class\": \"className\"\n  },\n\n  prop: function( elem, name, value ) {\n    var ret, hooks, notxml,\n      nType = elem.nodeType;\n\n    // don't get/set properties on text, comment and attribute nodes\n    if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {\n      return;\n    }\n\n    notxml = nType !== 1 || !jQuery.isXMLDoc( elem );\n\n    if ( notxml ) {\n      // Fix name and attach hooks\n      name = jQuery.propFix[ name ] || name;\n      hooks = jQuery.propHooks[ name ];\n    }\n\n    if ( value !== undefined ) {\n      return hooks && \"set\" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?\n        ret :\n        ( elem[ name ] = value );\n\n    } else {\n      return hooks && \"get\" in hooks && (ret = hooks.get( elem, name )) !== null ?\n        ret :\n        elem[ name ];\n    }\n  },\n\n  propHooks: {\n    tabIndex: {\n      get: function( elem ) {\n        // elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set\n        // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/\n        // Use proper attribute retrieval(#12072)\n        var tabindex = jQuery.find.attr( elem, \"tabindex\" );\n\n        return tabindex ?\n          parseInt( tabindex, 10 ) :\n          rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?\n            0 :\n            -1;\n      }\n    }\n  }\n});\n\n// Some attributes require a special call on IE\n// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx\nif ( !support.hrefNormalized ) {\n  // href/src property should get the full normalized URL (#10299/#12915)\n  jQuery.each([ \"href\", \"src\" ], function( i, name ) {\n    jQuery.propHooks[ name ] = {\n      get: function( elem ) {\n        return elem.getAttribute( name, 4 );\n      }\n    };\n  });\n}\n\n// Support: Safari, IE9+\n// mis-reports the default selected property of an option\n// Accessing the parent's selectedIndex property fixes it\nif ( !support.optSelected ) {\n  jQuery.propHooks.selected = {\n    get: function( elem ) {\n      var parent = elem.parentNode;\n\n      if ( parent ) {\n        parent.selectedIndex;\n\n        // Make sure that it also works with optgroups, see #5701\n        if ( parent.parentNode ) {\n          parent.parentNode.selectedIndex;\n        }\n      }\n      return null;\n    }\n  };\n}\n\njQuery.each([\n  \"tabIndex\",\n  \"readOnly\",\n  \"maxLength\",\n  \"cellSpacing\",\n  \"cellPadding\",\n  \"rowSpan\",\n  \"colSpan\",\n  \"useMap\",\n  \"frameBorder\",\n  \"contentEditable\"\n], function() {\n  jQuery.propFix[ this.toLowerCase() ] = this;\n});\n\n// IE6/7 call enctype encoding\nif ( !support.enctype ) {\n  jQuery.propFix.enctype = \"encoding\";\n}\n\n\n\n\nvar rclass = /[\\t\\r\\n\\f]/g;\n\njQuery.fn.extend({\n  addClass: function( value ) {\n    var classes, elem, cur, clazz, j, finalValue,\n      i = 0,\n      len = this.length,\n      proceed = typeof value === \"string\" && value;\n\n    if ( jQuery.isFunction( value ) ) {\n      return this.each(function( j ) {\n        jQuery( this ).addClass( value.call( this, j, this.className ) );\n      });\n    }\n\n    if ( proceed ) {\n      // The disjunction here is for better compressibility (see removeClass)\n      classes = ( value || \"\" ).match( rnotwhite ) || [];\n\n      for ( ; i < len; i++ ) {\n        elem = this[ i ];\n        cur = elem.nodeType === 1 && ( elem.className ?\n          ( \" \" + elem.className + \" \" ).replace( rclass, \" \" ) :\n          \" \"\n        );\n\n        if ( cur ) {\n          j = 0;\n          while ( (clazz = classes[j++]) ) {\n            if ( cur.indexOf( \" \" + clazz + \" \" ) < 0 ) {\n              cur += clazz + \" \";\n            }\n          }\n\n          // only assign if different to avoid unneeded rendering.\n          finalValue = jQuery.trim( cur );\n          if ( elem.className !== finalValue ) {\n            elem.className = finalValue;\n          }\n        }\n      }\n    }\n\n    return this;\n  },\n\n  removeClass: function( value ) {\n    var classes, elem, cur, clazz, j, finalValue,\n      i = 0,\n      len = this.length,\n      proceed = arguments.length === 0 || typeof value === \"string\" && value;\n\n    if ( jQuery.isFunction( value ) ) {\n      return this.each(function( j ) {\n        jQuery( this ).removeClass( value.call( this, j, this.className ) );\n      });\n    }\n    if ( proceed ) {\n      classes = ( value || \"\" ).match( rnotwhite ) || [];\n\n      for ( ; i < len; i++ ) {\n        elem = this[ i ];\n        // This expression is here for better compressibility (see addClass)\n        cur = elem.nodeType === 1 && ( elem.className ?\n          ( \" \" + elem.className + \" \" ).replace( rclass, \" \" ) :\n          \"\"\n        );\n\n        if ( cur ) {\n          j = 0;\n          while ( (clazz = classes[j++]) ) {\n            // Remove *all* instances\n            while ( cur.indexOf( \" \" + clazz + \" \" ) >= 0 ) {\n              cur = cur.replace( \" \" + clazz + \" \", \" \" );\n            }\n          }\n\n          // only assign if different to avoid unneeded rendering.\n          finalValue = value ? jQuery.trim( cur ) : \"\";\n          if ( elem.className !== finalValue ) {\n            elem.className = finalValue;\n          }\n        }\n      }\n    }\n\n    return this;\n  },\n\n  toggleClass: function( value, stateVal ) {\n    var type = typeof value;\n\n    if ( typeof stateVal === \"boolean\" && type === \"string\" ) {\n      return stateVal ? this.addClass( value ) : this.removeClass( value );\n    }\n\n    if ( jQuery.isFunction( value ) ) {\n      return this.each(function( i ) {\n        jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );\n      });\n    }\n\n    return this.each(function() {\n      if ( type === \"string\" ) {\n        // toggle individual class names\n        var className,\n          i = 0,\n          self = jQuery( this ),\n          classNames = value.match( rnotwhite ) || [];\n\n        while ( (className = classNames[ i++ ]) ) {\n          // check each className given, space separated list\n          if ( self.hasClass( className ) ) {\n            self.removeClass( className );\n          } else {\n            self.addClass( className );\n          }\n        }\n\n      // Toggle whole class name\n      } else if ( type === strundefined || type === \"boolean\" ) {\n        if ( this.className ) {\n          // store className if set\n          jQuery._data( this, \"__className__\", this.className );\n        }\n\n        // If the element has a class name or if we're passed \"false\",\n        // then remove the whole classname (if there was one, the above saved it).\n        // Otherwise bring back whatever was previously saved (if anything),\n        // falling back to the empty string if nothing was stored.\n        this.className = this.className || value === false ? \"\" : jQuery._data( this, \"__className__\" ) || \"\";\n      }\n    });\n  },\n\n  hasClass: function( selector ) {\n    var className = \" \" + selector + \" \",\n      i = 0,\n      l = this.length;\n    for ( ; i < l; i++ ) {\n      if ( this[i].nodeType === 1 && (\" \" + this[i].className + \" \").replace(rclass, \" \").indexOf( className ) >= 0 ) {\n        return true;\n      }\n    }\n\n    return false;\n  }\n});\n\n\n\n\n// Return jQuery for attributes-only inclusion\n\n\njQuery.each( (\"blur focus focusin focusout load resize scroll unload click dblclick \" +\n  \"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave \" +\n  \"change select submit keydown keypress keyup error contextmenu\").split(\" \"), function( i, name ) {\n\n  // Handle event binding\n  jQuery.fn[ name ] = function( data, fn ) {\n    return arguments.length > 0 ?\n      this.on( name, null, data, fn ) :\n      this.trigger( name );\n  };\n});\n\njQuery.fn.extend({\n  hover: function( fnOver, fnOut ) {\n    return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );\n  },\n\n  bind: function( types, data, fn ) {\n    return this.on( types, null, data, fn );\n  },\n  unbind: function( types, fn ) {\n    return this.off( types, null, fn );\n  },\n\n  delegate: function( selector, types, data, fn ) {\n    return this.on( types, selector, data, fn );\n  },\n  undelegate: function( selector, types, fn ) {\n    // ( namespace ) or ( selector, types [, fn] )\n    return arguments.length === 1 ? this.off( selector, \"**\" ) : this.off( types, selector || \"**\", fn );\n  }\n});\n\n\nvar nonce = jQuery.now();\n\nvar rquery = (/\\?/);\n\n\n\nvar rvalidtokens = /(,)|(\\[|{)|(}|])|\"(?:[^\"\\\\\\r\\n]|\\\\[\"\\\\\\/bfnrt]|\\\\u[\\da-fA-F]{4})*\"\\s*:?|true|false|null|-?(?!0\\d)\\d+(?:\\.\\d+|)(?:[eE][+-]?\\d+|)/g;\n\njQuery.parseJSON = function( data ) {\n  // Attempt to parse using the native JSON parser first\n  if ( window.JSON && window.JSON.parse ) {\n    // Support: Android 2.3\n    // Workaround failure to string-cast null input\n    return window.JSON.parse( data + \"\" );\n  }\n\n  var requireNonComma,\n    depth = null,\n    str = jQuery.trim( data + \"\" );\n\n  // Guard against invalid (and possibly dangerous) input by ensuring that nothing remains\n  // after removing valid tokens\n  return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {\n\n    // Force termination if we see a misplaced comma\n    if ( requireNonComma && comma ) {\n      depth = 0;\n    }\n\n    // Perform no more replacements after returning to outermost depth\n    if ( depth === 0 ) {\n      return token;\n    }\n\n    // Commas must not follow \"[\", \"{\", or \",\"\n    requireNonComma = open || comma;\n\n    // Determine new depth\n    // array/object open (\"[\" or \"{\"): depth += true - false (increment)\n    // array/object close (\"]\" or \"}\"): depth += false - true (decrement)\n    // other cases (\",\" or primitive): depth += true - true (numeric cast)\n    depth += !close - !open;\n\n    // Remove this token\n    return \"\";\n  }) ) ?\n    ( Function( \"return \" + str ) )() :\n    jQuery.error( \"Invalid JSON: \" + data );\n};\n\n\n// Cross-browser xml parsing\njQuery.parseXML = function( data ) {\n  var xml, tmp;\n  if ( !data || typeof data !== \"string\" ) {\n    return null;\n  }\n  try {\n    if ( window.DOMParser ) { // Standard\n      tmp = new DOMParser();\n      xml = tmp.parseFromString( data, \"text/xml\" );\n    } else { // IE\n      xml = new ActiveXObject( \"Microsoft.XMLDOM\" );\n      xml.async = \"false\";\n      xml.loadXML( data );\n    }\n  } catch( e ) {\n    xml = undefined;\n  }\n  if ( !xml || !xml.documentElement || xml.getElementsByTagName( \"parsererror\" ).length ) {\n    jQuery.error( \"Invalid XML: \" + data );\n  }\n  return xml;\n};\n\n\nvar\n  // Document location\n  ajaxLocParts,\n  ajaxLocation,\n\n  rhash = /#.*$/,\n  rts = /([?&])_=[^&]*/,\n  rheaders = /^(.*?):[ \\t]*([^\\r\\n]*)\\r?$/mg, // IE leaves an \\r character at EOL\n  // #7653, #8125, #8152: local protocol detection\n  rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,\n  rnoContent = /^(?:GET|HEAD)$/,\n  rprotocol = /^\\/\\//,\n  rurl = /^([\\w.+-]+:)(?:\\/\\/(?:[^\\/?#]*@|)([^\\/?#:]*)(?::(\\d+)|)|)/,\n\n  /* Prefilters\n   * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)\n   * 2) These are called:\n   *    - BEFORE asking for a transport\n   *    - AFTER param serialization (s.data is a string if s.processData is true)\n   * 3) key is the dataType\n   * 4) the catchall symbol \"*\" can be used\n   * 5) execution will start with transport dataType and THEN continue down to \"*\" if needed\n   */\n  prefilters = {},\n\n  /* Transports bindings\n   * 1) key is the dataType\n   * 2) the catchall symbol \"*\" can be used\n   * 3) selection will start with transport dataType and THEN go to \"*\" if needed\n   */\n  transports = {},\n\n  // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression\n  allTypes = \"*/\".concat(\"*\");\n\n// #8138, IE may throw an exception when accessing\n// a field from window.location if document.domain has been set\ntry {\n  ajaxLocation = location.href;\n} catch( e ) {\n  // Use the href attribute of an A element\n  // since IE will modify it given document.location\n  ajaxLocation = document.createElement( \"a\" );\n  ajaxLocation.href = \"\";\n  ajaxLocation = ajaxLocation.href;\n}\n\n// Segment location into parts\najaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];\n\n// Base \"constructor\" for jQuery.ajaxPrefilter and jQuery.ajaxTransport\nfunction addToPrefiltersOrTransports( structure ) {\n\n  // dataTypeExpression is optional and defaults to \"*\"\n  return function( dataTypeExpression, func ) {\n\n    if ( typeof dataTypeExpression !== \"string\" ) {\n      func = dataTypeExpression;\n      dataTypeExpression = \"*\";\n    }\n\n    var dataType,\n      i = 0,\n      dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];\n\n    if ( jQuery.isFunction( func ) ) {\n      // For each dataType in the dataTypeExpression\n      while ( (dataType = dataTypes[i++]) ) {\n        // Prepend if requested\n        if ( dataType.charAt( 0 ) === \"+\" ) {\n          dataType = dataType.slice( 1 ) || \"*\";\n          (structure[ dataType ] = structure[ dataType ] || []).unshift( func );\n\n        // Otherwise append\n        } else {\n          (structure[ dataType ] = structure[ dataType ] || []).push( func );\n        }\n      }\n    }\n  };\n}\n\n// Base inspection function for prefilters and transports\nfunction inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {\n\n  var inspected = {},\n    seekingTransport = ( structure === transports );\n\n  function inspect( dataType ) {\n    var selected;\n    inspected[ dataType ] = true;\n    jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {\n      var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );\n      if ( typeof dataTypeOrTransport === \"string\" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {\n        options.dataTypes.unshift( dataTypeOrTransport );\n        inspect( dataTypeOrTransport );\n        return false;\n      } else if ( seekingTransport ) {\n        return !( selected = dataTypeOrTransport );\n      }\n    });\n    return selected;\n  }\n\n  return inspect( options.dataTypes[ 0 ] ) || !inspected[ \"*\" ] && inspect( \"*\" );\n}\n\n// A special extend for ajax options\n// that takes \"flat\" options (not to be deep extended)\n// Fixes #9887\nfunction ajaxExtend( target, src ) {\n  var deep, key,\n    flatOptions = jQuery.ajaxSettings.flatOptions || {};\n\n  for ( key in src ) {\n    if ( src[ key ] !== undefined ) {\n      ( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];\n    }\n  }\n  if ( deep ) {\n    jQuery.extend( true, target, deep );\n  }\n\n  return target;\n}\n\n/* Handles responses to an ajax request:\n * - finds the right dataType (mediates between content-type and expected dataType)\n * - returns the corresponding response\n */\nfunction ajaxHandleResponses( s, jqXHR, responses ) {\n  var firstDataType, ct, finalDataType, type,\n    contents = s.contents,\n    dataTypes = s.dataTypes;\n\n  // Remove auto dataType and get content-type in the process\n  while ( dataTypes[ 0 ] === \"*\" ) {\n    dataTypes.shift();\n    if ( ct === undefined ) {\n      ct = s.mimeType || jqXHR.getResponseHeader(\"Content-Type\");\n    }\n  }\n\n  // Check if we're dealing with a known content-type\n  if ( ct ) {\n    for ( type in contents ) {\n      if ( contents[ type ] && contents[ type ].test( ct ) ) {\n        dataTypes.unshift( type );\n        break;\n      }\n    }\n  }\n\n  // Check to see if we have a response for the expected dataType\n  if ( dataTypes[ 0 ] in responses ) {\n    finalDataType = dataTypes[ 0 ];\n  } else {\n    // Try convertible dataTypes\n    for ( type in responses ) {\n      if ( !dataTypes[ 0 ] || s.converters[ type + \" \" + dataTypes[0] ] ) {\n        finalDataType = type;\n        break;\n      }\n      if ( !firstDataType ) {\n        firstDataType = type;\n      }\n    }\n    // Or just use first one\n    finalDataType = finalDataType || firstDataType;\n  }\n\n  // If we found a dataType\n  // We add the dataType to the list if needed\n  // and return the corresponding response\n  if ( finalDataType ) {\n    if ( finalDataType !== dataTypes[ 0 ] ) {\n      dataTypes.unshift( finalDataType );\n    }\n    return responses[ finalDataType ];\n  }\n}\n\n/* Chain conversions given the request and the original response\n * Also sets the responseXXX fields on the jqXHR instance\n */\nfunction ajaxConvert( s, response, jqXHR, isSuccess ) {\n  var conv2, current, conv, tmp, prev,\n    converters = {},\n    // Work with a copy of dataTypes in case we need to modify it for conversion\n    dataTypes = s.dataTypes.slice();\n\n  // Create converters map with lowercased keys\n  if ( dataTypes[ 1 ] ) {\n    for ( conv in s.converters ) {\n      converters[ conv.toLowerCase() ] = s.converters[ conv ];\n    }\n  }\n\n  current = dataTypes.shift();\n\n  // Convert to each sequential dataType\n  while ( current ) {\n\n    if ( s.responseFields[ current ] ) {\n      jqXHR[ s.responseFields[ current ] ] = response;\n    }\n\n    // Apply the dataFilter if provided\n    if ( !prev && isSuccess && s.dataFilter ) {\n      response = s.dataFilter( response, s.dataType );\n    }\n\n    prev = current;\n    current = dataTypes.shift();\n\n    if ( current ) {\n\n      // There's only work to do if current dataType is non-auto\n      if ( current === \"*\" ) {\n\n        current = prev;\n\n      // Convert response if prev dataType is non-auto and differs from current\n      } else if ( prev !== \"*\" && prev !== current ) {\n\n        // Seek a direct converter\n        conv = converters[ prev + \" \" + current ] || converters[ \"* \" + current ];\n\n        // If none found, seek a pair\n        if ( !conv ) {\n          for ( conv2 in converters ) {\n\n            // If conv2 outputs current\n            tmp = conv2.split( \" \" );\n            if ( tmp[ 1 ] === current ) {\n\n              // If prev can be converted to accepted input\n              conv = converters[ prev + \" \" + tmp[ 0 ] ] ||\n                converters[ \"* \" + tmp[ 0 ] ];\n              if ( conv ) {\n                // Condense equivalence converters\n                if ( conv === true ) {\n                  conv = converters[ conv2 ];\n\n                // Otherwise, insert the intermediate dataType\n                } else if ( converters[ conv2 ] !== true ) {\n                  current = tmp[ 0 ];\n                  dataTypes.unshift( tmp[ 1 ] );\n                }\n                break;\n              }\n            }\n          }\n        }\n\n        // Apply converter (if not an equivalence)\n        if ( conv !== true ) {\n\n          // Unless errors are allowed to bubble, catch and return them\n          if ( conv && s[ \"throws\" ] ) {\n            response = conv( response );\n          } else {\n            try {\n              response = conv( response );\n            } catch ( e ) {\n              return { state: \"parsererror\", error: conv ? e : \"No conversion from \" + prev + \" to \" + current };\n            }\n          }\n        }\n      }\n    }\n  }\n\n  return { state: \"success\", data: response };\n}\n\njQuery.extend({\n\n  // Counter for holding the number of active queries\n  active: 0,\n\n  // Last-Modified header cache for next request\n  lastModified: {},\n  etag: {},\n\n  ajaxSettings: {\n    url: ajaxLocation,\n    type: \"GET\",\n    isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),\n    global: true,\n    processData: true,\n    async: true,\n    contentType: \"application/x-www-form-urlencoded; charset=UTF-8\",\n    /*\n    timeout: 0,\n    data: null,\n    dataType: null,\n    username: null,\n    password: null,\n    cache: null,\n    throws: false,\n    traditional: false,\n    headers: {},\n    */\n\n    accepts: {\n      \"*\": allTypes,\n      text: \"text/plain\",\n      html: \"text/html\",\n      xml: \"application/xml, text/xml\",\n      json: \"application/json, text/javascript\"\n    },\n\n    contents: {\n      xml: /xml/,\n      html: /html/,\n      json: /json/\n    },\n\n    responseFields: {\n      xml: \"responseXML\",\n      text: \"responseText\",\n      json: \"responseJSON\"\n    },\n\n    // Data converters\n    // Keys separate source (or catchall \"*\") and destination types with a single space\n    converters: {\n\n      // Convert anything to text\n      \"* text\": String,\n\n      // Text to html (true = no transformation)\n      \"text html\": true,\n\n      // Evaluate text as a json expression\n      \"text json\": jQuery.parseJSON,\n\n      // Parse text as xml\n      \"text xml\": jQuery.parseXML\n    },\n\n    // For options that shouldn't be deep extended:\n    // you can add your own custom options here if\n    // and when you create one that shouldn't be\n    // deep extended (see ajaxExtend)\n    flatOptions: {\n      url: true,\n      context: true\n    }\n  },\n\n  // Creates a full fledged settings object into target\n  // with both ajaxSettings and settings fields.\n  // If target is omitted, writes into ajaxSettings.\n  ajaxSetup: function( target, settings ) {\n    return settings ?\n\n      // Building a settings object\n      ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :\n\n      // Extending ajaxSettings\n      ajaxExtend( jQuery.ajaxSettings, target );\n  },\n\n  ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),\n  ajaxTransport: addToPrefiltersOrTransports( transports ),\n\n  // Main method\n  ajax: function( url, options ) {\n\n    // If url is an object, simulate pre-1.5 signature\n    if ( typeof url === \"object\" ) {\n      options = url;\n      url = undefined;\n    }\n\n    // Force options to be an object\n    options = options || {};\n\n    var // Cross-domain detection vars\n      parts,\n      // Loop variable\n      i,\n      // URL without anti-cache param\n      cacheURL,\n      // Response headers as string\n      responseHeadersString,\n      // timeout handle\n      timeoutTimer,\n\n      // To know if global events are to be dispatched\n      fireGlobals,\n\n      transport,\n      // Response headers\n      responseHeaders,\n      // Create the final options object\n      s = jQuery.ajaxSetup( {}, options ),\n      // Callbacks context\n      callbackContext = s.context || s,\n      // Context for global events is callbackContext if it is a DOM node or jQuery collection\n      globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?\n        jQuery( callbackContext ) :\n        jQuery.event,\n      // Deferreds\n      deferred = jQuery.Deferred(),\n      completeDeferred = jQuery.Callbacks(\"once memory\"),\n      // Status-dependent callbacks\n      statusCode = s.statusCode || {},\n      // Headers (they are sent all at once)\n      requestHeaders = {},\n      requestHeadersNames = {},\n      // The jqXHR state\n      state = 0,\n      // Default abort message\n      strAbort = \"canceled\",\n      // Fake xhr\n      jqXHR = {\n        readyState: 0,\n\n        // Builds headers hashtable if needed\n        getResponseHeader: function( key ) {\n          var match;\n          if ( state === 2 ) {\n            if ( !responseHeaders ) {\n              responseHeaders = {};\n              while ( (match = rheaders.exec( responseHeadersString )) ) {\n                responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];\n              }\n            }\n            match = responseHeaders[ key.toLowerCase() ];\n          }\n          return match == null ? null : match;\n        },\n\n        // Raw string\n        getAllResponseHeaders: function() {\n          return state === 2 ? responseHeadersString : null;\n        },\n\n        // Caches the header\n        setRequestHeader: function( name, value ) {\n          var lname = name.toLowerCase();\n          if ( !state ) {\n            name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;\n            requestHeaders[ name ] = value;\n          }\n          return this;\n        },\n\n        // Overrides response content-type header\n        overrideMimeType: function( type ) {\n          if ( !state ) {\n            s.mimeType = type;\n          }\n          return this;\n        },\n\n        // Status-dependent callbacks\n        statusCode: function( map ) {\n          var code;\n          if ( map ) {\n            if ( state < 2 ) {\n              for ( code in map ) {\n                // Lazy-add the new callback in a way that preserves old ones\n                statusCode[ code ] = [ statusCode[ code ], map[ code ] ];\n              }\n            } else {\n              // Execute the appropriate callbacks\n              jqXHR.always( map[ jqXHR.status ] );\n            }\n          }\n          return this;\n        },\n\n        // Cancel the request\n        abort: function( statusText ) {\n          var finalText = statusText || strAbort;\n          if ( transport ) {\n            transport.abort( finalText );\n          }\n          done( 0, finalText );\n          return this;\n        }\n      };\n\n    // Attach deferreds\n    deferred.promise( jqXHR ).complete = completeDeferred.add;\n    jqXHR.success = jqXHR.done;\n    jqXHR.error = jqXHR.fail;\n\n    // Remove hash character (#7531: and string promotion)\n    // Add protocol if not provided (#5866: IE7 issue with protocol-less urls)\n    // Handle falsy url in the settings object (#10093: consistency with old signature)\n    // We also use the url parameter if available\n    s.url = ( ( url || s.url || ajaxLocation ) + \"\" ).replace( rhash, \"\" ).replace( rprotocol, ajaxLocParts[ 1 ] + \"//\" );\n\n    // Alias method option to type as per ticket #12004\n    s.type = options.method || options.type || s.method || s.type;\n\n    // Extract dataTypes list\n    s.dataTypes = jQuery.trim( s.dataType || \"*\" ).toLowerCase().match( rnotwhite ) || [ \"\" ];\n\n    // A cross-domain request is in order when we have a protocol:host:port mismatch\n    if ( s.crossDomain == null ) {\n      parts = rurl.exec( s.url.toLowerCase() );\n      s.crossDomain = !!( parts &&\n        ( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||\n          ( parts[ 3 ] || ( parts[ 1 ] === \"http:\" ? \"80\" : \"443\" ) ) !==\n            ( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === \"http:\" ? \"80\" : \"443\" ) ) )\n      );\n    }\n\n    // Convert data if not already a string\n    if ( s.data && s.processData && typeof s.data !== \"string\" ) {\n      s.data = jQuery.param( s.data, s.traditional );\n    }\n\n    // Apply prefilters\n    inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );\n\n    // If request was aborted inside a prefilter, stop there\n    if ( state === 2 ) {\n      return jqXHR;\n    }\n\n    // We can fire global events as of now if asked to\n    fireGlobals = s.global;\n\n    // Watch for a new set of requests\n    if ( fireGlobals && jQuery.active++ === 0 ) {\n      jQuery.event.trigger(\"ajaxStart\");\n    }\n\n    // Uppercase the type\n    s.type = s.type.toUpperCase();\n\n    // Determine if request has content\n    s.hasContent = !rnoContent.test( s.type );\n\n    // Save the URL in case we're toying with the If-Modified-Since\n    // and/or If-None-Match header later on\n    cacheURL = s.url;\n\n    // More options handling for requests with no content\n    if ( !s.hasContent ) {\n\n      // If data is available, append data to url\n      if ( s.data ) {\n        cacheURL = ( s.url += ( rquery.test( cacheURL ) ? \"&\" : \"?\" ) + s.data );\n        // #9682: remove data so that it's not used in an eventual retry\n        delete s.data;\n      }\n\n      // Add anti-cache in url if needed\n      if ( s.cache === false ) {\n        s.url = rts.test( cacheURL ) ?\n\n          // If there is already a '_' parameter, set its value\n          cacheURL.replace( rts, \"$1_=\" + nonce++ ) :\n\n          // Otherwise add one to the end\n          cacheURL + ( rquery.test( cacheURL ) ? \"&\" : \"?\" ) + \"_=\" + nonce++;\n      }\n    }\n\n    // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.\n    if ( s.ifModified ) {\n      if ( jQuery.lastModified[ cacheURL ] ) {\n        jqXHR.setRequestHeader( \"If-Modified-Since\", jQuery.lastModified[ cacheURL ] );\n      }\n      if ( jQuery.etag[ cacheURL ] ) {\n        jqXHR.setRequestHeader( \"If-None-Match\", jQuery.etag[ cacheURL ] );\n      }\n    }\n\n    // Set the correct header, if data is being sent\n    if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {\n      jqXHR.setRequestHeader( \"Content-Type\", s.contentType );\n    }\n\n    // Set the Accepts header for the server, depending on the dataType\n    jqXHR.setRequestHeader(\n      \"Accept\",\n      s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?\n        s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== \"*\" ? \", \" + allTypes + \"; q=0.01\" : \"\" ) :\n        s.accepts[ \"*\" ]\n    );\n\n    // Check for headers option\n    for ( i in s.headers ) {\n      jqXHR.setRequestHeader( i, s.headers[ i ] );\n    }\n\n    // Allow custom headers/mimetypes and early abort\n    if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {\n      // Abort if not done already and return\n      return jqXHR.abort();\n    }\n\n    // aborting is no longer a cancellation\n    strAbort = \"abort\";\n\n    // Install callbacks on deferreds\n    for ( i in { success: 1, error: 1, complete: 1 } ) {\n      jqXHR[ i ]( s[ i ] );\n    }\n\n    // Get transport\n    transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );\n\n    // If no transport, we auto-abort\n    if ( !transport ) {\n      done( -1, \"No Transport\" );\n    } else {\n      jqXHR.readyState = 1;\n\n      // Send global event\n      if ( fireGlobals ) {\n        globalEventContext.trigger( \"ajaxSend\", [ jqXHR, s ] );\n      }\n      // Timeout\n      if ( s.async && s.timeout > 0 ) {\n        timeoutTimer = setTimeout(function() {\n          jqXHR.abort(\"timeout\");\n        }, s.timeout );\n      }\n\n      try {\n        state = 1;\n        transport.send( requestHeaders, done );\n      } catch ( e ) {\n        // Propagate exception as error if not done\n        if ( state < 2 ) {\n          done( -1, e );\n        // Simply rethrow otherwise\n        } else {\n          throw e;\n        }\n      }\n    }\n\n    // Callback for when everything is done\n    function done( status, nativeStatusText, responses, headers ) {\n      var isSuccess, success, error, response, modified,\n        statusText = nativeStatusText;\n\n      // Called once\n      if ( state === 2 ) {\n        return;\n      }\n\n      // State is \"done\" now\n      state = 2;\n\n      // Clear timeout if it exists\n      if ( timeoutTimer ) {\n        clearTimeout( timeoutTimer );\n      }\n\n      // Dereference transport for early garbage collection\n      // (no matter how long the jqXHR object will be used)\n      transport = undefined;\n\n      // Cache response headers\n      responseHeadersString = headers || \"\";\n\n      // Set readyState\n      jqXHR.readyState = status > 0 ? 4 : 0;\n\n      // Determine if successful\n      isSuccess = status >= 200 && status < 300 || status === 304;\n\n      // Get response data\n      if ( responses ) {\n        response = ajaxHandleResponses( s, jqXHR, responses );\n      }\n\n      // Convert no matter what (that way responseXXX fields are always set)\n      response = ajaxConvert( s, response, jqXHR, isSuccess );\n\n      // If successful, handle type chaining\n      if ( isSuccess ) {\n\n        // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.\n        if ( s.ifModified ) {\n          modified = jqXHR.getResponseHeader(\"Last-Modified\");\n          if ( modified ) {\n            jQuery.lastModified[ cacheURL ] = modified;\n          }\n          modified = jqXHR.getResponseHeader(\"etag\");\n          if ( modified ) {\n            jQuery.etag[ cacheURL ] = modified;\n          }\n        }\n\n        // if no content\n        if ( status === 204 || s.type === \"HEAD\" ) {\n          statusText = \"nocontent\";\n\n        // if not modified\n        } else if ( status === 304 ) {\n          statusText = \"notmodified\";\n\n        // If we have data, let's convert it\n        } else {\n          statusText = response.state;\n          success = response.data;\n          error = response.error;\n          isSuccess = !error;\n        }\n      } else {\n        // We extract error from statusText\n        // then normalize statusText and status for non-aborts\n        error = statusText;\n        if ( status || !statusText ) {\n          statusText = \"error\";\n          if ( status < 0 ) {\n            status = 0;\n          }\n        }\n      }\n\n      // Set data for the fake xhr object\n      jqXHR.status = status;\n      jqXHR.statusText = ( nativeStatusText || statusText ) + \"\";\n\n      // Success/Error\n      if ( isSuccess ) {\n        deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );\n      } else {\n        deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );\n      }\n\n      // Status-dependent callbacks\n      jqXHR.statusCode( statusCode );\n      statusCode = undefined;\n\n      if ( fireGlobals ) {\n        globalEventContext.trigger( isSuccess ? \"ajaxSuccess\" : \"ajaxError\",\n          [ jqXHR, s, isSuccess ? success : error ] );\n      }\n\n      // Complete\n      completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );\n\n      if ( fireGlobals ) {\n        globalEventContext.trigger( \"ajaxComplete\", [ jqXHR, s ] );\n        // Handle the global AJAX counter\n        if ( !( --jQuery.active ) ) {\n          jQuery.event.trigger(\"ajaxStop\");\n        }\n      }\n    }\n\n    return jqXHR;\n  },\n\n  getJSON: function( url, data, callback ) {\n    return jQuery.get( url, data, callback, \"json\" );\n  },\n\n  getScript: function( url, callback ) {\n    return jQuery.get( url, undefined, callback, \"script\" );\n  }\n});\n\njQuery.each( [ \"get\", \"post\" ], function( i, method ) {\n  jQuery[ method ] = function( url, data, callback, type ) {\n    // shift arguments if data argument was omitted\n    if ( jQuery.isFunction( data ) ) {\n      type = type || callback;\n      callback = data;\n      data = undefined;\n    }\n\n    return jQuery.ajax({\n      url: url,\n      type: method,\n      dataType: type,\n      data: data,\n      success: callback\n    });\n  };\n});\n\n// Attach a bunch of functions for handling common AJAX events\njQuery.each( [ \"ajaxStart\", \"ajaxStop\", \"ajaxComplete\", \"ajaxError\", \"ajaxSuccess\", \"ajaxSend\" ], function( i, type ) {\n  jQuery.fn[ type ] = function( fn ) {\n    return this.on( type, fn );\n  };\n});\n\n\njQuery._evalUrl = function( url ) {\n  return jQuery.ajax({\n    url: url,\n    type: \"GET\",\n    dataType: \"script\",\n    async: false,\n    global: false,\n    \"throws\": true\n  });\n};\n\n\njQuery.fn.extend({\n  wrapAll: function( html ) {\n    if ( jQuery.isFunction( html ) ) {\n      return this.each(function(i) {\n        jQuery(this).wrapAll( html.call(this, i) );\n      });\n    }\n\n    if ( this[0] ) {\n      // The elements to wrap the target around\n      var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);\n\n      if ( this[0].parentNode ) {\n        wrap.insertBefore( this[0] );\n      }\n\n      wrap.map(function() {\n        var elem = this;\n\n        while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {\n          elem = elem.firstChild;\n        }\n\n        return elem;\n      }).append( this );\n    }\n\n    return this;\n  },\n\n  wrapInner: function( html ) {\n    if ( jQuery.isFunction( html ) ) {\n      return this.each(function(i) {\n        jQuery(this).wrapInner( html.call(this, i) );\n      });\n    }\n\n    return this.each(function() {\n      var self = jQuery( this ),\n        contents = self.contents();\n\n      if ( contents.length ) {\n        contents.wrapAll( html );\n\n      } else {\n        self.append( html );\n      }\n    });\n  },\n\n  wrap: function( html ) {\n    var isFunction = jQuery.isFunction( html );\n\n    return this.each(function(i) {\n      jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );\n    });\n  },\n\n  unwrap: function() {\n    return this.parent().each(function() {\n      if ( !jQuery.nodeName( this, \"body\" ) ) {\n        jQuery( this ).replaceWith( this.childNodes );\n      }\n    }).end();\n  }\n});\n\n\njQuery.expr.filters.hidden = function( elem ) {\n  // Support: Opera <= 12.12\n  // Opera reports offsetWidths and offsetHeights less than zero on some elements\n  return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||\n    (!support.reliableHiddenOffsets() &&\n      ((elem.style && elem.style.display) || jQuery.css( elem, \"display\" )) === \"none\");\n};\n\njQuery.expr.filters.visible = function( elem ) {\n  return !jQuery.expr.filters.hidden( elem );\n};\n\n\n\n\nvar r20 = /%20/g,\n  rbracket = /\\[\\]$/,\n  rCRLF = /\\r?\\n/g,\n  rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,\n  rsubmittable = /^(?:input|select|textarea|keygen)/i;\n\nfunction buildParams( prefix, obj, traditional, add ) {\n  var name;\n\n  if ( jQuery.isArray( obj ) ) {\n    // Serialize array item.\n    jQuery.each( obj, function( i, v ) {\n      if ( traditional || rbracket.test( prefix ) ) {\n        // Treat each array item as a scalar.\n        add( prefix, v );\n\n      } else {\n        // Item is non-scalar (array or object), encode its numeric index.\n        buildParams( prefix + \"[\" + ( typeof v === \"object\" ? i : \"\" ) + \"]\", v, traditional, add );\n      }\n    });\n\n  } else if ( !traditional && jQuery.type( obj ) === \"object\" ) {\n    // Serialize object item.\n    for ( name in obj ) {\n      buildParams( prefix + \"[\" + name + \"]\", obj[ name ], traditional, add );\n    }\n\n  } else {\n    // Serialize scalar item.\n    add( prefix, obj );\n  }\n}\n\n// Serialize an array of form elements or a set of\n// key/values into a query string\njQuery.param = function( a, traditional ) {\n  var prefix,\n    s = [],\n    add = function( key, value ) {\n      // If value is a function, invoke it and return its value\n      value = jQuery.isFunction( value ) ? value() : ( value == null ? \"\" : value );\n      s[ s.length ] = encodeURIComponent( key ) + \"=\" + encodeURIComponent( value );\n    };\n\n  // Set traditional to true for jQuery <= 1.3.2 behavior.\n  if ( traditional === undefined ) {\n    traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;\n  }\n\n  // If an array was passed in, assume that it is an array of form elements.\n  if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {\n    // Serialize the form elements\n    jQuery.each( a, function() {\n      add( this.name, this.value );\n    });\n\n  } else {\n    // If traditional, encode the \"old\" way (the way 1.3.2 or older\n    // did it), otherwise encode params recursively.\n    for ( prefix in a ) {\n      buildParams( prefix, a[ prefix ], traditional, add );\n    }\n  }\n\n  // Return the resulting serialization\n  return s.join( \"&\" ).replace( r20, \"+\" );\n};\n\njQuery.fn.extend({\n  serialize: function() {\n    return jQuery.param( this.serializeArray() );\n  },\n  serializeArray: function() {\n    return this.map(function() {\n      // Can add propHook for \"elements\" to filter or add form elements\n      var elements = jQuery.prop( this, \"elements\" );\n      return elements ? jQuery.makeArray( elements ) : this;\n    })\n    .filter(function() {\n      var type = this.type;\n      // Use .is(\":disabled\") so that fieldset[disabled] works\n      return this.name && !jQuery( this ).is( \":disabled\" ) &&\n        rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&\n        ( this.checked || !rcheckableType.test( type ) );\n    })\n    .map(function( i, elem ) {\n      var val = jQuery( this ).val();\n\n      return val == null ?\n        null :\n        jQuery.isArray( val ) ?\n          jQuery.map( val, function( val ) {\n            return { name: elem.name, value: val.replace( rCRLF, \"\\r\\n\" ) };\n          }) :\n          { name: elem.name, value: val.replace( rCRLF, \"\\r\\n\" ) };\n    }).get();\n  }\n});\n\n\n// Create the request object\n// (This is still attached to ajaxSettings for backward compatibility)\njQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?\n  // Support: IE6+\n  function() {\n\n    // XHR cannot access local files, always use ActiveX for that case\n    return !this.isLocal &&\n\n      // Support: IE7-8\n      // oldIE XHR does not support non-RFC2616 methods (#13240)\n      // See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx\n      // and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9\n      // Although this check for six methods instead of eight\n      // since IE also does not support \"trace\" and \"connect\"\n      /^(get|post|head|put|delete|options)$/i.test( this.type ) &&\n\n      createStandardXHR() || createActiveXHR();\n  } :\n  // For all other browsers, use the standard XMLHttpRequest object\n  createStandardXHR;\n\nvar xhrId = 0,\n  xhrCallbacks = {},\n  xhrSupported = jQuery.ajaxSettings.xhr();\n\n// Support: IE<10\n// Open requests must be manually aborted on unload (#5280)\nif ( window.ActiveXObject ) {\n  jQuery( window ).on( \"unload\", function() {\n    for ( var key in xhrCallbacks ) {\n      xhrCallbacks[ key ]( undefined, true );\n    }\n  });\n}\n\n// Determine support properties\nsupport.cors = !!xhrSupported && ( \"withCredentials\" in xhrSupported );\nxhrSupported = support.ajax = !!xhrSupported;\n\n// Create transport if the browser can provide an xhr\nif ( xhrSupported ) {\n\n  jQuery.ajaxTransport(function( options ) {\n    // Cross domain only allowed if supported through XMLHttpRequest\n    if ( !options.crossDomain || support.cors ) {\n\n      var callback;\n\n      return {\n        send: function( headers, complete ) {\n          var i,\n            xhr = options.xhr(),\n            id = ++xhrId;\n\n          // Open the socket\n          xhr.open( options.type, options.url, options.async, options.username, options.password );\n\n          // Apply custom fields if provided\n          if ( options.xhrFields ) {\n            for ( i in options.xhrFields ) {\n              xhr[ i ] = options.xhrFields[ i ];\n            }\n          }\n\n          // Override mime type if needed\n          if ( options.mimeType && xhr.overrideMimeType ) {\n            xhr.overrideMimeType( options.mimeType );\n          }\n\n          // X-Requested-With header\n          // For cross-domain requests, seeing as conditions for a preflight are\n          // akin to a jigsaw puzzle, we simply never set it to be sure.\n          // (it can always be set on a per-request basis or even using ajaxSetup)\n          // For same-domain requests, won't change header if already provided.\n          if ( !options.crossDomain && !headers[\"X-Requested-With\"] ) {\n            headers[\"X-Requested-With\"] = \"XMLHttpRequest\";\n          }\n\n          // Set headers\n          for ( i in headers ) {\n            // Support: IE<9\n            // IE's ActiveXObject throws a 'Type Mismatch' exception when setting\n            // request header to a null-value.\n            //\n            // To keep consistent with other XHR implementations, cast the value\n            // to string and ignore `undefined`.\n            if ( headers[ i ] !== undefined ) {\n              xhr.setRequestHeader( i, headers[ i ] + \"\" );\n            }\n          }\n\n          // Do send the request\n          // This may raise an exception which is actually\n          // handled in jQuery.ajax (so no try/catch here)\n          xhr.send( ( options.hasContent && options.data ) || null );\n\n          // Listener\n          callback = function( _, isAbort ) {\n            var status, statusText, responses;\n\n            // Was never called and is aborted or complete\n            if ( callback && ( isAbort || xhr.readyState === 4 ) ) {\n              // Clean up\n              delete xhrCallbacks[ id ];\n              callback = undefined;\n              xhr.onreadystatechange = jQuery.noop;\n\n              // Abort manually if needed\n              if ( isAbort ) {\n                if ( xhr.readyState !== 4 ) {\n                  xhr.abort();\n                }\n              } else {\n                responses = {};\n                status = xhr.status;\n\n                // Support: IE<10\n                // Accessing binary-data responseText throws an exception\n                // (#11426)\n                if ( typeof xhr.responseText === \"string\" ) {\n                  responses.text = xhr.responseText;\n                }\n\n                // Firefox throws an exception when accessing\n                // statusText for faulty cross-domain requests\n                try {\n                  statusText = xhr.statusText;\n                } catch( e ) {\n                  // We normalize with Webkit giving an empty statusText\n                  statusText = \"\";\n                }\n\n                // Filter status for non standard behaviors\n\n                // If the request is local and we have data: assume a success\n                // (success with no data won't get notified, that's the best we\n                // can do given current implementations)\n                if ( !status && options.isLocal && !options.crossDomain ) {\n                  status = responses.text ? 200 : 404;\n                // IE - #1450: sometimes returns 1223 when it should be 204\n                } else if ( status === 1223 ) {\n                  status = 204;\n                }\n              }\n            }\n\n            // Call complete if needed\n            if ( responses ) {\n              complete( status, statusText, responses, xhr.getAllResponseHeaders() );\n            }\n          };\n\n          if ( !options.async ) {\n            // if we're in sync mode we fire the callback\n            callback();\n          } else if ( xhr.readyState === 4 ) {\n            // (IE6 & IE7) if it's in cache and has been\n            // retrieved directly we need to fire the callback\n            setTimeout( callback );\n          } else {\n            // Add to the list of active xhr callbacks\n            xhr.onreadystatechange = xhrCallbacks[ id ] = callback;\n          }\n        },\n\n        abort: function() {\n          if ( callback ) {\n            callback( undefined, true );\n          }\n        }\n      };\n    }\n  });\n}\n\n// Functions to create xhrs\nfunction createStandardXHR() {\n  try {\n    return new window.XMLHttpRequest();\n  } catch( e ) {}\n}\n\nfunction createActiveXHR() {\n  try {\n    return new window.ActiveXObject( \"Microsoft.XMLHTTP\" );\n  } catch( e ) {}\n}\n\n\n\n\n// Install script dataType\njQuery.ajaxSetup({\n  accepts: {\n    script: \"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript\"\n  },\n  contents: {\n    script: /(?:java|ecma)script/\n  },\n  converters: {\n    \"text script\": function( text ) {\n      jQuery.globalEval( text );\n      return text;\n    }\n  }\n});\n\n// Handle cache's special case and global\njQuery.ajaxPrefilter( \"script\", function( s ) {\n  if ( s.cache === undefined ) {\n    s.cache = false;\n  }\n  if ( s.crossDomain ) {\n    s.type = \"GET\";\n    s.global = false;\n  }\n});\n\n// Bind script tag hack transport\njQuery.ajaxTransport( \"script\", function(s) {\n\n  // This transport only deals with cross domain requests\n  if ( s.crossDomain ) {\n\n    var script,\n      head = document.head || jQuery(\"head\")[0] || document.documentElement;\n\n    return {\n\n      send: function( _, callback ) {\n\n        script = document.createElement(\"script\");\n\n        script.async = true;\n\n        if ( s.scriptCharset ) {\n          script.charset = s.scriptCharset;\n        }\n\n        script.src = s.url;\n\n        // Attach handlers for all browsers\n        script.onload = script.onreadystatechange = function( _, isAbort ) {\n\n          if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {\n\n            // Handle memory leak in IE\n            script.onload = script.onreadystatechange = null;\n\n            // Remove the script\n            if ( script.parentNode ) {\n              script.parentNode.removeChild( script );\n            }\n\n            // Dereference the script\n            script = null;\n\n            // Callback if not abort\n            if ( !isAbort ) {\n              callback( 200, \"success\" );\n            }\n          }\n        };\n\n        // Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending\n        // Use native DOM manipulation to avoid our domManip AJAX trickery\n        head.insertBefore( script, head.firstChild );\n      },\n\n      abort: function() {\n        if ( script ) {\n          script.onload( undefined, true );\n        }\n      }\n    };\n  }\n});\n\n\n\n\nvar oldCallbacks = [],\n  rjsonp = /(=)\\?(?=&|$)|\\?\\?/;\n\n// Default jsonp settings\njQuery.ajaxSetup({\n  jsonp: \"callback\",\n  jsonpCallback: function() {\n    var callback = oldCallbacks.pop() || ( jQuery.expando + \"_\" + ( nonce++ ) );\n    this[ callback ] = true;\n    return callback;\n  }\n});\n\n// Detect, normalize options and install callbacks for jsonp requests\njQuery.ajaxPrefilter( \"json jsonp\", function( s, originalSettings, jqXHR ) {\n\n  var callbackName, overwritten, responseContainer,\n    jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?\n      \"url\" :\n      typeof s.data === \"string\" && !( s.contentType || \"\" ).indexOf(\"application/x-www-form-urlencoded\") && rjsonp.test( s.data ) && \"data\"\n    );\n\n  // Handle iff the expected data type is \"jsonp\" or we have a parameter to set\n  if ( jsonProp || s.dataTypes[ 0 ] === \"jsonp\" ) {\n\n    // Get callback name, remembering preexisting value associated with it\n    callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?\n      s.jsonpCallback() :\n      s.jsonpCallback;\n\n    // Insert callback into url or form data\n    if ( jsonProp ) {\n      s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, \"$1\" + callbackName );\n    } else if ( s.jsonp !== false ) {\n      s.url += ( rquery.test( s.url ) ? \"&\" : \"?\" ) + s.jsonp + \"=\" + callbackName;\n    }\n\n    // Use data converter to retrieve json after script execution\n    s.converters[\"script json\"] = function() {\n      if ( !responseContainer ) {\n        jQuery.error( callbackName + \" was not called\" );\n      }\n      return responseContainer[ 0 ];\n    };\n\n    // force json dataType\n    s.dataTypes[ 0 ] = \"json\";\n\n    // Install callback\n    overwritten = window[ callbackName ];\n    window[ callbackName ] = function() {\n      responseContainer = arguments;\n    };\n\n    // Clean-up function (fires after converters)\n    jqXHR.always(function() {\n      // Restore preexisting value\n      window[ callbackName ] = overwritten;\n\n      // Save back as free\n      if ( s[ callbackName ] ) {\n        // make sure that re-using the options doesn't screw things around\n        s.jsonpCallback = originalSettings.jsonpCallback;\n\n        // save the callback name for future use\n        oldCallbacks.push( callbackName );\n      }\n\n      // Call if it was a function and we have a response\n      if ( responseContainer && jQuery.isFunction( overwritten ) ) {\n        overwritten( responseContainer[ 0 ] );\n      }\n\n      responseContainer = overwritten = undefined;\n    });\n\n    // Delegate to script\n    return \"script\";\n  }\n});\n\n\n\n\n// data: string of html\n// context (optional): If specified, the fragment will be created in this context, defaults to document\n// keepScripts (optional): If true, will include scripts passed in the html string\njQuery.parseHTML = function( data, context, keepScripts ) {\n  if ( !data || typeof data !== \"string\" ) {\n    return null;\n  }\n  if ( typeof context === \"boolean\" ) {\n    keepScripts = context;\n    context = false;\n  }\n  context = context || document;\n\n  var parsed = rsingleTag.exec( data ),\n    scripts = !keepScripts && [];\n\n  // Single tag\n  if ( parsed ) {\n    return [ context.createElement( parsed[1] ) ];\n  }\n\n  parsed = jQuery.buildFragment( [ data ], context, scripts );\n\n  if ( scripts && scripts.length ) {\n    jQuery( scripts ).remove();\n  }\n\n  return jQuery.merge( [], parsed.childNodes );\n};\n\n\n// Keep a copy of the old load method\nvar _load = jQuery.fn.load;\n\n/**\n * Load a url into a page\n */\njQuery.fn.load = function( url, params, callback ) {\n  if ( typeof url !== \"string\" && _load ) {\n    return _load.apply( this, arguments );\n  }\n\n  var selector, response, type,\n    self = this,\n    off = url.indexOf(\" \");\n\n  if ( off >= 0 ) {\n    selector = jQuery.trim( url.slice( off, url.length ) );\n    url = url.slice( 0, off );\n  }\n\n  // If it's a function\n  if ( jQuery.isFunction( params ) ) {\n\n    // We assume that it's the callback\n    callback = params;\n    params = undefined;\n\n  // Otherwise, build a param string\n  } else if ( params && typeof params === \"object\" ) {\n    type = \"POST\";\n  }\n\n  // If we have elements to modify, make the request\n  if ( self.length > 0 ) {\n    jQuery.ajax({\n      url: url,\n\n      // if \"type\" variable is undefined, then \"GET\" method will be used\n      type: type,\n      dataType: \"html\",\n      data: params\n    }).done(function( responseText ) {\n\n      // Save response for use in complete callback\n      response = arguments;\n\n      self.html( selector ?\n\n        // If a selector was specified, locate the right elements in a dummy div\n        // Exclude scripts to avoid IE 'Permission Denied' errors\n        jQuery(\"<div>\").append( jQuery.parseHTML( responseText ) ).find( selector ) :\n\n        // Otherwise use the full result\n        responseText );\n\n    }).complete( callback && function( jqXHR, status ) {\n      self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );\n    });\n  }\n\n  return this;\n};\n\n\n\n\njQuery.expr.filters.animated = function( elem ) {\n  return jQuery.grep(jQuery.timers, function( fn ) {\n    return elem === fn.elem;\n  }).length;\n};\n\n\n\n\n\nvar docElem = window.document.documentElement;\n\n/**\n * Gets a window from an element\n */\nfunction getWindow( elem ) {\n  return jQuery.isWindow( elem ) ?\n    elem :\n    elem.nodeType === 9 ?\n      elem.defaultView || elem.parentWindow :\n      false;\n}\n\njQuery.offset = {\n  setOffset: function( elem, options, i ) {\n    var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,\n      position = jQuery.css( elem, \"position\" ),\n      curElem = jQuery( elem ),\n      props = {};\n\n    // set position first, in-case top/left are set even on static elem\n    if ( position === \"static\" ) {\n      elem.style.position = \"relative\";\n    }\n\n    curOffset = curElem.offset();\n    curCSSTop = jQuery.css( elem, \"top\" );\n    curCSSLeft = jQuery.css( elem, \"left\" );\n    calculatePosition = ( position === \"absolute\" || position === \"fixed\" ) &&\n      jQuery.inArray(\"auto\", [ curCSSTop, curCSSLeft ] ) > -1;\n\n    // need to be able to calculate position if either top or left is auto and position is either absolute or fixed\n    if ( calculatePosition ) {\n      curPosition = curElem.position();\n      curTop = curPosition.top;\n      curLeft = curPosition.left;\n    } else {\n      curTop = parseFloat( curCSSTop ) || 0;\n      curLeft = parseFloat( curCSSLeft ) || 0;\n    }\n\n    if ( jQuery.isFunction( options ) ) {\n      options = options.call( elem, i, curOffset );\n    }\n\n    if ( options.top != null ) {\n      props.top = ( options.top - curOffset.top ) + curTop;\n    }\n    if ( options.left != null ) {\n      props.left = ( options.left - curOffset.left ) + curLeft;\n    }\n\n    if ( \"using\" in options ) {\n      options.using.call( elem, props );\n    } else {\n      curElem.css( props );\n    }\n  }\n};\n\njQuery.fn.extend({\n  offset: function( options ) {\n    if ( arguments.length ) {\n      return options === undefined ?\n        this :\n        this.each(function( i ) {\n          jQuery.offset.setOffset( this, options, i );\n        });\n    }\n\n    var docElem, win,\n      box = { top: 0, left: 0 },\n      elem = this[ 0 ],\n      doc = elem && elem.ownerDocument;\n\n    if ( !doc ) {\n      return;\n    }\n\n    docElem = doc.documentElement;\n\n    // Make sure it's not a disconnected DOM node\n    if ( !jQuery.contains( docElem, elem ) ) {\n      return box;\n    }\n\n    // If we don't have gBCR, just use 0,0 rather than error\n    // BlackBerry 5, iOS 3 (original iPhone)\n    if ( typeof elem.getBoundingClientRect !== strundefined ) {\n      box = elem.getBoundingClientRect();\n    }\n    win = getWindow( doc );\n    return {\n      top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),\n      left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )\n    };\n  },\n\n  position: function() {\n    if ( !this[ 0 ] ) {\n      return;\n    }\n\n    var offsetParent, offset,\n      parentOffset = { top: 0, left: 0 },\n      elem = this[ 0 ];\n\n    // fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent\n    if ( jQuery.css( elem, \"position\" ) === \"fixed\" ) {\n      // we assume that getBoundingClientRect is available when computed position is fixed\n      offset = elem.getBoundingClientRect();\n    } else {\n      // Get *real* offsetParent\n      offsetParent = this.offsetParent();\n\n      // Get correct offsets\n      offset = this.offset();\n      if ( !jQuery.nodeName( offsetParent[ 0 ], \"html\" ) ) {\n        parentOffset = offsetParent.offset();\n      }\n\n      // Add offsetParent borders\n      parentOffset.top  += jQuery.css( offsetParent[ 0 ], \"borderTopWidth\", true );\n      parentOffset.left += jQuery.css( offsetParent[ 0 ], \"borderLeftWidth\", true );\n    }\n\n    // Subtract parent offsets and element margins\n    // note: when an element has margin: auto the offsetLeft and marginLeft\n    // are the same in Safari causing offset.left to incorrectly be 0\n    return {\n      top:  offset.top  - parentOffset.top - jQuery.css( elem, \"marginTop\", true ),\n      left: offset.left - parentOffset.left - jQuery.css( elem, \"marginLeft\", true)\n    };\n  },\n\n  offsetParent: function() {\n    return this.map(function() {\n      var offsetParent = this.offsetParent || docElem;\n\n      while ( offsetParent && ( !jQuery.nodeName( offsetParent, \"html\" ) && jQuery.css( offsetParent, \"position\" ) === \"static\" ) ) {\n        offsetParent = offsetParent.offsetParent;\n      }\n      return offsetParent || docElem;\n    });\n  }\n});\n\n// Create scrollLeft and scrollTop methods\njQuery.each( { scrollLeft: \"pageXOffset\", scrollTop: \"pageYOffset\" }, function( method, prop ) {\n  var top = /Y/.test( prop );\n\n  jQuery.fn[ method ] = function( val ) {\n    return access( this, function( elem, method, val ) {\n      var win = getWindow( elem );\n\n      if ( val === undefined ) {\n        return win ? (prop in win) ? win[ prop ] :\n          win.document.documentElement[ method ] :\n          elem[ method ];\n      }\n\n      if ( win ) {\n        win.scrollTo(\n          !top ? val : jQuery( win ).scrollLeft(),\n          top ? val : jQuery( win ).scrollTop()\n        );\n\n      } else {\n        elem[ method ] = val;\n      }\n    }, method, val, arguments.length, null );\n  };\n});\n\n// Add the top/left cssHooks using jQuery.fn.position\n// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084\n// getComputedStyle returns percent when specified for top/left/bottom/right\n// rather than make the css module depend on the offset module, we just check for it here\njQuery.each( [ \"top\", \"left\" ], function( i, prop ) {\n  jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,\n    function( elem, computed ) {\n      if ( computed ) {\n        computed = curCSS( elem, prop );\n        // if curCSS returns percentage, fallback to offset\n        return rnumnonpx.test( computed ) ?\n          jQuery( elem ).position()[ prop ] + \"px\" :\n          computed;\n      }\n    }\n  );\n});\n\n\n// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods\njQuery.each( { Height: \"height\", Width: \"width\" }, function( name, type ) {\n  jQuery.each( { padding: \"inner\" + name, content: type, \"\": \"outer\" + name }, function( defaultExtra, funcName ) {\n    // margin is only for outerHeight, outerWidth\n    jQuery.fn[ funcName ] = function( margin, value ) {\n      var chainable = arguments.length && ( defaultExtra || typeof margin !== \"boolean\" ),\n        extra = defaultExtra || ( margin === true || value === true ? \"margin\" : \"border\" );\n\n      return access( this, function( elem, type, value ) {\n        var doc;\n\n        if ( jQuery.isWindow( elem ) ) {\n          // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there\n          // isn't a whole lot we can do. See pull request at this URL for discussion:\n          // https://github.com/jquery/jquery/pull/764\n          return elem.document.documentElement[ \"client\" + name ];\n        }\n\n        // Get document width or height\n        if ( elem.nodeType === 9 ) {\n          doc = elem.documentElement;\n\n          // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest\n          // unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.\n          return Math.max(\n            elem.body[ \"scroll\" + name ], doc[ \"scroll\" + name ],\n            elem.body[ \"offset\" + name ], doc[ \"offset\" + name ],\n            doc[ \"client\" + name ]\n          );\n        }\n\n        return value === undefined ?\n          // Get width or height on the element, requesting but not forcing parseFloat\n          jQuery.css( elem, type, extra ) :\n\n          // Set width or height on the element\n          jQuery.style( elem, type, value, extra );\n      }, type, chainable ? margin : undefined, chainable, null );\n    };\n  });\n});\n\n\n// The number of elements contained in the matched element set\njQuery.fn.size = function() {\n  return this.length;\n};\n\njQuery.fn.andSelf = jQuery.fn.addBack;\n\n\n\n\n// Register as a named AMD module, since jQuery can be concatenated with other\n// files that may use define, but not via a proper concatenation script that\n// understands anonymous AMD modules. A named AMD is safest and most robust\n// way to register. Lowercase jquery is used because AMD module names are\n// derived from file names, and jQuery is normally delivered in a lowercase\n// file name. Do this after creating the global so that if an AMD module wants\n// to call noConflict to hide this version of jQuery, it will work.\n\n// Note that for maximum portability, libraries that are not jQuery should\n// declare themselves as anonymous modules, and avoid setting a global if an\n// AMD loader is present. jQuery is a special case. For more information, see\n// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon\n\nif ( typeof define === \"function\" && define.amd ) {\n  define( \"jquery\", [], function() {\n    return jQuery;\n  });\n}\n\n\n\n\nvar\n  // Map over jQuery in case of overwrite\n  _jQuery = window.jQuery,\n\n  // Map over the $ in case of overwrite\n  _$ = window.$;\n\njQuery.noConflict = function( deep ) {\n  if ( window.$ === jQuery ) {\n    window.$ = _$;\n  }\n\n  if ( deep && window.jQuery === jQuery ) {\n    window.jQuery = _jQuery;\n  }\n\n  return jQuery;\n};\n\n// Expose jQuery and $ identifiers, even in\n// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)\n// and CommonJS for browser emulators (#13566)\nif ( typeof noGlobal === strundefined ) {\n  window.jQuery = window.$ = jQuery;\n}\n\n\n\n\nreturn jQuery;\n\n}));\n"
  , testString = jquery
  , charLexer
  , intLexer
  , arrayCharLexer
  , functionPointerLexer
  , defaultLexer
  , logger
  , max = keywords.length - 1
  , min = 0

try {
  if(window) {
    logger = function () {
      var output = Array.prototype.slice.call(arguments)
        , pre = document.getElementById('output')

      for(i=0, ii=output.length; i<ii; ++i) {
        pre.appendChild(document.createTextNode(output[i] + '\n'))
      }
    }
  }
}
catch (e) {
  logger = console.log
}

logger('Benchmarks running, expect browser to lock up!')

for(i=0, ii=keywords.length; i<ii; ++i) {
  automaton.union(new Fragment(keywords[i]))
}

v8regex = new RegExp('(' + keywords.join('|') + ')', 'g')

arrayCharLexer = new Function('input', automaton.toString({functionDef: true, strategy: 'arrayChar'}))
charLexer = new Function('input', automaton.toString({functionDef: true, strategy: 'switchChar'}))
intLexer = new Function('input', automaton.toString({functionDef: true, strategy: 'switchInt'}))
functionPointerLexer = new Function('input', automaton.toString({functionDef: true, strategy: 'functionPointer'}))
defaultLexer = new Function('input', automaton.toString({functionDef: true, strategy: 'default'}))

// add tests
suite
.add('finite-automata (array[int][char])', function() {
  var randWord = keywords[Math.floor(Math.random() * (max - min + 1)) + min]
  testString = randWord + jquery
  arrayCharLexer(testString)
})
.add('finite-automata (switch char)', function() {
  // Make sure v8 can't cheat
  var randWord = keywords[Math.floor(Math.random() * (max - min + 1)) + min]
  testString = randWord + jquery
  charLexer(testString)
})
.add('finite-automata (switch int)', function() {
  var randWord = keywords[Math.floor(Math.random() * (max - min + 1)) + min]
  testString = randWord + jquery
  intLexer(testString)
})
.add('finite-automata (array[function])', function() {
  var randWord = keywords[Math.floor(Math.random() * (max - min + 1)) + min]
  testString = randWord + jquery
  functionPointerLexer(testString)
})
.add('finite-automata (default)', function() {
  var randWord = keywords[Math.floor(Math.random() * (max - min + 1)) + min]
  testString = randWord + jquery
  defaultLexer(testString)
})
.add('native regex (alternation)', function () {
  // Make sure v8 can't cheat
  var randWord = keywords[Math.floor(Math.random() * (max - min + 1)) + min]
  testString = randWord + jquery
  testString.match(v8regex)
})
/*
.add('jison-lex', function() {
  jisonLexer.setInput(jquery)
  logger(jisonLexer.lex())
})
*/
// add listeners
.on('cycle', function(event) {
  logger(String(event.target))
})
.on('complete', function() {
  logger('Fastest is ' + this.filter('fastest').pluck('name'))
})
// run async
.run({ 'async': false })

},{"../lib/fragment":3,"./js-keywords.json":2,"benchmark":13,"fs":14}],2:[function(require,module,exports){
module.exports=[
  "break"
, "case"
, "class"
, "catch"
, "const"
, "continue"
, "debugger"
, "default"
, "delete"
, "do"
, "else"
, "export"
, "extends"
, "finally"
, "for"
, "function"
, "if"
, "import"
, "in"
, "instanceof"
, "let"
, "new"
, "return"
, "super"
, "switch"
, "this"
, "throw"
, "try"
, "typeof"
, "var"
, "void"
, "while"
, "with"
, "yield"
]
},{}],3:[function(require,module,exports){
var Fragment
  , StateMachine = require('./machine')
  , string2dfa = require('./string2dfa')

/**
* TODO: Verifying that a definition is sensible is
* pretty expensive. There should be an option that
* doesn't require such stringent checking.
*/
Fragment = function Fragment (def) {

  // OK to be a string literal, we'll construct a fragment from that
  if(typeof def == 'string') {
    def = string2dfa(def)
  }

  var err = this.validate(def)

  if(err !== true) {
    throw err
  }

  this.initial = def.initial
  this.accept = def.accept
  this.transitions = def.transitions

}

Fragment.prototype.validate = function validate (def) {

  var i, ii, k

  if(!def) {
    return new Error('Fragment needs a definition')
  }

  if(def.initial == null) {
    return new Error('Fragment needs an initial state')
  }

  if(!Array.isArray(def.accept)) {
    return new Error('Fragment must have an array of accepted states')
  }

  if(def.transitions == null) {
    return new Error('Fragment must have a map of transitions')
  }

  // Make sure that accept states are in transitions
  for(i=0, ii=def.accept.length; i<ii; ++i) {
    if(def.transitions[def.accept[i]] == null) {
      return new Error('Accept state "' + def.accept[i] +
        '" does not exist in the transition map')
    }
  }

  // Make sure that transition states are in transitions
  for(k in def.transitions) {
    if(!Array.isArray(def.transitions[k])) {
      return new Error('The transitions for ' + k + ' must be an array')
    }

    for(i=1, ii=def.transitions[k].length; i<ii; i += 2) {
      if(def.transitions[def.transitions[k][i]] == null) {
      return new Error('Transitioned to ' + def.transitions[k][i] +
        ', which does not exist in the transition map')
      }
    }
  }

  return true

}

/**
* Simulates this fragment on the input
*/
Fragment.prototype.test = function test (input) {
  return new StateMachine(this).accepts(input)
}

/**
* Returns optimized code for this fragment
*/
Fragment.prototype.toString = function toString (opts) {
  opts = opts || {}

  opts.functionDef = !opts.functionDef

  return new StateMachine(this).toString(opts)
}

Fragment.prototype.concat = function concat (other) {
  // When joining a to b, b should disambiguate itself from a
  other._resolveCollisions(this)

  var bInitial = other.initial

  // Point the final states of a to the initial state of b
  for(var i=0, ii=this.accept.length; i<ii; ++i) {
    this.transitions[this.accept[i]].push('\0', bInitial)
  }

  // Add all transitions from b to a
  for(var k in other.transitions) {
    this.transitions[k] = other.transitions[k]
  }

  this.accept = other.accept

  return this
}

Fragment.prototype.union = function union (other) {
  // When joining a to b, b should disambiguate itself from a
  other._resolveCollisions(this)

  // Create a new initial state
  var original = 'union'
    , suffix = '`'
    , newStateKey = original + suffix
    , oldInitial = this.initial

  // Watch for collisions in both sides!
  while(this._hasState(newStateKey)) {
    suffix = suffix + '`'
    newStateKey = original + suffix
  }

  this.initial = newStateKey

  // Point new state to the other two initial states with epsilon transitions
  this.transitions[this.initial] = ['\0', oldInitial, '\0', other.initial]

  // Add all transitions from b to a
  for(var k in other.transitions) {
    this.transitions[k] = other.transitions[k]
  }

  this.accept.push.apply(this.accept, other.accept)

  return this
}

/**
* Check out: https://cloudup.com/c64GMr1lTFj
* Source: http://courses.engr.illinois.edu/cs373/sp2009/lectures/lect_06.pdf
*/
Fragment.prototype.repeat = function repeat () {

  // Create a new initial state
  var original = 'repeat'
    , suffix = '`'
    , newStateKey = original


  suffix = '`'

  newStateKey = original + suffix

  while(this._hasState(newStateKey)) {
    suffix = suffix + '`'
    newStateKey = original + suffix
  }

  // Point the final states to the initial state of b
  for(var i=0, ii=this.accept.length; i<ii; ++i) {
    this.transitions[this.accept[i]].push('\0', this.initial)
  }

  this.transitions[newStateKey] = ['\0', this.initial]

  this.initial = newStateKey
  this.accept.push(newStateKey)

  return this
}

Fragment.prototype.states = function states () {
  return Object.keys(this.transitions)
}

/**
* Resolves collisions with `other` by renaming `this`'s states
*/
Fragment.prototype._resolveCollisions = function _resolveCollisions (other) {
  var states = other.states()
    , needle
    , original
    , suffix

  for(var i=0, ii=states.length; i<ii; ++i) {
    needle = states[i]

    if(!this._hasState(needle)) {
      continue
    }

    original = needle
    suffix = '`'

    needle = original + suffix

    while(this._hasState(needle)) {
      suffix = suffix + '`'
      needle = original + suffix
    }

    this._renameState(original, needle)
  }

  return true
}

Fragment.prototype._hasState = function _hasState (needle) {
  return this.transitions[needle] != null
}

/**
* Renames the state `from` to `to`
*/
Fragment.prototype._renameState = function _renameState (from, to) {
  var t = this.transitions[from]
    , i = 0
    , ii = 0

  if(t == null) {
    throw new Error('The state ' + from + ' does not exist')
  }

  if(this.initial == from) {
    this.initial = to
  }

  delete this.transitions[from]
  this.transitions[to] = t

  for(var k in this.transitions) {
    for(i=1, ii=this.transitions[k].length; i<ii; i += 2) {
      if(this.transitions[k][i] == from) {
        this.transitions[k][i] = to
      }
    }
  }

  for(i=0, ii=this.accept.length; i<ii; ++i) {
    if(this.accept[i] == from) {
      this.accept[i] = to
    }
  }
}

module.exports = Fragment

},{"./machine":9,"./string2dfa":12}],4:[function(require,module,exports){

function dfa2lexer (def) {
  var out

  out = (
        def.functionDef ?
        'function lexer (input) {\n' :
        ''
        ) +
        // the current state of the lexer
        '  var s = ' + def.initial + '\n' +
        // the accept states of the lexer
        '    , a = [' + def.accept.join(', ') + ']\n' +
        // for loop bounds
        '    , i = 0\n' +
        '    , ii = input.length\n' +
        // the current character being inspected
        '    , c = \'c\'\n' +
        // where the initial state was last reset
        '    , m = 0\n' +
        // where matched tokens are stored
        '    , r = []\n' +
        // state lookup shiznit
        '    , t = ' + JSON.stringify(def.transitionTable) + '\n' +
        '  for (; i<ii; ++i) {\n' +
        '    c = t[s][input.charAt(i)]\n' +
        // If a transition was found, change state and advance
        '    if(c !== undefined) {\n' +
        '      s = c\n' +
        '    }\n' +
        // No transition out of this state for that char
        // Check if the last state was an accept state
        '    else if (a.indexOf(s) >= 0) {\n' +
        '      r.push(input.slice(m, i))\n' +
               // Reset to initial state
        '      m = i\n' +
        '      i = i - 1\n' +
        '      s = ' + def.initial + '\n' +
        '    }\n' +
        // All but the initial state does not get to try again
        '    else if (s !== ' + def.initial + ') {\n' +
        '      m = i\n' +
        '      i = i - 1\n' +
        '      s = ' + def.initial + '\n' +
        '    }\n' +
        '    else {\n' +
        '      m = i + 1\n' +
        '    }\n' +
        '  }\n' + // end for loop
        // Without this, the lexer will not flush the last token if it matches
        '  if (a.indexOf(s) >= 0) {\n' +
        '    // Append the matched token\n' +
        '    r.push(input.slice(m))\n' +
        '  }\n' +
        '  return r\n' +
        (
        def.functionDef ?
        '}\n' :
        '\n' // End function
        )

  return out
}

module.exports = dfa2lexer

},{}],5:[function(require,module,exports){
(function (Buffer){
var hbs = require('handlebars')
  , fs = require('fs')
  , template

hbs.registerPartial('fallbackPartial'
  , Buffer("ICAgICAgICAgIGlmIChpc01hdGNoZWQpIHsKICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGlucHV0LnNsaWNlKGxhc3RNYXRjaCwgaSkpCiAgICAgICAgICB9CgogICAgICAgICAgY3VycmVudFN0YXRlID0ge3tpbml0aWFsU3RhdGV9fQoKICAgICAgICAgIHt7I2lmIGluaXRpYWxTdGF0ZUlzQWNjZXB0ZWR9fQogICAgICAgICAgaXNNYXRjaGVkID0gdHJ1ZQogICAgICAgICAge3tlbHNlfX0KICAgICAgICAgIGlzTWF0Y2hlZCA9IGZhbHNlCiAgICAgICAgICB7ey9pZn19CgogICAgICAgICAge3sjaWYgaXNJbml0aWFsU3RhdGV9fQogICAgICAgICAgbGFzdE1hdGNoID0gaSArIDEKICAgICAgICAgIHt7ZWxzZX19CiAgICAgICAgICBsYXN0TWF0Y2ggPSBpCiAgICAgICAgICBpID0gaSAtIDEKICAgICAgICAgIHt7L2lmfX0K","base64").toString())
hbs.registerPartial('manyTransitionsPartial'
  , Buffer("ICAgICAge3sjaWYgQGZpcnN0fX0KICAgICAgKGZ1bmN0aW9uICgpIHsKICAgICAge3tlbHNlfX0KICAgICwgKGZ1bmN0aW9uICgpIHsKICAgICAge3svaWZ9fQogICAgICAgIHZhciBpbnB1dHMgPSBbXQoKICAgICAgICB7eyNlYWNoIGNoYXJhY3RlcnN9fQogICAgICAgIGlucHV0c1t7e2NoYXJDb2RlfX1dID0gZnVuY3Rpb24gKCkgewogICAgICAgICAgY3VycmVudFN0YXRlID0ge3t0YXJnZXRTdGF0ZX19CiAgICAgICAgICB7eyNpZiB0YXJnZXRJc0FjY2VwdGVkfX0KICAgICAgICAgIGlzTWF0Y2hlZCA9IHRydWUKICAgICAgICAgIHt7ZWxzZX19CiAgICAgICAgICBpc01hdGNoZWQgPSBmYWxzZQogICAgICAgICAge3svaWZ9fQogICAgICAgIH0KICAgICAgICB7ey9lYWNofX0KCiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHsKICAgICAgICAgIHZhciB0ID0gaW5wdXRzW2lucHV0LmNoYXJDb2RlQXQoaSldCgogICAgICAgICAgaWYodCkgewogICAgICAgICAgICB0KCkKICAgICAgICAgIH0KICAgICAgICAgIGVsc2Ugewp7ez5mYWxsYmFja1BhcnRpYWx9fQogICAgICAgICAgfQogICAgICAgIH07CiAgICAgIH0oKSkK","base64").toString())
hbs.registerPartial('severalTransitionsPartial'
  , Buffer("ICAgICAge3sjaWYgQGZpcnN0fX0KICAgICAgZnVuY3Rpb24gKCkgewogICAgICB7e2Vsc2V9fQogICAgLCBmdW5jdGlvbiAoKSB7CiAgICAgIHt7L2lmfX0KICAgICAgICAgICAgICBzd2l0Y2ggKGlucHV0LmNoYXJDb2RlQXQoaSkpIHsKICAgICAgICAgIHt7I2VhY2ggY2hhcmFjdGVyc319CiAgICAgICAgICBjYXNlIHt7Y2hhckNvZGV9fToKICAgICAgICAgICAgY3VycmVudFN0YXRlID0ge3t0YXJnZXRTdGF0ZX19CiAgICAgICAgICAgIHt7I2lmIHRhcmdldElzQWNjZXB0ZWR9fQogICAgICAgICAgICBpc01hdGNoZWQgPSB0cnVlCiAgICAgICAgICAgIHt7ZWxzZX19CiAgICAgICAgICAgIGlzTWF0Y2hlZCA9IGZhbHNlCiAgICAgICAgICAgIHt7L2lmfX0KICAgICAgICAgICAgYnJlYWsKICAgICAgICAgIHt7L2VhY2h9fQoKICAgICAgICAgIGRlZmF1bHQ6Cnt7PmZhbGxiYWNrUGFydGlhbH19CiAgICAgICAgfQogICAgICB9","base64").toString())
hbs.registerPartial('oneTransitionPartial'
  , Buffer("ICAgICAge3sjaWYgQGZpcnN0fX0KICAgICAgZnVuY3Rpb24gKCkgewogICAgICB7e2Vsc2V9fQogICAgLCBmdW5jdGlvbiAoKSB7CiAgICAgIHt7L2lmfX0KICAgICAgICAgICAgICBpZiAoaW5wdXQuY2hhckNvZGVBdChpKSA9PSB7e2NoYXJDb2RlfX0pIHsKICAgICAgICAgIGN1cnJlbnRTdGF0ZSA9IHt7dGFyZ2V0U3RhdGV9fQogICAgICAgICAge3sjaWYgdGFyZ2V0SXNBY2NlcHRlZH19CiAgICAgICAgICBpc01hdGNoZWQgPSB0cnVlCiAgICAgICAgICB7e2Vsc2V9fQogICAgICAgICAgaXNNYXRjaGVkID0gZmFsc2UKICAgICAgICAgIHt7L2lmfX0KICAgICAgICB9CiAgICAgICAgZWxzZSB7Cnt7PmZhbGxiYWNrUGFydGlhbH19CiAgICAgICAgfQogICAgICB9Cg==","base64").toString())
hbs.registerPartial('noTransitionsPartial'
  , Buffer("CiAgICAgIHt7I2lmIEBmaXJzdH19CiAgICAgIGZ1bmN0aW9uICgpIHsKICAgICAge3tlbHNlfX0KICAgICwgZnVuY3Rpb24gKCkgewogICAgICB7ey9pZn19CiAgICAgIHt7PmZhbGxiYWNrUGFydGlhbH19CiAgICAgIH0K","base64").toString())

template = hbs.compile(Buffer("e3sjaWYgZnVuY3Rpb25EZWZ9fQpmdW5jdGlvbiBsZXhlcihpbnB1dCkgewp7ey9pZn19Cgp2YXIgY3VycmVudFN0YXRlID0ge3tpbml0aWFsU3RhdGV9fQp7eyNpZiBpbml0aWFsU3RhdGVJc0FjY2VwdGVkfX0KICAsIGlzTWF0Y2hlZCA9IHRydWUKe3tlbHNlfX0KICAsIGlzTWF0Y2hlZCA9IGZhbHNlCnt7L2lmfX0KICAsIGkgPSAwCiAgLCBpaSA9IGlucHV0Lmxlbmd0aAogICwgbGFzdE1hdGNoID0gMAogICwgcmVzdWx0cyA9IFtdCiAgLCB0cmFuc2l0aW9ucyA9IFsKCiAgICB7eyNlYWNoIHRyYW5zaXRpb25zfX0KICAgICAge3sjaWYgbWFueVRyYW5zaXRpb25zfX0Ke3s+bWFueVRyYW5zaXRpb25zUGFydGlhbH19CiAgICAgIHt7L2lmfX0KICAgICAge3sjaWYgc2V2ZXJhbFRyYW5zaXRpb25zfX0Ke3s+c2V2ZXJhbFRyYW5zaXRpb25zUGFydGlhbH19CiAgICAgIHt7L2lmfX0KICAgICAge3sjaWYgb25lVHJhbnNpdGlvbn19Cnt7Pm9uZVRyYW5zaXRpb25QYXJ0aWFsfX0KICAgICAge3svaWZ9fQogICAgICB7eyNpZiBub1RyYW5zaXRpb25zfX0Ke3s+bm9UcmFuc2l0aW9uc1BhcnRpYWx9fQogICAgICB7ey9pZn19CiAgICB7ey9lYWNofX0KCiAgICBdCgogICAgZm9yICg7aTxpaTsrK2kpIHsKICAgICAgdHJhbnNpdGlvbnNbY3VycmVudFN0YXRlXSgpCiAgICB9CgogICAgaWYgKGlzTWF0Y2hlZCkgewogICAgICByZXN1bHRzLnB1c2goaW5wdXQuc2xpY2UobGFzdE1hdGNoKSkKICAgIH0KCiAgICByZXR1cm4gcmVzdWx0cwoKe3sjaWYgZnVuY3Rpb25EZWZ9fQp9Cnt7L2lmfX0K","base64").toString())

function dfa2lexer (def) {
  var i = 0
    , ii = def.transitionTable.length
    , remapped = new Array(ii)
    , k = ''
    , initialStateIsAccepted = (def.accept.indexOf(def.initial) >= 0)

  for(; i<ii; ++i) {
    var keys = Object.keys(def.transitionTable[i])

    remapped[i] = {
      isInitialState: i === def.initial
    , initialState: def.initial
    , initialStateIsAccepted: initialStateIsAccepted
    }

    if(keys.length > 1) {
      // TODO: Figure out what this magic number should really be!
      if(keys.length > 40) {
        remapped[i].manyTransitions = true
      }
      else {
        remapped[i].severalTransitions = true
      }

      remapped[i].characters = {}

      for(k in def.transitionTable[i]) {
        remapped[i].characters[k] = {
          charCode: k.charCodeAt(0)
        , chr: k.charAt(0)
        , targetState: def.transitionTable[i][k]
        , targetIsAccepted: def.accept.indexOf(def.transitionTable[i][k]) >= 0
        , initialState: def.initial
        , initialStateIsAccepted: initialStateIsAccepted
        }
      }
    }
    else if(keys.length === 1) {
      remapped[i].oneTransition = true
      remapped[i].charCode = keys[0].charCodeAt(0)
      remapped[i].targetState = def.transitionTable[i][keys[0]]
      remapped[i].targetIsAccepted = def.accept.indexOf(def.transitionTable[i][keys[0]]) >= 0
    }
    else {
      remapped[i].noTransitions = true
    }
  }

  return template({
    functionDef: def.functionDef
  , initialState: def.initial
  , initialStateIsAccepted: initialStateIsAccepted
  , transitions: remapped
  })
}

module.exports = dfa2lexer

}).call(this,require("buffer").Buffer)
},{"buffer":15,"fs":14,"handlebars":33}],6:[function(require,module,exports){

function dfa2lexer (def) {
  var out =         (
                    def.functionDef ?
                    'function lexer (input) {\n' :
                    ''
                    ) +
                    // the current state of the lexer
                    '  var s = ' + def.initial + '\n' +
                    // the accept states of the lexer
                    '    , a = [' + def.accept.join(', ') + ']\n' +
                    // for loop bounds
                    '    , i = 0\n' +
                    '    , ii = input.length\n' +
                    // where the initial state was last reset
                    '    , m = 0\n' +
                    // where matched tokens are stored
                    '    , r = []\n' +
                    // where the state functions are stored
                    '    , t = [\n'
    , i = 0
    , ii = def.transitionTable.length
    , chrMap = {}
    , chr

  for (; i<ii; ++i) {
    out = out +     (i === 0 ? '   ' : '  ,') +
                      '   function () {\n' +
                    '        switch (input.charCodeAt(i)) {\n'

    chrMap = def.transitionTable[i]

    for (chr in chrMap) {
      out = out +   '          case ' + chr.charCodeAt(0) + ': s = ' + chrMap[chr] + '; break\n'
    }

    out = out +     '          default:\n' +
                    // No transition out of this state for that char
                    // Check if the last state was accepting
                    '          if (a.indexOf(s) >= 0) {\n' +
                    '            // Append the matched token\n' +
                    '            r.push(input.slice(m, i))\n' +
                    '          }\n'

    // The initial state doesn't get to retry otherwise
    // you'll go into infinite loops
    if(i != def.initial) {
      out = out +   // Restart lexer on this character
                    '          if(s !== ' + def.initial + ') {\n' +
                    '            s = ' + def.initial + '\n' +
                    '          }\n' +
                    '          i = i - 1\n'
    }
    else {
                    // Restart lexer on this character
      out = out +   '          if(s !== ' + def.initial + ') {\n' +
                    '            s = ' + def.initial + '\n' +
                    '          }\n'
    }
                    // The next valid match should be what i is on the next iteration
    out = out +     '          m = i + 1\n' +
                    '        }\n' +
                    '      }\n'
  }

    out = out +     '  ]\n' +
                    '  for (; i<ii; ++i) {\n' +
                    '    t[s]()\n' +
                    '  }\n'

  out = out +       // Without this, the lexer will not flush the last token if it matches
                    '  if (a.indexOf(s) >= 0) {\n' +
                    '    // Append the matched token\n' +
                    '    r.push(input.slice(m))\n' +
                    '  }\n' +
                    '  return r\n' + // end for loop
                    (
                    def.functionDef ?
                    '}\n' :
                    '\n' // End function
                    )


  return out
}

module.exports = dfa2lexer

},{}],7:[function(require,module,exports){

function dfa2lexer (def) {
  var out =         (
                    def.functionDef ?
                    'function lexer (input) {\n' :
                    ''
                    ) +
                    // the current state of the lexer
                    '  var s = ' + def.initial + '\n' +
                    // the accept states of the lexer
                    '    , a = [' + def.accept.join(', ') + ']\n' +
                    // for loop bounds
                    '    , i = 0\n' +
                    '    , ii = input.length\n' +
                    // the current character being inspected
                    '    , c = \'c\'\n' +
                    // where the initial state was last reset
                    '    , m = 0\n' +
                    // where matched tokens are stored
                    '    , r = []\n' +
                    '  for (; i<ii; ++i) {\n' +
                    '    c = input.charAt(i)\n' +
                    '    switch (s) {\n'
    , i = 0
    , ii = def.transitionTable.length
    , chrMap = {}
    , chr

  for (; i<ii; ++i) {
    // State is an integer
    out = out +     '      case ' + i + ':\n' +
                    '        switch (c) {\n'

    chrMap = def.transitionTable[i]

    for (chr in chrMap) {
      out = out +   '          case \'' + (chr == '\'' ? '\\\'' : chr) + '\': s = ' + chrMap[chr] + '; break\n'
    }

    out = out +     '          default:\n' +
                    // No transition out of this state for that char
                    // Check if the last state was accepting
                    '          if (a.indexOf(s) >= 0) {\n' +
                    '            // Append the matched token\n' +
                    '            r.push(input.slice(m, i))\n' +
                    '          }\n'

    // The initial state doesn't get to retry otherwise
    // you'll go into infinite loops
    if(i != def.initial) {
      out = out +   // Restart lexer on this character
                    '          if(s !== ' + def.initial + ') {\n' +
                    '            s = ' + def.initial + '\n' +
                    '          }\n' +
                    '          i = i - 1\n'
    }
    else {
                    // Restart lexer on this character
      out = out +   '          if(s !== ' + def.initial + ') {\n' +
                    '            s = ' + def.initial + '\n' +
                    '          }\n'
    }
                    // The next valid match should be what i is on the next iteration
    out = out +     '          m = i + 1\n' +
                    '        }\n' +
                    '      break\n'
  }

  out = out +       '' +
                    '    }\n' + // end outer switch
                    '  }\n' + // end for loop
                    // Without this, the lexer will not flush the last token if it matches
                    '  if (a.indexOf(s) >= 0) {\n' +
                    '    // Append the matched token\n' +
                    '    r.push(input.slice(m))\n' +
                    '  }\n' +
                    '  return r\n' + // end for loop
                    (
                    def.functionDef ?
                    '}\n' :
                    '\n' // End function
                    )

  return out
}

module.exports = dfa2lexer

},{}],8:[function(require,module,exports){

function dfa2lexer (def) {
  var out =         (
                    def.functionDef ?
                    'function lexer (input) {\n' :
                    ''
                    ) +
                    // the current state of the lexer
                    '  var s = ' + def.initial + '\n' +
                    // the accept states of the lexer
                    '    , a = [' + def.accept.join(', ') + ']\n' +
                    // for loop bounds
                    '    , i = 0\n' +
                    '    , ii = input.length\n' +
                    // where the initial state was last reset
                    '    , m = 0\n' +
                    // where matched tokens are stored
                    '    , r = []\n' +
                    '  for (; i<ii; ++i) {\n' +
                    '    switch (s) {\n'
    , i = 0
    , ii = def.transitionTable.length
    , chrMap = {}
    , chr

  for (; i<ii; ++i) {
    // State is an integer
    out = out +     '      case ' + i + ':\n' +
                    '        switch (input.charCodeAt(i)) {\n'

    chrMap = def.transitionTable[i]

    for (chr in chrMap) {
      out = out +   '          case ' + chr.charCodeAt(0) + ': s = ' + chrMap[chr] + '; break\n'
    }

    out = out +     '          default:\n' +
                    // No transition out of this state for that char
                    // Check if the last state was accepting
                    '          if (a.indexOf(s) >= 0) {\n' +
                    '            // Append the matched token\n' +
                    '            r.push(input.slice(m, i))\n' +
                    '          }\n'

    // The initial state doesn't get to retry otherwise
    // you'll go into infinite loops
    if(i != def.initial) {
      out = out +   // Restart lexer on this character
                    '          if(s !== ' + def.initial + ') {\n' +
                    '            s = ' + def.initial + '\n' +
                    '          }\n' +
                    '          i = i - 1\n'
    }
    else {
                    // Restart lexer on this character
      out = out +   '          if(s !== ' + def.initial + ') {\n' +
                    '            s = ' + def.initial + '\n' +
                    '          }\n'
    }
                    // The next valid match should be what i is on the next iteration
    out = out +     '          m = i + 1\n' +
                    '        }\n' +
                    '      break\n'
  }

  out = out +       '' +
                    '    }\n' + // end outer switch
                    '  }\n' + // end for loop
                    // Without this, the lexer will not flush the last token if it matches
                    '  if (a.indexOf(s) >= 0) {\n' +
                    '    // Append the matched token\n' +
                    '    r.push(input.slice(m))\n' +
                    '  }\n' +
                    '  return r\n' + // end for loop
                    (
                    def.functionDef ?
                    '}\n' :
                    '\n' // End function
                    )

  return out
}

module.exports = dfa2lexer

},{}],9:[function(require,module,exports){
var StateMachine
  , minimize = require('./minimize')
  , lexers = {
      'default': require('./lexers/default')
    , 'switchInt': require('./lexers/switchInt')
    , 'switchChar': require('./lexers/switchChar')
    , 'arrayChar': require('./lexers/arrayChar')
    , 'functionPointer': require('./lexers/functionPointer')
    }

StateMachine = function StateMachine (fragment) {
  var dfa = minimize(fragment)
    , tableDesc = this._createTable(dfa.transitions)
    , i = 0
    , ii = dfa.accept.length

  this._stateMap = tableDesc[0]
  this._table = tableDesc[1]
  this._initial = this._stateMap[dfa.initial]
  this._accept = []

  for(; i<ii; ++i) {
    this._accept.push(this._stateMap[dfa.accept[i]])
  }
}

StateMachine.prototype._createTable = function _createTable (transitions) {
  var states = Object.keys(transitions).sort()
    , i = 0
    , ii = states.length
    , j = 0
    , jj = 0
    , state = ''
    , chr = ''
      // char is the column, state is the row
    , fastTable = {}
    , stateMap = {}

  // Add all states to the map
  for(; i<ii; ++i) {
    stateMap[states[i]] = i
  }

  fastTable = new Array(states.length)

  for(state in transitions) {
    if(fastTable[stateMap[state]] == null) {
      fastTable[stateMap[state]] = {}
    }

    for(j=0, jj=transitions[state].length; j<jj; j+=2) {
      chr = transitions[state][j]

      fastTable[stateMap[state]][chr] = stateMap[transitions[state][j + 1]]
    }
  }

  return [stateMap, fastTable]
}

StateMachine.prototype.accepts = function exec (input) {
  var i = 0
    , ii = input.length
    , result = 0

  this._state = this._initial

  for(; i<ii; ++i) {
    result = this._table[this._state][input.charAt(i)]

    if(result === undefined) {
      return false
    }
    else {
      this._state = result
    }
  }

  return this._accept.indexOf(this._state) >= 0
}

StateMachine.prototype.toString = function toString (opts) {
  var def = {
        initial: this._initial
      , accept: this._accept
      , transitionTable: this._table
      , functionDef: opts.functionDef
      }

  if(opts.strategy) {
    return lexers[opts.strategy](def)
  }

  return lexers['default'](def)
}

module.exports = StateMachine

},{"./lexers/arrayChar":4,"./lexers/default":5,"./lexers/functionPointer":6,"./lexers/switchChar":7,"./lexers/switchInt":8,"./minimize":10}],10:[function(require,module,exports){
var nfa2dfa = require('./nfa2dfa')

function reverse (dfa) {
  var newInitial = 'rI'
    , dfaStates = Object.keys(dfa.transitions)
    , nfa
    , i = 0
    , ii = dfa.accept.length
    , state
    , trans

  while(dfaStates.indexOf(newInitial) >= 0) {
    newInitial = newInitial + '`'
  }

  nfa = {
    initial: newInitial
  , accept: [dfa.initial]
  , transitions: {}
  }

  nfa.transitions[newInitial] = []

  for (; i<ii; ++i) {
    nfa.transitions[newInitial].push('\0', dfa.accept[i])
  }

  // Reverse all transitions
  for(state in dfa.transitions) {
    trans = dfa.transitions[state]

    if(nfa.transitions[state] == null) {
      nfa.transitions[state] = []
    }

    for (i=0, ii=trans.length; i<ii; i += 2) {
      if(nfa.transitions[trans[i + 1]] == null) {
        nfa.transitions[trans[i + 1]] = []
      }

      nfa.transitions[trans[i + 1]].push(trans[i], state)
    }
  }

  return nfa
}

function minimize (dfa, delimiter) {
  // wtf this actually works??
  return nfa2dfa(reverse(nfa2dfa(reverse(nfa2dfa(dfa, delimiter)), delimiter)), delimiter)
}

module.exports = minimize

},{"./nfa2dfa":11}],11:[function(require,module,exports){
function nfa2dfa (frag, delimiter) {

  if(delimiter == null) {
    // Just some obscure char that looks like a pipe
    delimiter = String.fromCharCode(3193)
  }

  /**
  * Returns the closure of the state.
  * This means all states reachable via epsilon-transitions
  *
  * State is singular but actually an array of states
  * because the subset construction creates states
  * that are the union of other states
  */
  function closureOf (state) {
    var i = 0
      , ii = 0
      , j = 0
      , jj = 0
      , trans
      , closure = [].concat(state)
      , discoveredStates

    while(true) {
      discoveredStates = []

      for(i=0, ii=closure.length; i<ii; ++i) {
        trans = frag.transitions[closure[i]]
        for(j=0, jj=trans.length; j<jj; j += 2) {
          // Match epsilon transitions
          if(trans[j] == '\0') {
            // Push destination state to output
            if(closure.indexOf(trans[j + 1]) < 0) {
              discoveredStates.push(trans[j + 1])
            }
          }
        }
      }

      if(discoveredStates.length === 0) {
        break
      }
      else {
        closure.push.apply(closure, discoveredStates)
      }

      discoveredStates = []
    }

    // This makes it possible to do a deep compare on macrostates quickly
    return closure.sort()
  }

  /**
  * State is singular but actually an array of states
  * because the subset construction creates states
  * that are the union of other states
  */
  function goesTo (state, chr) {
    var output = []
      , i = 0
      , ii = state.length
      , j = 0
      , jj = 0
      , trans

    for(; i<ii; ++i) {
      trans = frag.transitions[state[i]]

      for(j=0, jj=trans.length; j<jj; j += 2) {
        if(trans[j] == chr) {
          // Push destination state onto output
          output.push(trans[j + 1])
        }
      }
    }

    return closureOf(output)
  }

  /**
  * Returns the characters that allow
  * a transition out of the state
  */
  function exits (state) {
    var chars = []
      , i = 0
      , ii = state.length
      , j = 0
      , jj = 0
      , trans

    for(; i<ii; ++i) {
      trans = frag.transitions[state[i]]

      for(j=0, jj=trans.length; j<jj; j += 2) {
        if(trans[j] != '\0' && chars.indexOf(trans[j]) < 0) {
          chars.push(trans[j])
        }
      }
    }

    return chars
  }

  // Start algorithm by computing the closure of state 0
  var processStack = [closureOf([frag.initial])]
    , initalStateKey = processStack[0].join(delimiter)
    , current = []
    , exitChars = []
    , i = 0
    , ii = 0
    , j = 0
    , jj = 0
    , discoveredState
    , currentStateKey = ''
    , discoveredStateKey = ''
    , transitionTable = {}
    , acceptStates = []

  // Build the transition table
  while(processStack.length > 0) {
    current = processStack.pop()
    currentStateKey = current.join(delimiter)
    transitionTable[currentStateKey] = []

    // Get all characters leaving this state
    exitChars = exits(current)

    // Run goTo on each character
    for(i=0, ii=exitChars.length; i<ii; ++i) {
      discoveredState = goesTo(current, exitChars[i])
      discoveredStateKey = discoveredState.join(delimiter)

      if(!transitionTable[discoveredStateKey] && discoveredStateKey != currentStateKey) {
        processStack.push(discoveredState)
      }

      // A macrostate is an accept state if it contains any accept microstate
      for(j=0, jj=discoveredState.length; j<jj; ++j) {
        if(frag.accept.indexOf(discoveredState[j]) >= 0 &&
          acceptStates.indexOf(discoveredStateKey) < 0) {
          acceptStates.push(discoveredStateKey)
        }
      }

      transitionTable[currentStateKey].push(exitChars[i], discoveredStateKey)
    }
  }

  // Return the definition
  return {
    initial: initalStateKey
  , accept: acceptStates
  , transitions: transitionTable
  }
}

module.exports = nfa2dfa

},{}],12:[function(require,module,exports){

function string2dfa (str) {
  var cur
    , def = {
        initial: 0
      , accept: [str.length]
      , transitions: {}
      }

  for(var i=0, ii=str.length; i<ii; ++i) {
    cur = str.charAt(i)
    def.transitions[i] = [cur, i+1]
  }

  // Accept state
  def.transitions[i] = []

  return def
}

module.exports = string2dfa

},{}],13:[function(require,module,exports){
(function (process,global){
/*!
 * Benchmark.js v1.0.0 <http://benchmarkjs.com/>
 * Copyright 2010-2012 Mathias Bynens <http://mths.be/>
 * Based on JSLitmus.js, copyright Robert Kieffer <http://broofa.com/>
 * Modified by John-David Dalton <http://allyoucanleet.com/>
 * Available under MIT license <http://mths.be/mit>
 */
;(function(window, undefined) {
  'use strict';

  /** Used to assign each benchmark an incrimented id */
  var counter = 0;

  /** Detect DOM document object */
  var doc = isHostType(window, 'document') && document;

  /** Detect free variable `define` */
  var freeDefine = typeof define == 'function' &&
    typeof define.amd == 'object' && define.amd && define;

  /** Detect free variable `exports` */
  var freeExports = typeof exports == 'object' && exports &&
    (typeof global == 'object' && global && global == global.global && (window = global), exports);

  /** Detect free variable `require` */
  var freeRequire = typeof require == 'function' && require;

  /** Used to crawl all properties regardless of enumerability */
  var getAllKeys = Object.getOwnPropertyNames;

  /** Used to get property descriptors */
  var getDescriptor = Object.getOwnPropertyDescriptor;

  /** Used in case an object doesn't have its own method */
  var hasOwnProperty = {}.hasOwnProperty;

  /** Used to check if an object is extensible */
  var isExtensible = Object.isExtensible || function() { return true; };

  /** Used to access Wade Simmons' Node microtime module */
  var microtimeObject = req('microtime');

  /** Used to access the browser's high resolution timer */
  var perfObject = isHostType(window, 'performance') && performance;

  /** Used to call the browser's high resolution timer */
  var perfName = perfObject && (
    perfObject.now && 'now' ||
    perfObject.webkitNow && 'webkitNow'
  );

  /** Used to access Node's high resolution timer */
  var processObject = isHostType(window, 'process') && process;

  /** Used to check if an own property is enumerable */
  var propertyIsEnumerable = {}.propertyIsEnumerable;

  /** Used to set property descriptors */
  var setDescriptor = Object.defineProperty;

  /** Used to resolve a value's internal [[Class]] */
  var toString = {}.toString;

  /** Used to prevent a `removeChild` memory leak in IE < 9 */
  var trash = doc && doc.createElement('div');

  /** Used to integrity check compiled tests */
  var uid = 'uid' + (+new Date);

  /** Used to avoid infinite recursion when methods call each other */
  var calledBy = {};

  /** Used to avoid hz of Infinity */
  var divisors = {
    '1': 4096,
    '2': 512,
    '3': 64,
    '4': 8,
    '5': 0
  };

  /**
   * T-Distribution two-tailed critical values for 95% confidence
   * http://www.itl.nist.gov/div898/handbook/eda/section3/eda3672.htm
   */
  var tTable = {
    '1':  12.706,'2':  4.303, '3':  3.182, '4':  2.776, '5':  2.571, '6':  2.447,
    '7':  2.365, '8':  2.306, '9':  2.262, '10': 2.228, '11': 2.201, '12': 2.179,
    '13': 2.16,  '14': 2.145, '15': 2.131, '16': 2.12,  '17': 2.11,  '18': 2.101,
    '19': 2.093, '20': 2.086, '21': 2.08,  '22': 2.074, '23': 2.069, '24': 2.064,
    '25': 2.06,  '26': 2.056, '27': 2.052, '28': 2.048, '29': 2.045, '30': 2.042,
    'infinity': 1.96
  };

  /**
   * Critical Mann-Whitney U-values for 95% confidence
   * http://www.saburchill.com/IBbiology/stats/003.html
   */
  var uTable = {
    '5':  [0, 1, 2],
    '6':  [1, 2, 3, 5],
    '7':  [1, 3, 5, 6, 8],
    '8':  [2, 4, 6, 8, 10, 13],
    '9':  [2, 4, 7, 10, 12, 15, 17],
    '10': [3, 5, 8, 11, 14, 17, 20, 23],
    '11': [3, 6, 9, 13, 16, 19, 23, 26, 30],
    '12': [4, 7, 11, 14, 18, 22, 26, 29, 33, 37],
    '13': [4, 8, 12, 16, 20, 24, 28, 33, 37, 41, 45],
    '14': [5, 9, 13, 17, 22, 26, 31, 36, 40, 45, 50, 55],
    '15': [5, 10, 14, 19, 24, 29, 34, 39, 44, 49, 54, 59, 64],
    '16': [6, 11, 15, 21, 26, 31, 37, 42, 47, 53, 59, 64, 70, 75],
    '17': [6, 11, 17, 22, 28, 34, 39, 45, 51, 57, 63, 67, 75, 81, 87],
    '18': [7, 12, 18, 24, 30, 36, 42, 48, 55, 61, 67, 74, 80, 86, 93, 99],
    '19': [7, 13, 19, 25, 32, 38, 45, 52, 58, 65, 72, 78, 85, 92, 99, 106, 113],
    '20': [8, 14, 20, 27, 34, 41, 48, 55, 62, 69, 76, 83, 90, 98, 105, 112, 119, 127],
    '21': [8, 15, 22, 29, 36, 43, 50, 58, 65, 73, 80, 88, 96, 103, 111, 119, 126, 134, 142],
    '22': [9, 16, 23, 30, 38, 45, 53, 61, 69, 77, 85, 93, 101, 109, 117, 125, 133, 141, 150, 158],
    '23': [9, 17, 24, 32, 40, 48, 56, 64, 73, 81, 89, 98, 106, 115, 123, 132, 140, 149, 157, 166, 175],
    '24': [10, 17, 25, 33, 42, 50, 59, 67, 76, 85, 94, 102, 111, 120, 129, 138, 147, 156, 165, 174, 183, 192],
    '25': [10, 18, 27, 35, 44, 53, 62, 71, 80, 89, 98, 107, 117, 126, 135, 145, 154, 163, 173, 182, 192, 201, 211],
    '26': [11, 19, 28, 37, 46, 55, 64, 74, 83, 93, 102, 112, 122, 132, 141, 151, 161, 171, 181, 191, 200, 210, 220, 230],
    '27': [11, 20, 29, 38, 48, 57, 67, 77, 87, 97, 107, 118, 125, 138, 147, 158, 168, 178, 188, 199, 209, 219, 230, 240, 250],
    '28': [12, 21, 30, 40, 50, 60, 70, 80, 90, 101, 111, 122, 132, 143, 154, 164, 175, 186, 196, 207, 218, 228, 239, 250, 261, 272],
    '29': [13, 22, 32, 42, 52, 62, 73, 83, 94, 105, 116, 127, 138, 149, 160, 171, 182, 193, 204, 215, 226, 238, 249, 260, 271, 282, 294],
    '30': [13, 23, 33, 43, 54, 65, 76, 87, 98, 109, 120, 131, 143, 154, 166, 177, 189, 200, 212, 223, 235, 247, 258, 270, 282, 293, 305, 317]
  };

  /**
   * An object used to flag environments/features.
   *
   * @static
   * @memberOf Benchmark
   * @type Object
   */
  var support = {};

  (function() {

    /**
     * Detect Adobe AIR.
     *
     * @memberOf Benchmark.support
     * @type Boolean
     */
    support.air = isClassOf(window.runtime, 'ScriptBridgingProxyObject');

    /**
     * Detect if `arguments` objects have the correct internal [[Class]] value.
     *
     * @memberOf Benchmark.support
     * @type Boolean
     */
    support.argumentsClass = isClassOf(arguments, 'Arguments');

    /**
     * Detect if in a browser environment.
     *
     * @memberOf Benchmark.support
     * @type Boolean
     */
    support.browser = doc && isHostType(window, 'navigator');

    /**
     * Detect if strings support accessing characters by index.
     *
     * @memberOf Benchmark.support
     * @type Boolean
     */
    support.charByIndex =
      // IE 8 supports indexes on string literals but not string objects
      ('x'[0] + Object('x')[0]) == 'xx';

    /**
     * Detect if strings have indexes as own properties.
     *
     * @memberOf Benchmark.support
     * @type Boolean
     */
    support.charByOwnIndex =
      // Narwhal, Rhino, RingoJS, IE 8, and Opera < 10.52 support indexes on
      // strings but don't detect them as own properties
      support.charByIndex && hasKey('x', '0');

    /**
     * Detect if Java is enabled/exposed.
     *
     * @memberOf Benchmark.support
     * @type Boolean
     */
    support.java = isClassOf(window.java, 'JavaPackage');

    /**
     * Detect if the Timers API exists.
     *
     * @memberOf Benchmark.support
     * @type Boolean
     */
    support.timeout = isHostType(window, 'setTimeout') && isHostType(window, 'clearTimeout');

    /**
     * Detect if functions support decompilation.
     *
     * @name decompilation
     * @memberOf Benchmark.support
     * @type Boolean
     */
    try {
      // Safari 2.x removes commas in object literals
      // from Function#toString results
      // http://webk.it/11609
      // Firefox 3.6 and Opera 9.25 strip grouping
      // parentheses from Function#toString results
      // http://bugzil.la/559438
      support.decompilation = Function(
        'return (' + (function(x) { return { 'x': '' + (1 + x) + '', 'y': 0 }; }) + ')'
      )()(0).x === '1';
    } catch(e) {
      support.decompilation = false;
    }

    /**
     * Detect ES5+ property descriptor API.
     *
     * @name descriptors
     * @memberOf Benchmark.support
     * @type Boolean
     */
    try {
      var o = {};
      support.descriptors = (setDescriptor(o, o, o), 'value' in getDescriptor(o, o));
    } catch(e) {
      support.descriptors = false;
    }

    /**
     * Detect ES5+ Object.getOwnPropertyNames().
     *
     * @name getAllKeys
     * @memberOf Benchmark.support
     * @type Boolean
     */
    try {
      support.getAllKeys = /\bvalueOf\b/.test(getAllKeys(Object.prototype));
    } catch(e) {
      support.getAllKeys = false;
    }

    /**
     * Detect if own properties are iterated before inherited properties (all but IE < 9).
     *
     * @name iteratesOwnLast
     * @memberOf Benchmark.support
     * @type Boolean
     */
    support.iteratesOwnFirst = (function() {
      var props = [];
      function ctor() { this.x = 1; }
      ctor.prototype = { 'y': 1 };
      for (var prop in new ctor) { props.push(prop); }
      return props[0] == 'x';
    }());

    /**
     * Detect if a node's [[Class]] is resolvable (all but IE < 9)
     * and that the JS engine errors when attempting to coerce an object to a
     * string without a `toString` property value of `typeof` "function".
     *
     * @name nodeClass
     * @memberOf Benchmark.support
     * @type Boolean
     */
    try {
      support.nodeClass = ({ 'toString': 0 } + '', toString.call(doc || 0) != '[object Object]');
    } catch(e) {
      support.nodeClass = true;
    }
  }());

  /**
   * Timer object used by `clock()` and `Deferred#resolve`.
   *
   * @private
   * @type Object
   */
  var timer = {

   /**
    * The timer namespace object or constructor.
    *
    * @private
    * @memberOf timer
    * @type Function|Object
    */
    'ns': Date,

   /**
    * Starts the deferred timer.
    *
    * @private
    * @memberOf timer
    * @param {Object} deferred The deferred instance.
    */
    'start': null, // lazy defined in `clock()`

   /**
    * Stops the deferred timer.
    *
    * @private
    * @memberOf timer
    * @param {Object} deferred The deferred instance.
    */
    'stop': null // lazy defined in `clock()`
  };

  /** Shortcut for inverse results */
  var noArgumentsClass = !support.argumentsClass,
      noCharByIndex = !support.charByIndex,
      noCharByOwnIndex = !support.charByOwnIndex;

  /** Math shortcuts */
  var abs   = Math.abs,
      floor = Math.floor,
      max   = Math.max,
      min   = Math.min,
      pow   = Math.pow,
      sqrt  = Math.sqrt;

  /*--------------------------------------------------------------------------*/

  /**
   * The Benchmark constructor.
   *
   * @constructor
   * @param {String} name A name to identify the benchmark.
   * @param {Function|String} fn The test to benchmark.
   * @param {Object} [options={}] Options object.
   * @example
   *
   * // basic usage (the `new` operator is optional)
   * var bench = new Benchmark(fn);
   *
   * // or using a name first
   * var bench = new Benchmark('foo', fn);
   *
   * // or with options
   * var bench = new Benchmark('foo', fn, {
   *
   *   // displayed by Benchmark#toString if `name` is not available
   *   'id': 'xyz',
   *
   *   // called when the benchmark starts running
   *   'onStart': onStart,
   *
   *   // called after each run cycle
   *   'onCycle': onCycle,
   *
   *   // called when aborted
   *   'onAbort': onAbort,
   *
   *   // called when a test errors
   *   'onError': onError,
   *
   *   // called when reset
   *   'onReset': onReset,
   *
   *   // called when the benchmark completes running
   *   'onComplete': onComplete,
   *
   *   // compiled/called before the test loop
   *   'setup': setup,
   *
   *   // compiled/called after the test loop
   *   'teardown': teardown
   * });
   *
   * // or name and options
   * var bench = new Benchmark('foo', {
   *
   *   // a flag to indicate the benchmark is deferred
   *   'defer': true,
   *
   *   // benchmark test function
   *   'fn': function(deferred) {
   *     // call resolve() when the deferred test is finished
   *     deferred.resolve();
   *   }
   * });
   *
   * // or options only
   * var bench = new Benchmark({
   *
   *   // benchmark name
   *   'name': 'foo',
   *
   *   // benchmark test as a string
   *   'fn': '[1,2,3,4].sort()'
   * });
   *
   * // a test's `this` binding is set to the benchmark instance
   * var bench = new Benchmark('foo', function() {
   *   'My name is '.concat(this.name); // My name is foo
   * });
   */
  function Benchmark(name, fn, options) {
    var me = this;

    // allow instance creation without the `new` operator
    if (me == null || me.constructor != Benchmark) {
      return new Benchmark(name, fn, options);
    }
    // juggle arguments
    if (isClassOf(name, 'Object')) {
      // 1 argument (options)
      options = name;
    }
    else if (isClassOf(name, 'Function')) {
      // 2 arguments (fn, options)
      options = fn;
      fn = name;
    }
    else if (isClassOf(fn, 'Object')) {
      // 2 arguments (name, options)
      options = fn;
      fn = null;
      me.name = name;
    }
    else {
      // 3 arguments (name, fn [, options])
      me.name = name;
    }
    setOptions(me, options);
    me.id || (me.id = ++counter);
    me.fn == null && (me.fn = fn);
    me.stats = deepClone(me.stats);
    me.times = deepClone(me.times);
  }

  /**
   * The Deferred constructor.
   *
   * @constructor
   * @memberOf Benchmark
   * @param {Object} clone The cloned benchmark instance.
   */
  function Deferred(clone) {
    var me = this;
    if (me == null || me.constructor != Deferred) {
      return new Deferred(clone);
    }
    me.benchmark = clone;
    clock(me);
  }

  /**
   * The Event constructor.
   *
   * @constructor
   * @memberOf Benchmark
   * @param {String|Object} type The event type.
   */
  function Event(type) {
    var me = this;
    return (me == null || me.constructor != Event)
      ? new Event(type)
      : (type instanceof Event)
          ? type
          : extend(me, { 'timeStamp': +new Date }, typeof type == 'string' ? { 'type': type } : type);
  }

  /**
   * The Suite constructor.
   *
   * @constructor
   * @memberOf Benchmark
   * @param {String} name A name to identify the suite.
   * @param {Object} [options={}] Options object.
   * @example
   *
   * // basic usage (the `new` operator is optional)
   * var suite = new Benchmark.Suite;
   *
   * // or using a name first
   * var suite = new Benchmark.Suite('foo');
   *
   * // or with options
   * var suite = new Benchmark.Suite('foo', {
   *
   *   // called when the suite starts running
   *   'onStart': onStart,
   *
   *   // called between running benchmarks
   *   'onCycle': onCycle,
   *
   *   // called when aborted
   *   'onAbort': onAbort,
   *
   *   // called when a test errors
   *   'onError': onError,
   *
   *   // called when reset
   *   'onReset': onReset,
   *
   *   // called when the suite completes running
   *   'onComplete': onComplete
   * });
   */
  function Suite(name, options) {
    var me = this;

    // allow instance creation without the `new` operator
    if (me == null || me.constructor != Suite) {
      return new Suite(name, options);
    }
    // juggle arguments
    if (isClassOf(name, 'Object')) {
      // 1 argument (options)
      options = name;
    } else {
      // 2 arguments (name [, options])
      me.name = name;
    }
    setOptions(me, options);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Note: Some array methods have been implemented in plain JavaScript to avoid
   * bugs in IE, Opera, Rhino, and Mobile Safari.
   *
   * IE compatibility mode and IE < 9 have buggy Array `shift()` and `splice()`
   * functions that fail to remove the last element, `object[0]`, of
   * array-like-objects even though the `length` property is set to `0`.
   * The `shift()` method is buggy in IE 8 compatibility mode, while `splice()`
   * is buggy regardless of mode in IE < 9 and buggy in compatibility mode in IE 9.
   *
   * In Opera < 9.50 and some older/beta Mobile Safari versions using `unshift()`
   * generically to augment the `arguments` object will pave the value at index 0
   * without incrimenting the other values's indexes.
   * https://github.com/documentcloud/underscore/issues/9
   *
   * Rhino and environments it powers, like Narwhal and RingoJS, may have
   * buggy Array `concat()`, `reverse()`, `shift()`, `slice()`, `splice()` and
   * `unshift()` functions that make sparse arrays non-sparse by assigning the
   * undefined indexes a value of undefined.
   * https://github.com/mozilla/rhino/commit/702abfed3f8ca043b2636efd31c14ba7552603dd
   */

  /**
   * Creates an array containing the elements of the host array followed by the
   * elements of each argument in order.
   *
   * @memberOf Benchmark.Suite
   * @returns {Array} The new array.
   */
  function concat() {
    var value,
        j = -1,
        length = arguments.length,
        result = slice.call(this),
        index = result.length;

    while (++j < length) {
      value = arguments[j];
      if (isClassOf(value, 'Array')) {
        for (var k = 0, l = value.length; k < l; k++, index++) {
          if (k in value) {
            result[index] = value[k];
          }
        }
      } else {
        result[index++] = value;
      }
    }
    return result;
  }

  /**
   * Utility function used by `shift()`, `splice()`, and `unshift()`.
   *
   * @private
   * @param {Number} start The index to start inserting elements.
   * @param {Number} deleteCount The number of elements to delete from the insert point.
   * @param {Array} elements The elements to insert.
   * @returns {Array} An array of deleted elements.
   */
  function insert(start, deleteCount, elements) {
    // `result` should have its length set to the `deleteCount`
    // see https://bugs.ecmascript.org/show_bug.cgi?id=332
    var deleteEnd = start + deleteCount,
        elementCount = elements ? elements.length : 0,
        index = start - 1,
        length = start + elementCount,
        object = this,
        result = Array(deleteCount),
        tail = slice.call(object, deleteEnd);

    // delete elements from the array
    while (++index < deleteEnd) {
      if (index in object) {
        result[index - start] = object[index];
        delete object[index];
      }
    }
    // insert elements
    index = start - 1;
    while (++index < length) {
      object[index] = elements[index - start];
    }
    // append tail elements
    start = index--;
    length = max(0, (object.length >>> 0) - deleteCount + elementCount);
    while (++index < length) {
      if ((index - start) in tail) {
        object[index] = tail[index - start];
      } else if (index in object) {
        delete object[index];
      }
    }
    // delete excess elements
    deleteCount = deleteCount > elementCount ? deleteCount - elementCount : 0;
    while (deleteCount--) {
      index = length + deleteCount;
      if (index in object) {
        delete object[index];
      }
    }
    object.length = length;
    return result;
  }

  /**
   * Rearrange the host array's elements in reverse order.
   *
   * @memberOf Benchmark.Suite
   * @returns {Array} The reversed array.
   */
  function reverse() {
    var upperIndex,
        value,
        index = -1,
        object = Object(this),
        length = object.length >>> 0,
        middle = floor(length / 2);

    if (length > 1) {
      while (++index < middle) {
        upperIndex = length - index - 1;
        value = upperIndex in object ? object[upperIndex] : uid;
        if (index in object) {
          object[upperIndex] = object[index];
        } else {
          delete object[upperIndex];
        }
        if (value != uid) {
          object[index] = value;
        } else {
          delete object[index];
        }
      }
    }
    return object;
  }

  /**
   * Removes the first element of the host array and returns it.
   *
   * @memberOf Benchmark.Suite
   * @returns {Mixed} The first element of the array.
   */
  function shift() {
    return insert.call(this, 0, 1)[0];
  }

  /**
   * Creates an array of the host array's elements from the start index up to,
   * but not including, the end index.
   *
   * @memberOf Benchmark.Suite
   * @param {Number} start The starting index.
   * @param {Number} end The end index.
   * @returns {Array} The new array.
   */
  function slice(start, end) {
    var index = -1,
        object = Object(this),
        length = object.length >>> 0,
        result = [];

    start = toInteger(start);
    start = start < 0 ? max(length + start, 0) : min(start, length);
    start--;
    end = end == null ? length : toInteger(end);
    end = end < 0 ? max(length + end, 0) : min(end, length);

    while ((++index, ++start) < end) {
      if (start in object) {
        result[index] = object[start];
      }
    }
    return result;
  }

  /**
   * Allows removing a range of elements and/or inserting elements into the
   * host array.
   *
   * @memberOf Benchmark.Suite
   * @param {Number} start The start index.
   * @param {Number} deleteCount The number of elements to delete.
   * @param {Mixed} [val1, val2, ...] values to insert at the `start` index.
   * @returns {Array} An array of removed elements.
   */
  function splice(start, deleteCount) {
    var object = Object(this),
        length = object.length >>> 0;

    start = toInteger(start);
    start = start < 0 ? max(length + start, 0) : min(start, length);

    // support the de-facto SpiderMonkey extension
    // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/splice#Parameters
    // https://bugs.ecmascript.org/show_bug.cgi?id=429
    deleteCount = arguments.length == 1
      ? length - start
      : min(max(toInteger(deleteCount), 0), length - start);

    return insert.call(object, start, deleteCount, slice.call(arguments, 2));
  }

  /**
   * Converts the specified `value` to an integer.
   *
   * @private
   * @param {Mixed} value The value to convert.
   * @returns {Number} The resulting integer.
   */
  function toInteger(value) {
    value = +value;
    return value === 0 || !isFinite(value) ? value || 0 : value - (value % 1);
  }

  /**
   * Appends arguments to the host array.
   *
   * @memberOf Benchmark.Suite
   * @returns {Number} The new length.
   */
  function unshift() {
    var object = Object(this);
    insert.call(object, 0, 0, arguments);
    return object.length;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * A generic `Function#bind` like method.
   *
   * @private
   * @param {Function} fn The function to be bound to `thisArg`.
   * @param {Mixed} thisArg The `this` binding for the given function.
   * @returns {Function} The bound function.
   */
  function bind(fn, thisArg) {
    return function() { fn.apply(thisArg, arguments); };
  }

  /**
   * Creates a function from the given arguments string and body.
   *
   * @private
   * @param {String} args The comma separated function arguments.
   * @param {String} body The function body.
   * @returns {Function} The new function.
   */
  function createFunction() {
    // lazy define
    createFunction = function(args, body) {
      var result,
          anchor = freeDefine ? define.amd : Benchmark,
          prop = uid + 'createFunction';

      runScript((freeDefine ? 'define.amd.' : 'Benchmark.') + prop + '=function(' + args + '){' + body + '}');
      result = anchor[prop];
      delete anchor[prop];
      return result;
    };
    // fix JaegerMonkey bug
    // http://bugzil.la/639720
    createFunction = support.browser && (createFunction('', 'return"' + uid + '"') || noop)() == uid ? createFunction : Function;
    return createFunction.apply(null, arguments);
  }

  /**
   * Delay the execution of a function based on the benchmark's `delay` property.
   *
   * @private
   * @param {Object} bench The benchmark instance.
   * @param {Object} fn The function to execute.
   */
  function delay(bench, fn) {
    bench._timerId = setTimeout(fn, bench.delay * 1e3);
  }

  /**
   * Destroys the given element.
   *
   * @private
   * @param {Element} element The element to destroy.
   */
  function destroyElement(element) {
    trash.appendChild(element);
    trash.innerHTML = '';
  }

  /**
   * Iterates over an object's properties, executing the `callback` for each.
   * Callbacks may terminate the loop by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} callback The function executed per own property.
   * @param {Object} options The options object.
   * @returns {Object} Returns the object iterated over.
   */
  function forProps() {
    var forShadowed,
        skipSeen,
        forArgs = true,
        shadowed = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

    (function(enumFlag, key) {
      // must use a non-native constructor to catch the Safari 2 issue
      function Klass() { this.valueOf = 0; };
      Klass.prototype.valueOf = 0;
      // check various for-in bugs
      for (key in new Klass) {
        enumFlag += key == 'valueOf' ? 1 : 0;
      }
      // check if `arguments` objects have non-enumerable indexes
      for (key in arguments) {
        key == '0' && (forArgs = false);
      }
      // Safari 2 iterates over shadowed properties twice
      // http://replay.waybackmachine.org/20090428222941/http://tobielangel.com/2007/1/29/for-in-loop-broken-in-safari/
      skipSeen = enumFlag == 2;
      // IE < 9 incorrectly makes an object's properties non-enumerable if they have
      // the same name as other non-enumerable properties in its prototype chain.
      forShadowed = !enumFlag;
    }(0));

    // lazy define
    forProps = function(object, callback, options) {
      options || (options = {});

      var result = object;
      object = Object(object);

      var ctor,
          key,
          keys,
          skipCtor,
          done = !result,
          which = options.which,
          allFlag = which == 'all',
          index = -1,
          iteratee = object,
          length = object.length,
          ownFlag = allFlag || which == 'own',
          seen = {},
          skipProto = isClassOf(object, 'Function'),
          thisArg = options.bind;

      if (thisArg !== undefined) {
        callback = bind(callback, thisArg);
      }
      // iterate all properties
      if (allFlag && support.getAllKeys) {
        for (index = 0, keys = getAllKeys(object), length = keys.length; index < length; index++) {
          key = keys[index];
          if (callback(object[key], key, object) === false) {
            break;
          }
        }
      }
      // else iterate only enumerable properties
      else {
        for (key in object) {
          // Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1
          // (if the prototype or a property on the prototype has been set)
          // incorrectly set a function's `prototype` property [[Enumerable]] value
          // to `true`. Because of this we standardize on skipping the `prototype`
          // property of functions regardless of their [[Enumerable]] value.
          if ((done =
              !(skipProto && key == 'prototype') &&
              !(skipSeen && (hasKey(seen, key) || !(seen[key] = true))) &&
              (!ownFlag || ownFlag && hasKey(object, key)) &&
              callback(object[key], key, object) === false)) {
            break;
          }
        }
        // in IE < 9 strings don't support accessing characters by index
        if (!done && (forArgs && isArguments(object) ||
            ((noCharByIndex || noCharByOwnIndex) && isClassOf(object, 'String') &&
              (iteratee = noCharByIndex ? object.split('') : object)))) {
          while (++index < length) {
            if ((done =
                callback(iteratee[index], String(index), object) === false)) {
              break;
            }
          }
        }
        if (!done && forShadowed) {
          // Because IE < 9 can't set the `[[Enumerable]]` attribute of an existing
          // property and the `constructor` property of a prototype defaults to
          // non-enumerable, we manually skip the `constructor` property when we
          // think we are iterating over a `prototype` object.
          ctor = object.constructor;
          skipCtor = ctor && ctor.prototype && ctor.prototype.constructor === ctor;
          for (index = 0; index < 7; index++) {
            key = shadowed[index];
            if (!(skipCtor && key == 'constructor') &&
                hasKey(object, key) &&
                callback(object[key], key, object) === false) {
              break;
            }
          }
        }
      }
      return result;
    };
    return forProps.apply(null, arguments);
  }

  /**
   * Gets the name of the first argument from a function's source.
   *
   * @private
   * @param {Function} fn The function.
   * @returns {String} The argument name.
   */
  function getFirstArgument(fn) {
    return (!hasKey(fn, 'toString') &&
      (/^[\s(]*function[^(]*\(([^\s,)]+)/.exec(fn) || 0)[1]) || '';
  }

  /**
   * Computes the arithmetic mean of a sample.
   *
   * @private
   * @param {Array} sample The sample.
   * @returns {Number} The mean.
   */
  function getMean(sample) {
    return reduce(sample, function(sum, x) {
      return sum + x;
    }) / sample.length || 0;
  }

  /**
   * Gets the source code of a function.
   *
   * @private
   * @param {Function} fn The function.
   * @param {String} altSource A string used when a function's source code is unretrievable.
   * @returns {String} The function's source code.
   */
  function getSource(fn, altSource) {
    var result = altSource;
    if (isStringable(fn)) {
      result = String(fn);
    } else if (support.decompilation) {
      // escape the `{` for Firefox 1
      result = (/^[^{]+\{([\s\S]*)}\s*$/.exec(fn) || 0)[1];
    }
    // trim string
    result = (result || '').replace(/^\s+|\s+$/g, '');

    // detect strings containing only the "use strict" directive
    return /^(?:\/\*+[\w|\W]*?\*\/|\/\/.*?[\n\r\u2028\u2029]|\s)*(["'])use strict\1;?$/.test(result)
      ? ''
      : result;
  }

  /**
   * Checks if a value is an `arguments` object.
   *
   * @private
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the value is an `arguments` object, else `false`.
   */
  function isArguments() {
    // lazy define
    isArguments = function(value) {
      return toString.call(value) == '[object Arguments]';
    };
    if (noArgumentsClass) {
      isArguments = function(value) {
        return hasKey(value, 'callee') &&
          !(propertyIsEnumerable && propertyIsEnumerable.call(value, 'callee'));
      };
    }
    return isArguments(arguments[0]);
  }

  /**
   * Checks if an object is of the specified class.
   *
   * @private
   * @param {Mixed} value The value to check.
   * @param {String} name The name of the class.
   * @returns {Boolean} Returns `true` if the value is of the specified class, else `false`.
   */
  function isClassOf(value, name) {
    return value != null && toString.call(value) == '[object ' + name + ']';
  }

  /**
   * Host objects can return type values that are different from their actual
   * data type. The objects we are concerned with usually return non-primitive
   * types of object, function, or unknown.
   *
   * @private
   * @param {Mixed} object The owner of the property.
   * @param {String} property The property to check.
   * @returns {Boolean} Returns `true` if the property value is a non-primitive, else `false`.
   */
  function isHostType(object, property) {
    var type = object != null ? typeof object[property] : 'number';
    return !/^(?:boolean|number|string|undefined)$/.test(type) &&
      (type == 'object' ? !!object[property] : true);
  }

  /**
   * Checks if a given `value` is an object created by the `Object` constructor
   * assuming objects created by the `Object` constructor have no inherited
   * enumerable properties and that there are no `Object.prototype` extensions.
   *
   * @private
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a plain `Object` object, else `false`.
   */
  function isPlainObject(value) {
    // avoid non-objects and false positives for `arguments` objects in IE < 9
    var result = false;
    if (!(value && typeof value == 'object') || (noArgumentsClass && isArguments(value))) {
      return result;
    }
    // IE < 9 presents DOM nodes as `Object` objects except they have `toString`
    // methods that are `typeof` "string" and still can coerce nodes to strings.
    // Also check that the constructor is `Object` (i.e. `Object instanceof Object`)
    var ctor = value.constructor;
    if ((support.nodeClass || !(typeof value.toString != 'function' && typeof (value + '') == 'string')) &&
        (!isClassOf(ctor, 'Function') || ctor instanceof ctor)) {
      // In most environments an object's own properties are iterated before
      // its inherited properties. If the last iterated property is an object's
      // own property then there are no inherited enumerable properties.
      if (support.iteratesOwnFirst) {
        forProps(value, function(subValue, subKey) {
          result = subKey;
        });
        return result === false || hasKey(value, result);
      }
      // IE < 9 iterates inherited properties before own properties. If the first
      // iterated property is an object's own property then there are no inherited
      // enumerable properties.
      forProps(value, function(subValue, subKey) {
        result = !hasKey(value, subKey);
        return false;
      });
      return result === false;
    }
    return result;
  }

  /**
   * Checks if a value can be safely coerced to a string.
   *
   * @private
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the value can be coerced, else `false`.
   */
  function isStringable(value) {
    return hasKey(value, 'toString') || isClassOf(value, 'String');
  }

  /**
   * Wraps a function and passes `this` to the original function as the
   * first argument.
   *
   * @private
   * @param {Function} fn The function to be wrapped.
   * @returns {Function} The new function.
   */
  function methodize(fn) {
    return function() {
      var args = [this];
      args.push.apply(args, arguments);
      return fn.apply(null, args);
    };
  }

  /**
   * A no-operation function.
   *
   * @private
   */
  function noop() {
    // no operation performed
  }

  /**
   * A wrapper around require() to suppress `module missing` errors.
   *
   * @private
   * @param {String} id The module id.
   * @returns {Mixed} The exported module or `null`.
   */
  function req(id) {
    try {
      var result = freeExports && freeRequire(id);
    } catch(e) { }
    return result || null;
  }

  /**
   * Runs a snippet of JavaScript via script injection.
   *
   * @private
   * @param {String} code The code to run.
   */
  function runScript(code) {
    var anchor = freeDefine ? define.amd : Benchmark,
        script = doc.createElement('script'),
        sibling = doc.getElementsByTagName('script')[0],
        parent = sibling.parentNode,
        prop = uid + 'runScript',
        prefix = '(' + (freeDefine ? 'define.amd.' : 'Benchmark.') + prop + '||function(){})();';

    // Firefox 2.0.0.2 cannot use script injection as intended because it executes
    // asynchronously, but that's OK because script injection is only used to avoid
    // the previously commented JaegerMonkey bug.
    try {
      // remove the inserted script *before* running the code to avoid differences
      // in the expected script element count/order of the document.
      script.appendChild(doc.createTextNode(prefix + code));
      anchor[prop] = function() { destroyElement(script); };
    } catch(e) {
      parent = parent.cloneNode(false);
      sibling = null;
      script.text = code;
    }
    parent.insertBefore(script, sibling);
    delete anchor[prop];
  }

  /**
   * A helper function for setting options/event handlers.
   *
   * @private
   * @param {Object} bench The benchmark instance.
   * @param {Object} [options={}] Options object.
   */
  function setOptions(bench, options) {
    options = extend({}, bench.constructor.options, options);
    bench.options = forOwn(options, function(value, key) {
      if (value != null) {
        // add event listeners
        if (/^on[A-Z]/.test(key)) {
          forEach(key.split(' '), function(key) {
            bench.on(key.slice(2).toLowerCase(), value);
          });
        } else if (!hasKey(bench, key)) {
          bench[key] = deepClone(value);
        }
      }
    });
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Handles cycling/completing the deferred benchmark.
   *
   * @memberOf Benchmark.Deferred
   */
  function resolve() {
    var me = this,
        clone = me.benchmark,
        bench = clone._original;

    if (bench.aborted) {
      // cycle() -> clone cycle/complete event -> compute()'s invoked bench.run() cycle/complete
      me.teardown();
      clone.running = false;
      cycle(me);
    }
    else if (++me.cycles < clone.count) {
      // continue the test loop
      if (support.timeout) {
        // use setTimeout to avoid a call stack overflow if called recursively
        setTimeout(function() { clone.compiled.call(me, timer); }, 0);
      } else {
        clone.compiled.call(me, timer);
      }
    }
    else {
      timer.stop(me);
      me.teardown();
      delay(clone, function() { cycle(me); });
    }
  }

  /*--------------------------------------------------------------------------*/

  /**
   * A deep clone utility.
   *
   * @static
   * @memberOf Benchmark
   * @param {Mixed} value The value to clone.
   * @returns {Mixed} The cloned value.
   */
  function deepClone(value) {
    var accessor,
        circular,
        clone,
        ctor,
        descriptor,
        extensible,
        key,
        length,
        markerKey,
        parent,
        result,
        source,
        subIndex,
        data = { 'value': value },
        index = 0,
        marked = [],
        queue = { 'length': 0 },
        unmarked = [];

    /**
     * An easily detectable decorator for cloned values.
     */
    function Marker(object) {
      this.raw = object;
    }

    /**
     * The callback used by `forProps()`.
     */
    function forPropsCallback(subValue, subKey) {
      // exit early to avoid cloning the marker
      if (subValue && subValue.constructor == Marker) {
        return;
      }
      // add objects to the queue
      if (subValue === Object(subValue)) {
        queue[queue.length++] = { 'key': subKey, 'parent': clone, 'source': value };
      }
      // assign non-objects
      else {
        try {
          // will throw an error in strict mode if the property is read-only
          clone[subKey] = subValue;
        } catch(e) { }
      }
    }

    /**
     * Gets an available marker key for the given object.
     */
    function getMarkerKey(object) {
      // avoid collisions with existing keys
      var result = uid;
      while (object[result] && object[result].constructor != Marker) {
        result += 1;
      }
      return result;
    }

    do {
      key = data.key;
      parent = data.parent;
      source = data.source;
      clone = value = source ? source[key] : data.value;
      accessor = circular = descriptor = false;

      // create a basic clone to filter out functions, DOM elements, and
      // other non `Object` objects
      if (value === Object(value)) {
        // use custom deep clone function if available
        if (isClassOf(value.deepClone, 'Function')) {
          clone = value.deepClone();
        } else {
          ctor = value.constructor;
          switch (toString.call(value)) {
            case '[object Array]':
              clone = new ctor(value.length);
              break;

            case '[object Boolean]':
              clone = new ctor(value == true);
              break;

            case '[object Date]':
              clone = new ctor(+value);
              break;

            case '[object Object]':
              isPlainObject(value) && (clone = {});
              break;

            case '[object Number]':
            case '[object String]':
              clone = new ctor(value);
              break;

            case '[object RegExp]':
              clone = ctor(value.source,
                (value.global     ? 'g' : '') +
                (value.ignoreCase ? 'i' : '') +
                (value.multiline  ? 'm' : ''));
          }
        }
        // continue clone if `value` doesn't have an accessor descriptor
        // http://es5.github.com/#x8.10.1
        if (clone && clone != value &&
            !(descriptor = source && support.descriptors && getDescriptor(source, key),
              accessor = descriptor && (descriptor.get || descriptor.set))) {
          // use an existing clone (circular reference)
          if ((extensible = isExtensible(value))) {
            markerKey = getMarkerKey(value);
            if (value[markerKey]) {
              circular = clone = value[markerKey].raw;
            }
          } else {
            // for frozen/sealed objects
            for (subIndex = 0, length = unmarked.length; subIndex < length; subIndex++) {
              data = unmarked[subIndex];
              if (data.object === value) {
                circular = clone = data.clone;
                break;
              }
            }
          }
          if (!circular) {
            // mark object to allow quickly detecting circular references and tie it to its clone
            if (extensible) {
              value[markerKey] = new Marker(clone);
              marked.push({ 'key': markerKey, 'object': value });
            } else {
              // for frozen/sealed objects
              unmarked.push({ 'clone': clone, 'object': value });
            }
            // iterate over object properties
            forProps(value, forPropsCallback, { 'which': 'all' });
          }
        }
      }
      if (parent) {
        // for custom property descriptors
        if (accessor || (descriptor && !(descriptor.configurable && descriptor.enumerable && descriptor.writable))) {
          if ('value' in descriptor) {
            descriptor.value = clone;
          }
          setDescriptor(parent, key, descriptor);
        }
        // for default property descriptors
        else {
          parent[key] = clone;
        }
      } else {
        result = clone;
      }
    } while ((data = queue[index++]));

    // remove markers
    for (index = 0, length = marked.length; index < length; index++) {
      data = marked[index];
      delete data.object[data.key];
    }
    return result;
  }

  /**
   * An iteration utility for arrays and objects.
   * Callbacks may terminate the loop by explicitly returning `false`.
   *
   * @static
   * @memberOf Benchmark
   * @param {Array|Object} object The object to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} thisArg The `this` binding for the callback.
   * @returns {Array|Object} Returns the object iterated over.
   */
  function each(object, callback, thisArg) {
    var result = object;
    object = Object(object);

    var fn = callback,
        index = -1,
        length = object.length,
        isSnapshot = !!(object.snapshotItem && (length = object.snapshotLength)),
        isSplittable = (noCharByIndex || noCharByOwnIndex) && isClassOf(object, 'String'),
        isConvertable = isSnapshot || isSplittable || 'item' in object,
        origObject = object;

    // in Opera < 10.5 `hasKey(object, 'length')` returns `false` for NodeLists
    if (length === length >>> 0) {
      if (isConvertable) {
        // the third argument of the callback is the original non-array object
        callback = function(value, index) {
          return fn.call(this, value, index, origObject);
        };
        // in IE < 9 strings don't support accessing characters by index
        if (isSplittable) {
          object = object.split('');
        } else {
          object = [];
          while (++index < length) {
            // in Safari 2 `index in object` is always `false` for NodeLists
            object[index] = isSnapshot ? result.snapshotItem(index) : result[index];
          }
        }
      }
      forEach(object, callback, thisArg);
    } else {
      forOwn(object, callback, thisArg);
    }
    return result;
  }

  /**
   * Copies enumerable properties from the source(s) object to the destination object.
   *
   * @static
   * @memberOf Benchmark
   * @param {Object} destination The destination object.
   * @param {Object} [source={}] The source object.
   * @returns {Object} The destination object.
   */
  function extend(destination, source) {
    // Chrome < 14 incorrectly sets `destination` to `undefined` when we `delete arguments[0]`
    // http://code.google.com/p/v8/issues/detail?id=839
    var result = destination;
    delete arguments[0];

    forEach(arguments, function(source) {
      forProps(source, function(value, key) {
        result[key] = value;
      });
    });
    return result;
  }

  /**
   * A generic `Array#filter` like method.
   *
   * @static
   * @memberOf Benchmark
   * @param {Array} array The array to iterate over.
   * @param {Function|String} callback The function/alias called per iteration.
   * @param {Mixed} thisArg The `this` binding for the callback.
   * @returns {Array} A new array of values that passed callback filter.
   * @example
   *
   * // get odd numbers
   * Benchmark.filter([1, 2, 3, 4, 5], function(n) {
   *   return n % 2;
   * }); // -> [1, 3, 5];
   *
   * // get fastest benchmarks
   * Benchmark.filter(benches, 'fastest');
   *
   * // get slowest benchmarks
   * Benchmark.filter(benches, 'slowest');
   *
   * // get benchmarks that completed without erroring
   * Benchmark.filter(benches, 'successful');
   */
  function filter(array, callback, thisArg) {
    var result;

    if (callback == 'successful') {
      // callback to exclude those that are errored, unrun, or have hz of Infinity
      callback = function(bench) { return bench.cycles && isFinite(bench.hz); };
    }
    else if (callback == 'fastest' || callback == 'slowest') {
      // get successful, sort by period + margin of error, and filter fastest/slowest
      result = filter(array, 'successful').sort(function(a, b) {
        a = a.stats; b = b.stats;
        return (a.mean + a.moe > b.mean + b.moe ? 1 : -1) * (callback == 'fastest' ? 1 : -1);
      });
      result = filter(result, function(bench) {
        return result[0].compare(bench) == 0;
      });
    }
    return result || reduce(array, function(result, value, index) {
      return callback.call(thisArg, value, index, array) ? (result.push(value), result) : result;
    }, []);
  }

  /**
   * A generic `Array#forEach` like method.
   * Callbacks may terminate the loop by explicitly returning `false`.
   *
   * @static
   * @memberOf Benchmark
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} thisArg The `this` binding for the callback.
   * @returns {Array} Returns the array iterated over.
   */
  function forEach(array, callback, thisArg) {
    var index = -1,
        length = (array = Object(array)).length >>> 0;

    if (thisArg !== undefined) {
      callback = bind(callback, thisArg);
    }
    while (++index < length) {
      if (index in array &&
          callback(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }

  /**
   * Iterates over an object's own properties, executing the `callback` for each.
   * Callbacks may terminate the loop by explicitly returning `false`.
   *
   * @static
   * @memberOf Benchmark
   * @param {Object} object The object to iterate over.
   * @param {Function} callback The function executed per own property.
   * @param {Mixed} thisArg The `this` binding for the callback.
   * @returns {Object} Returns the object iterated over.
   */
  function forOwn(object, callback, thisArg) {
    return forProps(object, callback, { 'bind': thisArg, 'which': 'own' });
  }

  /**
   * Converts a number to a more readable comma-separated string representation.
   *
   * @static
   * @memberOf Benchmark
   * @param {Number} number The number to convert.
   * @returns {String} The more readable string representation.
   */
  function formatNumber(number) {
    number = String(number).split('.');
    return number[0].replace(/(?=(?:\d{3})+$)(?!\b)/g, ',') +
      (number[1] ? '.' + number[1] : '');
  }

  /**
   * Checks if an object has the specified key as a direct property.
   *
   * @static
   * @memberOf Benchmark
   * @param {Object} object The object to check.
   * @param {String} key The key to check for.
   * @returns {Boolean} Returns `true` if key is a direct property, else `false`.
   */
  function hasKey() {
    // lazy define for worst case fallback (not as accurate)
    hasKey = function(object, key) {
      var parent = object != null && (object.constructor || Object).prototype;
      return !!parent && key in Object(object) && !(key in parent && object[key] === parent[key]);
    };
    // for modern browsers
    if (isClassOf(hasOwnProperty, 'Function')) {
      hasKey = function(object, key) {
        return object != null && hasOwnProperty.call(object, key);
      };
    }
    // for Safari 2
    else if ({}.__proto__ == Object.prototype) {
      hasKey = function(object, key) {
        var result = false;
        if (object != null) {
          object = Object(object);
          object.__proto__ = [object.__proto__, object.__proto__ = null, result = key in object][0];
        }
        return result;
      };
    }
    return hasKey.apply(this, arguments);
  }

  /**
   * A generic `Array#indexOf` like method.
   *
   * @static
   * @memberOf Benchmark
   * @param {Array} array The array to iterate over.
   * @param {Mixed} value The value to search for.
   * @param {Number} [fromIndex=0] The index to start searching from.
   * @returns {Number} The index of the matched value or `-1`.
   */
  function indexOf(array, value, fromIndex) {
    var index = toInteger(fromIndex),
        length = (array = Object(array)).length >>> 0;

    index = (index < 0 ? max(0, length + index) : index) - 1;
    while (++index < length) {
      if (index in array && value === array[index]) {
        return index;
      }
    }
    return -1;
  }

  /**
   * Modify a string by replacing named tokens with matching object property values.
   *
   * @static
   * @memberOf Benchmark
   * @param {String} string The string to modify.
   * @param {Object} object The template object.
   * @returns {String} The modified string.
   */
  function interpolate(string, object) {
    forOwn(object, function(value, key) {
      // escape regexp special characters in `key`
      string = string.replace(RegExp('#\\{' + key.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1') + '\\}', 'g'), value);
    });
    return string;
  }

  /**
   * Invokes a method on all items in an array.
   *
   * @static
   * @memberOf Benchmark
   * @param {Array} benches Array of benchmarks to iterate over.
   * @param {String|Object} name The name of the method to invoke OR options object.
   * @param {Mixed} [arg1, arg2, ...] Arguments to invoke the method with.
   * @returns {Array} A new array of values returned from each method invoked.
   * @example
   *
   * // invoke `reset` on all benchmarks
   * Benchmark.invoke(benches, 'reset');
   *
   * // invoke `emit` with arguments
   * Benchmark.invoke(benches, 'emit', 'complete', listener);
   *
   * // invoke `run(true)`, treat benchmarks as a queue, and register invoke callbacks
   * Benchmark.invoke(benches, {
   *
   *   // invoke the `run` method
   *   'name': 'run',
   *
   *   // pass a single argument
   *   'args': true,
   *
   *   // treat as queue, removing benchmarks from front of `benches` until empty
   *   'queued': true,
   *
   *   // called before any benchmarks have been invoked.
   *   'onStart': onStart,
   *
   *   // called between invoking benchmarks
   *   'onCycle': onCycle,
   *
   *   // called after all benchmarks have been invoked.
   *   'onComplete': onComplete
   * });
   */
  function invoke(benches, name) {
    var args,
        bench,
        queued,
        index = -1,
        eventProps = { 'currentTarget': benches },
        options = { 'onStart': noop, 'onCycle': noop, 'onComplete': noop },
        result = map(benches, function(bench) { return bench; });

    /**
     * Invokes the method of the current object and if synchronous, fetches the next.
     */
    function execute() {
      var listeners,
          async = isAsync(bench);

      if (async) {
        // use `getNext` as the first listener
        bench.on('complete', getNext);
        listeners = bench.events.complete;
        listeners.splice(0, 0, listeners.pop());
      }
      // execute method
      result[index] = isClassOf(bench && bench[name], 'Function') ? bench[name].apply(bench, args) : undefined;
      // if synchronous return true until finished
      return !async && getNext();
    }

    /**
     * Fetches the next bench or executes `onComplete` callback.
     */
    function getNext(event) {
      var cycleEvent,
          last = bench,
          async = isAsync(last);

      if (async) {
        last.off('complete', getNext);
        last.emit('complete');
      }
      // emit "cycle" event
      eventProps.type = 'cycle';
      eventProps.target = last;
      cycleEvent = Event(eventProps);
      options.onCycle.call(benches, cycleEvent);

      // choose next benchmark if not exiting early
      if (!cycleEvent.aborted && raiseIndex() !== false) {
        bench = queued ? benches[0] : result[index];
        if (isAsync(bench)) {
          delay(bench, execute);
        }
        else if (async) {
          // resume execution if previously asynchronous but now synchronous
          while (execute()) { }
        }
        else {
          // continue synchronous execution
          return true;
        }
      } else {
        // emit "complete" event
        eventProps.type = 'complete';
        options.onComplete.call(benches, Event(eventProps));
      }
      // When used as a listener `event.aborted = true` will cancel the rest of
      // the "complete" listeners because they were already called above and when
      // used as part of `getNext` the `return false` will exit the execution while-loop.
      if (event) {
        event.aborted = true;
      } else {
        return false;
      }
    }

    /**
     * Checks if invoking `Benchmark#run` with asynchronous cycles.
     */
    function isAsync(object) {
      // avoid using `instanceof` here because of IE memory leak issues with host objects
      var async = args[0] && args[0].async;
      return Object(object).constructor == Benchmark && name == 'run' &&
        ((async == null ? object.options.async : async) && support.timeout || object.defer);
    }

    /**
     * Raises `index` to the next defined index or returns `false`.
     */
    function raiseIndex() {
      var length = result.length;
      if (queued) {
        // if queued remove the previous bench and subsequent skipped non-entries
        do {
          ++index > 0 && shift.call(benches);
        } while ((length = benches.length) && !('0' in benches));
      }
      else {
        while (++index < length && !(index in result)) { }
      }
      // if we reached the last index then return `false`
      return (queued ? length : index < length) ? index : (index = false);
    }

    // juggle arguments
    if (isClassOf(name, 'String')) {
      // 2 arguments (array, name)
      args = slice.call(arguments, 2);
    } else {
      // 2 arguments (array, options)
      options = extend(options, name);
      name = options.name;
      args = isClassOf(args = 'args' in options ? options.args : [], 'Array') ? args : [args];
      queued = options.queued;
    }

    // start iterating over the array
    if (raiseIndex() !== false) {
      // emit "start" event
      bench = result[index];
      eventProps.type = 'start';
      eventProps.target = bench;
      options.onStart.call(benches, Event(eventProps));

      // end early if the suite was aborted in an "onStart" listener
      if (benches.aborted && benches.constructor == Suite && name == 'run') {
        // emit "cycle" event
        eventProps.type = 'cycle';
        options.onCycle.call(benches, Event(eventProps));
        // emit "complete" event
        eventProps.type = 'complete';
        options.onComplete.call(benches, Event(eventProps));
      }
      // else start
      else {
        if (isAsync(bench)) {
          delay(bench, execute);
        } else {
          while (execute()) { }
        }
      }
    }
    return result;
  }

  /**
   * Creates a string of joined array values or object key-value pairs.
   *
   * @static
   * @memberOf Benchmark
   * @param {Array|Object} object The object to operate on.
   * @param {String} [separator1=','] The separator used between key-value pairs.
   * @param {String} [separator2=': '] The separator used between keys and values.
   * @returns {String} The joined result.
   */
  function join(object, separator1, separator2) {
    var result = [],
        length = (object = Object(object)).length,
        arrayLike = length === length >>> 0;

    separator2 || (separator2 = ': ');
    each(object, function(value, key) {
      result.push(arrayLike ? value : key + separator2 + value);
    });
    return result.join(separator1 || ',');
  }

  /**
   * A generic `Array#map` like method.
   *
   * @static
   * @memberOf Benchmark
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} thisArg The `this` binding for the callback.
   * @returns {Array} A new array of values returned by the callback.
   */
  function map(array, callback, thisArg) {
    return reduce(array, function(result, value, index) {
      result[index] = callback.call(thisArg, value, index, array);
      return result;
    }, Array(Object(array).length >>> 0));
  }

  /**
   * Retrieves the value of a specified property from all items in an array.
   *
   * @static
   * @memberOf Benchmark
   * @param {Array} array The array to iterate over.
   * @param {String} property The property to pluck.
   * @returns {Array} A new array of property values.
   */
  function pluck(array, property) {
    return map(array, function(object) {
      return object == null ? undefined : object[property];
    });
  }

  /**
   * A generic `Array#reduce` like method.
   *
   * @static
   * @memberOf Benchmark
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} accumulator Initial value of the accumulator.
   * @returns {Mixed} The accumulator.
   */
  function reduce(array, callback, accumulator) {
    var noaccum = arguments.length < 3;
    forEach(array, function(value, index) {
      accumulator = noaccum ? (noaccum = false, value) : callback(accumulator, value, index, array);
    });
    return accumulator;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Aborts all benchmarks in the suite.
   *
   * @name abort
   * @memberOf Benchmark.Suite
   * @returns {Object} The suite instance.
   */
  function abortSuite() {
    var event,
        me = this,
        resetting = calledBy.resetSuite;

    if (me.running) {
      event = Event('abort');
      me.emit(event);
      if (!event.cancelled || resetting) {
        // avoid infinite recursion
        calledBy.abortSuite = true;
        me.reset();
        delete calledBy.abortSuite;

        if (!resetting) {
          me.aborted = true;
          invoke(me, 'abort');
        }
      }
    }
    return me;
  }

  /**
   * Adds a test to the benchmark suite.
   *
   * @memberOf Benchmark.Suite
   * @param {String} name A name to identify the benchmark.
   * @param {Function|String} fn The test to benchmark.
   * @param {Object} [options={}] Options object.
   * @returns {Object} The benchmark instance.
   * @example
   *
   * // basic usage
   * suite.add(fn);
   *
   * // or using a name first
   * suite.add('foo', fn);
   *
   * // or with options
   * suite.add('foo', fn, {
   *   'onCycle': onCycle,
   *   'onComplete': onComplete
   * });
   *
   * // or name and options
   * suite.add('foo', {
   *   'fn': fn,
   *   'onCycle': onCycle,
   *   'onComplete': onComplete
   * });
   *
   * // or options only
   * suite.add({
   *   'name': 'foo',
   *   'fn': fn,
   *   'onCycle': onCycle,
   *   'onComplete': onComplete
   * });
   */
  function add(name, fn, options) {
    var me = this,
        bench = Benchmark(name, fn, options),
        event = Event({ 'type': 'add', 'target': bench });

    if (me.emit(event), !event.cancelled) {
      me.push(bench);
    }
    return me;
  }

  /**
   * Creates a new suite with cloned benchmarks.
   *
   * @name clone
   * @memberOf Benchmark.Suite
   * @param {Object} options Options object to overwrite cloned options.
   * @returns {Object} The new suite instance.
   */
  function cloneSuite(options) {
    var me = this,
        result = new me.constructor(extend({}, me.options, options));

    // copy own properties
    forOwn(me, function(value, key) {
      if (!hasKey(result, key)) {
        result[key] = value && isClassOf(value.clone, 'Function')
          ? value.clone()
          : deepClone(value);
      }
    });
    return result;
  }

  /**
   * An `Array#filter` like method.
   *
   * @name filter
   * @memberOf Benchmark.Suite
   * @param {Function|String} callback The function/alias called per iteration.
   * @returns {Object} A new suite of benchmarks that passed callback filter.
   */
  function filterSuite(callback) {
    var me = this,
        result = new me.constructor;

    result.push.apply(result, filter(me, callback));
    return result;
  }

  /**
   * Resets all benchmarks in the suite.
   *
   * @name reset
   * @memberOf Benchmark.Suite
   * @returns {Object} The suite instance.
   */
  function resetSuite() {
    var event,
        me = this,
        aborting = calledBy.abortSuite;

    if (me.running && !aborting) {
      // no worries, `resetSuite()` is called within `abortSuite()`
      calledBy.resetSuite = true;
      me.abort();
      delete calledBy.resetSuite;
    }
    // reset if the state has changed
    else if ((me.aborted || me.running) &&
        (me.emit(event = Event('reset')), !event.cancelled)) {
      me.running = false;
      if (!aborting) {
        invoke(me, 'reset');
      }
    }
    return me;
  }

  /**
   * Runs the suite.
   *
   * @name run
   * @memberOf Benchmark.Suite
   * @param {Object} [options={}] Options object.
   * @returns {Object} The suite instance.
   * @example
   *
   * // basic usage
   * suite.run();
   *
   * // or with options
   * suite.run({ 'async': true, 'queued': true });
   */
  function runSuite(options) {
    var me = this;

    me.reset();
    me.running = true;
    options || (options = {});

    invoke(me, {
      'name': 'run',
      'args': options,
      'queued': options.queued,
      'onStart': function(event) {
        me.emit(event);
      },
      'onCycle': function(event) {
        var bench = event.target;
        if (bench.error) {
          me.emit({ 'type': 'error', 'target': bench });
        }
        me.emit(event);
        event.aborted = me.aborted;
      },
      'onComplete': function(event) {
        me.running = false;
        me.emit(event);
      }
    });
    return me;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Executes all registered listeners of the specified event type.
   *
   * @memberOf Benchmark, Benchmark.Suite
   * @param {String|Object} type The event type or object.
   * @returns {Mixed} Returns the return value of the last listener executed.
   */
  function emit(type) {
    var listeners,
        me = this,
        event = Event(type),
        events = me.events,
        args = (arguments[0] = event, arguments);

    event.currentTarget || (event.currentTarget = me);
    event.target || (event.target = me);
    delete event.result;

    if (events && (listeners = hasKey(events, event.type) && events[event.type])) {
      forEach(listeners.slice(), function(listener) {
        if ((event.result = listener.apply(me, args)) === false) {
          event.cancelled = true;
        }
        return !event.aborted;
      });
    }
    return event.result;
  }

  /**
   * Returns an array of event listeners for a given type that can be manipulated
   * to add or remove listeners.
   *
   * @memberOf Benchmark, Benchmark.Suite
   * @param {String} type The event type.
   * @returns {Array} The listeners array.
   */
  function listeners(type) {
    var me = this,
        events = me.events || (me.events = {});

    return hasKey(events, type) ? events[type] : (events[type] = []);
  }

  /**
   * Unregisters a listener for the specified event type(s),
   * or unregisters all listeners for the specified event type(s),
   * or unregisters all listeners for all event types.
   *
   * @memberOf Benchmark, Benchmark.Suite
   * @param {String} [type] The event type.
   * @param {Function} [listener] The function to unregister.
   * @returns {Object} The benchmark instance.
   * @example
   *
   * // unregister a listener for an event type
   * bench.off('cycle', listener);
   *
   * // unregister a listener for multiple event types
   * bench.off('start cycle', listener);
   *
   * // unregister all listeners for an event type
   * bench.off('cycle');
   *
   * // unregister all listeners for multiple event types
   * bench.off('start cycle complete');
   *
   * // unregister all listeners for all event types
   * bench.off();
   */
  function off(type, listener) {
    var me = this,
        events = me.events;

    events && each(type ? type.split(' ') : events, function(listeners, type) {
      var index;
      if (typeof listeners == 'string') {
        type = listeners;
        listeners = hasKey(events, type) && events[type];
      }
      if (listeners) {
        if (listener) {
          index = indexOf(listeners, listener);
          if (index > -1) {
            listeners.splice(index, 1);
          }
        } else {
          listeners.length = 0;
        }
      }
    });
    return me;
  }

  /**
   * Registers a listener for the specified event type(s).
   *
   * @memberOf Benchmark, Benchmark.Suite
   * @param {String} type The event type.
   * @param {Function} listener The function to register.
   * @returns {Object} The benchmark instance.
   * @example
   *
   * // register a listener for an event type
   * bench.on('cycle', listener);
   *
   * // register a listener for multiple event types
   * bench.on('start cycle', listener);
   */
  function on(type, listener) {
    var me = this,
        events = me.events || (me.events = {});

    forEach(type.split(' '), function(type) {
      (hasKey(events, type)
        ? events[type]
        : (events[type] = [])
      ).push(listener);
    });
    return me;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Aborts the benchmark without recording times.
   *
   * @memberOf Benchmark
   * @returns {Object} The benchmark instance.
   */
  function abort() {
    var event,
        me = this,
        resetting = calledBy.reset;

    if (me.running) {
      event = Event('abort');
      me.emit(event);
      if (!event.cancelled || resetting) {
        // avoid infinite recursion
        calledBy.abort = true;
        me.reset();
        delete calledBy.abort;

        if (support.timeout) {
          clearTimeout(me._timerId);
          delete me._timerId;
        }
        if (!resetting) {
          me.aborted = true;
          me.running = false;
        }
      }
    }
    return me;
  }

  /**
   * Creates a new benchmark using the same test and options.
   *
   * @memberOf Benchmark
   * @param {Object} options Options object to overwrite cloned options.
   * @returns {Object} The new benchmark instance.
   * @example
   *
   * var bizarro = bench.clone({
   *   'name': 'doppelganger'
   * });
   */
  function clone(options) {
    var me = this,
        result = new me.constructor(extend({}, me, options));

    // correct the `options` object
    result.options = extend({}, me.options, options);

    // copy own custom properties
    forOwn(me, function(value, key) {
      if (!hasKey(result, key)) {
        result[key] = deepClone(value);
      }
    });
    return result;
  }

  /**
   * Determines if a benchmark is faster than another.
   *
   * @memberOf Benchmark
   * @param {Object} other The benchmark to compare.
   * @returns {Number} Returns `-1` if slower, `1` if faster, and `0` if indeterminate.
   */
  function compare(other) {
    var critical,
        zStat,
        me = this,
        sample1 = me.stats.sample,
        sample2 = other.stats.sample,
        size1 = sample1.length,
        size2 = sample2.length,
        maxSize = max(size1, size2),
        minSize = min(size1, size2),
        u1 = getU(sample1, sample2),
        u2 = getU(sample2, sample1),
        u = min(u1, u2);

    function getScore(xA, sampleB) {
      return reduce(sampleB, function(total, xB) {
        return total + (xB > xA ? 0 : xB < xA ? 1 : 0.5);
      }, 0);
    }

    function getU(sampleA, sampleB) {
      return reduce(sampleA, function(total, xA) {
        return total + getScore(xA, sampleB);
      }, 0);
    }

    function getZ(u) {
      return (u - ((size1 * size2) / 2)) / sqrt((size1 * size2 * (size1 + size2 + 1)) / 12);
    }

    // exit early if comparing the same benchmark
    if (me == other) {
      return 0;
    }
    // reject the null hyphothesis the two samples come from the
    // same population (i.e. have the same median) if...
    if (size1 + size2 > 30) {
      // ...the z-stat is greater than 1.96 or less than -1.96
      // http://www.statisticslectures.com/topics/mannwhitneyu/
      zStat = getZ(u);
      return abs(zStat) > 1.96 ? (zStat > 0 ? -1 : 1) : 0;
    }
    // ...the U value is less than or equal the critical U value
    // http://www.geoib.com/mann-whitney-u-test.html
    critical = maxSize < 5 || minSize < 3 ? 0 : uTable[maxSize][minSize - 3];
    return u <= critical ? (u == u1 ? 1 : -1) : 0;
  }

  /**
   * Reset properties and abort if running.
   *
   * @memberOf Benchmark
   * @returns {Object} The benchmark instance.
   */
  function reset() {
    var data,
        event,
        me = this,
        index = 0,
        changes = { 'length': 0 },
        queue = { 'length': 0 };

    if (me.running && !calledBy.abort) {
      // no worries, `reset()` is called within `abort()`
      calledBy.reset = true;
      me.abort();
      delete calledBy.reset;
    }
    else {
      // a non-recursive solution to check if properties have changed
      // http://www.jslab.dk/articles/non.recursive.preorder.traversal.part4
      data = { 'destination': me, 'source': extend({}, me.constructor.prototype, me.options) };
      do {
        forOwn(data.source, function(value, key) {
          var changed,
              destination = data.destination,
              currValue = destination[key];

          if (value && typeof value == 'object') {
            if (isClassOf(value, 'Array')) {
              // check if an array value has changed to a non-array value
              if (!isClassOf(currValue, 'Array')) {
                changed = currValue = [];
              }
              // or has changed its length
              if (currValue.length != value.length) {
                changed = currValue = currValue.slice(0, value.length);
                currValue.length = value.length;
              }
            }
            // check if an object has changed to a non-object value
            else if (!currValue || typeof currValue != 'object') {
              changed = currValue = {};
            }
            // register a changed object
            if (changed) {
              changes[changes.length++] = { 'destination': destination, 'key': key, 'value': currValue };
            }
            queue[queue.length++] = { 'destination': currValue, 'source': value };
          }
          // register a changed primitive
          else if (value !== currValue && !(value == null || isClassOf(value, 'Function'))) {
            changes[changes.length++] = { 'destination': destination, 'key': key, 'value': value };
          }
        });
      }
      while ((data = queue[index++]));

      // if changed emit the `reset` event and if it isn't cancelled reset the benchmark
      if (changes.length && (me.emit(event = Event('reset')), !event.cancelled)) {
        forEach(changes, function(data) {
          data.destination[data.key] = data.value;
        });
      }
    }
    return me;
  }

  /**
   * Displays relevant benchmark information when coerced to a string.
   *
   * @name toString
   * @memberOf Benchmark
   * @returns {String} A string representation of the benchmark instance.
   */
  function toStringBench() {
    var me = this,
        error = me.error,
        hz = me.hz,
        id = me.id,
        stats = me.stats,
        size = stats.sample.length,
        pm = support.java ? '+/-' : '\xb1',
        result = me.name || (isNaN(id) ? id : '<Test #' + id + '>');

    if (error) {
      result += ': ' + join(error);
    } else {
      result += ' x ' + formatNumber(hz.toFixed(hz < 100 ? 2 : 0)) + ' ops/sec ' + pm +
        stats.rme.toFixed(2) + '% (' + size + ' run' + (size == 1 ? '' : 's') + ' sampled)';
    }
    return result;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Clocks the time taken to execute a test per cycle (secs).
   *
   * @private
   * @param {Object} bench The benchmark instance.
   * @returns {Number} The time taken.
   */
  function clock() {
    var applet,
        options = Benchmark.options,
        template = { 'begin': 's$=new n$', 'end': 'r$=(new n$-s$)/1e3', 'uid': uid },
        timers = [{ 'ns': timer.ns, 'res': max(0.0015, getRes('ms')), 'unit': 'ms' }];

    // lazy define for hi-res timers
    clock = function(clone) {
      var deferred;
      if (clone instanceof Deferred) {
        deferred = clone;
        clone = deferred.benchmark;
      }

      var bench = clone._original,
          fn = bench.fn,
          fnArg = deferred ? getFirstArgument(fn) || 'deferred' : '',
          stringable = isStringable(fn);

      var source = {
        'setup': getSource(bench.setup, preprocess('m$.setup()')),
        'fn': getSource(fn, preprocess('m$.fn(' + fnArg + ')')),
        'fnArg': fnArg,
        'teardown': getSource(bench.teardown, preprocess('m$.teardown()'))
      };

      var count = bench.count = clone.count,
          decompilable = support.decompilation || stringable,
          id = bench.id,
          isEmpty = !(source.fn || stringable),
          name = bench.name || (typeof id == 'number' ? '<Test #' + id + '>' : id),
          ns = timer.ns,
          result = 0;

      // init `minTime` if needed
      clone.minTime = bench.minTime || (bench.minTime = bench.options.minTime = options.minTime);

      // repair nanosecond timer
      // (some Chrome builds erase the `ns` variable after millions of executions)
      if (applet) {
        try {
          ns.nanoTime();
        } catch(e) {
          // use non-element to avoid issues with libs that augment them
          ns = timer.ns = new applet.Packages.nano;
        }
      }

      // Compile in setup/teardown functions and the test loop.
      // Create a new compiled test, instead of using the cached `bench.compiled`,
      // to avoid potential engine optimizations enabled over the life of the test.
      var compiled = bench.compiled = createFunction(preprocess('t$'), interpolate(
        preprocess(deferred
          ? 'var d$=this,#{fnArg}=d$,m$=d$.benchmark._original,f$=m$.fn,su$=m$.setup,td$=m$.teardown;' +
            // when `deferred.cycles` is `0` then...
            'if(!d$.cycles){' +
            // set `deferred.fn`
            'd$.fn=function(){var #{fnArg}=d$;if(typeof f$=="function"){try{#{fn}\n}catch(e$){f$(d$)}}else{#{fn}\n}};' +
            // set `deferred.teardown`
            'd$.teardown=function(){d$.cycles=0;if(typeof td$=="function"){try{#{teardown}\n}catch(e$){td$()}}else{#{teardown}\n}};' +
            // execute the benchmark's `setup`
            'if(typeof su$=="function"){try{#{setup}\n}catch(e$){su$()}}else{#{setup}\n};' +
            // start timer
            't$.start(d$);' +
            // execute `deferred.fn` and return a dummy object
            '}d$.fn();return{}'

          : 'var r$,s$,m$=this,f$=m$.fn,i$=m$.count,n$=t$.ns;#{setup}\n#{begin};' +
            'while(i$--){#{fn}\n}#{end};#{teardown}\nreturn{elapsed:r$,uid:"#{uid}"}'),
        source
      ));

      try {
        if (isEmpty) {
          // Firefox may remove dead code from Function#toString results
          // http://bugzil.la/536085
          throw new Error('The test "' + name + '" is empty. This may be the result of dead code removal.');
        }
        else if (!deferred) {
          // pretest to determine if compiled code is exits early, usually by a
          // rogue `return` statement, by checking for a return object with the uid
          bench.count = 1;
          compiled = (compiled.call(bench, timer) || {}).uid == uid && compiled;
          bench.count = count;
        }
      } catch(e) {
        compiled = null;
        clone.error = e || new Error(String(e));
        bench.count = count;
      }
      // fallback when a test exits early or errors during pretest
      if (decompilable && !compiled && !deferred && !isEmpty) {
        compiled = createFunction(preprocess('t$'), interpolate(
          preprocess(
            (clone.error && !stringable
              ? 'var r$,s$,m$=this,f$=m$.fn,i$=m$.count'
              : 'function f$(){#{fn}\n}var r$,s$,m$=this,i$=m$.count'
            ) +
            ',n$=t$.ns;#{setup}\n#{begin};m$.f$=f$;while(i$--){m$.f$()}#{end};' +
            'delete m$.f$;#{teardown}\nreturn{elapsed:r$}'
          ),
          source
        ));

        try {
          // pretest one more time to check for errors
          bench.count = 1;
          compiled.call(bench, timer);
          bench.compiled = compiled;
          bench.count = count;
          delete clone.error;
        }
        catch(e) {
          bench.count = count;
          if (clone.error) {
            compiled = null;
          } else {
            bench.compiled = compiled;
            clone.error = e || new Error(String(e));
          }
        }
      }
      // assign `compiled` to `clone` before calling in case a deferred benchmark
      // immediately calls `deferred.resolve()`
      clone.compiled = compiled;
      // if no errors run the full test loop
      if (!clone.error) {
        result = compiled.call(deferred || bench, timer).elapsed;
      }
      return result;
    };

    /*------------------------------------------------------------------------*/

    /**
     * Gets the current timer's minimum resolution (secs).
     */
    function getRes(unit) {
      var measured,
          begin,
          count = 30,
          divisor = 1e3,
          ns = timer.ns,
          sample = [];

      // get average smallest measurable time
      while (count--) {
        if (unit == 'us') {
          divisor = 1e6;
          if (ns.stop) {
            ns.start();
            while (!(measured = ns.microseconds())) { }
          } else if (ns[perfName]) {
            divisor = 1e3;
            measured = Function('n', 'var r,s=n.' + perfName + '();while(!(r=n.' + perfName + '()-s)){};return r')(ns);
          } else {
            begin = ns();
            while (!(measured = ns() - begin)) { }
          }
        }
        else if (unit == 'ns') {
          divisor = 1e9;
          if (ns.nanoTime) {
            begin = ns.nanoTime();
            while (!(measured = ns.nanoTime() - begin)) { }
          } else {
            begin = (begin = ns())[0] + (begin[1] / divisor);
            while (!(measured = ((measured = ns())[0] + (measured[1] / divisor)) - begin)) { }
            divisor = 1;
          }
        }
        else {
          begin = new ns;
          while (!(measured = new ns - begin)) { }
        }
        // check for broken timers (nanoTime may have issues)
        // http://alivebutsleepy.srnet.cz/unreliable-system-nanotime/
        if (measured > 0) {
          sample.push(measured);
        } else {
          sample.push(Infinity);
          break;
        }
      }
      // convert to seconds
      return getMean(sample) / divisor;
    }

    /**
     * Replaces all occurrences of `$` with a unique number and
     * template tokens with content.
     */
    function preprocess(code) {
      return interpolate(code, template).replace(/\$/g, /\d+/.exec(uid));
    }

    /*------------------------------------------------------------------------*/

    // detect nanosecond support from a Java applet
    each(doc && doc.applets || [], function(element) {
      return !(timer.ns = applet = 'nanoTime' in element && element);
    });

    // check type in case Safari returns an object instead of a number
    try {
      if (typeof timer.ns.nanoTime() == 'number') {
        timers.push({ 'ns': timer.ns, 'res': getRes('ns'), 'unit': 'ns' });
      }
    } catch(e) { }

    // detect Chrome's microsecond timer:
    // enable benchmarking via the --enable-benchmarking command
    // line switch in at least Chrome 7 to use chrome.Interval
    try {
      if ((timer.ns = new (window.chrome || window.chromium).Interval)) {
        timers.push({ 'ns': timer.ns, 'res': getRes('us'), 'unit': 'us' });
      }
    } catch(e) { }

    // detect `performance.now` microsecond resolution timer
    if ((timer.ns = perfName && perfObject)) {
      timers.push({ 'ns': timer.ns, 'res': getRes('us'), 'unit': 'us' });
    }

    // detect Node's nanosecond resolution timer available in Node >= 0.8
    if (processObject && typeof (timer.ns = processObject.hrtime) == 'function') {
      timers.push({ 'ns': timer.ns, 'res': getRes('ns'), 'unit': 'ns' });
    }

    // detect Wade Simmons' Node microtime module
    if (microtimeObject && typeof (timer.ns = microtimeObject.now) == 'function') {
      timers.push({ 'ns': timer.ns,  'res': getRes('us'), 'unit': 'us' });
    }

    // pick timer with highest resolution
    timer = reduce(timers, function(timer, other) {
      return other.res < timer.res ? other : timer;
    });

    // remove unused applet
    if (timer.unit != 'ns' && applet) {
      applet = destroyElement(applet);
    }
    // error if there are no working timers
    if (timer.res == Infinity) {
      throw new Error('Benchmark.js was unable to find a working timer.');
    }
    // use API of chosen timer
    if (timer.unit == 'ns') {
      if (timer.ns.nanoTime) {
        extend(template, {
          'begin': 's$=n$.nanoTime()',
          'end': 'r$=(n$.nanoTime()-s$)/1e9'
        });
      } else {
        extend(template, {
          'begin': 's$=n$()',
          'end': 'r$=n$(s$);r$=r$[0]+(r$[1]/1e9)'
        });
      }
    }
    else if (timer.unit == 'us') {
      if (timer.ns.stop) {
        extend(template, {
          'begin': 's$=n$.start()',
          'end': 'r$=n$.microseconds()/1e6'
        });
      } else if (perfName) {
        extend(template, {
          'begin': 's$=n$.' + perfName + '()',
          'end': 'r$=(n$.' + perfName + '()-s$)/1e3'
        });
      } else {
        extend(template, {
          'begin': 's$=n$()',
          'end': 'r$=(n$()-s$)/1e6'
        });
      }
    }

    // define `timer` methods
    timer.start = createFunction(preprocess('o$'),
      preprocess('var n$=this.ns,#{begin};o$.elapsed=0;o$.timeStamp=s$'));

    timer.stop = createFunction(preprocess('o$'),
      preprocess('var n$=this.ns,s$=o$.timeStamp,#{end};o$.elapsed=r$'));

    // resolve time span required to achieve a percent uncertainty of at most 1%
    // http://spiff.rit.edu/classes/phys273/uncert/uncert.html
    options.minTime || (options.minTime = max(timer.res / 2 / 0.01, 0.05));
    return clock.apply(null, arguments);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Computes stats on benchmark results.
   *
   * @private
   * @param {Object} bench The benchmark instance.
   * @param {Object} options The options object.
   */
  function compute(bench, options) {
    options || (options = {});

    var async = options.async,
        elapsed = 0,
        initCount = bench.initCount,
        minSamples = bench.minSamples,
        queue = [],
        sample = bench.stats.sample;

    /**
     * Adds a clone to the queue.
     */
    function enqueue() {
      queue.push(bench.clone({
        '_original': bench,
        'events': {
          'abort': [update],
          'cycle': [update],
          'error': [update],
          'start': [update]
        }
      }));
    }

    /**
     * Updates the clone/original benchmarks to keep their data in sync.
     */
    function update(event) {
      var clone = this,
          type = event.type;

      if (bench.running) {
        if (type == 'start') {
          // Note: `clone.minTime` prop is inited in `clock()`
          clone.count = bench.initCount;
        }
        else {
          if (type == 'error') {
            bench.error = clone.error;
          }
          if (type == 'abort') {
            bench.abort();
            bench.emit('cycle');
          } else {
            event.currentTarget = event.target = bench;
            bench.emit(event);
          }
        }
      } else if (bench.aborted) {
        // clear abort listeners to avoid triggering bench's abort/cycle again
        clone.events.abort.length = 0;
        clone.abort();
      }
    }

    /**
     * Determines if more clones should be queued or if cycling should stop.
     */
    function evaluate(event) {
      var critical,
          df,
          mean,
          moe,
          rme,
          sd,
          sem,
          variance,
          clone = event.target,
          done = bench.aborted,
          now = +new Date,
          size = sample.push(clone.times.period),
          maxedOut = size >= minSamples && (elapsed += now - clone.times.timeStamp) / 1e3 > bench.maxTime,
          times = bench.times,
          varOf = function(sum, x) { return sum + pow(x - mean, 2); };

      // exit early for aborted or unclockable tests
      if (done || clone.hz == Infinity) {
        maxedOut = !(size = sample.length = queue.length = 0);
      }

      if (!done) {
        // sample mean (estimate of the population mean)
        mean = getMean(sample);
        // sample variance (estimate of the population variance)
        variance = reduce(sample, varOf, 0) / (size - 1) || 0;
        // sample standard deviation (estimate of the population standard deviation)
        sd = sqrt(variance);
        // standard error of the mean (a.k.a. the standard deviation of the sampling distribution of the sample mean)
        sem = sd / sqrt(size);
        // degrees of freedom
        df = size - 1;
        // critical value
        critical = tTable[Math.round(df) || 1] || tTable.infinity;
        // margin of error
        moe = sem * critical;
        // relative margin of error
        rme = (moe / mean) * 100 || 0;

        extend(bench.stats, {
          'deviation': sd,
          'mean': mean,
          'moe': moe,
          'rme': rme,
          'sem': sem,
          'variance': variance
        });

        // Abort the cycle loop when the minimum sample size has been collected
        // and the elapsed time exceeds the maximum time allowed per benchmark.
        // We don't count cycle delays toward the max time because delays may be
        // increased by browsers that clamp timeouts for inactive tabs.
        // https://developer.mozilla.org/en/window.setTimeout#Inactive_tabs
        if (maxedOut) {
          // reset the `initCount` in case the benchmark is rerun
          bench.initCount = initCount;
          bench.running = false;
          done = true;
          times.elapsed = (now - times.timeStamp) / 1e3;
        }
        if (bench.hz != Infinity) {
          bench.hz = 1 / mean;
          times.cycle = mean * bench.count;
          times.period = mean;
        }
      }
      // if time permits, increase sample size to reduce the margin of error
      if (queue.length < 2 && !maxedOut) {
        enqueue();
      }
      // abort the invoke cycle when done
      event.aborted = done;
    }

    // init queue and begin
    enqueue();
    invoke(queue, {
      'name': 'run',
      'args': { 'async': async },
      'queued': true,
      'onCycle': evaluate,
      'onComplete': function() { bench.emit('complete'); }
    });
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Cycles a benchmark until a run `count` can be established.
   *
   * @private
   * @param {Object} clone The cloned benchmark instance.
   * @param {Object} options The options object.
   */
  function cycle(clone, options) {
    options || (options = {});

    var deferred;
    if (clone instanceof Deferred) {
      deferred = clone;
      clone = clone.benchmark;
    }

    var clocked,
        cycles,
        divisor,
        event,
        minTime,
        period,
        async = options.async,
        bench = clone._original,
        count = clone.count,
        times = clone.times;

    // continue, if not aborted between cycles
    if (clone.running) {
      // `minTime` is set to `Benchmark.options.minTime` in `clock()`
      cycles = ++clone.cycles;
      clocked = deferred ? deferred.elapsed : clock(clone);
      minTime = clone.minTime;

      if (cycles > bench.cycles) {
        bench.cycles = cycles;
      }
      if (clone.error) {
        event = Event('error');
        event.message = clone.error;
        clone.emit(event);
        if (!event.cancelled) {
          clone.abort();
        }
      }
    }

    // continue, if not errored
    if (clone.running) {
      // time taken to complete last test cycle
      bench.times.cycle = times.cycle = clocked;
      // seconds per operation
      period = bench.times.period = times.period = clocked / count;
      // ops per second
      bench.hz = clone.hz = 1 / period;
      // avoid working our way up to this next time
      bench.initCount = clone.initCount = count;
      // do we need to do another cycle?
      clone.running = clocked < minTime;

      if (clone.running) {
        // tests may clock at `0` when `initCount` is a small number,
        // to avoid that we set its count to something a bit higher
        if (!clocked && (divisor = divisors[clone.cycles]) != null) {
          count = floor(4e6 / divisor);
        }
        // calculate how many more iterations it will take to achive the `minTime`
        if (count <= clone.count) {
          count += Math.ceil((minTime - clocked) / period);
        }
        clone.running = count != Infinity;
      }
    }
    // should we exit early?
    event = Event('cycle');
    clone.emit(event);
    if (event.aborted) {
      clone.abort();
    }
    // figure out what to do next
    if (clone.running) {
      // start a new cycle
      clone.count = count;
      if (deferred) {
        clone.compiled.call(deferred, timer);
      } else if (async) {
        delay(clone, function() { cycle(clone, options); });
      } else {
        cycle(clone);
      }
    }
    else {
      // fix TraceMonkey bug associated with clock fallbacks
      // http://bugzil.la/509069
      if (support.browser) {
        runScript(uid + '=1;delete ' + uid);
      }
      // done
      clone.emit('complete');
    }
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Runs the benchmark.
   *
   * @memberOf Benchmark
   * @param {Object} [options={}] Options object.
   * @returns {Object} The benchmark instance.
   * @example
   *
   * // basic usage
   * bench.run();
   *
   * // or with options
   * bench.run({ 'async': true });
   */
  function run(options) {
    var me = this,
        event = Event('start');

    // set `running` to `false` so `reset()` won't call `abort()`
    me.running = false;
    me.reset();
    me.running = true;

    me.count = me.initCount;
    me.times.timeStamp = +new Date;
    me.emit(event);

    if (!event.cancelled) {
      options = { 'async': ((options = options && options.async) == null ? me.async : options) && support.timeout };

      // for clones created within `compute()`
      if (me._original) {
        if (me.defer) {
          Deferred(me);
        } else {
          cycle(me, options);
        }
      }
      // for original benchmarks
      else {
        compute(me, options);
      }
    }
    return me;
  }

  /*--------------------------------------------------------------------------*/

  // Firefox 1 erroneously defines variable and argument names of functions on
  // the function itself as non-configurable properties with `undefined` values.
  // The bugginess continues as the `Benchmark` constructor has an argument
  // named `options` and Firefox 1 will not assign a value to `Benchmark.options`,
  // making it non-writable in the process, unless it is the first property
  // assigned by for-in loop of `extend()`.
  extend(Benchmark, {

    /**
     * The default options copied by benchmark instances.
     *
     * @static
     * @memberOf Benchmark
     * @type Object
     */
    'options': {

      /**
       * A flag to indicate that benchmark cycles will execute asynchronously
       * by default.
       *
       * @memberOf Benchmark.options
       * @type Boolean
       */
      'async': false,

      /**
       * A flag to indicate that the benchmark clock is deferred.
       *
       * @memberOf Benchmark.options
       * @type Boolean
       */
      'defer': false,

      /**
       * The delay between test cycles (secs).
       * @memberOf Benchmark.options
       * @type Number
       */
      'delay': 0.005,

      /**
       * Displayed by Benchmark#toString when a `name` is not available
       * (auto-generated if absent).
       *
       * @memberOf Benchmark.options
       * @type String
       */
      'id': undefined,

      /**
       * The default number of times to execute a test on a benchmark's first cycle.
       *
       * @memberOf Benchmark.options
       * @type Number
       */
      'initCount': 1,

      /**
       * The maximum time a benchmark is allowed to run before finishing (secs).
       * Note: Cycle delays aren't counted toward the maximum time.
       *
       * @memberOf Benchmark.options
       * @type Number
       */
      'maxTime': 5,

      /**
       * The minimum sample size required to perform statistical analysis.
       *
       * @memberOf Benchmark.options
       * @type Number
       */
      'minSamples': 5,

      /**
       * The time needed to reduce the percent uncertainty of measurement to 1% (secs).
       *
       * @memberOf Benchmark.options
       * @type Number
       */
      'minTime': 0,

      /**
       * The name of the benchmark.
       *
       * @memberOf Benchmark.options
       * @type String
       */
      'name': undefined,

      /**
       * An event listener called when the benchmark is aborted.
       *
       * @memberOf Benchmark.options
       * @type Function
       */
      'onAbort': undefined,

      /**
       * An event listener called when the benchmark completes running.
       *
       * @memberOf Benchmark.options
       * @type Function
       */
      'onComplete': undefined,

      /**
       * An event listener called after each run cycle.
       *
       * @memberOf Benchmark.options
       * @type Function
       */
      'onCycle': undefined,

      /**
       * An event listener called when a test errors.
       *
       * @memberOf Benchmark.options
       * @type Function
       */
      'onError': undefined,

      /**
       * An event listener called when the benchmark is reset.
       *
       * @memberOf Benchmark.options
       * @type Function
       */
      'onReset': undefined,

      /**
       * An event listener called when the benchmark starts running.
       *
       * @memberOf Benchmark.options
       * @type Function
       */
      'onStart': undefined
    },

    /**
     * Platform object with properties describing things like browser name,
     * version, and operating system.
     *
     * @static
     * @memberOf Benchmark
     * @type Object
     */
    'platform': req('platform') || window.platform || {

      /**
       * The platform description.
       *
       * @memberOf Benchmark.platform
       * @type String
       */
      'description': window.navigator && navigator.userAgent || null,

      /**
       * The name of the browser layout engine.
       *
       * @memberOf Benchmark.platform
       * @type String|Null
       */
      'layout': null,

      /**
       * The name of the product hosting the browser.
       *
       * @memberOf Benchmark.platform
       * @type String|Null
       */
      'product': null,

      /**
       * The name of the browser/environment.
       *
       * @memberOf Benchmark.platform
       * @type String|Null
       */
      'name': null,

      /**
       * The name of the product's manufacturer.
       *
       * @memberOf Benchmark.platform
       * @type String|Null
       */
      'manufacturer': null,

      /**
       * The name of the operating system.
       *
       * @memberOf Benchmark.platform
       * @type String|Null
       */
      'os': null,

      /**
       * The alpha/beta release indicator.
       *
       * @memberOf Benchmark.platform
       * @type String|Null
       */
      'prerelease': null,

      /**
       * The browser/environment version.
       *
       * @memberOf Benchmark.platform
       * @type String|Null
       */
      'version': null,

      /**
       * Return platform description when the platform object is coerced to a string.
       *
       * @memberOf Benchmark.platform
       * @type Function
       * @returns {String} The platform description.
       */
      'toString': function() {
        return this.description || '';
      }
    },

    /**
     * The semantic version number.
     *
     * @static
     * @memberOf Benchmark
     * @type String
     */
    'version': '1.0.0',

    // an object of environment/feature detection flags
    'support': support,

    // clone objects
    'deepClone': deepClone,

    // iteration utility
    'each': each,

    // augment objects
    'extend': extend,

    // generic Array#filter
    'filter': filter,

    // generic Array#forEach
    'forEach': forEach,

    // generic own property iteration utility
    'forOwn': forOwn,

    // converts a number to a comma-separated string
    'formatNumber': formatNumber,

    // generic Object#hasOwnProperty
    // (trigger hasKey's lazy define before assigning it to Benchmark)
    'hasKey': (hasKey(Benchmark, ''), hasKey),

    // generic Array#indexOf
    'indexOf': indexOf,

    // template utility
    'interpolate': interpolate,

    // invokes a method on each item in an array
    'invoke': invoke,

    // generic Array#join for arrays and objects
    'join': join,

    // generic Array#map
    'map': map,

    // retrieves a property value from each item in an array
    'pluck': pluck,

    // generic Array#reduce
    'reduce': reduce
  });

  /*--------------------------------------------------------------------------*/

  extend(Benchmark.prototype, {

    /**
     * The number of times a test was executed.
     *
     * @memberOf Benchmark
     * @type Number
     */
    'count': 0,

    /**
     * The number of cycles performed while benchmarking.
     *
     * @memberOf Benchmark
     * @type Number
     */
    'cycles': 0,

    /**
     * The number of executions per second.
     *
     * @memberOf Benchmark
     * @type Number
     */
    'hz': 0,

    /**
     * The compiled test function.
     *
     * @memberOf Benchmark
     * @type Function|String
     */
    'compiled': undefined,

    /**
     * The error object if the test failed.
     *
     * @memberOf Benchmark
     * @type Object
     */
    'error': undefined,

    /**
     * The test to benchmark.
     *
     * @memberOf Benchmark
     * @type Function|String
     */
    'fn': undefined,

    /**
     * A flag to indicate if the benchmark is aborted.
     *
     * @memberOf Benchmark
     * @type Boolean
     */
    'aborted': false,

    /**
     * A flag to indicate if the benchmark is running.
     *
     * @memberOf Benchmark
     * @type Boolean
     */
    'running': false,

    /**
     * Compiled into the test and executed immediately **before** the test loop.
     *
     * @memberOf Benchmark
     * @type Function|String
     * @example
     *
     * // basic usage
     * var bench = Benchmark({
     *   'setup': function() {
     *     var c = this.count,
     *         element = document.getElementById('container');
     *     while (c--) {
     *       element.appendChild(document.createElement('div'));
     *     }
     *   },
     *   'fn': function() {
     *     element.removeChild(element.lastChild);
     *   }
     * });
     *
     * // compiles to something like:
     * var c = this.count,
     *     element = document.getElementById('container');
     * while (c--) {
     *   element.appendChild(document.createElement('div'));
     * }
     * var start = new Date;
     * while (count--) {
     *   element.removeChild(element.lastChild);
     * }
     * var end = new Date - start;
     *
     * // or using strings
     * var bench = Benchmark({
     *   'setup': '\
     *     var a = 0;\n\
     *     (function() {\n\
     *       (function() {\n\
     *         (function() {',
     *   'fn': 'a += 1;',
     *   'teardown': '\
     *          }())\n\
     *        }())\n\
     *      }())'
     * });
     *
     * // compiles to something like:
     * var a = 0;
     * (function() {
     *   (function() {
     *     (function() {
     *       var start = new Date;
     *       while (count--) {
     *         a += 1;
     *       }
     *       var end = new Date - start;
     *     }())
     *   }())
     * }())
     */
    'setup': noop,

    /**
     * Compiled into the test and executed immediately **after** the test loop.
     *
     * @memberOf Benchmark
     * @type Function|String
     */
    'teardown': noop,

    /**
     * An object of stats including mean, margin or error, and standard deviation.
     *
     * @memberOf Benchmark
     * @type Object
     */
    'stats': {

      /**
       * The margin of error.
       *
       * @memberOf Benchmark#stats
       * @type Number
       */
      'moe': 0,

      /**
       * The relative margin of error (expressed as a percentage of the mean).
       *
       * @memberOf Benchmark#stats
       * @type Number
       */
      'rme': 0,

      /**
       * The standard error of the mean.
       *
       * @memberOf Benchmark#stats
       * @type Number
       */
      'sem': 0,

      /**
       * The sample standard deviation.
       *
       * @memberOf Benchmark#stats
       * @type Number
       */
      'deviation': 0,

      /**
       * The sample arithmetic mean.
       *
       * @memberOf Benchmark#stats
       * @type Number
       */
      'mean': 0,

      /**
       * The array of sampled periods.
       *
       * @memberOf Benchmark#stats
       * @type Array
       */
      'sample': [],

      /**
       * The sample variance.
       *
       * @memberOf Benchmark#stats
       * @type Number
       */
      'variance': 0
    },

    /**
     * An object of timing data including cycle, elapsed, period, start, and stop.
     *
     * @memberOf Benchmark
     * @type Object
     */
    'times': {

      /**
       * The time taken to complete the last cycle (secs).
       *
       * @memberOf Benchmark#times
       * @type Number
       */
      'cycle': 0,

      /**
       * The time taken to complete the benchmark (secs).
       *
       * @memberOf Benchmark#times
       * @type Number
       */
      'elapsed': 0,

      /**
       * The time taken to execute the test once (secs).
       *
       * @memberOf Benchmark#times
       * @type Number
       */
      'period': 0,

      /**
       * A timestamp of when the benchmark started (ms).
       *
       * @memberOf Benchmark#times
       * @type Number
       */
      'timeStamp': 0
    },

    // aborts benchmark (does not record times)
    'abort': abort,

    // creates a new benchmark using the same test and options
    'clone': clone,

    // compares benchmark's hertz with another
    'compare': compare,

    // executes listeners
    'emit': emit,

    // get listeners
    'listeners': listeners,

    // unregister listeners
    'off': off,

    // register listeners
    'on': on,

    // reset benchmark properties
    'reset': reset,

    // runs the benchmark
    'run': run,

    // pretty print benchmark info
    'toString': toStringBench
  });

  /*--------------------------------------------------------------------------*/

  extend(Deferred.prototype, {

    /**
     * The deferred benchmark instance.
     *
     * @memberOf Benchmark.Deferred
     * @type Object
     */
    'benchmark': null,

    /**
     * The number of deferred cycles performed while benchmarking.
     *
     * @memberOf Benchmark.Deferred
     * @type Number
     */
    'cycles': 0,

    /**
     * The time taken to complete the deferred benchmark (secs).
     *
     * @memberOf Benchmark.Deferred
     * @type Number
     */
    'elapsed': 0,

    /**
     * A timestamp of when the deferred benchmark started (ms).
     *
     * @memberOf Benchmark.Deferred
     * @type Number
     */
    'timeStamp': 0,

    // cycles/completes the deferred benchmark
    'resolve': resolve
  });

  /*--------------------------------------------------------------------------*/

  extend(Event.prototype, {

    /**
     * A flag to indicate if the emitters listener iteration is aborted.
     *
     * @memberOf Benchmark.Event
     * @type Boolean
     */
    'aborted': false,

    /**
     * A flag to indicate if the default action is cancelled.
     *
     * @memberOf Benchmark.Event
     * @type Boolean
     */
    'cancelled': false,

    /**
     * The object whose listeners are currently being processed.
     *
     * @memberOf Benchmark.Event
     * @type Object
     */
    'currentTarget': undefined,

    /**
     * The return value of the last executed listener.
     *
     * @memberOf Benchmark.Event
     * @type Mixed
     */
    'result': undefined,

    /**
     * The object to which the event was originally emitted.
     *
     * @memberOf Benchmark.Event
     * @type Object
     */
    'target': undefined,

    /**
     * A timestamp of when the event was created (ms).
     *
     * @memberOf Benchmark.Event
     * @type Number
     */
    'timeStamp': 0,

    /**
     * The event type.
     *
     * @memberOf Benchmark.Event
     * @type String
     */
    'type': ''
  });

  /*--------------------------------------------------------------------------*/

  /**
   * The default options copied by suite instances.
   *
   * @static
   * @memberOf Benchmark.Suite
   * @type Object
   */
  Suite.options = {

    /**
     * The name of the suite.
     *
     * @memberOf Benchmark.Suite.options
     * @type String
     */
    'name': undefined
  };

  /*--------------------------------------------------------------------------*/

  extend(Suite.prototype, {

    /**
     * The number of benchmarks in the suite.
     *
     * @memberOf Benchmark.Suite
     * @type Number
     */
    'length': 0,

    /**
     * A flag to indicate if the suite is aborted.
     *
     * @memberOf Benchmark.Suite
     * @type Boolean
     */
    'aborted': false,

    /**
     * A flag to indicate if the suite is running.
     *
     * @memberOf Benchmark.Suite
     * @type Boolean
     */
    'running': false,

    /**
     * An `Array#forEach` like method.
     * Callbacks may terminate the loop by explicitly returning `false`.
     *
     * @memberOf Benchmark.Suite
     * @param {Function} callback The function called per iteration.
     * @returns {Object} The suite iterated over.
     */
    'forEach': methodize(forEach),

    /**
     * An `Array#indexOf` like method.
     *
     * @memberOf Benchmark.Suite
     * @param {Mixed} value The value to search for.
     * @returns {Number} The index of the matched value or `-1`.
     */
    'indexOf': methodize(indexOf),

    /**
     * Invokes a method on all benchmarks in the suite.
     *
     * @memberOf Benchmark.Suite
     * @param {String|Object} name The name of the method to invoke OR options object.
     * @param {Mixed} [arg1, arg2, ...] Arguments to invoke the method with.
     * @returns {Array} A new array of values returned from each method invoked.
     */
    'invoke': methodize(invoke),

    /**
     * Converts the suite of benchmarks to a string.
     *
     * @memberOf Benchmark.Suite
     * @param {String} [separator=','] A string to separate each element of the array.
     * @returns {String} The string.
     */
    'join': [].join,

    /**
     * An `Array#map` like method.
     *
     * @memberOf Benchmark.Suite
     * @param {Function} callback The function called per iteration.
     * @returns {Array} A new array of values returned by the callback.
     */
    'map': methodize(map),

    /**
     * Retrieves the value of a specified property from all benchmarks in the suite.
     *
     * @memberOf Benchmark.Suite
     * @param {String} property The property to pluck.
     * @returns {Array} A new array of property values.
     */
    'pluck': methodize(pluck),

    /**
     * Removes the last benchmark from the suite and returns it.
     *
     * @memberOf Benchmark.Suite
     * @returns {Mixed} The removed benchmark.
     */
    'pop': [].pop,

    /**
     * Appends benchmarks to the suite.
     *
     * @memberOf Benchmark.Suite
     * @returns {Number} The suite's new length.
     */
    'push': [].push,

    /**
     * Sorts the benchmarks of the suite.
     *
     * @memberOf Benchmark.Suite
     * @param {Function} [compareFn=null] A function that defines the sort order.
     * @returns {Object} The sorted suite.
     */
    'sort': [].sort,

    /**
     * An `Array#reduce` like method.
     *
     * @memberOf Benchmark.Suite
     * @param {Function} callback The function called per iteration.
     * @param {Mixed} accumulator Initial value of the accumulator.
     * @returns {Mixed} The accumulator.
     */
    'reduce': methodize(reduce),

    // aborts all benchmarks in the suite
    'abort': abortSuite,

    // adds a benchmark to the suite
    'add': add,

    // creates a new suite with cloned benchmarks
    'clone': cloneSuite,

    // executes listeners of a specified type
    'emit': emit,

    // creates a new suite of filtered benchmarks
    'filter': filterSuite,

    // get listeners
    'listeners': listeners,

    // unregister listeners
    'off': off,

   // register listeners
    'on': on,

    // resets all benchmarks in the suite
    'reset': resetSuite,

    // runs all benchmarks in the suite
    'run': runSuite,

    // array methods
    'concat': concat,

    'reverse': reverse,

    'shift': shift,

    'slice': slice,

    'splice': splice,

    'unshift': unshift
  });

  /*--------------------------------------------------------------------------*/

  // expose Deferred, Event and Suite
  extend(Benchmark, {
    'Deferred': Deferred,
    'Event': Event,
    'Suite': Suite
  });

  // expose Benchmark
  // some AMD build optimizers, like r.js, check for specific condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // define as an anonymous module so, through path mapping, it can be aliased
    define(function() {
      return Benchmark;
    });
  }
  // check for `exports` after `define` in case a build optimizer adds an `exports` object
  else if (freeExports) {
    // in Node.js or RingoJS v0.8.0+
    if (typeof module == 'object' && module && module.exports == freeExports) {
      (module.exports = Benchmark).Benchmark = Benchmark;
    }
    // in Narwhal or RingoJS v0.7.0-
    else {
      freeExports.Benchmark = Benchmark;
    }
  }
  // in a browser or Rhino
  else {
    // use square bracket notation so Closure Compiler won't munge `Benchmark`
    // http://code.google.com/closure/compiler/docs/api-tutorial3.html#export
    window['Benchmark'] = Benchmark;
  }

  // trigger clock's lazy define early to avoid a security error
  if (support.air) {
    clock({ '_original': { 'fn': noop, 'count': 1, 'options': {} } });
  }
}(this));

}).call(this,require("FWaASH"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"FWaASH":18}],14:[function(require,module,exports){

},{}],15:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192

/**
 * If `Buffer._useTypedArrays`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (compatible down to IE6)
 */
Buffer._useTypedArrays = (function () {
  // Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
  // Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
  // properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
  // because we need to be able to add all the node Buffer API methods. This is an issue
  // in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() &&
        typeof arr.subarray === 'function' // Chrome 9-10 lack `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  if (encoding === 'base64' && type === 'string') {
    subject = base64clean(subject)
  }

  // Find the length
  var length
  if (type === 'number')
    length = coerce(subject)
  else if (type === 'string')
    length = Buffer.byteLength(subject, encoding)
  else if (type === 'object')
    length = coerce(subject.length) // assume that object is array-like
  else
    throw new Error('First argument needs to be a number, array or string.')

  var buf
  if (Buffer._useTypedArrays) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    if (Buffer.isBuffer(subject)) {
      for (i = 0; i < length; i++)
        buf[i] = subject.readUInt8(i)
    } else {
      for (i = 0; i < length; i++)
        buf[i] = ((subject[i] % 256) + 256) % 256
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

// STATIC METHODS
// ==============

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.isBuffer = function (b) {
  return !!(b !== null && b !== undefined && b._isBuffer)
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str.toString()
  switch (encoding || 'utf8') {
    case 'hex':
      ret = str.length / 2
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.concat = function (list, totalLength) {
  assert(isArray(list), 'Usage: Buffer.concat(list[, length])')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (totalLength === undefined) {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

Buffer.compare = function (a, b) {
  assert(Buffer.isBuffer(a) && Buffer.isBuffer(b), 'Arguments must be Buffers')
  var x = a.length
  var y = b.length
  for (var i = 0, len = Math.min(x, y); i < len && a[i] === b[i]; i++) {}
  if (i !== len) {
    x = a[i]
    y = b[i]
  }
  if (x < y) {
    return -1
  }
  if (y < x) {
    return 1
  }
  return 0
}

// BUFFER INSTANCE METHODS
// =======================

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  assert(strLen % 2 === 0, 'Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    assert(!isNaN(byte), 'Invalid hex string')
    buf[offset + i] = byte
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  var charsWritten = blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function asciiWrite (buf, string, offset, length) {
  var charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function binaryWrite (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  var charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function utf16leWrite (buf, string, offset, length) {
  var charsWritten = blitBuffer(utf16leToBytes(string), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = utf16leWrite(this, string, offset, length)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toString = function (encoding, start, end) {
  var self = this

  encoding = String(encoding || 'utf8').toLowerCase()
  start = Number(start) || 0
  end = (end === undefined) ? self.length : Number(end)

  // Fastpath empty strings
  if (end === start)
    return ''

  var ret
  switch (encoding) {
    case 'hex':
      ret = hexSlice(self, start, end)
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8Slice(self, start, end)
      break
    case 'ascii':
      ret = asciiSlice(self, start, end)
      break
    case 'binary':
      ret = binarySlice(self, start, end)
      break
    case 'base64':
      ret = base64Slice(self, start, end)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = utf16leSlice(self, start, end)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

Buffer.prototype.equals = function (b) {
  assert(Buffer.isBuffer(b), 'Argument must be a Buffer')
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.compare = function (b) {
  assert(Buffer.isBuffer(b), 'Argument must be a Buffer')
  return Buffer.compare(this, b)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  assert(end >= start, 'sourceEnd < sourceStart')
  assert(target_start >= 0 && target_start < target.length,
      'targetStart out of bounds')
  assert(start >= 0 && start < source.length, 'sourceStart out of bounds')
  assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 100 || !Buffer._useTypedArrays) {
    for (var i = 0; i < len; i++) {
      target[i + target_start] = this[i + start]
    }
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function binarySlice (buf, start, end) {
  return asciiSlice(buf, start, end)
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = clamp(start, len, 0)
  end = clamp(end, len, len)

  if (Buffer._useTypedArrays) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  return this[offset]
}

function readUInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    val = buf[offset]
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
  } else {
    val = buf[offset] << 8
    if (offset + 1 < len)
      val |= buf[offset + 1]
  }
  return val
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  return readUInt16(this, offset, true, noAssert)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  return readUInt16(this, offset, false, noAssert)
}

function readUInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    if (offset + 2 < len)
      val = buf[offset + 2] << 16
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
    val |= buf[offset]
    if (offset + 3 < len)
      val = val + (buf[offset + 3] << 24 >>> 0)
  } else {
    if (offset + 1 < len)
      val = buf[offset + 1] << 16
    if (offset + 2 < len)
      val |= buf[offset + 2] << 8
    if (offset + 3 < len)
      val |= buf[offset + 3]
    val = val + (buf[offset] << 24 >>> 0)
  }
  return val
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  return readUInt32(this, offset, true, noAssert)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  return readUInt32(this, offset, false, noAssert)
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null,
        'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  var neg = this[offset] & 0x80
  if (neg)
    return (0xff - this[offset] + 1) * -1
  else
    return this[offset]
}

function readInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = readUInt16(buf, offset, littleEndian, true)
  var neg = val & 0x8000
  if (neg)
    return (0xffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  return readInt16(this, offset, true, noAssert)
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  return readInt16(this, offset, false, noAssert)
}

function readInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = readUInt32(buf, offset, littleEndian, true)
  var neg = val & 0x80000000
  if (neg)
    return (0xffffffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  return readInt32(this, offset, true, noAssert)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  return readInt32(this, offset, false, noAssert)
}

function readFloat (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 23, 4)
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  return readFloat(this, offset, true, noAssert)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  return readFloat(this, offset, false, noAssert)
}

function readDouble (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 7 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 52, 8)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  return readDouble(this, offset, true, noAssert)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  return readDouble(this, offset, false, noAssert)
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'trying to write beyond buffer length')
    verifuint(value, 0xff)
  }

  if (offset >= this.length) return

  this[offset] = value
  return offset + 1
}

function writeUInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
    buf[offset + i] =
        (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
            (littleEndian ? i : 1 - i) * 8
  }
  return offset + 2
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  return writeUInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  return writeUInt16(this, value, offset, false, noAssert)
}

function writeUInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffffffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
    buf[offset + i] =
        (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
  return offset + 4
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  return writeUInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  return writeUInt32(this, value, offset, false, noAssert)
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7f, -0x80)
  }

  if (offset >= this.length)
    return

  if (value >= 0)
    this.writeUInt8(value, offset, noAssert)
  else
    this.writeUInt8(0xff + value + 1, offset, noAssert)
  return offset + 1
}

function writeInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fff, -0x8000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    writeUInt16(buf, value, offset, littleEndian, noAssert)
  else
    writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert)
  return offset + 2
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  return writeInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  return writeInt16(this, value, offset, false, noAssert)
}

function writeInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fffffff, -0x80000000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    writeUInt32(buf, value, offset, littleEndian, noAssert)
  else
    writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert)
  return offset + 4
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  return writeInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  return writeInt32(this, value, offset, false, noAssert)
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 7 < buf.length,
        'Trying to write beyond buffer length')
    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  assert(end >= start, 'end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  assert(start >= 0 && start < this.length, 'start out of bounds')
  assert(end >= 0 && end <= this.length, 'end out of bounds')

  var i
  if (typeof value === 'number') {
    for (i = start; i < end; i++) {
      this[i] = value
    }
  } else {
    var bytes = utf8ToBytes(value.toString())
    var len = bytes.length
    for (i = start; i < end; i++) {
      this[i] = bytes[i % len]
    }
  }

  return this
}

Buffer.prototype.inspect = function () {
  var out = []
  var len = this.length
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i])
    if (i === exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...'
      break
    }
  }
  return '<Buffer ' + out.join(' ') + '>'
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer._useTypedArrays) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1) {
        buf[i] = this[i]
      }
      return buf.buffer
    }
  } else {
    throw new Error('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.equals = BP.equals
  arr.compare = BP.compare
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

var INVALID_BASE64_RE = /[^+\/0-9A-z]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

// slice(start, end)
function clamp (index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue
  index = ~~index;  // Coerce to integer.
  if (index >= len) return len
  if (index >= 0) return index
  index += len
  if (index >= 0) return index
  return 0
}

function coerce (length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length)
  return length < 0 ? 0 : length
}

function isArray (subject) {
  return (Array.isArray || function (subject) {
    return Object.prototype.toString.call(subject) === '[object Array]'
  })(subject)
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F) {
      byteArray.push(b)
    } else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++) {
        byteArray.push(parseInt(h[j], 16))
      }
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

/*
 * We have to make sure that the value is a valid integer. This means that it
 * is non-negative. It has no fractional component and that it does not
 * exceed the maximum allowed value.
 */
function verifuint (value, max) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value >= 0, 'specified a negative value for writing an unsigned value')
  assert(value <= max, 'value is larger than maximum value for type')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifsint (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifIEEE754 (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
}

function assert (test, message) {
  if (!test) throw new Error(message || 'Failed assertion')
}

},{"base64-js":16,"ieee754":17}],16:[function(require,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS)
			return 62 // '+'
		if (code === SLASH)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

},{}],17:[function(require,module,exports){
exports.read = function(buffer, offset, isLE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isLE ? (nBytes - 1) : 0,
      d = isLE ? -1 : 1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isLE ? 0 : (nBytes - 1),
      d = isLE ? 1 : -1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

},{}],18:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],19:[function(require,module,exports){
"use strict";
/*globals Handlebars: true */
var Handlebars = require("./handlebars.runtime")["default"];

// Compiler imports
var AST = require("./handlebars/compiler/ast")["default"];
var Parser = require("./handlebars/compiler/base").parser;
var parse = require("./handlebars/compiler/base").parse;
var Compiler = require("./handlebars/compiler/compiler").Compiler;
var compile = require("./handlebars/compiler/compiler").compile;
var precompile = require("./handlebars/compiler/compiler").precompile;
var JavaScriptCompiler = require("./handlebars/compiler/javascript-compiler")["default"];

var _create = Handlebars.create;
var create = function() {
  var hb = _create();

  hb.compile = function(input, options) {
    return compile(input, options, hb);
  };
  hb.precompile = function (input, options) {
    return precompile(input, options, hb);
  };

  hb.AST = AST;
  hb.Compiler = Compiler;
  hb.JavaScriptCompiler = JavaScriptCompiler;
  hb.Parser = Parser;
  hb.parse = parse;

  return hb;
};

Handlebars = create();
Handlebars.create = create;

exports["default"] = Handlebars;
},{"./handlebars.runtime":20,"./handlebars/compiler/ast":22,"./handlebars/compiler/base":23,"./handlebars/compiler/compiler":24,"./handlebars/compiler/javascript-compiler":25}],20:[function(require,module,exports){
"use strict";
/*globals Handlebars: true */
var base = require("./handlebars/base");

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)
var SafeString = require("./handlebars/safe-string")["default"];
var Exception = require("./handlebars/exception")["default"];
var Utils = require("./handlebars/utils");
var runtime = require("./handlebars/runtime");

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
var create = function() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = SafeString;
  hb.Exception = Exception;
  hb.Utils = Utils;

  hb.VM = runtime;
  hb.template = function(spec) {
    return runtime.template(spec, hb);
  };

  return hb;
};

var Handlebars = create();
Handlebars.create = create;

exports["default"] = Handlebars;
},{"./handlebars/base":21,"./handlebars/exception":29,"./handlebars/runtime":30,"./handlebars/safe-string":31,"./handlebars/utils":32}],21:[function(require,module,exports){
"use strict";
var Utils = require("./utils");
var Exception = require("./exception")["default"];

var VERSION = "2.0.0-alpha.4";
exports.VERSION = VERSION;var COMPILER_REVISION = 5;
exports.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '== 1.x.x',
  5: '>= 2.0.0'
};
exports.REVISION_CHANGES = REVISION_CHANGES;
var isArray = Utils.isArray,
    isFunction = Utils.isFunction,
    toString = Utils.toString,
    objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials) {
  this.helpers = helpers || {};
  this.partials = partials || {};

  registerDefaultHelpers(this);
}

exports.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: logger,
  log: log,

  registerHelper: function(name, fn, inverse) {
    if (toString.call(name) === objectType) {
      if (inverse || fn) { throw new Exception('Arg not supported with multiple helpers'); }
      Utils.extend(this.helpers, name);
    } else {
      if (inverse) { fn.not = inverse; }
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function(name) {
    delete this.helpers[name];
  },

  registerPartial: function(name, str) {
    if (toString.call(name) === objectType) {
      Utils.extend(this.partials,  name);
    } else {
      this.partials[name] = str;
    }
  },
  unregisterPartial: function(name) {
    delete this.partials[name];
  }
};

function registerDefaultHelpers(instance) {
  instance.registerHelper('helperMissing', function(/* [args, ]options */) {
    if(arguments.length === 1) {
      // A missing field in a {{foo}} constuct.
      return undefined;
    } else {
      // Someone is actually trying to call something, blow up.
      throw new Exception("Missing helper: '" + arguments[arguments.length-1].name + "'");
    }
  });

  instance.registerHelper('blockHelperMissing', function(context, options) {
    var inverse = options.inverse || function() {}, fn = options.fn;

    if (isFunction(context)) { context = context.call(this); }

    if(context === true) {
      return fn(this);
    } else if(context === false || context == null) {
      return inverse(this);
    } else if (isArray(context)) {
      if(context.length > 0) {
        if (options.ids) {
          options.ids = [options.name];
        }

        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      if (options.data && options.ids) {
        var data = createFrame(options.data);
        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.name);
        options = {data: data};
      }

      return fn(context, options);
    }
  });

  instance.registerHelper('each', function(context, options) {
    // Allow for {{#each}}
    if (!options) {
      options = context;
      context = this;
    }

    var fn = options.fn, inverse = options.inverse;
    var i = 0, ret = "", data;

    var contextPath;
    if (options.data && options.ids) {
      contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }

    if (isFunction(context)) { context = context.call(this); }

    if (options.data) {
      data = createFrame(options.data);
    }

    if(context && typeof context === 'object') {
      if (isArray(context)) {
        for(var j = context.length; i<j; i++) {
          if (data) {
            data.index = i;
            data.first = (i === 0);
            data.last  = (i === (context.length-1));

            if (contextPath) {
              data.contextPath = contextPath + i;
            }
          }
          ret = ret + fn(context[i], { data: data });
        }
      } else {
        for(var key in context) {
          if(context.hasOwnProperty(key)) {
            if(data) {
              data.key = key;
              data.index = i;
              data.first = (i === 0);

              if (contextPath) {
                data.contextPath = contextPath + key;
              }
            }
            ret = ret + fn(context[key], {data: data});
            i++;
          }
        }
      }
    }

    if(i === 0){
      ret = inverse(this);
    }

    return ret;
  });

  instance.registerHelper('if', function(conditional, options) {
    if (isFunction(conditional)) { conditional = conditional.call(this); }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function(conditional, options) {
    return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
  });

  instance.registerHelper('with', function(context, options) {
    if (isFunction(context)) { context = context.call(this); }

    var fn = options.fn;

    if (!Utils.isEmpty(context)) {
      if (options.data && options.ids) {
        var data = createFrame(options.data);
        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]);
        options = {data:data};
      }

      return fn(context, options);
    }
  });

  instance.registerHelper('log', function(context, options) {
    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
    instance.log(level, context);
  });

  instance.registerHelper('lookup', function(obj, field, options) {
    return obj && obj[field];
  });
}

var logger = {
  methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

  // State enum
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  level: 3,

  // can be overridden in the host environment
  log: function(level, obj) {
    if (logger.level <= level) {
      var method = logger.methodMap[level];
      if (typeof console !== 'undefined' && console[method]) {
        console[method].call(console, obj);
      }
    }
  }
};
exports.logger = logger;
function log(level, obj) { logger.log(level, obj); }

exports.log = log;var createFrame = function(object) {
  var frame = Utils.extend({}, object);
  frame._parent = object;
  return frame;
};
exports.createFrame = createFrame;
},{"./exception":29,"./utils":32}],22:[function(require,module,exports){
"use strict";
var Exception = require("../exception")["default"];

function LocationInfo(locInfo){
  locInfo = locInfo || {};
  this.firstLine   = locInfo.first_line;
  this.firstColumn = locInfo.first_column;
  this.lastColumn  = locInfo.last_column;
  this.lastLine    = locInfo.last_line;
}

var AST = {
  ProgramNode: function(statements, inverseStrip, inverse, locInfo) {
    var inverseLocationInfo, firstInverseNode;
    if (arguments.length === 3) {
      locInfo = inverse;
      inverse = null;
    } else if (arguments.length === 2) {
      locInfo = inverseStrip;
      inverseStrip = null;
    }

    LocationInfo.call(this, locInfo);
    this.type = "program";
    this.statements = statements;
    this.strip = {};

    if(inverse) {
      firstInverseNode = inverse[0];
      if (firstInverseNode) {
        inverseLocationInfo = {
          first_line: firstInverseNode.firstLine,
          last_line: firstInverseNode.lastLine,
          last_column: firstInverseNode.lastColumn,
          first_column: firstInverseNode.firstColumn
        };
        this.inverse = new AST.ProgramNode(inverse, inverseStrip, inverseLocationInfo);
      } else {
        this.inverse = new AST.ProgramNode(inverse, inverseStrip);
      }
      this.strip.right = inverseStrip.left;
    } else if (inverseStrip) {
      this.strip.left = inverseStrip.right;
    }
  },

  MustacheNode: function(rawParams, hash, open, strip, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type = "mustache";
    this.strip = strip;

    // Open may be a string parsed from the parser or a passed boolean flag
    if (open != null && open.charAt) {
      // Must use charAt to support IE pre-10
      var escapeFlag = open.charAt(3) || open.charAt(2);
      this.escaped = escapeFlag !== '{' && escapeFlag !== '&';
    } else {
      this.escaped = !!open;
    }

    if (rawParams instanceof AST.SexprNode) {
      this.sexpr = rawParams;
    } else {
      // Support old AST API
      this.sexpr = new AST.SexprNode(rawParams, hash);
    }

    this.sexpr.isRoot = true;

    // Support old AST API that stored this info in MustacheNode
    this.id = this.sexpr.id;
    this.params = this.sexpr.params;
    this.hash = this.sexpr.hash;
    this.eligibleHelper = this.sexpr.eligibleHelper;
    this.isHelper = this.sexpr.isHelper;
  },

  SexprNode: function(rawParams, hash, locInfo) {
    LocationInfo.call(this, locInfo);

    this.type = "sexpr";
    this.hash = hash;

    var id = this.id = rawParams[0];
    var params = this.params = rawParams.slice(1);

    // a mustache is definitely a helper if:
    // * it is an eligible helper, and
    // * it has at least one parameter or hash segment
    this.isHelper = !!(params.length || hash);

    // a mustache is an eligible helper if:
    // * its id is simple (a single part, not `this` or `..`)
    this.eligibleHelper = this.isHelper || id.isSimple;

    // if a mustache is an eligible helper but not a definite
    // helper, it is ambiguous, and will be resolved in a later
    // pass or at runtime.
  },

  PartialNode: function(partialName, context, hash, strip, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type         = "partial";
    this.partialName  = partialName;
    this.context      = context;
    this.hash = hash;
    this.strip = strip;
  },

  BlockNode: function(mustache, program, inverse, close, locInfo) {
    LocationInfo.call(this, locInfo);

    if(mustache.sexpr.id.original !== close.path.original) {
      throw new Exception(mustache.sexpr.id.original + " doesn't match " + close.path.original, this);
    }

    this.type = 'block';
    this.mustache = mustache;
    this.program  = program;
    this.inverse  = inverse;

    this.strip = {
      left: mustache.strip.left,
      right: close.strip.right
    };

    (program || inverse).strip.left = mustache.strip.right;
    (inverse || program).strip.right = close.strip.left;

    if (inverse && !program) {
      this.isInverse = true;
    }
  },

  RawBlockNode: function(mustache, content, close, locInfo) {
    LocationInfo.call(this, locInfo);

    if (mustache.sexpr.id.original !== close) {
      throw new Exception(mustache.sexpr.id.original + " doesn't match " + close, this);
    }

    content = new AST.ContentNode(content, locInfo);

    this.type = 'block';
    this.mustache = mustache;
    this.program = new AST.ProgramNode([content], locInfo);
  },

  ContentNode: function(string, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type = "content";
    this.string = string;
  },

  HashNode: function(pairs, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type = "hash";
    this.pairs = pairs;
  },

  IdNode: function(parts, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type = "ID";

    var original = "",
        dig = [],
        depth = 0,
        depthString = '';

    for(var i=0,l=parts.length; i<l; i++) {
      var part = parts[i].part;
      original += (parts[i].separator || '') + part;

      if (part === ".." || part === "." || part === "this") {
        if (dig.length > 0) {
          throw new Exception("Invalid path: " + original, this);
        } else if (part === "..") {
          depth++;
          depthString += '../';
        } else {
          this.isScoped = true;
        }
      } else {
        dig.push(part);
      }
    }

    this.original = original;
    this.parts    = dig;
    this.string   = dig.join('.');
    this.depth    = depth;
    this.idName   = depthString + this.string;

    // an ID is simple if it only has one part, and that part is not
    // `..` or `this`.
    this.isSimple = parts.length === 1 && !this.isScoped && depth === 0;

    this.stringModeValue = this.string;
  },

  PartialNameNode: function(name, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type = "PARTIAL_NAME";
    this.name = name.original;
  },

  DataNode: function(id, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type = "DATA";
    this.id = id;
    this.stringModeValue = id.stringModeValue;
    this.idName = '@' + id.stringModeValue;
  },

  StringNode: function(string, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type = "STRING";
    this.original =
      this.string =
      this.stringModeValue = string;
  },

  NumberNode: function(number, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type = "NUMBER";
    this.original =
      this.number = number;
    this.stringModeValue = Number(number);
  },

  BooleanNode: function(bool, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type = "BOOLEAN";
    this.bool = bool;
    this.stringModeValue = bool === "true";
  },

  CommentNode: function(comment, locInfo) {
    LocationInfo.call(this, locInfo);
    this.type = "comment";
    this.comment = comment;
  }
};

// Must be exported as an object rather than the root of the module as the jison lexer
// most modify the object to operate properly.
exports["default"] = AST;
},{"../exception":29}],23:[function(require,module,exports){
"use strict";
var parser = require("./parser")["default"];
var AST = require("./ast")["default"];

exports.parser = parser;

function parse(input) {
  // Just return if an already-compile AST was passed in.
  if(input.constructor === AST.ProgramNode) { return input; }

  parser.yy = AST;
  return parser.parse(input);
}

exports.parse = parse;
},{"./ast":22,"./parser":26}],24:[function(require,module,exports){
"use strict";
var Exception = require("../exception")["default"];

function Compiler() {}

exports.Compiler = Compiler;// the foundHelper register will disambiguate helper lookup from finding a
// function in a context. This is necessary for mustache compatibility, which
// requires that context functions in blocks are evaluated by blockHelperMissing,
// and then proceed as if the resulting value was provided to blockHelperMissing.

Compiler.prototype = {
  compiler: Compiler,

  disassemble: function() {
    var opcodes = this.opcodes, opcode, out = [], params, param;

    for (var i=0, l=opcodes.length; i<l; i++) {
      opcode = opcodes[i];

      if (opcode.opcode === 'DECLARE') {
        out.push("DECLARE " + opcode.name + "=" + opcode.value);
      } else {
        params = [];
        for (var j=0; j<opcode.args.length; j++) {
          param = opcode.args[j];
          if (typeof param === "string") {
            param = "\"" + param.replace("\n", "\\n") + "\"";
          }
          params.push(param);
        }
        out.push(opcode.opcode + " " + params.join(" "));
      }
    }

    return out.join("\n");
  },

  equals: function(other) {
    var len = this.opcodes.length;
    if (other.opcodes.length !== len) {
      return false;
    }

    for (var i = 0; i < len; i++) {
      var opcode = this.opcodes[i],
          otherOpcode = other.opcodes[i];
      if (opcode.opcode !== otherOpcode.opcode || opcode.args.length !== otherOpcode.args.length) {
        return false;
      }
      for (var j = 0; j < opcode.args.length; j++) {
        if (opcode.args[j] !== otherOpcode.args[j]) {
          return false;
        }
      }
    }

    len = this.children.length;
    if (other.children.length !== len) {
      return false;
    }
    for (i = 0; i < len; i++) {
      if (!this.children[i].equals(other.children[i])) {
        return false;
      }
    }

    return true;
  },

  guid: 0,

  compile: function(program, options) {
    this.opcodes = [];
    this.children = [];
    this.depths = {list: []};
    this.options = options;
    this.stringParams = options.stringParams;
    this.trackIds = options.trackIds;

    // These changes will propagate to the other compiler components
    var knownHelpers = this.options.knownHelpers;
    this.options.knownHelpers = {
      'helperMissing': true,
      'blockHelperMissing': true,
      'each': true,
      'if': true,
      'unless': true,
      'with': true,
      'log': true,
      'lookup': true
    };
    if (knownHelpers) {
      for (var name in knownHelpers) {
        this.options.knownHelpers[name] = knownHelpers[name];
      }
    }

    return this.accept(program);
  },

  accept: function(node) {
    var strip = node.strip || {},
        ret;
    if (strip.left) {
      this.opcode('strip');
    }

    ret = this[node.type](node);

    if (strip.right) {
      this.opcode('strip');
    }

    return ret;
  },

  program: function(program) {
    var statements = program.statements;

    for(var i=0, l=statements.length; i<l; i++) {
      this.accept(statements[i]);
    }
    this.isSimple = l === 1;

    this.depths.list = this.depths.list.sort(function(a, b) {
      return a - b;
    });

    return this;
  },

  compileProgram: function(program) {
    var result = new this.compiler().compile(program, this.options);
    var guid = this.guid++, depth;

    this.usePartial = this.usePartial || result.usePartial;

    this.children[guid] = result;

    for(var i=0, l=result.depths.list.length; i<l; i++) {
      depth = result.depths.list[i];

      if(depth < 2) { continue; }
      else { this.addDepth(depth - 1); }
    }

    return guid;
  },

  block: function(block) {
    var mustache = block.mustache,
        program = block.program,
        inverse = block.inverse;

    if (program) {
      program = this.compileProgram(program);
    }

    if (inverse) {
      inverse = this.compileProgram(inverse);
    }

    var sexpr = mustache.sexpr;
    var type = this.classifySexpr(sexpr);

    if (type === "helper") {
      this.helperSexpr(sexpr, program, inverse);
    } else if (type === "simple") {
      this.simpleSexpr(sexpr);

      // now that the simple mustache is resolved, we need to
      // evaluate it by executing `blockHelperMissing`
      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);
      this.opcode('emptyHash');
      this.opcode('blockValue', sexpr.id.original);
    } else {
      this.ambiguousSexpr(sexpr, program, inverse);

      // now that the simple mustache is resolved, we need to
      // evaluate it by executing `blockHelperMissing`
      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);
      this.opcode('emptyHash');
      this.opcode('ambiguousBlockValue');
    }

    this.opcode('append');
  },

  hash: function(hash) {
    var pairs = hash.pairs, i, l;

    this.opcode('pushHash');

    for(i=0, l=pairs.length; i<l; i++) {
      this.pushParam(pairs[i][1]);
    }
    while(i--) {
      this.opcode('assignToHash', pairs[i][0]);
    }
    this.opcode('popHash');
  },

  partial: function(partial) {
    var partialName = partial.partialName;
    this.usePartial = true;

    if (partial.hash) {
      this.accept(partial.hash);
    } else {
      this.opcode('push', 'undefined');
    }

    if (partial.context) {
      this.accept(partial.context);
    } else {
      this.opcode('push', 'depth0');
    }

    this.opcode('invokePartial', partialName.name);
    this.opcode('append');
  },

  content: function(content) {
    this.opcode('appendContent', content.string);
  },

  mustache: function(mustache) {
    this.sexpr(mustache.sexpr);

    if(mustache.escaped && !this.options.noEscape) {
      this.opcode('appendEscaped');
    } else {
      this.opcode('append');
    }
  },

  ambiguousSexpr: function(sexpr, program, inverse) {
    var id = sexpr.id,
        name = id.parts[0],
        isBlock = program != null || inverse != null;

    this.opcode('getContext', id.depth);

    this.opcode('pushProgram', program);
    this.opcode('pushProgram', inverse);

    this.opcode('invokeAmbiguous', name, isBlock);
  },

  simpleSexpr: function(sexpr) {
    var id = sexpr.id;

    if (id.type === 'DATA') {
      this.DATA(id);
    } else if (id.parts.length) {
      this.ID(id);
    } else {
      // Simplified ID for `this`
      this.addDepth(id.depth);
      this.opcode('getContext', id.depth);
      this.opcode('pushContext');
    }

    this.opcode('resolvePossibleLambda');
  },

  helperSexpr: function(sexpr, program, inverse) {
    var params = this.setupFullMustacheParams(sexpr, program, inverse),
        id = sexpr.id,
        name = id.parts[0];

    if (this.options.knownHelpers[name]) {
      this.opcode('invokeKnownHelper', params.length, name);
    } else if (this.options.knownHelpersOnly) {
      throw new Exception("You specified knownHelpersOnly, but used the unknown helper " + name, sexpr);
    } else {
      this.ID(id);
      this.opcode('invokeHelper', params.length, id.original, sexpr.isRoot);
    }
  },

  sexpr: function(sexpr) {
    var type = this.classifySexpr(sexpr);

    if (type === "simple") {
      this.simpleSexpr(sexpr);
    } else if (type === "helper") {
      this.helperSexpr(sexpr);
    } else {
      this.ambiguousSexpr(sexpr);
    }
  },

  ID: function(id) {
    this.addDepth(id.depth);
    this.opcode('getContext', id.depth);

    var name = id.parts[0];
    if (!name) {
      this.opcode('pushContext');
    } else {
      this.opcode('lookupOnContext', id.parts[0]);
    }

    for(var i=1, l=id.parts.length; i<l; i++) {
      this.opcode('lookup', id.parts[i]);
    }
  },

  DATA: function(data) {
    this.options.data = true;
    this.opcode('lookupData', data.id.depth);
    var parts = data.id.parts;
    for(var i=0, l=parts.length; i<l; i++) {
      this.opcode('lookup', parts[i]);
    }
  },

  STRING: function(string) {
    this.opcode('pushString', string.string);
  },

  NUMBER: function(number) {
    this.opcode('pushLiteral', number.number);
  },

  BOOLEAN: function(bool) {
    this.opcode('pushLiteral', bool.bool);
  },

  comment: function() {},

  // HELPERS
  opcode: function(name) {
    this.opcodes.push({ opcode: name, args: [].slice.call(arguments, 1) });
  },

  declare: function(name, value) {
    this.opcodes.push({ opcode: 'DECLARE', name: name, value: value });
  },

  addDepth: function(depth) {
    if(depth === 0) { return; }

    if(!this.depths[depth]) {
      this.depths[depth] = true;
      this.depths.list.push(depth);
    }
  },

  classifySexpr: function(sexpr) {
    var isHelper   = sexpr.isHelper;
    var isEligible = sexpr.eligibleHelper;
    var options    = this.options;

    // if ambiguous, we can possibly resolve the ambiguity now
    // An eligible helper is one that does not have a complex path, i.e. `this.foo`, `../foo` etc.
    if (isEligible && !isHelper) {
      var name = sexpr.id.parts[0];

      if (options.knownHelpers[name]) {
        isHelper = true;
      } else if (options.knownHelpersOnly) {
        isEligible = false;
      }
    }

    if (isHelper) { return "helper"; }
    else if (isEligible) { return "ambiguous"; }
    else { return "simple"; }
  },

  pushParams: function(params) {
    for(var i=0, l=params.length; i<l; i++) {
      this.pushParam(params[i]);
    }
  },

  pushParam: function(val) {
    if (this.stringParams) {
      if(val.depth) {
        this.addDepth(val.depth);
      }
      this.opcode('getContext', val.depth || 0);
      this.opcode('pushStringParam', val.stringModeValue, val.type);

      if (val.type === 'sexpr') {
        // Subexpressions get evaluated and passed in
        // in string params mode.
        this.sexpr(val);
      }
    } else {
      if (this.trackIds) {
        this.opcode('pushId', val.type, val.idName || val.stringModeValue);
      }
      this.accept(val);
    }
  },

  setupFullMustacheParams: function(sexpr, program, inverse) {
    var params = sexpr.params;
    this.pushParams(params);

    this.opcode('pushProgram', program);
    this.opcode('pushProgram', inverse);

    if (sexpr.hash) {
      this.hash(sexpr.hash);
    } else {
      this.opcode('emptyHash');
    }

    return params;
  }
};

function precompile(input, options, env) {
  if (input == null || (typeof input !== 'string' && input.constructor !== env.AST.ProgramNode)) {
    throw new Exception("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + input);
  }

  options = options || {};
  if (!('data' in options)) {
    options.data = true;
  }

  var ast = env.parse(input);
  var environment = new env.Compiler().compile(ast, options);
  return new env.JavaScriptCompiler().compile(environment, options);
}

exports.precompile = precompile;function compile(input, options, env) {
  if (input == null || (typeof input !== 'string' && input.constructor !== env.AST.ProgramNode)) {
    throw new Exception("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + input);
  }

  options = options || {};

  if (!('data' in options)) {
    options.data = true;
  }

  var compiled;

  function compileInput() {
    var ast = env.parse(input);
    var environment = new env.Compiler().compile(ast, options);
    var templateSpec = new env.JavaScriptCompiler().compile(environment, options, undefined, true);
    return env.template(templateSpec);
  }

  // Template is only compiled on first use and cached after that point.
  var ret = function(context, options) {
    if (!compiled) {
      compiled = compileInput();
    }
    return compiled.call(this, context, options);
  };
  ret._setup = function(options) {
    if (!compiled) {
      compiled = compileInput();
    }
    return compiled._setup(options);
  };
  ret._child = function(i) {
    if (!compiled) {
      compiled = compileInput();
    }
    return compiled._child(i);
  };
  return ret;
}

exports.compile = compile;
},{"../exception":29}],25:[function(require,module,exports){
"use strict";
var COMPILER_REVISION = require("../base").COMPILER_REVISION;
var REVISION_CHANGES = require("../base").REVISION_CHANGES;
var log = require("../base").log;
var Exception = require("../exception")["default"];

function Literal(value) {
  this.value = value;
}

function JavaScriptCompiler() {}

JavaScriptCompiler.prototype = {
  // PUBLIC API: You can override these methods in a subclass to provide
  // alternative compiled forms for name lookup and buffering semantics
  nameLookup: function(parent, name /* , type*/) {
    var wrap,
        ret;
    if (parent.indexOf('depth') === 0) {
      wrap = true;
    }

    if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
      ret = parent + "." + name;
    } else {
      ret = parent + "['" + name + "']";
    }

    if (wrap) {
      return '(' + parent + ' && ' + ret + ')';
    } else {
      return ret;
    }
  },

  compilerInfo: function() {
    var revision = COMPILER_REVISION,
        versions = REVISION_CHANGES[revision];
    return [revision, versions];
  },

  appendToBuffer: function(string) {
    if (this.environment.isSimple) {
      return "return " + string + ";";
    } else {
      return {
        appendToBuffer: true,
        content: string,
        toString: function() { return "buffer += " + string + ";"; }
      };
    }
  },

  initializeBuffer: function() {
    return this.quotedString("");
  },

  namespace: "Handlebars",
  // END PUBLIC API

  compile: function(environment, options, context, asObject) {
    this.environment = environment;
    this.options = options || {};
    this.stringParams = this.options.stringParams;
    this.trackIds = this.options.trackIds;
    this.precompile = !asObject;

    log('debug', this.environment.disassemble() + "\n\n");

    this.name = this.environment.name;
    this.isChild = !!context;
    this.context = context || {
      programs: [],
      environments: []
    };

    this.preamble();

    this.stackSlot = 0;
    this.stackVars = [];
    this.aliases = {};
    this.registers = { list: [] };
    this.hashes = [];
    this.compileStack = [];
    this.inlineStack = [];

    this.compileChildren(environment, options);

    var opcodes = environment.opcodes,
        opcode,
        i,
        l;

    for (i = 0, l = opcodes.length; i < l; i++) {
      opcode = opcodes[i];

      if(opcode.opcode === 'DECLARE') {
        this[opcode.name] = opcode.value;
      } else {
        this[opcode.opcode].apply(this, opcode.args);
      }

      // Reset the stripNext flag if it was not set by this operation.
      if (opcode.opcode !== this.stripNext) {
        this.stripNext = false;
      }
    }

    // Flush any trailing content that might be pending.
    this.pushSource('');

    if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
      throw new Exception('Compile completed with content left on stack');
    }

    var fn = this.createFunctionContext(asObject);
    if (!this.isChild) {
      var ret = {
        compiler: this.compilerInfo(),
        main: fn
      };
      var programs = this.context.programs;
      for (i = 0, l = programs.length; i < l; i++) {
        if (programs[i]) {
          ret[i] = programs[i];
        }
      }

      if (this.environment.usePartial) {
        ret.usePartial = true;
      }
      if (this.options.data) {
        ret.useData = true;
      }

      if (!asObject) {
        ret.compiler = JSON.stringify(ret.compiler);
        ret = this.objectLiteral(ret);
      }

      return ret;
    } else {
      return fn;
    }
  },

  preamble: function() {
    // track the last context pushed into place to allow skipping the
    // getContext opcode when it would be a noop
    this.lastContext = 0;
    this.source = [];
  },

  createFunctionContext: function(asObject) {
    var varDeclarations = '';

    var locals = this.stackVars.concat(this.registers.list);
    if(locals.length > 0) {
      varDeclarations += ", " + locals.join(", ");
    }

    // Generate minimizer alias mappings
    for (var alias in this.aliases) {
      if (this.aliases.hasOwnProperty(alias)) {
        varDeclarations += ', ' + alias + '=' + this.aliases[alias];
      }
    }

    var params = ["depth0", "helpers", "partials", "data"];

    for(var i=0, l=this.environment.depths.list.length; i<l; i++) {
      params.push("depth" + this.environment.depths.list[i]);
    }

    // Perform a second pass over the output to merge content when possible
    var source = this.mergeSource(varDeclarations);

    if (asObject) {
      params.push(source);

      return Function.apply(this, params);
    } else {
      return 'function(' + params.join(',') + ') {\n  ' + source + '}';
    }
  },
  mergeSource: function(varDeclarations) {
    var source = '',
        buffer,
        appendOnly = !this.forceBuffer,
        appendFirst;

    for (var i = 0, len = this.source.length; i < len; i++) {
      var line = this.source[i];
      if (line.appendToBuffer) {
        if (buffer) {
          buffer = buffer + '\n    + ' + line.content;
        } else {
          buffer = line.content;
        }
      } else {
        if (buffer) {
          if (!source) {
            appendFirst = true;
            source = buffer + ';\n  ';
          } else {
            source += 'buffer += ' + buffer + ';\n  ';
          }
          buffer = undefined;
        }
        source += line + '\n  ';

        if (!this.environment.isSimple) {
          appendOnly = false;
        }
      }
    }

    if (appendOnly) {
      if (buffer || !source) {
        source += 'return ' + (buffer || '""') + ';\n';
      }
    } else {
      varDeclarations += ", buffer = " + (appendFirst ? '' : this.initializeBuffer());
      if (buffer) {
        source += 'return buffer + ' + buffer + ';\n';
      } else {
        source += 'return buffer;\n';
      }
    }

    if (varDeclarations) {
      source = 'var ' + varDeclarations.substring(2) + (appendFirst ? '' : ';\n  ') + source;
    }

    return source;
  },

  // [blockValue]
  //
  // On stack, before: hash, inverse, program, value
  // On stack, after: return value of blockHelperMissing
  //
  // The purpose of this opcode is to take a block of the form
  // `{{#this.foo}}...{{/this.foo}}`, resolve the value of `foo`, and
  // replace it on the stack with the result of properly
  // invoking blockHelperMissing.
  blockValue: function(name) {
    this.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

    var params = ["depth0"];
    this.setupParams(name, 0, params);

    this.replaceStack(function(current) {
      params.splice(1, 0, current);
      return "blockHelperMissing.call(" + params.join(", ") + ")";
    });
  },

  // [ambiguousBlockValue]
  //
  // On stack, before: hash, inverse, program, value
  // Compiler value, before: lastHelper=value of last found helper, if any
  // On stack, after, if no lastHelper: same as [blockValue]
  // On stack, after, if lastHelper: value
  ambiguousBlockValue: function() {
    this.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

    // We're being a bit cheeky and reusing the options value from the prior exec
    var params = ["depth0"];
    this.setupParams('', 0, params, true);

    this.flushInline();

    var current = this.topStack();
    params.splice(1, 0, current);

    this.pushSource("if (!" + this.lastHelper + ") { " + current + " = blockHelperMissing.call(" + params.join(", ") + "); }");
  },

  // [appendContent]
  //
  // On stack, before: ...
  // On stack, after: ...
  //
  // Appends the string value of `content` to the current buffer
  appendContent: function(content) {
    if (this.pendingContent) {
      content = this.pendingContent + content;
    }
    if (this.stripNext) {
      content = content.replace(/^\s+/, '');
    }

    this.pendingContent = content;
  },

  // [strip]
  //
  // On stack, before: ...
  // On stack, after: ...
  //
  // Removes any trailing whitespace from the prior content node and flags
  // the next operation for stripping if it is a content node.
  strip: function() {
    if (this.pendingContent) {
      this.pendingContent = this.pendingContent.replace(/\s+$/, '');
    }
    this.stripNext = 'strip';
  },

  // [append]
  //
  // On stack, before: value, ...
  // On stack, after: ...
  //
  // Coerces `value` to a String and appends it to the current buffer.
  //
  // If `value` is truthy, or 0, it is coerced into a string and appended
  // Otherwise, the empty string is appended
  append: function() {
    // Force anything that is inlined onto the stack so we don't have duplication
    // when we examine local
    this.flushInline();
    var local = this.popStack();
    this.pushSource("if(" + local + " || " + local + " === 0) { " + this.appendToBuffer(local) + " }");
    if (this.environment.isSimple) {
      this.pushSource("else { " + this.appendToBuffer("''") + " }");
    }
  },

  // [appendEscaped]
  //
  // On stack, before: value, ...
  // On stack, after: ...
  //
  // Escape `value` and append it to the buffer
  appendEscaped: function() {
    this.aliases.escapeExpression = 'this.escapeExpression';

    this.pushSource(this.appendToBuffer("escapeExpression(" + this.popStack() + ")"));
  },

  // [getContext]
  //
  // On stack, before: ...
  // On stack, after: ...
  // Compiler value, after: lastContext=depth
  //
  // Set the value of the `lastContext` compiler value to the depth
  getContext: function(depth) {
    if(this.lastContext !== depth) {
      this.lastContext = depth;
    }
  },

  // [lookupOnContext]
  //
  // On stack, before: ...
  // On stack, after: currentContext[name], ...
  //
  // Looks up the value of `name` on the current context and pushes
  // it onto the stack.
  lookupOnContext: function(name) {
    this.push(this.nameLookup('depth' + this.lastContext, name, 'context'));
  },

  // [pushContext]
  //
  // On stack, before: ...
  // On stack, after: currentContext, ...
  //
  // Pushes the value of the current context onto the stack.
  pushContext: function() {
    this.pushStackLiteral('depth' + this.lastContext);
  },

  // [resolvePossibleLambda]
  //
  // On stack, before: value, ...
  // On stack, after: resolved value, ...
  //
  // If the `value` is a lambda, replace it on the stack by
  // the return value of the lambda
  resolvePossibleLambda: function() {
    this.aliases.functionType = '"function"';

    this.replaceStack(function(current) {
      return "typeof " + current + " === functionType ? " + current + ".apply(depth0) : " + current;
    });
  },

  // [lookup]
  //
  // On stack, before: value, ...
  // On stack, after: value[name], ...
  //
  // Replace the value on the stack with the result of looking
  // up `name` on `value`
  lookup: function(name) {
    this.replaceStack(function(current) {
      return current + " == null || " + current + " === false ? " + current + " : " + this.nameLookup(current, name, 'context');
    });
  },

  // [lookupData]
  //
  // On stack, before: ...
  // On stack, after: data, ...
  //
  // Push the data lookup operator
  lookupData: function(depth) {
    if (!depth) {
      this.pushStackLiteral('data');
    } else {
      this.pushStackLiteral('this.data(data, ' + depth + ')');
    }
  },

  // [pushStringParam]
  //
  // On stack, before: ...
  // On stack, after: string, currentContext, ...
  //
  // This opcode is designed for use in string mode, which
  // provides the string value of a parameter along with its
  // depth rather than resolving it immediately.
  pushStringParam: function(string, type) {
    this.pushStackLiteral('depth' + this.lastContext);

    this.pushString(type);

    // If it's a subexpression, the string result
    // will be pushed after this opcode.
    if (type !== 'sexpr') {
      if (typeof string === 'string') {
        this.pushString(string);
      } else {
        this.pushStackLiteral(string);
      }
    }
  },

  emptyHash: function() {
    this.pushStackLiteral('{}');

    if (this.trackIds) {
      this.push('{}'); // hashIds
    }
    if (this.stringParams) {
      this.push('{}'); // hashContexts
      this.push('{}'); // hashTypes
    }
  },
  pushHash: function() {
    if (this.hash) {
      this.hashes.push(this.hash);
    }
    this.hash = {values: [], types: [], contexts: [], ids: []};
  },
  popHash: function() {
    var hash = this.hash;
    this.hash = this.hashes.pop();

    if (this.trackIds) {
      this.push('{' + hash.ids.join(',') + '}');
    }
    if (this.stringParams) {
      this.push('{' + hash.contexts.join(',') + '}');
      this.push('{' + hash.types.join(',') + '}');
    }

    this.push('{\n    ' + hash.values.join(',\n    ') + '\n  }');
  },

  // [pushString]
  //
  // On stack, before: ...
  // On stack, after: quotedString(string), ...
  //
  // Push a quoted version of `string` onto the stack
  pushString: function(string) {
    this.pushStackLiteral(this.quotedString(string));
  },

  // [push]
  //
  // On stack, before: ...
  // On stack, after: expr, ...
  //
  // Push an expression onto the stack
  push: function(expr) {
    this.inlineStack.push(expr);
    return expr;
  },

  // [pushLiteral]
  //
  // On stack, before: ...
  // On stack, after: value, ...
  //
  // Pushes a value onto the stack. This operation prevents
  // the compiler from creating a temporary variable to hold
  // it.
  pushLiteral: function(value) {
    this.pushStackLiteral(value);
  },

  // [pushProgram]
  //
  // On stack, before: ...
  // On stack, after: program(guid), ...
  //
  // Push a program expression onto the stack. This takes
  // a compile-time guid and converts it into a runtime-accessible
  // expression.
  pushProgram: function(guid) {
    if (guid != null) {
      this.pushStackLiteral(this.programExpression(guid));
    } else {
      this.pushStackLiteral(null);
    }
  },

  // [invokeHelper]
  //
  // On stack, before: hash, inverse, program, params..., ...
  // On stack, after: result of helper invocation
  //
  // Pops off the helper's parameters, invokes the helper,
  // and pushes the helper's return value onto the stack.
  //
  // If the helper is not found, `helperMissing` is called.
  invokeHelper: function(paramSize, name, isRoot) {
    this.aliases.helperMissing = 'helpers.helperMissing';
    this.useRegister('helper');

    var nonHelper = this.popStack();
    var helper = this.setupHelper(paramSize, name);

    var lookup = 'helper = ' + helper.name + ' || ' + nonHelper + ' || helperMissing';
    if (helper.paramsInit) {
      lookup += ',' + helper.paramsInit;
    }

    this.push('(' + lookup + ',helper.call(' + helper.callParams + '))');

    // Always flush subexpressions. This is both to prevent the compounding size issue that
    // occurs when the code has to be duplicated for inlining and also to prevent errors
    // due to the incorrect options object being passed due to the shared register.
    if (!isRoot) {
      this.flushInline();
    }
  },

  // [invokeKnownHelper]
  //
  // On stack, before: hash, inverse, program, params..., ...
  // On stack, after: result of helper invocation
  //
  // This operation is used when the helper is known to exist,
  // so a `helperMissing` fallback is not required.
  invokeKnownHelper: function(paramSize, name) {
    var helper = this.setupHelper(paramSize, name);
    this.push(helper.name + ".call(" + helper.callParams + ")");
  },

  // [invokeAmbiguous]
  //
  // On stack, before: hash, inverse, program, params..., ...
  // On stack, after: result of disambiguation
  //
  // This operation is used when an expression like `{{foo}}`
  // is provided, but we don't know at compile-time whether it
  // is a helper or a path.
  //
  // This operation emits more code than the other options,
  // and can be avoided by passing the `knownHelpers` and
  // `knownHelpersOnly` flags at compile-time.
  invokeAmbiguous: function(name, helperCall) {
    this.aliases.functionType = '"function"';
    this.useRegister('helper');

    this.emptyHash();
    var helper = this.setupHelper(0, name, helperCall);

    var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');
    var nonHelper = this.nameLookup('depth' + this.lastContext, name, 'context');

    this.push(
      '((helper = ' + helperName + ' || ' + nonHelper
        + (helper.paramsInit ? '),(' + helper.paramsInit : '') + '),'
      + '(typeof helper === functionType ? helper.call(' + helper.callParams + ') : helper))');
  },

  // [invokePartial]
  //
  // On stack, before: context, ...
  // On stack after: result of partial invocation
  //
  // This operation pops off a context, invokes a partial with that context,
  // and pushes the result of the invocation back.
  invokePartial: function(name) {
    var params = [this.nameLookup('partials', name, 'partial'), "'" + name + "'", this.popStack(), this.popStack(), "helpers", "partials"];

    if (this.options.data) {
      params.push("data");
    }

    this.push("this.invokePartial(" + params.join(", ") + ")");
  },

  // [assignToHash]
  //
  // On stack, before: value, ..., hash, ...
  // On stack, after: ..., hash, ...
  //
  // Pops a value off the stack and assigns it to the current hash
  assignToHash: function(key) {
    var value = this.popStack(),
        context,
        type,
        id;

    if (this.trackIds) {
      id = this.popStack();
    }
    if (this.stringParams) {
      type = this.popStack();
      context = this.popStack();
    }

    var hash = this.hash;
    if (context) {
      hash.contexts.push("'" + key + "': " + context);
    }
    if (type) {
      hash.types.push("'" + key + "': " + type);
    }
    if (id) {
      hash.ids.push("'" + key + "': " + id);
    }
    hash.values.push("'" + key + "': (" + value + ")");
  },

  pushId: function(type, name) {
    if (type === 'ID' || type === 'DATA') {
      this.pushString(name);
    } else if (type === 'sexpr') {
      this.pushStackLiteral('true');
    } else {
      this.pushStackLiteral('null');
    }
  },

  // HELPERS

  compiler: JavaScriptCompiler,

  compileChildren: function(environment, options) {
    var children = environment.children, child, compiler;

    for(var i=0, l=children.length; i<l; i++) {
      child = children[i];
      compiler = new this.compiler();

      var index = this.matchExistingProgram(child);

      if (index == null) {
        this.context.programs.push('');     // Placeholder to prevent name conflicts for nested children
        index = this.context.programs.length;
        child.index = index;
        child.name = 'program' + index;
        this.context.programs[index] = compiler.compile(child, options, this.context, !this.precompile);
        this.context.environments[index] = child;
      } else {
        child.index = index;
        child.name = 'program' + index;
      }
    }
  },
  matchExistingProgram: function(child) {
    for (var i = 0, len = this.context.environments.length; i < len; i++) {
      var environment = this.context.environments[i];
      if (environment && environment.equals(child)) {
        return i;
      }
    }
  },

  programExpression: function(guid) {
    if(guid == null) {
      return 'this.noop';
    }

    var child = this.environment.children[guid],
        depths = child.depths.list, depth;

    var programParams = [child.index, 'data'];

    for(var i=0, l = depths.length; i<l; i++) {
      depth = depths[i];

      programParams.push('depth' + (depth - 1));
    }

    return (depths.length === 0 ? 'this.program(' : 'this.programWithDepth(') + programParams.join(', ') + ')';
  },

  register: function(name, val) {
    this.useRegister(name);
    this.pushSource(name + " = " + val + ";");
  },

  useRegister: function(name) {
    if(!this.registers[name]) {
      this.registers[name] = true;
      this.registers.list.push(name);
    }
  },

  pushStackLiteral: function(item) {
    return this.push(new Literal(item));
  },

  pushSource: function(source) {
    if (this.pendingContent) {
      this.source.push(this.appendToBuffer(this.quotedString(this.pendingContent)));
      this.pendingContent = undefined;
    }

    if (source) {
      this.source.push(source);
    }
  },

  pushStack: function(item) {
    this.flushInline();

    var stack = this.incrStack();
    if (item) {
      this.pushSource(stack + " = " + item + ";");
    }
    this.compileStack.push(stack);
    return stack;
  },

  replaceStack: function(callback) {
    var prefix = '',
        inline = this.isInline(),
        stack,
        createdStack,
        usedLiteral;

    // If we are currently inline then we want to merge the inline statement into the
    // replacement statement via ','
    if (inline) {
      var top = this.popStack(true);

      if (top instanceof Literal) {
        // Literals do not need to be inlined
        stack = top.value;
        usedLiteral = true;
      } else {
        // Get or create the current stack name for use by the inline
        createdStack = !this.stackSlot;
        var name = !createdStack ? this.topStackName() : this.incrStack();

        prefix = '(' + this.push(name) + ' = ' + top + '),';
        stack = this.topStack();
      }
    } else {
      stack = this.topStack();
    }

    var item = callback.call(this, stack);

    if (inline) {
      if (!usedLiteral) {
        this.popStack();
      }
      if (createdStack) {
        this.stackSlot--;
      }
      this.push('(' + prefix + item + ')');
    } else {
      // Prevent modification of the context depth variable. Through replaceStack
      if (!/^stack/.test(stack)) {
        stack = this.nextStack();
      }

      this.pushSource(stack + " = (" + prefix + item + ");");
    }
    return stack;
  },

  nextStack: function() {
    return this.pushStack();
  },

  incrStack: function() {
    this.stackSlot++;
    if(this.stackSlot > this.stackVars.length) { this.stackVars.push("stack" + this.stackSlot); }
    return this.topStackName();
  },
  topStackName: function() {
    return "stack" + this.stackSlot;
  },
  flushInline: function() {
    var inlineStack = this.inlineStack;
    if (inlineStack.length) {
      this.inlineStack = [];
      for (var i = 0, len = inlineStack.length; i < len; i++) {
        var entry = inlineStack[i];
        if (entry instanceof Literal) {
          this.compileStack.push(entry);
        } else {
          this.pushStack(entry);
        }
      }
    }
  },
  isInline: function() {
    return this.inlineStack.length;
  },

  popStack: function(wrapped) {
    var inline = this.isInline(),
        item = (inline ? this.inlineStack : this.compileStack).pop();

    if (!wrapped && (item instanceof Literal)) {
      return item.value;
    } else {
      if (!inline) {
        if (!this.stackSlot) {
          throw new Exception('Invalid stack pop');
        }
        this.stackSlot--;
      }
      return item;
    }
  },

  topStack: function(wrapped) {
    var stack = (this.isInline() ? this.inlineStack : this.compileStack),
        item = stack[stack.length - 1];

    if (!wrapped && (item instanceof Literal)) {
      return item.value;
    } else {
      return item;
    }
  },

  quotedString: function(str) {
    return '"' + str
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\u2028/g, '\\u2028')   // Per Ecma-262 7.3 + 7.8.4
      .replace(/\u2029/g, '\\u2029') + '"';
  },

  objectLiteral: function(obj) {
    var pairs = [];

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        pairs.push(this.quotedString(key) + ':' + obj[key]);
      }
    }

    return '{' + pairs.join(',') + '}';
  },

  setupHelper: function(paramSize, name, blockHelper) {
    var params = [],
        paramsInit = this.setupParams(name, paramSize, params, blockHelper);
    var foundHelper = this.nameLookup('helpers', name, 'helper');

    return {
      params: params,
      paramsInit: paramsInit,
      name: foundHelper,
      callParams: ["depth0"].concat(params).join(", ")
    };
  },

  setupOptions: function(helper, paramSize, params) {
    var options = {}, contexts = [], types = [], ids = [], param, inverse, program;

    options.name = this.quotedString(helper);
    options.hash = this.popStack();

    if (this.trackIds) {
      options.hashIds = this.popStack();
    }
    if (this.stringParams) {
      options.hashTypes = this.popStack();
      options.hashContexts = this.popStack();
    }

    inverse = this.popStack();
    program = this.popStack();

    // Avoid setting fn and inverse if neither are set. This allows
    // helpers to do a check for `if (options.fn)`
    if (program || inverse) {
      if (!program) {
        program = 'this.noop';
      }

      if (!inverse) {
        inverse = 'this.noop';
      }

      options.fn = program;
      options.inverse = inverse;
    }

    // The parameters go on to the stack in order (making sure that they are evaluated in order)
    // so we need to pop them off the stack in reverse order
    var i = paramSize;
    while (i--) {
      param = this.popStack();
      params[i] = param;

      if (this.trackIds) {
        ids[i] = this.popStack();
      }
      if (this.stringParams) {
        types[i] = this.popStack();
        contexts[i] = this.popStack();
      }
    }

    if (this.trackIds) {
      options.ids = "[" + ids.join(",") + "]";
    }
    if (this.stringParams) {
      options.types = "[" + types.join(",") + "]";
      options.contexts = "[" + contexts.join(",") + "]";
    }

    if (this.options.data) {
      options.data = "data";
    }

    return options;
  },

  // the params and contexts arguments are passed in arrays
  // to fill in
  setupParams: function(helperName, paramSize, params, useRegister) {
    var options = this.objectLiteral(this.setupOptions(helperName, paramSize, params));

    if (useRegister) {
      this.useRegister('options');
      params.push('options');
      return 'options=' + options;
    } else {
      params.push(options);
      return '';
    }
  }
};

var reservedWords = (
  "break else new var" +
  " case finally return void" +
  " catch for switch while" +
  " continue function this with" +
  " default if throw" +
  " delete in try" +
  " do instanceof typeof" +
  " abstract enum int short" +
  " boolean export interface static" +
  " byte extends long super" +
  " char final native synchronized" +
  " class float package throws" +
  " const goto private transient" +
  " debugger implements protected volatile" +
  " double import public let yield"
).split(" ");

var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

for(var i=0, l=reservedWords.length; i<l; i++) {
  compilerWords[reservedWords[i]] = true;
}

JavaScriptCompiler.isValidJavaScriptVariableName = function(name) {
  return !JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name);
};

exports["default"] = JavaScriptCompiler;
},{"../base":21,"../exception":29}],26:[function(require,module,exports){
"use strict";
/* jshint ignore:start */
/* Jison generated parser */
var handlebars = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"root":3,"statements":4,"EOF":5,"program":6,"simpleInverse":7,"statement":8,"openRawBlock":9,"CONTENT":10,"END_RAW_BLOCK":11,"openInverse":12,"closeBlock":13,"openBlock":14,"mustache":15,"partial":16,"COMMENT":17,"OPEN_RAW_BLOCK":18,"sexpr":19,"CLOSE_RAW_BLOCK":20,"OPEN_BLOCK":21,"CLOSE":22,"OPEN_INVERSE":23,"OPEN_ENDBLOCK":24,"path":25,"OPEN":26,"OPEN_UNESCAPED":27,"CLOSE_UNESCAPED":28,"OPEN_PARTIAL":29,"partialName":30,"param":31,"partial_option0":32,"partial_option1":33,"sexpr_repetition0":34,"sexpr_option0":35,"dataName":36,"STRING":37,"NUMBER":38,"BOOLEAN":39,"OPEN_SEXPR":40,"CLOSE_SEXPR":41,"hash":42,"hash_repetition_plus0":43,"hashSegment":44,"ID":45,"EQUALS":46,"DATA":47,"pathSegments":48,"SEP":49,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",10:"CONTENT",11:"END_RAW_BLOCK",17:"COMMENT",18:"OPEN_RAW_BLOCK",20:"CLOSE_RAW_BLOCK",21:"OPEN_BLOCK",22:"CLOSE",23:"OPEN_INVERSE",24:"OPEN_ENDBLOCK",26:"OPEN",27:"OPEN_UNESCAPED",28:"CLOSE_UNESCAPED",29:"OPEN_PARTIAL",37:"STRING",38:"NUMBER",39:"BOOLEAN",40:"OPEN_SEXPR",41:"CLOSE_SEXPR",45:"ID",46:"EQUALS",47:"DATA",49:"SEP"},
productions_: [0,[3,2],[3,1],[6,2],[6,3],[6,2],[6,1],[6,1],[6,0],[4,1],[4,2],[8,3],[8,3],[8,3],[8,1],[8,1],[8,1],[8,1],[9,3],[14,3],[12,3],[13,3],[15,3],[15,3],[16,5],[16,4],[7,2],[19,3],[19,1],[31,1],[31,1],[31,1],[31,1],[31,1],[31,3],[42,1],[44,3],[30,1],[30,1],[30,1],[36,2],[25,1],[48,3],[48,1],[32,0],[32,1],[33,0],[33,1],[34,0],[34,2],[35,0],[35,1],[43,1],[43,2]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: return new yy.ProgramNode($$[$0-1], this._$); 
break;
case 2: return new yy.ProgramNode([], this._$); 
break;
case 3:this.$ = new yy.ProgramNode([], $$[$0-1], $$[$0], this._$);
break;
case 4:this.$ = new yy.ProgramNode($$[$0-2], $$[$0-1], $$[$0], this._$);
break;
case 5:this.$ = new yy.ProgramNode($$[$0-1], $$[$0], [], this._$);
break;
case 6:this.$ = new yy.ProgramNode($$[$0], this._$);
break;
case 7:this.$ = new yy.ProgramNode([], this._$);
break;
case 8:this.$ = new yy.ProgramNode([], this._$);
break;
case 9:this.$ = [$$[$0]];
break;
case 10: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 11:this.$ = new yy.RawBlockNode($$[$0-2], $$[$0-1], $$[$0], this._$);
break;
case 12:this.$ = new yy.BlockNode($$[$0-2], $$[$0-1].inverse, $$[$0-1], $$[$0], this._$);
break;
case 13:this.$ = new yy.BlockNode($$[$0-2], $$[$0-1], $$[$0-1].inverse, $$[$0], this._$);
break;
case 14:this.$ = $$[$0];
break;
case 15:this.$ = $$[$0];
break;
case 16:this.$ = new yy.ContentNode($$[$0], this._$);
break;
case 17:this.$ = new yy.CommentNode($$[$0], this._$);
break;
case 18:this.$ = new yy.MustacheNode($$[$0-1], null, '', '', this._$);
break;
case 19:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], stripFlags($$[$0-2], $$[$0]), this._$);
break;
case 20:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], stripFlags($$[$0-2], $$[$0]), this._$);
break;
case 21:this.$ = {path: $$[$0-1], strip: stripFlags($$[$0-2], $$[$0])};
break;
case 22:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], stripFlags($$[$0-2], $$[$0]), this._$);
break;
case 23:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], stripFlags($$[$0-2], $$[$0]), this._$);
break;
case 24:this.$ = new yy.PartialNode($$[$0-3], $$[$0-2], $$[$0-1], stripFlags($$[$0-4], $$[$0]), this._$);
break;
case 25:this.$ = new yy.PartialNode($$[$0-2], undefined, $$[$0-1], stripFlags($$[$0-3], $$[$0]), this._$);
break;
case 26:this.$ = stripFlags($$[$0-1], $$[$0]);
break;
case 27:this.$ = new yy.SexprNode([$$[$0-2]].concat($$[$0-1]), $$[$0], this._$);
break;
case 28:this.$ = new yy.SexprNode([$$[$0]], null, this._$);
break;
case 29:this.$ = $$[$0];
break;
case 30:this.$ = new yy.StringNode($$[$0], this._$);
break;
case 31:this.$ = new yy.NumberNode($$[$0], this._$);
break;
case 32:this.$ = new yy.BooleanNode($$[$0], this._$);
break;
case 33:this.$ = $$[$0];
break;
case 34:$$[$0-1].isHelper = true; this.$ = $$[$0-1];
break;
case 35:this.$ = new yy.HashNode($$[$0], this._$);
break;
case 36:this.$ = [$$[$0-2], $$[$0]];
break;
case 37:this.$ = new yy.PartialNameNode($$[$0], this._$);
break;
case 38:this.$ = new yy.PartialNameNode(new yy.StringNode($$[$0], this._$), this._$);
break;
case 39:this.$ = new yy.PartialNameNode(new yy.NumberNode($$[$0], this._$));
break;
case 40:this.$ = new yy.DataNode($$[$0], this._$);
break;
case 41:this.$ = new yy.IdNode($$[$0], this._$);
break;
case 42: $$[$0-2].push({part: $$[$0], separator: $$[$0-1]}); this.$ = $$[$0-2]; 
break;
case 43:this.$ = [{part: $$[$0]}];
break;
case 48:this.$ = [];
break;
case 49:$$[$0-1].push($$[$0]);
break;
case 52:this.$ = [$$[$0]];
break;
case 53:$$[$0-1].push($$[$0]);
break;
}
},
table: [{3:1,4:2,5:[1,3],8:4,9:5,10:[1,10],12:6,14:7,15:8,16:9,17:[1,11],18:[1,12],21:[1,14],23:[1,13],26:[1,15],27:[1,16],29:[1,17]},{1:[3]},{5:[1,18],8:19,9:5,10:[1,10],12:6,14:7,15:8,16:9,17:[1,11],18:[1,12],21:[1,14],23:[1,13],26:[1,15],27:[1,16],29:[1,17]},{1:[2,2]},{5:[2,9],10:[2,9],17:[2,9],18:[2,9],21:[2,9],23:[2,9],24:[2,9],26:[2,9],27:[2,9],29:[2,9]},{10:[1,20]},{4:23,6:21,7:22,8:4,9:5,10:[1,10],12:6,14:7,15:8,16:9,17:[1,11],18:[1,12],21:[1,14],23:[1,24],24:[2,8],26:[1,15],27:[1,16],29:[1,17]},{4:23,6:25,7:22,8:4,9:5,10:[1,10],12:6,14:7,15:8,16:9,17:[1,11],18:[1,12],21:[1,14],23:[1,24],24:[2,8],26:[1,15],27:[1,16],29:[1,17]},{5:[2,14],10:[2,14],17:[2,14],18:[2,14],21:[2,14],23:[2,14],24:[2,14],26:[2,14],27:[2,14],29:[2,14]},{5:[2,15],10:[2,15],17:[2,15],18:[2,15],21:[2,15],23:[2,15],24:[2,15],26:[2,15],27:[2,15],29:[2,15]},{5:[2,16],10:[2,16],17:[2,16],18:[2,16],21:[2,16],23:[2,16],24:[2,16],26:[2,16],27:[2,16],29:[2,16]},{5:[2,17],10:[2,17],17:[2,17],18:[2,17],21:[2,17],23:[2,17],24:[2,17],26:[2,17],27:[2,17],29:[2,17]},{19:26,25:27,36:28,45:[1,31],47:[1,30],48:29},{19:32,25:27,36:28,45:[1,31],47:[1,30],48:29},{19:33,25:27,36:28,45:[1,31],47:[1,30],48:29},{19:34,25:27,36:28,45:[1,31],47:[1,30],48:29},{19:35,25:27,36:28,45:[1,31],47:[1,30],48:29},{25:37,30:36,37:[1,38],38:[1,39],45:[1,31],48:29},{1:[2,1]},{5:[2,10],10:[2,10],17:[2,10],18:[2,10],21:[2,10],23:[2,10],24:[2,10],26:[2,10],27:[2,10],29:[2,10]},{11:[1,40]},{13:41,24:[1,42]},{4:43,8:4,9:5,10:[1,10],12:6,14:7,15:8,16:9,17:[1,11],18:[1,12],21:[1,14],23:[1,13],24:[2,7],26:[1,15],27:[1,16],29:[1,17]},{7:44,8:19,9:5,10:[1,10],12:6,14:7,15:8,16:9,17:[1,11],18:[1,12],21:[1,14],23:[1,24],24:[2,6],26:[1,15],27:[1,16],29:[1,17]},{19:32,22:[1,45],25:27,36:28,45:[1,31],47:[1,30],48:29},{13:46,24:[1,42]},{20:[1,47]},{20:[2,48],22:[2,48],28:[2,48],34:48,37:[2,48],38:[2,48],39:[2,48],40:[2,48],41:[2,48],45:[2,48],47:[2,48]},{20:[2,28],22:[2,28],28:[2,28],41:[2,28]},{20:[2,41],22:[2,41],28:[2,41],37:[2,41],38:[2,41],39:[2,41],40:[2,41],41:[2,41],45:[2,41],47:[2,41],49:[1,49]},{25:50,45:[1,31],48:29},{20:[2,43],22:[2,43],28:[2,43],37:[2,43],38:[2,43],39:[2,43],40:[2,43],41:[2,43],45:[2,43],47:[2,43],49:[2,43]},{22:[1,51]},{22:[1,52]},{22:[1,53]},{28:[1,54]},{22:[2,46],25:57,31:55,33:56,36:61,37:[1,58],38:[1,59],39:[1,60],40:[1,62],42:63,43:64,44:66,45:[1,65],47:[1,30],48:29},{22:[2,37],37:[2,37],38:[2,37],39:[2,37],40:[2,37],45:[2,37],47:[2,37]},{22:[2,38],37:[2,38],38:[2,38],39:[2,38],40:[2,38],45:[2,38],47:[2,38]},{22:[2,39],37:[2,39],38:[2,39],39:[2,39],40:[2,39],45:[2,39],47:[2,39]},{5:[2,11],10:[2,11],17:[2,11],18:[2,11],21:[2,11],23:[2,11],24:[2,11],26:[2,11],27:[2,11],29:[2,11]},{5:[2,12],10:[2,12],17:[2,12],18:[2,12],21:[2,12],23:[2,12],24:[2,12],26:[2,12],27:[2,12],29:[2,12]},{25:67,45:[1,31],48:29},{8:19,9:5,10:[1,10],12:6,14:7,15:8,16:9,17:[1,11],18:[1,12],21:[1,14],23:[1,13],24:[2,3],26:[1,15],27:[1,16],29:[1,17]},{4:68,8:4,9:5,10:[1,10],12:6,14:7,15:8,16:9,17:[1,11],18:[1,12],21:[1,14],23:[1,13],24:[2,5],26:[1,15],27:[1,16],29:[1,17]},{10:[2,26],17:[2,26],18:[2,26],21:[2,26],23:[2,26],24:[2,26],26:[2,26],27:[2,26],29:[2,26]},{5:[2,13],10:[2,13],17:[2,13],18:[2,13],21:[2,13],23:[2,13],24:[2,13],26:[2,13],27:[2,13],29:[2,13]},{10:[2,18]},{20:[2,50],22:[2,50],25:57,28:[2,50],31:70,35:69,36:61,37:[1,58],38:[1,59],39:[1,60],40:[1,62],41:[2,50],42:71,43:64,44:66,45:[1,65],47:[1,30],48:29},{45:[1,72]},{20:[2,40],22:[2,40],28:[2,40],37:[2,40],38:[2,40],39:[2,40],40:[2,40],41:[2,40],45:[2,40],47:[2,40]},{10:[2,20],17:[2,20],18:[2,20],21:[2,20],23:[2,20],24:[2,20],26:[2,20],27:[2,20],29:[2,20]},{10:[2,19],17:[2,19],18:[2,19],21:[2,19],23:[2,19],24:[2,19],26:[2,19],27:[2,19],29:[2,19]},{5:[2,22],10:[2,22],17:[2,22],18:[2,22],21:[2,22],23:[2,22],24:[2,22],26:[2,22],27:[2,22],29:[2,22]},{5:[2,23],10:[2,23],17:[2,23],18:[2,23],21:[2,23],23:[2,23],24:[2,23],26:[2,23],27:[2,23],29:[2,23]},{22:[2,44],32:73,42:74,43:64,44:66,45:[1,75]},{22:[1,76]},{20:[2,29],22:[2,29],28:[2,29],37:[2,29],38:[2,29],39:[2,29],40:[2,29],41:[2,29],45:[2,29],47:[2,29]},{20:[2,30],22:[2,30],28:[2,30],37:[2,30],38:[2,30],39:[2,30],40:[2,30],41:[2,30],45:[2,30],47:[2,30]},{20:[2,31],22:[2,31],28:[2,31],37:[2,31],38:[2,31],39:[2,31],40:[2,31],41:[2,31],45:[2,31],47:[2,31]},{20:[2,32],22:[2,32],28:[2,32],37:[2,32],38:[2,32],39:[2,32],40:[2,32],41:[2,32],45:[2,32],47:[2,32]},{20:[2,33],22:[2,33],28:[2,33],37:[2,33],38:[2,33],39:[2,33],40:[2,33],41:[2,33],45:[2,33],47:[2,33]},{19:77,25:27,36:28,45:[1,31],47:[1,30],48:29},{22:[2,47]},{20:[2,35],22:[2,35],28:[2,35],41:[2,35],44:78,45:[1,75]},{20:[2,43],22:[2,43],28:[2,43],37:[2,43],38:[2,43],39:[2,43],40:[2,43],41:[2,43],45:[2,43],46:[1,79],47:[2,43],49:[2,43]},{20:[2,52],22:[2,52],28:[2,52],41:[2,52],45:[2,52]},{22:[1,80]},{8:19,9:5,10:[1,10],12:6,14:7,15:8,16:9,17:[1,11],18:[1,12],21:[1,14],23:[1,13],24:[2,4],26:[1,15],27:[1,16],29:[1,17]},{20:[2,27],22:[2,27],28:[2,27],41:[2,27]},{20:[2,49],22:[2,49],28:[2,49],37:[2,49],38:[2,49],39:[2,49],40:[2,49],41:[2,49],45:[2,49],47:[2,49]},{20:[2,51],22:[2,51],28:[2,51],41:[2,51]},{20:[2,42],22:[2,42],28:[2,42],37:[2,42],38:[2,42],39:[2,42],40:[2,42],41:[2,42],45:[2,42],47:[2,42],49:[2,42]},{22:[1,81]},{22:[2,45]},{46:[1,79]},{5:[2,25],10:[2,25],17:[2,25],18:[2,25],21:[2,25],23:[2,25],24:[2,25],26:[2,25],27:[2,25],29:[2,25]},{41:[1,82]},{20:[2,53],22:[2,53],28:[2,53],41:[2,53],45:[2,53]},{25:57,31:83,36:61,37:[1,58],38:[1,59],39:[1,60],40:[1,62],45:[1,31],47:[1,30],48:29},{5:[2,21],10:[2,21],17:[2,21],18:[2,21],21:[2,21],23:[2,21],24:[2,21],26:[2,21],27:[2,21],29:[2,21]},{5:[2,24],10:[2,24],17:[2,24],18:[2,24],21:[2,24],23:[2,24],24:[2,24],26:[2,24],27:[2,24],29:[2,24]},{20:[2,34],22:[2,34],28:[2,34],37:[2,34],38:[2,34],39:[2,34],40:[2,34],41:[2,34],45:[2,34],47:[2,34]},{20:[2,36],22:[2,36],28:[2,36],41:[2,36],45:[2,36]}],
defaultActions: {3:[2,2],18:[2,1],47:[2,18],63:[2,47],74:[2,45]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == "undefined")
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === "function")
        this.parseError = this.yy.parseError;
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || 1;
        if (typeof token !== "number") {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == "undefined") {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
        if (typeof action === "undefined" || !action.length || !action[0]) {
            var errStr = "";
            if (!recovering) {
                expected = [];
                for (p in table[state])
                    if (this.terminals_[p] && p > 2) {
                        expected.push("'" + this.terminals_[p] + "'");
                    }
                if (this.lexer.showPosition) {
                    errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                } else {
                    errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1?"end of input":"'" + (this.terminals_[symbol] || symbol) + "'");
                }
                this.parseError(errStr, {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }
        }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0)
                    recovering--;
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column};
            if (ranges) {
                yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
            }
            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
            if (typeof r !== "undefined") {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}
};


function stripFlags(open, close) {
  return {
    left: open.charAt(2) === '~',
    right: close.charAt(0) === '~' || close.charAt(1) === '~'
  };
}

/* Jison generated lexer */
var lexer = (function(){
var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        if (this.options.ranges) this.yylloc.range = [0,0];
        this.offset = 0;
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) this.yylloc.range[1]++;

        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length-len-1);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length-1);
        this.matched = this.matched.substr(0, this.matched.length-1);

        if (lines.length-1) this.yylineno -= lines.length-1;
        var r = this.yylloc.range;

        this.yylloc = {first_line: this.yylloc.first_line,
          last_line: this.yylineno+1,
          first_column: this.yylloc.first_column,
          last_column: lines ?
              (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length:
              this.yylloc.first_column - len
          };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
less:function (n) {
        this.unput(this.match.slice(n));
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            tempMatch,
            index,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (!this.options.flex) break;
            }
        }
        if (match) {
            lines = match[0].match(/(?:\r\n?|\n).*/g);
            if (lines) this.yylineno += lines.length;
            this.yylloc = {first_line: this.yylloc.last_line,
                           last_line: this.yylineno+1,
                           first_column: this.yylloc.last_column,
                           last_column: lines ? lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length};
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;
            if (this.options.ranges) {
                this.yylloc.range = [this.offset, this.offset += this.yyleng];
            }
            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
            if (this.done && this._input) this.done = false;
            if (token) return token;
            else return;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
    }});
lexer.options = {};
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {


function strip(start, end) {
  return yy_.yytext = yy_.yytext.substr(start, yy_.yyleng-end);
}


var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:
                                   if(yy_.yytext.slice(-2) === "\\\\") {
                                     strip(0,1);
                                     this.begin("mu");
                                   } else if(yy_.yytext.slice(-1) === "\\") {
                                     strip(0,1);
                                     this.begin("emu");
                                   } else {
                                     this.begin("mu");
                                   }
                                   if(yy_.yytext) return 10;
                                 
break;
case 1:return 10;
break;
case 2:
                                   this.popState();
                                   return 10;
                                 
break;
case 3:
                                  yy_.yytext = yy_.yytext.substr(5, yy_.yyleng-9);
                                  this.popState();
                                  return 11;
                                 
break;
case 4: return 10; 
break;
case 5:strip(0,4); this.popState(); return 17;
break;
case 6:return 40;
break;
case 7:return 41;
break;
case 8: return 18; 
break;
case 9:
                                  this.popState();
                                  this.begin('raw');
                                  return 20;
                                 
break;
case 10:
                                  yy_.yytext = yy_.yytext.substr(4, yy_.yyleng-8);
                                  this.popState();
                                  return 'RAW_BLOCK';
                                 
break;
case 11:return 29;
break;
case 12:return 21;
break;
case 13:return 24;
break;
case 14:return 23;
break;
case 15:return 23;
break;
case 16:return 27;
break;
case 17:return 26;
break;
case 18:this.popState(); this.begin('com');
break;
case 19:strip(3,5); this.popState(); return 17;
break;
case 20:return 26;
break;
case 21:return 46;
break;
case 22:return 45;
break;
case 23:return 45;
break;
case 24:return 49;
break;
case 25:// ignore whitespace
break;
case 26:this.popState(); return 28;
break;
case 27:this.popState(); return 22;
break;
case 28:yy_.yytext = strip(1,2).replace(/\\"/g,'"'); return 37;
break;
case 29:yy_.yytext = strip(1,2).replace(/\\'/g,"'"); return 37;
break;
case 30:return 47;
break;
case 31:return 39;
break;
case 32:return 39;
break;
case 33:return 38;
break;
case 34:return 45;
break;
case 35:yy_.yytext = strip(1,2); return 45;
break;
case 36:return 'INVALID';
break;
case 37:return 5;
break;
}
};
lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,/^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/,/^(?:[^\x00]*?(?=(\{\{\{\{\/)))/,/^(?:[\s\S]*?--\}\})/,/^(?:\()/,/^(?:\))/,/^(?:\{\{\{\{)/,/^(?:\}\}\}\})/,/^(?:\{\{\{\{[^\x00]*\}\}\}\})/,/^(?:\{\{(~)?>)/,/^(?:\{\{(~)?#)/,/^(?:\{\{(~)?\/)/,/^(?:\{\{(~)?\^)/,/^(?:\{\{(~)?\s*else\b)/,/^(?:\{\{(~)?\{)/,/^(?:\{\{(~)?&)/,/^(?:\{\{!--)/,/^(?:\{\{![\s\S]*?\}\})/,/^(?:\{\{(~)?)/,/^(?:=)/,/^(?:\.\.)/,/^(?:\.(?=([=~}\s\/.)])))/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}(~)?\}\})/,/^(?:(~)?\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=([~}\s)])))/,/^(?:false(?=([~}\s)])))/,/^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/,/^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)]))))/,/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:$)/];
lexer.conditions = {"mu":{"rules":[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37],"inclusive":false},"emu":{"rules":[2],"inclusive":false},"com":{"rules":[5],"inclusive":false},"raw":{"rules":[3,4],"inclusive":false},"INITIAL":{"rules":[0,1,37],"inclusive":true}};
return lexer;})()
parser.lexer = lexer;
function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();exports["default"] = handlebars;
/* jshint ignore:end */
},{}],27:[function(require,module,exports){
"use strict";
var Visitor = require("./visitor")["default"];

function print(ast) {
  return new PrintVisitor().accept(ast);
}

exports.print = print;function PrintVisitor() {
  this.padding = 0;
}

exports.PrintVisitor = PrintVisitor;PrintVisitor.prototype = new Visitor();

PrintVisitor.prototype.pad = function(string, newline) {
  var out = "";

  for(var i=0,l=this.padding; i<l; i++) {
    out = out + "  ";
  }

  out = out + string;

  if(newline !== false) { out = out + "\n"; }
  return out;
};

PrintVisitor.prototype.program = function(program) {
  var out = "",
      statements = program.statements,
      i, l;

  for(i=0, l=statements.length; i<l; i++) {
    out = out + this.accept(statements[i]);
  }

  this.padding--;

  return out;
};

PrintVisitor.prototype.block = function(block) {
  var out = "";

  out = out + this.pad("BLOCK:");
  this.padding++;
  out = out + this.accept(block.mustache);
  if (block.program) {
    out = out + this.pad("PROGRAM:");
    this.padding++;
    out = out + this.accept(block.program);
    this.padding--;
  }
  if (block.inverse) {
    if (block.program) { this.padding++; }
    out = out + this.pad("{{^}}");
    this.padding++;
    out = out + this.accept(block.inverse);
    this.padding--;
    if (block.program) { this.padding--; }
  }
  this.padding--;

  return out;
};

PrintVisitor.prototype.sexpr = function(sexpr) {
  var params = sexpr.params, paramStrings = [], hash;

  for(var i=0, l=params.length; i<l; i++) {
    paramStrings.push(this.accept(params[i]));
  }

  params = "[" + paramStrings.join(", ") + "]";

  hash = sexpr.hash ? " " + this.accept(sexpr.hash) : "";

  return this.accept(sexpr.id) + " " + params + hash;
};

PrintVisitor.prototype.mustache = function(mustache) {
  return this.pad("{{ " + this.accept(mustache.sexpr) + " }}");
};

PrintVisitor.prototype.partial = function(partial) {
  var content = this.accept(partial.partialName);
  if(partial.context) {
    content += " " + this.accept(partial.context);
  }
  if (partial.hash) {
    content += " " + this.accept(partial.hash);
  }
  return this.pad("{{> " + content + " }}");
};

PrintVisitor.prototype.hash = function(hash) {
  var pairs = hash.pairs;
  var joinedPairs = [], left, right;

  for(var i=0, l=pairs.length; i<l; i++) {
    left = pairs[i][0];
    right = this.accept(pairs[i][1]);
    joinedPairs.push( left + "=" + right );
  }

  return "HASH{" + joinedPairs.join(", ") + "}";
};

PrintVisitor.prototype.STRING = function(string) {
  return '"' + string.string + '"';
};

PrintVisitor.prototype.NUMBER = function(number) {
  return "NUMBER{" + number.number + "}";
};

PrintVisitor.prototype.BOOLEAN = function(bool) {
  return "BOOLEAN{" + bool.bool + "}";
};

PrintVisitor.prototype.ID = function(id) {
  var path = id.parts.join("/");
  if(id.parts.length > 1) {
    return "PATH:" + path;
  } else {
    return "ID:" + path;
  }
};

PrintVisitor.prototype.PARTIAL_NAME = function(partialName) {
    return "PARTIAL:" + partialName.name;
};

PrintVisitor.prototype.DATA = function(data) {
  return "@" + this.accept(data.id);
};

PrintVisitor.prototype.content = function(content) {
  return this.pad("CONTENT[ '" + content.string + "' ]");
};

PrintVisitor.prototype.comment = function(comment) {
  return this.pad("{{! '" + comment.comment + "' }}");
};
},{"./visitor":28}],28:[function(require,module,exports){
"use strict";
function Visitor() {}

Visitor.prototype = {
  constructor: Visitor,

  accept: function(object) {
    return this[object.type](object);
  }
};

exports["default"] = Visitor;
},{}],29:[function(require,module,exports){
"use strict";

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var line;
  if (node && node.firstLine) {
    line = node.firstLine;

    message += ' - ' + line + ':' + node.firstColumn;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  if (line) {
    this.lineNumber = line;
    this.column = node.firstColumn;
  }
}

Exception.prototype = new Error();

exports["default"] = Exception;
},{}],30:[function(require,module,exports){
"use strict";
var Utils = require("./utils");
var Exception = require("./exception")["default"];
var COMPILER_REVISION = require("./base").COMPILER_REVISION;
var REVISION_CHANGES = require("./base").REVISION_CHANGES;
var createFrame = require("./base").createFrame;

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      var runtimeVersions = REVISION_CHANGES[currentRevision],
          compilerVersions = REVISION_CHANGES[compilerRevision];
      throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. "+
            "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. "+
            "Please update your runtime to a newer version ("+compilerInfo[1]+").");
    }
  }
}

exports.checkRevision = checkRevision;// TODO: Remove this line and break up compilePartial

function template(templateSpec, env) {
  if (!env) {
    throw new Exception("No environment passed to template");
  }

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  env.VM.checkRevision(templateSpec.compiler);

  var invokePartialWrapper = function(partial, name, context, hash, helpers, partials, data) {
    if (hash) {
      context = Utils.extend({}, context, hash);
    }

    var result = env.VM.invokePartial.call(this, partial, name, context, helpers, partials, data);
    if (result != null) { return result; }

    if (env.compile) {
      var options = { helpers: helpers, partials: partials, data: data };
      partials[name] = env.compile(partial, { data: data !== undefined }, env);
      return partials[name](context, options);
    } else {
      throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
    }
  };

  // Just add water
  var container = {
    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,

    fn: function(i) {
      return templateSpec[i];
    },

    programs: [],
    program: function(i, data) {
      var programWrapper = this.programs[i],
          fn = this.fn(i);
      if(data) {
        programWrapper = program(this, i, fn, data);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = program(this, i, fn);
      }
      return programWrapper;
    },
    programWithDepth: env.VM.programWithDepth,

    data: function(data, depth) {
      while (data && depth--) {
        data = data._parent;
      }
      return data;
    },
    merge: function(param, common) {
      var ret = param || common;

      if (param && common && (param !== common)) {
        ret = Utils.extend({}, common, param);
      }

      return ret;
    },

    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler
  };

  var ret = function(context, options) {
    options = options || {};
    var helpers,
        partials,
        data = options.data;

    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data = initData(context, data);
    }
    return templateSpec.main.call(container, context, container.helpers, container.partials, data);
  };

  ret._setup = function(options) {
    if (!options.partial) {
      container.helpers = container.merge(options.helpers, env.helpers);

      if (templateSpec.usePartial) {
        container.partials = container.merge(options.partials, env.partials);
      }
    } else {
      container.helpers = options.helpers;
      container.partials = options.partials;
    }
  };

  ret._child = function(i) {
    return container.programWithDepth(i);
  };
  return ret;
}

exports.template = template;function programWithDepth(i, data /*, $depth */) {
  /*jshint -W040 */
  var args = Array.prototype.slice.call(arguments, 2),
      container = this,
      fn = container.fn(i);

  var prog = function(context, options) {
    options = options || {};

    return fn.apply(container, [context, container.helpers, container.partials, options.data || data].concat(args));
  };
  prog.program = i;
  prog.depth = args.length;
  return prog;
}

exports.programWithDepth = programWithDepth;function program(container, i, fn, data) {
  var prog = function(context, options) {
    options = options || {};

    return fn.call(container, context, container.helpers, container.partials, options.data || data);
  };
  prog.program = i;
  prog.depth = 0;
  return prog;
}

exports.program = program;function invokePartial(partial, name, context, helpers, partials, data) {
  var options = { partial: true, helpers: helpers, partials: partials, data: data };

  if(partial === undefined) {
    throw new Exception("The partial " + name + " could not be found");
  } else if(partial instanceof Function) {
    return partial(context, options);
  }
}

exports.invokePartial = invokePartial;function noop() { return ""; }

exports.noop = noop;function initData(context, data) {
  if (!data || !('root' in data)) {
    data = data ? createFrame(data) : {};
    data.root = context;
  }
  return data;
}
},{"./base":21,"./exception":29,"./utils":32}],31:[function(require,module,exports){
"use strict";
// Build out our basic SafeString type
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = function() {
  return "" + this.string;
};

exports["default"] = SafeString;
},{}],32:[function(require,module,exports){
"use strict";
/*jshint -W004 */
var SafeString = require("./safe-string")["default"];

var escape = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};

var badChars = /[&<>"'`]/g;
var possible = /[&<>"'`]/;

function escapeChar(chr) {
  return escape[chr] || "&amp;";
}

function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

exports.extend = extend;var toString = Object.prototype.toString;
exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
var isFunction = function(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
if (isFunction(/x/)) {
  isFunction = function(value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
var isFunction;
exports.isFunction = isFunction;
var isArray = Array.isArray || function(value) {
  return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
};
exports.isArray = isArray;

function escapeExpression(string) {
  // don't escape SafeStrings, since they're already safe
  if (string instanceof SafeString) {
    return string.toString();
  } else if (!string && string !== 0) {
    return "";
  }

  // Force a string conversion as this will be done by the append regardless and
  // the regex test will do this transparently behind the scenes, causing issues if
  // an object's to string has escaped characters in it.
  string = "" + string;

  if(!possible.test(string)) { return string; }
  return string.replace(badChars, escapeChar);
}

exports.escapeExpression = escapeExpression;function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.isEmpty = isEmpty;function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}

exports.appendContextPath = appendContextPath;
},{"./safe-string":31}],33:[function(require,module,exports){
// USAGE:
// var handlebars = require('handlebars');

// var local = handlebars.create();

var handlebars = require('../dist/cjs/handlebars')["default"];

handlebars.Visitor = require('../dist/cjs/handlebars/compiler/visitor')["default"];

var printer = require('../dist/cjs/handlebars/compiler/printer');
handlebars.PrintVisitor = printer.PrintVisitor;
handlebars.print = printer.print;

module.exports = handlebars;

// Publish a Node.js require() handler for .handlebars and .hbs files
if (typeof require !== 'undefined' && require.extensions) {
  var extension = function(module, filename) {
    var fs = require("fs");
    var templateString = fs.readFileSync(filename, "utf8");
    module.exports = handlebars.compile(templateString);
  };
  require.extensions[".handlebars"] = extension;
  require.extensions[".hbs"] = extension;
}

},{"../dist/cjs/handlebars":19,"../dist/cjs/handlebars/compiler/printer":27,"../dist/cjs/handlebars/compiler/visitor":28,"fs":14}]},{},[1])