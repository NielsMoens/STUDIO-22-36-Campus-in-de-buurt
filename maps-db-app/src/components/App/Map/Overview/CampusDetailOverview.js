
import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';
// import Button from '../../../Design/Button';
import { fetchRelatedByCampus } from '../../../../core/modules/map/api';
import { useCallback } from 'react';
import LocationCard from '../../../Design/locationCard';
import useFetchNoAuth from '../../../../core/hooks/useFetchNoAuth';

const CampusDetailOverview = ({campusId: parentCampusId},isAdmin) => {
    
    const apiCall = useCallback(() => {
        return fetchRelatedByCampus(parentCampusId);
    }, [parentCampusId])

    const {
        data:locations,
        error,
        isLoading,
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
