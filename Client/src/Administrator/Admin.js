

import React,{useState,useEffect} from 'react';
import { Table } from 'semantic-ui-react';
import DataTable from '../DataTable';
import AppliedUser from './AppliedUser';
import AddJob from './AddJob';
import { useDispatch, useSelector } from "react-redux";
import {registerCourse,getCourse} from '../actions/course_action'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import AddUsers from './AddUsers';

const AdminDashboard = () => {
  const history=useNavigate()
  const dispatch = useDispatch();
  const {courses}=useSelector((state)=>state.getAllCourseReducer)
  console.log("MyCourse",courses)
  const [openAppliedUser,setAppliedUser]=useState(false);
  const [openAddNewJob,setNewJob]=useState(false);
  const [newUser, setNewUser] = useState(false);
  const [opendCourse,setOpendCourse]=useState({})
  let activeJobsData = []
  let deadlinePassedData = []
  let taSettledCoursesData = [] 
  let currentUser = ''
  const [name, setName] = useState("")

  useEffect(()=>{
    currentUser=JSON.parse(localStorage.currentUser)
    setName(currentUser.name)
    dispatch(getCourse());
  },[])

  if(courses && courses.length>0)
  {
    //activeJobsData=courses
    for(let i=0;i<courses.length;i++){
      if(courses[i] && courses[i].ta_selected){
        taSettledCoursesData.push(courses[i]) 
      }
      else{
        if(courses[i].applicants.length != 0 && !courses[i].admin_selected) {
          deadlinePassedData.push(courses[i])
        }
        else {
          activeJobsData.push(courses[i])
        }
      }
    }
  }

  console.log("All Jobs",activeJobsData,deadlinePassedData,taSettledCoursesData)
  
  
 const activeJobsColumns=[
    { Header: 'SNO', accessor: '_id' },
    { Header: 'Course Name', accessor: 'course_name' },
    { Header: 'Department', accessor: 'department' },
    { Header: 'Professor', accessor: 'professor_name' },
    // Add more columns as needed
  ];
  // Sample data for Deadline Passed Jobs table
  
  const deadlinePassedColumns=[
    { Header: 'SNO', accessor: '_id' },
    { Header: 'Course Name', accessor: 'course_name' },
    { Header: 'Department', accessor: 'department' },
    { Header: 'Professor', accessor: 'professor_name' },
    {Header:'Actions',Cell: ({ row }) => (
      <div>
        <button className='cancel-button' 
          onClick={()=>{console.log(row)
            onOpenTaApplicants(row.original)}}>
              Open TA
        </button>
      </div>
    ),
  }
    // Add more columns as needed
  ];

  // Sample data for TA Settled Courses

  const taSettledColumns=[
    { Header: 'SNO', accessor: '_id' },
    { Header: 'Course Name', accessor: 'course_name' },
    { Header: 'Department', accessor: 'department' },
    { Header: 'Professor', accessor: 'professor_name' },
    // Add more columns as needed
  ];

  // Row click handler function
  const handleRowClick = (rowData) => {
    // Customize this function to perform actions when a row is clicked
    console.log('Row clicked:', rowData);
    // Add your logic here
  };

  const closeTAApplicantsHandler=()=>{
    setAppliedUser(false);
    setOpendCourse({})
  }

  const addNewJobHandler=()=>{
    // console.log("heree")
    setNewJob(true)
  }
  const closeAddJobHandler=()=>{
    // console.log("Inside Close")
    setNewJob(false)
    dispatch(getCourse())
  }

  const closeAddNewUserHandler=()=>{
    // console.log("Inside Close")
    setNewUser(false)
    // dispatch(getCourse())
  }

  const onOpenTaApplicants=(data)=>{
    setAppliedUser(true);
    setOpendCourse(data)
  }
  return (
    <div>
      {/* Top Header */}
      {openAppliedUser && <AppliedUser onClose={closeTAApplicantsHandler} isOpend={openAppliedUser} opendCourse={opendCourse} />}
      {openAddNewJob &&  <AddJob onClose={closeAddJobHandler} isOpend={openAddNewJob}/>}
      {newUser &&  <AddUsers onClose={closeAddNewUserHandler} isOpend={newUser}/>}
      <header className='header'>
          <h1>Owl Assistants</h1>   
          <h3>TA Administrator</h3>  
      </header>
      <nav className='navigation'>
        <div className='nav-left'>
          <button className='nav-left-button'>Welcome {name}!</button>
        </div>

        <div className='nav-right'>
          <button className='nav-right-button' onClick={()=>setNewJob(true)}>Add a New Job</button>
          <button className='nav-right-button' onClick={()=>setNewUser(true)}>Add Users</button>
          <button className='nav-right-button'>Notifications</button>
          <button className='nav-right-button'onClick={()=>{history("/")}}>Log Out</button>
        </div>
      </nav>

      <div className='dashboard-page'>
        <div style={{margin:0, padding:'50px'}}>
          <h2>Active Jobs</h2>
          <DataTable columns={activeJobsColumns} data={activeJobsData} />
        </div>

        {/* Deadline Passed Jobs */}
        <div style={{margin:0, padding:'50px'}}>
          <h2>Job Applications</h2>
          <DataTable columns={deadlinePassedColumns} data={deadlinePassedData}/>
        </div>

        {/* TA Settled Courses */}
        <div style={{margin:0, padding:'50px'}}>
          <h2>Reviewed Applications</h2>
          <DataTable columns={taSettledColumns} data={taSettledCoursesData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

