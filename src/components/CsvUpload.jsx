import { useState } from "react";

function CsvUpload({ guestNames, setGuestNames, selectedGuest, setSelectedGuest }) {
  const [fileName, setFileName] = useState("");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
    if (!file) {
      return;
    }

    setFileName(file.name);

const reader = new FileReader();

reader.onload = (e) => {
    const text = e.target.result;

    const names = text
    .split(/\r?\n/)
    .map((name) => name.trim())
    .filter((name) => name !== "")
    .filter((name) => name.toLowerCase() !== "name");

    setGuestNames(names);

    if(names.length > 0) {
        setSelectedGuest(names[0]);
    }

};

reader.readAsText(file);
  };
   
  return (
    <div className="mt-4">
      <div className="rounded-md border border-[#444748] p-4">
        <label className="block cursor-pointer rounded-md bg-white px-4 py-2 text-center text-sm font-medium text-black transition hover:bg-gray-200">
          Choose CSV File

          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {fileName && (
  <p className="mt-3 text-center text-sm text-gray-300">
    {fileName}
  </p>
)}

        <p className="mt-3 text-center text-xs text-gray-500">
          Upload a CSV file containing one guest name per row.
        </p>
      </div>

      {guestNames.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-sm font-medium text-gray-300">
            Guest List
          </p>

          {guestNames.map((guest, index) => (
            <button
              key={index}
              onClick={() => setSelectedGuest(guest)}
              className={`mb-2 block w-full rounded-md px-3 py-2 text-left text-sm transition ${
                selectedGuest === guest 
                  ? "bg-white text-black"
                  : "bg-[#1c1c1c] text-gray-300 hover:bg-[#2a2a2a]"
              }`}
            >
              {guest}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CsvUpload;