import { useState } from "react";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import InvitationPreview from "./components/InvitationPreview";

function App() {

  const [template, setTemplate] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      <TopBar />

      <div className="flex min-h-[calc(100vh-60px)]">
        <SideBar 
        setTemplate={setTemplate}
        />
        <InvitationPreview template={template} />
      </div>
    </div>
  );
}

export default App;