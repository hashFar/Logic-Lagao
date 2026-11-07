import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Scripts from "./Pages/Scripts/Scripts";
import Archive from "./Pages/Archive/Archive";
import Contact from "./Pages/Contact/Contact";
import { useState, useEffect } from "react";

function App() {
  const [activePage, setActivePage] = useState("Home");
  const [archivedScripts, setArchivedScripts] = useState(() => {
    const savedArchive = localStorage.getItem("archivedScripts");

    return savedArchive ? JSON.parse(savedArchive) : [];
  });
  const [search, setSearch] = useState("");

  const [scripts, setScripts] = useState(() => {
    const savedScripts = localStorage.getItem("scripts");

    return savedScripts
      ? JSON.parse(savedScripts)
      : [
          {
            id: 1,
            title: "I Tried Learning Python in 7 Days",
            edited: "Edited today · 12 min",
            status: "Approved",
          },
          {
            id: 2,
            title: "Q&A: Your Questions Answered",
            edited: "Edited today · 10 min",
            status: "Not approved",
          },
          {
            id: 3,
            title: "5 Thumbnails That Doubled My Clicks",
            edited: "Edited yesterday · 9 min",
            status: "Not approved",
          },
          {
            id: 4,
            title: "Why Most Channels Stop at 100 Subs",
            edited: "Edited Nov 3 · 11 min",
            status: "Done",
          },
          {
            id: 5,
            title: "Studio Tour 2026",
            edited: "Edited Nov 2 · 6 min",
            status: "Rejected",
          },
          {
            id: 6,
            title: "How I Plan a Month of Videos",
            edited: "Edited Oct 30 · 14 min",
            status: "Approved",
          },
          {
            id: 7,
            title: "Editing Workflow Under 2 Hours",
            edited: "Edited Oct 28 · 8 min",
            status: "Done",
          },
          {
            id: 8,
            title: "My Honest Gear Review",
            edited: "Edited Oct 25 · 13 min",
            status: "Not approved",
          },
          {
            id: 9,
            title: "Collab Intro Script",
            edited: "Edited Oct 21 · 4 min",
            status: "Approved",
          },
          {
            id: 10,
            title: "Channel Update: What Is Next",
            edited: "Edited Oct 18 · 7 min",
            status: "Done",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("scripts", JSON.stringify(scripts));
  }, [scripts]);

  useEffect(() => {
    localStorage.setItem("archivedScripts", JSON.stringify(archivedScripts));
  }, [archivedScripts]);

  return (
    <div>
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        search={search}
        setSearch={setSearch}
      />

      {activePage === "Home" && (
        <Home
          scripts={scripts}
          setScripts={setScripts}
          archivedScripts={archivedScripts}
          setActivePage={setActivePage}
        />
      )}
      {activePage === "Scripts" && (
        <Scripts
          scripts={scripts}
          setScripts={setScripts}
          archivedScripts={archivedScripts}
          setArchivedScripts={setArchivedScripts}
          search={search}
          setSearch={setSearch}
        />
      )}

      {activePage === "Archive" && (
        <Archive
          scripts={scripts}
          setScripts={setScripts}
          archivedScripts={archivedScripts}
          setArchivedScripts={setArchivedScripts}
          search={search}
        />
      )}

      {activePage === "Contact" && <Contact />}

      <Footer setActivePage={setActivePage} />
    </div>
  );
}

export default App;
