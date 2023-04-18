import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'

const Login=()=>{
    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    },[])

    const handlelogin=async()=>{
        let result = await fetch('http://localhost:5000/api/signin',{
            method:'POST',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        if(result.token){
            localStorage.setItem('user',JSON.stringify(result.user));
            localStorage.setItem('token',JSON.stringify(result.token));
            navigate('/');
        }
        else{
            alert("Please enter correct deatils...")
        }

    }


    return(
        <div className='login'>
            <h1>Log In</h1>
            <input className='inputBox' type='email' value={email} 
            onChange={(e)=>setEmail(e.target.value)} placeholder='Enter email'/>

            <input className='inputBox' type='password' value={password}
            onChange={(e)=>setPassword(e.target.value)} placeholder='Enter password'/>

            <button onClick={handlelogin} className='button' type='button'>Login</button>
        </div>
    )
}

export default Login;