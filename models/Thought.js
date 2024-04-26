const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      {
        reactionId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId(),
        },
        reactionBody: {
          type: String,
          required: true,
          maxlength: 280,
        },
        username: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        }
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

thoughtSchema.path('formattedCreatedAt').get(function() {
  return this.createdAt.toLocaleString('en-US', { timeZone: 'UTC' });
});

thoughtSchema.path('formattedReactionsdCreatedAt').get(function() {
  return this.reactions.map(reaction => reaction.createdAt.toLocaleString('en-US', { timeZone: 'UTC' }));
});

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
