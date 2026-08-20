function TemplateUpload({ setTemplate }) {

    const handleTemplateUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            setTemplate(URL.createObjectURL(file));
        }
    };

    return (
    <div className="mt-8">
      <h3 className="mb-4 text-base font-medium">
        Upload Template
      </h3>

      <label
        htmlFor="templateInput"
        className="inline-block cursor-pointer rounded-md bg-white px-4 py-2 text-sm text-black transition hover:bg-gray-200"
      >
        Choose Image
      </label>

      <input
        id="templateInput"
        type="file"
        accept="image/*"
        onChange={handleTemplateUpload}
        className="hidden"
      />
    </div>
  );
}

export default TemplateUpload;