  
import { useState, useEffect } from 'react';
import Select from '../../../Design/Select';
import useAuthApi from '../../../../core/hooks/useAuthApi';
import { useCallback, useMemo } from 'react';
import useFetch from '../../../../core/hooks/useFetch';
import { fetchCampusses } from '../../../../core/modules/map/api';


const CampusSelect = (props) => {
    const withAuth = useAuthApi();

    const apiCall = useCallback(() => {
        return fetchCampusses();
    }, [])

    const {
        data,
    } = useFetch(apiCall);

    const [campus, setCampus] = useState();

    useEffect(() => {
        setCampus(data)
    }, [data, withAuth]);

    const options = campus
        ? campus.map((d) => ({ value: d.id, label: d.name }))
        : null;

    return <Select options={options} {...props} />;
};

export default CampusSelect;