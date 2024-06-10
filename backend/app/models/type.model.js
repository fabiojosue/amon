const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema(
    {
        name: {
            type: String, required: true, trim: true
        },
        weight: {
            type: String, required: true, trim: true
        }
    },
    {
        versionKey: false
    }
);

const TypeSchema = mongoose.model('Type', typeSchema);

module.exports = TypeSchema;