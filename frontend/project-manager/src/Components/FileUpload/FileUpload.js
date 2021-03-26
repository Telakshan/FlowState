import React, { useState, useRef } from "react";

const FileUpload = (props) => {
  const [file, setFile] = useState();
  const [previewFile, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const filePicker = useRef();

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePicker}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg,.pdf"
      />
    </div>
  );
};

export default FileUpload;
