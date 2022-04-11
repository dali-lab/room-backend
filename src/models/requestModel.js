import mongoose, { Schema } from 'mongoose';

const RequestSchema = new Schema({
  description: { type: String, default: 'No Description' },
  author: { type: Schema.Types.ObjectID, ref: 'User' },
  anonymous: { type: Boolean, default: false },
  recipients: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  end: { type: Date, default: Date.prototype.getDate },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

const RequestModel = mongoose.model('Request', RequestSchema);
export default RequestModel;
