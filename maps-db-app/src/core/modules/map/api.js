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
    fetchCampusses,
    fetchCampusById,
    fetchRelatedByCampus
}