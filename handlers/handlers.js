// declare the homepage handler
const handleHomepage = (req, res) => {
    res.status(200).render('pages/homepage');
};

// declare the 404 handler
const handleFourOhFour = (req, res) => {
    res.status(404).send("I couldn't find what you're looking for.");
};

module.exports = { handleHomepage, handleFourOhFour };