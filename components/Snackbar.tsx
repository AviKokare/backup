import React, { useState } from 'react'
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface IPros {
    message: string;
    setOpen: (value: boolean) => void;
    open: boolean;
    severity: AlertColor | undefined | string;
}
const Message = ({ message, setOpen, open, severity }: IPros) => {

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={3000}
            >
                <Alert onClose={() => setOpen(false)} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Message;