const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentHistorySchema = new mongoose.Schema(
  {
    userId: { type:Schema.Types.ObjectId, ref: 'user', required:true  },
    payment: {
      type: Object,
    },
  },
    { timestamps: true },
);

module.exports = mongoose.model('paymentHistory', paymentHistorySchema);