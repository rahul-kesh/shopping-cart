import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Products from './components/Products';
import Cart from './components/Cart';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/cart" element={<Cart/>}/>
     
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
