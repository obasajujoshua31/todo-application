import User from "../user";
import knex from "../../config/db";
import Todo from "../todo";

beforeEach(async () => {
  await knex.migrate.rollback();
  await knex.migrate.latest();
});
afterEach(async () => {
  await knex.migrate.rollback();
});

describe("User Model Test", () => {
  it("should create an instance of user", async () => {
    const userInstance = await new User({
      email: "obasajujoshua31@gmail.com",
      password: "123244",
      verified: false
    }).save();
    expect(userInstance).toBeInstanceOf(User);
    expect(Object.keys(userInstance.attributes)).toHaveLength(6);
  });

  describe("Todo Model Test", () => {
    it("should create an instance of todo", async () => {
      const userInstance = await new User({
        email: "obasajujoshua31@gmail.com",
        password: "123244"
      }).save();

      const userId = userInstance.get("id");
      const todo = await new Todo({
        user_id: userId,
        task: "I want to eat"
      }).save();
      expect(todo).toBeInstanceOf(Todo);
      expect(Object.keys(todo.attributes)).toHaveLength(5);
    });
    it("should delete todo when the user table is deleted", async () => {
      const userInstance = await new User({
        email: "obasajujoshua31@gmail.com",
        password: "123244"
      }).save();

      const userId = userInstance.get("id");
      await new Todo({
        user_id: userId,
        task: "I want to eat"
      }).save();

      User.forge({
        email: "obasajujoshua31@gmail.com"
      })
        .fetch({ withRelated: "todos" })
        .then(user => user.destroy())
        .then(() => {
          return Todo.forge({
            user_id: userId
          })
            .fetch()
            .then(todo => {
              expect(todo).toBe(null);
            });
        });
    });
  });
});
