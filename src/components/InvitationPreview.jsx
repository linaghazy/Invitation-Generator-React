import { useState, useEffect, useRef } from "react";
import JSZip from "jszip"; 

function InvitationPreview({ template, selectedGuest, csvGuestNames = [], fontSettings, }) {
    const [namePosition, setNamePosition] = useState({
        x: 50,
        y: 50,
       });

       const [textBoxWidth, setTextBoxWidth] = useState(70);

    const [previewWidth, setPreviewWidth] = useState(0);
    const imageRef = useRef(null);

    const handleImageClick = (event) => {
    
        const rect = event.currentTarget.getBoundingClientRect();

        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        setNamePosition({
            x,
            y,
        });
    };

    const handleResize = (event) => {
  event.stopPropagation();

  const image = imageRef.current;

  if (!image) {
    return;
  }

  const rect = image.getBoundingClientRect();

   const boxLeft =
    (namePosition.x / 100) * rect.width -
    (textBoxWidth / 100) * rect.width / 2;

  const newWidth =
    ((event.clientX - rect.left - boxLeft) / rect.width) * 100;

  const limitedWidth = Math.min(
    Math.max(newWidth, 20),
    95
  );

  setTextBoxWidth(limitedWidth);
};



    useEffect(() => {
        
        if (!template) {
            return;
        }

        const updateWidth = () => {
            if (imageRef.current) {
                setPreviewWidth(imageRef.current.getBoundingClientRect().width);
            }
        };

        updateWidth();

        window.addEventListener("resize", updateWidth);

        return () => {
            window.removeEventListener("resize", updateWidth);
        };
    }, [template]);

    const getTextLayout = (width, guest, boxWidth = 70) => {
        if (!width) {
            return {
                lines,
                fontSize,
                lineHeight: fontSettings.lineHeight * fontSize,
            };
        }
        const textBoxWidth = width * (boxWidth / 100);

        let fontSize = fontSettings.size; 


    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    context.font = `${fontSettings.weight} ${fontSize}px ${fontSettings.family}`;

    const words = guest.split(" ");
    const lines = [];
    let currentLine = "";

    words.forEach((word) => {
      const testLine = currentLine
        ? `${currentLine} ${word}`
        : word;

      const textWidth = context.measureText(testLine).width;

      if (textWidth <= textBoxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) {
          lines.push(currentLine);
        }

        currentLine = word;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }

    return {
      lines,
      fontSize,
      lineHeight: fontSize * 1.15,
    };
  };
    

    

    const createInvitationBlob = (image, guest) => {
        return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      context.drawImage(
        image,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight
      );

      const x = (namePosition.x / 100) * canvas.width;
      const y = (namePosition.y / 100) * canvas.height;

      const layout = getTextLayout(canvas.width, guest);


      context.font = `600 ${layout.fontSize}px Arial`;
      context.fillStyle = "black";
      context.textAlign = "center";
      context.textBaseline = "middle";


      const startY = y - ((layout.lines.length - 1) * layout.lineHeight) / 2;

      layout.lines.forEach((line, index) => {
        context.fillText(
           line,
           x,
           startY + index * layout.lineHeight
  );
});

      canvas.toBlob(resolve, "image/png");
    });

    };

    const handleDownload = () => {
        if(!template) {
            return;
        }

        const guests = Array.isArray(csvGuestNames) && csvGuestNames.length > 0
        ? csvGuestNames
        : selectedGuest
        ?[selectedGuest]
        : [];

        if (guests.length === 0) {
            return;
        }

        const image = new Image();

        image.onload = async () => {
            if (csvGuestNames.length > 0) {
                const zip = new JSZip();

            for (const guest of guests) {
                const blob = await createInvitationBlob(image, guest);


             if (blob){
                zip.file(`${guest}-invitation.png`, blob);

             }
            }
            const zipBlob = await zip.generateAsync({
              type: "blob",
            });

            const link = document.createElement("a");
            const url = URL.createObjectURL(zipBlob);

        link.href = url;
        link.download = "invitations.zip";

        document.body.appendChild(link);
        link.click();
        link.remove();

        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 1000);

      } else {
        const blob = await createInvitationBlob(
          image,
          selectedGuest
        );

        if (!blob) {
            return;
        }
 
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);

        link.href = url;
        link.download = `${selectedGuest}-invitation.png`;

        document.body.appendChild(link);
        link.remove();
        link.click();


     setTimeout(() => {
 URL.revokeObjectURL(link.href);
     }, 1000);
       
      }
    };

    image.src = template;
  };

  const textLayout = 
  selectedGuest ? getTextLayout(
    previewWidth || 600,
    selectedGuest,
    textBoxWidth
  )
  : null;
  


  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-white p-10">
     {template ? (
        <>

        <div 
        className="relative">
        <img
        ref={imageRef}
        src={template}
        alt="Invitation preview"
        onClick={handleImageClick}
        onLoad={() => {
            if (imageRef.current) {
                setPreviewWidth(
                    imageRef.current.getBoundingClientRect().width
                );
            }
        }}
        className="max-h-[80vh] max-w-full cursor-crosshair object-contain"
        />

        {selectedGuest && textLayout && (
  <div
    className="absolute -translate-x-1/2 -translate-y-1/2 border border-dashed border-gray-500"
    style={{
      left: `${namePosition.x}%`,
      top: `${namePosition.y}%`,
      width: `${textBoxWidth}%`,
    }}
  >
    <div
      className="pointer-events-none text-center"
      style={{
        fontFamily: fontSettings.family,
        fontSize: `${fontSettings.size}px`,
        fontWeight: fontSettings.weight,
        color: fontSettings.color,
        letterSpacing: `${fontSettings.letterSpacing}px`,
        lineHeight: `${fontSettings.lineHeight}`,
      }}
    >
      {textLayout.lines.map((line, index) => (
        <div key={index}>
          {line}
        </div>
      ))}
    </div>

    <button
      type="button"
      onPointerDown={(event) => {
        event.stopPropagation();
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          handleResize(event);
        }
      }}
      onPointerUp={(event) => {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }}
      className="absolute -bottom-2 -right-2 h-4 w-4 cursor-se-resize rounded-full bg-black"
    />
  </div>
        )}
        </div>

        <button
        type="button"
        onClick={handleDownload}
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