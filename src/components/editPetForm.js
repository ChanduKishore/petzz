import {useState} from 'react'
import Storage from '../services/storage';
import DB from '../services/database'
import DataProccessing from './dataProccessing';

export default function EditPetForm({productList,pet,setEditPet,uid,id}){
 
  const [img,setImg]=useState(pet.image)
    const [category,setCategory]=useState(pet.category)
    const [file,setFile]=useState('')
    const [name,setName]=useState(pet.name)
    const [price,setPrice]=useState(pet.price)
    const [description,setDescription]=useState(pet.description)
    const [breed,setBreed]=useState('')
    const [age,setAge]=useState('')
    const [weight,setWeight]=useState('')
    const[updateStatus,setUpdateStatus]=useState('')
    const[updateImage,setUpdateImage]=useState(false)
    console.log(
    )

    function updatePetData(image){
      const imgURL=productList.filter(product=>product.id===id)[0].image
      productList =productList.filter((product)=>product.id!==id)
        const pets=productList
              ?[...productList,{id,name,description,price,category,image:imgURL}]
              :[{id,name,description,price,category,image:imgURL}]

              const pet ={
                image:image?image:imgURL,
                name,
                description,price,
                breed:breed,
                weight:weight,
                age:age,
                category,
                }
      //updating pet details in seller database
      DB.updateData('Users',uid,{pets},setUpdateStatus).then(()=>{
        console.log('pet added to database')
        setEditPet(false)
      })

    //updating data in public database
    
    DB.updateData("Pets",id,pet,setUpdateStatus).catch(e=>console.log(e.message))
    }

    function updatePet(e){
      e.preventDefault()
       
                
            if(file){ // seller wants to update data and image as well
                Storage.uploadImg(file,'Pets',id,setUpdateStatus) //then first upload image and the retreive that image url and then use that image url to store in data base
                .then(() => {
                Storage.downloadImg(`Pets/${id}.jpg`,setUpdateStatus)
                .then((img)=>updatePetData(img))
                .catch(e=>updateStatus(e.message))
                }).catch(e=>updateStatus(e.message))
              }
            else{
              updatePetData()} // else just use previous image along with updated data
          
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
      <form onSubmit={updatePet}>
      <img src={img} style={{ width:'200px'}} />
   
      <input type='file' onChange={onImageChange} />
    
          <label> Category</label>
          <select id='category' onChange={(e)=>setCategory(e.target.value)} value={category} required >
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
       <button onClick={()=>setEditPet(false)}>Cancel</button>
      <DataProccessing label={updateStatus}/>
       </form>
    )
  }
  