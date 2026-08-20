import { useState } from "react";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import InvitationPreview from "./components/InvitationPreview";

function App() {

  const [template, setTemplate] = useState(null);
  const [guestNames, setGuestNames] = useState([]); 
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [namePosition, setNamePosition] = useState({
    x: 50,
    y: 50,
  });
  

  return (
    <div className="min-h-screen bg-white">
      <TopBar />

      <div className="flex min-h-[calc(100vh-60px)]">
        <SideBar 
        setTemplate={setTemplate}
        guestNames={guestNames}
        setGuestNames={setGuestNames}
        selectedGuest={selectedGuest}
        setSelectedGuest={setSelectedGuest}
        />
        <InvitationPreview 
        template={template}
        guestNames={guestNames}
        selectedGuest={selectedGuest}
        namePosition={namePosition}
        setNamePosition={setNamePosition} />
      </div>
    </div>
  );
}

export default App;