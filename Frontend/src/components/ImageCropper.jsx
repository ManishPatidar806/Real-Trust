import React, { useState, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const ImageCropper = ({ onCropComplete, aspectRatio = 450 / 350 }) => {
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const cropperRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setCroppedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => {
        const croppedFile = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
        setCroppedImage(URL.createObjectURL(blob));
        onCropComplete(croppedFile);
      }, 'image/jpeg');
    }
  };

  const handleReset = () => {
    setImage(null);
    setCroppedImage(null);
    onCropComplete(null);
  };

  return (
    <div className="space-y-4">
      {!image && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Upload Image *
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-2">
            Recommended size: 450 × 350 pixels
          </p>
        </div>
      )}

      {image && !croppedImage && (
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <Cropper
              ref={cropperRef}
              src={image}
              style={{ height: 400, width: '100%' }}
              aspectRatio={aspectRatio}
              guides={true}
              viewMode={1}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleCrop}
              className="btn-primary flex-1"
            >
              Crop Image
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {croppedImage && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cropped Image Preview
            </label>
            <div className="bg-gray-100 p-4 rounded-lg">
              <img
                src={croppedImage}
                alt="Cropped preview"
                className="max-w-full h-auto mx-auto rounded-lg shadow-md"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary w-full"
          >
            Choose Different Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
