import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Avatar, FormControl, InputLabel, MenuItem } from '@mui/material';
import { IProfile } from '../interface/profile';
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux';
import { createUserProfile, getProfileDataOnEmail } from '../services/user-service';
import { setLoggedIn } from '../slices/authslice';
import { useRouter } from 'next/router';
import { profileValidationSchema } from '../utils/formikValidationSchema';
import Message from '../components/Snackbar';
import { auth } from '../config/firebase_config';

export default function SignIn() {

  const router = useRouter();
  const authDispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<any>('');

  const profileState = {
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    dob: "",
    gender: "",
    description: "",
    address: "",
    profileImage: "",
    email: "",
    city: "",
    state: "",
    teamName: "",
    role: ""
  };

  const formik = useFormik({
    initialValues: profileState,
    validationSchema: profileValidationSchema,
    onSubmit: (values: IProfile, { resetForm }) => {
      setOpen(true);
      createUserProfile(values);
      resetForm();
    },
  });

  useEffect(() => {
    if (!localStorage.getItem("AUTH_TOKEN")) {
      authDispatch(setLoggedIn({
        isLoggedIn: false,
        userData: null,
        error: '',
      }));
      router.push("/Authentication");
    }
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        getProfileDataOnEmail(user.email).then(response => {
          Object.keys(response[0]).forEach((key) => {
            formik.setFieldValue(`${key}`, response[0][`${key}`], true);
          })
        }).catch(error => {
          console.error(error);
        });
      }
    })
  }, [auth]);

  const handleFileChange = (event) => {
    event.preventDefault();
    setProfileImage(URL.createObjectURL(event?.target?.files[0]));
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result.split(',')[1]; 
      formik.setFieldValue('profileImage', base64);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }
  return (
    <Container component="main" maxWidth="md" style={{ marginTop: "100px", minHeight: "100vh" }} >
      <Message message={"Successlly created profile !"} setOpen={setOpen} open={open} severity='success' />
      <Box style={{display: "flex", justifyContent: "space-between", alignItems: "center"}} >
        <h1>PROFILE</h1>
        <label className="custom-file-upload" style={{
          display: "inline-block",
          cursor: "pointer",
          width: "100px",
          height: "100px",
          borderRadius: "50%"
        }}>
          <TextField
            type="file"
            style={{ display: "none" }}
            onChange={(e) => handleFileChange(e)}
            id="profileImage"
            name="profileImage"
          />
          <Avatar sx={{ width: 100, height: 100, cursor: "pointer" }} src={formik.values.profileImage ? `data:image/png;base64,${formik.values.profileImage}` : profileImage} />
        </label>
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
            <Grid item xs={12} md={12}>
              <h3>Personal Info</h3>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                variant='outlined'
                id="firstName"
                size="small"
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                autoFocus
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched?.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
                InputLabelProps={{ shrink: true }}
                placeholder='xyz'
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                variant='outlined'
                id="middleName"
                size="small"
                label="Middle Name"
                name="middleName"
                autoComplete="middleName"
                autoFocus
                value={formik.values.middleName}
                onChange={formik.handleChange}
                error={formik.touched.middleName && Boolean(formik.errors.middleName)}
                helperText={formik.touched.middleName && formik.errors.middleName}
                InputLabelProps={{ shrink: true }}
                placeholder='xyz'
              />
            </Grid>


            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                variant='outlined'
                id="lastName"
                size="small"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                autoFocus
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
                InputLabelProps={{ shrink: true }}
                placeholder='xyz'
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant='outlined'
                id="dob"
                size="small"
                label="Date of Birth"
                type='date'
                name="dob"
                autoComplete="dob"
                autoFocus
                value={formik.values.dob}
                onChange={formik.handleChange}
                error={formik.touched.dob && Boolean(formik.errors.dob)}
                helperText={formik.touched.dob && formik.errors.dob}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  label="Gender"
                  labelId="gender"
                  id="gender"
                  value={formik.values.gender}
                  fullWidth
                  variant='outlined'
                  name="gender"
                  onChange={formik.handleChange}
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                  size='small'
                >
                  <MenuItem value="Male" selected>Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Prefer-Not-To-Say">Prefer Not To Say</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12}>
              <h3>Contact Info</h3>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant='outlined'
                id="email"
                size="small"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputLabelProps={{ shrink: true }}
                placeholder='xyz@gmail.com'
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant='outlined'
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
                InputLabelProps={{ shrink: true }}
                placeholder='1234567890'
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                variant='outlined'
                id="address"
                size="small"
                label="Address"
                name="address"
                autoComplete="address"
                autoFocus
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                InputLabelProps={{ shrink: true }}
                placeholder='xyz apt, opp. xyz, xyz road'
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">City</InputLabel>
                <Select
                  label="City"
                  labelId="city"
                  id="city"
                  value={formik.values.city}
                  fullWidth
                  variant='outlined'
                  name="city"
                  onChange={formik.handleChange}
                  size='small'
                  error={formik.touched.city && Boolean(formik.errors.city)}
                >
                  <MenuItem value="Mumbai" selected>Mumbai</MenuItem>
                  <MenuItem value="Pune">Pune</MenuItem>
                  <MenuItem value="Satara">Satara</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">State</InputLabel>
                <Select
                  label="State"
                  labelId="state"
                  id="state"
                  value={formik.values.state}
                  fullWidth
                  variant='outlined'
                  name="state"
                  onChange={formik.handleChange}
                  size='small'
                  error={formik.touched.state && Boolean(formik.errors.state)}
                >
                  <MenuItem value="Maharashtra" selected>Maharashtra</MenuItem>
                  <MenuItem value="Punjab">Punjab</MenuItem>
                  <MenuItem value="Kerala">Kerala</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12}>
              <h3>Cricket Info</h3>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  label="Role"
                  id="role"
                  value={formik.values.role}
                  variant='outlined'
                  name="role"
                  onChange={formik.handleChange}
                  size="small"
                >
                  <MenuItem value="Batsman">Batsman</MenuItem>
                  <MenuItem value="Bowler">Bowler</MenuItem>
                  <MenuItem value="All-Rounder">All-Rounder</MenuItem>
                </Select>
              </FormControl>

            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant='outlined'
                id="teamName"
                size="small"
                label="Team Name"
                name="teamName"
                autoComplete="teamName"
                autoFocus
                value={formik.values.teamName}
                onChange={formik.handleChange}
                error={formik.touched.teamName && Boolean(formik.errors.team)}
                helperText={formik.touched.lastName && formik.errors.teamName}
                InputLabelProps={{ shrink: true }}
                placeholder='xyz'
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                variant='outlined'
                multiline
                maxRows={4}
                id="description"
                size="small"
                label="Write about yourself"
                name="description"
                autoComplete="description"
                autoFocus
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                InputLabelProps={{ shrink: true }}
                placeholder='Describe why are you best among others...hurry!!!'
              />
            </Grid>

            <Grid item xs={12} md={5}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}