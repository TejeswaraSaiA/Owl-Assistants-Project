import React,{useState,useEffect} from 'react';
import { Table } from 'semantic-ui-react';
import DataTable from '../DataTable';
import AppliedUser from './AppliedUser';
import { useDispatch, useSelector } from "react-redux";
import {registerCourse,getCourse} from '../actions/course_action'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
const TACommittee = () => {
  const history=useNavigate()
  // Sample data for Active Jobs table
  const dispatch = useDispatch();
  let currentUser = ''
  const [name, setName] = useState("")

  useEffect(()=>{
    currentUser=JSON.parse(localStorage.currentUser)
    setName(currentUser.name)
    dispatch(getCourse());
  },[])

  const {courses}=useSelector((state)=>state.getAllCourseReducer)
  console.log("MyCourse",courses)
  const [openAppliedUser,setAppliedUser]=useState(false);
  const [opendCourse,setOpendCourse]=useState({})
  let activeJobsData = []
  let deadlinePassedData = []
  let taSettledCoursesData = [] 
  if(courses && courses.length>0)
  {
    //activeJobsData=courses
    for(let i=0;i<courses.length;i++){
      if(courses[i] && courses[i].ta_selected){
        taSettledCoursesData.push(courses[i]) 
      }
      else{
        if(courses[i].applicants.length != 0) {
          deadlinePassedData.push(courses[i])
        }
        else {
          activeJobsData.push(courses[i])
        }
      }
    }
  }

  console.log("all Jobs",activeJobsData,deadlinePassedData,taSettledCoursesData)
  
  const deadlinePassedColumns=[
    { Header: 'SNO', accessor: '_id' },
    { Header: 'Course Name', accessor: 'course_name' },
    { Header: 'Department', accessor: 'department' },
    { Header: 'Professor', accessor: 'professor_name' },
    {Header:'Actions',Cell: ({ row }) => (
      <div>
        <button className='cancel-button' onClick={()=>{onOpenTaApplicants(row.original)}}>open</button>
      </div>
    ),
  }
  ];

  const closeTAApplicantsHandler=()=>{
    setAppliedUser(false);
    setOpendCourse({})
  }

  const onOpenTaApplicants=(data)=>{
    setAppliedUser(true);
    setOpendCourse(data)
  }

  return (
    <div>
      {/* Top Header */}
      {openAppliedUser && <AppliedUser onClose={closeTAApplicantsHandler} isOpend={openAppliedUser} opendCourse={opendCourse} />}
      <header className='header'>
          <h1>Owl Assistants</h1>   
          <h3>TA Committee Member</h3>  
      </header>
      <nav className='navigation'>
        <div className='nav-left'>
          <button className='nav-left-button'>Welcome {name}</button>
        </div>

        <div className='nav-right'>
          <button className='nav-right-button'>Notifications</button>
          <button className='nav-right-button'onClick={()=>{history("/")}}>Log Out</button>
        </div>
      </nav>
      <div className='dashboard-page'>

        <div style={{margin:0,padding:'50px'}}>
          <h2>TA Shorlisted Jobs</h2>
          <DataTable columns={deadlinePassedColumns} data={deadlinePassedData}/>
        </div>
      </div>
    </div>
  );
};

export default TACommittee;

