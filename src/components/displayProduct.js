import {Link} from 'react-router-dom'

export default function DisplayProduct({pet}){
    return(
      <figure style={{width:'300px'}}>
        <img src={pet.image} alt='image' style={{maxWidth:'100%'}}/>
        <figcaption  style={{wordWrap:'break-word'}}>
          
          <center><strong>{pet.name}</strong></center>
          <br/>
          {pet.description}
          <br/>
          <center>price: <strong>{pet.price}</strong></center>
         
        </figcaption>
      </figure>
    )
  }