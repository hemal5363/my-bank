import mongoose, { Schema } from "mongoose";

const AccountHistory = new Schema({
  amount: {
    type: Number,
    required: true,
    trim: true,
  },
  newAmount: {
    type: Number,
    required: true,
    trim: true,
  },
  isCredited: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  _account: {
    type: Schema.Types.ObjectId,
    ref: "Account",
  },
  _expenseType: {
    type: Schema.Types.ObjectId,
    ref: "ExpenseType",
  },
});

export default mongoose.models.AccountHistory ||
  mongoose.model("AccountHistory", AccountHistory);
