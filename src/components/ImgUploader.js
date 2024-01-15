import { useRef } from "react";

export default function ImgUploader({ onUpload, className = "" }) {
  const inputRef = useRef(null);
  const onChange = () => {
    let file;
    if (inputRef.current.files.length === 1) {
      file = inputRef.current.files[0];
    }
    if (typeof onUpload === "function") {
      onUpload(file);
    }
  };
  return (
    <>
      <label htmlFor="uploadInput" className={`btn btn-primary my-auto ${className}`}>Upload / Modify Logo</label>
      <input
        ref={inputRef}
        type="file"
        accept=".jpg, .png, .jpeg, .svg"
        id="uploadInput"
        onChange={onChange}
        className=""
        style={{ display: "none" }}
      />
    </>
  );
}
