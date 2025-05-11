const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: "User"
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
