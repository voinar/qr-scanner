import React from 'react';
import Webcam from 'react-webcam';
import { useState } from 'react';
import styles from '../styles/Webcam.module.css';
import placeholder from '../img/placeholder.jpg';
import Image from 'next/image';

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const [image, setImage] = useState(placeholder);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    setImage(imageSrc);
  }, [webcamRef]);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <Webcam
          className={styles.image}
          audio={false}
          // height={220}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          // width={1280}
          videoConstraints={videoConstraints}
          onClick={capture}
        />
        <button onClick={capture}>Capture photo</button>
      </div>
      <div className={styles.section}>
        <Image
          className={styles.image}
          src={image}
          width={400}
          height={400}
          alt="scanner output"
          onClick={() => setImage(placeholder)}
        />
        <span>Output</span>
      </div>
    </div>
  );
};

export default WebcamCapture;
