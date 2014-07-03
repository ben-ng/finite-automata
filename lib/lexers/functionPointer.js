
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
