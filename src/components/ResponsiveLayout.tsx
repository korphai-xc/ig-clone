"use client";
import { useMediaQuery, useTheme } from "@mui/material";
import SideMenu from "./SideMenu";
import BottomMenu from "./BottomMenu";
import Header from "./Header";
import { Box } from "@mui/material";

export default function ResponsiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ display: "flex" }}>
      {isMobile && <Header />}
      {isMobile ? <BottomMenu /> : <SideMenu />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pt: isMobile ? "70px" : 3,
          pb: isMobile ? "70px" : 3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
