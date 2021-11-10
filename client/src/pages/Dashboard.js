import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSessionContext } from '../context/session-context';
import axios from 'axios';
import { Avatar, AvatarFileInput } from '../components';
import useLocalState from '../hooks/useLocalState';

const Dashboard = () => {
  const { user } = useSessionContext();
  const [linkstack, setLinkstack] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState();

  const fetchLinkstack = async () => {
    hideAlert();
    setLoading(true);
    try {
      const response = await axios.get(`/api/v1/linkstacks/${user.username}`);
      setLinkstack(response.data.linkstack);
    } catch (error) {
      showAlert(error);
    }
    setLoading(false);
  };

  const saveLinkstack = async (fields) => {
    try {
      // update cloud linkstack
      const response = await axios.patch(
        '/api/v1/linkstacks/updateLinkstack',
        fields
      );
      // update local linkstack
      setLinkstack({ ...linkstack, ...fields });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLinkstack();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (alert.show) {
    return <p>{alert.text}</p>;
  }

  return (
    <Wrapper>
      <h2>
        Hello there, <span>{user.username}</span>
      </h2>
      <p>This is your dashboard.</p>
      {linkstack && (
        <Avatar
          src={linkstack.avatar}
          alt="user avatar"
          size={96}
          hoverEffect={true}
          onClick={() => setIsModalOpen(true)}
        />
      )}
      <AvatarFileInput
        setAlert={showAlert}
        onAvatarUpload={saveLinkstack}
        previewSize={96}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h2 span {
    text-transform: capitalize;
  }
`;

export default Dashboard;
