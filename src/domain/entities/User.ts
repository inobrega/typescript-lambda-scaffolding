import { Schema, Document, model } from 'mongoose';

interface User extends Document {
  email: string;
  name: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

userSchema.pre('save', function(next) {
  if (this.isNew || this.isModified()) {
    this.updatedAt = new Date();
  }
  next();
});

const UserModel = model<User>('User', userSchema);

export { User, UserModel };
