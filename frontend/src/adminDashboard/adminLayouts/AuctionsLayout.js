import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux'
import AuctionListScreenA from '../../screens/auctionScreen/AuctionListScreenA'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar';


function AuctionsLayout({history}){

    const adminLogin = useSelector((state) => state.adminLogin)
  const { adminInfo } = adminLogin

  useEffect(() => {

    if (!adminInfo ) {
      history.push('/admin')
    } 
  }, [
    adminInfo
  ])

 
        return (
            <div>
                <Navbar/>
                <div class="container-fluid" id="main">
                 <div class="row row-offcanvas row-offcanvas-left">
                   <Sidebar/>
                  <AuctionListScreenA/>
                
             </div>
            </div>  
        </div>  
        );
    }
  
export default AuctionsLayout

