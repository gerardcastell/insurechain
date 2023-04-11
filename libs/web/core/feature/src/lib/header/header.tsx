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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NextLink from 'next/link';
import MUILink from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';

const pages = [
  { link: '/dashboard', name: 'Dashboard' },
  { link: '/insurance-contract', name: 'Insurance Contract' },
];

export function Header() {
  const { data: session } = useSession();
  const [isDrawerOpened, setIsDrawerOpened] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
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

            {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <NextLink key={page.name} href={page.link} passHref>
                      <MUILink
                        sx={{ my: 2, color: 'white', display: 'block' }}
                        variant="body2"
                      >
                        {page.name}
                      </MUILink>
                    </NextLink>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              INSURECHAIN
            </Typography> */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <MUILink
                  key={page.name}
                  href={page.link}
                  sx={{ my: 2, mr: 2, color: 'white', display: 'block' }}
                  component={NextLink}
                  variant="body2"
                >
                  {page.name}
                </MUILink>
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
