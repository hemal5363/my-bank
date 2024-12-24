import mongoose, { Schema } from "mongoose";

const Account = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    trim: true,
  },
  type: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  _userAccount: {
    type: Schema.Types.ObjectId,
    ref: "UserAccount",
  },
});

export default mongoose.models.Account || mongoose.model("Account", Account)
