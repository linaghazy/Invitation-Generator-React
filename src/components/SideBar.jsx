import TemplateUpload from "./TemplateUpload";
import NameInput from "./NameInput";




function Sidebar({ setTemplate, guestNames, setGuestNames }) {
  return (
    <aside className="w-80 min-h-full bg-[#121212] p-6 text-white border-r border-[#444748]">
      <h2 className="text-lg">
        Invitation Generator
      </h2>

      <TemplateUpload setTemplate={setTemplate} />

      <NameInput 
      guestNames={guestNames}
      setGuestNames={setGuestNames}
      />

      
    </aside>
  );
}

export default Sidebar;