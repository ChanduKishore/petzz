import { useState, useEffect} from 'react';
import DB from '../services/database'
import AddPetForm from './addPetForm';
import ProfileUpdateForm from './profileUpdateForm'
import LoadingScreen from './loadingScreen'
import SellerProductsList from './sellerProductsList';
import {getAuth} from 'firebase/auth'

function SellerProfile({uid,userId}) {
  const auth =getAuth();
  
  const [loading,setLoading]=useState(true)
  const [seller, setSeller]=useState('')
  const [addPet,setAddPet]=useState(false)
  const [profileUpdate,setProfileUpdate]=useState(false)
  
  useEffect(()=>{
    if(uid)
      {DB.getData('Users',uid).then(data => {
        setSeller(data)
        setLoading(false)})
      .catch(e=> console.log(e.message))}
      
    },[uid])


  return (
    (loading)
        ?<LoadingScreen/>
        :<div >
    {userId===uid
    ?<p>Welcome <strong>{seller.username}! </strong></p>
  :<strong>{seller.username}</strong>}
    
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
    {(userId !== uid)
    ?<h2>seller products</h2>
     :<>
     <button onClick={()=>setProfileUpdate(true)}> Edit Profile</button>
     <button onClick={()=>setAddPet(true)}> Add Pet</button>
     </> }
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
        <SellerProductsList title='Pets' productList={seller.pets}/>
     :''}
   </div>
  );
}

export default SellerProfile;
