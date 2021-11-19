import { useState } from "react"
import InputFeild from "./inputFeild"
import Auth from '../services/auth'
export default function Register({setUser}){
    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [mobile,setMobile]=useState('')
    const [address, setAddress]=useState('')
 
    return(<form onSubmit={(e)=>Auth.signUp(e,setUser,username,email,password,mobile,address)}>
        <h1>Register</h1>
        <InputFeild 
            label='Username'
            type='text'
            value ={username}
            onChange={(e)=>setUsername(e.target.value)}
            required='required'/>

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
            label='Mobile'
            type='tel'
            value ={mobile}
            onChange={(e)=>setMobile(e.target.value)}
            required='required'/>

            <InputFeild 
            label='Address'
            type='text'
            value ={address}
            onChange={(e)=>setAddress(e.target.value)}
            required='required'/>

            <InputFeild 
            type='submit'
            value ='Register'/>

        </form>)
}