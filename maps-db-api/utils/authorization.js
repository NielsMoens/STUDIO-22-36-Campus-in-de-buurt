const isSuper = (req) => {
    const {user} = req
    if (user.role !== 'superadmin') {
        req.body.published = false;
    }
    return req;
}

module.exports = isSuper;