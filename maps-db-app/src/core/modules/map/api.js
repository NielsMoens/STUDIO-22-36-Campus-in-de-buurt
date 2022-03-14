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

const fetchRelatedByCampusId = (campus) => (headers) => {
    if(campus !== undefined) {
        fetch(`${process.env.REACT_APP_BASE_API}/markers/${campus.id}/relatedMarkers`, {
            headers: createHeaders(headers),
        }).then(res => res.json());
    }
}

const createMarkerLink = (organisation, campusId) => async (headers) => {
    console.log('we here');
    return fetch(`${process.env.REACT_APP_BASE_API}/markers/link`, {
        method:'POST',
        headers: createHeaders(headers),
        body: JSON.stringify({
            organisationId: organisation.id,
            campusId: campusId
        })
    });
}

const createMarker = (data) => async (headers) => {
    const campusId = data.campus;
    delete data.campus;
    return fetch(`${process.env.REACT_APP_BASE_API}/markers`, {
        method:'POST',
        headers: createHeaders(headers),
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then(async (callbackData) => {
        if(data.type !== "campus") {
            return fetch(`${process.env.REACT_APP_BASE_API}/markers/link`, {
                method:'POST',
                headers: createHeaders(headers),
                body: JSON.stringify({
                    organisationId: callbackData.idd,
                    campusId: campusId
                })
            });
        }
    })
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
    createMarkerLink,
    fetchRelatedByCampusId,
    fetchRelatedByCampus,
    createMarker,
    updateMarker
}