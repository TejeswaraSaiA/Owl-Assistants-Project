import React, { useState,useEffect } from 'react';
import { Form, Checkbox, Input, Button, Modal, Icon, Grid } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import {createApplication,updateApplication,getApplications} from '../actions/application_actions'
const _ = require('lodash');
const NewApplication = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: '',
    email: '',
    mobile: '',
    major: '',
    gpa: '',
    hasExperience: false,
    resume:'',
    experiences: [],
  });

  const [exp_course_name,setCourseName]=useState("")
  const [exp_department_name,setDepartmentName]=useState("")
  const [exp_professor_name,setProfessorName] = useState("")

// const {courses}=useSelector((state)=>state.getAllCourseReducer)
let currentUser=JSON.parse(localStorage.currentUser)
console.log("new applicant",props.course_details)
console.log("current user",currentUser)

// const {applicants} = 



  const handleInputChange = (e, { name, value }) => {
    setState({ ...state, [name]: value });
  };

  const handleCheckboxChange = () => {
    setState({ ...state, hasExperience: !state.hasExperience });
  };

  const handleFileUpload = (e) => {
    if(e.target.files[0]){
      setState({...state,resume:e.target.files[0]})
    }
  };

  const handleAddExperience = () => {
    setState({...state,experiences:[...state.experiences,{course_name:exp_course_name,department:exp_department_name,professor_name:exp_professor_name}]})
    setCourseName("")
    setDepartmentName("")
    setProfessorName("")
  };


  const handleSubmit = () => {
    // Handle form submission here
    
    console.log(state);
  };

  const submitHandler = async() => {
    const date=new Date();
    console.log("resume",state.resume)
    try{
      // let finalApplication={
      //   course_name: props.course_details && props.course_details.course_name ? props.course_details.course_name : "",
      //   course_id : props.course_details && props.course_details._id ? props.course_details._id : "",
      //   gpa : state.gpa,
      //   previous_experience : state.experiences,
      //   applicant_id : currentUser && currentUser._id ? currentUser._id : "",
      //   department : state.major,
      //   description : props.course_details && props.course_details.description ? props.course_details.description : "",
      //   professor_name : props.course_details && props.course_details.professor_name ? props.course_details.professor_name : "",
      //   applicant_name : state.name,
      //   resume: state.resume && Math.floor(Math.random() * 9000) + 1000 + state.resume.name 
      // }
      let formData = new FormData();

    formData.append("course_name", props.course_details?.course_name || "");
    formData.append("course_id", props.course_details?._id || "");
    formData.append("gpa", state.gpa || "");
    formData.append("previous_experience", JSON.stringify(state.experiences) || "");
    formData.append("applicant_id", currentUser?._id || "");
    formData.append("department", state.major || "");
    formData.append("description", props.course_details?.description || "");
    formData.append("professor_name", props.course_details?.professor_name || "");
    formData.append("applicant_name", state.name || "");
    formData.append("resume", state.resume);  // Make sure state.resume is a File object

    const response = await dispatch(createApplication(formData));
      toast.success('Applied Succefully');
      props.onClose();
    }
    catch(e){
      toast.error("Something went Wrong")
      props.onClose();
    }
    
  };

  const { name, email, mobile, major, gpa, hasExperience, experiences } = state;

  return (
    <Modal open={props.isOpend} className="right-aligned-modal">
      <Modal.Header style={{display:'flex'}}>
        <span style={{marginRight:"auto"}}>New Application</span>
        <Icon
          className='close-mark'
          name="close"
          onClick={() => props.onClose()}
          style={{ cursor: 'pointer' }}
        />
      </Modal.Header>
      <Modal.Content style={{padding:30,height:'-webkit-fit-content'}} className='modal-container'>
        <Form onSubmit={handleSubmit}>
          <Grid columns={3} stackable style={{margin:0}}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field
                  control={Input}
                  label="Name"
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Field
                  control={Input}
                  label="Email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Field
                  control={Input}
                  label="Mobile Number"
                  name="mobile"
                  value={mobile}
                  onChange={handleInputChange}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Form.Field
                  control={Input}
                  label="Major"
                  name="major"
                  value={major}
                  onChange={handleInputChange}
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Field
                  control={Input}
                  label="GPA"
                  name="gpa"
                  value={gpa}
                  onChange={handleInputChange}
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Field
                  control={Input}
                  type="file"
                  label="Upload Resume"
                  onChange={handleFileUpload}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Form.Field
                  control={Checkbox}
                  label="Previous Experience?"
                  checked={hasExperience}
                  onChange={handleCheckboxChange}
                />
              </Grid.Column>
            </Grid.Row>
            {hasExperience &&
              experiences.map((exp, index) => (
                <>
                <p style={{margin:0,fontWeight:'bold'}}>Experience {index}</p>
                <Grid.Row key={index}>
                  <Grid.Column>
                    <Form.Field
                      control={Input}
                      label={`Course Name`}
                      
                      value={exp.course_name}
            
                      readOnly
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field
                      control={Input}
                      label={`Professor Name`}
                      
                      value={exp.professor_name}
                      // onChange={(e, { name, value }) =>
                      //   handleExperienceInputChange(index, { name, value })
                      // }
                      
                      readOnly
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field
                      control={Input}
                      label={`Department`}
                      
                      value={exp.department}
                      // onChange={(e, { name, value }) =>
                      //   handleExperienceInputChange(index, { name, value })
                      // }
                      readOnly
                    />
                  </Grid.Column>
                </Grid.Row>
                </>
              ))}
            {hasExperience &&
              
                <>
                <p style={{margin:0,fontWeight:'bold'}}>Experience</p>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field
                      control={Input}
                      label={`Course Name`}
                      // name={`courseName-${index}`}
                      value={exp_course_name}
                      onChange={(e) =>
                        setCourseName(e.target.value)
                      }
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field
                      control={Input}
                      label={`Professor Name`}
                      // name={`professorName-${index}`}
                      value={exp_professor_name}
                      onChange={(e) =>
                        setProfessorName(e.target.value)
                      }
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field
                      control={Input}
                      label={`Department`}
                      // name={`dept-${index}`}
                      value={exp_department_name}
                      onChange={(e) =>
                        setDepartmentName(e.target.value)
                      }
                    />
                  </Grid.Column>
                </Grid.Row>
                </>
              }

            {hasExperience && (
              <Grid.Row>
                <Grid.Column>
                  <Button type="button" onClick={handleAddExperience} disabled={!exp_department_name || !exp_course_name || !exp_professor_name}>
                    Add Experience
                  </Button>
                </Grid.Column>
              </Grid.Row>
            )}
          </Grid>
        </Form>
      </Modal.Content>
      <Modal.Actions style={{display:'flex',padding:"17px 30px"}}>
      
        
            <Button onClick={() => props.onClose()} className='cancel-button'>cancel</Button>
       
            <Button onClick={submitHandler} className='red_button' style={{marginLeft:"auto"}}>submit</Button>
       
      </Modal.Actions>
      
    </Modal>
  );
};

export default NewApplication;
