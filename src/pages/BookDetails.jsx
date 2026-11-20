import { useLocation, useNavigate } from "react-router-dom";

function BookDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="books-page">
        <h2>Book details not available.</h2>
        <button onClick={() => navigate("/books")}>
          Back to Books
        </button>
      </div>
    );
  }

  const { book, image } = state;

  return (
    <div className="book-details">
      <img src={image} alt={book.title} />

      <div>
        <h1>{book.title}</h1>

        <p>
          Author: {book.author_name?.join(", ") || "Unknown"}
        </p>

        <p>
          Published: {book.first_publish_year || "Unknown"}
        </p>

        <p>
          Subjects: {book.subject?.slice(0, 5).join(", ") || "Not available"}
        </p>

        <button onClick={() => navigate("/books")}>
          Back to Books
        </button>
      </div>
    </div>
  );
}

export default BookDetails;