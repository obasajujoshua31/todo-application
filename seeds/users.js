const faker = require("faker");

let createRecord = knex => {
  return knex("users").insert({
    email: faker.internet.email(),
    password: faker.internet.password(5, true)
  });
};

exports.seed = function(knex, Promise) {
  return knex("users")
    .del()
    .then(() => {
      let records = [];
      for (let i = 0; i < 10; i++) {
        records.push(createRecord(knex));
      }
      return Promise.all(records);
    });
};
