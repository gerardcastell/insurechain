import { StyledLink } from '@insurechain/web/ui-elements';
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
  keyframes,
} from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import Section from './Section';
import Image from 'next/image';

const ADVANTAGES_LIST: Array<{
  text: string;
  img: string;
  title: string;
}> = [
  {
    text: 'When you choose Insurechain, you become the owner of your insurance policy. Your policy is stored securely on the blockchain, accessible only to you and authorized parties. No intermediaries, no middlemen—just you and your insurance.',
    title: 'Ownership',
    img: '/icons/ownership.png',
  },
  {
    text: 'With blockchain technology, you can view your policy details, premium payments, and claims history in real-time. No more ambiguity—everything is clear, accessible, and verifiable.',
    title: 'Transparency',
    img: '/icons/transparency.png',
  },
  {
    text: 'Blockchain’s robust security measures protect your policy against fraud and unauthorized alterations. Your data is encrypted and decentralized, ensuring the highest level of security.',
    title: 'Security',
    img: '/icons/cyber-security.png',
  },
  {
    text: 'Our smart contracts automate policy issuance and claims processing. This means faster turnaround times, reduced administrative overhead, and quicker access to the coverage you need',
    title: 'Efficiency',
    img: '/icons/statistics.png',
  },
  {
    text: 'By eliminating unnecessary intermediaries and administrative costs, Insurechain offers you competitive premiums. You get more value for your money.',
    title: 'Cost-Effective',
    img: '/icons/piggy-bank.png',
  },
];

const Landing = () => {
  return (
    <Box
      sx={{
        margin: 0,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      }}
    >
      <Container sx={{ paddingX: 4, paddingY: 10 }} maxWidth="md">
        <Stack spacing={{ xs: 8, md: 14 }}>
          <Box>
            <Typography variant="h3" textAlign="center" color="white">
              Welcome to Insurechain:
              <br />
              Revolutionizing Car Insurance
            </Typography>
            <Stack
              direction={{ md: 'row' }}
              alignItems={'center'}
              mt={5}
              spacing={8}
            >
              <Paper elevation={6} sx={{}}>
                <Box
                  sx={{
                    overflow: 'hidden',
                    borderRadius: 4,
                  }}
                >
                  <Image
                    src="/images/insurechain-logo-slogan.png"
                    alt="Insurechain logo"
                    width={300}
                    height={300}
                  />
                </Box>
              </Paper>
              <Typography color="white" fontWeight={500}>
                At Insurechain, we are at the forefront of innovation in the
                insurance industry. We believe in providing you with car
                insurance that not only protects your valuable assets but also
                empowers you with cutting-edge technology. With us, your
                insurance policy isn&rsquo;t just a piece of paper; it&rsquo;s a
                secure, transparent, and smart contract on the blockchain.
              </Typography>
            </Stack>
          </Box>
          <Section
            title={
              <p>
                Building trust, one block at a time: <br />
                Your insurance, our blockchain
              </p>
            }
            description={
              <List>
                <ListItem>
                  <ListItemText sx={{ color: 'white' }}>
                    <b>Secure.</b> Your protection is our top priority. We
                    leverage the security features of blockchain technology to
                    ensure your policy remains tamper-proof and your claims are
                    processed securely.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText sx={{ color: 'white' }}>
                    <b>Transparent.</b> We value transparency. With our
                    blockchain-based insurance model, you can track every aspect
                    of your policy, from premium payments to claim settlements,
                    in real-time. No hidden fees, no surprises—just complete
                    transparency.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText sx={{ color: 'white' }}>
                    <b>Smart.</b> Our smart contracts are designed to simplify
                    insurance processes. Say goodbye to lengthy paperwork and
                    complex procedures. With Insurechain, you get the
                    convenience of a digital insurance experience that adapts to
                    your needs.
                  </ListItemText>
                </ListItem>
              </List>
            }
            imgSrc="/images/car_insurance.png"
            imgAlt="Car insurance"
            width={360}
            height={250}
            imgFirst={true}
          ></Section>
          <Section
            title="Why choose Insurechain over usual insurance companies?"
            altContent={
              <Stack spacing={3}>
                {ADVANTAGES_LIST.map((item) => (
                  <Paper
                    elevation={4}
                    key={item.title}
                    sx={{
                      borderRadius: 4,
                    }}
                  >
                    <Stack
                      direction={{ md: 'row' }}
                      alignItems="center"
                      p={3}
                      spacing={3}
                    >
                      <Typography fontWeight={700}>{item.title}</Typography>
                      <Typography>{item.text}</Typography>
                      <Image
                        src={item.img}
                        alt={item.title}
                        width={60}
                        height={60}
                      />
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            }
          ></Section>
          <Section
            title="Join the Insurechain community"
            description="At Insurechain, we&rsquo;re not just remaining insurance;
          we&rsquo;re building a community of forward-thinkers who believe
          in the power of blockchain technology to transform the insurance
          landscape. Join us in embracing a smarter, more secure, and
          transparent future for car insurance."
            imgSrc="/images/community.png"
            imgAlt="Community"
            width={500}
            height={250}
          />
          <Section
            title="Get started today"
            description="Ready to experience the future of car insurance? Get
          started with Insurechain today and enjoy the benefits of secure,
          transparent, and smart insurance policies. Your insurance, your
          way—empowered by blockchain technology. Secure. Transparent. Smart.
          Insurechain is your insurance, and the blockchain is our foundation."
            imgSrc="/images/smart-contract-no-bg.png"
            imgAlt="Smart contract"
            width={500}
            height={250}
            imgFirst
          >
            <Box display="flex" justifyContent={'center'} mt={3}>
              <Button size="large" variant="contained" color="primary">
                <StyledLink href="/insurance-contract">Cover me</StyledLink>{' '}
              </Button>
            </Box>
          </Section>
        </Stack>
      </Container>
    </Box>
  );
};

export default Landing;

const show = keyframes`
  from {
    opacity: 0;
    scale: 25%;
  }
  to {
    opacity: 1;
    scale: 100%;
  }
`;
