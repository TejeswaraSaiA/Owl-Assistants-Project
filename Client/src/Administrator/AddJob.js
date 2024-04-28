import React, { useState } from 'react';
import { Form, Input, Button, Modal, Grid,Dropdown } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import {getCourse, registerCourse} from '../actions/course_action'
const AddJob = (props) => {
  const [course, setCourse] = useState({
    course_name:"",
    description:"",
    department:"",
    professor_name:""
  });
  const dispatch = useDispatch()

  const submitHandler = () => {
    
    try{
        dispatch(registerCourse(course))
        dispatch(getCourse())
        toast.success("Course Added Successfully")
        props.onClose();
    }
    catch(e){
        toast.error("Failed to opertaion")
        props.onClose()
    }
    
  };
  let department_values=[
    {
        key:'Computer Science',
        text:'Computer Science',
        value:'Computer Science'
    },
    {
        key:'Bussiness Administration',
        text:'Bussiness Administration',
        value:'Bussiness Administration'
    },
    {
        key:'Data Science',
        text:'Data Science',
        value:'Data Science'
    },
    {
        key:'Others',
        text:'Others',
        value:'Others'
    }
]


  return (
    <Modal open={props.isOpend} className="right-aligned-modal">
      <Modal.Header style={{display:'flex'}}>
        <span style={{marginRight:"auto"}}>Add New Job Role</span>
      </Modal.Header>
      <Modal.Content style={{padding:30,height:'400px'}} className='modal-container'>
        <Form >
          <Grid columns={2} stackable style={{margin:0}}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field
                  control={Input}
                  label="Course Name"
                  name="course_name"
                  value={course.course_name}
                  onChange={(e)=>setCourse({...course,course_name: e.target.value})}
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Field
                  control={Input}
                  label="Course Description"
                  name="course_description"
                  value={course.description}
                  onChange={(e)=>setCourse({...course,description: e.target.value})}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Form.Field
                  control={Input}
                  label="Professor Name"
                  name="professor_name"
                  value={course.professor_name}
                  onChange={(e)=>setCourse({...course,professor_name: e.target.value})}
                />
              </Grid.Column>
              <Grid.Column>
                    <Form.Field 
                        control={Dropdown}
                        label="Select Department"
                        placeholder={"Select Department"}
                        name="department"
                        value={course.department}
                        options={department_values}
                        onChange={(e,data)=>setCourse({...course,department: data.value})}
                        // onChange={(e,data)=> setDepartment(data.value)}
                        />
                </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Modal.Content>
      <Modal.Actions style={{display:'flex',padding:"17px 30px"}}>
      
        
            <Button onClick={() => props.onClose()} className='cancel-button'>Cancel</Button>
       
            <Button onClick={submitHandler} className='red_button' style={{marginLeft:"auto"}}>Submit</Button>
       
      </Modal.Actions>
      
    </Modal>
  );
};

export default AddJob;
