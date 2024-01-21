'use client';

import {messageList} from '../../types';
import {useQuery} from '@tanstack/react-query';
import axiosApi from '../axiosApi';
import React from 'react';
import {CircularProgress, Grid} from '@mui/material';
import MessageItem from '../Components/Messages/MessageItem';

export default function Home() {
  const {data: messages, isLoading} = useQuery({
    queryKey: ['message'],
    queryFn: async () => {
      const messagesResponse = await axiosApi.get<messageList[]>('/messages');
      return messagesResponse.data;
    }
  });

  let messageList: React.ReactNode = <CircularProgress/>;


  if (!isLoading && messages) {
    messageList = messages.map(message => (
      <MessageItem
        key={message.id}
        message={message}
      />
    ));
  }
  return (
    <Grid container direction="column" spacing={2}>

      <Grid item container spacing={1} style={{width: "calc(60% + 8px)"}}>
        {messageList.reverse()}
      </Grid>
    </Grid>
  );
}
