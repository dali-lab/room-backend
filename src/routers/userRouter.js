import { Router } from 'express';
import { userController } from '../controllers';
// import { requireAuth, requireSignin } from '../authentication';

const router = Router();

router.route('/')
  .get(userController.readAll);

router.route('/signin')
  .post(userController.signin);

router.route('/signup')
  .post(userController.signup);

router.route('/:id')
  .get(userController.read)
  .put(userController.update)
  .delete(userController.remove);

export default router;
