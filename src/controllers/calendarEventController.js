import mongoose from "mongoose";
import jwt from "jwt-simple";

import { CalendarEvents } from "../models";

// import { DocumentNotFoundError, IncompleteRequestError } from '../errors';

export const create = async ({
    title,
    start,
    end,
    allDay,
    // should uid stay as uid or be author?
    uid
  }) => {
    //   if (!title) throw new IncompleteRequestError('title')
    //   if (!start) throw new IncompleteRequestError('start')
    //   if (!end) throw new IncompleteRequestError('end')
    //   if (!content) throw new IncompleteRequestError('content')
    //   if (!uid) throw new IncompleteRequestError('uid')

    // Create new calendar event and add fields
    const calendarEvent = new CalendarEvents();
    calendarEvent.title = title;
    calendarEvent.start = start;
    calendarEvent.end = end;
    calendarEvent.author = uid;
    calendarEvent.allDay = allDay;
    calendarEvent.approvals = [];

    // const savedCalendarEvent = await calendarEvent.save();

    // const owner = await userController.read(savedCalendarEvent.owner);

    return { calendarEvent: savedCalendarEvent, author }
  };
  
/**
 * Finds calendarEvent object with passed id
 *
 * @async
 * @param {mongoose.Types.ObjectId | string} id id of document to read from
 * @returns {Promise<object>} calendarEvent with passed id
 * @throws {DocumentNotFoundError} throws if no document exists with passed id
 */
 export const read = async (id) => {
  const foundCalendarEvent = await CalendarEvents
    .findById(id)
    // WHAT DOES POPULATE DO???
    .populate({ path: 'owner', select: '-password' });
  if (!foundCalendarEvent) { throw new DocumentNotFoundError(id); }
  return foundPost;
};

/**
 * Updates the selected document and saves the updated document to the database
 *
 * @async
 * @param {mongoose.Types.ObjectId | string} id id of document to update
 * @param {object} fields updates to make to the document (key:value pairs)
 * @returns {Promise<object>} calendarEvent with passed id with updated fields
 * @throws {DocumentNotFoundError} throws if no document exists with passed id
 */
 export const update = async (id, fields) => {
    const { title, start, end, allDay, approvals } = fields;
  
    const foundCalendarEvent = await read(id);
    if (!foundPost) { throw new DocumentNotFoundError(id); }
  
    if (title) foundCalendarEvent.title = title;
    if (start) foundCalendarEvent.start = start;
    if (end) foundCalendarEvent.end = end;
    if (allDay) foundCalendarEvent.allDay = allDay;
    if (approvals) foundCalendarEvent.approvals = approvals;
  
    // Can't save and populate with one "await" call
    const savedCalendarEvent = await foundCalendarEvent.save();
    return savedCalendarEvent.populate({ path: 'owner', select: '-password' });
  };

/**
 * Deletes calendarEvent based on passed id
 *
 * @async
 * @param {mongoose.Types.ObjectId | string} id id of calendarEvent to delete
 * @returns {Promise<object>} owner object of found calendarEvent
 * @throws {DocumentNotFoundError} throws if no document exists with passed id
 */
 export const remove = async (id) => {
    // Find and verify calendarEvent
    const foundCalendarEvent = await read(id);
    if (!foundCalendarEvent) { throw new DocumentNotFoundError(id); }
  
    // Find and verify valid owner (notFound handled in userController)
    // const owner = await userController.read(foundPost.owner);
    const author = await userController.read(foundCalendarEvent.author);
    
    // const savedOwner = await userController.update(owner._id, { posts: updatedPostsArr });

    await foundPost.remove();
    // return savedOwner;
    return author;
  };
  
/**
 * Returns all documents in "CalendarEvents" collection
 *
 * @async
 * @returns {Promise<object[]>} resolves array of all posts in posts collection
 */
export const readAll = async () => {
    return CalendarEvents
      .find({})
      .populate({ path: 'owner', select: '-password' });
  };
  export const tokenForUser = (uid) => {};

  /**
 * Adds uid to calendarEvents "approvals" array and returns updated calendarEvent object
 *
 * @async
 * @param {mongoose.Types.ObjectId | string} id id of calendarEvent to approve
 * @param {mongoose.Types.ObjectId | string} uid id of owner of calendarEvent
 * @returns {Promise<object>} resolves updated calendarEvent object
 * @throws {DocumentNotFoundError} throws if documents corresponding to id or uid not found
 * @throws {IncompleteRequestError} throws if uid missing from request
 */
export const addApproval = async (id, uid) => {
    const foundCalendarEvent = await read(id);
    if (!foundCalendarEvent) throw new DocumentNotFoundError(id);
  
    // Validate "uid" field
    // if (!uid) throw new IncompleteRequestError('uid');
    // await userController.read(uid); 
  
    // Is the user approving or unapproving the post?
    // const unliking = foundPost.likes.some((l) => { return l.toString() === uid; });
    const unapproving = foundCalendarEvent.approvals.some((l) => { return l.toString() === uid; });

    // Update post "likes" array
    let updatedApprovalsArr = foundCalendarEvent.approvals.slice();
  
    if (unapproving) {
        updatedApprovalsArr = updatedApprovalArr.filter((e) => { return e._id.toString() !== uid; });
    } else {
        updatedApprovalArr.push(new mongoose.Types.ObjectId(uid));
    }
  
    // Save updated approvals array to post and return saved post object
    return update(foundCalendarEvent._id, { approvals: updatedApprovalArr });
  };