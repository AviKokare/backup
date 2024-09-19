import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux';
import {  getProfileDataOnEmail } from '../services/firebase';
import { setLoggedIn } from '../slices/authslice';
import { useRouter } from 'next/router';
import {  tournamentValidationSchema } from '../utils/formikValidationSchema';
import Message from '../components/Snackbar';
import { auth } from '../config/firebase_config';
import { ITournament } from '../interface/tournament';
import { createTournament } from '../services/tournament';

export default function Tournament() {

    const router = useRouter();
    const authDispatch = useDispatch();
    const [open, setOpen] = useState<boolean>(false);

    const tournamentState: ITournament = {
        organizerName: '',
        tournamentName: '',
        logo: '',
        startDate: '',
        endDate: '',
        venue: '',
        contactNumbers: '',
        rules: '',
        typeOfTournament: '',
        dayOrNight: '', 
        entryFee: 0,
        prizesForPlayers: '',
    }

    const formik = useFormik({
        initialValues: tournamentState,
        validationSchema: tournamentValidationSchema,
        onSubmit: (values: ITournament, { resetForm }) => {
            console.log("Inside the on submit")
            setOpen(true);
            try {
                createTournament(values);
                resetForm();
            } catch (error) {
                console.log("Error creating tournament : ", error);
            }
            
        },
    });
    
    useEffect(() => {
        if (!localStorage.getItem("AUTH_TOKEN")) {
            authDispatch(setLoggedIn({
                isLoggedIn: false,
                userData: null,
                error: '',
            }));
            router.push("/Login")
        }
        auth.onAuthStateChanged(user => {
            if (user) {
                getProfileDataOnEmail(user.email).then(response => {
                    console.log("Response : ", response);
                }).catch(error => {
                    console.error(error);
                });
            }
        })
    }, [auth]);

    return (
        <Container component="main" maxWidth="md" style={{ marginTop: "100px", minHeight: "100vh" }} >
            <Message message={"Successlly created profile !"} setOpen={setOpen} open={open} severity='success' />
            <Box style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                <h1>Create Tournament</h1>
            </Box>
            <Box
                sx={{
                    marginTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                id="organizerName"
                                size="small"
                                label="Organizer Name"
                                name="organizerName"
                                autoComplete="organizerName"
                                autoFocus
                                value={formik.values.organizerName}
                                onChange={formik.handleChange}
                                error={formik.touched?.organizerName && Boolean(formik.errors.organizerName)}
                                helperText={formik.touched.organizerName && formik.errors.organizerName}
                                InputLabelProps={{ shrink: true }}
                                placeholder='xyz'
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                id="tournamentName"
                                size="small"
                                label="Tournament Name"
                                name="tournamentName"
                                autoComplete="tournamentName"
                                autoFocus
                                value={formik.values.tournamentName}
                                onChange={formik.handleChange}
                                error={formik.touched.tournamentName && Boolean(formik.errors.tournamentName)}
                                helperText={formik.touched.tournamentName && formik.errors.tournamentName}
                                InputLabelProps={{ shrink: true }}
                                placeholder='xyz'
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                id="typeOfTournament"
                                size="small"
                                label="Type Of Tournament"
                                name="typeOfTournament"
                                autoComplete="typeOfTournament"
                                autoFocus
                                value={formik.values.typeOfTournament}
                                onChange={formik.handleChange}
                                error={formik.touched.typeOfTournament && Boolean(formik.errors.typeOfTournament)}
                                helperText={formik.touched.typeOfTournament && formik.errors.typeOfTournament}
                                InputLabelProps={{ shrink: true }}
                                placeholder='xyz'
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                id="startDate"
                                size="small"
                                label="Start Date"
                                type='date'
                                name="startDate"
                                autoComplete="startDate"
                                autoFocus
                                value={formik.values.startDate}
                                onChange={formik.handleChange}
                                error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                                helperText={formik.touched.startDate && formik.errors.startDate}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                id="endDate"
                                size="small"
                                label="End Date"
                                type='date'
                                name="endDate"
                                autoComplete="endDate"
                                autoFocus
                                value={formik.values.endDate}
                                onChange={formik.handleChange}
                                error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                                helperText={formik.touched.endDate && formik.errors.endDate}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                id="dayOrNight"
                                size="small"
                                label="Day / Night"
                                name="dayOrNight"
                                type="text"
                                autoComplete="dayOrNight"
                                autoFocus
                                value={formik.values.dayOrNight}
                                onChange={formik.handleChange}
                                error={formik.touched.dayOrNight && Boolean(formik.errors.dayOrNight)}
                                helperText={formik.touched.dayOrNight && formik.errors.dayOrNight}
                                InputLabelProps={{ shrink: true }}
                                placeholder='Day / Night'
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                id="contactNumbers"
                                size="small"
                                label="Contact Number"
                                name="contactNumbers"
                                autoComplete="contactNumbers"
                                autoFocus
                                value={formik.values.contactNumbers}
                                onChange={formik.handleChange}
                                error={formik.touched.contactNumbers && Boolean(formik.errors.contactNumbers)}
                                helperText={formik.touched.contactNumbers && formik.errors.contactNumbers}
                                InputLabelProps={{ shrink: true }}
                                placeholder='+91-1234567890'
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                id="entryFee"
                                size="small"
                                label="Entry Fee"
                                name="entryFee"
                                autoComplete="entryFee"
                                autoFocus
                                value={formik.values.entryFee}
                                onChange={formik.handleChange}
                                error={formik.touched.entryFee && Boolean(formik.errors.entryFee)}
                                helperText={formik.touched.entryFee && formik.errors.entryFee}
                                InputLabelProps={{ shrink: true }}
                                placeholder='₹0'
                            />
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                id="venue"
                                size="small"
                                label="venue"
                                name="venue"
                                autoComplete="venue"
                                autoFocus
                                value={formik.values.venue}
                                onChange={formik.handleChange}
                                error={formik.touched.venue && Boolean(formik.errors.venue)}
                                helperText={formik.touched.venue && formik.errors.venue}
                                InputLabelProps={{ shrink: true }}
                                placeholder='xyz apt, opp. xyz, xyz road'
                            />
                        </Grid>

                        {/* <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                id="firstPrice"
                                size="small"
                                label="First Price"
                                name="firstPrice"
                                autoFocus
                                value={formik.values.prizes.firstPrice}
                                onChange={formik.handleChange}
                                error={formik.touched.prizes?.firstPrice && Boolean(formik.errors.prizes?.firstPrice)}
                                helperText={formik.touched.prizes?.firstPrice && formik.errors.prizes?.firstPrice}
                                InputLabelProps={{ shrink: true }}
                                placeholder='First Price'
                            />
                        </Grid> */}

                        {/* <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                id="secondPrice"
                                size="small"
                                label="Second Price"
                                name="secondPrice"
                                autoFocus
                                value={formik.values.prizes.secondPrice}
                                onChange={formik.handleChange}
                                error={formik.touched.prizes?.secondPrice && Boolean(formik.errors.prizes?.secondPrice)}
                                helperText={formik.touched.prizes?.secondPrice && formik.errors.prizes?.secondPrice}
                                InputLabelProps={{ shrink: true }}
                                placeholder='Second Price'
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                id="thirdPrice"
                                size="small"
                                label="Third Price"
                                name="thirdPrice"
                                autoFocus
                                value={formik.values.prizes?.thirdPrice}
                                onChange={formik.handleChange}
                                error={formik.touched.prizes?.thirdPrice && Boolean(formik.errors.prizes?.thirdPrice)}
                                helperText={formik.touched.prizes?.thirdPrice && formik.errors.prizes?.thirdPrice}
                                InputLabelProps={{ shrink: true }}
                                placeholder='Third Price'
                            />
                        </Grid> */}

                        {/* <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                id="venue"
                                size="small"
                                label="venue"
                                name="venue"
                                autoComplete="venue"
                                autoFocus
                                value={formik.values.venue}
                                onChange={formik.handleChange}
                                error={formik.touched.venue && Boolean(formik.errors.venue)}
                                helperText={formik.touched.venue && formik.errors.venue}
                                InputLabelProps={{ shrink: true }}
                                placeholder='xyz apt, opp. xyz, xyz road'
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                id="venue"
                                size="small"
                                label="venue"
                                name="venue"
                                autoComplete="venue"
                                autoFocus
                                value={formik.values.venue}
                                onChange={formik.handleChange}
                                error={formik.touched.venue && Boolean(formik.errors.venue)}
                                helperText={formik.touched.venue && formik.errors.venue}
                                InputLabelProps={{ shrink: true }}
                                placeholder='xyz apt, opp. xyz, xyz road'
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                id="venue"
                                size="small"
                                label="venue"
                                name="venue"
                                autoComplete="venue"
                                autoFocus
                                value={formik.values.venue}
                                onChange={formik.handleChange}
                                error={formik.touched.venue && Boolean(formik.errors.venue)}
                                helperText={formik.touched.venue && formik.errors.venue}
                                InputLabelProps={{ shrink: true }}
                                placeholder='xyz apt, opp. xyz, xyz road'
                            />
                        </Grid> */}

                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                multiline
                                maxRows={50}
                                id="rules"
                                size="small"
                                label="Tournament Rules and Conditions"
                                name="rules"
                                autoComplete="rules"
                                autoFocus
                                value={formik.values.rules}
                                onChange={formik.handleChange}
                                error={formik.touched.rules && Boolean(formik.errors.rules)}
                                helperText={formik.touched.rules && formik.errors.rules}
                                InputLabelProps={{ shrink: true }}
                                placeholder='Describe rules and conditions of tournmanets'
                            />
                        </Grid>

                        <Grid item xs={12} md={5}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Organize Tournament
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
}