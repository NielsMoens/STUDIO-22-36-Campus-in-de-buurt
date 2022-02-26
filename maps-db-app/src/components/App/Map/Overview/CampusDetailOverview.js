import { Link } from 'react-router-dom';
import { Routes } from '../../../../core/routing';
import useFetch from '../../../../core/hooks/useFetch';
import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';
// import Button from '../../../Design/Button';
import { fetchRelatedByCampus } from '../../../../core/modules/map/api';
import useAdmin from '../../../../core/hooks/useAdmin';
import MovieCard from '../../../Design/MovieCard';
import SearchForm from './Form/SearchForm';
import Result from './Form/Result';
import { useCallback, useState } from 'react';
import Pagination from '../../../Design/Pagination';
import DeleteMovie from '../Delete/DeleteMovie';
import AddIcon from '../../../Design/AddIcon';
import LocationCard from '../../../Design/locationCard';

const CampusDetailOverview = () => {
    
    const [campusId, setCampusId] = useState("62114c01fc02d6274eb6ec96");
    const [info, setInfo] = useState();

    const apiCall = useCallback(() => {
        return fetchRelatedByCampus(campusId);
    }, [campusId])

    const {
        data:locations,
        error,
        setError,
        isLoading,
        refresh,
    } = useFetch(apiCall);

    return (
        <>
            {
                error && <Alert color="danger">{error.message}</Alert>
            }

            {
                isLoading && <Spinner />
            }

            {
                locations && (
                    <>

                        {
                            info && <Alert color="info">{info}</Alert>
                        }

                        {
                            locations.map((locationDetail) => (
                                <li key={locationDetail._id}>
                                    <LocationCard location={locationDetail}/>
                                </li>
                            ))
                        }
                        
                    </>
                )
            }
        </>
    )
};

export default CampusDetailOverview;
