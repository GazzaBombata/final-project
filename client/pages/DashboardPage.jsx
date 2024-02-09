import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Navigate, NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import { fetchRole } from '../functions-hooks/fetchRole.js'
import RestaurantTab from './RestaurantTab.jsx';
import TablesTab from './TablesTab.jsx';
import ReservationsTab from './ReservationsTab.jsx';
import { StyledSidebar, MainContentWithSideBar, StyledNavLink, NavSpan, HorizontalContainer } from '../components/styles.js';
import { useDispatch, useSelector } from 'react-redux';
import { setRestaurantId } from '../redux/store.js';
import { fetchRestaurantForUser } from '../api/fetchRestaurantForUser.js';
import redirectFunction from '../functions-hooks/redirectFunction.js';
import Userfront from "@userfront/core";
import { useNavigate } from 'react-router-dom';
import { checkUserLogin } from '../api/checkUserLogin.js';
import { Sidebar, Grommet, Avatar, Button, Nav, Main } from 'grommet';
import { Cafeteria, Restaurant, UserNew } from 'grommet-icons';
import LogoutButton from "../components/LogoutButton";
import { makeAdmin } from '../api/makeAdmin.js';


Userfront.init("wn9vz89b");

function DashboardPage() {

const navigate = useNavigate();
const dispatch = useDispatch();

const redirectUrl = useSelector(state => state.redirect.redirectUrl);

const [isLoadingRestaurant, setIsLoadingRestaurant] = useState(true);
const [isMakingAdmin, setIsMakingAdmin] = useState(false);
const makeUserAdmin = useSelector(state => state.makeUserAdmin);
const restaurantId = useSelector(state => state.restaurant.restaurantId);


const [shouldFetch, setShouldFetch] = useState(false);
// Fetch role


const performOperations = async () => {
  if (redirectUrl) {
    console.log(redirectUrl);
    redirectFunction(redirectUrl, navigate);
    return;
  }

  if (!Userfront.tokens.accessToken) {
    navigate('/login');
    return;
  }

  await checkUserLogin(navigate, dispatch);

  const data = await fetchRole()
  .then(async (data) => {
    console.log(data);
    let owner = data.isOwner
    if (!owner) {
      if (makeUserAdmin && !isMakingAdmin) {
        console.log('isOwner is false but makeUserAdmin is true');
        setIsMakingAdmin(true);
        const res = await makeAdmin();
        console.log(res);
        setIsMakingAdmin(true);
        setShouldFetch(true); 
        console.log('makeAdmin done');
        owner = true;
      } else {
        navigate('/personal');
      }
    }
    if (owner) {
      console.log('owner is true');
      fetchRestaurantForUser().then((data) => {
        console.log(data);
        if (data) {
          console.log(data.RestaurantID);
          dispatch(setRestaurantId(data.RestaurantID));
        };
        // Set loading state to false after restaurantId is set
        setIsLoadingRestaurant(false);
  });
    }
  }
  );
};



useEffect(() => {
  performOperations();
}, []);




  if (isLoadingRestaurant) {
    return <p>Loading...</p>; // or a loading indicator
  }

  console.log(restaurantId);

  const RedirectToRestaurant = () => {
    useEffect(() => {
      navigate('/dashboard/restaurant');
    }, [navigate]);
  
    return null;
  };


  return (
    <>
      <StyledSidebar>
        <ul>
          <li><StyledNavLink to="/dashboard/restaurant"><Button icon={<Restaurant />} hoverIndicator /><NavSpan>Restaurant</NavSpan></StyledNavLink></li>
          <li><StyledNavLink to="/dashboard/tables"><Button icon={<Cafeteria />} hoverIndicator /><NavSpan>Tables</NavSpan></StyledNavLink></li>
          <li><StyledNavLink to="/dashboard/reservations"><Button icon={<UserNew />} hoverIndicator /><NavSpan>Reservations</NavSpan></StyledNavLink></li>
          <li><HorizontalContainer maxWidth="100px"><LogoutButton /></HorizontalContainer></li>
        </ul>
      </StyledSidebar>
      <MainContentWithSideBar>
        {!isLoadingRestaurant && (
          <Routes>
            <Route path="/" element={<RedirectToRestaurant />} />
            <Route path="restaurant" shouldFetch={shouldFetch} element={<RestaurantTab />} />
            <Route path="tables" element={<TablesTab />} />
            <Route path="reservations" element={<ReservationsTab />} />
          </Routes>
        )}
      </MainContentWithSideBar>
    </>
  );
}

export default DashboardPage;