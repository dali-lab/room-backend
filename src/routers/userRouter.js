import { Router } from 'express';
import { userController } from '../controllers';
import { requireAuth, requireSignin } from '../authentication';

const router = Router();

router.route('/')
  .get(requireAuth, userController.readAll);

router.route('/signin')
  .post(requireSignin, userController.signin);

router.route('/signup')
  .post(userController.signup);

router.route('/reset-password')
  .put(userController.resetPassword);

router.route('/reset-password/:password')
  .put(userController.resetPassword);

router.route('/:id')
  .get(requireAuth, userController.read)
  .put(requireAuth, userController.update)
  .delete(requireAuth, userController.remove);

// router.route('room/:roomcode')
//   .get(requireAuth, userController.read);

export default router;
