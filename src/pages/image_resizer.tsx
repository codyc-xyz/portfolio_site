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
  const [error, setError] = useState<string | null>(null);
  const [key, setKey] = useState<number>(0);

  const maxImages = 10;

  const validateImage = (file: File) => {
    const validTypes = [`image/jpeg`, `image/png`, `image/gif`];
    if (validTypes.indexOf(file.type) === -1) {
      throw new Error(`Invalid file type ${file.type}`);
    }
  };

  const validateDimension = (dimension: string) => {
    const dimensionNumber = parseInt(dimension);
    if (isNaN(dimensionNumber) || dimensionNumber <= 0) {
      throw new Error(`Width and height must be positive numbers`);
    }
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length > maxImages) {
      setError(`You can upload up to ${maxImages} images at a time.`);
      return;
    }

    const newImages = [...uploadedImages];
    try {
      for (let i = 0; i < files.length; i++) {
        validateImage(files[i]);
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
      setError(null);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleImageLink = async (event: ChangeEvent<HTMLInputElement>) => {
    const link = event.target.value;
    setLinkedImages([...linkedImages, { link }]);
    try {
      const response = await axios.get(link, { responseType: `blob` });

      const file = new File([response.data], `temp`, {
        type: response.data.type,
      });

      validateImage(file);

      const formData = new FormData();
      formData.append(`file`, file);
      const uploadResponse = await axios.post(
        `http://localhost:3001/api/upload`,
        formData,
      );
      setUploadedImages([
        ...uploadedImages,
        {
          filename: uploadResponse.data.filename,
          mimetype: uploadResponse.data.mimetype,
        },
      ]);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
    }
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
    try {
      validateDimension(width);
      validateDimension(height);
      const resizePromises = uploadedImages.map((imageData) => {
        return axios
          .post(`http://localhost:3001/api/resize`, {
            filename: imageData.filename,
            width: parseInt(width),
            height: parseInt(height),
          })
          .then((response) => {
            const base64String = response.data.base64String;

            return fetch(base64String)
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

                return true;
              });
          })
          .catch((error) => {
            console.log(`Error resizing image ${imageData.filename}: `, error);
            setError(
              `Error resizing image ${imageData.filename}: ${error.message}`,
            );
            return false;
          });
      });

      Promise.all(resizePromises).then((results) => {
        const successCount = results.filter((res) => res).length;
        alert(`${successCount} image(s) resized.`);
      });

      setError(null);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleReset = () => {
    setUploadedImages([]);
    setLinkedImages([]);
    setInputFields([0]);
    setWidth(``);
    setHeight(``);
    setError(null);
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      {inputFields.map((field, index) => (
        <div key={key + index} className="space-x-4">
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
          value={width}
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
          value={height}
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
      <button onClick={handleReset} className="px-4 py-2 border rounded-md">
        Reset
      </button>
    </div>
  );
};

export default ImageUpload;
