const mongoose = require("mongoose");


const storySchema = new mongoose.Schema({

  userId : {
    type: mongoose.Types.ObjectId,
    ref : 'users',
    required:true
  },

  image: {

    type: String,
    required: true
  },

    text: {
      type: String
    },

  expireAt: {
  type: Date,
  default: Date.now,
  index: { expires: '24h' },
}

});

module.exports = mongoose.model("stories",storySchema);