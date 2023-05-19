displayName = (req, res) => {
    let data = 'bookstore before frontend installed';
    res.status(200).send(data);
};

module.exports = {
    displayName,
};