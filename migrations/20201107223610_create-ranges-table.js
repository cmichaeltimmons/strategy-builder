
exports.up = function(knex) {
  return knex.schema.createTable('ranges', tbl => {
    tbl.increments()
    tbl.text('name')
    tbl.text('range')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExsists('ranges')
};
