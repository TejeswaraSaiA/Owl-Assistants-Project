import React, { useState } from 'react';
import { Input, Button, Dropdown, Icon } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
    const history = useNavigate();
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
    ]
    const [userType, setUserType] = useState('TA Applicant');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = async () => {
        if (!email || !password) {
            toast.error("Please enter both email and password");
            return;
        }

        try {
            const response = await axios.post("/api/users/signin", { id: email, password: password, userType: userType });
            localStorage.setItem('currentUser', JSON.stringify(response.data));
            history(`/dashboard?user=${response.data.userType}`);
        } catch (error) {
            console.error("Error:", error.message);
            toast.error("Invalid email or password");
        }
    }

    return (
        <div className='login-page-parent-container'>
            <div className='login_page_container'>
                <div className='mainSection'>
                    <div className='internalSection'>
                        <h2 style={{ color: 'white' }}> Login to Account </h2>
                        <Dropdown style={{ paddingTop: '10px' }} options={users} value={userType} placeholder="Select user" selection onChange={(e, data) => setUserType(data.value)} /><br />
                        <Input value={email} style={{ paddingTop: '10px' }} placeholder='Enter ID/Email' className='input_button_styles' onChange={(e) => setEmail(e.target.value)} /><br />
                        <Input type='password' style={{ paddingTop: '10px', paddingBottom: '10px' }} value={password} placeholder='Enter Password' className='input_button_styles' onChange={(e) => setPassword(e.target.value)} /><br />
                        <Button type='submit' className='red_button' onClick={loginHandler}>Login</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
