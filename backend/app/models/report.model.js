const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
    {
        location: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Location'
        },
        type: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Type'
        },
        registerDate:{
            type: String, required: true, trim: true
        }
    },
    {
        versionKey: false
    }
);

const ReportSchema = mongoose.model('Report', reportSchema);

module.exports = ReportSchema;