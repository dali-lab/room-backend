/* eslint-disable func-names */
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
  email: { type: Schema.Types.String, required: true, unique: true },
  username: { type: Schema.Types.String, required: true, unique: true },
  password: { type: Schema.Types.String, required: true },
  firstName: { type: Schema.Types.String, required: true },
  lastName: { type: Schema.Types.String, required: true },

  // Boolean
  isHome: { type: Schema.Types.Boolean, default: true },

  // Strings
  roomCode: { type: Schema.Types.String, default: '' },
  guestType: { type: Schema.Types.String, default: '' },
  iconColor: { type: Schema.Types.String, default: '' },

  // Array
  posts: [{ type: Schema.Types.ObjectId, ref: 'User' }],

  accountCreated: { type: Schema.Types.Date, default: Date.now() },
}, {
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
});

const saltRounds = process.env.SALT_ROUNDS;

// Add a preprocessing function to the user's save function to hash password before saving
UserSchema.pre('save', function (next) {
  // Check if password needs to be rehashed
  if (this.isNew || this.isModified('password')) {
    const document = this; // Save reference to current scope

    // Hash and save document password
    bcrypt.hash(document.password, saltRounds, (error, hashedPassword) => {
      if (error) {
        next(error);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

// Add a method to the user model to compare passwords
// Boolean "same" returns whether or not the passwords match to callback function
UserSchema.methods.comparePassword = function (password, done) {
  bcrypt.compare(password, this.password, (error, same) => {
    if (error) {
      done(error);
    } else {
      done(error, same);
    }
  });
};

UserSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
