// eslint-disable-next-line no-unused-vars
import mongoose from 'mongoose';
import jwt from 'jwt-simple';
import validator from 'email-validator';
import { User } from '../models';

/* generates JWT authentication token for user based on uid passed in */
const tokenForUser = (uid) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: uid, iat: timestamp }, process.env.AUTH_SECRET);
};

/* creates new user and saves their data to the database */
const signup = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    roomCode,
  } = req.body;

  /* check that the user has filled in all of the required fields */
  if (!email || !validator.validate(email)) {
    return res.status(422).send('You must provide an email.');
  }
  if (!password) {
    return res.status(422).send('You must provide a password.');
  }
  if (!firstName) {
    return res.status(422).send('You must provide a first name.');
  }
  if (!lastName) {
    return res.status(422).send('You must provide a last name.');
  }

  /* check if email address is taken */
  const emailisTaken = !!(await User.findOne({ email }));
  if (emailisTaken) { return res.status(422).send('An account with this email already exists.'); }

  /* make a new user from passed in data */
  /* added info from database here */

  try {
    const newUser = await User.create({
      email: email.toLowerCase(),
      password,
      firstName,
      lastName,
      roomCode,
    });
    return res.status(200).json({ newUser, token: tokenForUser(newUser._id) });
  } catch (error) {
    return res.status(500).json(error);
  }
};

/* signs user in */
const signin = async (req, res) => {
  try {
    const foundUser = await User
      .findOne({ email: req.body.email })
      .populate('roommates');
    res.status(200).send({ token: tokenForUser(foundUser), user: foundUser });
  } catch (error) {
    res.status(500).json(error);
  }
};

/* returns user document with passed id */
const read = async (req, res) => {
  try {
    const foundUser = await User
      .findById(req.params.id)
      .populate('roommates');
    res.status(200).json(foundUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

/* updates user document with passed id */
const update = async (req, res) => {
  try {
    const updatedUser = await User
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('roommates');
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

/* removes user document with passed id */
const remove = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'delete success' });
  } catch (error) {
    res.status(500).json(error);
  }
};

/* returns all documents in "users" collection */
const readAll = async (req, res) => {
  try {
    const allEvents = await User
      .find(req.query)
      .populate('roommates');
    res.status(200).json(allEvents);
  } catch (error) {
    res.status(500).json(error);
  }
};

const userController = {
  signup,
  signin,
  read,
  update,
  remove,
  readAll,
};

export default userController;
