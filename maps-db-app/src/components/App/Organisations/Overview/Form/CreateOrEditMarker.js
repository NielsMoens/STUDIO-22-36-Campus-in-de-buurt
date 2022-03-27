import { useState } from 'react';
import useAuthApi from '../../../../../core/hooks/useAuthApi';
import ErrorAlert from '../../../../Shared/ErrorAlert';
import MarkerForm from './MarkerForm';
import { createMarker, updateMarker } from '../../../../../core/modules/map/api';
import Modal from '../../../../Shared/Modal';

const CreateOrEditMarker = ({marker, onUpdate, onDismiss }) => {
    const withAuth = useAuthApi();
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();
    // const admin = useAdmin();

    const isNew = !marker._id;

    const handleSubmit = (data) => {
        setIsLoading(true);
        withAuth(
            isNew
                ? createMarker(data)
                : updateMarker(data)
        )
        .then((data) => {
            // let parent know data is updated
            onUpdate(data);
        })
        .catch((err) => {
            setError(err);
            setIsLoading(false);
        });
    };

    return (
        <Modal
            title={isNew ? 'Add marker' : 'Update marker'}
            onDismiss={onDismiss}>
            <ErrorAlert error={error} />

            <MarkerForm
                isNew={isNew}
                onSubmit={handleSubmit}
                initialData={marker}
                disabled={isLoading}
            />
        </Modal>
    );
};

export default CreateOrEditMarker;