
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { decrement, increment } from '../redux/slices/counterSlice';
import { Box, Button, Typography } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function CounterExample() {

  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <Box
      style={{display: "flex"}}
    >
      <Button 
        color='secondary'
        variant='contained'
        onClick={() => dispatch(increment())}
      >
        <AddIcon />
      </Button>
      <Typography
        variant='h5'
        sx={{margin: 1}}
      >
        {count}
      </Typography>
      <Button 
        color='secondary'
        variant='outlined'
        onClick={() => dispatch(decrement())}
      >
        <RemoveIcon />
      </Button>
    </Box>
  )
}

export default CounterExample
