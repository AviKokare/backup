import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { IconButton, InputAdornment, Paper } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { signIn } from '../services/auth-service';
import { setAuthError, setLoggedIn } from '../slices/authslice';
import { useRouter } from 'next/router';
import Message from '../components/Snackbar';
import { signInValidationSchema } from '../utils/formikValidationSchema';
import { ILogin } from '../interface/profile';
import Auth from '../components/Auth/Auth';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PasswordReset from '../components/PasswordReset';

export default function SignIn() {

  const router = useRouter();
  const authDispatch = useDispatch();
  const authState = useSelector((authState: RootState) => authState.auth);
  const [open, setOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [openResetPasswordModal, setOpenResetPasswordModal] = useState(false);

  const loginState: ILogin = {
    email: "",
    password: "",
  }

  const formik = useFormik({
    initialValues: loginState,
    validationSchema: signInValidationSchema,
    onSubmit: (values: ILogin) => {
      const { email, password } = values;
      signIn(email, password)
        .then((response: any) => {
          localStorage.setItem('AUTH_TOKEN', response.stsTokenManager.accessToken);
          authDispatch(setLoggedIn({
            isLoggedIn: true,
            userData: response,
            error: '',
          }));
          router.push("/");
        })
        .catch(error => {
          setOpen(true);
          console.log(error);
          authDispatch(setAuthError(error));
        });
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
    } else {
      router.push("/");
    }
  }, []);

  return (
    <Container component="main" style={{ marginTop: "100px", minHeight: "100vh" }} >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4} textAlign="center">
          <img src={'ss4.jpg'} alt='ac' width={200} height={400}/>
        </Grid>
        <Grid item xs={12} md={4}>
          <Message message={authState.error} setOpen={setOpen} open={open} severity='error' />
          <Paper style={{ padding: "2rem", minHeight: "570px" }} elevation={10}>
            <Typography variant='h6' textAlign="center" style={{ marginBottom: "20px" }}>badaplayer.com</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login to your account
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type='email'
                  autoFocus
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff /> }
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  
                  <Grid item>
                    <Link href="/Register" variant="body2" style={{ textDecoration: "none", color: "black" }}>
                      Don&apos;t have an account? <span style={{ textDecoration: "underline" }}>Sign Up</span>
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography style={{ fontSize: "13px", cursor: "pointer" }} onClick={() => setOpenResetPasswordModal(true)}>Forgot password?</Typography>
                  </Grid>
                </Grid>
              </form>
            </Box>

            <Typography variant='h5' align='center' fontWeight={900} marginY={2}>OR</Typography>

            <Box>
              <Auth />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <img src={'ss5.jpg'} alt='ac' width={270} height={500} style={{marginLeft: "50px"}}/>
        </Grid>
      </Grid>

      <PasswordReset openResetPasswordModal={openResetPasswordModal}setOpenResetPasswordModal={setOpenResetPasswordModal}/>
    </Container>
  );
} 