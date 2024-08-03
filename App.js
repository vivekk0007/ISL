import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { storage } from './firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import './App.css';

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      alert('Failed to capture image.');
      return;
    }

    try {
      const storageRef = ref(storage, `images/${Date.now()}.jpg`);
      const uploadTask = await uploadString(storageRef, imageSrc, 'data_url');

      const progress = Math.round((uploadTask.bytesTransferred / uploadTask.totalBytes) * 100);
      setProgress(progress);

      const downloadURL = await getDownloadURL(uploadTask.ref);
      setImages(prevImages => [...prevImages, downloadURL]);
      alert('Image captured and uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image: ' + error.message);
    }
  };

  return (
    <div className="main-container">
      <div className="webcam-container">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="webcam"
        />
        <button className="capture-button" onClick={capture}>Capture & Upload</button>
        <progress value={progress} max="100" className="progress-bar" />
      </div>
      <div className="images-sidebar">
        {images.map((url, index) => (
          <img key={index} src={url} alt={`Captured ${index}`} className="captured-image" />
        ))}
      </div>
    </div>
  );
};

export default WebcamCapture;
