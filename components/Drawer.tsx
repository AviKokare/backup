'use client'
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { sideBar } from '../utils/constants';
import Link from 'next/link';
import { ISideBarMenus } from '../interface/interface';
import { Avatar, Button } from '@mui/material';
import { logout } from '../services/auth-service';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const SideBar = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState<boolean>(false);
  const router = useRouter();

  const authState = useSelector((authState: RootState) => authState.auth);

  const handleLogout = () => {
    logout()
      .then((response) => {
        if (response) {
          localStorage.removeItem("AUTH_TOKEN");
          router.push('/Authentication');
        }
      }).catch(error => {
        console.log(error);
      })
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              setOpen(true);
              localStorage.setItem('open', '1');
            }}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Box style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}>
            <Typography variant="h6" noWrap component="div" >
              <Link href="/">badaPlayer.com</Link>
            </Typography>
            {
              authState.isLoggedIn &&
              <Button variant='outlined' color='secondary' onClick={() => handleLogout()}>Logout</Button>
            }
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader style={{display: "flex", justifyContent: "space-between"}}>
          <Avatar sx={{ width: 40, height: 40, cursor: "pointer" }} src={'/ss2.jpg'}>N</Avatar>
          <h3 style={
            authState.userData && authState.userData.email && authState.userData.email.length > 12 ? {
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100px"
            } : {}}>{authState.userData && authState.userData.email && authState.userData.email}</h3>
          <IconButton onClick={() => {
            setOpen(false);
            localStorage.setItem('open', '0');
          }}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {
            sideBar.map((menu:ISideBarMenus, index: React.Key) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => {
                  setOpen(false);
                  localStorage.setItem('open', '0');
                }}>
                <ListItemIcon>
                  {Number(index) % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                  <Link href={`${menu.routePath}`}>{menu.name}</Link>
              </ListItemButton>
            </ListItem>
            ))
          }
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
};

export default SideBar;