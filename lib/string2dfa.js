
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
