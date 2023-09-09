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
import NextLink from 'next/link';
import MuiLink from '@mui/material/Link';
import Container from '@mui/material/Container';
import { useDisconnect } from 'wagmi';
const pages = [
  { link: '/dashboard', name: 'Dashboard' },
  { link: '/insurance-contract', name: 'Insurance Contract' },
];

export function Header() {
  const { data: session, status } = useSession();
  const [isDrawerOpened, setIsDrawerOpened] = React.useState(false);
  const loading = status === 'loading';
  const { disconnect } = useDisconnect();
  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              INSURECHAIN
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <MuiLink
                  key={page.name}
                  href={page?.link}
                  sx={{ my: 2, mr: 2, color: 'white', display: 'block' }}
                  component={NextLink}
                  variant="body2"
                >
                  {page.name}
                </MuiLink>
                // <Link href={page.link} key={page.name}>
                //   {page.name}
                // </Link>
              ))}
            </Box>
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
        </Container>
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
              <ListItem
                key={text}
                disablePadding
                onClick={(e) => {
                  e.preventDefault();
                  disconnect();
                  signOut();
                }}
              >
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
