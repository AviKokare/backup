import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn } from '../slices/authslice';
import { useRouter } from "next/router";
import { auth } from '../config/firebase_config';
import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Container, Grid, IconButton, Typography } from '@mui/material';
import { getAllProfiles } from '../services/firebase';
import Link from 'next/link';
import { getAllTournaments } from '../services/tournament';

export default function Home() {
  const router = useRouter();
  const authDispatch = useDispatch();
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      authDispatch(setLoggedIn({
        isLoggedIn: true,
        userData: user,
        error: '',
      }));
    });

    getAllTournaments().then((allProfiles: any) => {
      setProfiles(allProfiles);
    }).catch(err => console.error(err));

    if (!localStorage.getItem("AUTH_TOKEN")) {
      authDispatch(setLoggedIn({
        isLoggedIn: false,
        userData: null,
        error: '',
      }));
      router.push('/Login')
    }
  }, []);


  return (
    <Container component="main" maxWidth="md" style={{ marginTop: "100px" }} >
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Box style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <Typography>All Tournaments</Typography>
            <Link href={"/create-tournament"}>
              <Button variant='outlined'>Create Tournament</Button>
            </Link>
          </Box>
        </Grid>

        {
          profiles.length > 0 && profiles.map((profile, index) => {
            return (
              <>
                <Grid item xs={12} md={4} key={index}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardHeader
                        avatar={
                          <Avatar aria-label="recipe" src={profile.profileImage}>
                            {!profile.profileImage && profile.firstName && profile.firstName.charAt(0).toUpperCase()}
                          </Avatar>
                        }
                        title={profile.firstName + " " + profile.lastName}
                        subheader={profile.dob}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {profile.role}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lizards are a widespread group of squamate reptiles, with over 6,000
                          species, ranging across all continents except Antarctica
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="primary">
                        Share
                      </Button>
                      <Button size="small" color="primary">
                        View profile
                      </Button>

                      <Button size="small" color="primary">
                        Like
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </>
            )
          })
        }

        
      </Grid>
    </Container>
  )
}
