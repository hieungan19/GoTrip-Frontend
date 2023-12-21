import styled from '@emotion/styled';
import { Badge } from 'reactstrap';

export const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    padding: '0 0px',
    width: '4px',
    fontSize: '8px',
  },
  marginRight: '8px',
}));
