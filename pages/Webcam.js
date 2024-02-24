import React from 'react';
import Webcam from 'react-webcam';
import { useState } from 'react';
import styles from '../styles/Webcam.module.css';
import placeholder from '../img/placeholder.jpg';
import Image from 'next/image';

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: 800,
  height: 800,
  facingMode: 'user',
};

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const [image, setImage] = useState(placeholder);
  const [imageLabel, setImageLabel] = useState('');
  // const [imageStr, setImageStr] = useState('');

  const captureImage = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log('base64: ', imageSrc);
    console.log('imageLabel: ', imageLabel);
    setImage(imageSrc);
  }, [webcamRef]);

  // const encodedData = imageStr;
  // const decodedData = atob(encodedData);

  const sendPictureToApi = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'api post request przyklad',
        imageData: image,
        imageLabel: imageLabel,
      }),
    };
    fetch('http://srv21.mikr.us:40140/send-img', requestOptions)
      .then((response) => console.log('res ', response))
      .catch((error) => console.log('error: ', error));
    // .then((data) => this.setState({ postId: data.id }));
    console.log('sending image to api');
  };

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
          onClick={captureImage}
        />
        <button onClick={captureImage}>Capture photo</button>
        <form>
          <label>
            {/* enter your input */}
            <input
              type="text"
              name="name"
              value={imageLabel}
              placeholder="enter your label"
              onChange={(e) => setImageLabel(e.target.value)}
            />
          </label>
        </form>
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
      {/* <span>enc: {encodedData}</span> */}
      {/* <span>dec: {decodedData}</span> */}
      <div>
        <button onClick={sendPictureToApi}>Send call to API</button>
      </div>
    </div>
  );
};

export default WebcamCapture;
