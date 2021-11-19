import {useState, useEffect} from 'react'
import firebase from './services/firebase'
import SellerProfile from './components/sellerProfile'
import { Link,Routes,Route,Navigate,useNavigate} from 'react-router-dom'
import './App.css';
import Home from './components/home'
import Register from './components/register'
import Login from './components/login'
import Auth from './services/auth'

export default function App(){
    const [user,setUser]=useState(null)
    let navigate =useNavigate();
    
   console.log(user)
 useEffect(()=>{
     Auth.trackuserSigninStatus(setUser)},[user])
return(<>
    <center><h1>Petzz</h1></center>
    
        <nav>
            <Link to="/">Home</Link>
            {user
            ?<><Link to="/profile">Profile</Link>
                <button onClick={()=>Auth.logout(setUser)}>Logout</button>
                </>
            :<>
            <Link to="/register">Register</Link>
            <Link to="/login">|Login</Link>

            </>
            }
        </nav>
       
        <Routes>
            <Route path='/*' element={<Home user={user}/>}/>
            <Route path='/profile' element={user?<SellerProfile navigate={navigate}/>:<Navigate to='/'/>} />
            <Route path='/register' element={user?<Navigate to='/profile'/>:<Register setUser={setUser}/>} />
            <Route path='/login' element={user?<Navigate to='/profile'/>:<Login setUser={setUser}/>} />
            
        </Routes>
    
    
    
    </>
)
}