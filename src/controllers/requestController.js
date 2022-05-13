import Request from '../models/requestModel';

// create request
const create = async (req, res) => {
  try {
    const newRequest = await Request.create(req.body);
    res.status(200).json(newRequest);
  } catch (error) {
    res.status(500).json(error);
  }
};
// read request with particular idea
const read = async (req, res) => {
  try {
    const foundRequest = await Request
      .findById(req.params.id)
      .populate('author')
      .populate('recipients');
    console.log(foundRequest);
    res.status(200).json(foundRequest);
  } catch (error) {
    res.status(500).json(error);
  }
};
// update request; updates selected request
const update = async (req, res) => {
  try {
    const updatedRequest = await Request
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('author')
      .populate('recipients');
    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json(error);
  }
};
// delete request
const deleteRequest = async (req, res) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'delete success' });
  } catch (error) {
    res.status(500).json(error);
  }
};

// get requests
const readAll = async (req, res) => {
  try {
    const userRequests = await Request
      .find({ $or: [{ author: req.query.userId }, { recipients: { $all: [req.query.userId] } }] })
      .populate('author')
      .populate('recipients');
    res.status(200).json(userRequests);
  } catch (error) {
    res.status(500).json(error);
  }
};

const requestController = {
  create,
  read,
  update,
  deleteRequest,
  readAll,
  // getForUser,
};

export default requestController;
