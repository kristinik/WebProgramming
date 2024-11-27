import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import Home from './Pages/Home/Home';
import Catalog from './Pages/Catalog/Catalog';
import StadiumDetail from './components/ShowStadium/ShowStadium'; // Компонент для деталей стадіону
import CartPage from './components/CartPage/cartpage';
import Checkout from './components/Checkout/checkout';
import Success from './components/Success/success';
import ItemPage from './Pages/ItemPage/ItemPage';

function App() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <Router>
            <Header searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            <Navigation /> {/* Додаємо Navigation окремо від Header */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} /> {/* Додаємо маршрут для /home */}
                <Route path="/catalog" element={<Catalog searchTerm={searchTerm} />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/success" element={<Success />} />
                <Route path="/itempage/:id" element={<ItemPage />} />

            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
