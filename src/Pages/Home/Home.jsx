import AddScriptModal from "../../Components/AddScriptModal/AddScriptModal";
import { useState } from "react";
import "./Home.css";

function Home(props) {
  const [showModal, setShowModal] = useState(false);

  function addScript(newScript) {
    props.setScripts([newScript, ...props.scripts]);
  }

  const activeScripts = props.scripts.filter(
    (script) => script.status !== "Done"
  );

  const recentScripts = props.scripts.slice(0, 5);

  const statusCounts = {
    "Not approved": props.scripts.filter(
      (script) => script.status === "Not approved"
    ).length,
    Approved: props.scripts.filter(
      (script) => script.status === "Approved"
    ).length,
    Done: props.scripts.filter(
      (script) => script.status === "Done"
    ).length,
    Rejected: props.scripts.filter(
      (script) => script.status === "Rejected"
    ).length,
  };

  return (
    <main className="home-container">
      <div className="home-header">
        <div>
          <h1>Your scripts, in order.</h1>
          <p>
            {activeScripts.length} active scripts across your channel.
            Pick up where you left off.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowModal(true)}
        >
          + New script
        </button>
      </div>

      <div className="status-counts">
        <div className="status-item">
          <p><span className="status-dot not-approved"></span>Not approved</p>
          <h2>{statusCounts["Not approved"]}</h2>
        </div>

        <div className="status-item">
          <p><span className="status-dot approved"></span>Approved</p>
          <h2>{statusCounts.Approved}</h2>
        </div>

        <div className="status-item">
          <p><span className="status-dot done"></span>Done</p>
          <h2>{statusCounts.Done}</h2>
        </div>

        <div className="status-item">
          <p><span className="status-dot rejected"></span>Rejected</p>
          <h2>{statusCounts.Rejected}</h2>
        </div>
      </div>

      <div className="recent-scripts">
        <div className="recent-header">
          <h2>Recent scripts</h2>
          <button onClick={() => props.setActivePage("Scripts")}>
            View all
          </button>
        </div>

        {recentScripts.length > 0 ? (
          recentScripts.map((script) => (
            <div className="script-row" key={script.id}>
              <div>
                <h3>{script.title}</h3>
                <p>{script.edited || "Recently added"}</p>
              </div>

              <span
                className={`script-status ${
                  script.status === "Approved"
                    ? "blue"
                    : script.status === "Not approved"
                    ? "orange"
                    : script.status === "Done"
                    ? "green"
                    : "red"
                }`}
              >
                {script.status}
              </span>
            </div>
          ))
        ) : (
          <p>No scripts yet.</p>
        )}

        {showModal && (
          <AddScriptModal
            onClose={() => setShowModal(false)}
            onAdd={addScript}
          />
        )}
      </div>

      <div className="archive-reminder">
        <span>
          {props.archivedScripts.length} scripts in the archive.
          Archived scripts are deleted permanently after 30 days.
        </span>

        <button onClick={() => props.setActivePage("Archive")}>
          Review archive
        </button>
      </div>
    </main>
  );
}

export default Home;