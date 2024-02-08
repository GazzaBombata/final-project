import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchRestaurant } from '../api/fetchRestaurant.js'; 
import CalendarComponent from '../components/CalendarComponent.jsx';
import { CoverPhoto, ProfilePhoto, StyledH1, LeftAlignP, HorizontalLeftAlignContainer, HorizontalContainer, CenteredSection, VerticalContainer, DetailBox } from '../components/styles.js';
import { Phone, Mail, LocationPin, Clock } from 'grommet-icons';

function ReservationPage() {
  const { id } = useParams();
  const { data: restaurant, isLoading, error } = useQuery(['restaurant', id], () => fetchRestaurant(id));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  console.log(restaurant);
  console.log(restaurant.CoverPhoto);
  const coverPhotoUrl = restaurant.CoverPhoto
  const profileImageUrl = restaurant.ProfilePhoto

  return (
    <div>
      <CoverPhoto $imageUrl={coverPhotoUrl}>
        <ProfilePhoto src={profileImageUrl} />
      </CoverPhoto>
      <CenteredSection>
      <StyledH1>{restaurant.Name}</StyledH1>
      <HorizontalLeftAlignContainer maxWidth="800px" minWidth="800px" align="flex-start">
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
      </HorizontalLeftAlignContainer>
      </CenteredSection>
    </div>
  );
}

export default ReservationPage;