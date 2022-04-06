import mongoose, { Schema } from 'mongoose';

const CalendarEventSchema = new Schema({
  title: { type: Schema.Types.String, default: '' },
  start: { type: Schema.Types.Date, default: Date.now() },
  end: { type: Schema.Types.Date, default: Date.now() },
  // author: { type: Schema.Types.ObjectId, ref: 'User' },
  allDay: { type: Schema.Types.Boolean, default: false },
  // approvals: [{ type: Schema.Types.Object, ref: 'User' }],
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

const CalendarEventModel = mongoose.model('CalendarEvent', CalendarEventSchema, 'events');

export default CalendarEventModel;
