const mongoose = require('mongoose');

const SettingModel = new mongoose.Schema({
  product_return_type: {
    type: String,
    default: 'full', //full | halt | tip
  },
  objective: {
    type: Number,
    default: 120000,
  },
  travail_pour: {
    type: String,
  },
  numberOfTables: {
    type: Number,
    default: 10000,
  },
  hasStock: {
    type: Boolean,
    default: false,
  },
  hasSubCategories: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Setting', SettingModel);
