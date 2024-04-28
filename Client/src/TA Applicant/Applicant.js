import React,{useState,useEffect} from 'react'
import { Card, Grid,Button } from 'semantic-ui-react'
import NewApplication from './NewApplication'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {getCourse} from '../actions/course_action'
import { useNavigate } from 'react-router-dom';
import {createApplication,updateApplication,getApplications} from '../actions/application_actions'
import TAProfile from './TAProfile';
import Dashboard from './Dashboard';
import backgroundImage from '../images/background.jpg';

const Applicant = (props) => {
    const history=useNavigate()
    const dispatch = useDispatch();
    const [applicant_id,setApplicantId]=useState("")
    const [openMyJobs,setOpenMyJobs]=useState(false)
    const [openProfile, setOpenProfile] = useState(false)
    const [userName, setUserName] = useState("")
    const [name, setName] = useState("")
    let currentUser;
    useEffect(()=>{
        currentUser=JSON.parse(localStorage.currentUser)
        setUserName(currentUser.email)
        setName(currentUser.name)
        setApplicantId(currentUser._id)
        dispatch(getCourse())
        dispatch(getApplications())

    },[])
    const {courses}=useSelector((state)=>state.getAllCourseReducer)
    const {applications}=useSelector((state)=>state.getAllApplicationReducer)
    console.log("MyCourse",courses)
    console.log("Applicant ID",applicant_id);
    console.log("All Applications",applications)
    const [isOpenModal,openModal]=useState(false)
    const [course_details,setCourseDetails]=useState({})
    const closeModalHandler=()=>{
        dispatch(getApplications())
        openModal(false)
        setCourseDetails({})
        dispatch(getApplications())
    }
    const openApplicationModalHandler=(course_details)=>{
        setCourseDetails(course_details)
        openModal(true)
    }
    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh' }}>
            <header className='header'>
                <h1>Owl Assistants</h1>   
                <h3>TA Applicant</h3>  
            </header>
            {isOpenModal && <NewApplication onClose={closeModalHandler} isOpend={openModal} applicant_id={applicant_id} course_details={course_details}/>}
            <nav className='navigation'>
                <div className='nav-left'>
                <button className='nav-left-button' onClick={()=>{
                    setOpenMyJobs(false)
                    setOpenProfile(false)
                }}>Welcome {name}!</button>
                <button className='nav-left-button'onClick={()=>{
                    setOpenMyJobs(true)
                    setOpenProfile(false)
                }}>My Jobs</button>
                <button className='nav-left-button'>Inbox</button>
                </div>

                <div className='nav-right'>
                <button className='nav-right-button'>Notifications</button>
                <button className='nav-right-button' onClick={() => {
                    setOpenProfile(true)
                    console.log("Current User Information",currentUser)
                    console.log(JSON.parse(localStorage.currentUser))
                }}>Profile</button>
                <button className='nav-right-button'onClick={()=>{history("/")}}>Log Out</button>
                </div>
            </nav>
            
            { 
            !openProfile ?
                (!openMyJobs ?
                    <div style={{fontSize:'20px',textAlign: 'left', paddingLeft: '30px', paddingTop: '20px', fontWeight: 'bold', color: 'white'}}>Available Applications</div> :
                    <div style={{fontSize:'20px',textAlign: 'left', paddingLeft: '30px', paddingTop: '20px', fontWeight: 'bold', color: 'white'}}>Applied Applications</div>
                ) :
                <div style={{fontSize:'20px',textAlign: 'left', paddingLeft: '30px', paddingTop: '20px', fontWeight: 'bold', color: 'white'}}>My Profile</div>
            }

            { !openProfile? 
                (!openMyJobs ? <div style={{padding:"30px 30px 30px 0px"}}>
                    <Grid style={{margin:0}}>
                        <Grid.Row columns={3} style={{padding:0}}>
                            {courses.map((val, idx) => {
                                if(!val.ta_selected){
                                    return <Grid.Column style={{padding:0,paddingLeft:30,marginBottom:30}} key={idx}>
                                    <Card style={{width:'100%', backgroundColor:'rgba(169, 169, 169, 0.5)'}}>
                                        <Card.Content className='card-header'>{val.course_name}</Card.Content>
                                        <Card.Content className='card-container' >
                                            <p>
                                                <span style={{fontWeight:'600'}}>Professor: </span>
                                                <span style={{fontStyle:'italic'}}>{val.professor_name}</span>
                                            </p>
                                            <p>
                                                <span style={{fontWeight:'600'}}>Department: </span>
                                                <span style={{fontStyle:'italic'}}>{val.department}</span>
                                            </p>
                                            <p>
                                                <span style={{fontWeight:'600'}}>Description: </span>
                                                <span style={{fontStyle:'italic'}}>{val.description}</span>
                                            </p>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <Button onClick={()=>openApplicationModalHandler(val)}>Apply Here...</Button>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                                }
                            })}
                        </Grid.Row>
                    </Grid>
                </div>:
                <Dashboard applicant_id={applicant_id} course={courses}/>) :
                <div className='profile-section'>
                    <TAProfile userName={userName} uName={name}/>
                </div>
            }
            
        </div>
    )
}
export default Applicant;
