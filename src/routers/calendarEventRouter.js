import { Router } from 'express';

const router = Router();

// get all calendar events and create new calendar event
router.route('/').get().post();

// fetch calendar event by id, update event by id, remove event by id
router.route("/:id").get().put().delete();

// events for a given user?? router.route('/user/:uid')

// edit approvals on a post for a passed uid
router.route('/approvals/:id').post();

export default router;