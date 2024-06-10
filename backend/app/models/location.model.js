const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
    {
        latitude: {
            type: String, required: true, trim: true
        },
        longitude: {
            type: String, required: true, trim: true
        }
    },
    {
        versionKey: false
    }
);

const LocationSchema = mongoose.model('Location', locationSchema);

module.exports = LocationSchema;