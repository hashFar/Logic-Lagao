import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [developerSent, setDeveloperSent] = useState(false);
  const [channelSent, setChannelSent] = useState(false);

  function handleDeveloperSubmit(e) {
    e.preventDefault();
    setDeveloperSent(true);
  }

  function handleChannelSubmit(e) {
    e.preventDefault();
    setChannelSent(true);
  }

  return (
    <main className="contact-container">

      <div className="contact-header">
        <h1>Contact</h1>
        <p>Have a question or suggestion? Get in touch with us.</p>
      </div>

      <div className="contact-forms">

        {/* Developer Form */}
        <section className="contact-card">
          <h2>Contact Developer</h2>
          <p className="contact-description">
            For technical issues, bugs or suggestions.
          </p>

          {developerSent ? (
            <div className="message-success">
              <h3>Message sent!</h3>
              <p>Thank you for reaching out.</p>
              <button onClick={() => setDeveloperSent(false)}>
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleDeveloperSubmit}>
              <label>Name</label>
              <input type="text" placeholder="Your name" required />

              <label>Email</label>
              <input type="email" placeholder="Your email" required />

              <label>Topic</label>
              <input type="text" placeholder="What is this about?" required />

              <label>Message</label>
              <textarea
                placeholder="Write your message..."
                rows="5"
                required
              />

              <button type="submit">Send message</button>
            </form>
          )}
        </section>

        {/* Channel Form */}
        <section className="contact-card">
          <h2>Contact Channel</h2>
          <p className="contact-description">
            For collaborations, feedback or channel-related queries.
          </p>

          {channelSent ? (
            <div className="message-success">
              <h3>Message sent!</h3>
              <p>Thank you for reaching out.</p>
              <button onClick={() => setChannelSent(false)}>
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleChannelSubmit}>
              <label>Name</label>
              <input type="text" placeholder="Your name" required />

              <label>Email</label>
              <input type="email" placeholder="Your email" required />

              <label>Reason</label>
              <input type="text" placeholder="Reason for contacting" required />

              <label>Message</label>
              <textarea
                placeholder="Write your message..."
                rows="5"
                required
              />

              <button type="submit">Send message</button>
            </form>
          )}
        </section>

      </div>
    </main>
  );
}

export default Contact;