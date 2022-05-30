import { CalendarEvent } from '../models';

const create = async (req, res) => {
  try {
    const newCalendarEvent = await CalendarEvent.create(req.body);
    res.status(200).json(newCalendarEvent);
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * Finds calendarEvent object with passed id
 */
const read = async (req, res) => {
  try {
    const foundCalendarEvent = await CalendarEvent
      .findById(req.params.id)
      .populate('approvals')
      .populate('author');
    console.log(foundCalendarEvent);
    res.status(200).json(foundCalendarEvent);
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * Updates the selected document and saves the updated document to the database
 */
const update = async (req, res) => {
  try {
    const updatedCalendarEvent = await CalendarEvent
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('author')
      .populate('approvals');
    res.status(200).json(updatedCalendarEvent);
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * Deletes calendarEvent based on passed id
 */
const deleteEvent = async (req, res) => {
  try {
    await CalendarEvent.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'delete success' });
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * Returns all documents in "CalendarEvents" collection
 */
const readAll = async (req, res) => {
  try {
    const allEvents = await CalendarEvent
      .find({ author: { $in: req.query.userIds } })
      .populate('author')
      .populate('approvals');
    res.status(200).json(allEvents);
  } catch (error) {
    res.status(500).json(error);
  }
};

const calendarEventController = {
  create,
  read,
  update,
  deleteEvent,
  readAll,
};

export default calendarEventController;
