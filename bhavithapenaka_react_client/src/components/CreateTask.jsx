import React, { useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./login.css";
//
import { useNavigate } from 'react-router-dom';

//
function CreateTask(props) {
    //create a navigate object to access the navigate function
  let navigate = useNavigate()
  let myCurrentDate = new Date()
  let date = myCurrentDate.getDate();
  //set the initial state of the componenet
  const [task, setTask] = useState({ _id: '', chatId: '', prompt: '', response: '', 
                createdDate: date,  chatTitle: '', upVotes: '', downVotes: ''});
  const [showLoading, setShowLoading] = useState(false);
  //ths is the rest api for tasks
  const apiUrl = "http://localhost:5000/tasks";
    //
  const saveTask = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { chatId: task.chatId, prompt: task.prompt, 
      response: task.response, CreatedDate: task.CreatedDate, 
       chatTitle: task.chatTitle, upVotes: task.upVotes, downVotes:task.downVotes };
      //use promises
      axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        navigate('/list')
      }).catch((error) => setShowLoading(false));
  };
  // handles onChange event
  const onChange = (e) => {
    e.persist();
    setTask({...task, [e.target.name]: e.target.value});
  }

  return (
    <div className='login'>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
        <Form onSubmit={saveTask}>
          <Form.Group>
          <Form.Label> Chat Id:</Form.Label>
            <Form.Control type="text" name="chatId" id="chatId" placeholder="Enter chatId" value={task.chatId} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Prompt </Form.Label>
            <Form.Control type="text" name="prompt" id="prompt" placeholder="Enter prompt" value={task.prompt} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Response </Form.Label>
            <Form.Control type="text" name="response" id="response" rows="3" placeholder="Enter Response" value={task.response} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Created Date</Form.Label>
            <Form.Control type="date" name="createdDate" id="createdDate" placeholder="Enter Created date" value={task.createdDate} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Chat Title</Form.Label>
            <Form.Control type="text" name="chatTitle" id="chatTitle" placeholder="Enter chat Title" value={task.chatTitle} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>up Votes</Form.Label>
            <Form.Control type="number" name="upVotes" id="upVotes" placeholder="Enter upvotes" value={task.upVotes} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>down Votes</Form.Label>
            <Form.Control type="number" name="downVotes" id="downVotes" placeholder="Enter downVotes" value={task.downVotes} onChange={onChange} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save
          </Button>

        </Form>
    </div>
  );
}
// 
export default CreateTask;


