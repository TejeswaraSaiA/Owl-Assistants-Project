import React, { useState, useEffect } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';

const Dashboard = (props) => {
    const [course, setCourses] = useState([]);
    const [applicationActions, setApplicationActions] = useState({});

    useEffect(() => {
        if (props.course) {
            const actions = {};
            props.course.forEach((val, id) => {
                actions[id] = { actionTaken: false, declined: false };
            });
            setApplicationActions(actions);
        }
    }, [props.course]);

    const eventhandler = (id, isAccepted) => {
        setApplicationActions(prevState => ({
            ...prevState,
            [id]: { actionTaken: true, declined: !isAccepted }
        }));
    };

    return (
        <div style={{ padding: "30px 30px 30px 0px" }}>
            <Grid style={{ margin: 0 }}>
                <Grid.Row columns={3} style={{ padding: 0 }}>
                    {props.course.map((val, idx) => {
                        return (
                            <Grid.Column style={{ padding: 0, paddingLeft: 30, marginBottom: 30 }} key={idx}>
                                <Card style={{ width: '100%', backgroundColor: 'rgba(169, 169, 169, 0.5)' }}>
                                    <Card.Content className='card-header'>{val.course_name}</Card.Content>
                                    <Card.Content className='card-container'>
                                        <p>
                                            <span style={{ fontWeight: '600' }}>Professor: </span>
                                            <span style={{ fontStyle: 'italic' }}>{val.professor_name}</span>
                                        </p>
                                        <p>
                                            <span style={{ fontWeight: '600' }}>Department: </span>
                                            <span style={{ fontStyle: 'italic' }}>{val.department}</span>
                                        </p>
                                        <p>
                                            <span style={{ fontWeight: '600' }}>Description: </span>
                                            <span style={{ fontStyle: 'italic' }}>{val.description}</span>
                                        </p>
                                    </Card.Content>
                                    {!applicationActions[idx]?.actionTaken ? (
                                        <Card.Content extra style={{ color: 'white', borderRight: '10px' }}>
                                            <span style={{ fontWeight: '600' }}>Application Action: </span>
                                            <Button color='green' onClick={() => eventhandler(idx, true)}>✔</Button>
                                            <Button color='red' onClick={() => eventhandler(idx, false)}>✘</Button>
                                        </Card.Content>
                                    ) : null}
                                    <Card.Content extra style={{ color: 'white' }}>
                                        {applicationActions[idx]?.actionTaken ? (
                                            <span>
                                                {applicationActions[idx]?.declined ? 'Application Declined' : 'Please Follow your Instructors Instructions'}
                                            </span>
                                        ) : null}
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        );
                    })}
                </Grid.Row>
            </Grid>
        </div>
    );
};

export default Dashboard;
