var mongoose = require('mongoose');

module.exports = mongoose.model('lms', {
    text: {
        type: String,
        default: ''
    }
});