const connection = require("../config/connection");
const { User, Thought } = require("../models");
const {
  randomUser,
  randomThought,
  randomFriends,
} = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("Let's do this");
  let userCheck = await connection.db
    .listCollections({ name: "user" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("user");
  }

  let thoughtCheck = await connection.db
    .listCollections({ name: "thought" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thought");
  }

  let users = [];

  for (let i = 0; i < 21; i++) {
    const user = randomUser();
    const friends = randomFriends();

    users.push({ user, friends });
  }

  let thought = [];

  for (let i = 0; i < 21; i++) {
    const thoughts = randomThought(4);
    thought.push(thoughts);
  }

  await User.insertMany(users);
  await Thought.insertMany(thought);

  console.table(users);
  console.table(thought);
  console.info("It worked");
  process.exit(0);
});
