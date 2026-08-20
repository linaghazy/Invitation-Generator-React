import { useState } from "react";

function TemplateUpload() {
    const[template, setTemplate] = useState(null);

    const handleTemplateUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            setTemplate(URL.createObjectURL(file));
        }
    };
return (
    <div className="template-upload">
        <h3>Upload Template</h3>

        <label htmlFor="templateInput" className="upload-button">
            Choose Image
        </label>

        <input
        id="templateInput"
        type="file"
        accept="image/*"
        onChange={handleTemplateUpload}
        />

        {template && (
            <img
            src={template}
            alt="Invitation template"
            className="template-preview"
            />
        )}
    </div>
);

}
export default TemplateUpload; 