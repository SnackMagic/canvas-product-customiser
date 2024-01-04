import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

import baseImg from "../assets/prod.webp";

export default function CanvasBase({ uploadedLogo }) {
  const canvasRef = useRef(null);
  const [canvasElem, setCanvasElem] = useState();

  useEffect(() => {
    const canvasContainer = new fabric.Canvas(canvasRef.current);
    fabric.Image.fromURL(baseImg, (img) => {
      img.set({
        left: 0,
        top: 0,
        selectable: false,
        hasControls: false,
        hasBorders: false,
        lockMovementX: true,
        lockMovementY: true,
        lockOrientation: true,
        evented: false,
      });

      let rectBox = new fabric.Rect({
        width: 100,
        height: 100,
        left: 320,
        top: 150,
        fill: "transparent",
        stroke: "red",
        strokeDashArray: [5, 5, 5, 5],
        strokeWidth: 2,
        selectable: false,
        hasControls: false,
        hasBorders: false,
        evented: false,
      });
      canvasContainer.add(img).add(rectBox);
    });
    setCanvasElem(canvasContainer);
  }, []);

  useEffect(() => {
    if (uploadedLogo) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const logoImg = new Image();
        logoImg.onload = () => {
          const img = new fabric.Image(logoImg);
          img.scale(0.5).set({ left: 320, top: 150 });
          canvasElem.setActiveObject(img).add(img);
        };
        logoImg.src = evt.target.result;
      };
      reader.readAsDataURL(uploadedLogo);
    }
  }, [uploadedLogo]);
  return <canvas ref={canvasRef} width={600} height={700} />;
}
