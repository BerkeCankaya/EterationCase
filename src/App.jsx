import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Header from "./components/header/Header";
import axios from "axios";
import { useEffect, useState } from "react";

const STORAGE_KEY = "cart:v1";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(false);


  const [cartItems, setCartItems] = useState(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : []; }
    catch { return []; }
  });
  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems)); } catch {} }, [cartItems]);
  const total = cartItems.reduce((acc, it) => acc + it.price * it.qty, 0);

  const addToCart = (product) => {
    setCartItems(prev => {
      const ex = prev.find(p => p.id === product.id);
      return ex ? prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p)
                : [...prev, { ...product, qty: 1 }];
    });
  };
  const updateQty = (id, qty) =>
    setCartItems(prev => qty <= 0 ? prev.filter(p => p.id !== id)
                                  : prev.map(p => p.id === id ? { ...p, qty } : p));
  const removeFromCart = (id) => setCartItems(prev => prev.filter(p => p.id !== id));


  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("https://5fc9346b2af77700165ae514.mockapi.io/products");
      setProducts(res.data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

const [search, setSearch] = useState("");

const filteredProducts = !search.trim()
  ? products
  : products.filter(LowerProducts =>
      LowerProducts.name?.toLowerCase().includes(search.trim().toLowerCase())
    );

  return (
    <div>
      <Header total={total} onSearch={setSearch} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={filteredProducts}
              loading={loading}
              onAddToCart={addToCart}
              cartItems={cartItems}
              onUpdateQty={updateQty}
              onRemove={removeFromCart}
              search={search}       
            />
          }
        />
        <Route path="details/:id" element={<Details  products={filteredProducts}
              loading={loading}
              onAddToCart={addToCart} 
              cartItems={cartItems}
              onUpdateQty={updateQty}
              onRemove={removeFromCart}/>} />
      </Routes>
    </div>
  );
}

export default App;
