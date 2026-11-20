
import { useEffect, useState } from "react";
import { useCart } from "../CartContext";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("fiction");
  const [error, setError] = useState("");

  const { addToCart } = useCart();

  const fetchBooks = async (query) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`
      );

      if (!response.ok) {
        throw new Error("Unable to fetch books");
      }

      const data = await response.json();
      setBooks(data.docs || []);

    } catch (err) {
      console.error(err);
      setError("Unable to load books. Please try again.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks("fiction");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      fetchBooks(search);
    }
  };

  return (
    <div className="books-page">

      <h1>Explore Our Books</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search books or authors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {loading ? (
        <p>Loading books...</p>
      ) : error ? (
        <p>{error}</p>
      ) : books.length === 0 ? (
        <p>No books found.</p>
      ) : (

        <div className="book-grid">

          {books.map((book) => {

            const bookId = book.key;

            const image = book.cover_i
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
              : "https://placehold.co/150x200?text=No+Cover";

            return (
              <div className="book-card" key={bookId}>

                <img
                  src={image}
                  alt={book.title}
                />

                <h3>{book.title}</h3>

                <p>
                  {book.author_name?.[0] || "Unknown Author"}
                </p>

                <p>
                  {book.first_publish_year || "Year unavailable"}
                </p>

                <p>Price: ₹299</p>

                <button
                  className="add-btn"
                  onClick={() =>
                    addToCart({
                      id: bookId,
                      title: book.title,
                      image: image,
                      price: 299
                    })
                  }
                >
                  Add to Cart
                </button>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default Books;
