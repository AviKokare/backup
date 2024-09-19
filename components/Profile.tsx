import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { MenuItem, Paper } from '@mui/material';
import { IProfile } from '../interface/profile';
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { createUserProfile, getProfileDataOnEmail } from '../services/firebase';
import { setAuthError, setLoggedIn } from '../slices/authslice';
import { useRouter } from 'next/router';
import { profileValidationSchema } from '../utils/formikValidationSchema';
import Message from '../components/Snackbar';
import { auth } from '../config/firebase_config';
import { logout } from '../services/auth-service';

export default function SignIn() {

  const router = useRouter();
  const authDispatch = useDispatch();
  const authState = useSelector((authState: RootState) => authState.auth);
  const [open, setOpen] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [currentUserProfile, setCurrentUserProfile] = useState([]);

  const profileState: IProfile = {
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    dob: "",
    description: "",
    address: "",
    role: "",
    profileImage: "",
    email: "",
    city: '',
    state: '',
    gender: '',
    teamName: ''
  }

  const formik = useFormik({
    initialValues: profileState,
    validationSchema: profileValidationSchema,
    onSubmit: (values: IProfile) => {
      createUserProfile(values)
    },
  });

  useEffect(() => {
    if (!localStorage.getItem("AUTH_TOKEN")) {
      authDispatch(setLoggedIn({
        isLoggedIn: false,
        userData: null,
        error: '',
      }));
      router.push("/Login");
    }
    auth.onAuthStateChanged(user => {
      if (user) {
        getProfileDataOnEmail(user.email).then(response => {
          return setCurrentUserProfile(response);
        }).catch(error => {
          console.error(error);
        });
      }
    })
  }, [auth]);

  const handleLogout = () => {
    logout()
      .then((response) => {
        if (response) {
          localStorage.removeItem("AUTH_TOKEN");
          router.push('/Login');
        }
      }).catch(error => {
        authDispatch(setAuthError(error));
      })
  }

  return (
    <Container component="main" maxWidth="md">
      <Message message={authState.error} setOpen={setOpen} open={open} severity='error'/>
      <Paper style={{ padding: "2rem", marginTop: "3.5rem", marginBottom: "1rem", minHeight: 600, }} elevation={20}>
        <Typography variant='h6' textAlign="center" onClick={() => setIsEditable(!isEditable)}>badaplayer.com</Typography>
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
              <Grid item xs={12} md={12}>
                <TextField
                  margin="normal"
                  fullWidth
                  variant='standard'
                  id="firstName"
                  size="small"
                  label="First Name"
                  disabled={!isEditable}
                  name="firstName"
                  autoComplete="firstName"
                  autoFocus
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched?.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  margin="normal"
                  fullWidth
                  variant='standard'
                  id="firstName"
                  size="small"
                  label="First Name"
                  disabled={!isEditable}
                  name="firstName"
                  autoComplete="firstName"
                  autoFocus
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched?.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  margin="normal"
                  fullWidth
                  variant='standard'
                  id="middleName"
                  size="small"
                  label="Middle Name"
                  disabled={!isEditable}
                  name="middleName"
                  autoComplete="middleName"
                  autoFocus
                  value={formik.values.middleName}
                  onChange={formik.handleChange}
                  error={formik.touched.middleName && Boolean(formik.errors.middleName)}
                  helperText={formik.touched.middleName && formik.errors.middleName}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  margin="normal"
                  fullWidth
                  variant='standard'
                  id="lastName"
                  size="small"
                  label="Last Name"
                  disabled={!isEditable}
                  name="lastName"
                  autoComplete="lastName"
                  autoFocus
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  variant='standard'
                  id="dob"
                  size="small"
                  label="Date of Birth"
                  disabled={!isEditable}
                  type='date'
                  name="dob"
                  autoComplete="dob"
                  autoFocus
                  value={formik.values.dob}
                  onChange={formik.handleChange}
                  error={formik.touched.dob && Boolean(formik.errors.dob)}
                  helperText={formik.touched.dob && formik.errors.dob}
                />
              </Grid>

              <Grid item xs={12} md={6} mt={3.6}>
                <Select
                  labelId="role"
                  id="role"
                  value={formik.values.role}
                  label="Role"
                  fullWidth
                  variant='standard'
                  disabled={!isEditable}
                  name="role"
                  onChange={formik.handleChange}
                >
                  <MenuItem value="Batsman">Batsman</MenuItem>
                  <MenuItem value="Bowler">Bowler</MenuItem>
                  <MenuItem value="All-Rounder">All-Rounder</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12}  md={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  variant='standard'
                  disabled={!isEditable}
                  id="phone"
                  size="small"
                  label="Contact Number"
                  name="phone"
                  autoComplete="phone"
                  autoFocus
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>

              <Grid item xs={12}  md={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  variant='standard'
                  id="email"
                  size="small"
                  label="Email Address"
                  disabled={!isEditable}
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>

              <Grid item xs={12}  md={12}>
                <TextField
                  margin="normal"
                  fullWidth
                  variant='standard'
                  id="address"
                  size="small"
                  label="Address"
                  disabled={!isEditable}
                  name="address"
                  autoComplete="address"
                  autoFocus
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Grid>

              <Grid item xs={12}  md={12}>
                <TextField
                  margin="normal"
                  fullWidth
                  variant='outlined'
                  multiline
                  maxRows={4}
                  id="description"
                  disabled={!isEditable}
                  size="small"
                  label="Write about yourself"
                  name="description"
                  autoComplete="description"
                  autoFocus
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
              </Grid>

              <Grid item xs={12}  md={5}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {isEditable ? "Update" : "Save"}
                </Button>
              </Grid>
              <Grid item xs={12} md={2}></Grid>
              <Grid item xs={12} md={5}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}