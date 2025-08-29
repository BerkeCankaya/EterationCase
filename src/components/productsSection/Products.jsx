import { useMemo, useState, useEffect } from "react";
import ProductsCard from "../productsSection/ProductsCard";
import "./Products.css";

const PAGE_SIZE = 12;

const Products = ({ products, loading, onAddToCart }) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [products, totalPages, page]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return products.slice(start, start + PAGE_SIZE);
  }, [products, page]);

  if (loading) return <p>Loading...</p>;

  const goTo = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  return (
    <div className="products-wrapper">
      <div className="products-container">
        {pageItems.map((product) => (
          <ProductsCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      <div className="pagination">
  <button
    className="page-btn"
    onClick={() => goTo(page - 1)}
    disabled={page === 1}
  >
    {"<"}
  </button>

  <div className="page-list">
    <button
      className={`page-number ${page === 1 ? "active" : ""}`}
      onClick={() => goTo(1)}
    >
    1
    </button>

    {page > 3 && <span className="dots">…</span>}

    {Array.from({ length: 3 }).map((_, i) => {
      const p = page - 1 + i; 
      if (p <= 1 || p >= totalPages) return null;
      return (
        <button
          key={p}
          className={`page-number ${page === p ? "active" : ""}`}
          onClick={() => goTo(p)}
        >
          {p}
        </button>
      );
    })}

    {page < totalPages - 2 && <span className="dots">…</span>}

    {totalPages > 1 && (
      <button
        className={`page-number ${page === totalPages ? "active" : ""}`}
        onClick={() => goTo(totalPages)}
      >
        {totalPages}
      </button>
    )}
  </div>

  <button
    className="page-btn"
    onClick={() => goTo(page + 1)}
    disabled={page === totalPages}
  >
    {">"}
  </button>
</div>
    </div>
  );
};

export default Products;
