import CsvUpload from "./CsvUpload";
import TemplateUpload from "./TemplateUpload";
import NameInput from "./NameInput";
import { useState } from "react"; 



function Sidebar({ setTemplate, selectedGuest, setSelectedGuest, csvGuestNames, setCsvGuestNames }) {
  const [manualGuestNames, setManualGuestNames] = useState([]);
  const [inputMode, setInputMode] = useState("manual");


  return (
    <aside className="w-80 min-h-full bg-[#121212] p-6 text-white border-r border-[#444748]">
      <h2 className="text-lg">
        Invitation Generator
      </h2>

      <TemplateUpload setTemplate={setTemplate} />

      <div className="mt-8">
  <h3 className="mb-3 text-sm font-medium text-gray-300">
    Guest Names
  </h3>

  <div className="flex">
    <button
      onClick={() => setInputMode("manual")}
      className={`flex-1 rounded-l-md px-3 py-2 text-sm transition ${
        inputMode === "manual"
          ? "bg-white text-black"
          : "bg-[#1c1c1c] text-gray-400 hover:bg-[#2a2a2a]"
      }`}
    >
      Enter Names
    </button>

    <button
      onClick={() => setInputMode("csv")}
      className={`flex-1 rounded-r-md px-3 py-2 text-sm transition ${
        inputMode === "csv"
          ? "bg-white text-black"
          : "bg-[#1c1c1c] text-gray-400 hover:bg-[#2a2a2a]"
      }`}
    >
      Enter Guest List 
    </button>
  </div>

  {inputMode === "manual" && (
    <NameInput
      guestNames={manualGuestNames}
      setGuestNames={setManualGuestNames}
      selectedGuest={selectedGuest}
      setSelectedGuest={setSelectedGuest}
    />
  )}

  {inputMode === "csv" && (
    <CsvUpload
    guestNames={csvGuestNames}
    setGuestNames={setCsvGuestNames}
    selectedGuest={selectedGuest}
    setSelectedGuest={setSelectedGuest}
        />
  )}
</div>

      
    </aside>
  );
}

export default Sidebar;