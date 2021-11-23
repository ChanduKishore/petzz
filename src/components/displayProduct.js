import {Link,Outlet} from 'react-router-dom'

export default function DisplayProduct({product}){


    return(
      <figure style={{width:'300px'}}>
        <img src={product.image} alt='image' style={{maxWidth:'100%'}}/>
        <figcaption  style={{wordWrap:'break-word'}}>
          
          <center><strong>{product.name}</strong></center>
          <br/>
          {product.description}
          <br/>
          <center>price: <strong>{product.price}</strong></center>
         <Link to={`/pets/${product.id}`}>show details</Link>
         
        </figcaption>
      </figure>
    )
  }