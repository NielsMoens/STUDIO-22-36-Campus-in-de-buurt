
import useFetch from '../../../../core/hooks/useFetch';
import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';
// import Button from '../../../Design/Button';
import { fetchRelatedByCampus } from '../../../../core/modules/map/api';
import useAdmin from '../../../../core/hooks/useAdmin';
import { useCallback, useState } from 'react';
import LocationCard from '../../../Design/locationCard';
import useFetchNoAuth from '../../../../core/hooks/useFetchNoAuth';

const CampusDetailOverview = ({campusId: parentCampusId},isAdmin) => {
    
    const [campusId, setCampusId] = useState(parentCampusId);
    const [info, setInfo] = useState();

    const apiCall = useCallback(() => {
        return fetchRelatedByCampus(parentCampusId);
    }, [parentCampusId])

    const {
        data:locations,
        error,
        setError,
        isLoading,
        refresh,
    } = useFetchNoAuth(apiCall);

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
                                    <LocationCard location={locationDetail.organisation}/>
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
