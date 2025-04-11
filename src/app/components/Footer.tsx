import { Box, Typography, Container } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} NextGen Image Gallery by rrishiddh
        </Typography>
      </Container>
    </Box>
  );
}