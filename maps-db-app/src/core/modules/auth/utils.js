import roles from "./constants"


const isAdmin = (user) => {
    return user.role === roles.admin || roles.superadmin
}

const isSuperAdmin = (user) => {
    return user.role === roles.superadmin
}

export {
    isAdmin,
    isSuperAdmin
};