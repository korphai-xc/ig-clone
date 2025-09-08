import React from 'react';
import { useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Drawer } from './styles';
import SearchBox from '../SearchBox';

export default function SideMenu({ onBreedSelect }: { onBreedSelect?: (breed: string) => void }) {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = React.useState(!isTablet);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const router = useRouter();

  const menuItems = [
    { 
      name: "Home", 
      icon: <HomeIcon />, 
      action: () => router.push('/') 
    },
    { 
      name: "Search", 
      icon: <SearchIcon />, 
      action: () => setIsSearchOpen(true) 
    },
    { 
      name: "Explore", 
      icon: <ExploreIcon />, 
      action: () => {}
    },
    { 
      name: "Notifications", 
      icon: <FavoriteBorderIcon />, 
      action: () => {}
    },
    { 
      name: "Profile", 
      icon: <AccountCircleIcon />, 
      action: () => {}
    },
  ];

  React.useEffect(() => {
    setOpen(!isTablet);
  }, [isTablet]);

  return (
    <Drawer variant="permanent" open={open}>
      <List className="title side-menu">
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <AddAPhotoIcon />
            </ListItemIcon>
            <ListItemText
              primary="Instagram-Clone"
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.name} disablePadding sx={{ display: "block" }}>
            {item.name === "Search" && isSearchOpen && (
              <SearchBox
                open={isSearchOpen}
                value={searchValue}
                onChange={setSearchValue}
                onClose={() => {
                  setIsSearchOpen(false);
                  setSearchValue("");
                }}
                drawerOpen={open}
                enableBreedSearch={true}
              />
            )}
            {item.name !== "Search" || !isSearchOpen ? (
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={item.action}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            ) : null}
          </ListItem>
        ))}
      </List>
      <List sx={{ marginTop: "auto" }}>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <MenuIcon />
            </ListItemIcon>
            <ListItemText primary="More" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
