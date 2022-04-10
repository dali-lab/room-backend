import mongoose, { Schema } from 'mongoose';

const RequestSchema = new Schema({
  description: { type: String, default: 'No Description' },
  // need to reference user object, adjust when Claire/ Chelsea done
  // author: {type: Schema.types.objectID, ref: 'Author'}
  anonymous: { type: Boolean, default: false },
  // recipients: [{ type: Schema.types.ObjectId, ref: 'User' }],
  // not sure what want default date to be
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
