import './ProductsCard.css'
import { Link } from 'react-router-dom';

const ProductsCard = ({ product, onAddToCart }) => {
  const handleAdd = (e) => {
    e.preventDefault(); 
    onAddToCart(product);
  };

  return (
    <Link to={`/details/${product.id}`}>
      <div className="card-container">
        <img src={product.image} alt={product.name} />
        <h3>{product.price} ₺</h3>
        <span>{product.name}</span>
        <button onClick={handleAdd}>Add to Cart</button>
      </div>
    </Link>
  );
};

export default ProductsCard;