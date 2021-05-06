import { useParams, Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import styled from 'styled-components';

const Container = styled.div`
  width: 400px;
  margin: auto;
  margin-top: 10px;
  text-align:'center';  
`;

const TextDesign = styled.div`
    
    h1 { text-transform: uppercase; 
    
        display: block;
        font-size: 2em;
        margin-bottom: 0.67em;
        margin-left: 0;
        margin-right: 0;
        font-weight: bold;
    }
`;

const PokemonInfo = () => {

    const {pokemoninfo} = useParams();
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(undefined);
    const [pokemon, setPokemon] = useState(undefined);
    const [name, setName] = useState(undefined);
    const [sprites, setSprites] = useState(undefined);
    
    useEffect(()=>{

        setTimeout(()=>{
            axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemoninfo}/`)
            .then((response)=>{
                const {data} = response;
                setName(data);
                setSprites(data.sprites);
                setPokemon(data.stats);
                setLoading(false);
            })
            .catch((error)=>{
                console.log(error.response);
                const {status,data} = error.response;
                setLoading(false);
                setError(`${status} ${data}`);
            });
        }, 1500);
    }, []);
    return(
        <div>
            {loading && (
                <Loading />
            )}
            {!loading && error && (
                <div className='text-center'>
                    <p className='lead'>{error}</p>
                    
                    <Link to="/" className='btn btn-primary'>Back</Link>
                    
                </div>
            )}
            {!loading && !error && pokemon && (
                <div>
                    <Container>
                        <div>
                            <img src={sprites.front_default} height='180px' width='180px' />
                            <TextDesign>
                            <h1>{name.name}</h1>
                            </TextDesign>
                        </div>
                        <table className='table' key={pokemon.name}>
                            <thead>
                                <tr>
                                    <th>Stats</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <p>HP</p>
                                        <p>ATTACK</p>
                                        <p>DEFENSE</p>
                                        <p>SPECIAL-ATTACK</p>
                                        <p>SPECIAL-DEFENSE</p>
                                        <p>SPEED</p>
                                    </td>
                                    <td key={name.name}>
                                        { pokemon.map( abilities => (
                                            <p key={abilities.base_stat+Math.random()}>{abilities.base_stat}</p>
                                        ))}
                                    </td>
                                </tr>
                            </tbody>
                            
                        </table>
                        <Link to="/" className='btn btn-primary'>Back</Link>
                    </Container>
                </div>
            )}
        </div>
    );
}

export default PokemonInfo;