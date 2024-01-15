import React, { useRef, useEffect, useState } from "react";
import { fabric } from "fabric";

import { PRINTABLE_AREA } from "../constants/app-defaults";

const {
  top: paTop,
  left: paLeft,
  width: paWidth,
  height: paHeight,
} = PRINTABLE_AREA;

const CanvasPreview = ({ canvasStr: originalCanvas, baseImg, variants }) => {
  const canvasRef = useRef(null);
  const [canvasPreview, setCanvasPreview] = useState();

  useEffect(() => {
    const canvasPreviewElem = new fabric.StaticCanvas(canvasRef.current, {
      width: 600,
      height: 600,
    });
    const rect = new fabric.Rect({
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
    canvasPreviewElem.clipPath = rect;
    setCanvasPreview(canvasPreviewElem);
  }, []);

  useEffect(() => {
    if (originalCanvas.length) {
      const obj = JSON.parse(originalCanvas);
      // Remove the printable are from preview
      obj.objects.splice(1, 1);
      // Rewrites the preview canvas with the original canvas changes
      canvasPreview.loadFromJSON(obj);
    }
  }, [originalCanvas]);

  return (
    <div className="canvas-wrapper position-relative">
      <img src={baseImg} className="canvas-base-img position-absolute"  style={{ background: variants.color }}/>
      <canvas
        ref={canvasRef}
        className="live-preview position-relative"
      />
    </div>
  );
};

export default CanvasPreview;
