const moongoose = require('mongoose');

const appConfigSchema = new moongoose.Schema(
  {
    name: {
      type: String,
    },
    version: {
      type: String,
    },
    happyClients: {
      type: Number,
    },
    country: {
      type: Number,
    },
    downloads: {
      type: Number,
    },
  },
  {
    collection: 'app_config',
  }
);

module.exports = moongoose.model('AppConfig', appConfigSchema);
