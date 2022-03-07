import roles from "./constants"


const isAdmin = (user) => {
    return user.role === roles.admin || user.role === roles.superadmin
}

const isSuperAdmin = (user) => {
    return user.role === roles.superadmin
}

export {
    isAdmin,
    isSuperAdmin
};