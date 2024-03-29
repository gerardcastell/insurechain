import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import NextLink from 'next/link';
import MuiLink from '@mui/material/Link';
import { WalletConnector, useSiweAuth } from '@insurechain/web/blockchain';
import { StyledLink } from '@insurechain/web/ui-elements';
import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';

const publicPages = [{ link: '/insurance-contract', name: 'Car insurance' }];

const privatePages = [{ link: '/dashboard', name: 'Dashboard' }];
function HeaderV2() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const { isAuthenticated } = useSiweAuth();

  const pages = useMemo(
    () => (isAuthenticated ? [...publicPages, ...privatePages] : publicPages),
    [isAuthenticated]
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const { palette } = useTheme();

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: `linear-gradient(45deg, ${palette.primary.main} 30%, #204c8e 90%)`,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <Image
              src="/images/insurechain-logo-no-bg.png"
              width="50"
              height="50"
              alt="Insurechain Logo"
            />
          </Box>

          <Typography
            variant="h6"
            noWrap
            component={StyledLink}
            href="/"
            sx={{
              mr: 4,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'BlinkMacSystemFont',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Insurechain
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                  <MuiLink
                    key={page.name}
                    href={page?.link}
                    sx={{
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      color: 'inherit',
                      '&:hover': {
                        textDecoration: 'none',
                      },
                    }}
                    component={NextLink}
                  >
                    {page.name}
                  </MuiLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <Image
              src="/images/insurechain-logo-no-bg.png"
              width="40"
              height="40"
              alt="Insurechain Logo"
            />
          </Box>
          <Typography
            noWrap
            component="a"
            href="/"
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
            Insurechain
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <MuiLink
                key={page.name}
                href={page?.link}
                sx={{
                  my: 2,
                  mr: 2,
                  color: 'white',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  '&:hover': {
                    textDecoration: 'none',
                  },
                }}
                component={NextLink}
                variant="body2"
              >
                {page.name}
              </MuiLink>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <WalletConnector />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderV2;
