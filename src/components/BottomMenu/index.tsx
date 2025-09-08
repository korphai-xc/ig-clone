"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const menuItems = [
  { key: "HomeMenu", name: "Home", icon: <HomeIcon /> },
  { key: "ExploreMenu", name: "Explore", icon: <ExploreIcon /> },
  { key: "CreateMenu", name: "Create", icon: <AddCircleOutlineIcon /> },
  { key: "ProfileMenu", name: "Profile", icon: <AccountCircleIcon /> },
];

export default function BottomMenu() {
  const [value, setValue] = React.useState(0);

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {menuItems.map((item) => (
          <BottomNavigationAction
            key={item.key}
            aria-label={item.name}
            icon={item.icon}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
}
