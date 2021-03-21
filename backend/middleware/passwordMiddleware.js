const checkPassword = (req, res, next) => {
    const {password, password2} = req.body

    if (password !== password2) {
        res.status(400)
        throw new Error('Passwords do not match')    
    }

    next()
}

export default checkPassword