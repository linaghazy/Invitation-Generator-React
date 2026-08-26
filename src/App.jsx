import { useState } from "react";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import InvitationPreview from "./components/InvitationPreview";

function App() {

  const [template, setTemplate] = useState(null);
  
  const [selectedGuest, setSelectedGuest] = useState(null);

  const [csvGuestNames, setCsvGuestNames] = useState([]);

  const [fontSettings, setFontSettings] = useState({
    family: "Arial",
    size: 32,
    weight: 600,
    color: "#000000",
    letterSpacing: 0,
    lineHeight:1.15,
  });
  

  return (
    <div className="min-h-screen bg-white">
      <TopBar />

      <div className="flex min-h-[calc(100vh-60px)]">
        <SideBar 
        setTemplate={setTemplate}
        selectedGuest={selectedGuest}
        setSelectedGuest={setSelectedGuest}
        csvGuestNames={csvGuestNames}
        setCsvGuestNames={setCsvGuestNames}
        fontSettings={fontSettings}
        setFontSettings={setFontSettings}
        />

        <InvitationPreview 
        template={template}
        selectedGuest={selectedGuest}
        csvGuestNames={csvGuestNames}
        fontSettings={fontSettings}
        />
      </div>
    </div>
  );
}

export default App;