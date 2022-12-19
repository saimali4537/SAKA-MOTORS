import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
  productListMyReducer,
  productSListReducer,
} from './reducers/productReducers';
import {
  postListReducer,
  postDetailsReducer,
  postDeleteReducer,
  postCreateReducer,
  postUpdateReducer,
  postReviewCreateReducer,
  postTopRatedReducer,
  postListMyReducer,
  postSListReducer,
} from './reducers/postReducers';
import {
  auctionListReducer,
  auctionDetailsReducer,
  auctionDeleteReducer,
  auctionCreateReducer,
  auctionUpdateReducer,
  auctionReviewCreateReducer,
  auctionTopRatedReducer,
  auctionListMyReducer,
  auctionSListReducer,
} from './reducers/auctionReducers';
import {
  bookListReducer,
  bookDetailsReducer,
  bookDeleteReducer,
  bookCreateReducer,
  bookUpdateReducer,
  bookReviewCreateReducer,
  bookTopRatedReducer,
  bookListMyReducer,
  bookListMReducer,
  bookSListReducer,
} from './reducers/bookReducers';
import {
  bidListReducer,
  bidDetailsReducer,
  bidDeleteReducer,
  bidCreateReducer,
  bidUpdateReducer,
  bidReviewCreateReducer,
  bidTopRatedReducer,
  bidListMyReducer,
  bidListMReducer,
  bidSListReducer,
} from './reducers/bidReducers';
import {
  overviewListReducer,
  overviewCreateReducer,
  overviewUpdateReducer,
} from './reducers/overviewReducers';
import {
  protListReducer,
  protDetailsReducer,
  protDeleteReducer,
  protCreateReducer,
  protUpdateReducer,
  protReviewCreateReducer,
  protTopRatedReducer,
  protListMyReducer,
  protSListReducer,
} from './reducers/protReducers';
import {
  storeListReducer,
  storeDetailsReducer,
  storeDeleteReducer,
  storeCreateReducer,
  storeUpdateReducer,
  storeReviewCreateReducer,
  storeTopRatedReducer,
  storeListMyReducer,
} from './reducers/storeReducers';
import { cartReducer } from './reducers/cartReducers'
import { emailRegisterReducer , emailListReducer} from './reducers/emailReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer
} from './reducers/userReducers'
import {
  managerLoginReducer,
  managerRegisterReducer,
  managerDetailsReducer,
  managerUpdateProfileReducer,
  managerListReducer,
  managerDeleteReducer,
  managerUpdateReducer
} from './reducers/managerReducers'
import {
  mechanicLoginReducer,
  mechanicRegisterReducer,
  mechanicDetailsReducer,
  mechanicUpdateProfileReducer,
  mechanicListReducer,
  mechanicDeleteReducer,
  mechanicUpdateReducer
} from './reducers/mechanicReducers'
import {
  adminLoginReducer,
  adminRegisterReducer,
  adminDetailsReducer,
  adminUpdateProfileReducer,
  adminListReducer,
  adminDeleteReducer,
  adminUpdateReducer
} from './reducers/adminReducers'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListMReducer,
  orderListReducer
} from './reducers/orderReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  productListMy: productListMyReducer,
  productSList: productSListReducer,

  postList: postListReducer,
  postDetails: postDetailsReducer,
  postDelete: postDeleteReducer,
  postCreate: postCreateReducer,
  postUpdate: postUpdateReducer,
  postReviewCreate: postReviewCreateReducer,
  postTopRated: postTopRatedReducer,
  postListMy: postListMyReducer,
  postSList: postSListReducer,

  emailRegister: emailRegisterReducer,
  emailList: emailListReducer,

  auctionList: auctionListReducer,
  auctionDetails: auctionDetailsReducer,
  auctionDelete: auctionDeleteReducer,
  auctionCreate: auctionCreateReducer,
  auctionUpdate: auctionUpdateReducer,
  auctionReviewCreate: auctionReviewCreateReducer,
  auctionTopRated: auctionTopRatedReducer,
  auctionListMy: auctionListMyReducer,
  auctionSList: auctionSListReducer,

  bookList: bookListReducer,
  bookDetails: bookDetailsReducer,
  bookDelete: bookDeleteReducer,
  bookCreate: bookCreateReducer,
  bookUpdate: bookUpdateReducer,
  bookReviewCreate: bookReviewCreateReducer,
  bookTopRated: bookTopRatedReducer,
  bookListMy: bookListMyReducer,
  bookListM: bookListMReducer,
  bookSList: bookSListReducer,

  bidList: bidListReducer,
  bidDetails: bidDetailsReducer,
  bidDelete: bidDeleteReducer,
  bidCreate: bidCreateReducer,
  bidUpdate: bidUpdateReducer,
  bidReviewCreate: bidReviewCreateReducer,
  bidTopRated: bidTopRatedReducer,
  bidListMy: bidListMyReducer,
  bidListM: bidListMReducer,
  bidSList: bidSListReducer,

  overviewList: overviewListReducer,
  overviewCreate: overviewCreateReducer,
  overviewUpdate: overviewUpdateReducer,

  protList: protListReducer,
  protDetails: protDetailsReducer,
  protDelete: protDeleteReducer,
  protCreate: protCreateReducer,
  protUpdate: protUpdateReducer,
  protReviewCreate: protReviewCreateReducer,
  protTopRated: protTopRatedReducer,
  protListMy: protListMyReducer,
  protSList: protSListReducer,


  storeList: storeListReducer,
  storeDetails: storeDetailsReducer,
  storeDelete: storeDeleteReducer,
  storeCreate: storeCreateReducer,
  storeUpdate: storeUpdateReducer,
  storeReviewCreate: storeReviewCreateReducer,
  storeTopRated: storeTopRatedReducer,
  storeListMy: storeListMyReducer,

  cart: cartReducer,
  
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,

  managerLogin: managerLoginReducer,
  managerRegister: managerRegisterReducer,
  managerDetails: managerDetailsReducer,
  managerUpdateProfile: managerUpdateProfileReducer,
  managerList: managerListReducer,
  managerDelete: managerDeleteReducer,
  managerUpdate: managerUpdateReducer,

  mechanicLogin: mechanicLoginReducer,
  mechanicRegister: mechanicRegisterReducer,
  mechanicDetails: mechanicDetailsReducer,
  mechanicUpdateProfile: mechanicUpdateProfileReducer,
  mechanicList: mechanicListReducer,
  mechanicDelete: mechanicDeleteReducer,
  mechanicUpdate: mechanicUpdateReducer,


  adminLogin: adminLoginReducer,
  adminRegister: adminRegisterReducer,
  adminDetails: adminDetailsReducer,
  adminUpdateProfile: adminUpdateProfileReducer,
  adminList: adminListReducer,
  adminDelete: adminDeleteReducer,
  adminUpdate: adminUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderListM: orderListMReducer,
  orderList: orderListReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,

  },
  userLogin: { userInfo: userInfoFromStorage }

  
  
  
}


const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store;