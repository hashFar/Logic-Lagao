import { useState, useEffect } from "react";
import "./Archive.css";

function Archive({
          archivedScripts,
          setArchivedScripts,
          scripts,
          setScripts,
          search
}) {
          const [activeFilter, setActiveFilter] = useState("All");
          const [deleteId, setDeleteId] = useState(null);

          useEffect(() => {
                    const updatedArchive = archivedScripts.filter((script) => {
                              return Date.now() - script.archivedAt < 30 * 24 * 60 * 60 * 1000;
                    });

                    if (updatedArchive.length !== archivedScripts.length) {
                              setArchivedScripts(updatedArchive);
                    }
          }, [archivedScripts, setArchivedScripts]);

          const filteredScripts = archivedScripts.filter((script) => {
                    const matchesFilter =
                              activeFilter === "All" || script.status === activeFilter;

                    const matchesSearch =
                              script.title.toLowerCase().includes(search.toLowerCase());

                    return matchesFilter && matchesSearch;
          });

          function restoreScript(script) {
                    setScripts([script, ...scripts]);
                    setArchivedScripts(
                              archivedScripts.filter((item) => item.id !== script.id)
                    );
          }

          function deleteScript(id) {
                    setArchivedScripts(
                              archivedScripts.filter((script) => script.id !== id)
                    );
                    setDeleteId(null);
          }

          function getDaysLeft(archivedAt) {
                    const expiryDate = archivedAt + 30 * 24 * 60 * 60 * 1000;
                    return Math.max(0, Math.ceil((expiryDate - Date.now()) / (24 * 60 * 60 * 1000)));
          }

          return (
                    <main className="archive-container">
                              <div className="archive-header">
                                        <h1>Archive</h1>
                                        <p>Archived scripts are permanently deleted after 30 days.</p>
                              </div>

                              <div className="archive-filters">
                                        {["All", "Done", "Rejected"].map((filter) => (
                                                  <button
                                                            key={filter}
                                                            className={activeFilter === filter ? "selected" : ""}
                                                            onClick={() => setActiveFilter(filter)}
                                                  >
                                                            {filter}
                                                  </button>
                                        ))}
                              </div>

                              <div className="archive-list">
                                        {filteredScripts.length > 0 ? (
                                                  filteredScripts.map((script) => (
                                                            <div className="archive-row" key={script.id}>
                                                                      <div className="archive-info">
                                                                                <h3>{script.title}</h3>
                                                                                <p>{script.status}</p>
                                                                      </div>

                                                                      <div className="archive-actions">
                                                                                <p className={
                                                                                          getDaysLeft(script.archivedAt) <= 7
                                                                                                    ? "days-left warning"
                                                                                                    : "days-left"
                                                                                }>
                                                                                          {getDaysLeft(script.archivedAt)} days left
                                                                                </p>

                                                                                {deleteId === script.id ? (
                                                                                          <div className="delete-confirm">
                                                                                                    <span>Delete forever?</span>
                                                                                                    <button onClick={() => deleteScript(script.id)}>Yes</button>
                                                                                                    <button onClick={() => setDeleteId(null)}>Cancel</button>
                                                                                          </div>
                                                                                ) : (
                                                                                          <>
                                                                                                    <button className="restore-button" onClick={() => restoreScript(script)}>
                                                                                                              Restore
                                                                                                    </button>
                                                                                                    <button className="delete-button" onClick={() => setDeleteId(script.id)}>
                                                                                                              Delete
                                                                                                    </button>
                                                                                          </>
                                                                                )}
                                                                      </div>
                                                            </div>
                                                  ))
                                        ) : (
                                                  <p className="archive-empty">No archived scripts.</p>
                                        )}
                              </div>
                    </main>
          );
}

export default Archive;