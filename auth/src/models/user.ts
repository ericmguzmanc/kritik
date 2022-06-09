import mongoose from 'mongoose';
import { PasswordHasher } from '../util/PasswordHasher';

interface UserAttrs {
  name: string,
  email: string;
  password: string;
}

interface UserDoc extends mongoose.Document {
  name: string;
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,

    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
    },
    passwordResetToken: String,
    passwordResetExpires: Date
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password
      },
      versionKey: false,
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await PasswordHasher.toHash(this.get('password'));
    this.set('password', hashed);
  }
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
