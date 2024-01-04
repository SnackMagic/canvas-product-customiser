import { useState } from "react";
import CanvasBase from "./components/Canvas";
import ImgUploader from "./components/ImgUploader";
import "./styles.css";

export default function App() {
  const [uploadedLogo, setuploadedLogo] = useState();
  const onImgUpload = (file) => {
    setuploadedLogo(file);
  };
  return (
    <div className="App">
      <h1>Product Customiser</h1>
      <CanvasBase uploadedLogo={uploadedLogo} />
      <ImgUploader onUpload={onImgUpload} />
    </div>
  );
}
