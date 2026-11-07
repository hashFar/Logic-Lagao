import "./Navbar.css";

function Navbar(props) {
  return (
    <nav className="site-navbar">
      <div className="navbar-container">

        <div
          className="navbar-logo"
          onClick={() => props.setActivePage("Home")}
        >
          <span className="logo-icon">LL</span>
          <span>Logic Lagao</span>
        </div>

        <div className="nav-links">
          <a href="/" onClick={(e) => {
            e.preventDefault();
            props.setActivePage("Home");
          }}>Home</a>

          <a href="/scripts" onClick={(e) => {
            e.preventDefault();
            props.setActivePage("Scripts");
          }}>Scripts</a>

          <a href="/archive" onClick={(e) => {
            e.preventDefault();
            props.setActivePage("Archive");
          }}>Archive</a>

          <a
            href="/contact"
            className={props.activePage === "Contact" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              props.setActivePage("Contact");
            }}
          >
            Contact
          </a>
        </div>

        {(props.activePage === "Scripts" ||
          props.activePage === "Archive") && (
            <input
              type="text"
              placeholder="Search scripts..."
              value={props.search}
              onChange={(e) => props.setSearch(e.target.value)}
            />
          )}

      </div>
    </nav>
  );
}

export default Navbar;