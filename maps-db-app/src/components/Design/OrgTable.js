import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { Link } from "react-router-dom";
import { route, Routes } from '../../core/routing';

const OrgTable = ({data, setter, deleter}) => {
    return (
        <table className='mt-4 organisations'>
            <thead>
                <tr>    
                    <th></th>
                    <th>Name</th>
                    <th>type</th>
                    <th>contact</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map((org) => (
                    <tr key={org._id}>
                            <td>
                                <DeleteButton deleter={() => deleter(org)}/>
                            </td>
                            <td>
                                <Link to={route(Routes.OrganisationsDetail, {id: org._id})}>
                                    {org.name}
                                </Link>
                            </td>
                            <td>
                                <Link to={route(Routes.OrganisationsDetail, {id: org._id})}>
                                    {org.type}
                                </Link>
                            </td>
                            <td>
                                <Link to={route(Routes.OrganisationsDetail, {id: org._id})}>
                                    {org.contact ? org.contact : "Geen contact gegevens"}
                                </Link>
                            </td>
                            <td>
                                <EditButton editor={() => setter(org)}/>
                            </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default OrgTable;