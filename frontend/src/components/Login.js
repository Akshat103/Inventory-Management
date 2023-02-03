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
        console.warn("email,password",email,password);
        let result = await fetch('http://127.0.0.1:5000/login',{
            method:'POST',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        if(result.name){
            localStorage.setItem('user',JSON.stringify(result));
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