import React,{useState,useEffect} from 'react'
import { Card, Grid,Button } from 'semantic-ui-react'
const Dashboard=(props)=>{

    const [course,setCourses]=useState([]);
        let myCourse=[]
       
        if(props.course){
            props.course.map((val,id)=>{
                console.log("my name",typeof val.ta_name,val.ta_name,props.applicant_id)
                if(val.ta_name==props.applicant_id){
                    myCourse.push(val)
                }
            })
        }
      

return(
    <div style={{padding:"30px 30px 30px 0px"}}>
                <Grid style={{margin:0}}>
                    <Grid.Row columns={3} style={{padding:0}}>
                  
                        {myCourse.map((val, idx) => {
                    
                            return <Grid.Column style={{padding:0,paddingLeft:30,marginBottom:30}} key={idx}>
                                <Card style={{width:'100%', backgroundColor:'rgba(169, 169, 169, 0.5)'}}>
                                    <Card.Content className='card-header'>{val.course_name}</Card.Content>
                                    <Card.Content className='card-container'>
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
                                    <Card.Content extra style={{color:'white'}}>
                                        Please Follow your Instructors Instructions
                                    </Card.Content>
                                </Card>
                                
                            </Grid.Column>
                            
                        })}
                    </Grid.Row>
                </Grid>

            </div>
)
}

export default Dashboard;