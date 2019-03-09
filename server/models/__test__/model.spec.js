import User from "../user";
import knex from "../../config/db";
import Todo from "../todo";

beforeEach(async function() {
  await knex.migrate.rollback();
  return await knex.migrate.latest();
});
afterEach(async () => {
  return await knex.migrate.rollback();
});

describe("User Model Test", () => {
  it("should create an instance of user", async () => {
    const userInstance = await new User({
      email: "obasajujoshua31@gmail.com",
      password: "123244",
      verified: false
    }).save();
    expect(userInstance).toBeInstanceOf(User);
    expect(Object.keys(userInstance.attributes).length).toBe(5);
  });
  describe("Todo Model Test", () => {
    it("should create an instance of todo", async () => {
      const userInstance = await new User({
        email: "obasajujoshua31@gmail.com",
        password: "123244",
        verified: false
      }).save();

      const userId = userInstance.get("id");
      const todo = await new Todo({
        user_id: userId,
        task: "I want to eat"
      }).save();
      expect(todo).toBeInstanceOf(Todo);
      expect(Object.keys(todo.attributes).length).toBe(5);
    });
    it("should delete todo when the user table is deleted", async () => {
      const userInstance = await new User({
        email: "obasajujoshua31@gmail.com",
        password: "123244",
        verified: false
      }).save();
      const userId = userInstance.get("id");
      await new Todo({
        user_id: userId,
        task: "I want to eat"
      }).save();
      User.forge({
        email: "obasajujoshua31@gmail.com"
      })
        .fetch({ withRelated: ["todos"] })
        .then(function(user) {
          return user
            .related("todos")
            .invokeThen("destroy")
            .then(function() {
              return user.destroy().then(function() {
                return Todo.forge({
                  user_id: userId
                })
                  .fetch()
                  .then(function(todo) {
                    expect(todo).toBe(null);
                  });
              });
            });
        });
    });
  });
});
