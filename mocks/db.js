export default {
  /**
   * @name connect
   * @param {string} dbURI | a connection string for connecting to the database
   * @param {() => void} cb | a callback that handles errors and the expected results of the operation
   * @param {boolean} [err=false] | a boolean representing whether to simulate an error
   * @returns {Object | string}
   * @description a function to 'connect' to the mock database
   */
  connect: (dbURI, cb, err = false) => {
    setTimeout(() => {
      if (err)
        return cb({
          message: 'an error occurred connecting to the database',
        })

      return cb(null, `successfully connected to ${dbURI}`)
    }, 1000)
  },

  /**
   * @name create
   * @param {Object} data | the document that is added to the database
   * @param {() => void} cb | a callback that handles errors and the expected results of the operation
   * @param {boolean} [err=false] | a boolean representing whether to simulate an error
   * @returns {Object}
   * @description a function to 'create' a document in the mock database
   */
  create: (data, cb, err = false) => {
    setTimeout(() => {
      if (err)
        return cb({
          message: 'an error occurred saving to the database',
        })

      return cb(null, { ...data, _id: '64bfb28d8c8f1a6e42d0c1e3' })
    }, 2000)
  },
}
