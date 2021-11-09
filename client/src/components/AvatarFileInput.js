import React, { useRef } from 'react';
import axios from 'axios';

import { Button } from './buttons';

const AvatarFileInput = ({ setAlert, onAvatarUpload }) => {
  const inputRef = useRef();
  const [image, setImage] = React.useState();

  const handleSubmit = async () => {
    const fd = new FormData();
    fd.append('avatar', inputRef.current.files[0]);
    try {
      const response = await axios.post('/api/v1/linkstacks/uploadAvatar', fd);
      onAvatarUpload({ avatar: response.data.image });
      console.log(response);
    } catch (error) {
      setAlert(error);
    }
  };

  const displayImage = () => {
    if (inputRef.current.files[0]) {
      setImage(URL.createObjectURL(inputRef.current.files[0]));
    }
  };

  return (
    <>
      <input
        type="file"
        id="avatar-upload"
        name="avatar"
        accept="image/*"
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={displayImage}
      />

      <Button
        size="sm"
        colorScheme="secondary"
        onClick={() => inputRef.current.click()}
      >
        Pick file
      </Button>

      <Button size="sm" colorScheme="primary" onClick={handleSubmit}>
        Update avatar
      </Button>
      {image && (
        <img
          src={image}
          alt="upload"
          onLoad={() => URL.revokeObjectURL(image)}
        />
      )}
    </>
  );
};

export default AvatarFileInput;
