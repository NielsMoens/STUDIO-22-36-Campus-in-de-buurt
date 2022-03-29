import { createHeaders } from "../../utils/api";

const fetchOrganisations = () => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/organizations`, {
        headers: createHeaders(headers),
    });
}

const fetchOrganisationById = (id) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/organizations/${id}`, {
        headers: createHeaders(headers),
    });
}

const createMarkerLink = (data) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/organizations/link/create`, {
        method:'POST',
        headers: createHeaders(headers),
        'content-type': 'multipart/form-data',
        body: JSON.stringify(data),
    });
}

const fetchMarkerLinksById = (id) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/organizations/link/${id}`, {
        headers: createHeaders(headers),
    });
}

const deleteOrganizationLink = (id) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/organizations/link/${id}`, {
        method:'DELETE',
        headers: createHeaders(headers),
    });
}
const deleteOrganisation = (id) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/organizations/${id}`, {
        method:'DELETE',
        headers: createHeaders(headers),
    });
}

export {
    fetchOrganisations,
    fetchOrganisationById,
    createMarkerLink,
    fetchMarkerLinksById,
    deleteOrganizationLink,
    deleteOrganisation
}