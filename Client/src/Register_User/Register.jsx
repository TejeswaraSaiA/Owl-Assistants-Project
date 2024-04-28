import React, { useState } from 'react';
import { Input, Button, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
    let users = [
        {
            key: 'TA Applicant',
            text: 'TA Applicant',
            value: 'TA Applicant'
        },
        {
            key: 'Administrator',
            text: 'Administrator',
            value: 'Administrator'
        },
        {
            key: 'TA Committee',
            text: 'TA Committee',
            value: 'TA Committee'
        },
        {
            key: 'Instructor',
            text: 'Instructor',
            value: 'Instructor'
        }
    ];

    let departmentValues = [
        {
            key: 'Computer Science',
            text: 'Computer Science',
            value: 'Computer Science'
        },
        {
            key: 'Business Administration',
            text: 'Business Administration',
            value: 'Business Administration'
        },
        {
            key: 'Data Science',
            text: 'Data Science',
            value: 'Data Science'
        },
        {
            key: 'Others',
            text: 'Others',
            value: 'Others'
        }
    ];

    const [userType, setUserType] = useState('TA Applicant');
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");

    const isValidEmail = (email) => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const registerUserHandler = () => {
        if (!name || !email || !password || !department) {
            toast.error("Please fill in all fields");
            return;
        }

        if (!isValidEmail(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        let data = {
            userType: userType,
            name: name,
            password: password,
            email: email,
            department: department,
            selected: {}
        };

        axios.post("/api/users/register", data)
            .then((res) => {
                console.log("Applicant Registered Successfully");
                toast.success("Submitted Successfully");
                setDepartment("");
                setEmail("");
                setPassword("");
                setName("");
                setUserType("");
            })
            .catch((e) => {
                console.error("Error:", e.message);
            });
    };

    return (
        <div className='login-page-parent-container'>
            <div className='login_page_container'>
                <div className='mainSection'>
                    <div className='internalSection'>
                        <h2 style={{ color: 'white' }}> Register User </h2>
                        <Dropdown style={{ paddingTop: '10px' }} options={users} value={userType} placeholder="Select user" selection onChange={(e, data) => setUserType(data.value)} /><br />
                        <Input style={{ paddingTop: '10px' }} placeholder='Enter Name' value={name} className='input_button_styles' onChange={(e) => setName(e.target.value)} /><br />
                        <Input style={{ paddingTop: '10px' }} placeholder='Enter ID/Email' value={email} className='input_button_styles' onChange={(e) => setEmail(e.target.value)} /><br />
                        <Input style={{ paddingTop: '10px', paddingBottom: '10px' }} placeholder='Enter Password' value={password} className='input_button_styles' onChange={(e) => setPassword(e.target.value)} /><br />
                        <Dropdown options={departmentValues} value={department} placeholder="Select department" selection onChange={(e, data) => setDepartment(data.value)} /><br />
                        <Button style={{ marginTop: '10px' }} type='submit' className='red_button' onClick={registerUserHandler}>Register</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
