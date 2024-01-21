import {Router} from 'express';
import {message, messageWithoutId} from '../types';
import fileDb from '../fileDb';

const messagesRouter = Router();
let messages: message[] = [];

messagesRouter.get('/', async (req, res) => {
  const queryDate = req.query.datetime as string;
  messages = await fileDb.getItems();

  if (!queryDate) {
    return res.send(messages.slice(-30));
  }

  const date = new Date(queryDate);
  if (isNaN(date.getDate())) {
    return res.status(403).json({error: 'Invalid datetime'});
  }

  const datetimeMessages = messages.filter((message) => {
    return new Date(message.datetime) > date;
  });

  if (datetimeMessages) {
    res.send(datetimeMessages);
  } else {
    res.send([]);
  }
});

messagesRouter.post('/', async (req, res) => {
  const message: messageWithoutId = {
    text: req.body.text,
    author: req.body.author,
    datetime: new Date().toISOString(),
  };

  if (!message.text || message.author === '') {
    return res.status(422).send(
      {'error': 'Author and message must be present in the request'}
    );
  } else {
    const newMessage = await fileDb.addItem(message);
    res.status(201).send(newMessage);
  }
});

export default messagesRouter;