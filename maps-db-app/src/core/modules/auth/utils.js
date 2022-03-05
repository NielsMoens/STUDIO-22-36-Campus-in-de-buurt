import roles from "./constants"


const isAdmin = (user) => {
    return user.role === roles.admin || roles.superadmin
}

export default isAdmin;