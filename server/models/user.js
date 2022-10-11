const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

UserSchema.pre('save', async function(next) { 
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);

    user.password = hash;
    next();
});

UserSchema.statics.findByLogin = async function(login) {
    let user = await this.findOne({ username: login });

    if (!user) {
        user = await this.findOne({ email: login });
    }

    return user;
};

UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
};

UserSchema.pre('remove', function(next) {
    this.model('Post').deleteMany({ user: this._id });
    this.model('Comment').deleteMany({ user: this._id }, next);
});

UserSchema.virtual('url').get(function() {
    return `/members/${this._id}`;
});

module.exports = mongoose.model('User', UserSchema);