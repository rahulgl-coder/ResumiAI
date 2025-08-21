const mongoose = require('mongoose');

const savedCandidatesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  candidateIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ]
}, { timestamps: true });



module.exports = mongoose.model("SavedCandidates", savedCandidatesSchema);
