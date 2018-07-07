const toString = Object.prototype.toString

export function oneOfType (validList, defaultValue) {
  let validObj = {}

  validObj.default = defaultValue
  validObj.validator = function (value) {
    if (value == null) return true

    for (let j = 0; j < validList.length; j++) {
      const currentValid = validList[j]
      let validName

      if (typeof currentValid === 'string') {
        validName = currentValid
      } else {
        validName = currentValid.name
      }
      if (toString.call(value).indexOf(validName) > -1) {
        return true
      }
    }
    return false
  }
  return validObj
}

export function oneOf (validList, defaultValue) {
  let validObj = {}

  validObj.default = defaultValue
  validObj.validator = function (value) {
    if (value == null) return true

    for (let j = 0; j < validList.length; j++) {
      if (value === validList[j]) {
        return true
      }
    }
    return false
  }
  return validObj
}
