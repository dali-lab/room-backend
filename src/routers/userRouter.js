import { Router } from 'express';
import { userController } from '../controllers'; // will be added later by Claire
import { requireAuth, requireSignin } from '../authentication';

const router = Router();

router.route('/')
  .get(requireAuth, userController.readAll);

router.route('/signin')
  .post(requireSignin, userController.signin);

router.route('/signup')
  .post(userController.signup);

router.route('/:id')
  .get(requireAuth, userController.read)
  .put(requireAuth, userController.update)
  .delete(requireAuth, userController.remove);

export default router;
