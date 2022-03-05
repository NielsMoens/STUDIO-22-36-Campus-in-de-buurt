import { Link } from 'react-router-dom';
import { Routes } from '../../../../core/routing';
import useFetch from '../../../../core/hooks/useFetch';
import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';
// import Button from '../../../Design/Button';
import { fetchCampusById } from '../../../../core/modules/map/api';
import useAdmin from '../../../../core/hooks/useAdmin';
import MovieCard from '../../../Design/MovieCard';
import SearchForm from './Form/SearchForm';
import Result from './Form/Result';
import { useCallback, useState } from 'react';
import Pagination from '../../../Design/Pagination';
import DeleteMovie from '../Delete/DeleteMovie';
import AddIcon from '../../../Design/AddIcon';
import CampusDetailOverview from './CampusDetailOverview';
import DeleteButton from '../../../Design/DeleteButton';


const CampusOverview = () => {
    // voor nu gewoon een gehardcode campus id, flexible maken met niels zn map example
    const [campusId, setCampusId] = useState("621a556ab03cd81e39c9cb8e");   
    const [info, setInfo] = useState();
    const [toggleInfo, setToggleInfo] = useState(false);

    const apiCall = useCallback(() => {
        return fetchCampusById(campusId);
    }, [campusId])

    const {
        data,
        error,
        setError,
        isLoading,
        refresh,
    } = useFetch(apiCall);

    const handleToggle = () => {
        setToggleInfo(!toggleInfo);
    }

    return (
        <>
            {
                error && <Alert color="danger">{error.message}</Alert>
            }

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
                            <>
                                <div className={'toggler ' + (toggleInfo ? 'hide' : 'show')} onClick={handleToggle}>
                                    <span>&gt;</span>
                                </div>
                                <section className={'infoSidebar ' + (toggleInfo ? 'hide' : 'show')}>
                                    <div className='infoHeader'>
                                        <h3>{data.name}</h3>
                                        <p>Icon: Address comes here</p> 
                                        {/* adres mogelijks gewoon in api opslaan ipv lat long? */}
                                        <button onClick={handleToggle}>Toggle</button>
                                    </div>
                                    <article>
                                        <h4>Samenwerkingen</h4> 
                                        <div className='scrollList'>
                                            <CampusDetailOverview campusId={campusId}/>
                                        </div>
                                    </article>
                                </section>
                            </>
                        }
                        
                        
                    </>
                )
            }
        </>
    )
};

export default CampusOverview;
