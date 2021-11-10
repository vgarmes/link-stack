import React, { useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Button } from './buttons';
import { Avatar, Modal } from '.';

const AvatarContainer = styled.div`
  min-height: ${({ height }) => height}px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`;

const AvatarFileInput = ({
  setAlert,
  onAvatarUpload,
  previewSize,
  isModalOpen,
  setIsModalOpen,
}) => {
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
    <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
      <AvatarContainer height={previewSize}>
        {image && (
          <Avatar
            src={image}
            alt="upload preview"
            onLoad={() => URL.revokeObjectURL(image)}
            size={previewSize}
          />
        )}
      </AvatarContainer>

      <input
        type="file"
        id="avatar-upload"
        name="avatar"
        accept="image/*"
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={displayImage}
      />

      <ButtonGroup>
        <Button
          size="sm"
          colorScheme="primary"
          onClick={() => inputRef.current.click()}
        >
          Pick file
        </Button>

        <Button size="sm" colorScheme="secondary" onClick={handleSubmit}>
          Update avatar
        </Button>
      </ButtonGroup>
    </Modal>
  );
};

export default AvatarFileInput;
