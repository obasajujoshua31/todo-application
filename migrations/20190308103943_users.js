exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema
      .createTable("users", table => {
        table.uuid("id").unique();
        table.string("email").unique();
        table.string("password");
        table.boolean("verified");
        table.timestamps();
        table.index(["email"], "email_idx");
      })
      .createTable("todos", table => {
        table.uuid("id");
        table.string("task");
        table.boolean("completed");
        table.timestamps();
        table.uuid("user_id").references("users.id");
        table.index(["task", "completed"], "task_idx");
      })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.raw("DROP TABLE users CASCADE"),
    knex.raw("DROP TABLE todos CASCADE")
  ]);
};
