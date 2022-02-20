import { Link } from 'react-router-dom';
import { Routes } from '../../../../core/routing';
import useFetch from '../../../../core/hooks/useFetch';
import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';
// import Button from '../../../Design/Button';
import { fetchMoviesPaginated } from '../../../../core/modules/movies/api';
import useAdmin from '../../../../core/hooks/useAdmin';
import MovieCard from '../../../Design/MovieCard';
import SearchForm from './Form/SearchForm';
import Result from './Form/Result';
import { useCallback, useState } from 'react';
import Pagination from '../../../Design/Pagination';
import DeleteMovie from '../Delete/DeleteMovie';
import AddIcon from '../../../Design/AddIcon';
import LocationCard from '../../../Design/locationCard';

const MoviesOverview = () => {
    
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(20);
    const [deleteMovie, setDeleteMovie] = useState();
    const [info, setInfo] = useState();

    const apiCall = useCallback(() => {
        return fetchMoviesPaginated(page, perPage);
    }, [page, perPage])

    const {
        data,
        error,
        setError,
        isLoading,
        refresh,
    } = useFetch(apiCall);
    
    const [query, setQuery] = useState('');

    const admin = useAdmin();

    const onSubmit = (query) => {
        setQuery(query.search)
    }

    const handlePageClick = (page) => {
        setPage(page);
    }

    const handlePerPageClick = (perPage) => {
        setPerPage(perPage);
    }

    const onUpdate = () => {
        setDeleteMovie(null);
        refresh();
    }

    return (
        <>
            {
                error && <Alert color="danger">{error.message}</Alert>
            }

            <h1 className='mt-3'>Points of interest:</h1>

            {
                isLoading && <Spinner />
            }

            {
                data && (
                    <>

                        {
                            info && <Alert color="info">{info}</Alert>
                        }

                        {
                            admin && <Link className="add" to={Routes.MoviesCreate}><AddIcon/></Link>
                        }
                        
                        <SearchForm
                            onSubmit={onSubmit}
                            setQuery={setQuery}
                        />
                        {
                            query && <Result updateChecker={deleteMovie} deleter={setDeleteMovie} result={query}/>
                        }
                        {/* {
                            !query && (
                                <>
                                    <ul className='movieList'>
                                        { data.movies.map((movie) => (
                                            <li key={movie._id}>
                                                <MovieCard deleter={setDeleteMovie} movie={movie}/>
                                            </li>
                                        ))}
                                    </ul>
                                    <Pagination 
                                        page={page}
                                        perPage={perPage}
                                        pageAmount={data.pageAmount}
                                        perPageClick={handlePerPageClick}
                                        onClick={handlePageClick}
                                    />
                                </>
                            )
                        }

                        {
                            deleteMovie && (
                                <DeleteMovie
                                    movie={deleteMovie}
                                    onUpdate={onUpdate}
                                    onDismiss={() => setDeleteMovie(null)}
                                    setError={setError}
                                    setInfo={setInfo}
                                />
                            )
                        } */}

                        {
                            <section className='infoSidebar'>
                                
                                <div className='infoHeader'>
                                    <h3>Campus name</h3>
                                    <p>Icon: Address comes here</p>
                                </div>
                                <article>
                                    <h4>Samenwerkingen</h4>
                                    <div className='scrollList'>
                                        { data.movies.map((locationDetail) => (
                                                <LocationCard data={locationDetail}/>
                                        ))}
                                        
                                    </div>
                                </article>
                            </section>
                        }
                        
                        
                    </>
                )
            }
        </>
    )
};

export default MoviesOverview;
