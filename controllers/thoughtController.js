const { User, Thought } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      return res.json(thoughts);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  async getOneThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      return res.json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  async postThought(req, res) {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const newThought = new Thought({
        thoughtText: req.body.thoughtText,
        username: req.body.username
      });
      const thought = await newThought.save();
      user.thoughts.push(thought._id);
      await user.save();
      return res.json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      return res.json({ message: "Update successful" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      return res.json({ message: "Deleted thought" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  async postReaction(req, res) {
    try {
      const newReaction = {
        reactionId: req.body.reactionId,
        reactionBody: req.body.reactionBody,
        username: req.body.username
      };
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: newReaction } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      return res.json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      return res.json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
