
function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">BookNest</h2>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/books">Books</a>
        <a href="/cart">Cart</a>
      </div>
    </nav>
  );
}

export default Navbar;
