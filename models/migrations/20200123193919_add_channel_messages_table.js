exports.up = function(knex, Promise) {
  // create the 'users' table with three columns
  return knex.schema.createTable("channel_messages", (t) => {
    t.increments() // auto-incrementing id column
      .index(); // index this column

    t.string("channel_id")
      .references("name")
      .inTable("channels");

    t.string("from_id")
      .references("username")
      .inTable("users");

    t.string("message", 50) // maximum length of 50 characters
      .notNullable(); // add a not-null constraint to this column

    t.timestamp("sent_at")
      // .notNullable()
      .defaultTo(knex.fn.now()); // default to the current time
  });
};

exports.down = function(knex, Promise) {
  // undo this migration by destroying the 'users' table
  return knex.schema.dropTable("channel_messages");
};
