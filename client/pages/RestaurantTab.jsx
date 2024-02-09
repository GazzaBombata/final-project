import React, { useState, useEffect } from 'react';
import { CenteredSection, VerticalContainer, StyledH1, PrimaryButton, LeftAlignSection, StyledLabel, StyledInput, HorizontalContainer, StyledPopup, SecondaryLink  } from '../components/styles.js';
import { fetchRestaurantForUser } from '../api/fetchRestaurantForUser.js'
import { createRestaurant } from '../api/createRestaurant.js'
import { updateRestaurant } from '../api/updateRestaurant.js'
import { uploadRestaurantPhotos } from '../api/uploadRestaurantPhotos.js';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { setRestaurantId } from '../redux/store.js';
import { useQuery } from 'react-query';

function RestaurantTab({ shouldFetch }) {
  
  const [formState, setFormState] = useState({
    Name: '',
    Address: '',
    PhoneNumber: '',
    Email: '',
    CoverPhoto: '',
    ProfilePhoto: '',
    OpeningTime: '',
    ClosingTime: '',
  });

const [originalPhotoUrls, setOriginalPhotoUrls] = useState({ CoverPhoto: null, ProfilePhoto: null });
const [currentPhotos, setCurrentPhotos] = useState({ CoverPhoto: null, ProfilePhoto: null });
const restaurantId = useSelector(state => state.restaurantId);
const [isSubmitting, setIsSubmitting] = useState(false);
const [showLink, setShowLink] = useState(null);
console.log(restaurantId);
console.log(showLink);

useEffect(() => {
  setShowLink(restaurantId);
}, [restaurantId]);


const dispatch = useDispatch();

const fetchRestaurantData = async () => {
  const restaurantData = await fetchRestaurantForUser();
  return restaurantData;
};

const { data: restaurantData, isLoading, isError } = useQuery('restaurantData', fetchRestaurantData, {
  enabled: shouldFetch, // Only fetch when shouldFetch is true
  onSuccess: (data) => {
    // This function will be called every time the query successfully fetches data
    setShowLink(data.RestaurantID);
    dispatch(setRestaurantId(data.RestaurantID));
  },
});

  
useEffect(() => {
  if (restaurantData) {
    setFormState({
      Name: restaurantData.Name,
    Address: restaurantData.Address,
    PhoneNumber: restaurantData.PhoneNumber,
    Email: restaurantData.Email,
    CoverPhoto: restaurantData.CoverPhoto,
    ProfilePhoto: restaurantData.ProfilePhoto,
    OpeningTime: restaurantData.OpeningTime,
    ClosingTime: restaurantData.ClosingTime,
    }
    );
  }
}, [restaurantData]);

useEffect(() => {
  setOriginalPhotoUrls({ CoverPhoto: formState.CoverPhoto, ProfilePhoto: formState.ProfilePhoto });
  setCurrentPhotos({ CoverPhoto: null, ProfilePhoto: null }); 
}, [formState.CoverPhoto, formState.ProfilePhoto]);

const handleChange = (event) => {
  if (event.target.type === 'file') {
    setCurrentPhotos({
      ...currentPhotos,
      [event.target.name]: event.target.files[0],
    });
  } else {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();
  setIsSubmitting(true);
  try {

    const { CoverPhoto, ProfilePhoto, ...otherFields } = formState;

    let imageUrls = { CoverPhoto: originalPhotoUrls.CoverPhoto, ProfilePhoto: originalPhotoUrls.ProfilePhoto };
    if (currentPhotos.CoverPhoto) {
      const name = 'coverPhoto'
      imageUrls.CoverPhoto = await uploadRestaurantPhotos(currentPhotos.CoverPhoto, name);
    }
    if (currentPhotos.ProfilePhoto) {
      const name = 'profilePhoto'
      imageUrls.ProfilePhoto = await uploadRestaurantPhotos(currentPhotos.ProfilePhoto, name);
    }

    console.log(imageUrls)

    const restaurantData = {
      ...otherFields,
      CoverPhoto: imageUrls.CoverPhoto.imageUrl,
      ProfilePhoto: imageUrls.ProfilePhoto.imageUrl,
    };

    if (restaurantId) {
      try {
      console.log('updating restaurant')
      console.log(restaurantId, restaurantData);
      const updatedRestaurant = await updateRestaurant(restaurantId, restaurantData);
      setShowLink(updateRestaurant.RestaurantID);

      console.log(updatedRestaurant);

      alert('Restaurant updated successfully!');
      } catch (error) {
        console.error(error);
      }
      
    } else {
      const newRestaurant = await createRestaurant(restaurantData);
      dispatch(setRestaurantId(newRestaurant.RestaurantID));
      console.log(newRestaurant);
      setShowLink(newRestaurant.RestaurantID);
      alert('Restaurant created successfully!');
    }
  } catch (error) {
    console.error(error);
  };
  setIsSubmitting(false);
};

return (
  <>
  <LeftAlignSection>
    <StyledH1>Add a new Restaurant</StyledH1>
    <form onSubmit={handleSubmit}>
    <VerticalContainer $fitContent={true} $maxWidth={"800px"} $gap={"10px"}>
    {Object.keys(formState).map((key) => (
        <HorizontalContainer key={key}>
          <StyledLabel htmlFor={key}>{key}</StyledLabel>
          {key === 'CoverPhoto' || key === 'ProfilePhoto' ? (
            <VerticalContainer $align="center" >
              {formState[key] && <img src={formState[key]} alt={key} style={{ width: '100px', height: '100px' }} />}
              <StyledInput $maxWidth="200px"
                type="file" 
                id={key} 
                name={key} 
                onChange={handleChange} 
              />
            </VerticalContainer>
          ) : (
            <StyledInput 
              type="text" 
              id={key} 
              name={key} 
              value={formState[key]} 
              onChange={handleChange} 
            />
          )}
        </HorizontalContainer>
      ))}
        <HorizontalContainer>
          <PrimaryButton type="submit">Submit</PrimaryButton>
        </HorizontalContainer>
      </VerticalContainer>
    </form>
  </LeftAlignSection>
  {isLoading || isSubmitting && (
    <StyledPopup>
      <div className="content">
        Loading...
      </div>
    </StyledPopup>
  )}
  {showLink && (
    <SecondaryLink to={`/reserve/${showLink}`}>Visit</SecondaryLink>
  )}
  </>
);
}

export default RestaurantTab;