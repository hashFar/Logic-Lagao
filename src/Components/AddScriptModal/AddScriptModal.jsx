
import { useState } from "react";
import "./AddScriptModal.css";

function AddScriptModal({ onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Not approved");
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (title.trim() === "") {
      alert("Please enter a title.");
      return;
    }

    const newScript = {
      id: Date.now(),
      title: title.trim(),
      status: status,
      description: description,
      edited: "Edited just now",
    };

    onAdd(newScript);
    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="add-script-modal">
        <h2>New script</h2>

        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter script title"
            required
          />

          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Not approved</option>
            <option>Approved</option>
            <option>Done</option>
            <option>Rejected</option>
          </select>

          <label>Script</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write your outline or script..."
            rows="5"
          />

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>

            <button type="submit">
              Add script
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddScriptModal;
