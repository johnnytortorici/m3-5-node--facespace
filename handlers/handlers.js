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
    currentUser = users.find( (user) => {
        return user._id === _id;
    });
    // only render profile page if user exists with that _id
    if (currentUser !== undefined) {
        // find userFriends by _id
        let userFriends = [];
        currentUser.friends.forEach( (friend) => {
            users.forEach( (user) => {
                if (user._id === friend) userFriends.push(user);
            });
        });
        // render profile page and pass currentUser object and friends array
        res.status(200).render('pages/profile', { user: currentUser, friends: userFriends });
    } else {
        // if _id does not exist, redirect to home page
        res.status(404).redirect('/');
    }
};

// declare the signin page handler
const handleSignin = (req, res) => {
    res.status(200).render('pages/signin');
};

// declare name handler for signin form
const handleName = (req, res) => {
    const firstName = req.body.firstName.toLowerCase();
    const userLogin = users.find( (user) => {
        return user.name.toLowerCase() === firstName;
    });
    // redirect to profile page only if login matches user name
    if (userLogin !== undefined) {
        res.status(200).redirect(`/users/${userLogin._id}`);
    } else {
        res.status(404).redirect('/signin');
    }
};

// declare the 404 handler
const handleFourOhFour = (req, res) => {
    res.status(404).send("I couldn't find what you're looking for.");
};

module.exports = { handleHomepage, handleProfilePage, handleSignin, handleName, handleFourOhFour };