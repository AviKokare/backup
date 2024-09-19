import React from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Typography, Link, useTheme, Paper } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const useStyles = makeStyles(() => ({
  footer: {
    backgroundColor: useTheme().palette.primary.main,
    color: useTheme().palette.primary.contrastText,
    padding: useTheme().spacing(4),
    marginTop: 'auto',
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: useTheme().spacing(2),
  },
  socialIcon: {
    margin: useTheme().spacing(1),
    color: useTheme().palette.primary.contrastText,
  },
  link: {
    color: useTheme().palette.primary.contrastText,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.footer}
      sx={{
        marginTop: 'calc(10% + 60px)',
        width: '100%',
        position: 'fixed',
        bottom: 0,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          &copy; 2023 Your Website Name
        </Typography>
        <div className={classes.socialIcons}>
          <Link href="#" target="_blank" rel="noopener" className={classes.link}>
            <GitHubIcon className={classes.socialIcon} />
          </Link>
          <Link href="#" target="_blank" rel="noopener" className={classes.link}>
            <TwitterIcon className={classes.socialIcon} />
          </Link>
          <Link href="#" target="_blank" rel="noopener" className={classes.link}>
            <InstagramIcon className={classes.socialIcon} />
          </Link>
        </div>
      </Container>
    </Paper>
  );
};

export default Footer;
