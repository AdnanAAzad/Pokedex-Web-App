import {useState, useEffect} from 'react';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';


const Pokedex = () => {

    // create state for pokemon data
    const [pokelist, setPokelist] = useState([]);
    const [error, setError] = useState(undefined);
    const [loading, setLoading] = useState(true);

    // call the pokedex API when component mounts
    useEffect(() => {

        window.setTimeout(() => {
        // get API request
            axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
            .then( (response) => {
                const {data} = response;
                setPokelist(data.results);
                setLoading(false);
            })
            .catch( (err) => {
                // Error handling
                console.log(err.response);
            })
            .then(() => {
                console.log('Compiled Successfully!')
            });
        }, 1500);
    }, []
    );
    

    return(
        <div>
            {pokelist.length===0 ? (
                <Loading />
            ) : (
                <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Pokemons</th>
                        </tr>
                    </thead>
                </table>
                
                {pokelist.map( pokemon => (
                    <Button className="btn" key={pokemon.name}>
                        {/* POTENTIAL ERROR POINT */}
                        <Link to={`pokedex/${pokemon.name}`}>{pokemon.name}</Link>
                    </Button>    
                ))}
                
            </div>
            )}
        </div>
    );
}


export default Pokedex;