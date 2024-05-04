const { Thought, User } = require('../models');

const deleteUserContent = async (userId) => {
  try {
    const user = await User.findById(userId);
    const username = user.username;
    await Thought.updateMany({ "reactions.username": username }, { $pull: { reactions: { username: username } } });
    await Thought.deleteMany({ username: username });
    await User.updateMany({ friends: userId }, { $pull: { friends: userId } });
    return { message: "Deleted User thoughts and reactions" };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to delete User thoughts and reactions");
  }
};

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  async getOneUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
      if (!user) {
        return res.status(404).json({ message: 'User not found'});
      }
      return res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      return res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'User not found'});
      }
      return res.json({ message: 'Update successful' });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      await deleteUserContent(req.params.userId);
      const user = await User.findOneAndRemove({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: 'User not found'});
      }
      return res.json({ message: 'Deleted user, thoughts, and reactions' });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body.userId }},
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'User not found'});
      }
      return res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'User not found'});
      }
      return res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
