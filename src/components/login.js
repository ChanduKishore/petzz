import { useState } from "react";
import InputFeild from './inputFeild'
import Auth from '../services/auth'
import DataProccessing from "./dataProccessing";

export default function Login({setUid}){
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const[loginStatus,setLoginStatus]=useState('')
    
    return(<form onSubmit={(e)=>Auth.login(e,setUid,email,password,setLoginStatus)}>
        <h1>Login</h1>
        
            <InputFeild 
            label='Email'
            type='email'
            value ={email}
            onChange={(e)=>setEmail(e.target.value)}
            required='required'/>
            
            <InputFeild 
            label='Password'
            type='password'
            value ={password}
            onChange={(e)=>setPassword(e.target.value)}
            required='required'/>
            
           

            <InputFeild 
            type='submit'
            value ='Login'/>

            <DataProccessing label={loginStatus} />

        </form>)
}


