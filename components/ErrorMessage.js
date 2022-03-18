// Error messages that are used in the functions to
// return errors that contain a code and a message
class ErrorMessage extends Error {
  constructor (message, code) {
    super(message)
    this.code = code
  }
}

export default ErrorMessage
