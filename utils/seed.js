const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { generateUsername, generateEmail, generateThought } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("Let's do this");
  try {
    let userCheck = await connection.db
      .listCollections({ name: "users" })
      .toArray();
    if (userCheck.length) {
      await connection.dropCollection("users");
    }

    let thoughtCheck = await connection.db
      .listCollections({ name: "thoughts" })
      .toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection("thoughts");
    }

    const users = [];
    for (let i = 0; i < 21; i++) {
      const username = generateUsername();
      const email = generateEmail(username);
      const friends = users._id;
      const user = new User({ username, email, friends });
      await user.save();
      users.push(user);
    }

    const thoughts = [];
    for (let i = 0; i < 42; i++) {
      const username = users[Math.floor(Math.random() * users.length)].username;
      const thoughtText = generateThought();
      const thought = new Thought({ username, thoughtText });
      await thought.save();
      thoughts.push(thought);
    }

    for (let user of users) {
      const userThoughts = thoughts.filter(
        (thought) => thought.username === user.username
      );
      user.thoughts = userThoughts.map((thought) => thought._id);
      const numFriends = Math.floor(Math.random() * 4) + 1;
      for (let i = 0; i < numFriends; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        if (
          !user.friends.includes(randomUser._id) &&
          user._id.toString() !== randomUser._id.toString()
        ) {
          user.friends.push(randomUser._id);
        }
      }
      await user.save();
    }

    console.log("All is well");
  } catch (error) {
    console.error("Not so well: ", error);
  } finally {
    process.exit(0);
  }
});
