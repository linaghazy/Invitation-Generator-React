import { useState } from "react";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import InvitationPreview from "./components/InvitationPreview";

function App() {

  const [template, setTemplate] = useState(null);
  
  const [selectedGuest, setSelectedGuest] = useState(null);

  const [csvGuestNames, setCsvGuestNames] = useState([]);

  const [fontSettings, setFontSettings] = useState({
    family: "Arial",
    size: 32,
    weight: 400,
    color: "#000000",
    letterSpacing: 0,
    lineHeight:1.15,
    customFont: "",
  });
  
  const handleCustomFontUpload = async (event) => {
    const file = event?.target?.files?.[0];

    if (!file) {
      console.log("No font file selected");
      return;
    }
    

    try {

      const fontName = `CustomFont-${Date.now()}`;

      const fontUrl = URL.createObjectURL(file);

      const font = new FontFace(
        fontName,
         `url("${fontUrl}")`
      );

       await font.load();

      document.fonts.add(font);

      console.log("FONT LOADED:", fontName);
      console.log("FILE:", file.name);


      setFontSettings((previous) => ({
        ...previous,
        family: fontName,
        customFont: file.name,
        weight: 400,
      }));

  
  } catch (error) {
    console.error("CUSTOM FONT ERROR:", error);
  }
    
  };

  return (
    <div className="min-h-screen bg-white">
      <TopBar />

      <div className="flex min-h-[calc(100vh-60px)]">
        <SideBar 
        setTemplate={setTemplate}
        selectedGuest={selectedGuest}
        setSelectedGuest={setSelectedGuest}
        csvGuestNames={csvGuestNames}
        setCsvGuestNames={setCsvGuestNames}
        fontSettings={fontSettings}
        setFontSettings={setFontSettings}
        onCustomFontUpload={handleCustomFontUpload}
        />

        <InvitationPreview 
        template={template}
        selectedGuest={selectedGuest}
        csvGuestNames={csvGuestNames}
        fontSettings={fontSettings}
        />
      </div>
    </div>
  );
}

export default App;