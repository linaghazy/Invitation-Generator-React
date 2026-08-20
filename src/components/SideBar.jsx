import TemplateUpload from "./TemplateUpload";


function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Invitation Generator</h2>
      <TemplateUpload />

    </aside>
  );
}

export default Sidebar;