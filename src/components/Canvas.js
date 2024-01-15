import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

import CanvasLivePreview from "./CanvasPreview";
import ImgUploader from "./ImgUploader";

import baseImg from "../assets/shirt.png";

import { PRINTABLE_AREA } from "../constants/app-defaults";

const {
  width: paWidth,
  height: paHeight,
  top: paTop,
  left: paLeft,
} = PRINTABLE_AREA;

export default function CanvasBase() {
  const canvasRef = useRef(null);
  const [canvasElem, setCanvasElem] = useState();
  const [canvasStr, setCanvasStr] = useState("");
  const [uploadedLogo, setuploadedLogo] = useState();

  const onImgUpload = (file) => {
    setuploadedLogo(file);
  };

  useEffect(() => {
    const canvasContainer = new fabric.Canvas(canvasRef.current, {
      // backgroundColor: "orange",
      width: 600,
      height: 600,
    });
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
        // fill: "orange",
        // clipPath: new fabric.Rect({
        //   top: paTop,
        //   left: paLeft,
        //   height: paHeight,
        //   width: paWidth,
        //   fill: "transparent",
        //   selectable: false,
        //   hasControls: false,
        //   hasBorders: false,
        //   evented: false,
        // })
      });

      let rectBox = new fabric.Rect({
        width: paWidth,
        height: paHeight,
        left: paLeft,
        top: paTop,
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
    canvasContainer.on("object:added", function (object) {
      setCanvasStr(JSON.stringify(canvasContainer.toJSON()));
    });
    canvasContainer.on("object:modified", function (object) {
      setCanvasStr(JSON.stringify(canvasContainer.toJSON()));
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
          img
            .scale(0.5)
            .set({ left: PRINTABLE_AREA.left, top: PRINTABLE_AREA.top });
          canvasElem.setActiveObject(img).add(img);
        };
        logoImg.src = evt.target.result;
      };
      reader.readAsDataURL(uploadedLogo);
    }
  }, [uploadedLogo]);

  // useEffect(() => {
  //   setCanvasStr(JSON.stringify(canvasElem));
  // }, [canvasElem]);

  const deleteCurrentImg = () => {
    // to delete a currently active image
  };

  return (
    <>
      <div className="row mb-5">
        <div className="col-md-6">
          <canvas ref={canvasRef} width={600} height={700} className="" />
          <div className="d-flex justify-content-center mt-3 px-4">
            <ImgUploader onUpload={onImgUpload} className="mx-3" />
            <button
              onClick={() => deleteCurrentImg()}
              className="btn btn-danger mx-3"
            >
              Delete Selected Image
            </button>
          </div>
        </div>
        <div className="col-md-6">
          {canvasElem && <CanvasLivePreview canvasStr={canvasStr} />}
          <div className="d-flex justify-content-center">
            {["orange", "pink", "grey"].map((color) => (
              <a key={color} role="button" onClick={() => ""}>
                <div
                  style={{
                    background: color,
                    height: "20px",
                    width: "20px",
                    borderRadius: "5px",
                  }}
                  className="mx-2"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
