import react,{useState} from 'react'
import {Button} from 'semantic-ui-react'
import Login from './Register_User/Login'
import Register from './Register_User/Register'
import './App.css'
import backgroundImage from './images/background.jpg';

const Layout=()=>{
    const [isLogin,setIsLogin]=useState(true)
    return(
            <div  style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh' }}>
            <header class="header">
                <h1>Owl Assistants</h1>
            </header>
            <div class="main-container">
                {/* <div class="background-image"></div> */}
                <div class="container">
                    <h1 style={{fontWeight:'bolder', color:'white'}}>Welcome to Owl Assistants TA Applicant Page</h1>
                    <p class="lead" style={{color:'white'}} >Manage your Account in a Single Go!</p>
                    <p class="info-text" style={{color:'white'}}>The Owl Assistants is a one stop application for all the users to do their chores.</p>
                    <p class="info-text" style={{color:'white'}}>Welcome to TA Management Applications</p>
                    {/* <!-- <div class="image-section">
                        <img src="../static/main.jpg" alt="Expense Tracker Image" class="img-fluid">
                    </div> --> */}
                    <Button content={isLogin? "Register" : "Login"} className='cancel-button' onClick={()=>setIsLogin(!isLogin)}/>
                    {isLogin ? <Login/> : <Register/>}
                    {/* <a class="btn btn-primary mr-2" href="{{ url_for('signup') }}">Signup</a>
                    <a class="btn btn-success" href="{{ url_for('login') }}">Login</a> */}
                </div>
            </div>
        </div>
    )


    // return (
    //     <div className='parent-container'>
    //         <div className='layout-parent-container'>
    //             <div className='layout-left-container'>
    //                 <div className='layout-left-section'>
    //                     <p className='left-layout-heading' style={{color:'white',fontSize:'1.5rem',fontWeight:'600',margin:0}}>Welcome Back!</p>
    //                     <p style={{color:'white',fontSize:'1rem',margin:0,overflowWrap:'break-word',marginBottom:'5px'}}>To keep connected with us please login with your personal info</p><br/>
                        
    //                 </div>
    //             </div>
    //             
    //             <div className='layout-right-container'>
    //                 <div className='left-top-container'>
    //                     <div>
    //                         {isLogin ? <Login/> : <Register/>}
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )
}

export default Layout;