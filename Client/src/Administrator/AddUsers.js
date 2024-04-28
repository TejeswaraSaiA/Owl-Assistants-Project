import React, { useState } from 'react';
import { Form, Checkbox, Input, Button, Modal, Icon, Grid,Dropdown } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import {registerCourse,getCourse} from '../actions/course_action'

const AddUsers = (props) => {
  const [course, setCourse] = useState({
    course_name:"",
    description:"",
    department:"",
    professor_name:""
  });
  const dispatch = useDispatch()
  const [userType,setUserType] = useState('TA Applicant')
  const [name,setName]=useState("");
  const [password,setPassword]=useState("")
  const [email,setEmail]=useState("")
  const [department,setDepartment]=useState("Computer Science")

  const [data, setData] = useState({
    userType: userType,
    name: name,
    password:password,
    email:email,
    department:department,
    selected:{
    }
  })
  const submitHandler=()=>{
    let myData={
      userType: userType,
      name: name,
      password:password,
      email:email,
      department:department,
      selected:{
      }
    }
    console.log(myData)
    axios.post("/api/users/register",myData)
    .then((res)=>{
        console.log("Applicant Registered Successfully")
        toast.success("Submitted Successfully")
        setDepartment("")
        setEmail("")
        setPassword("")
        setName("")
        setUserType("")
    })
    .catch((e)=>{
        console.log("error",e.message)
    })
    //toast.success("Submitted Successfully")
}

let users=[
    {
        key:'TA Applicant',
        text:'TA Applicant',
        value:'TA Applicant'
    },
    {
        key:'Administrator',
        text:'Administrator',
        value:'Administrator'
    },
    {
        key:'TA Committee',
        text:'TA Committee',
        value:'TA Committee'
    },
    {
        key:'Instructor',
        text:'Instructor',
        value:'Instructor'
    }
]

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
        {/* <Form >
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
              <Dropdown options={department_values} value={course.department} placeholder={"select department"} selection onChange={(e,data)=>setCourse({...course,department: data.value})}/>
            </Grid.Row>
          </Grid>
        </Form> */}
        <Form>
        <Grid columns={2} stackable style={{margin:0}}>
        <Grid.Row>
                <Grid.Column>
                    <Form.Field 
                        control={Dropdown}
                        label="User Type"
                        name="usertype"
                        value={userType}
                        options={users}
                        onChange={(e,data)=>setUserType(data.value)}
                        />
                </Grid.Column>
                <Grid.Column>
                    <Form.Field 
                        control={Input}
                        label="User Name or Email"
                        name="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Form.Field 
                        control={Input}
                        label="Name"
                        name="name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                </Grid.Column>
                <Grid.Column>
                    <Form.Field 
                        control={Input}
                        label="Password"
                        name="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Form.Field 
                        control={Dropdown}
                        label="Select Department"
                        name="department"
                        value={department}
                        options={department_values}
                        onChange={(e,data)=> setDepartment(data.value)}
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

export default AddUsers;
