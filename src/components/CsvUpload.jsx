import { useState } from "react";

function CsvUpload({
  guestNames,
  setGuestNames,
  selectedGuest,
  setSelectedGuest,
}) {
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
        .filter((name) => name.toLowerCase() !== "name" && name.toLowerCase() !== "guest name" );

      setGuestNames(names);

      if (names.length > 0) {
        setSelectedGuest(names[0]);
      }
    };

    reader.readAsText(file);
  };

  const handleDownloadTemplate = () => {
    const csvContent = "Guest Name\n";

    const blob = new Blob([csvContent], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "guest-template.csv";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-8">
      <h3 className="mb-4 text-base font-medium">
        Guest List
      </h3>

      <div className="rounded-md border border-[#444748] p-4">

        <button
        type="button"
        onClick={handleDownloadTemplate}
        className="mb-3 w-full rounded-md bg-[#1c1c1c] px-4 py-2 text-sm text-white transition hover:bg-[#2a2a2a]"
        >
          Download Guest List Template 
        </button>
        <label className="block cursor-pointer rounded-md bg-white px-4 py-2 text-center text-sm font-medium text-black transition hover:bg-gray-200">
          Upload Guest List 

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

        {!fileName && (
          <p className="mt-3 text-center text-xs text-gray-500">
            Download the template, enter one guest name per row, save the file, then upload it here.
          </p>
        )}
      </div>

      {guestNames.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-3 text-base font-medium">
            Recipients
          </h3>

          {guestNames.map((guest, index) => (
            <div
              key={index}
              className="mb-2 flex items-center justify-between rounded-md bg-[#1c1c1c] px-3 py-2"
            >
              <button
                onClick={() => setSelectedGuest(guest)}
                className={`flex-1 text-left text-sm ${
                  selectedGuest === guest
                    ? "text-white"
                    : "text-gray-300"
                }`}
              >
                {guest}
              </button>

              <button
                onClick={() => {
                  const updatedNames = guestNames.filter(
                    (_, i) => i !== index
                  );

                  setGuestNames(updatedNames);

                  if (selectedGuest === guest) {
                    setSelectedGuest(null);
                  }
                }}
                className="ml-3 text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            onClick={() => {
              setGuestNames([]);
              setSelectedGuest(null);
              setFileName("");
            }}
            className="mt-2 w-full rounded-md bg-[#1c1c1c] px-3 py-2 text-gray-400 hover:bg-[#2a2a2a] hover:text-white"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}

export default CsvUpload;