import { useRef } from "react";

export default function ImgUploader({ onUpload }) {
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
      <label htmlFor="uploadInput">Upload Logo</label>
      <input
        ref={inputRef}
        type="file"
        accept=".jpg, .png, .jpeg, .svg"
        id="uploadInput"
        onChange={onChange}
      />
    </>
  );
}
