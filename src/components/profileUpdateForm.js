import { useState } from "react"
import DB from '../services/database'

export default function ProfileUpdateForm({setProfileUpdate,profileUpdate, setSeller,seller,user}){
    
  const [fullname,setFullName]=useState('')
    const [mobile,setMobile]=useState('')
    const [address, setAddress]=useState('')
  function updateProfile(e){
    e.preventDefault()
    const data={fullname,mobile,address}
    setSeller({...seller, fullname,mobile,address})
    setProfileUpdate(!profileUpdate)
    DB.updateData('Users',user.uid,data)
  }
  console.log(fullname,mobile,address)
  return(<form onSubmit={updateProfile}>
      
  <label>Full Name </label>
  <input type='text' onChange={(e)=>setFullName(e.target.value)} value={fullname} required/>


  <label>Mobile </label>
  <input type='text' onChange={(e)=>setMobile(e.target.value)} value={mobile} required/>


  <label>Adress </label>
  <input type='text' onChange={(e)=>setAddress(e.target.value)} value={address} required/>
  <button type='submit'>Update profile</button>
  <button onClick={()=>setProfileUpdate(false)}>Cancel</button>

</form>)
}
