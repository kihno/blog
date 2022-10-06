const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        title: { type: String, required: true, maxLength: 100 },
        text: { type: String, required: true, maxLength: 100 },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        timestamp: { type: String, default: Date() },
        published: { type: Boolean, default: false },
    },
    { timestamps: true },
);

PostSchema.virtual('url').get(function() {
    return `/posts/${this._id}`;
});

PostSchema.virtual('timestamp_formatted').get(function() {
    return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_SHORT);
});

module.exports = mongoose.model('Post', PostSchema);