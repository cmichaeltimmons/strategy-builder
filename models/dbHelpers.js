const db = require('../dbConfig.js')

async function addRange(range) {
    const [id] = await db('ranges').insert(range, ['id'])
    return id
}

async function getRanges() {
    return db("ranges")
}

module.exports = {
    addRange,
    getRanges
}