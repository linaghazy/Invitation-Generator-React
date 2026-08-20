function InvitationPreview({ template, guestNames}) {
    const currentGuest = guestNames[guestNames.length -1];

  return (
    <main className="flex flex-1 items-center justify-center bg-white p-10">
     {template ? (
        <div className="relative max-h-[80vh]">
        <img
        src={template}
        alt="Invitation preview"
        className="max-h-[80vh] max-w-full object-contain"
        />

        {currentGuest && (
            <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-semibold text-black">
            {currentGuest}
            </p>
        )}
        </div>
     ) : (
        <p className="text-gray-400">
            Upload an invitation template to preview it.
        </p>
     )}
      
    </main>
  );
}

export default InvitationPreview;