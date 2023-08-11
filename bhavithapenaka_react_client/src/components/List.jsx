import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
//
import { useNavigate } from 'react-router-dom';
//
// this component displays a list of tasks
function List(props) {
  let navigate = useNavigate();
  // declare the states of this component
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [listError, setListError] = useState(false);
  //
  const apiUrl = "http://localhost:5000/tasks";
  const fetchData = async () => {
    axios.get(apiUrl)
      .then(result => {
        console.log('result.data:',result.data)
        setData(result.data);
        setShowLoading(false);
        
      }).catch((error) => {
        console.log('error in fetchData:', error)
        setListError(true)
      });
    };  
  //
  // retrieve all tasks
  useEffect(() => {
    // load the tasks
    fetchData();
  }, []);
  //
  const deleteTask = (item) => {
    setShowLoading(true);
    const id=item._id;
    const task = { chatId: item.chatId, prompt: item.prompt, 
      response: item.response, createdDate: item.createdDate, 
    chatTitle: item.chatTitle,upVotes: item.upVotes,downVotes: item.downVotes };
    console.log('task to delete:', task)
    //
    const apiUrlDelete = "http://localhost:5000/tasks/" + id;
    console.log('url:',apiUrlDelete)
    //
    axios.delete(apiUrlDelete, task)
      .then((results) => {
        setShowLoading(false);
        console.log('deleted document:', results.data)
        //refresh the list
        fetchData()
        //navigate('/list')
      }).catch((error) => setShowLoading(false));
  };
  //show the task
  const showDetail = (id) => {
    //
    navigate('/show/' + id);

  }
  //
  return (
    <div>
      
        {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
        </Spinner> }
        
          <h2>See all your tasks here:</h2>
          <ListGroup>
            <Table>
            <tbody>
              {data.map((item, idx) => (
                
                  <tr key={idx}>
                  <td>{idx+1}</td>
                  <td><ListGroup.Item key={idx} action onClick={() => { showDetail(item._id) }}>{item.chatId} </ListGroup.Item></td>
                  <td><ListGroup.Item key={idx} action onClick={() => { showDetail(item._id) }}>{item.prompt} </ListGroup.Item></td>
                  <td><ListGroup.Item key={idx} action onClick={() => { showDetail(item._id) }}>{item.response} </ListGroup.Item></td>
                  <td><ListGroup.Item key={idx} action onClick={() => { showDetail(item._id) }}>{item.createdDate} </ListGroup.Item></td>
                  <td><ListGroup.Item key={idx} action onClick={() => { showDetail(item._id) }}>{item.chatTitle} </ListGroup.Item></td>
                  <td><ListGroup.Item key={idx} action onClick={() => { showDetail(item._id) }}>{item.upVotes} </ListGroup.Item></td>
                  <td><ListGroup.Item key={idx} action onClick={() => { showDetail(item._id) }}>{item.downVotes} </ListGroup.Item></td>
                  <td><Button type="button" variant="danger" onClick={() => { deleteTask(item) }}>Delete</Button></td>
                
                  </tr>                
              
              ))}
              </tbody>
            </Table>
          </ListGroup>
          
        
    </div>

  );
}
//

export default List;
