const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

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
        .select('__v')
        .lean();
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
      const user = await User.findOneAndUpdate({ _id: req.params.userId });
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
      const user = await User.findOneAndRemove({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: 'User not found'});
      }
      return res.json({ message: 'Deleted user' });
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
      
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  async removeFriend(req, res) {
    try {
  
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
