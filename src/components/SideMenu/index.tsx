"use client";
import React from "react";
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useMediaQuery } from "@mui/material";
import { Drawer } from "./styles";

const menuItems = [
  { name: "Home", icon: <HomeIcon /> },
  { name: "Search", icon: <SearchIcon /> },
  { name: "Explore", icon: <ExploreIcon /> },
  { name: "Notifications", icon: <FavoriteBorderIcon /> },
  { name: "Profile", icon: <AccountCircleIcon /> },
];

export default function SideMenu() {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = React.useState(!isTablet);

  React.useEffect(() => {
    setOpen(!isTablet);
  }, [isTablet]);

  return (
    <Drawer variant="permanent" open={open}>
      <List>
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
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
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
