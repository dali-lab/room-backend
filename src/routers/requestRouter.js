import { Router } from 'express';
import { requestController } from '../controllers/requestController';

const router = Router();

// get all requests and create a new request
router.route('/')
  .get(request.readAll)
  .post(request.create);
// not entirely sure how to fetch such that only shows requests which are relevant?

// fetch calendar event by id, update event by id, remove event by id
router.route('/:id')
  .get(request.read)
  .put(request.update)
  .delete(request.deleteEvent);

export default request;
