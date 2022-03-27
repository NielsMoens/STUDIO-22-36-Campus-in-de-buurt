import { createHeaders } from "../../utils/api";

const fetchOrganisations = () => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/organisations`, {
        headers: createHeaders(headers),
    });
}

const fetchOrganisationById = (id) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/organisations/${id}`, {
        headers: createHeaders(headers),
    });
}

const createMarkerLink = (data) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/organisations/link/create`, {
        method:'POST',
        headers: createHeaders(headers),
        'content-type': 'multipart/form-data',
        body: JSON.stringify(data),
    });
}
// const createLikedMovie = (data) => (headers) => {
//     return fetch(`${process.env.REACT_APP_BASE_API}/likedMovies`, {
//         method:'POST',
//         headers: createHeaders(headers),
//         body: JSON.stringify(data),
//     });
// }

// const deleteLikedMovieByMovieId = async (movieId, user) => {
//     return fetch(`${process.env.REACT_APP_BASE_API}/likedMovies/${movieId}`, {
//         method: 'DELETE',
//         headers: {
//             'Authorization': `Bearer ${user.token}`
//         },
//       }).then((response) => response.json());
// }

export {
    fetchOrganisations,
    fetchOrganisationById,
    createMarkerLink
}