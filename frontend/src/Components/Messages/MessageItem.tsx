import React from 'react';
import {
  Card, CardContent, CardHeader, Container, Grid,
  Typography
} from '@mui/material';
import {messageList} from '../../../types';
import dayjs from 'dayjs';

interface Props {
  message: messageList;
}

const MessageItem: React.FC<Props> = ({message}) => {
  return (
    <Grid item xs={12} sm={12} md={6} lg={4} className="message-box">
      <Card sx={{minWidth: 275}}>
        <Container sx={{display: "flex", alignItems: "center", justifyContent: "space-between", paddingY: 0.2}}>
          <Typography>
            {message.author}
          </Typography>
          <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
            {dayjs(message.datetime).format('DD.MM.YYYY HH:mm')}
          </Typography>
        </Container>
        <CardContent>
          <Typography variant="body2" sx={{fontSize: 18}} color="text.secondary">
            {message.text}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default MessageItem;