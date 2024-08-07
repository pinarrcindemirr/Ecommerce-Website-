import React, {useState , useEffect} from 'react'
import './login.css'
import {Link,useNavigate} from "react-router-dom";
import { useMutation } from 'react-query';
import { useGlobalState } from '../context/AppProvider';

const Login = () => {

    const [username,setUsername]= useState('');
    const [password,setPassword]= useState('');
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();
    const [state,dispatch] = useGlobalState();
 
    const loginMutation = useMutation(loginInfo => {
        return fetch("http://10.28.60.28:9091/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginInfo),
        }).then(response => response.json());
    }, {
        onSuccess: (data) => {
            if (data && data.success) {
                console.log('User logged in:', data);
                dispatch({
                    type: 'user',
                    value:{
                        id:data.data.id,
                        username:data.data.username,
                        email: data.data.email,
                        image: data.data.image,
                        password: data.data.password
                    }
                })
                
                localStorage.setItem('user', JSON.stringify({
                    id: data.data.id,
                    username: data.data.username,
                    email: data.data.email,
                    image: data.data.image,
                    password: data.data.password
                }));
                console.log(state.user);
                navigate('/HomePage');
            } else {
                setLoginError("Username or password is incorrect.");
            }
        },
        onError: (error) => {
            console.error("Error:", error);
            setLoginError('An error occurred while trying to log in.');
        }
    });
    
    const check = (event) => {
            event.preventDefault();
        
            if (!validateForm({ username, password })) {
                alert('Please make sure all fields are filled out correctly.');
                return;
            }
            loginMutation.mutate({username,password})
    };
    
    function validateForm({ username, password }) {
        return password.length > 0 || username.length > 0;
    }
    
    return (
        
        <div className='body'>
          <div className='login-form'>
                <h1>LOGIN</h1>
                <div>
                    <p>Username</p>
                    <input 
                        type='text' 
                        placeholder='Username' 
                        id='username' 
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}/>
                </div>
                <div>
                    <p>Password</p>
                    <input 
                        type='password' 
                        placeholder='Password' 
                        id='password' 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}/>   
                </div>
                <div>
                    <input type="checkbox" id="rememberMe"/>
                    <label htmlFor="rememberMe">Remember me</label>
                </div>
                <div>
                     <button type='submit' onClick={check}>LOGIN</button>
                     {loginError && <div className="error-message">{loginError}</div>}
                </div>  
                <div>
                    <Link to='/Register'>
                        Need an account?
                    </Link>
                </div>
           </div>

        </div>
      
    )
  
}
export default Login
