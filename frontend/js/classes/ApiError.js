class ApiError extends Error {
  constructor (response) {
    super(response.data.message)
    this.response = response
  }

  getResponse () {
    return this.response
  }

  isValidationError () {
    return this.response.status === 422
  }
}

export default ApiError
