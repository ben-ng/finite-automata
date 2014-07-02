
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
