import './App.css';
import Navbar from './components/Navbar/Navbar';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import Shop from './pages/Shop';
import ShopCategory from './pages/ShopCategory';
import Product from './pages/Product';
import Cart from './pages/Cart';
// import LoginSignUp from './pages/LoginSignUp';
import Footer from './components/Footer/Footer';
import men_banner from './components/image/mens_banner.png'
import women_banner from './components/image/women_banner.png'
import kids_banner from './components/image/kids_banner.jpg'
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import ForgetPass from './components/Auth/ForgetPass';
import OtpVerification from './components/Auth/OtpVerification';
import UpdatePass from './components/Auth/UpdatePass';

// import Super from './components/Super';

function App() {
  return (
    <div >
      <Router>

        <Navbar />

        <Routes>

          <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<ShopCategory banner={men_banner} category="mens" />} />
          <Route path='/womens' element={<ShopCategory banner={women_banner} category="womens" />} />
          <Route path='/kids' element={<ShopCategory banner={kids_banner} category="kids" />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forgetPass' element={<ForgetPass />} />

          {/* <Route element={<Super />}> */}
          <Route path='/verify' element={<OtpVerification />} />
          <Route path='/updatepass' element={<UpdatePass />} />
          {/* </Route> */}


        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
