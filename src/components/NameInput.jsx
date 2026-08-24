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

        </div>
    );
}
export default NameInput;