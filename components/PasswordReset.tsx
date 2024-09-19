import React, { useState } from 'react';
import { Button, Modal, Box, Typography, IconButton, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import { auth } from '../config/firebase_config';
import { sendPasswordResetEmail } from 'firebase/auth';
import Message from './Snackbar';

interface IPros {
    setOpenResetPasswordModal: (openResetPasswordModal: boolean) => void;
    openResetPasswordModal: boolean;
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 5
};

function PasswordReset({ setOpenResetPasswordModal, openResetPasswordModal }: IPros) {
    
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success');

    const handleForgotPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Password reset email sent. Please check your inbox.');
            setOpen(true);
            setSeverity('success');
        } catch (error) {
            setMessage('Error sending password reset email.');
            setOpen(false);
            setSeverity('error');
        }
    };

    return (
        <Box style={{ marginTop: "100px" }}>
            <Message message={message} open={open} severity={severity} setOpen={setOpen} />
            <Modal
                open={openResetPasswordModal}
                onClose={() => setOpenResetPasswordModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={() => setOpenResetPasswordModal(false)}
                        sx={{ position: 'absolute', top: 5, right: 20 }}
                    >
                        <Close />
                    </IconButton>
                    <Typography id="modal-modal-title" variant="h6" component="h2" marginBottom={3}>
                        Forgot Password
                    </Typography>
                    <TextField
                        fullWidth
                        variant='outlined'
                        id="email"
                        size="small"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button variant="outlined" style={{ marginTop: "20px" }} color='secondary' onClick={handleForgotPassword}>Get link on email</Button>
                </Box>
            </Modal>
        </Box>
    );
}

export default PasswordReset;
