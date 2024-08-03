import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { storage } from './firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const storageRef = ref(storage, `images/${Date.now()}.jpg`);
    const uploadTask = uploadString(storageRef, imageSrc, 'data_url');

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
        alert('Error uploading image: ' + error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          setImages(prevImages => [...prevImages, downloadURL]);
          alert('Image captured and uploaded successfully!');
        });
      }
    );
  };

  return (
    <div className="webcam-container">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="webcam"
      />
      <button onClick={capture}>Capture & Upload</button>
      <progress value={progress} max="100" />
      <div className="images-container">
        {images.map((url, index) => (
          <img key={index} src={url} alt={`Captured ${index}`} style={{ width: '300px', marginTop: '20px' }} />
        ))}
      </div>
    </div>
  );
};

export default WebcamCapture;
