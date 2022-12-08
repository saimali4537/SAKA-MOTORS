import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Container } from 'react-bootstrap'
import Header from './components/Header/Header'
import PHeader from './components/Header/PHeader'
import SHeader from './components/Header/SHeader'
import MHeader from './components/Header/MHeader'
import AHeader from './components/Header/AHeader'
import Home from './pages/Home'
import About from './pages/About'
import MFooter from './components/Footer/Footer'
import StoreScreen from './screens/storeScreen/StoreScreen'
import MechanicScreen from './screens/mechanicScreen/MechanicScreen'
import ProductScreen from './screens/storeScreen/ProductScreen'
import StorezScreen from './screens/storeScreen/StorezScreen'
import CartScreen from './screens/storeScreen/CartScreen'
import Login from './screens/loginScreen/LoginScreen'
import RegisterScreen from './screens/loginScreen/RegisterScreen'
import LoginS from './screens/loginScreen/LoginScreenS'
import LoginSM from './screens/loginScreen/LoginScreenSM'
import LoginM from './screens/loginScreen/LoginScreenM'
import LoginMM from './screens/loginScreen/LoginScreenMM'
import RegisterScreenS from './screens/loginScreen/RegisterScreenS'
import RegisterScreenSM from './screens/loginScreen/RegisterScreenSM'
import RegisterScreenM from './screens/loginScreen/RegisterScreenM'
import RegisterScreenMM from './screens/loginScreen/RegisterScreenMM'
import ProfileScreen from './screens/userScreen/ProfileScreen'
import ProfileScreenM from './screens/mechanicScreen/ProfileScreenM'
import ShippingScreen from './screens/storeScreen/ShippingScreen'
import PaymentScreen from './screens/storeScreen/PaymentScreen'
import PlaceOrderScreen from './screens/storeScreen/PlaceOrderScreen'
import OrderScreen from './screens/storeScreen/OrderScreen'
import OrderScreenD from './screens/storeScreen/OrderScreenD'
import OrderScreenA from './screens/storeScreen/OrderScreenA'
import OrderScreenM from './screens/storeScreen/OrderScreenM'
import UsersLayout from './adminDashboard/adminLayouts/UsersLayout'
import ManagerListScreen from './adminDashboard/adminLayouts/ManagersLayout'
import ManagerEditScreen from './screens/storeScreen/ManagerEditScreen'
import UserEditScreen from './screens/userScreen/UserEditScreen'
import ProductListScreen from './screens/storeScreen/ProductListScreen'
import ProductListScreenA from './adminDashboard/adminLayouts/ProductsLayout'
import ProductEditScreen from './screens/storeScreen/ProductEditScreen'
import ProductEditScreenA from './screens/storeScreen/ProductEditScreenA'
import OrderListScreen from './screens/storeScreen/OrderListScreen'
import OrderListScreenA from './adminDashboard/adminLayouts/OrdersLayout'
import Storeby from './screens/storeScreen/Storeby'
import Storec from './screens/storeScreen/StoreEditScreen'
import Storeca from './screens/storeScreen/StoreAddScreen'
import Storecc from './screens/storeScreen/StoreCreation'
import Profilecc from './screens/mechanicScreen/ProtCreation'
import Profileca from './screens/mechanicScreen/ProfileAddScreen'
import SProduct from './screens/storeScreen/ByProductScreen'
import Prot from './screens/mechanicScreen/MechanicsView'
import BookAddScreen from './screens/mechanicScreen/BookAddScreen'
import BookCreation from './screens/mechanicScreen/BookCreation'
import BookListScreen from './screens/mechanicScreen/BookListScreen '
import BooksLayout from './adminDashboard/adminLayouts/BooksLayout'
import Adminlog from './pages/Login/LoginScreen'
import Adminotp from './pages/Login/OtpScreen'
import Admin from './adminDashboard/adminLayouts/Layout'
import StoreListScreen from './adminDashboard/adminLayouts/StoresLayout'
import ProfileSM from './screens/storeScreen/ProfileScreenSM'
import MyStore from './screens/storeScreen/MyStore'
import Storecm from './screens/storeScreen/StoreEditScreenM'
import PostsScreen from './screens/postScreen/PostsScreen'
import PostEditScreen from './screens/postScreen/PostEditScreen'
import PostCreation from './screens/postScreen/PostCreation'
import PostScreen from './screens/postScreen/PostScreen'
import PostListScreen from './screens/postScreen/PostListScreen'
import PostListScreenA from './adminDashboard/adminLayouts/PostsLayout'
import PostEditScreenA from './screens/postScreen/PostEditScreenA'
import MechanicListScreenA from './adminDashboard/adminLayouts/MechanicsLayout'
import MechanicEditScreenA from './screens/mechanicScreen/MechanicEditScreenA'
import ProtListScreen from './adminDashboard/adminLayouts/ProfilesLayout'
import ProtEditScreen from './screens/mechanicScreen/ProtEditScreen'
import AuctionScreen from './screens/auctionScreen/AuctionScreen'
import AuctionsScreen from './screens/auctionScreen/AuctionsScreen'
import AuctionCreation from './screens/auctionScreen/AuctionCreation'
import AuctionEditScreen from './screens/auctionScreen/AuctionEditScreen'
import AuctionListScreen from './screens/auctionScreen/AuctionListScreen'
import BidEditScreen from './screens/auctionScreen/BidEditScreen'
import BidCreation from './screens/auctionScreen/BidCreation'
import AuctionListScreenA from './adminDashboard/adminLayouts/AuctionsLayout'
import Nav from './adminDashboard/Navbar'
import BidListScreen from './screens/auctionScreen/BidListScreen'
import BidsLayout from './adminDashboard/adminLayouts/BidsLayout'
import KommunicateChat from './chat'








const App = () => {
  return (
    <Router>
    <KommunicateChat/>

      <Route path='/' component={Header} exact />
        <Route path='/about' component={Header} exact />
        <Route path='/mechanic' component={MHeader} exact />
        <Route path='/posts' component={PHeader} exact />
        <Route path='/login' component={Header} exact />
        <Route path='/login' component={Login} exact />
        <Route path='/register' component={Header} />
        <Route path='/register' component={RegisterScreen} />
        <Route path='/logins' component={SHeader} exact />
        <Route path='/logins' component={LoginS} exact />
        <Route path='/loginsm' component={SHeader} exact />
        <Route path='/loginsm' component={LoginSM} exact />

        <Route path='/loginm' component={MHeader} exact />
        <Route path='/loginm' component={LoginM} exact />
        <Route path='/loginmm' component={MHeader} exact />
        <Route path='/loginmm' component={LoginMM} exact />

        <Route path='/registers' component={SHeader} />
        <Route path='/registers' component={RegisterScreenS} />
        <Route path='/registersm' component={SHeader} />
        <Route path='/registersm' component={RegisterScreenSM} />

        <Route path='/registerm' component={MHeader} />
        <Route path='/registerm' component={RegisterScreenM} />
        <Route path='/registermm' component={MHeader} />
        <Route path='/registermm' component={RegisterScreenMM} />
      <Route path='/store' component={SHeader} exact />
      <Route path='/cart/:id?' component={SHeader} exact />
      <Route path='/sstores/:id?' component={SHeader} exact />
      <Route path='/order/:id' component={SHeader} />
          <Route path='/shipping' component={SHeader} />
          <Route path='/payment' component={SHeader} />
          <Route path='/placeorder' component={SHeader} />
          <Route path='/profile' component={SHeader} />
          <Route path='/prot/:id' component={SHeader} />
          <Route path='/product/:id' component={SHeader} />
          <Route path='/post/:id' component={PHeader} />
          <Route path='/storez/:id' component={SHeader} />

          <Route path='/manager/productlist' component={SHeader} exact />
          <Route path='/manager/productlist/:pageNumber' component={SHeader} exact />
          <Route path='/manager/product/:id/edit' component={SHeader} />
          
          <Route path='/manager/orderlist' component={SHeader} />
          <Route path='/search/:keyword' component={SHeader} exact />
          <Route path='/pagep/:pageNumber' component={SHeader} exact />
          <Route path='/search/:keyword/pagep/:pageNumber' component={SHeader} exact />
          <Route path='/pagel/:pageNumber' component={SHeader} exact />
          <Route path='/search/:keyword/pagel/:pageNumber' component={SHeader} exact />
          <Route path='/storeby' component={SHeader} exact />
          <Route path='/storecc' component={SHeader} />
          <Route path='/protcc' component={MHeader} />
          <Route path='/apost' component={PHeader} />

          <Route path='/storeca/store/:id/' component={SHeader} />
          <Route path='/protca/prot/:id/' component={SHeader} />

          <Route path='/profilesm' component={SHeader} />
          <Route path='/manager/store/:id/edit' component={SHeader} />

          <Route path='/manager/mystore' component={SHeader} exact />
          <Route path='/profilem' component={MHeader} />
          <Route path='/book/:id' component={MHeader} />
          <Route path='/bookc/:id' component={MHeader} />
          <Route path='/mechanic/bookings' component={MHeader} />
          <Route path='/posts/:id' component={PHeader} />
          <Route path='/user/postlist' component={PHeader} />
          
          <Route path='/manager/order/:id' component={SHeader} />
        <Route path='/auction' component={AHeader} />
        <Route path='/user/post/:id/edit' component={Header} />
        <Route path='/user/auction/:id/edit' component={AHeader} />
        <Route path='/aauction' component={AHeader} />
        <Route path='/auctions/:id' component={AHeader} />
        <Route path='/auctione/:id' component={AHeader} />
        <Route path='/user/auctionlist' component={AHeader} />
        <Route path='/bidc/:id' component={AHeader} />
        <Route path='/bids/:id' component={AHeader} />
        <Route path='/admin/user/:id/edit' component={Nav} />
        <Route path='/admin/manager/:id/edit' component={Nav} />
        <Route path='/admin/:id/edit' component={Nav} />
        <Route path='/admin/post/:id/edit' component={Nav} />
        <Route path='/admin/store/:id/edit' component={Nav} />
        <Route path='/admin/order/:id' component={Nav} />
        <Route path='/user/mybid' component={AHeader} />
        <Route path='/orderd/:id' component={SHeader} />


        













          
        <main className="main">
        <Container>
        <Route path='/posts' component={PostsScreen} exact />
        <Route path='/post/:id' component={PostScreen} />
        <Route path='/user/postlist' component={PostListScreen} />
        <Route path='/user/post/:id/edit' component={PostEditScreen} />
        <Route path='/user/mybid' component={BidListScreen} />


        <Route path='/auction' component={AuctionScreen} />
        <Route path='/aauction' component={AuctionCreation} />
        <Route path='/auctions/:id' component={AuctionEditScreen} />
        <Route path='/auctione/:id' component={AuctionsScreen} />
        <Route path='/user/auctionlist' component={AuctionListScreen} />

        <Route path='/bidc/:id' component={BidCreation} />
        <Route path='/bids/:id' component={BidEditScreen} />
        
          <Route path='/admin/post/:id/edit' component={PostEditScreenA} />

          
          <Route path='/admin/:id/edit' component={MechanicEditScreenA} />
        <Route path='/user/auction/:id/edit' component={AuctionEditScreen} />

        
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/orderd/:id' component={OrderScreenD} />
          <Route path='/admin/order/:id' component={OrderScreenA} />
          <Route path='/manager/order/:id' component={OrderScreenM} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/mechanic/bookings' component={BookListScreen} />


          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />

          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/prot/:id' component={Prot} />
          <Route path='/book/:id' component={BookAddScreen} />

          <Route path='/storez/:id' component={StorezScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
      <Route path='/sstores/:id?' component={SProduct} exact />


          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/manager/:id/edit' component={ManagerEditScreen} />
          <Route path='/manager/productlist' component={ProductListScreen} exact />
          <Route path='/manager/productlist/:pageNumber' component={ProductListScreen} exact />
          
          <Route path='/manager/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/product/:id/edit' component={ProductEditScreenA} />

          <Route path='/admin/store/:id/edit' component={Storec} />
          <Route path='/storecc' component={Storecc} />
          <Route path='/protcc' component={Profilecc} />

          <Route path='/storeca/store/:id/' component={Storeca} />
          <Route path='/protca/prot/:id/' component={Profileca} />
          <Route path='/bookc/:id' component={BookCreation} />
          <Route path='/posts/:id' component={PostEditScreen} />
          <Route path='/apost' component={PostCreation} />

          <Route path='/admin/prot/:id/edit' component={ProtEditScreen} exact />

          <Route path='/manager/orderlist' component={OrderListScreen} />
          <Route path='/search/:keyword' component={StoreScreen} exact />
          <Route path='/pagep/:pageNumber' component={StoreScreen} exact />
        <Route path='/mechanic' component={MechanicScreen} exact />
        <Route path='/mechanic/pagep/:pageNumber' component={MechanicScreen} exact />
        <Route path='/mechanic/search/:keyword' component={MechanicScreen} exact />


          
          <Route path='/search/:keyword/pagep/:pageNumber' component={StoreScreen} exact />
          <Route path='/store' component={StoreScreen} exact />
          <Route path='/search/:keyword' component={Storeby} exact />
          <Route path='/pagel/:pageNumber' component={Storeby} exact />
          
          <Route path='/search/:keyword/pagel/:pageNumber' component={Storeby} exact />
          <Route path='/storeby' component={Storeby} exact />
          <Route path='/manager/store/:id/edit' component={Storecm} />

          <Route path='/manager/mystore' component={MyStore} exact/>


          <Route path='/profilesm' component={ProfileSM} />
          <Route path='/profilem' component={ProfileScreenM} />




        </Container>
        <Route path='/' component={Home} exact />
        <Route path='/about' component={About} exact />
        <Route path='/admin' component={Nav} exact />
        <Route path='/admin' component={Adminlog} exact />
        <Route path='/adminotp' component={Nav} exact />
        <Route path='/adminotp' component={Adminotp} exact />
          <Route path='/adminlog' component={Admin} exact />
          <Route path='/admin/userlist' component={UsersLayout} />
          <Route path='/admin/userlist/:pageNumber' component={UsersLayout} />
          <Route path='/admin/managerlist' component={ManagerListScreen} />
          
          <Route path='/admin/storelist' component={StoreListScreen} exact />
          <Route path='/admin/storelist/:pageNumber' component={StoreListScreen} exact />

          <Route path='/admin/mechaniclist' component={MechanicListScreenA} exact />
          <Route path='/admin/mechaniclist/:pageNumber' component={MechanicListScreenA} exact />

          <Route path='/admin/postslist' component={PostListScreenA} exact />
          <Route path='/admin/postslist/:pageNumber' component={PostListScreenA} exact />
          
          <Route path='/admin/protlist' component={ProtListScreen} exact />
          <Route path='/admin/protlist/:pageNumber' component={ProtListScreen} exact />

          <Route path='/admin/productlist' component={ProductListScreenA} exact />
          <Route path='/admin/productlist/:pageNumber' component={ProductListScreenA} exact />

          
          <Route path='/admin/orderlist' component={OrderListScreenA} />

          <Route path='/admin/auctionlist' component={AuctionListScreenA} />
          <Route path='/admin/booklist' component={BooksLayout} />
          <Route path='/admin/bidlist' component={BidsLayout} />



          
        </main>
        
      <MFooter />
    </Router>
  );
}

export default App;
