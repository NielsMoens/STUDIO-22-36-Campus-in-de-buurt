const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const roles = {
    superadmin: 'superadmin',
    admin: 'admin',
}

// schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: [roles.user, roles.admin, roles.superadmin],
        default: roles.user,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    }
});

userSchema.pre(['remove', 'deleteMany'] , function() {
    const user = this;
    return LikedMovie.remove({userId: user._id});
});

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }

    try {
        bcrypt.hash(user.password, 10, function (err, hash) {
            if(err) {
                throw err;
            }
            user.password = hash;
            return next();
        });

    } catch (err) {
        return next(err);
    }
});

userSchema.methods = {
    comparePassword: function(password) {
        const user = this;
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(isMatch) {
                    resolve(true);
                } else {
                    reject(err);
                }
            })
        });
    },
    createToken : function() {
        const user = this;
        return jwt.sign({_id:user.id}, process.env.JWT_SECRET, {
            expiresIn: 60 *120,
        });
    },
    isAdmin: function() {
        if(this.role === roles.superadmin) {
            return this.role === roles.superadmin
        }
        return this.role === roles.admin;
    }
};

const User = mongoose.model('User', userSchema);

// model
module.exports = {
    User,
    userSchema,
    roles,
}