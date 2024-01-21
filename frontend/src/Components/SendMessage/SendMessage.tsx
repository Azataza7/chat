import React, {useState} from 'react';
import {Button, FormControl, FormGroup, FormHelperText, Input, InputLabel} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const SendMessage = ({ onSendMessage}) => {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage({ author, text });
    setAuthor('');
    setText('');
  };

  return (
    <FormGroup sx={{ display: "flex", flexDirection: "row", marginY: 1 }}>
      <FormControl sx={{ backgroundColor: "white", padding: 1 }}>
        <InputLabel htmlFor="author-input">Your Name</InputLabel>
        <Input id="author-input" value={author} onChange={handleAuthorChange}  required/>
        <FormHelperText id="author-helper-text">Write name or nickname</FormHelperText>
      </FormControl>
      <FormControl sx={{ backgroundColor: "white", padding: 1, width: 500 }}>
        <InputLabel htmlFor="text-input">Message</InputLabel>
        <Input id="text-input" value={text} onChange={handleTextChange} required/>
        <FormHelperText id="text-helper-text">You must write her.</FormHelperText>
      </FormControl>
      <Button type="submit" variant="contained" onClick={handleSubmit}>
        <SendIcon/>
      </Button>
    </FormGroup>
  );
};

export default SendMessage;