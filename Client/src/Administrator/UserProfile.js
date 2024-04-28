import React, { useEffect, useState } from 'react';
import { Form, Checkbox, Input, Button, Modal, Icon, Grid } from 'semantic-ui-react';
import { toast } from 'react-toastify';

const UserProfile = (props) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    mobile: '',
    major: '',
    gpa: '',
    hasExperience: false,
    experiences: [{ course_name: '', professor_name: '', department: '' }],
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      experiences: [
        {
          courseName: "Software Engineering",
          professorName: "Professor X",
          dept: "Computer Science",
        },
      ],
    }));
  }, []);
  

  const handleSubmit = () => {
    // Handle form submission here
    console.log(state);
  };

  const { name, email, mobile, major, gpa, hasExperience, experiences } = state;
  console.log("Viewed User",props.viewedUser)
  return (
    <Modal open={props.isOpend} className="right-aligned-modal">
      <Modal.Header style={{display:'flex'}}>
        <span style={{marginRight:"auto"}}>View Application</span>
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
                  value={props.viewedUser.applicant_name}
                  readOnly
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Field
                  control={Input}
                  label="Course Name"
                  name="course_name"
                  value={props.viewedUser.course_name}
                  readOnly
                />
              </Grid.Column>
              
            </Grid.Row>

            <Grid.Row>
              {/* <Grid.Column>
                <Form.Field
                  control={Input}
                  label="Gpa"
                  name="Gpa"
                  value={major}
                  disabled
                />
              </Grid.Column> */}
              <Grid.Column>
                <Form.Field
                  control={Input}
                  label="GPA"
                  name="gpa"
                  value={props.viewedUser.gpa}
                  readOnly
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Field
                  control={Button}
                  type="file"
                  label="View Resume"
                  value="Open Resume"
                  onClick={()=>{window.open(`http://localhost:4000/files/${props.viewedUser.resume}`, "_blank", "noreferrer")}}
                  readOnly
                >
                  Open Resume
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Modal.Content>
      {/* <Modal.Actions style={{display:'flex',padding:"17px 30px"}}>
      
        
            <Button onClick={() => props.onClose()} className='cancel-button'>cancel</Button>
       
            <Button onClick={submitHandler} className='red_button' style={{marginLeft:"auto"}}>submit</Button>
       
      </Modal.Actions> */}
      
    </Modal>
  );
};

export default UserProfile;
