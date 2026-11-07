
import { useState } from "react";
import "./Scripts.css";
import AddScriptModal from "../../Components/AddScriptModal/AddScriptModal";
import ScriptModal from "../../Components/ScriptModal/ScriptModal";

function Scripts(props) {
  const [selectedScript, setSelectedScript] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const [commentScriptId, setCommentScriptId] = useState(null);
  const [newComment, setNewComment] = useState("");

  const commentScript = props.scripts.find(
    (script) => script.id === commentScriptId
  );

  function saveScript(updatedScript) {
    const otherScripts = props.scripts.filter(
      (script) => script.id !== updatedScript.id
    );

    props.setScripts([updatedScript, ...otherScripts]);
  }

  function archiveScript(id) {
    const scriptToArchive = props.scripts.find(
      (script) => script.id === id
    );

    if (
      !scriptToArchive ||
      (scriptToArchive.status !== "Done" &&
        scriptToArchive.status !== "Rejected")
    ) {
      return;
    }

    props.setArchivedScripts([
      ...props.archivedScripts,
      { ...scriptToArchive, archivedAt: Date.now() },
    ]);

    props.setScripts(
      props.scripts.filter((script) => script.id !== id)
    );

    setSelectedScript(null);
  }

  function addScript(newScript) {
    props.setScripts([newScript, ...props.scripts]);
  }

  function changeStatus(id, newStatus) {
    const script = props.scripts.find((item) => item.id === id);

    const updatedScript = {
      ...script,
      status: newStatus,
      edited: "Edited just now",
    };

    props.setScripts([
      updatedScript,
      ...props.scripts.filter((item) => item.id !== id),
    ]);
  }

  function addComment() {
    if (!newComment.trim() || !commentScript) return;

    const comment = {
      id: Date.now(),
      text: newComment.trim(),
      date: new Date().toLocaleString(),
    };

    props.setScripts(
      props.scripts.map((script) =>
        script.id === commentScriptId
          ? {
              ...script,
              comments: [...(script.comments || []), comment],
            }
          : script
      )
    );

    setNewComment("");
  }

  const filteredScripts = props.scripts.filter((script) => {
    const matchesFilter =
      activeFilter === "All" || script.status === activeFilter;

    const matchesSearch = script.title
      .toLowerCase()
      .includes(props.search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  function getCount(status) {
    if (status === "All") return props.scripts.length;

    return props.scripts.filter(
      (script) => script.status === status
    ).length;
  }

  const filters = [
    "All",
    "Not approved",
    "Approved",
    "Done",
    "Rejected",
  ];

  return (
    <main className="scripts-container">
      <div className="scripts-header">
        <div>
          <h1>Scripts</h1>
          <p>
            {props.scripts.length} scripts. Click a script to open it.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowModal(true)}
        >
          + New script
        </button>
      </div>

      <div className="scripts-toolbar">
        <div className="filter-tabs">
          {filters.map((filter) => (
            <button
              key={filter}
              className={activeFilter === filter ? "selected" : ""}
              onClick={() => setActiveFilter(filter)}
            >
              {filter} {getCount(filter)}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search scripts"
          value={props.search}
          onChange={(e) => props.setSearch(e.target.value)}
        />
      </div>

      <div className="scripts-list">
        {filteredScripts.length > 0 ? (
          filteredScripts.map((script) => (
            <div className="script-row" key={script.id}>
              <div>
                <h3>
                  <button
                    className="script-title-button"
                    onClick={() => setSelectedScript(script)}
                  >
                    {script.title}
                  </button>
                </h3>

                <p>{script.edited}</p>

                <button
                  className="comments-button"
                  onClick={() => {
                    setCommentScriptId(script.id);
                    setNewComment("");
                  }}
                >
                  Comments ({script.comments?.length || 0})
                </button>
              </div>

              <select
                value={script.status}
                onChange={(e) =>
                  changeStatus(script.id, e.target.value)
                }
              >
                <option>Not approved</option>
                <option>Approved</option>
                <option>Done</option>
                <option>Rejected</option>
              </select>
            </div>
          ))
        ) : (
          <p className="empty-message">No scripts found.</p>
        )}

        {showModal && (
          <AddScriptModal
            onClose={() => setShowModal(false)}
            onAdd={addScript}
          />
        )}

        {selectedScript && (
          <ScriptModal
            script={selectedScript}
            onClose={() => setSelectedScript(null)}
            onSave={saveScript}
            onArchive={archiveScript}
          />
        )}
      </div>

      {commentScript && (
        <div className="modal-overlay">
          <div className="add-script-modal comments-modal">
            <h2>Comments</h2>

            <h3>{commentScript.title}</h3>

            <div className="comments-list">
              {commentScript.comments?.length > 0 ? (
                commentScript.comments.map((comment) => (
                  <div className="comment-item" key={comment.id}>
                    <p>{comment.text}</p>
                    <small>{comment.date}</small>
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </div>

            <textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />

            <div className="modal-actions">
              <button
                type="button"
                onClick={() => setCommentScriptId(null)}
              >
                Close
              </button>

              <button type="button" onClick={addComment}>
                Add comment
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Scripts;
