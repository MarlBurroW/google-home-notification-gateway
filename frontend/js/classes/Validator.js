class Validator {
  constructor () {
    this.validationErrors = null
  }

  setErrorsFromResponse (response) {
    this.validationErrors = response.data.validation_errors
  }

  hasError (fieldName) {
    if (this.validationErrors) {
      if (this.getError(fieldName)) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  reset () {
    this.validationErrors = null
  }

  getErrorsText (fieldName) {
    const errors = this.getErrors(fieldName)
    if (errors.length > 0) {
      return errors.map((error) => error.message)
    } else {
      return []
    }
  }

  getErrors (fieldName) {
    if (this.validationErrors) {
      return this.validationErrors.filter((error) => { return error.path === fieldName })
    } else {
      return []
    }
  }
}

export default Validator
