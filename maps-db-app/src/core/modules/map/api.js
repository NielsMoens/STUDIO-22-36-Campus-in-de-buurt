import { createHeaders } from "../../utils/api";

const fetchCampusses = () => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/markers`, {
        headers: createHeaders(headers),
    });
}

const fetchCampusById = (campusId) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/markers/${campusId}`, {
        headers: createHeaders(headers),
    });
}

const fetchRelatedByCampus = (campusId) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/markers/${campusId}/relatedMarkers`, {
        headers: createHeaders(headers),
    });
}

const createMarker = (data) => (headers) => {
    console.log(data);
    return fetch(`${process.env.REACT_APP_BASE_API}/markers`, {
        method:'POST',
        headers: createHeaders(headers),
        body: JSON.stringify(data),
    });
}

const updateMarker = (data) => (headers) => {
    const {_id} = data;
    return fetch(`${process.env.REACT_APP_BASE_API}/markers/${_id}`, {
        method:'PATCH',
        headers: createHeaders(headers),
        body: JSON.stringify(data),
    });
}

// const deleteLikedMovieByMovieId = async (movieId, user) => {
//     return fetch(`${process.env.REACT_APP_BASE_API}/likedMovies/${movieId}`, {
//         method: 'DELETE',
//         headers: {
//             'Authorization': `Bearer ${user.token}`
//         },
//       }).then((response) => response.json());
// }

export {
    fetchCampusses,
    fetchCampusById,
    fetchRelatedByCampus,
    createMarker,
    updateMarker
}