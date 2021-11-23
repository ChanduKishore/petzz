import { useState } from "react"
import DB from '../services/database'
import DataProccessing from "./dataProccessing"

export default function ProfileUpdateForm({setProfileUpdate,profileUpdate, setSeller,seller,uid}){
    
  const [fullname,setFullName]=useState('')
    const [mobile,setMobile]=useState('')
    const [address, setAddress]=useState('')
    const[updateStatus,setUpdateStatus]=useState('')

  function updateProfile(e){
    e.preventDefault()
    const data={fullname,mobile,address}
    setSeller({...seller, fullname,mobile,address})
    DB.updateData('Users',uid,data,setUpdateStatus)
    DB.getDocsWithQuery('Pets',"ownerId",uid)
    .then(pets=>{
        pets.forEach((pet)=>{
          DB.updateData("Pets",pet.id,{owner:fullname,mobile,address},setUpdateStatus)
        })
        console.log('profileUpdate',pets,uid)
         setProfileUpdate(!profileUpdate)
                })
  }
  return(<form onSubmit={updateProfile}>
      
  <label>Full Name </label>
  <input type='text' onChange={(e)=>setFullName(e.target.value)} value={fullname} required/>


  <label>Mobile </label>
  <input type='text' onChange={(e)=>setMobile(e.target.value)} value={mobile} required/>


  <label>Adress </label>
  <input type='text' onChange={(e)=>setAddress(e.target.value)} value={address} required/>
  <button type='submit'>Update profile</button>
  <button onClick={()=>setProfileUpdate(false)}>Cancel</button>
  <DataProccessing label={updateStatus}/>

</form>)
}
