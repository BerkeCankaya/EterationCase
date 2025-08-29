import "../components/Cart.css"

const Cart = ({ items, onUpdateQty, onRemove }) => {
  const total = items.reduce((acc, it) => acc + it.price * it.qty, 0);

  return (
    <div className="cart-container">
      <div className="cart">
        <h2 className="cart-title">Cart</h2>

        <div className="cart-details">
          {items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            items.map((it) => (
              <div key={it.id} className="cart-row">
                <div className="info">
                  <div className="name">{it.name}</div>
                  <div className="price">{it.price}₺</div>
                </div>

                <div className="qty">
                  <button
                    onClick={() =>
                      it.qty > 1
                        ? onUpdateQty(it.id, it.qty - 1)
                        : onRemove(it.id) 
                    }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={it.qty}
                    onChange={(e) => onUpdateQty(it.id, Number(e.target.value))}
                  />
                  <button onClick={() => onUpdateQty(it.id, it.qty + 1)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="price-container">
        <h2 className="cart-title">Checkout</h2>
        <div className="price-details">
          <h3>
            Total Price: <span>{total.toFixed(2)} ₺</span>
          </h3>
          <button className="checkout-btn" disabled={items.length === 0}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;