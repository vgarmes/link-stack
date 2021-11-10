import React, { useRef } from 'react';
import styled from 'styled-components';
import useOnClickOutside from '../hooks/useOnClickOutside';

const Wrapper = styled.div`
  position: fixed;
  z-index: 11;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  justify-content: center;

  .modal-content {
    background-color: ${({ theme }) => theme.colors.background};
    margin: auto;
    border-radius: var(--borderRadius);
    width: 60%;
    padding: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    @media (min-width: ${({ theme }) => theme.breakpoints.tabletS}) {
      padding: 40px;
    }
  }

  @media and;
`;

const Modal = ({ children, isOpen, setIsOpen }) => {
  const modalRef = useRef();
  useOnClickOutside(modalRef, () => setIsOpen(false));

  return (
    <Wrapper ref={modalRef}>
      <div className="modal-content">{children}</div>
    </Wrapper>
  );
};

export default Modal;
