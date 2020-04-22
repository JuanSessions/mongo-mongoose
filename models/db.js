const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const file = new FileSync('./models/db.json')
const db = low(file)

// Set some defaults
// db.defaults({
//         records: []
//     })
//     .write()


module.exports = db