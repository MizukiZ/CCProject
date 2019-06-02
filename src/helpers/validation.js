export function numberValidation(n) {
  const reg = /^(?:[1-9]\d*|0)?(?:\.\d+)?$/
  if (reg.test(n) === false) {
    return false
  } else {
    return true
  }
}
