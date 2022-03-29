import useFetch from '../../../../core/hooks/useFetch';
import Spinner from '../../../Design/Spinner';
import Alert from '../../../Design/Alert';
import { fetchOrganisations } from '../../../../core/modules/organisations/api';
import useAdmin from '../../../../core/hooks/useAdmin';
import { useCallback, useEffect, useState } from 'react';

import AddButton from '../../../Design/AddButton';
import EditButton from '../../../Design/EditButton';
import OrgTable from "../../../Design/OrgTable";
import DeleteOrganisation from './Delete/DeleteCooperation';

const OrganisationsOverview = () => {    
    const [info, setInfo] = useState();
    const [deleteOrganisation, setDeleteOrganisation] = useState();

    const apiCall = useCallback(() => {
        return fetchOrganisations();
    }, [])

    const {
        data,
        error,
        setError,
        isLoading,
        refresh,
    } = useFetch(apiCall);

    const onUpdate = () => {
        setDeleteOrganisation(null);
        refresh();
    }

    return (
        <>
            {
                info && <Alert> {info} </Alert>
            }
            {
                error && <Alert color="danger">{error.message}</Alert>
            }

            {
                isLoading && <Spinner />
            }

            {   
               <>
                    {
                        data && (
                            <>
                              
                                {
                                    <OrgTable
                                        data={data}
                                        deleter={setDeleteOrganisation}
                                    />

                                } 
                            </>
                        )
                    }
                    {
                        deleteOrganisation && (
                            <DeleteOrganisation
                                organisation={deleteOrganisation}
                                onUpdate={onUpdate}
                                onDismiss={() => setDeleteOrganisation(null)}
                                setInfo={setInfo}
                                setError={setError}
                            />
                        )
                    }
                </>
            }
            
        </>
    )
};

export default OrganisationsOverview;
