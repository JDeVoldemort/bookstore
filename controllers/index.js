displayName = (req, res) => {
    let data = 'Bookstore api access working. Still need a ui';
    res.status(200).send(data);
};

module.exports = {
    displayName,
};