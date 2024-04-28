import React from 'react'
import { Card, Grid,Button } from 'semantic-ui-react'
import { useSearchParams } from 'react-router-dom';
import Applicant from '../TA Applicant/Applicant';
import Admin from '../Administrator/Admin';
import TACommitteeDashboard from '../TA Comittee/TA_Comitte';
import Instructor from '../Instructor/Instructor';
const Dashboard = () => {
    const [searchParams] = useSearchParams();
    const user = searchParams.get('user');
    //let courses = [{ title: "Software Engineering", professor: "Hanqi Zuang", dept: 'Computer Science', description: 'Software engineering course is an intro of well organised set of software descriptions..' }, { title: "Analysis of Algorithms", professor: "Tony Stark", dept: 'Computer Science', description: 'AOA is a well designed onlince course of modern computing problom and with a set of algorithms and standard solutions..' }, { title: "Data Science", professor: "Steve Rogers", dept: 'Computer Science', description: 'Data Science course is an intro of well organised set of software descriptions..' }, { title: "Theory and Inplementation", professor: "Thor", dept: 'Computer Science', description: 'Theory and Implementation course is an intro of well organised set of software descriptions..' }]
    return (
        <div>
         {user==="TA Applicant" && <Applicant/>}
         {user === "Administrator" && <Admin/>}
         {user === "TA Committee" && <TACommitteeDashboard/>}
         {user === "Instructor" && <Instructor/>}
        </div>
    )
}
export default Dashboard;