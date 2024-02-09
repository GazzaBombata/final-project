import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledHorizontalLeftAlignContainer, HorizontalContainer, VerticalContainer, StyledH1, StyledH2, PrimaryButton, StyledImage, StyledHorizontalContainer } from '../components/styles'; // replace with your actual file path

const NotFoundPage = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <StyledHorizontalLeftAlignContainer>
      <StyledImage src="https://plus.unsplash.com/premium_photo-1661311950994-d263ea9681a1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Not found" />
      <StyledHorizontalContainer>
        <VerticalContainer $align="center" $gap="20px">
          <StyledH1>Ooops, page not found!</StyledH1>
          <StyledH2>Feel lost let us guide you back to homepage</StyledH2>
          <PrimaryButton onClick={navigateToHome}>Go to Homepage</PrimaryButton>
        </VerticalContainer>
      </StyledHorizontalContainer>
    </StyledHorizontalLeftAlignContainer>
  );
};

export default NotFoundPage;