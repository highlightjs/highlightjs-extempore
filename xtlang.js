/*
Language: xtlang
Description: This is a mixture of Scheme and xtlang for the `Extempore programming environment <https://extemporelang.github.io/>`.
Author: YUYA CHIBA <cy.blue.9@gmail.com>
Category: lisp
*/

var module = module ? module : {}; // shim for browser use

function hljsDefineXtlang(hljs) {
  var SCHEME_SIMPLE_NUMBER_RE  = '(\\-|\\+|\\.)?\\d+([./]\\d*)?';
  var SCHEME_COMPLEX_NUMBER_RE = SCHEME_SIMPLE_NUMBER_RE + '[\\+\\-]' +
                                 SCHEME_SIMPLE_NUMBER_RE + 'i';

  // valid names for Scheme identifiers(names cannot consist fully
  // of numbers, but this should be good enough for now)
  var VALID_SCHEME_NAME_RE = '[\\w\\!\\$%&\\*\\+,\\/:<=>\\?@\\^~\\|\\-]+';

  // valid characters in xtlang names & types
  var VALID_XTLANG_NAME_RE  = '[\\w\\.\\!\\-]+';
  var VALID_XTLANG_TYPE_RE  = '[\\w\\[\\]\\{\\}<>,\\*/\\|\\!\\-]+';
  var VALID_XTLANG_TYPE_RE_ = ':(i1|i8|i32|i64|double|float|SAMPLE|NoteData|DSP|' +
                               'type_of_argument1|type_of_argument2)'             +
                               '[\\w\\[\\]\\{\\}<>,\\*/\\|\\!\\-]*';

  /*
   *  Keywords based on
   *  https://bitbucket.org/birkenfeld/pygments-main/src/7941677dc77d4f2bf0bbd6140ade85a9454b8b80/
   *  pygments/lexers/lisp.py?at=default&fileviewer=file-view-default#lisp.py-2420
   */
  var COMMON_KEYWORDS_RE = '(lambda|define|if|else|cond|and|or|' +
                            'let|begin|set\\!|map|for\\-each)';
  var SCHEME_KEYWORDS_RE = '(do|delay|quasiquote|unquote\\-splicing|' +
                            'eval|case|let\\*|letrec|quote)';
  var SCHEME_KEYWORDS_OVERLAP_RE = 'unquote';
  var XTLANG_BIND_KEYWORDS_RE = '(bind\\-func|bind\\-val|bind\\-type|bind\\-alias|' +
                                 'bind\\-poly|bind\\-dylib|bind\\-lib\\-func|bind\\-lib\\-val)';
  var XTLANG_BIND_KEYWORDS_OVARLAP_RE = 'bind\\-lib';
  var XTLANG_KEYWORDS_RE = '(letz|memzone|cast|convert|dotimes|doloop)';
  var COMMON_FUNCTIONS_RE = '(\\*|\\+|-|/|<|<=|=|>|>=|%|abs|acos|'         +
                             'angle|append|apply|asin|assoc|assq|assv|'    +
                             'atan|boolean\\?|caaaar|caaadr|caaar|caadar|' +
                             'caaddr|caadr|caar|cadaar|cadadr|cadar|'      +
                             'caddar|cadddr|caddr|cadr|car|cdaaar|'        +
                             'cdaadr|cdaar|cdadar|cdaddr|cdadr|cdar|'      +
                             'cddaar|cddadr|cddar|cdddar|cddddr|cdddr|'    +
                             'cddr|cdr|ceiling|cons|cos|floor|length|'     +
                             'list|log|max|member|min|modulo|not|'         +
                             'reverse|round|sin|sqrt|substring|tan|'       +
                             'println|random|null\\?|callback|now)';
  var COMMON_FUNCTIONS_OVERLAP_RE = 'print';
  var SCHEME_FUNCTIONS_RE = '(call\\-with\\-current\\-continuation|'                        +
                             'call\\-with\\-input\\-file|call\\-with\\-output\\-file|'      +
                             'call\\-with\\-values|call/cc|char\\->integer|'                +
                             'char\\-alphabetic\\?|char\\-ci<=\\?|char\\-ci<\\?|'           +
                             'char\\-ci=\\?|char\\-ci>=\\?|char\\-ci>\\?|char\\-downcase|'  +
                             'char\\-lower\\-case\\?|char\\-numeric\\?|char\\-ready\\?|'    +
                             'char\\-upcase|char\\-upper\\-case\\?|char\\-whitespace\\?|'   +
                             'char<=\\?|char<\\?|char=\\?|char>=\\?|char>\\?|char\\?|'      +
                             'close\\-input\\-port|close\\-output\\-port|complex\\?|'       +
                             'current\\-input\\-port|current\\-output\\-port|denominator|'  +
                             'display|dynamic\\-wind|eof\\-object\\?|eq\\?|equal\\?|'       +
                             'eqv\\?|even\\?|exact\\->inexact|exact\\?|expt|'               +
                             'force|gcd|imag\\-part|inexact\\->exact|inexact\\?|'           +
                             'input\\-port\\?|integer\\->char|integer\\?|'                  +
                             'interaction\\-environment|lcm|list\\->string|'                +
                             'list\\->vector|list\\-ref|list\\-tail|list\\?|load|'          +
                             'magnitude|make\\-polar|make\\-rectangular|make\\-string|'     +
                             'make\\-vector|memq|memv|negative\\?|newline|'                 +
                             'null\\-environment|number\\->string|number\\?|'               +
                             'numerator|odd\\?|open\\-input\\-file|open\\-output\\-file|'   +
                             'output\\-port\\?|pair\\?|peek\\-char|port\\?|positive\\?|'    +
                             'procedure\\?|quotient|rational\\?|rationalize|'               +
                             'read\\-char|real\\-part|real\\?|'                             +
                             'remainder|scheme\\-report\\-environment|set\\-car\\!|'        +
                             'set\\-cdr\\!|string\\->list|string\\->number|'                +
                             'string\\->symbol|string\\-append|string\\-ci<=\\?|'           +
                             'string\\-ci<\\?|string\\-ci=\\?|string\\-ci>=\\?|'            +
                             'string\\-ci>\\?|string\\-copy|string\\-fill\\!|'              +
                             'string\\-length|string\\-ref|string\\-set\\!|string<=\\?|'    +
                             'string<\\?|string=\\?|string>=\\?|string>\\?|string\\?|'      +
                             'symbol\\->string|symbol\\?|transcript\\-off|transcript\\-on|' +
                             'truncate|values|vector\\->list|vector\\-fill\\!|'             +
                             'vector\\-length|vector\\?|'                                   +
                             'with\\-input\\-from\\-file|with\\-output\\-to\\-file|write|'  +
                             'write\\-char|zero\\?)';
  var SCHEME_FUNCTIONS_OVERLAP_RE = '(exp|read|string|vector)';
  var XTLANG_FUNCTIONS_RE = '(toString|afill\\!|pfill\\!|tfill\\!|tbind|vfill\\!|'          +
                             'array\\-fill\\!|pointer\\-fill\\!|tuple\\-fill\\!|'           +
                             'vector\\-fill\\!|free|~|cset\\!|cref|&|bor|'                  +
                             'ang\\-names|<<|>>|nil|printf|sprintf|null|now|'               +
                             'pset\\!|pref\\-ptr|vset\\!|vref|aset\\!|aref\\-ptr|'          +
                             'tset\\!|tref\\-ptr|salloc|halloc|zalloc|alloc|'               +
                             'schedule|exp|log|sin|cos|tan|asin|acos|atan|'                 +
                             'sqrt|expt|floor|ceiling|truncate|round|'                      +
                             'llvm_printf|push_zone|pop_zone|memzone|callback|'             +
                             'llvm_sprintf|make\\-array|array\\-set\\!|'                    +
                             'array\\-ref\\-ptr|pointer\\-set\\!|'                          +
                             'pointer\\-ref\\-ptr|stack\\-alloc|heap\\-alloc|zone\\-alloc|' +
                             'make\\-tuple|tuple\\-set\\!|tuple\\-ref\\-ptr|'               +
                             'closure\\-set\\!|closure\\-ref|pdref|impc_null|'              +
                             'bitcast|void|ifret|ret\\->|clrun\\->|make\\-env\\-zone|'      +
                             '<>|dtof|ftod|i1tof|i1tod|i1toi8|i1toi32|i1toi64|'             +
                             'i8tof|i8tod|i8toi1|i8toi32|i8toi64|i32tof|i32tod|i32toi1|'    +
                             'i32toi8|i32toi64|i64tof|i64tod|i64toi1|'                      +
                             'i64toi8|i64toi32)';
  var XTLANG_FUNCTIONS_OVERLAP_RE = '(tuple\\-ref|array\\-ref|aref|tref|pref|pointer\\-ref|' +
                                     'make\\-env)';
  var XTLANG_FUNCTIONS_OVERLAP_RE2 = '(tuple|array)';

  var SHEBANG = {
    className: 'meta',
    begin: '^#!',
    end: '$'
  };

  var LITERAL = {
    className: 'literal',
    begin: '(#t|#f)'
  };

  var XTLANG_TYPE = {
    className: 'type',
    lexemes: VALID_XTLANG_TYPE_RE,
    relevance: 10,
    variants: [
      { begin: VALID_XTLANG_TYPE_RE_ },
      {
        // Global variable
        className: 'variable',
        begin: '\\*\\w',
        end: '\\*',
        lexemes: VALID_SCHEME_NAME_RE
      },
      { begin: '(<' + VALID_XTLANG_TYPE_RE + '>|\\|' + VALID_XTLANG_TYPE_RE + '\\||/' +
               VALID_XTLANG_TYPE_RE + '/|' + VALID_XTLANG_TYPE_RE + '\\*)\\**' }
    ],
  };

  var NUMBER = {
    className: 'number',
    variants: [
      { begin: SCHEME_SIMPLE_NUMBER_RE, relevance: 0 },
      { begin: SCHEME_COMPLEX_NUMBER_RE, relevance: 0 },
      { begin: '#b[0-1]+(/[0-1]+)?' },
      { begin: '#o[0-7]+(/[0-7]+)?' },
      { begin: '#x[0-9a-f]+(/[0-9a-f]+)?' }
    ]
  };

  var STRING = {
    className: 'string',
    variants: [
      { begin: '"', end:'"'},
      { begin: '(#\\\\' + VALID_SCHEME_NAME_RE + '|#\\\\.)' }
    ],
    contains: [
      {
        className: 'doctag', begin: '@\\w+', lexemes: VALID_XTLANG_NAME_RE
      }
    ]
  };

  var COMMENT = [
    hljs.COMMENT(
      ';',
      '$',
      {
        relevance: 0
      }
    ),
    hljs.COMMENT('#\\|', '\\|#')
  ];

  var IDENT = {
    className: 'variable',
    begin: VALID_XTLANG_NAME_RE,
    relevance: 0
  };

  var QUOTED_IDENT = {
    className: 'symbol',
    begin: '\'' + VALID_SCHEME_NAME_RE
  };

  var SPECIAL_OPERATORS = {
    className: 'symbol',
    begin: '(\'|#|`|,@|,|\\.)'
  };

  var QUOTED_LIST = {
    variants: [
      { begin: /'/ },
      { begin: '`' }
    ],
    contains: [
      {
        begin: '\\(', end: '\\)',
        contains: ['self', LITERAL, STRING, NUMBER, IDENT, QUOTED_IDENT, SPECIAL_OPERATORS]
      }
    ]
  };

  var COMMON_KEYWORDS = [
    {
      /* Example:
       *   "lambdahoge"
       */
      className: 'variable',
      begin: COMMON_KEYWORDS_RE + VALID_SCHEME_NAME_RE,
      lexemes: VALID_SCHEME_NAME_RE
    },
    {
      /* Example:
       *   "lambda"
       */
      className: 'keyword',
      begin: COMMON_KEYWORDS_RE,
      lexemes: VALID_SCHEME_NAME_RE
    }
  ];

  var SCHEME_KEYWORDS = [
    {
      /* Example:
       *   "unquote-splicinghoge"
       */
      className: 'variable',
      begin: SCHEME_KEYWORDS_RE+ VALID_SCHEME_NAME_RE,
      lexemes: VALID_SCHEME_NAME_RE
    },
    {
      /* Example:
       *   "unquote-splicing"
       */
      className: 'keyword',
      begin: SCHEME_KEYWORDS_RE,
      lexemes: VALID_SCHEME_NAME_RE
    },
    {
      /* Example:
       *   "unquotehoge"
       */
      className: 'variable',
      begin: SCHEME_KEYWORDS_OVERLAP_RE + VALID_SCHEME_NAME_RE,
      lexemes: VALID_SCHEME_NAME_RE
    },
    {
      /* Example:
       *   "unquote"
       */
      className: 'keyword',
      begin: SCHEME_KEYWORDS_OVERLAP_RE,
      lexemes: VALID_SCHEME_NAME_RE
    }
  ]

  var XTLANG_KEYWORDS = [
    {
      /* Example:
       *   "letzhoge"
       */
      className: 'variable',
      begin: XTLANG_KEYWORDS_RE + VALID_XTLANG_NAME_RE,
      lexemes: VALID_XTLANG_NAME_RE
    },
    {
      /* Example:
       *   "letz"
       */
      className: 'keyword',
      begin: XTLANG_KEYWORDS_RE,
      lexemes: VALID_XTLANG_NAME_RE
    }
  ];

  var COMMON_FUNCTIONS = [
    {
      /* Example:
       *   "printlnhoge"
       */
      className: 'variable',
      begin: COMMON_FUNCTIONS_RE + VALID_SCHEME_NAME_RE,
      lexemes: VALID_SCHEME_NAME_RE
    },
    {
      /* Example:
       *   "prinln"
       */
      className: 'funciton',
      begin: COMMON_FUNCTIONS_RE,
      lexemes: VALID_SCHEME_NAME_RE
    },
    {
      /* Example:
       *   "printhoge"
       */
      className: 'variable',
      begin: COMMON_FUNCTIONS_OVERLAP_RE + VALID_SCHEME_NAME_RE,
      lexemes: VALID_SCHEME_NAME_RE
    },
    {
      /* Example:
       *   "print"
       */
      className: 'funciton',
      begin: COMMON_FUNCTIONS_OVERLAP_RE,
      lexemes: VALID_SCHEME_NAME_RE
    }
  ];

  var SCHEME_FUNCTIONS = [
    {
      /* Example:
       *   "read-charhoge"
       */
      className: 'variable',
      begin: SCHEME_FUNCTIONS_RE + VALID_SCHEME_NAME_RE,
      lexemes: VALID_SCHEME_NAME_RE
    },
    {
      /* Example:
       *   "read-char"
       */
      className: 'funciton',
      begin: SCHEME_FUNCTIONS_RE,
      lexemes: VALID_SCHEME_NAME_RE,
    },
    {
      /* Example:
       *   "readhoge"
       */
      className: 'variable',
      begin: SCHEME_FUNCTIONS_OVERLAP_RE + VALID_SCHEME_NAME_RE,
      lexemes: VALID_SCHEME_NAME_RE
    },
    {
      /* Example:
       *   "read"
       */
      className: 'funciton',
      begin: SCHEME_FUNCTIONS_OVERLAP_RE,
      lexemes: VALID_SCHEME_NAME_RE,
    }
  ];

  var XTLANG_FUNCTIONS = [
    {
      /* Example:
       *   "tuple-ref-ptrhoge"
       */
      className: 'variable',
      begin: XTLANG_FUNCTIONS_RE + VALID_XTLANG_NAME_RE,
      lexemes: VALID_XTLANG_NAME_RE
    },
    {
      /* Example:
       *   "tuple-ref-ptr"
       */
      className: 'funciton',
      begin: XTLANG_FUNCTIONS_RE,
      lexemes: VALID_XTLANG_NAME_RE
    },
    {
      /* Example:
       *  "tuple-refhoge"
       */
      className: 'variable',
      begin: XTLANG_FUNCTIONS_OVERLAP_RE + VALID_XTLANG_NAME_RE,
      lexemes: VALID_XTLANG_NAME_RE
    },
    {
      /* Example:
       *   "tuple-ref"
       */
      className: 'funciton',
      begin: XTLANG_FUNCTIONS_OVERLAP_RE,
      lexemes: VALID_XTLANG_NAME_RE
    },
    {
      /* Example:
       *   "tuplehoge"
       */
      className: 'variable',
      begin: XTLANG_FUNCTIONS_OVERLAP_RE2 + VALID_XTLANG_NAME_RE,
      lexemes: VALID_XTLANG_NAME_RE
    },
    {
      /* Example:
       *   "tuple"
       */
      className: 'funciton',
      begin: XTLANG_FUNCTIONS_OVERLAP_RE2,
      lexemes: VALID_XTLANG_NAME_RE
    }
  ]

  var DEFINE = {
    className: 'keyword',
    lexemes: VALID_SCHEME_NAME_RE,
    end: '$',
    variants : [
      {
        /* Example:
         *   "bind-lib-funchoge"
         */
        className: 'variable',
        begin: XTLANG_BIND_KEYWORDS_RE + VALID_XTLANG_NAME_RE,
      },
      {
        /* Example:
         *   "bind-lib-func"
         */
        begin: XTLANG_BIND_KEYWORDS_RE,
        relevance: 10
      },
      {
        /* Example:
         *   "bind-libhoge"
         */
        className: 'variable',
        begin: XTLANG_BIND_KEYWORDS_OVARLAP_RE + VALID_XTLANG_NAME_RE,
      },
      {
        /* Example:
         *   "bind-lib"
         */
        begin: XTLANG_BIND_KEYWORDS_OVARLAP_RE,
        relevance: 10
      },
      {
        /* Example:
         *   "definehoge"
         */
        className: 'variable',
        begin: 'define' + VALID_XTLANG_NAME_RE
      },
      {
        /* Example:
         *   "define"
         */
        begin: 'define'
      }
    ],
    contains: [
      {
        /*
         * for file path(string)
         * Example:
         *   (bind-dylib "kiss_fft.dylib")
         */
        className: 'string',
        begin: '"', end: '"',
        endsParent: true
      },
      hljs.inherit(hljs.TITLE_MODE, { begin: VALID_SCHEME_NAME_RE, endsParent: true })
    ]
  };

  var XTLANG = {
    lexemes: VALID_SCHEME_NAME_RE,
    endsParent: true,
    variants: [
    ].concat(XTLANG_KEYWORDS, XTLANG_FUNCTIONS)
  };

  var SCHEME = {
    lexemes: VALID_SCHEME_NAME_RE,
    endsParent: true,
    variants: [
    ].concat(SCHEME_KEYWORDS, SCHEME_FUNCTIONS)
  };

  var COMMON = {
    endsParent: true
  };

  var LIST = {
    variants: [
      { begin: '\\(', end: '\\)' },
      { begin: '\\[', end: '\\]' }
    ],
    contains: [DEFINE, XTLANG, SCHEME, COMMON]
  };

  COMMON.contains = [LITERAL, NUMBER, XTLANG_TYPE, STRING, QUOTED_IDENT,
                     SPECIAL_OPERATORS, QUOTED_LIST
                    ].concat(COMMON_KEYWORDS, COMMON_FUNCTIONS);
  COMMON.contains.push(IDENT, LIST);
  COMMON.contains.concat(COMMENT);

  return {
    aliases: ['xtm'],
    illegal: /\S/,
    contains: [
      SHEBANG, NUMBER, XTLANG_TYPE, STRING, QUOTED_IDENT, SPECIAL_OPERATORS, QUOTED_LIST, IDENT ,LIST
    ].concat(COMMENT)
  };
};

module.exports = function (hljs) {
  hljs.registerLanguage('xtlang', hljsDefineXtlang);
};

module.exports.definer = hljsDefineXtlang;
