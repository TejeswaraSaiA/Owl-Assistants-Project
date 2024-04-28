import React,{useState} from 'react'
import { Button, Header, Icon, Input, Modal } from 'semantic-ui-react'
import {getMessages,setMessages} from '../actions/instructor_actions'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
const InstructorMessage=(props)=> {
  const [open, setOpen] = useState(false)
const [message,setMessage]=useState("")
const dispatch = useDispatch();
const clickHandler=()=>{
    dispatch(setMessages({message:message}))
    toast.success("Feedback submitted Successfuly")
    props.onClose()
}
  return (
    <Modal
      open={props.open}
    >
      <Header icon='comment' content='Submit Feedback' />
      <Modal.Content className='test'>
        <Input className='test222' onChange={(e)=>setMessage(e.target.value)}/>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => props.onClose()}>
          <Icon name='remove' /> No
        </Button>
        <Button color='green' onClick={() => clickHandler()}>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default InstructorMessage