import { Router } from 'express';
import { calendarEventController } from '../controllers';
import { requireAuth } from '../authentication';

const router = Router();

// get all calendar events and create new calendar event
router.route('/')
  .get(requireAuth, calendarEventController.readAll)
  .post(requireAuth, calendarEventController.create);

// fetch calendar event by id, update event by id, remove event by id
router.route('/:id')
  .get(requireAuth, calendarEventController.read)
  .put(requireAuth, calendarEventController.update)
  .delete(requireAuth, calendarEventController.deleteEvent);

export default router;
