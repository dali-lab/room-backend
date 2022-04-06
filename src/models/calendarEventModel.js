import mongoose, { Schema } from "mongoose";


const ResourceSchema = new Schema({
    title: { type: Schema.Types.String, default: '' },
    // default for date?? currently now
    start: { type: Schema.Types.Date, default: Date.now() },
    end: { type: Schema.Types.Date, default: Date.now() },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    allDay: { type: Schema.Types.Boolean, default: false },
    approvals: [{ type: Schema.Types.Object, ref: 'User' }],
  });


// add ResourceSchema.post() for changes in approvals??

// need anything else here?



const CalendarEventModel = mongoose.model('Calendar', ResourceSchema);

export default CalendarEventModel;