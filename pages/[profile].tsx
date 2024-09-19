import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Avatar, Box, Container, Typography } from '@mui/material';
import { getProfileDataOnId } from '../services/user-service';
import { setLoggedIn } from '../slices/authslice';
import { useDispatch } from 'react-redux';

const ProfileOfUser = () => {
  const [getProfileOfViewedUser, setGetProfileOfViewedUser] = useState(null);
  const router = useRouter();
  const authDispatch = useDispatch();
  const profileId = router.query.profile;
  const isDrawerOpen = 0;
  const city = "New Panvel";
  const state = "Maharashtra";

  useEffect(() => {
    if (localStorage.getItem("AUTH_TOKEN")) {
      getProfileDataOnId(profileId).then((response: any) => {
        setGetProfileOfViewedUser(response[0]);
      }).catch(error => {
        console.error(error);
      });
    }
  }, [profileId]);

  useEffect(() => {
    if (!localStorage.getItem("AUTH_TOKEN")) {
      authDispatch(setLoggedIn({
        isLoggedIn: false,
        userData: null,
        error: '',
      }));
      router.push('/Authentication');
    }
  }, []);

  return (
    <Container component="main" style={{ marginTop: "100px", minHeight: "100vh", marginBottom: "50px", marginLeft: isDrawerOpen === 1 ? "300px" : "300px" }} >
      <h1 style={{marginBottom: "30px"}}>PROFILE</h1>
      <Box style={{ display: "flex", alignItems: "center", gap: "50px" }} >
        <Avatar sx={{ width: 100, height: 100, cursor: "pointer" }} src={`data:image/png;base64,${getProfileOfViewedUser && getProfileOfViewedUser.profileImage}`}>N</Avatar>
        <Box>
          <Typography variant='h3' style={{ fontWeight: "bold" }}>{getProfileOfViewedUser && getProfileOfViewedUser.role}</Typography>
          <Typography variant='h4' style={{ fontWeight: "bold" }}>{getProfileOfViewedUser && `${getProfileOfViewedUser.firstName} ${getProfileOfViewedUser.middleName} ${getProfileOfViewedUser.lastName}`}</Typography>
        </Box>
      </Box>

      <Box style={{ marginTop: "30px" }}>
        <Typography variant='h5' style={{fontWeight: "bold", marginBottom: "10px"}}>Contact Information</Typography>
        <Box style={{maxWidth: "700px"}}>
          <h3>Address : </h3>
          <Typography style={{ marginLeft: "10px" }}>House 07/B, Omkar Krishna Park - 2, Vichumbe - 410206, {city}, {state}</Typography>   
          <h3>You can reach out me : 9892583723</h3>
        </Box>
      </Box>

    </Container>
  )
}

export default ProfileOfUser;