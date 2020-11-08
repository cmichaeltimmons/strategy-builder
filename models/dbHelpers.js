const db = require('../dbConfig.js')

async function addRange(range) {
    const [id] = await db('ranges').insert(range)
    return id
}

module.exports = {
    addRange
}