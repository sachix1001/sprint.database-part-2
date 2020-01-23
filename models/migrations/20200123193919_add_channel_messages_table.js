exports.up = function(knex, Promise) {
  // create the 'users' table with three columns
  return knex.schema.createTable("channel_messages", (t) => {
    t.increments() // auto-incrementing id column
      .index(); // index this column

    t.integer("channelId")
      .foreign("id")
      .references("channels");

    t.integer("fromId")
      .foreign("id")
      .references("users");

    t.string("message", 50) // maximum length of 15 characters
      .notNullable(); // add a not-null constraint to this column

    t.integer("sentAt")
      .foreign("id")
      .references("users");

    //   t.timestamp("created_at")
    //     .notNullable()
    //     .defaultTo(knex.fn.now()); // default to the current time
  });
};

exports.down = function(knex, Promise) {
  // undo this migration by destroying the 'users' table
  return knex.schema.dropTable("channel_messages");
};
