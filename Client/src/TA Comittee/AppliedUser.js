import React, { useState,useEffect } from 'react';
import { Form, Checkbox, Input, Button, Modal, Icon, Grid } from 'semantic-ui-react';
import DataTable from '../DataTable';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import {getCourse} from '../actions/course_action'
import {createApplication,updateApplication,getApplications} from '../actions/application_actions'
const AppliedUser = (props) => {
  const dispatch=useDispatch();

    const [courseAppliedUsers,setAppliedUsers]=useState([])
    // console.log("Opened Course",props.opendCourse);
    //const {applications}=useSelector((state)=>state.getAllApplicationReducer)
    useEffect(()=>{
      dispatch(getApplications());
    },[])
    const {applications}=useSelector((state)=>state.getAllApplicationReducer)
    useEffect(()=>{
    let appliedUsers = []
    if(applications && applications.length>0){
      for(let i=0;i<applications.length;i++){
        if(applications[i].course_id===props.opendCourse._id && applications[i].admin_selected===true){
          appliedUsers.push(applications[i])
        }
      }
      // props.opendCourse
      // appliedUsers=
    }
    setAppliedUsers(appliedUsers)
    console.log("appp",appliedUsers)
    },applications)
    console.log("Applications",applications)
    const appliedUsersColumns=[
    { Header: 'SNO', accessor: '_id',},
    { Header: 'User Name', accessor: 'applicant_name' },
    { Header: 'Course Name', accessor: 'course_name' },
    { Header: 'Department', accessor: 'department' },
    { Header: 'GPA', accessor: 'gpa' },
    { Header: 'Accept', Cell: ({ row }) => (
        <Checkbox toggle onChange={()=>checkBoxClickHandler(row.original)} />
      ), },
   
    ]
    // let appliedUsers = []
    // if(applications && applications.length>0){
    //   for(let i=0;i<applications.length;i++){
    //     if(applications[i].course_id===props.opendCourse._id){
    //       appliedUsers.push(applications[i])
    //       console.log("insidee here")
    //     }
    //   }
    //   // props.opendCourse
    //   // appliedUsers=
    // }
      
  const submitHandler=()=>{
    toast.success("Selected Successfully")
    props.onClose();
  }

  const checkBoxClickHandler=(data)=>{
    const newData = { ...data, committee_selected:true,short_listed: true };
    // dispatch(updateApplication(data,true))
    dispatch(updateApplication(newData, false))
  }
  // console.log("courseAppliedUsersss",appliedUsers) 
  return (
    <Modal open={props.isOpend} className="right-aligned-modal">
      <Modal.Header style={{display:'flex'}}>
        <span style={{marginRight:"auto"}}>Short Listed Users</span>
        <Icon
          className='close-mark'
          name="close" 
          onClick={() => props.onClose()}
          style={{ cursor: 'pointer' }}
        />
      </Modal.Header>
      <Modal.Content style={{padding:30,height:'400px'}} className='modal-container'>
        <h2>Applied Users</h2>
        <DataTable columns={appliedUsersColumns} data={courseAppliedUsers } />
      </Modal.Content>
      <Modal.Actions style={{display:'flex',padding:"17px 30px"}}>
      
        
            <Button onClick={() => props.onClose()} className='cancel-button'>Cancel</Button>
       
            <Button onClick={submitHandler} className='red_button' style={{marginLeft:"auto"}}>Update</Button>
       
      </Modal.Actions>
      
    </Modal>
  );
};

export default AppliedUser;
