import Home from "./components/Home";
import Navbar from "./components/Nav"
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import AuthForm from "./components/Login";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/:id' element={<ProductDetail />}></Route>
          <Route exact path='/cart' element={<Cart />}></Route>
          <Route exact path='/auth' element={<AuthForm />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
