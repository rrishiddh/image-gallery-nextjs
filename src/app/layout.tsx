'use client'; 

import { Inter } from 'next/font/google';
import Header from './components/Header';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import './globals.css';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Container component="main" sx={{ py: 4 }}>
            {children}
          </Container>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}