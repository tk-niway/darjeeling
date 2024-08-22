"use client";
import { useAuthUser } from "@/app/_providers/authUserProvider";
import { useState } from "react";
import LinkNoneStyle from "@/app/_components/linkNoneStyle";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function AppHeader() {
  const { loginWithRedirect, signout, authUser } = useAuthUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography component="h1" variant="h5" sx={{ flexGrow: 1 }}>
            <LinkNoneStyle href="/">Videos</LinkNoneStyle>
          </Typography>
          {authUser.isActive ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-app-bar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle data-testid="profile-button" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <LinkNoneStyle href={`/users/${authUser.id}`}>
                    My account
                  </LinkNoneStyle>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <LinkNoneStyle href={`/users/${authUser.id}/videos/upload`}>
                    Upload Video
                  </LinkNoneStyle>
                </MenuItem>
                <MenuItem
                  data-testid="signout-button"
                  onClick={() => signout()}
                >
                  <LinkNoneStyle href="">サインアウト</LinkNoneStyle>
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <>
              <Button
                color="inherit"
                data-testid="signin-button"
                onClick={() => loginWithRedirect()}
              >
                Sign in
              </Button>
              <Button
                color="inherit"
                data-testid="signup-button"
                onClick={() => loginWithRedirect()}
              >
                Sign up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* AppBarの高さ分のスペースを確保 */}
    </>
  );
}
