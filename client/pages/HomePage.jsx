import React from 'react';
import { BenefitsSection, BenefitsContainer, Benefit, HeroSection, PrimaryButton, StyledWhiteH1, StyledH2, CenteredWhiteP, CenteredP, FinalSection, Main, StyledH3 } from '../components/styles.js';
import { View, Money, Snapchat, UserManager} from 'grommet-icons';
import { useDispatch } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { setMakeUserAdmin } from '../redux/store.js';
import Head from '../components/Head.jsx';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick() {
    dispatch(setMakeUserAdmin(true));
    navigate('/signup');
  }


  return (
    <>
    <Head title="Tablebooks" description="Tablebooks simplifies table reservations for restaurant orders." siteContent="Tablebooks, restaurant reservations made simple"/>
    <Main>
      <HeroSection>
        <StyledWhiteH1>Are you ready to get more customers?</StyledWhiteH1>
        <CenteredWhiteP>Become a TableBooks partner in less than 5 minutes</CenteredWhiteP>
        <PrimaryButton to="/signup" onClick={handleClick}>Begin</PrimaryButton>
      </HeroSection>

      <BenefitsSection>
        <StyledH2>The benefits of working with Tablebooks:</StyledH2>
        <BenefitsContainer>
          <Benefit>
            <View size="large" />
            <StyledH3>Increase your visibility</StyledH3>
            <CenteredP>Gain a presence online and gather you customers in one place.</CenteredP>
          </Benefit>
          <Benefit>
            <Money size="large" />
            <StyledH3>Widen your customer base</StyledH3>
            <CenteredP>Use your unique Url to gather reservations with Digital Marketing, ffering unique discounts.</CenteredP>
          </Benefit>
          <Benefit>
            <Snapchat size="large" />
            <StyledH3>Reduce No-Shows</StyledH3>
            <CenteredP>Reduce No-SHows impact by sending SMS and email reminders to your customers</CenteredP>
          </Benefit>
          <Benefit>
            <UserManager size="large" />
            <StyledH3>First-Class Support</StyledH3>
            <CenteredP>We assist you thorughout the process with a team of dedicated experts</CenteredP>
          </Benefit>


        </BenefitsContainer>
      </BenefitsSection>

      <FinalSection>
        <StyledH2>Try TableBooks Manager, the reservation management software tailored on your restaurant needs. Choose the plan you prefer and start your presence online in less than 5 minutes!</StyledH2>
        <PrimaryButton to="/signup" onClick={handleClick}>Begin</PrimaryButton>
      </FinalSection>
    </Main>
    </>
  );
};

export default HomePage;
