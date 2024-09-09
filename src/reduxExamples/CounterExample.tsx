
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { decrement, increment } from '../redux/slices/counterSlice';
import { Box, Button, Typography } from '@mui/material';

function CounterExample() {

  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <Box
      style={{display: "flex"}}
    >
      <Button 
        onClick={() => dispatch(increment())}
      >
        +
      </Button>
      <Typography>{count}</Typography>
      <Button onClick={() => dispatch(decrement())}>
        -
      </Button>
    </Box>
  )
}

export default CounterExample
