import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';

export default function UserCard() {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
      <Avatar />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component='div' variant='p'>
            Name
          </Typography>
          <Typography
            variant='subtitle1'
            color='text.secondary'
            component='div'
          >
            Content
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
