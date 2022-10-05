const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: { type: String, required: true, maxLength: 100 },
        email: { type: String, required: true },
        password: { type: String, required: true },
        admin: { type: Boolean, default: false }
    },
    { timestamps: true },
);

UserSchema.statics.findByLogin = async function(login) {
    let user = await this.findOne({ username: login });

    if (!user) {
        user = await this.findOne({ email: login });
    }

    return user;
};

UserSchema.pre('remove', function(next) {
    this.model('Post').deleteMany({ user: this._id });
    this.model('Comment').deleteMany({ user: this._id }, next);
});

UserSchema.virtual('url').get(function() {
    return `/members/${this._id}`;
});

module.exports = mongoose.model('User', UserSchema);