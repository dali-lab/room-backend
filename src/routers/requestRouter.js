import { Router } from 'express';
import requestController from '../controllers/requestController';

const router = Router();

// get all requests and create a new request
router.route('/')
  .get(requestController.readAll)
  .post(requestController.create);
// not entirely sure how to fetch such that only shows requests which are relevant?

// fetch request by id, update request by id, remove request by id
router.route('/:id')
  .get(requestController.read)
  .put(requestController.update)
  .delete(requestController.deleteRequest);

export default router;
