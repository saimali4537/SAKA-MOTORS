import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
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
import ProtListScreen from './screens/mechanicScreen/ProtListScreen'
import PostListScreenA from './adminDashboard/adminLayouts/PostsLayout'
import PostEditScreenA from './screens/postScreen/PostEditScreenA'
import MechanicListScreenA from './adminDashboard/adminLayouts/MechanicsLayout'
import EmailListScreen from './adminDashboard/adminLayouts/EmailsLayout'
import MechanicEditScreenA from './screens/mechanicScreen/MechanicEditScreenA'
import ProtListScreenA from './adminDashboard/adminLayouts/ProfilesLayout'
import ProtEditScreenA from './screens/mechanicScreen/ProtEditScreenA'
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
import ForgetScreen from './screens/loginScreen/ForgetScreen'
import ForgetScreenS from './screens/loginScreen/ForgetScreenS'
import ForgetScreenSM from './screens/loginScreen/ForgetScreenSM'
import ForgetScreenM from './screens/loginScreen/ForgetScreenM'
import ForgetScreenMM from './screens/loginScreen/ForgetScreenMM'
import PostAddScreen from './screens/postScreen/PostAddScreen'
import AuctionAddScreen from './screens/auctionScreen/AuctionAddScreen'
import BidAddScreen from './screens/auctionScreen/BidAddScreen'
import BidListScreenM from './screens/auctionScreen/BidListScreenM'
import BookListScreenM from './screens/mechanicScreen/BookListScreenM'
import BookEditScreen from './screens/mechanicScreen/BookEditScreen'
import AuctionEditScreenA from './screens/auctionScreen/AuctionEditScreenA'
import ProtAddScreen from './screens/mechanicScreen/ProtAddScreen'
import ProductAddScreen from './screens/storeScreen/ProductAddScreen'


const App = () => {
  return (
    <Router>
    <KommunicateChat/>
<Route exact path="/">
    <Redirect to="/home" />
</Route>
      <Route path='/home' component={Header} exact />
      <Route path='/home/profile' component={Header} />
        <Route path='/about' component={Header} exact />
        <Route path='/mechanic' component={MHeader} exact />
        <Route path='/posts' component={PHeader} exact />
        <Route path='/auction' component={AHeader} exact />
        <Route path='/home/login' component={Header} exact />
        <Route path='/home/login' component={Login} exact />
        <Route path='/home/register' component={Header} />
        <Route path='/home/register' component={RegisterScreen} />
        <Route path='/store/logins' component={SHeader} exact />
        <Route path='/store/logins' component={LoginS} exact />
        <Route path='/store/loginsm' component={SHeader} exact />
        <Route path='/store/loginsm' component={LoginSM} exact />
        <Route path='/auction/searcha/:keyword' component={AHeader} />

        <Route path='/mechanic/loginm' component={MHeader} exact />
        <Route path='/mechanic/loginm' component={LoginM} exact />
        <Route path='/mechanic/loginmm' component={MHeader} exact />
        <Route path='/mechanic/loginmm' component={LoginMM} exact />

        <Route path='/store/registers' component={SHeader} />
        <Route path='/store/registers' component={RegisterScreenS} />
        <Route path='/store/registersm' component={SHeader} />
        <Route path='/store/registersm' component={RegisterScreenSM} />

        <Route path='/mechanic/registerm' component={MHeader} />
        <Route path='/mechanic/registerm' component={RegisterScreenM} />
        <Route path='/mechanic/registermm' component={MHeader} />
        <Route path='/mechanic/registermm' component={RegisterScreenMM} />
      <Route path='/store' component={SHeader} exact />
      <Route path='/store/cart/:id?' component={SHeader} exact />
      <Route path='/store/sstores/:id?' component={SHeader} exact />
      <Route path='/store/order/:id' component={SHeader} />
          <Route path='/store/shipping' component={SHeader} />
          <Route path='/store/payment' component={SHeader} />
          <Route path='/store/placeorder' component={SHeader} />
          <Route path='/store/profile' component={SHeader} />
          <Route path='/store/prot/:id' component={SHeader} />
          <Route path='/store/product/:id' component={SHeader} />
          <Route path='/store/storez/:id' component={SHeader} />

          <Route path='/store/manager/productlist' component={SHeader} exact />
          <Route path='/store/manager/productlist/:pageNumber' component={SHeader} exact />
          <Route path='/store/manager/product/:id/edit' component={SHeader} />
          
          <Route path='/store/manager/orderlist' component={SHeader} />
          <Route path='/store/searchs/:keyword' component={SHeader} exact />
          <Route path='/store/pagep/:pageNumber' component={SHeader} exact />
          <Route path='/store/search/:keyword/pagep/:pageNumber' component={SHeader} exact />
          <Route path='/store/pagel/:pageNumber' component={SHeader} exact />
          <Route path='/store/search/:keyword/pagel/:pageNumber' component={SHeader} exact />
          <Route path='/store/storeby' component={SHeader} exact />
          <Route path='/store/storecc' component={SHeader} />
          <Route path='/mechanic/protcc' component={MHeader} />

          <Route path='/store/storeca/storeadd' component={SHeader} />
          <Route path='/store/protca/prot/:id/' component={SHeader} />

          <Route path='/store/profilesm' component={SHeader} />
          <Route path='/store/manager/store/:id/edit' component={SHeader} />

          <Route path='/store/manager/mystore' component={SHeader} exact />
          <Route path='/mechanic/profilem' component={MHeader} />
          <Route path='/mechanic/book/:id' component={MHeader} />
          <Route path='/mechanic/bookc/:id' component={MHeader} />
          <Route path='/mechanic/bookings' component={MHeader} />
          <Route path='/posts/:id' component={PHeader} />
          
          <Route path='/store/manager/order/:id' component={SHeader} />
        <Route path='/home/user/post/:id/edit' component={Header} />
        <Route path='/auction/user/auction/:id/edit' component={AHeader} />
        <Route path='/auction/aauction' component={AHeader} />
        <Route path='/auction/auctions/:id' component={AHeader} />
        <Route path='/auction/auctione/:id' component={AHeader} />
        <Route path='/auction/user/auctionlist' component={AHeader} />
        <Route path='/auction/bidc/:id' component={AHeader} />
        <Route path='/auction/bids/:id' component={AHeader} />
        <Route path='/admin/user/:id/edit' component={Nav} />
        <Route path='/admin/manager/:id/edit' component={Nav} />
        <Route path='/admin/:id/edit' component={Nav} />
        <Route path='/admin/post/:id/edit' component={Nav} />
        <Route path='/admin/store/:id/edit' component={Nav} />
        <Route path='/admin/order/:id' component={Nav} />
        <Route path='/admin/prot/:id/edit' component={Nav} exact />
        <Route path='/admin/product/:id/edit' component={Nav} />


        <Route path='/auction/user/mybid' component={AHeader} />
        <Route path='/store/orderd/:id' component={SHeader} />

        <Route path='/mechanic/searchm/:keyword' component={MHeader} exact />
        <Route path='/searcha/:keyword' component={AHeader} />
        <Route path='/mechanic/protm' component={MHeader} />
        <Route path='/mechanic/prot/:id' component={MHeader} />
        <Route path='/home/forget' component={Header} />
        <Route path='/store/forgets' component={SHeader} />
        <Route path='/mechanic/forgetm' component={MHeader} />
        <Route path='/auction/user/auction/add' component={AHeader} />
        <Route path='/auction/user/bidc/:id/add' component={AHeader} />
        <Route path='/auction/user/mbid' component={AHeader} />
        <Route path='/store/store/forgetsm' component={SHeader} />
        <Route path='/posts/edit/:id' component={PHeader} />
        <Route path='/mechanic/mbooks' component={MHeader} />
        <Route path='/admin/auction/:id/edit' component={Nav } exact />
        <Route path='/mechanic/forgetmm' component={MHeader} exact/>

        <Route path='/mechanic/protadd' component={MHeader } exact />
        <Route path='/store/productadd' component={SHeader} />


          
        <main className="main">
        <Container>
        <Route path='/posts' component={PostsScreen} exact/>
        <Route path='/posts/post/:id' component={PostScreen} exact/>
        <Route path='/posts/apost' component={PostCreation} exact/>
        <Route path='/posts/user/postlist' component={PostListScreen}exact />
        <Route path='/posts/user/post/:id/edit' component={PostEditScreen} exact/>
        <Route path='/posts/searchp/:keyword' component={PostsScreen} exact />
        <Route path='/auction/user/mybid' component={BidListScreen} />
        <Route path='/home/forget' component={ForgetScreen} />
        <Route path='/store/forgets' component={ForgetScreenS} />
        <Route path='/store/forgetsm' component={ForgetScreenSM} exact/>
        <Route path='/mechanic/forgetmm' component={ForgetScreenMM} exact/>
        <Route path='/mechanic/forgetm' component={ForgetScreenM} />
        <Route path='/posts/user/post/add' component={PostAddScreen} exact/>
        <Route path='/auction/user/auction/add' component={AuctionAddScreen} />
        <Route path='/auction/user/bidc/:id/add' component={BidAddScreen} />
        <Route path='/auction/user/mbid' component={BidListScreenM} />
        <Route path='/store/profile' component={ProfileScreen} />
        <Route path='/posts/profile' component={ProfileScreen} />
        <Route path='/auction' component={AuctionScreen} exact/>
        <Route path='/auction/searcha/:keyword' component={AuctionScreen} />
        <Route path='/auction/aauction' component={AuctionCreation} />
        <Route path='/auction/auctions/:id' component={AuctionEditScreen} />
        <Route path='/auction/auctione/:id' component={AuctionsScreen} exact/>
        <Route path='/auction/user/auctionlist' component={AuctionListScreen} />
        <Route path='/mechanic/mbooks' component={BookListScreen} />
        <Route path='/mechanic/book/add/:id' component={BookAddScreen } exact />
        <Route path='/admin/auction/:id/edit' component={AuctionEditScreenA } exact />
        <Route path='/mechanic/protadd' component={ProtAddScreen } exact />

        <Route path='/auction/bidc/:id' component={BidCreation} />
        <Route path='/auction/bids/:id' component={BidEditScreen} />
        
          <Route path='/admin/post/:id/edit' component={PostEditScreenA} />
          <Route path='/store/productadd' component={ProductAddScreen} />


          
          <Route path='/admin/:id/edit' component={MechanicEditScreenA} />
        <Route path='/auction/user/auction/:id/edit' component={AuctionEditScreen} />

        
          <Route path='/store/order/:id' component={OrderScreen} />
          <Route path='/store/orderd/:id' component={OrderScreenD} />
          <Route path='/admin/order/:id' component={OrderScreenA} />
          <Route path='/store/manager/order/:id' component={OrderScreenM} />
          <Route path='/store/shipping' component={ShippingScreen} />
          <Route path='/mechanic/bookings' component={BookListScreenM} />


          <Route path='/store/payment' component={PaymentScreen} />
          <Route path='/store/placeorder' component={PlaceOrderScreen} />

          <Route path='/home/profile' component={ProfileScreen} />
          <Route path='/store/product/:id' component={ProductScreen} />
          <Route path='/mechanic/prot/:id' component={Prot} exact/>
          <Route path='/mechanic/book/:id/edit' component={BookEditScreen}  exact/>
          

          <Route path='/store/storez/:id' component={StorezScreen} />
          <Route path='/store/cart/:id?' component={CartScreen} />
      <Route path='/store/sstores/:id?' component={SProduct} exact />


          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/manager/:id/edit' component={ManagerEditScreen} />
          <Route path='/store/manager/productlist' component={ProductListScreen} exact />
          <Route path='/store/manager/productlist/:pageNumber' component={ProductListScreen} exact />
          
          <Route path='/store/manager/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/product/:id/edit' component={ProductEditScreenA} />

          <Route path='/admin/store/:id/edit' component={Storec} />
          <Route path='/store/storecc' component={Storecc} />
          <Route path='/mechanic/protcc' component={Profilecc} />

          <Route path='/store/storeca/storeadd' component={Storeca} />
          <Route path='/mechanic/protca/prot/:id/' component={Profileca} />
          <Route path='/mechanic/bookc/:id' component={BookCreation} />
          <Route path='/posts/edit/:id' component={PostEditScreen} exact/>

          <Route path='/admin/prot/:id/edit' component={ProtEditScreenA} exact />
          <Route path='/mechanic/prot/:id/edit' component={ProtEditScreen} exact />


          <Route path='/store/manager/orderlist' component={OrderListScreen} />
          <Route path='/store/searchs/:keyword' component={StoreScreen} exact />
          <Route path='/store/pagep/:pageNumber' component={StoreScreen} exact />
        <Route path='/mechanic' component={MechanicScreen} exact />
        <Route path='/mechanic/pagep/:pageNumber' component={MechanicScreen} exact />
        <Route path='/mechanic/searchm/:keyword' component={MechanicScreen} exact />


          
          <Route path='/store/search/:keyword/pagep/:pageNumber' component={StoreScreen} exact />
          <Route path='/store' component={StoreScreen} exact />
          <Route path='/store/search/:keyword' component={Storeby} exact />
          <Route path='/pagel/:pageNumber' component={Storeby} exact />
          
          <Route path='/search/:keyword/pagel/:pageNumber' component={Storeby} exact />
          <Route path='/store/storeby' component={Storeby} exact />
          <Route path='/store/manager/store/:id/edit' component={Storecm} />

          <Route path='/store/manager/mystore' component={MyStore} exact/>


          <Route path='/store/profilesm' component={ProfileSM} />
          <Route path='/mechanic/profilem' component={ProfileScreenM} />
          <Route path='/mechanic/protm' component={ProtListScreen} />




        </Container>
        <Route path='/home' component={Home} exact />
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
          
          <Route path='/admin/protlist' component={ProtListScreenA} exact />
          <Route path='/admin/protlist/:pageNumber' component={ProtListScreenA} exact />

          <Route path='/admin/productlist' component={ProductListScreenA} exact />
          <Route path='/admin/productlist/:pageNumber' component={ProductListScreenA} exact />

          
          <Route path='/admin/orderlist' component={OrderListScreenA} />

          <Route path='/admin/auctionlist' component={AuctionListScreenA} />
          <Route path='/admin/booklist' component={BooksLayout} />
          <Route path='/admin/bidlist' component={BidsLayout} />
          <Route path='/admin/emaillist' component={EmailListScreen} />

          
        </main>
        
      <MFooter />
    </Router>
  );
}

export default App;
