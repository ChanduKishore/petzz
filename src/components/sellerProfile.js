import { useState, useEffect} from 'react';
import DB from '../services/database'
import AddPetForm from './addPetForm';
import ProfileUpdateForm from './profileUpdateForm'
import LoadingScreen from './loadingScreen'
import SellerProductsList from './sellerProductsList';
import {getAuth} from 'firebase/auth'
import '../App.css'

function SellerProfile({uid}) {
  const auth =getAuth();
  
  const [loading,setLoading]=useState(true)
  const [seller, setSeller]=useState('')
  const [addPet,setAddPet]=useState(false)
  const [profileUpdate,setProfileUpdate]=useState(false)
  console.log('seller details',uid)


  
  useEffect(()=>{
    
    if(uid)
      {console.log('getting user data')
        DB.getData('Users',uid).then(data => {
        setSeller(data)
        setLoading(false)})
      .catch(e=> console.log(e.message))}
      
    },[uid])


  return (
    (loading)
        ?<LoadingScreen/>
        :<div >
     <p>Welcome <strong>{seller.username}! </strong></p>
    {profileUpdate?
    <ProfileUpdateForm 
      setProfileUpdate={setProfileUpdate} 
      profileUpdate={profileUpdate}
      setSeller={setSeller}
      seller={seller}
      uid={uid}/>
    :<div className='userProfile'> 
        <img src={seller.profilePic} alt='profile picture' className='profilePic'/>
        <div>
          <p>Full Name: {seller.fullname}</p>
          <p>Mobile: {seller.mobile}</p>
          <p>Address: {seller.address}</p>
        </div>
     </div>}
  
     <button onClick={()=>setProfileUpdate(true)}> Edit Profile</button>
     <button onClick={()=>setAddPet(true)}> Add Pet</button>
     
    {addPet
      ?<AddPetForm 
          petsObj={seller.pets} 
          addPet={addPet} 
          setAddPet={setAddPet}
          seller={seller}
          setSeller={setSeller}
          uid={uid}/>
          :''}
    
    {seller.pets
        ?
        <SellerProductsList title='Pets' productList={seller.pets} uid={uid}/>
     :''}
   </div>
  );
}

export default SellerProfile;
