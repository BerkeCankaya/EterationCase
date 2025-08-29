import '../pages/pagesCss/Details.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import Cart from '../components/Cart';

const Details = ({ products, loading, onAddToCart,cartItems,onUpdateQty,onRemove }) => {
  const { id } = useParams(); 
  const [fallbackProduct, setFallbackProduct] = useState(null);
  const [fetching, setFetching] = useState(false);

  const productFromList = useMemo(
    () => products?.find(p => String(p.id) === String(id)),
    [products, id]
  );

  useEffect(() => {
    if (!productFromList && !loading && !fetching) {
      setFetching(true);
      axios.get(`https://5fc9346b2af77700165ae514.mockapi.io/products/${id}`)
        .then(res => setFallbackProduct(res.data))
        .catch(console.error)
        .finally(() => setFetching(false));
    }
  }, [productFromList, loading, id, fetching]);

  const product = productFromList ?? fallbackProduct;

  if ((loading || fetching) && !product) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  const priceTR = Number(product.price).toLocaleString("tr-TR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}); 

  return (
   <div className="details-container container">
      <div className="details-section">
        <img src={product.image} alt={product.name} />
        <div className='details-info'>
          <h2>
            {product.name}
            <span>{priceTR} ₺</span>
          </h2>
          <div className='bottom-details-info'>
            <button onClick={() => onAddToCart(product)}>Add to Cart</button>
            <p>{product.description ?? '—'}</p>
          </div>
        </div>
      </div>
      <div className="details-price">
        <Cart 
        items={cartItems}
        onUpdateQty={onUpdateQty}
        onRemove={onRemove}
        />

      </div>
    </div>
  )
}

export default Details