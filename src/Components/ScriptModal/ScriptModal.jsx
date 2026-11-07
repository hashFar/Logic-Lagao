
import { useState } from "react";
import "./ScriptModal.css";

function ScriptModal({ script, onClose, onSave, onArchive }) {
  const [title, setTitle] = useState(script.title);
  const [status, setStatus] = useState(script.status);
  const [description, setDescription] = useState(
    script.description || ""
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (title.trim() === "") {
      alert("Please enter a title.");
      return;
    }

    onSave({
      ...script,
      title: title.trim(),
      status,
      description,
      edited: "Edited just now",
    });

    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="add-script-modal">
        <h2>Script · {script.edited}</h2>

        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            rows="5"
          />

          <div className="modal-actions">
            {(script.status === "Done" ||
              script.status === "Rejected") && (
              <button
                type="button"
                onClick={() => onArchive(script.id)}
              >
                Archive
              </button>
            )}

            <button type="button" onClick={onClose}>
              Cancel
            </button>

            <button type="submit">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ScriptModal;
