'use client';

import {messageList, userMessage} from '../../types';
import {useMutation, useQuery, UseQueryResult, QueryClient} from '@tanstack/react-query';
import axiosApi from '../axiosApi';
import React, {useState} from 'react';
import {CircularProgress, Grid} from '@mui/material';
import MessageItem from '../Components/Messages/MessageItem';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import SendMessage from '../Components/SendMessage/SendMessage';

const Home = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const {data: messages, isLoading, refetch}: UseQueryResult<messageList[], unknown> = useQuery({
    queryKey: ['message'],
    queryFn: async () => {
      try {
        const messagesResponse = await axiosApi.get<messageList[]>('/messages', {
          params: {
            datetime: selectedDate?.toISOString(),
          },
        });
        return messagesResponse.data;
      } catch (error) {
        console.log('Error: ', error);
      }
    }
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (data: userMessage) => {
      try {
        await axiosApi.post('/messages', data);
      } catch (e) {
        console.error('Error: ', e);
      }
    },
    onSuccess: () => {
      refetch();
    },
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Filter messages by date"
          sx={{margin: 2, backgroundColor: 'white'}}
          onChange={(date) => {
            setSelectedDate(date);
            refetch();
          }}
        />
      </LocalizationProvider>
      <Grid item container spacing={1} style={{width: 'calc(60% + 8px)', height: 700}}>
        {messageList}
      </Grid>
      <Grid sx={{position: 'absolute', bottom: 0, width: '100%'}}>
        <SendMessage onSendMessage={sendMessageMutation.mutate}/>
      </Grid>
    </Grid>
  );
};

export default Home;