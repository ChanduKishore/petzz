import { useState, useEffect} from 'react';
import DB from '../services/database'
import LoadingScreen from './loadingScreen'
import ProductsList from './productsList';
import {getAuth} from 'firebase/auth'
import { useParams } from "react-router-dom"
import '../App.css'

export default function DisplayProfile() {
  const {profileID}= useParams()
  console.log(profileID)
  const auth =getAuth();
  
  const [loading,setLoading]=useState(true)
  const [seller, setSeller]=useState('')
  const [addPet,setAddPet]=useState(false)
  const [profileUpdate,setProfileUpdate]=useState(false)
  const [img,setImage]=useState('')
  const [blah,setblah]=useState('')
  console.log('seller details',profileID)


  
  useEffect(()=>{
    
    if(profileID)
      {console.log('getting user data')
        DB.getData('Users',profileID).then(data => {
        setSeller(data)
        setLoading(false)})
      .catch(e=> console.log(e.message))}
      
    },[profileID])


  return (
    (loading)
        ?<LoadingScreen/>
        :<div >

           <strong>{seller.username}</strong>
    
   
        <div className='userProfile'> 
        <img src={seller.profilePic} alt='profile picture' className='profilePic'/>
        <div>
          <p>Full Name: {seller.fullname}</p>
          <p>Mobile: {seller.mobile}</p>
          <p>Address: {seller.address}</p>
        </div>
     </div>
    
    {seller.pets
        ?
        <ProductsList title='Pets' products={seller.pets} />
     :''}
   </div>
  );
}

