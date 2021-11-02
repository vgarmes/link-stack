import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { LinkButton, SocialButton } from '../components/buttons';

const dummyUser = {
  avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
  headline: 'Victor Garcia',
  bio: 'Hi! Im a front end developer',
  links: [
    {
      icon: 'FaTwitch',
      label: 'Twitch',
      url: 'https://www.instagram.com/vgmestre',
    },
    {
      icon: 'FaInstagram',
      label: 'Instagram',
      url: 'https://www.instagram.com/vgmestre',
    },
    {
      icon: 'FaSpotify',
      label: 'Spotify',
      url: 'https://www.instagram.com/vgmestre',
    },
    {
      icon: 'FaLinkedin',
      label: 'LinkedIn',
      url: 'https://www.instagram.com/vgmestre',
    },
  ],
  social: [
    {
      icon: 'FaInstagram',
      url: 'https://www.instagram.com/vgmestre',
      label: 'instagram',
    },
    { icon: 'FaTwitch', url: 'https://twitch.tv/vgmestre', label: 'twitch' },
  ],
};

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 24px 12px;
  width: 100%;
  max-width: 680px;
`;

const UserSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  margin-bottom: 32px;

  .avatar-container {
    margin-bottom: 16px;

    & > img {
      border-radius: 50%;
      width: 96px;
      height: 96px;
      display: block;
      object-fit: contain;
      object-position: initial;
    }
  }

  .user-headline {
    padding: 0 40px;

    h1 {
      font-size: var(--font-size-md);
      line-height: 1.5;
      text-align: center;
      font-weight: 700;
    }
  }

  .user-bio {
    h2 {
      font-size: var(--font-size-sm);
      line-height: 1.5;
      text-align: center;
    }
  }
`;

const LinksSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
`;

const SocialSection = styled.section`
  padding: 16px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
`;

const User = () => {
  const { username } = useParams();
  console.log(username);
  return (
    <Wrapper>
      <UserSection>
        <div className="avatar-container">
          <img src={dummyUser.avatar} alt={dummyUser.headline} />
        </div>
        <div className="user-headline">
          <h1>{dummyUser.headline}</h1>
        </div>
        <div className="user-bio">
          <h2>{dummyUser.bio}</h2>
        </div>
      </UserSection>

      <LinksSection>
        {dummyUser.links.map(({ icon, label, url }, index) => (
          <LinkButton key={index} iconName={icon} label={label} url={url} />
        ))}
      </LinksSection>
      <SocialSection>
        {dummyUser.social.map((link, index) => (
          <SocialButton key={index} {...link} />
        ))}
      </SocialSection>
    </Wrapper>
  );
};

export default User;
