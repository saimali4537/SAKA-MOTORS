import React, {useState, useEffect} from 'react'
import { Helmet } from 'react-helmet';
import {Image} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { login }from '../../actions/adminActions'
import login_svg from './img/login.svg'
import wave from './img/wavev.png'
import './logincss.css'
import {ADMIN_LOGOUT} from '../../constants/adminConstants'


const LoginScreen = ({location, history, match}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const adminLogin = useSelector((state) => state.adminLogin)
  const { loading, error, adminInfo } = adminLogin
  const redirect = location.search ? location.search.split('=')[1] : '/adminotp'


  useEffect(() => {
    if (adminInfo) {
      history.push(redirect)
      localStorage.removeItem('adminInfo')
  dispatch({ type: ADMIN_LOGOUT })
    }else {
    }
  }, [history, adminInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
      dispatch(login(email, password))
  }
  

  const inputs = document.querySelectorAll(".inputa");


  function addcl(){
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
  }
  
  function remcl(){
    let parent = this.parentNode.parentNode;
    if(this.value == ""){
      parent.classList.remove("focus");
    }
  }
  
  
  inputs.forEach(inputa => {
    inputa.addEventListener("focus", addcl);
    inputa.addEventListener("blur", remcl);
  });
  





    return (
        <div>
          
          <Helmet>
            <title>Login</title>

          </Helmet>
          	<Image className="wave" src={wave} />

            <div className="containera">
              
		<div className="imga">
			<Image src={login_svg} />
		</div>
		<div className="login-content">
			<form onSubmit={submitHandler}>
			<h1>Login</h1>
      
				{error && <h4>{error}</h4>}
           		<div className="input-div one">
           		   <div className="i">
                     <i class="fas fa-envelope"></i>
           		   </div>
           		   <div className="div">
           		   		
           		   		<input type="text" value={email} className="inputa" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
           		   </div>
           		</div>
           		<div className="input-div pass">
           		   <div className="i"> 
           		    	<i className="fas fa-lock"></i>
           		   </div>
           		   <div className="div">
           		    	
           		    	<input type="password" value={password} className="inputa" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            	   </div>
            	</div>
            	
            	<input type="submit" className="btna" value="Login" />
              
             
            </form>
        </div>
    </div>
        </div>
    )
}

export default LoginScreen
