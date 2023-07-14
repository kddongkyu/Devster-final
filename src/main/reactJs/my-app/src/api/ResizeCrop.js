import React, { useState, useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import './style/ResizeCrop.css'

function ResizeCrop(props) {
    const cropperRef = useRef(null);
    // 유저가 첨부한 이미지
    const [inputImage, setInputImage] = useState(null);
    // 유저가 선택한 영역만큼 크롭된 이미지
    const [croppedImage, setCroppedImage] = useState(null);

    const onCrop = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        setCroppedImage(cropper.getCroppedCanvas().toDataURL());
    };

    return (
        <div>
            <div style={{ width: "100%" }}>
                <input type="file" onChange={(e) => setInputImage(URL.createObjectURL(e.target.files[0]))} />
                <button>Use default img</button>
                <br />
                <br />
                <Cropper
                    ref={cropperRef}
                    style={{ height: 400, width: "100%" }}
                    zoomTo={0.5}
                    initialAspectRatio={1}
                    preview=".img-preview"
                    src={inputImage}
                    viewMode={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                    guides={true}
                />
            </div>
            <div>
                <div className="box" style={{ width: "50%", float: "right" }}>
                    <h1>Preview</h1>
                    <div
                        className="img-preview"
                        style={{ width: "100%", float: "left", height: "300px" }}
                    />
                </div>
                <div
                    className="box"
                    style={{ width: "50%", float: "right", height: "300px" }}
                >
                    <h1>
                        <span>Crop</span>
                        <button style={{ float: "right" }} onClick={(e)=>{
                            setCroppedImage(cropperRef.current)
                        }}>
                            Crop Image
                        </button>
                    </h1>
                    <img style={{ width: "100%" }} src={croppedImage} alt="cropped" />
                </div>
            </div>
            <br style={{ clear: "both" }} />
        </div>
    );
}

export default ResizeCrop;