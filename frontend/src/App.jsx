import Home from "./components/Home";
import Navbar from "./components/Navbar"
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";


function App() {
  

  return (
    <>
    <Router>
    <Navbar/>
    
      <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/:id' element={<ProductDetail/>}></Route>
        <Route exact path='/cart' element={<Cart/>}></Route>
      </Routes>
    </Router>
     
    </>
  )
}

export default App
