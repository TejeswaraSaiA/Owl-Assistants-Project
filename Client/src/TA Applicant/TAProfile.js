import React, { useState } from 'react';
import { Input, Button, Dropdown, Label } from 'semantic-ui-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const TAProfile = ({ userName, uName }) => {
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

    // State variables
    const [userType, setUserType] = useState('TA Applicant');
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // Added state variable for confirmation password
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [passwordError, setPasswordError] = useState(""); // Added state variable for password error message

    // Function to handle user registration
    const registerUserHandler = () => {
        // Check if passwords match
        if (password !== confirmPassword) {
            setPasswordError("Passwords don't match");
            return;
        }
        else {
            setPasswordError("")
            return;
        }

        // If passwords match, proceed with registration
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
                setConfirmPassword(""); // Clear confirmation password
                setName("");
                setUserType("");
                setPasswordError(""); // Clear password error
            })
            .catch((error) => {
                console.error("Error:", error.message);
            });
    };

    return (
        <div className='login-page-parent-container'>
            <div className='login_page_container'> 
                <div className='mainSection'>
                    <div className='internalSection'>
                        <h2 style={{color: 'white'}}> User Profile </h2>
                        <table style={{ margin: 'auto', textAlign: 'left' }}>
                            <tbody>
                                <tr>
                                    <td><Label htmlFor="userName" style={{ background:'transparent', color:'white', fontSize:'18px' }}>User Name:</Label></td>
                                    <td>
                                        <Input 
                                            id="username" 
                                            placeholder={userName}
                                            value={userName} 
                                            className='input_button_styles' 
                                            onChange={(e) => setName(e.target.value)}
                                            disabled                            
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><Label htmlFor="name" style={{ background:'transparent', color:'white', fontSize:'18px' }}>Name:</Label></td>
                                    <td>
                                        <Input 
                                            id="name" 
                                            placeholder={uName} 
                                            value={uName} 
                                            className='input_button_styles' 
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><Label htmlFor="password" style={{ background:'transparent', color:'white', fontSize:'18px' }}>Password:</Label></td>
                                    <td>
                                        <Input 
                                            id="password" 
                                            type="password"
                                            placeholder='Enter Password' 
                                            value={password} 
                                            className='input_button_styles' 
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td><Label htmlFor="confirmpassword" style={{ background:'transparent', color:'white', fontSize:'18px' }}>Confirm Password:</Label></td>
                                    <td>
                                        <Input 
                                            id="confirmpassword" 
                                            type="password"
                                            placeholder='Confirm Password' 
                                            value={confirmPassword} 
                                            className='input_button_styles' 
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        {passwordError && <small style={{ marginLeft:'10px' , fontSize: '15px', fontWeight:'bolder' ,color: 'white', background:'red' }}>{passwordError}</small>}
                                    </td>
                                </tr>
                                <tr>
                                    <td><Label htmlFor="department" style={{ background:'transparent', color:'white', fontSize:'18px' }}>Department:</Label></td>
                                    <td>
                                        <Dropdown 
                                            id="department" 
                                            options={departmentValues} 
                                            value={department} 
                                            placeholder={"Select department"} 
                                            selection 
                                            onChange={(e, data) => setDepartment(data.value)}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {passwordError.length === 0 ? 
                            <div style={{color:'white'}}>
                                <Button 
                                    style={{ marginTop: '10px', background:'green', color:'white' }} 
                                    type='submit' 
                                    onClick={registerUserHandler}
                                >
                                    Update
                                </Button>
                            </div> : 
                            <div style={{color:'white'}}>
                               <Button 
                                    style={{ marginTop: '10px', background:'red', color:'white' }} 
                                    type='submit' 
                                    onClick={registerUserHandler}
                                >
                                    Enter Details Properly
                                </Button>
                            </div>}
                        {/* <Button 
                            style={{ marginTop: '10px', background:'green', color:'white' }} 
                            type='submit' 
                            onClick={registerUserHandler}
                        >
                            Update
                        </Button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TAProfile;
