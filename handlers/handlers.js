// require users.js, the database of users
const { users } = require('../data/users');

// declare current user, will assign later
let currentUser = {};

// declare the homepage handler
const handleHomepage = (req, res) => {
    res.status(200).render('pages/homepage', { users: users });
};

// declare the profile page handler
const handleProfilePage = (req, res) => {
    const _id = req.params._id;
    // find currentUser by _id
    users.forEach( (user) => {
        if (user._id === _id) currentUser = user;
    });
    // find userFriends by _id
    let userFriends = [];
    currentUser.friends.forEach( (friend) => {
        users.forEach( (user) => {
            if (user._id === friend) userFriends.push(user);
        });
    });

    res.status(200).render('pages/profile', { user: currentUser, friends: userFriends });
};

// declare the 404 handler
const handleFourOhFour = (req, res) => {
    res.status(404).send("I couldn't find what you're looking for.");
};

module.exports = { handleHomepage, handleProfilePage, handleFourOhFour };