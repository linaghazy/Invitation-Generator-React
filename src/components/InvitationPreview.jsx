function InvitationPreview({ template }) {
  return (
    <main className="flex flex-1 items-center justify-center bg-white p-10">
     {template ? (
        <img
        src={template}
        alt="Invitation preview"
        className="max-h-[80vh] max-w-full object-contain"
        />
     ) : (
        <p className="text-gray-400">
            Upload an invitation template to preview it.
        </p>
     )}
      
    </main>
  );
}

export default InvitationPreview;