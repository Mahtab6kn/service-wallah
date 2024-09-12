import mongoose, { Schema } from "mongoose";

import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: {
        url: String,
        name: String,
      },
      default: {
        url: "",
        name: "",
      },
    },
    email: {
      type: String,
      unique: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "Unspecified"], // Example enum values, adjust as needed
    },
    locations: {
      type: [],
      default: [],
    },
    city: {
      type: String,
    },
    active: {
      type: Boolean,
    },
    role: {
      type: String,
      enum: ["user", "admin", "service-provider"],
    },
    serviceHistory: {
      type: [], // Assuming these are references to other documents
      default: [],
    },
    password: {
      type: String,
      required: true,
    },
    aadhar: {
      type: String,
    },
    services: {
      type: Array,
      default: [],
    },
    reviews: {
      type: [], // Assuming these are references to other documents
      default: [],
    },
    bookings: {
      type: [], // Assuming these are references to other documents
      default: [],
    },
    payments: {
      type: [], // Assuming these are references to other documents
      default: [],
    },
    messages: {
      type: [], // Assuming these are references to other documents
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(12, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
