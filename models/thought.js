const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const repliesSchema = new Schema(
    {
      
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (newDate) => dateFormatter(newDate),
      },
    },
    {
      toJSON: {
        getters: true,
      },
    }
  );
  
  const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (newDate) => dateFormatter(newDate),
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [repliesSchema],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );
  
  //  Get total # of reactions
  ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });
  
  const Thought = model("thought", thoughtSchema);
  
  module.exports = thought;