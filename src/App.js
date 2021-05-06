import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Pokedex from './pages/Pokedex.js';
import PokemonInfo from './pages/PokemonInfo.js';
import styled from 'styled-components';

const Header = styled.div`
  color: #fff;
  background-image: linear-gradient(to bottom right, red, black);  
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0,0,0,0.24);
  padding: 10px 10px;
  height: 100px;
  margin: auto;
  margin-bottom: 10px;
  margin-top: 10px;
`;


function App() {
  const match = useRouteMatch();
  
  return (
    <div className="App">

      <Header>
          <h1>Pokédex</h1>
          <p className="lead">Find information about the first 151 Pokemons!</p>
      </Header> 
      <Switch>
        <Route exact path={`${match.url}pokedex/:pokemoninfo`}>
          <PokemonInfo />
        </Route>
        <Route exact path={match.url}>
          <Pokedex />
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
