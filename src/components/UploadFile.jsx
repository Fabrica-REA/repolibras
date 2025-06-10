import { useState } from "react";
import '../assets/css/uploadFile.css';

const UploadFile = ({ classNameFile, width, onFileChange }) => {
    const [file, setFile] = useState(null);
    const [selected, setSelectedStatus] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        if (selectedFile) {
            setFile(selectedFile);
            setSelectedStatus(true);
            if (onFileChange) {
                onFileChange(selectedFile);
            }
        }
    };

    const handleRemove = () => {
        setFile(null);
        setSelectedStatus(false);
        if (onFileChange) {
            onFileChange(null);
        }
    };

    return (
        <div
            className={classNameFile ? classNameFile : "upload-container"}>
            {!file ? (
                <label htmlFor="dropzone-file" className="upload-content" >
                    <div className="upload-wrapper" >
                        <svg
                            className="upload-icon"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="upload-text">
                            <span className="font-bold">Clique para fazer upload</span>
                        </p>
                        <p className="upload-subtext">MP4, MOV ou WMV</p>
                        <input
                            id="dropzone-file"
                            type="file"
                            className="hidden-input"
                            accept="video/*"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                    </div>
                </label>
            ) : (
                <div className="upload-wrapper">
                    <div className="upload-container" style={{ width: `${width}%` }}>
                        <div className="file-info">
                            {selected && <div className="success-checkmark" />}
                            <div className="file-text">
                                <span className="file-name">{file.name}</span>
                            </div>
                        </div>
                        <div className="remove-btn" onClick={handleRemove}>
                            ×
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadFile;