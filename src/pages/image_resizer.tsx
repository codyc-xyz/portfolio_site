import { useState, ChangeEvent } from 'react';
import axios from 'axios';

type ImageData = {
  filename: string;
  mimetype: string;
};

type LinkData = {
  link: string;
};

const ImageUpload = () => {
  const [uploadedImages, setUploadedImages] = useState<ImageData[]>([]);
  const [linkedImages, setLinkedImages] = useState<LinkData[]>([]);
  const [inputFields, setInputFields] = useState<number[]>([0]);
  const [width, setWidth] = useState<string>(``);
  const [height, setHeight] = useState<string>(``);

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const newImages = [...uploadedImages];
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append(`file`, files[i]);
      const response = await axios.post(
        `http://localhost:3001/api/upload`,
        formData,
      );
      newImages.push({
        filename: response.data.filename,
        mimetype: response.data.mimetype,
      });
    }
    setUploadedImages(newImages);
  };

  const handleImageLink = (event: ChangeEvent<HTMLInputElement>) => {
    setLinkedImages([...linkedImages, { link: event.target.value }]);
  };

  const handleAddMoreFields = () => {
    setInputFields([...inputFields, inputFields.length]);
  };

  const handleWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWidth(event.target.value);
  };

  const handleHeightChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHeight(event.target.value);
  };

  const handleFormSubmit = () => {
    uploadedImages.forEach((imageData) => {
      axios
        .post(`http://localhost:3001/api/resize`, {
          filename: imageData.filename,
          width: parseInt(width),
          height: parseInt(height),
        })
        .then((response) => {
          alert(`Image ${response.data.filename} resized.`);
          const base64String = response.data.base64String;

          fetch(base64String)
            .then((res) => res.blob())
            .then((blob) => {
              const url = URL.createObjectURL(blob);

              const a = document.createElement(`a`);
              a.style.display = `none`;
              a.href = url;
              a.download = response.data.filename;

              document.body.appendChild(a);
              a.click();

              URL.revokeObjectURL(url);
              document.body.removeChild(a);
            });
        })
        .catch((error) => {
          console.log(`Error resizing image ${imageData.filename}: `, error);
        });
    });
  };
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {inputFields.map((field, index) => (
        <div key={index} className="space-x-4">
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            onChange={handleImageLink}
            className="px-4 py-2 border rounded-md"
            placeholder="Or, enter link "
          />
        </div>
      ))}
      <button
        onClick={handleAddMoreFields}
        className="px-4 py-2 border rounded-md"
      >
        Add More Fields
      </button>
      <div className="flex-row rows-1">
        <label htmlFor="width" className="m-2">
          Width:
        </label>
        <input
          id="width"
          type="text"
          onChange={handleWidthChange}
          className="px-4 py-2 border rounded-md"
          placeholder="Desired width in px"
        />
        <label htmlFor="height" className="m-2">
          Height:
        </label>
        <input
          id="height"
          type="text"
          onChange={handleHeightChange}
          className="px-4 py-2 border rounded-md"
          placeholder="Desired height in px"
        />
      </div>
      <button
        onClick={handleFormSubmit}
        className="px-4 py-2 border rounded-md"
      >
        Resize Images
      </button>
    </div>
  );
};

export default ImageUpload;
