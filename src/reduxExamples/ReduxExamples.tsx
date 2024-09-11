
import { Box, Typography } from '@mui/material'
import CounterExample from './CounterExample'
import PokemonExample from './PokemonExample'
import ToggleThemeButton from '../components/ToggleThemeButton'

function ReduxExamples() {
  return (
    <Box
      maxWidth='lg'
    >
      <Typography>Toggle Theme</Typography>
      <ToggleThemeButton />
      <Typography>Counter example</Typography>
      <CounterExample />
      <Typography>pokemon api example</Typography>
      <PokemonExample />
    </Box>
  )
}

export default ReduxExamples
