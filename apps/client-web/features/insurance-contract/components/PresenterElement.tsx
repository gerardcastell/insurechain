import { Box, Typography } from '@mui/material';

type ElementProps = {
  title: string;
  content: string | number;
  icon: React.ReactNode;
};
const Element = ({ title, content, icon }: ElementProps) => {
  return (
    <Box component="div" display={'flex'}>
      <Box component={'div'} marginRight={1}>
        {icon}
      </Box>
      <Box component="div">
        <Typography variant="caption" fontStyle={'italic'}>
          {title}
        </Typography>
        <Typography
          sx={{ fontWeight: 'regular', textTransform: 'capitalize' }}
          variant="body1"
        >
          {content}
        </Typography>
      </Box>
    </Box>
  );
};

export default Element;
