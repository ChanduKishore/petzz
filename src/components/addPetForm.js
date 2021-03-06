import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import Storage from '../services/storage';
import DB from '../services/database'
import DataProccessing from './dataProccessing';

export default function AddPetForm({petsObj,addPet,setAddPet,seller,setSeller,uid}){
 
  const [img,setImg]=useState('')
    const [category,setCategory]=useState('')
    const [file,setFile]=useState(null)
    const [name,setName]=useState('')
    const [price,setPrice]=useState('')
     const [breed,setBreed]=useState('')
    const [age,setAge]=useState('')
    const [weight,setWeight]=useState('')
    const [description,setDescription]=useState('')
    const[updateStatus,setUpdateStatus]=useState('')
    
    function addPetToDb(e){
      e.preventDefault()
      const id=uuidv4()
      Storage.uploadImg(file,'Pets',id,setUpdateStatus)
      .then(() => {
      Storage.downloadImg(`Pets/${id}.jpg`,setUpdateStatus)
      .then(imgURL =>{
          console.log(imgURL)
          const pets=petsObj
                ?[...petsObj,{id,name,description,price,category,image:imgURL}]
                :[{id,name,description,price,category,image:imgURL}]
         
          //console.log(pets)
          //add data to seller database
          DB.updateData('Users',uid,{pets},setUpdateStatus).then(()=>{
              const Seller ={...seller, pets }
              setSeller(Seller)
              console.log('pet added to database')
              setAddPet(!addPet)
            })
          //adding data to public database
          const pet ={id,name,
            description,price,
            image:imgURL,
            breed:breed,
            weight:weight,
            age:age,
            category,
            ownerId:uid,
            owner:seller.username,
            mobile:seller.mobile,
            address:seller.address,
          ownerProfilePic:seller.profilePic,}
          DB.addData("Pets",id,pet).catch(e=>console.log(e.message))
      })
      console.log('image file uploaded')
  
      })
      
      
    }
  
    function onImageChange(e) {
      const reader = new FileReader()
    
      let file=e.target.files[0]
      if(file){
        reader.onload=()=>{
          if (reader.readyState===2){
         
            setImg(reader.result);
            setFile(file)
          }
        }
      reader.readAsDataURL(e.target.files[0])
      }else{
        setImg(null)
      }
    }
    return(
      <form onSubmit={addPetToDb}>
      <img src={img} style={{ width:'200px'}} required />
      <input type='file' onChange={onImageChange} required/>
      
          <label> Category</label>
          <select id='category' onChange={(e)=>setCategory(e.target.value)} required >
            <option value=''>__Choose__</option>
            <option value='Birds'>Birds</option>
            <option value='Dogs'>Dogs</option>
            <option value='Cats'>Cats</option>
            <option value='Rabbits'>Rabbits</option>
            <option value='Rats'>Rats</option>
            <option value='Snakes'>Snakes</option>
          </select>
      
        <label> Pet name</label>
        <input type='text' onChange={(e)=>setName(e.target.value)} value={name}  required />
    
       <label>Description</label>
       <textarea value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
       <label>Price</label>
       <input type='number' value={price} onChange={(e)=>setPrice(e.target.value)}  required/>
       <button type='submit'>submit </button>
       <button onClick={()=>setAddPet(false)}>Cancel</button>
      <DataProccessing label={updateStatus}/>
       </form>
    )
  }
  