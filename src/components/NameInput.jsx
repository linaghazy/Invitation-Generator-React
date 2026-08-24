import { useState } from "react";


function NameInput({ guestNames, setGuestNames, selectedGuest, setSelectedGuest }) {
    const[name, setName] = useState("");

    const handleAddName= () => {
        if (name.trim() === "") {
            return;
        }

        setGuestNames([...guestNames, name]);
        setName("");
    };

    return (
        <div className="mt-8">
            <h3 className="mb-4 text-base font-medium">
                Guest Name
            </h3>

            <input
            type="text"
            placeholder="Enter guest name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-md border border-[#444748] bg-[#1c1c1c] px-3 py-2 text-white outline-none placeholder:text-gray-500 focus:border-white"
            />

            <button
            onClick={handleAddName}
            className="mt-3 rounded-md bg-white px-4 py-2 text-sm text-black transition hover:bg-gray-200"
            >
                Add Name 
            </button>

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
                {guestNames.length > 0 && (
                    <button 
                    onClick={() =>{
                        setGuestNames([]);
                        setSelectedGuest(null);
                    }

                    }
                    className="mt-2 w-full rounded-md bg-[#1c1c1c] px-3 py-2 text-gray-400 hover:bg-[#2a2a2a] hover:text-white"
                    >
                        Clear All 
                    </button>
                )}
                </div>
                </div>
    );
}
export default NameInput;
