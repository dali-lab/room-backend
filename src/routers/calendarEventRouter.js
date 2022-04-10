import { Router } from 'express';
import { calendarEventController } from '../controllers';
// import { requireAuth } from '../authentication';

const router = Router();

// get all calendar events and create new calendar event
router.route('/')
  .get(calendarEventController.readAll)
  .post(calendarEventController.create);

// fetch calendar event by id, update event by id, remove event by id
router.route('/:id')
  .get(calendarEventController.read)
  .put(calendarEventController.update)
  .delete(calendarEventController.deleteEvent);

export default router;
