const mongoose = require('mongoose')
const { Schema } = mongoose
mongoose.connect('mongodb://localhost:27017/edu')

const advertSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    create_time: {
        type: Date,
        default: Date.now
    },
    last_modified: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Advert', advertSchema)