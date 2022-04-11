import { Router } from 'express';
import requestController from '../controllers/requestController';
// import { requireAuth } from '../authentication';

const router = Router();

// get all requests and create a new request
router.route('/')
  .get(requestController.readAll)
  .post(requestController.create);

// fetch request by id, user id serves as filler for path differentiation
router.route('/:userId/:id')
  .get(requestController.read);

// fetch requests for specific user if fed user id
// if fed request id, delete and update
router.route('/:id')
  .get(requestController.getForUser)
  .put(requestController.update)
  .delete(requestController.deleteRequest);

export default router;
