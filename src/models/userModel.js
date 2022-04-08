/* eslint-disable func-names */
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config({ silent: true });

// User information from database
const UserSchema = new Schema({
  email: { type: Schema.Types.String, required: true, unique: true },
  password: { type: Schema.Types.String, required: true },
  firstName: { type: Schema.Types.String, required: true },
  lastName: { type: Schema.Types.String, required: true },

  // Boolean
  isHome: { type: Schema.Types.Boolean, default: true },

  // Strings
  roomCode: { type: Schema.Types.String, default: '' },
  guestType: { type: Schema.Types.String, default: '' },
  iconColor: { type: Schema.Types.String, default: 'purple' },

  // Numbers
  numGuests: { type: Schema.Types.Number, default: 0 },

  // Array
  roommates: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

// Boilerplate - password encryption --------

// Password encryption
UserSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('password')) {
    const user = this;

    bcrypt.hash(user.password, saltRounds, (error, hashedPassword) => {
      if (error) {
        next(error);
      } else {
        user.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

// Compare passwords
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
