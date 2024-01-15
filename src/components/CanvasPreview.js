import React, { useRef, useEffect, useState } from "react";
import { fabric } from "fabric";

import { PRINTABLE_AREA } from "../constants/app-defaults";

const {
  top: paTop,
  left: paLeft,
  width: paWidth,
  height: paHeight,
} = PRINTABLE_AREA;

const CanvasPreview = ({ canvasStr: originalCanvas, baseImg }) => {
  const canvasRef = useRef(null);
  const [canvasPreview, setCanvasPreview] = useState();

  useEffect(() => {
    const canvasPreviewElem = new fabric.StaticCanvas(canvasRef.current);
    // canvasPreviewElem.loadFromJSON(canvasElem.toJSON());

    // const rectObjects = canvasPreviewElem.getObjects("rect");
    // canvasPreviewElem.clipPath = rectObjects[0];

    // const canvasContext = canvasPreviewElem.getContext();

    // canvasPreviewElem.drawClipPathOnCanvas(canvasContext);
    // canvasPreviewElem.clipPath = clipPath;
    setCanvasPreview(canvasPreviewElem);
  }, []);

  useEffect(() => {
    if (originalCanvas.length) {
      const obj = JSON.parse(originalCanvas);
      
      const clipPath = new fabric.Rect({
        top: paTop,
        left: paLeft,
        height: paHeight,
        width: paWidth,
        fill: "transparent",
        selectable: false,
        hasControls: false,
        hasBorders: false,
        evented: false,
      });
      // const path = new fabric.Path({ clipPath });
      console.log(1234, obj);
      obj.objects.splice(1, 1);
      obj.objects.forEach((o, idx) => {
        console.log(567, o);
        // if(o.type === "image" && idx > 0) {
        //   o.clipPath = clipPath.toJSON();
        // }
      })
      
      
      canvasPreview.loadFromJSON(obj);
      // canvasPreview.clipPath = clipPath;
      // const canvasContext = canvasPreview.getContext();
      // canvasPreview.drawClipPathOnCanvas(canvasContext);
      // const rectObjects = canvasPreview.getObjects("rect");
      // canvasPreview.remove(rectObjects[0]);
      // const imgObjects = canvasPreview.getObjects("image");
      // imgObjects.forEach((imgObject) => {
      //   imgObject.set({ clipPath: rectObjects[0] });
      // });
      canvasPreview.renderAll();
    }
  }, [originalCanvas]);

  return (
    <canvas ref={canvasRef} width={600} height={700} className="live-preview" />
  );
};

export default CanvasPreview;
