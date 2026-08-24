import { useState } from "react";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import InvitationPreview from "./components/InvitationPreview";

function App() {

  const [template, setTemplate] = useState(null);
  
  const [selectedGuest, setSelectedGuest] = useState(null);

  const [csvGuestNames, setCsvGuestNames] = useState([]);
  

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
        />

        <InvitationPreview 
        template={template}
        selectedGuest={selectedGuest}
        csvGuestNames={csvGuestNames}
        />
      </div>
    </div>
  );
}

export default App;