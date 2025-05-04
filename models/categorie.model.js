const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorieSchema = new Schema(
	{
		nom: {
			type: String,
			required: true,
			unique: true,
		},
		image: {
			type: String,
			default: null,
		},
		color: {
			type: String,
			default: null,
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
		idParent: {
			type: Schema.Types.ObjectId,
			ref: 'categorie',
			default: null,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('categorie', CategorieSchema);
