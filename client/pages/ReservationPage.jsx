import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchRestaurant } from '../api/fetchRestaurant.js'; 
import CalendarComponent from '../components/CalendarComponent.jsx';
import { CoverPhoto, WrappableHorizontalLeftAlignContainer, ProfilePhoto, StyledH1, LeftAlignP, HorizontalLeftAlignContainer, HorizontalContainer, CenteredSection, DetailBox } from '../components/styles.js';
import { Phone, Mail, LocationPin, Clock } from 'grommet-icons';
import Head from '../components/Head.jsx';
import { useNavigate } from 'react-router-dom';



function ReservationPage() {
  const { id } = useParams();
  const { data: restaurant, isLoading, error } = useQuery(['restaurant', id], () => fetchRestaurant(id));
  const navigate = useNavigate();

  useEffect(() => {
    if (error && error.message === 'Restaurant not found') {
      navigate('/404');
    }
  }, [error, navigate, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  const coverPhotoUrl = restaurant.CoverPhoto
  const profileImageUrl = restaurant.ProfilePhoto

  return (
    <>
    <Head title={`${restaurant.Name} - reservation page`} description={`Reserve you table for ${restaurant.Name}, ${restaurant.Address} in 2 clicks on Tablebooks`}  siteContent="Tablebooks, restaurant reservations made simple"/>
    <div>
      <CoverPhoto $imageUrl={coverPhotoUrl}>
        <ProfilePhoto src={profileImageUrl} />
      </CoverPhoto>
      <CenteredSection>
      <StyledH1>{restaurant.Name}</StyledH1>
      <WrappableHorizontalLeftAlignContainer  maxWidth="800px" minWidth="800px" align="flex-start" >
        <DetailBox>
          <HorizontalLeftAlignContainer>
            <LocationPin />
            <LeftAlignP>{restaurant.Address}</LeftAlignP>
          </HorizontalLeftAlignContainer>
          <HorizontalLeftAlignContainer>
            <Phone />
            <LeftAlignP>{restaurant.PhoneNumber}</LeftAlignP>
          </HorizontalLeftAlignContainer>
          <HorizontalLeftAlignContainer>
            <Mail />
            <LeftAlignP>{restaurant.Email}</LeftAlignP>
          </HorizontalLeftAlignContainer>
          <HorizontalLeftAlignContainer>
            <Clock />
            <LeftAlignP>{restaurant.OpeningTime} - {restaurant.ClosingTime}</LeftAlignP>
          </HorizontalLeftAlignContainer>

        </DetailBox>
        <HorizontalContainer>
          <CalendarComponent />
        </HorizontalContainer>
      </WrappableHorizontalLeftAlignContainer >
      </CenteredSection>
    </div>
    </>
  );
}

export default ReservationPage;