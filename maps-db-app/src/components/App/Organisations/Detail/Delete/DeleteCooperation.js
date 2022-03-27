import useAuthApi from "../../../../../core/hooks/useAuthApi";
import { deleteOrganizationLink } from "../../../../../core/modules/organisations/api";
import Button from "../../../../Design/Button";
import Modal from "../../../../Shared/Modal";

const DeleteCooperation = ({campus, onDismiss, onUpdate, setInfo}) => {
    
    const withAuth = useAuthApi();

    const handleDelete = () =>{
        withAuth(deleteOrganizationLink(campus))
        .then(() => {
            setInfo('Coperation deleted');
            onUpdate();
        })
    }

    return(
        <Modal
            title={'Delete cooperation'}
            onDismiss={onDismiss}
        >
            <h2>Are you sure?</h2>
            <p>{campus}</p>
            <Button onClick={handleDelete}>Yes</Button>
            <Button color='danger' onClick={onDismiss}>No</Button>
        </Modal>
)

}

export default DeleteCooperation;