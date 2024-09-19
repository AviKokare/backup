import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {store} from '../store'
import { Provider } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material';
import SideBar from '../components/Drawer';
import Footer from './Test';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      contrastText: '#ffcc00',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export default function App({ Component, pageProps }: AppProps) {

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <SideBar />
        <Component {...pageProps} />
        {/* <Footer /> */}
      </Provider>
    </ThemeProvider>
  )
}
