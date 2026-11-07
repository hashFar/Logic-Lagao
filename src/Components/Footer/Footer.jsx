import "./Footer.css";

function Footer(props) {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>Developed By void.</p>
        <button className = "a"  onClick={() => props.setActivePage("Contact")}>
          Contact
        </button>
      </div>
    </footer>
  );
}


export default Footer;