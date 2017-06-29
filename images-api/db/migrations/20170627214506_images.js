
exports.up = function(knex, Promise) {
  return knex.schema.createTable('images', table => {
      table.string('id').unique().notNullable();
      table.timestamp('createdAt').notNullable().defaultTo(knex.raw('now()'));
      table.integer('userId').notNullable();
      table.string('label').notNullable();
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('images');
};
