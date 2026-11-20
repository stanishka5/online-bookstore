
import { useCart } from "../CartContext";

function Cart() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, book) => sum + (book.price || 299),
    0
  );

  return (
    <div className="books-page">
      <h1>My Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty. Explore our books!</p>
      ) : (
        <>
          <div className="book-grid">
            {cart.map((book, index) => (
              <div className="book-card" key={`${book.id}-${index}`}>
                <img src={book.image} alt={book.title} />
                <h3>{book.title}</h3>
                <p>₹{book.price || 299}</p>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(book.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <h2 className="cart-total">Total: ₹{total}</h2>
        </>
      )}
    </div>
  );
}

export default Cart;
