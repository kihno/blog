const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        body: { type: String, required: true, maxLength: 100 },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        timestamp: { type: String, required: true },
    }
);

CommentSchema.virtual('url').get(function() {
    return `/comments/${this._id}`;
});

CommentSchema.virtual('timestamp_formatted').get(function() {
    return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_SHORT);
});

module.exports = mongoose.model('Comment', CommentSchema);