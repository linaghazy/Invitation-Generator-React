import TopBar from "./components/TopBar";
import Sidebar from "./components/SideBar";
import InvitationPreview from "./components/InvitationPreview";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />

      <div className="flex min-h-[calc(100vh-60px)]">
        <Sidebar />
        <InvitationPreview />
      </div>
    </div>
  );
}

export default App;