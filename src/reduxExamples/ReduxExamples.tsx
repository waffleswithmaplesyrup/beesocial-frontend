
import { Container, Typography } from '@mui/material'
import CounterExample from './CounterExample'
import PokemonExample from './PokemonExample'

function ReduxExamples() {
  return (
    <Container
      maxWidth='lg'
    >
      <Typography>Counter example</Typography>
      <CounterExample />
      <Typography>pokemon api example</Typography>
      <PokemonExample />
    </Container>
  )
}

export default ReduxExamples
