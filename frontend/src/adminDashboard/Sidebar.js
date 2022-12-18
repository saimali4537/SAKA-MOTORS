import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

const Sidebar = () => {
    return (
         <div class="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{backgroundColor:"#e9ecef"}}>
            <ul class="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
<li class="nav-item mb-2 mt-3"><a class="nav-link text-secondary" href="#"><h5>Welcome Admin</h5></a></li>
<LinkContainer to='/adminlog'>
<li class="nav-item mb-2 "><a class="nav-link text-secondary" href="#"><i class="fa fa-bar-chart font-weight-bold"></i> <span className="ml-3">Overview</span></a></li>
</LinkContainer>
<LinkContainer to='/admin/userlist'>
<li class="nav-item mb-2 "><a class="nav-link text-secondary" href="#"><i class="fas fa-users font-weight-bold"></i> <span className="ml-3">Users</span></a></li>
</LinkContainer>
<LinkContainer to='/admin/managerlist'>
<li class="nav-item mb-2 "><a class="nav-link text-secondary" href="#"><i class="fas fa-user font-weight-bold"></i> <span className="ml-3">&nbsp;Managers</span></a></li>
</LinkContainer>
<LinkContainer to='/admin/mechaniclist'>
 <li class="nav-item mb-2"><a class="nav-link text-secondary" href="#"><i class="far fa-user font-weight-bold"></i> <span className="ml-3">&nbsp;Mechanics</span></a></li>
</LinkContainer>
<LinkContainer to='/admin/postslist'>
<li class="nav-item mb-2"><a class="nav-link text-secondary" href="#"><i class="fa fa-car font-weight-bold"></i> <span className="ml-3">&nbsp;Posts</span></a></li>
</LinkContainer>
<LinkContainer to='/admin/storelist'>
<li class="nav-item mb-2"><a class="nav-link text-secondary" href="#"><i class="fa fa-university font-weight-bold"></i><span className="ml-3">&nbsp;&nbsp;Stores</span></a></li>
</LinkContainer>
<LinkContainer to='/admin/protlist'>
 <li class="nav-item mb-2"><a class="nav-link text-secondary" href="#"><i class="far fa-user font-weight-bold"></i> <span className="ml-3">&nbsp;Profiles</span></a></li>
</LinkContainer>
<LinkContainer to='/admin/productlist'>
<li class="nav-item mb-2"><a class="nav-link text-secondary" href="#"><i class="fa fa-shopping-basket font-weight-bold"></i><span className="ml-3">&nbsp;&nbsp;Products</span></a></li>
</LinkContainer>
<LinkContainer to='/admin/orderlist'>
<li class="nav-item mb-2"><a class="nav-link text-secondary" href="#"><i class="fa fa-check font-weight-bold"></i><span className="ml-3">&nbsp;&nbsp;Orders</span></a></li>
</LinkContainer>
<LinkContainer to='/admin/booklist'>
<li class="nav-item mb-2"><a class="nav-link text-secondary" href="#"><i class="fa-address-card font-weight-bold"></i><span className="ml-3">&nbsp;&nbsp;Bookings</span></a></li>
</LinkContainer>

<LinkContainer to='/admin/auctionlist'>
<li class="nav-item mb-2"><a class="nav-link text-secondary" href="#"><i class="far fa-folder font-weight-bold"></i> <span className="ml-3">&nbsp;Auction</span></a></li>
</LinkContainer>
<LinkContainer to='/admin/bidlist'>
<li class="nav-item mb-2"><a class="nav-link text-secondary" href="#"><i class="fa fa-handshake font-weight-bold"></i><span className="ml-3">&nbsp;Bids</span></a></li>
</LinkContainer>
<LinkContainer to='/admin/emaillist'>
<li class="nav-item mb-2"><a class="nav-link text-secondary" href="#"><i class="fa fa-handshake font-weight-bold"></i><span className="ml-3">&nbsp;Emails</span></a></li>
</LinkContainer>
            </ul>
       </div>
    )
}
 
export default Sidebar