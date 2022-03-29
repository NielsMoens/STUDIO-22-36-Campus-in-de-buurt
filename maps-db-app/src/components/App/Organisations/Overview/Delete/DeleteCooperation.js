import useAuthApi from "../../../../../core/hooks/useAuthApi";
import { deleteOrganisation } from "../../../../../core/modules/organisations/api";
import Button from "../../../../Design/Button";
import Modal from "../../../../Shared/Modal";

const DeleteOrganisation = ({organisation, onDismiss, onUpdate, setInfo, setError}) => {
    
    const withAuth = useAuthApi();

    const handleDelete = () =>{
        withAuth(deleteOrganisation(organisation._id))
        .then(() => {
            setInfo('organisation deleted');
            onUpdate();
        })
        .catch((e) => {
            setError(e)
        })
    }

    return(
        <Modal
            title={`Delete organisation: ${organisation.name}`}
            onDismiss={onDismiss}
        >
            <h2>Are you sure?</h2>
            <Button onClick={handleDelete}>Yes</Button>
            <Button color='danger' onClick={onDismiss}>No</Button>
        </Modal>
)

}

export default DeleteOrganisation;