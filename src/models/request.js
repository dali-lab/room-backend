import mongoose from 'mongoose';
const RequestSchema = new mongoose.Schema({
    _id: {type: String, default: 'id does not exist'},
    description: {type: String, default: 'No Description'},
    // need to reference user object, adjust when Claire/ Chelsea done
    //author: {type: Schema.types.objectID, ref: 'Author'}
    anonymous: {type: Boolean, default: false},
    // not sure what want default date to be
    end: {type: Date, default: Date.prototype.getDate},
    upvotes: {type: Number, default: 0},
    downvotes: {type: Number, default: 0},
    }, {collection: 'request'});

RequestSchema.set('toJSON', {
    virtuals: true,
});

const Request = mongoose.model('request', RequestSchema);
export default Request;

