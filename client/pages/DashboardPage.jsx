import React, { useEffect, useState } from 'react';
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
import { Button } from 'grommet';
import { Cafeteria, Restaurant, UserNew } from 'grommet-icons';
import LogoutButton from "../components/LogoutButton";
import { makeAdmin } from '../api/makeAdmin.js';
import Head from '../components/Head.jsx';
import resetStates from '../functions-hooks/resetStates.js';


Userfront.init("wn9vz89b");

function DashboardPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const redirectUrl = useSelector(state => state.redirect.redirectUrl);

  const [isLoadingRestaurant, setIsLoadingRestaurant] = useState(true);
  const [isMakingAdmin, setIsMakingAdmin] = useState(false);
  const makeUserAdmin = useSelector(state => state.makeUserAdmin);
  const restaurantId = useSelector(state => state.restaurant.restaurantId);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [shouldFetch, setShouldFetch] = useState(false);
  // Fetch role

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  const performOperations = async () => {
    if (redirectUrl) {
      const thisUrl = window.location.href;
      if (redirectUrl == thisUrl) {
        resetStates(dispatch);
      } else {
        redirectFunction(redirectUrl, navigate);
        return;
      }
    }

    if (!Userfront.tokens.accessToken) {
      navigate('/login');
      return;
    }

    await checkUserLogin(navigate, dispatch);


    const data = await fetchRole()
      .then(async (data) => {
        let owner = data.isOwner
        if (!owner) {
          if (makeUserAdmin && !isMakingAdmin) {
            setIsMakingAdmin(true);
            const res = await makeAdmin();
            setIsMakingAdmin(true);
            setShouldFetch(true);
            owner = true;
          } else {
            console.log('not owner')
            alert('You are not a restaurant owner')
            navigate('/personal');
          }
        }
        if (owner) {
          fetchRestaurantForUser().then((data) => {
            if (data) {
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

  const RedirectToRestaurant = () => {
    useEffect(() => {
      navigate('/dashboard/restaurant');
    }, [navigate]);

    return null;
  };


  return (
    <>
      <Head title="Tablebooks Dashboard" description="Dashboard page in which restaurant owners can set their restaurants reservations settings" siteContent="Tablebooks, dashboard page for restaurant owners" />
      <StyledSidebar isOpen={isSidebarOpen}>
        <ul>
          <li>{isMobile && <button onClick={() => setIsSidebarOpen(false)}>Close Sidebar</button>}</li>
          <li><StyledNavLink to="/dashboard/restaurant" onClick={() => setIsSidebarOpen(false)}><Button icon={<Restaurant />} hoverIndicator /><NavSpan>Restaurant</NavSpan></StyledNavLink></li>
          <li><StyledNavLink to="/dashboard/tables" onClick={() => setIsSidebarOpen(false)}><Button icon={<Cafeteria />} hoverIndicator /><NavSpan>Tables</NavSpan></StyledNavLink></li>
          <li><StyledNavLink to="/dashboard/reservations" onClick={() => setIsSidebarOpen(false)}><Button icon={<UserNew />} hoverIndicator /><NavSpan>Reservations</NavSpan></StyledNavLink></li>
          <li><HorizontalContainer maxWidth="100px"><LogoutButton /></HorizontalContainer></li>
        </ul>
      </StyledSidebar>
      <MainContentWithSideBar>
        {isMobile && <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>Toggle Sidebar</button>}
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