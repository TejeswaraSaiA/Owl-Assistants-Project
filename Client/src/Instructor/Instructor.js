import React, { useState, useEffect } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import InstructorMessage from './InstructorMessage';
import { useNavigate } from 'react-router-dom';
import { getCourse } from '../actions/course_action';
import { useDispatch, useSelector } from 'react-redux';
import { getApplications } from '../actions/application_actions';
import backgroundImage from '../images/background.jpg';
import InstructorTask from './InstructorTask';

const Instructor = (props) => {
    const dispatch = useDispatch();
    const [isOpenModal, setOpenModal] = useState(false);
    const [isOpenTaskModal, setOpenTaskModal] = useState(false);
    const history = useNavigate();
    const [userName, setUserName] = useState("");
    const [name, setName] = useState("");
    const [filteredApplications, setFilteredApplications] = useState([]);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.currentUser);
        setUserName(currentUser.email);
        setName(currentUser.name);
        dispatch(getCourse());
        dispatch(getApplications());
    }, []);

    const { courses } = useSelector((state) => state.getAllCourseReducer);
    const { applications } = useSelector((state) => state.getAllApplicationReducer);

    useEffect(() => {
        let filteredApps = [];
        applications.forEach((app) => {
            console.log(app)
            if (app.professor_name === name) {
                const filteredData = {
                    applicantID: app.applicant_id,
                    applicantName: app.applicant_name,
                    courseName: app.course_name,
                    department: app.department,
                    description: app.description,
                    course_id:app.course_id,
                    gpa: app.gpa
                };
                setFilteredApplications(...filteredApplications,filteredData)
                // Push the filtered data to the array
                filteredApps.push(filteredData);
            }
        });
        setFilteredApplications(filteredApps);
        console.log(filteredApps)
    }, [applications, name]);

    const clickHandler = () => {
        setOpenModal(true);
    };

    const addTaskHandler = () => {
        setOpenTaskModal(true);
    }

    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh' }}>
            <header className='header'>
                <h1>Owl Assistants</h1>
                <h3>TA Instructor</h3>
            </header>
            <nav className='navigation'>
                <div className='nav-left'>
                    <button className='nav-left-button'>Welcome {name}!</button>
                </div>
                <div className='nav-right'>
                    <button className='nav-right-button'>Notifications</button>
                    <button className='nav-right-button' onClick={() => { history("/") }}>Log Out</button>
                </div>
            </nav>
            <div style={{ padding: "30px 30px 30px 0px", marginTop: 60 }}>
                {isOpenModal && <InstructorMessage open={isOpenModal} onClose={() => setOpenModal(false)} />}
                {isOpenTaskModal && <InstructorTask open={isOpenTaskModal} data={filteredApplications} onClose={() => setOpenTaskModal(false)} />}
                <Grid style={{ margin: 0 }}>
                    <Grid.Row columns={3} style={{ padding: 0 }}>
                        {filteredApplications.map((val, idx) => (
                            <Grid.Column key={idx} style={{ padding: 0, paddingLeft: 30, marginBottom: 30 }}>
                                <Card style={{ width: '100%', backgroundColor: 'rgba(169, 169, 169, 0.5)' }}>
                                    <Card.Content className='card-header'>{val.courseName}</Card.Content>
                                    <Card.Content className='card-container' >
                                        {/* <p>
                                            <span style={{ fontWeight: '600' }}>Professor: </span>
                                            <span style={{ fontStyle: 'italic' }}>{name}</span>
                                        </p>
                                        <p>
                                            <span style={{ fontWeight: '600' }}>Department: </span>
                                            <span style={{ fontStyle: 'italic' }}>{val.department}</span>
                                        </p> */}
                                        <p>
                                            <span style={{ fontWeight: '600' }}>TA Name: </span>
                                            <span style={{ fontStyle: 'italic' }}>{val.applicantName}</span>
                                        </p>
                                        <p>
                                            <span style={{ fontWeight: '600' }}>GPA: </span>
                                            <span style={{ fontStyle: 'italic' }}>{val.gpa}</span>
                                        </p> 
                                        <p>
                                            <span style={{ fontWeight: '600' }}>Description: </span>
                                            <span style={{ fontStyle: 'italic' }}>{val.description}</span>
                                        </p>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Button style={{marginRight:'32px'}} onClick={clickHandler}>Provide Feedback</Button>
                                        <Button onClick={addTaskHandler}>Add Task</Button>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        ))}
                    </Grid.Row>
                </Grid>
            </div>
        </div>
    );
};

export default Instructor;
