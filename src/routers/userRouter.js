import { Router } from 'express';

import { userController } from '../controllers';

import { requireAuth } from '../authentication';
import { getSuccessfulDeletionMessage } from '../utils/constants';

const router = Router();

router.use(requireAuth);

// find and return all users
router.route('/')
  .get(async (_req, res, next) => {
    try {
      const users = await userController.readAll();
      return res.status(200).json(users);
    } catch (error) {
      return next(error);
    }
  });

// * User creation handled by authRouter's "/signin" route

router.route('/:id')
  .get(async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userController.read(id);
      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  })

  .put(async (req, res, next) => {
    try {
      const { id } = req.params;

      const {
        email, username, password, firstName, lastName, roomCode, roommates, numGuests, guestType, iconColor, isHome, // ! Only allow these fields to be updated
        authPassword, // Credential field for verifying password update
      } = req.body;

      // Limit updating to the fields passed in this function (e.g. no `isAdmin` updates via this endpoint)
      const user = await userController.update(id, {
        email, username, password, firstName, lastName, roomCode, roommates, numGuests, guestType, iconColor, isHome
      }, authPassword);

      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  })

  .delete(async (req, res, next) => {
    try {
      const { id } = req.params;
      await userController.remove(id);
      return res.status(200).json({ message: getSuccessfulDeletionMessage(id) });
    } catch (error) {
      return next(error);
    }
  });

export default router;
