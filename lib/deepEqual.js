
function deepEqual (a, b) {

  if(Object.keys(a).length != Object.keys(b).length) {
    return false
  }

  for(var k in a) {
    if(a[k] !== b[k]) {
      return false
    }
  }

  return true
}

module.exports = deepEqual
