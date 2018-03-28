class ApiError extends Error {
  constructor (response) {
    if (response.data && response.data.message) {
      super(response.data.message)
    } else if (!response.ok) {
      super(response.problem)
    } else {
      super('Unkown error')
    }

    this.response = response
    this.isValidationError = this.response.status === 422
    this.isForbidden = this.response.status === 403
    this.isNotFound = this.response.status === 404
    this.isUnauthorized = this.response.status === 401
  }
}

export default ApiError
