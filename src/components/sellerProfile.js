import { useState, useEffect} from 'react';
import DB from '../services/database'
import AddPetForm from './addPetForm';
import ProfileUpdateForm from './profileUpdateForm'
import LoadingScreen from './loadingScreen'
import ProductsList from './productsList';
import Auth from '../services/auth'
import {getAuth} from 'firebase/auth'

function SellerProfile({navigate}) {
  const auth =getAuth();
  
  const [uid,setUid]=useState(auth.currentUser?auth.currentUser.uid:null)
  const [loading,setLoading]=useState(true)
  const [seller, setSeller]=useState('')
  const [addPet,setAddPet]=useState(false)
  const [profileUpdate,setProfileUpdate]=useState(false)
  
  useEffect(()=>{
    if(uid)
      {DB.getData('Users',uid).then(data => {
        setSeller(data)
        setLoading(false)})
      }
    },[])


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
      user={uid}/>
    :(<div> 
      <p>Full Name: {seller.fullname}</p>
      <p>Mobile: {seller.mobile}</p>
      <p>Address: {seller.address}</p>
     </div>)}
    
     <button onClick={()=>setProfileUpdate(true)}> Edit Profile</button>
     <button onClick={()=>setAddPet(true)}> Add Pet</button>
    {addPet
      ?<AddPetForm 
          petsObj={seller.pets} 
          addPet={addPet} 
          setAddPet={setAddPet}
          seller={seller}
          setSeller={setSeller}
          user={uid}/>
          :''}

    {seller.pets
        ?
        <ProductsList title='Pets' listObj={seller.pets}/>
     :''}
   </div>
  );
}

export default SellerProfile;
