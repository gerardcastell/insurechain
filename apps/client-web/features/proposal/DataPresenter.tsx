import { SxProps, Box, Typography, Theme } from '@mui/material';
import { grey } from '@mui/material/colors';

export const DataPresenter = ({
  title,
  value,
  sx,
}: {
  title: string;
  value: string;
  sx?: SxProps<Theme>;
}) => {
  return (
    <Box>
      <Typography variant="body2" mr={1} color={grey[500]}>
        {title}
      </Typography>
      <Typography variant="body1" sx={sx} noWrap>
        {value}
      </Typography>
    </Box>
  );
};
