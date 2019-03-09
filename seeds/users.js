const faker = require("faker");
const uuid = require("uuid");

let createRecord = knex => {
  return knex("users").insert({
    id: uuid.v4(),
    email: faker.internet.email(),
    password: faker.internet.password(5, true)
  });
};

exports.seed = function(knex, Promise) {
  return knex("users")
    .del()
    .then(function() {
      let records = [];
      for (let i = 0; i < 10; i++) {
        records.push(createRecord(knex));
      }
      return Promise.all(records);
    });
};
