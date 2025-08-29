import { useMemo, useState, useEffect } from "react";
import SortFilter from "../components/filters/SortFilter";
import BrandFilter from "../components/filters/BrandFilter";
import ModelFilter from "../components/filters/ModelFilter";
import Products from "../components/productsSection/Products";
import Cart from "../components/Cart";
import "../pages/pagesCss/Home.css";

const Home = ({ products, loading, onAddToCart, cartItems, onUpdateQty, onRemove }) => {
  const [sortBy, setSortBy] = useState("OldToNew");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);

  const availableModels = useMemo(() => {
    const pool = selectedBrands.length > 0
      ? products.filter(p => selectedBrands.includes(p.brand))
      : [];
    return [...new Set(pool.map(p => p.model))];
  }, [products, selectedBrands]);

  useEffect(() => {
    if (selectedModels.length === 0) return;
    const pruned = selectedModels.filter(m => availableModels.includes(m));
    if (pruned.length !== selectedModels.length) {
      setSelectedModels(pruned);
    }
  }, [availableModels, selectedModels]);

  const visibleProducts = useMemo(() => {
    const byBrand =
      selectedBrands.length > 0
        ? products.filter(p => selectedBrands.includes(p.brand))
        : products;

    const byModel =
      selectedModels.length > 0
        ? byBrand.filter(p => selectedModels.includes(p.model))
        : byBrand;

    const arr = [...byModel];
    const num = (v) =>
      typeof v === "number"
        ? v
        : Number(String(v).replace(/[^\d,.-]/g, "").replace(",", "."));

    switch (sortBy) {
      case "OldToNew":
        arr.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "NewToOld":
        arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "HighToLow":
        arr.sort((a, b) => num(b.price) - num(a.price));
        break;
      case "LowToHigh":
        arr.sort((a, b) => num(a.price) - num(b.price));
        break;
      default:
        break;
    }
    return arr;
  }, [products, selectedBrands, selectedModels, sortBy]);

  return (
    <div className='container home-container'>
      <div className='filters'>
        <SortFilter sortBy={sortBy} onChange={setSortBy} />
        <BrandFilter products={products} onBrandChange={setSelectedBrands} />
        <ModelFilter
          products={products}
          selectedBrands={selectedBrands}
          selectedModels={selectedModels}
          onModelChange={setSelectedModels}
        />
      </div>

      <div className="products">
        <Products
          products={visibleProducts}
          loading={loading}
          onAddToCart={onAddToCart}
          sortBy={sortBy}
        />
      </div>

      <div className="price">
        <Cart items={cartItems} onUpdateQty={onUpdateQty} onRemove={onRemove} />
      </div>
    </div>
  );
};

export default Home;
