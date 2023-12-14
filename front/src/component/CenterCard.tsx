// CenteredCard.js
import { styled } from '@mui/system';
import Card from '@mui/material/Card';

const CenteredCard = styled(Card)({
  width: '400px',
  margin: 'auto',
  marginTop: 'auto',

borderRadius:"10px",
padding:"5px" ,
  '@media (max-width: 600px)': {
    width: '80%', 
  },
});

export default CenteredCard;
