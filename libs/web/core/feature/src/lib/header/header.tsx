import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { signIn, signOut, useSession } from 'next-auth/react';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export function Header() {
  const { data: session } = useSession();
  const [isDrawerOpened, setIsDrawerOpened] = React.useState(false);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Insurechain
          </Typography>
          {session ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => setIsDrawerOpened(true)}
                color="inherit"
              >
                {session.user?.image ? (
                  <Avatar alt="Avatar" src={session.user.image} />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
            </div>
          ) : (
            <Button
              color="inherit"
              endIcon={<LoginIcon />}
              onClick={() => signIn()}
            >
              Log In
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={isDrawerOpened}
        onClose={() => setIsDrawerOpened(false)}
        onKeyDown={() => setIsDrawerOpened(false)}
      >
        <Box
          role="presentation"
          sx={{
            width: 250,
          }}
        >
          <List>
            {['Logout'].map((text, index) => (
              <ListItem key={text} disablePadding onClick={() => signOut()}>
                <ListItemButton>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Header;
