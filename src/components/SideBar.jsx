import CsvUpload from "./CsvUpload";
import TemplateUpload from "./TemplateUpload";
import NameInput from "./NameInput";
import { useState } from "react"; 



function Sidebar({ setTemplate, selectedGuest, setSelectedGuest, csvGuestNames, setCsvGuestNames, fontSettings, setFontSettings, }) {
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

<div className="mt-8 border-t border-[#444748] pt-6">
  <h3 className="mb-4 text-base font-medium">
    Text Properties
  </h3>

  <div className="space-y-4">

    <div>
      <label className="mb-2 block text-sm text-gray-300">
        Font Family
      </label>

      <select
      value={fontSettings.family}
      onChange={(event) => 
        setFontSettings({
          ...fontSettings,
          family: event.target.value,
        })
      }
      className="w-full rounded-md border border-[#444748] bg-[#1c1c1c] px-3 py-2 text-white outline-none"
      >
        <optgroup label="System Fonts">
        <option value="Arial">Arial</option>
        <option value="Georgia">Georgia</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
        <option value="Verdana">Verdana</option>
        <option value="Trebuchet MS">Trebuchet MS</option>
        </optgroup>

        <optgroup label="Invitation Fonts">
    <option value="Poppins">Poppins</option>
    <option value="Montserrat">Montserrat</option>
    <option value="Playfair Display">Playfair Display</option>
    <option value="Lora">Lora</option>
    <option value="Great Vibes">Great Vibes</option>
    <option value="Dancing Script">Dancing Script</option>
  </optgroup>
      </select>
    </div>

    <div>
      <label className="mb-2 block text-sm text-gray-300">
        Font Size 
      </label>

      <input
      type="number"
      value={fontSettings.size}
      onChange={(event) =>
        setFontSettings({
          ...fontSettings,
          size: Number(event.target.value),
        })
      }
      className="w-full rounded-md border border-[#444748] bg-[#1c1c1c] px-3 py-2 text-white outline-none"
      />
    </div>

    <div>
      <label className="mb-2 block text-sm text-gray-300">
        Font Weight
      </label>

      <select
      value={fontSettings.weight}
      onChange={(event) =>
        setFontSettings({
          ...fontSettings,
          weight: Number(event.target.value),
        })
      }
      className="w-full rounded-md border border-[#444748] bg-[#1c1c1c] px-3 py-2 text-white outline-none"
      >
        <option value="400">Regular</option>
        <option value="700">Bold</option> 
      </select>

    </div>

    <div>
      <label className="mb-2 block text-sm text-gray-300">
        Text Color
      </label>

      <input
      type="color"
      value={fontSettings.color}
      onChange={(event) =>
        setFontSettings({
          ...fontSettings,
          color: event.target.value,

        })
      }
      className="h-10 w-full cursor-pointer rounded-md border border-[#444748] bg-[#1c1c1c]"
      />

    </div>

    <div>
      <label className="mb-2 block text-sm text-gray-300">
        Letter Spacing
      </label>

      <input
        type="number"
        value={fontSettings.letterSpacing}
        onChange={(event) =>
          setFontSettings({
            ...fontSettings,
            letterSpacing: Number(event.target.value),
          })
        }
        className="w-full rounded-md border border-[#444748] bg-[#1c1c1c] px-3 py-2 text-white outline-none"
      />
    </div>

    <div>
      <label className="mb-2 block text-sm text-gray-300">
        Line Height
      </label>

      <input
        type="number"
        step="0.1"
        value={fontSettings.lineHeight}
        onChange={(event) =>
          setFontSettings({
            ...fontSettings,
            lineHeight: Number(event.target.value),
          })
        }
        className="w-full rounded-md border border-[#444748] bg-[#1c1c1c] px-3 py-2 text-white outline-none"
      />
    </div>
    </div>
  </div>
  
      
    </aside>
  );


}

export default Sidebar;