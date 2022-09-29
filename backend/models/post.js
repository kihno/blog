const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        title: { type: String, required: true, maxLength: 100 },
        body: { type: String, required: true, maxLength: 100 },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        timestamp: { type: String, required: true },
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', required: true }],
        published: { type: Boolean, default: false }
    }
);

PostSchema.virtual('url').get(function() {
    return `/posts/${this._id}`;
});

PostSchema.virtual('timestamp_formatted').get(function() {
    return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_SHORT);
});

module.exports = mongoose.model('Post', PostSchema);