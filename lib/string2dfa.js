
function string2dfa (str, acceptName) {
  var cur
    , def = {
        initial: 0
      , accept: [str.length]
      , transitions: {}
      }
    , i=0
    , ii=str.length

  if(acceptName) {
    for(; i<ii; ++i) {
      cur = str.charAt(i)
      def.transitions[i] = [cur, i+1]
    }
    def.transitions[i] = [cur, acceptName]
    def.transitions[acceptName] = []
  }
  else {
    for(; i<ii; ++i) {
      cur = str.charAt(i)
      def.transitions[i] = [cur, i+1]
    }
    def.transitions[i] = []
  }

  return def
}

module.exports = string2dfa
