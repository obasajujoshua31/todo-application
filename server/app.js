import User from "./models/user";
import Todo from "./models/todo";

// User.where("email", "obasaju")
//   .fetch({ withRelated: ["todos.user_id"] })
//   .then(function(user) {
//     console.log(user);
//   });
// Todo.where("task", "i am eating")
//   .fetch()
//   .then(function(user) {
//     console.log(user);
//   });
// new User({
//   email: "obasajujoshua31@gmail.com",
//   password: "electrical",
//   verified: "true"
// })
//   .save()
//   .then(user => {
//     console.log("userrrr", user);
//   })
//   .catch(error => {
//     console.log(error);
//   });

User.where("email", "obasajujoshua31@gmail.com")
  .fetch()
  .then(user => {
    console.log(user.isMatch("electrical"));
  })
  .catch(error => {
    console.lo(error);
  });
