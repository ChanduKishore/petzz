import { useState } from "react";
import InputFeild from './inputFeild'
import Auth from '../services/auth'

export default function Login({setUser}){
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    
    return(<form onSubmit={(e)=>Auth.login(e,setUser,email,password)}>
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

        </form>)
}


