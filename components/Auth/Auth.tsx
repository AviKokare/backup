import React from 'react';
import { signInWithPopup } from 'firebase/auth'
import { useDispatch } from 'react-redux';

import { Button } from '@mui/material';
import { Google } from '@mui/icons-material';
import { auth, googleProvider } from '../../config/firebase_config';
import { setLoggedIn } from '../../slices/authslice';
import { useRouter } from 'next/router';
const Auth = () => {
    const authDispatch = useDispatch();
    const router = useRouter();
    const handleSignIn = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            if (res?.user) {
                localStorage.setItem('AUTH_TOKEN', res.user?.accessToken);
                authDispatch(setLoggedIn({
                    isLoggedIn: true,
                    userData: res.user,
                    error: '',
                }));
                router.push('/')
            }
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    return (
        <div>
            <Button
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<Google />}
                onClick={handleSignIn}
            >
                Sign In with Google
            </Button>
        </div>
    );
}

export default Auth;
