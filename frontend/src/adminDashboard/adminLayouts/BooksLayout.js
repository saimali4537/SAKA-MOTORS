import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux'
import BookListScreenA  from '../../screens/mechanicScreen/BookListScreenA'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar';



 
function BooksLayout({history}){

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
                  <BookListScreenA />
                
             </div>
            </div>  
        </div>  
        );
    }
  
export default BooksLayout

