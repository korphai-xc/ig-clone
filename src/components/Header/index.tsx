'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import SearchBox from '../SearchBox';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

export default function Header() {
  const [searchValue, setSearchValue] = React.useState("");
  const router = useRouter();

  const handleHomeClick = () => {
    router.push('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              mr: 2, 
              cursor: 'pointer',
              fontWeight: 'bold',
              alignItems: 'center',
            }}
            onClick={handleHomeClick}
          >
            <AddAPhotoIcon />
          </Typography>
          <SearchBox
            open={true}
            value={searchValue}
            onChange={setSearchValue}
            drawerOpen={true}
            showCloseButton={false}
            variant="header"
            placeholder="Search..."
            enableBreedSearch={true}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
