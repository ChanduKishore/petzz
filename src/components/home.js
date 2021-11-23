import { Link,Routes,Route,Outlet,NavLink} from 'react-router-dom';
import ProductsList from './productsList';
import LandingPage from './landingPage'
export default function Home(){

    return(
         <>
         
        <nav className='nav justify-center'>
          <NavLink to='/pets'  >Pets</NavLink>
          <NavLink to='/food'  >Food</NavLink>
        </nav>
        <Outlet/>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/pets' element={<ProductsList title='Pets'  />}/>
          <Route path='/food' element={<ProductsList title='Food'/>}/>
        </Routes>

        </>
       
        )


}