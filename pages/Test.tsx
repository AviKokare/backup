import React, { useState, useEffect } from 'react';
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
import { IAuthentication, ILogin, IRegister } from '../interface/profile';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { signIn, signUp } from '../services/auth-service';
import { setAuthError, setLoggedIn } from '../slices/authslice';
import { useRouter } from 'next/router';
import { signUpvalidationSchema } from '../utils/formikValidationSchema';
import Message from '../components/Snackbar';
import Auth from '../components/Auth/Auth';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PasswordReset from '../components/PasswordReset';

export default function Authentication() {

  const router = useRouter();
  const authDispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [message, setMessage] = useState('');
  const [openResetPasswordModal, setOpenResetPasswordModal] = useState(false);

  const signUpState: IRegister = {
    email: "",
    password: "",
    confirmPassword: ""
  };

  const formik = useFormik({
    initialValues: signUpState,
    validationSchema: signUpvalidationSchema,
    onSubmit: (values: IAuthentication) => {
      const { email, password } = values;

      if (isSignUp) {
        signUp(email, password)
          .then((response: any) => {
            localStorage.setItem('AUTH_TOKEN', response.stsTokenManager.accessToken);
            authDispatch(setLoggedIn({
              isLoggedIn: true,
              userData: response,
              error: '',
            }));
            router.push("/Profile");
            setOpen(true);
            setMessage("Registration successful");
          })
          .catch((error) => {
            setOpen(true);
            authDispatch(setAuthError(error.message));
          });
      } else {
        signIn(email, password)
          .then((response: any) => {
            localStorage.setItem('AUTH_TOKEN', response.stsTokenManager.accessToken);
            authDispatch(setLoggedIn({
              isLoggedIn: true,
              userData: response,
              error: '',
            }));
            router.push("/");
            setOpen(true);
            setMessage("Login successful");
          })
          .catch(error => {
            setOpen(true);
            console.log(error);
            authDispatch(setAuthError(error));
          });
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
      router.push("/Test");
    } else {
      router.push("/");
    }
  }, []);

  return (
    <Container component="main" style={{ marginTop: "100px", minHeight: "100vh" }} >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4} textAlign="center">
          <img src={'ss4.jpg'} alt='ac' width={200} height={400} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Message message={message} setOpen={setOpen} open={open} severity='success' />
          <Paper style={{ padding: "1rem", marginBottom: "1rem", minHeight: 570 }} elevation={10}>
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
                {isSignUp ? "Create your account" : "Login to your account"}
              </Typography>
              <p style={{ fontSize: 12 }}>
                {isSignUp ? "All fields are mandatory." : null}
              </p>

              <form onSubmit={formik.handleSubmit}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {
                  isSignUp && <TextField
                    margin="normal"
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="current-password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  />
                }
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {isSignUp ? "Sign Up" : "Sign In"}
                </Button>
                <Grid container>
                  {
                    !isSignUp && <Grid item xs={12}>
                      <Typography style={{ fontSize: "13px", cursor: "pointer" }} onClick={() => setOpenResetPasswordModal(true)}>Forgot password?</Typography>
                    </Grid>
                  }
                  <Grid item>
                    <Link variant="body2" style={{ textDecoration: "none", color: "black" }} onClick={() => setIsSignUp(!isSignUp)}>
                      {isSignUp ? `Already a member of badaPlayer?` : `Don't have an account?`} <span style={{ textDecoration: "underline", cursor: 'pointer' }}>{isSignUp ? `Sign Up` : `Sign In`}</span>
                    </Link>
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
          <img src={'ss5.jpg'} alt='ac' width={270} height={500} style={{ marginLeft: "50px" }} />
        </Grid>
      </Grid>

      <PasswordReset openResetPasswordModal={openResetPasswordModal} setOpenResetPasswordModal={setOpenResetPasswordModal} />
    </Container>
  );
}