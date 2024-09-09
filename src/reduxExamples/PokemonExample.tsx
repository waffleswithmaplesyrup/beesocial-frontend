
import { useState } from 'react';
import { useGetPokemonByNameQuery } from '../redux/APIs/pokemonApi';
import { Box, Button, Container, Input, Typography } from '@mui/material';

function PokemonExample() {

  const [search, setSearch] = useState("");

  const [pokemon, setPokemon] = useState("");

  const { data, error, isLoading } = useGetPokemonByNameQuery(pokemon);

  const handleSubmit = (e) => {
    e.preventDefault();

    setPokemon(search);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Input 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Enter pokemon name'
        />
        <Button type='submit'>Enter</Button>
      </form>

      <Box>
        {error ? (
          <Typography
            variant='body2'
            align='center'  
          >
            Oh no, there was an error
          </Typography>
        ) : isLoading ? (
          <Typography>Loading...</Typography>
        ) : data && data.name === pokemon ? (
          <>
            <Typography>{data.name}</Typography>
            <img src={data.sprites.front_default} alt={data.name} />
          </>
        ) : null}
      </Box>
    </Box>
  )
}

export default PokemonExample
