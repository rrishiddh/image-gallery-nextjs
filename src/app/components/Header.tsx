import { AppBar, Toolbar, Typography } from '@mui/material';
import CollectionsIcon from '@mui/icons-material/Collections';

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <CollectionsIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        NextGen Image Gallery
        </Typography>
      </Toolbar>
    </AppBar>
  );
}