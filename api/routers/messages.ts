import {Router} from 'express';
import {message, messageWithoutId} from '../types';
import fileDb from '../fileDb';

const messagesRouter = Router();
const messages: message[] = [];

messagesRouter.post('/', async (req, res) => {
  const message: messageWithoutId = {
    text: req.body.text,
    author: req.body.author,
    datetime: new Date().toISOString(),
  };

  const newMessage = await fileDb.addItem(message);
  res.send(newMessage);
});


export default messagesRouter;