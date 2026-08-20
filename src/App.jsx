import "./App.css"; 

import TopBar from "./components/TopBar";
import Sidebar from "./components/SideBar";
import InvitationPreview from "./components/InvitationPreview";



function App() {
  return (
    <div className="app">
      <TopBar />
      <div className="main">
        <Sidebar />
        <InvitationPreview />
        </div> 
    </div>
  );
}

export default App;