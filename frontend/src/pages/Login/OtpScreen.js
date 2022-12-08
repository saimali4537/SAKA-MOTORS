import React, {useState, useEffect} from 'react'
import { Helmet } from 'react-helmet';
import { Image} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { auth }from '../../actions/adminActions'
import login_svg from './img/login.svg'
import wave from './img/wavev.png'
import './logincss.css'


const OtpScreen = ({location, history, match}) => {
  const [otp, setOtp] = useState('')

  const dispatch = useDispatch()

  const adminLogin = useSelector((state) => state.adminLogin)
  const { loading, error, adminInfo } = adminLogin
  const redirect = location.search ? location.search.split('=')[1] : '/adminlog'


  useEffect(() => {
    if (adminInfo) {
      history.push(redirect)
    }
  }, [history, adminInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(auth(otp))
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
            <title>Plase Verify your Otp</title>

          </Helmet>
          	<Image className="wave" src={wave} />

            <div className="containera">
              
		<div className="imga">
			<Image src={login_svg} />
		</div>
		<div className="login-content">
			<form onSubmit={submitHandler}>
			<h1>OTP</h1>
      
				{error && <h4>{error}</h4>}
           		<div className="input-div one">
           		   <div className="i">
                     <i class="fas fa-envelope"></i>
           		   </div>
           		   <div className="div">
           		   		<input type="text" value={otp} className="inputa" placeholder="Please Enter Your Otp" onChange={(e) => setOtp(e.target.value)} />
           		   </div>
           		</div>
            	<input type="submit" className="btna" value="Verify" />
              
             
            </form>
        </div>
    </div>
        </div>
    )
}

export default OtpScreen
