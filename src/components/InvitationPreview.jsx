import { useState } from "react";

function InvitationPreview({ template, selectedGuest }) {
    const [namePosition, setNamePosition] = useState({
        x: 50,
        y: 50,
       });

    const handleImageClick = (event) => {
    
        const rect = event.currentTarget.getBoundingClientRect();

        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        setNamePosition({
            x,
            y,
        });
    };

  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-white p-10">
     {template ? (
        <>

        <div 
        className="relative">
        <img
        src={template}
        alt="Invitation preview"
        onClick={handleImageClick}
        className="max-h-[80vh] max-w-full cursor-crosshair object-contain"
        />

        {selectedGuest && (
            <p 
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 text-3xl font-semibold text-black"
            style={{
                left: `${namePosition.x}%` ,
                top: `${namePosition.y}%` ,
            }}>
            {selectedGuest}
            </p>
        )}
        </div>
        <button
        className="mt-6 rounded-md bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
            Generate & Download 
        </button>
        </>
     ) : (
        <p className="text-gray-400">
            Upload an invitation template to preview it.
        </p>
     )}
      
    </main>
  );
}

export default InvitationPreview;