import {Link} from 'react-router-dom'
import { useState } from 'react/cjs/react.development'
import EditPetForm from './editPetForm'

export default function DisplayProduct({product,productList,uid}){

const [editPet,setEditPet]=useState(false)
console.log(editPet)

    return(
        editPet
            ?<EditPetForm setEditPet={setEditPet} id={product.id} productList={productList} pet={product} uid={uid}/>
            :<figure style={{width:'300px'}}>
                <img src={product.image} alt='image' style={{maxWidth:'100%'}}/>
                <figcaption  style={{wordWrap:'break-word'}}>
                
                <center><strong>{product.name}</strong></center>
                <br/>
                {product.description}
                <br/>
                <center>price: <strong>{product.price}</strong></center>
                <Link to={`/pets/${product.id}`}>show details</Link>
                <button onClick={()=>setEditPet(true)}>Edit Product</button>
                </figcaption>
            </figure>
        )
        
  }