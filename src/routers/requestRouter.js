import { Router } from 'express';
import requestController from '../controllers/requestController';
import { requireAuth } from '../authentication';

const router = Router();

// get all requests and create a new request
router.route('/')
  .get(requireAuth, requestController.readAll)
  .post(requireAuth, requestController.create);

// get update and delete for specific request
router.route('/:id')
  .get(requireAuth, requestController.read)
  .put(requireAuth, requestController.update)
  .delete(requireAuth, requestController.deleteRequest);

export default router;
