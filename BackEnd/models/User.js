const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password_hash: { type: String, required: true },
  phone_number: { type: String, required: true },
  bank_account: {
    account_number: { type: String, required: true },
    balance: { type: Number, default: 2000 },
    transactions: [
      {
        transaction_id: String,
        amount: Number,
        date: Date,
        description: String,
      },
    ],
  },
  age: { type: Number, required: true },
  credit_score: { type: Number, default: 500 }, // Punto de partida para los usuarios
  progress: { type: Number, default: 0 }, // Progreso hacia la meta de ahorro
  created_at: { type: Date, default: Date.now },
  last_login: { type: Date },
  city: String,
  state: String,
  postal_code: String,
  country: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
