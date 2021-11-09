import React, { useRef } from 'react';
import axios from 'axios';

const AvatarFileInput = ({ setLoading, setAlert, onAvatarUpload }) => {
  const inputRef = useRef();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const fd = new FormData();
    fd.append('avatar', inputRef.current.files[0]);
    try {
      const response = await axios.post('/api/v1/linkstacks/uploadAvatar', fd);
      onAvatarUpload({ avatar: response.data.image });
      console.log(response);
    } catch (error) {
      setAlert(error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="avatar">
        Choose an avatar:
        <input
          type="file"
          id="avatar-upload"
          name="avatar"
          accept="image/*"
          ref={inputRef}
        />
      </label>
      <button type="submit">Upload</button>
    </form>
  );
};

export default AvatarFileInput;
