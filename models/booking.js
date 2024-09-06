import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    cartItems: {
      type: [],
      required: true,
    },
    status: {
      type: String,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    fullname: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    address: {
      type: String,
    },
    profileImage: {
      type: Object,
    },
    feedback: {
      type: String,
    },
    sendedToServiceProvider: {
      type: Boolean,
      default: false,
    },
    acceptedByServiceProvider: {
      type: Boolean,
      default: false,
    },
    paymentCompleted: {
      type: Boolean,
      default: false,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    otp: {
      type: String,
    },
    otpVerified: {
      type: Boolean,
      default: false,
    },
    paymentMethod: { type: String, required: true },
    verificationImage: {
      type: Object,
      default: {
        url: "",
        name: "",
      },
    },
    availableServiceProviders: {
      type: Array,
      default: [],
    },
    invoices: {
      type: {
        title: String,
        date: String,
        time: String,
        paymentMethod: { type: String },
        paid: { type: Boolean },
        status: { type: String },
        items: [
          {
            description: String,
            quantity: String,
            unitPrice: String,
            amount: String,
          },
        ],
        total: String,
      },
      default: {},
    },
    assignedServiceProviders: {
      type: Object,
    },
    location: {
      type: Object,
    },
    noServiceProviderAvailable: { type: Boolean, default: false },
    canceledByCustomer: { type: String, default: "" },
    serviceCompletedOtp: { type: String },
  },
  {
    timestamps: true,
  }
);

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
