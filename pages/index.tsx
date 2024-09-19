'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../slices/authslice';
import { useRouter } from "next/router";
import { auth } from '../config/firebase_config';
import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Container, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { getAllProfiles } from '../services/firebase';
import { FacebookShareCount, TwitterIcon } from 'react-share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ShareIcon from '@mui/icons-material/Share';
import PreviewIcon from '@mui/icons-material/Preview';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

export default function Home() {
  const router = useRouter();
  const authDispatch = useDispatch();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState<string | null>('0');

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      authDispatch(setLoggedIn({
        isLoggedIn: true,
        userData: user,
        error: '',
      }));
    });

    getAllProfiles().then((allProfiles: any) => {
      setProfiles(allProfiles);
    }).catch(err => console.error(err));

    setDrawerOpen(localStorage.getItem('open'));
    if(!localStorage.getItem("AUTH_TOKEN")){
      authDispatch(setLoggedIn({
        isLoggedIn: false,
        userData: null,
        error: '',
      }));
      router.push('/Authentication');
    }
  }, []);
  return (
    <Container component="main" style={{ marginTop: "100px", minHeight: "100vh", marginBottom: "50px", maxWidth: isDrawerOpen === '1' ? '70vw' : '90vw', marginLeft: isDrawerOpen === '1' ? "300px" : "100px" }} >
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography>All Players</Typography>
            {/* <Link href={"/profile"}>
              <Button variant='outlined'>You Profile</Button>
            </Link> */}
          </Box>
        </Grid>

        {
          profiles.length > 0 && profiles.map((profile,index) => {
            return (
              <>
                <Grid item xs={12} md={4} key={index}>
                  <Card sx={{ maxWidth: 345, maxHeight: 400 }}>
                    <CardActionArea> 
                      <Box style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <CardHeader
                          avatar={
                            <Avatar aria-label="recipe" src={`data:image/png;base64,${profile.profileImage}`}>
                              {!profile.profileImage && profile.firstName && profile.firstName.charAt(0).toUpperCase()}
                            </Avatar>
                          }
                          title={profile.firstName + " " + profile.lastName}
                          subheader={profile.dob}
                        />
                        <Tooltip title="Save for Later">
                          <IconButton onClick={() => console.log("Save for later")}>
                            <FavoriteBorderIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <CardContent>
                        <Box style={{display:"flex", justifyContent: "space-between", alignItems: "center"}}> 
                          <Typography gutterBottom variant="h5" component="div">
                            {profile.role}
                          </Typography>

                          <Box style={{ display: "flex" }}>
                            {profile.gender === "Female" ? <FemaleIcon /> : <MaleIcon />}
                            <Typography gutterBottom component="p">
                              {profile.gender}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {profile.description && profile.description.length > 100 ? `${profile.description.substring(0, 101)}...` : profile.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Tooltip title="Share">
                        <IconButton onClick={() => console.log("Share profile")}>
                          <ShareIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="View Profile">
                        <IconButton onClick={() => router.push(`/${profile._id}`)}>
                          <PreviewIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Like">
                        <IconButton onClick={() => console.log("Liked")}>
                          <ThumbUpOffAltIcon />
                        </IconButton>
                      </Tooltip>
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
