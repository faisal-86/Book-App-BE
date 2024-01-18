//Define all APIs or Functions

//Export the Modules
module.exports = {
    index: function (req, res) {
        // This will render the index in home folder as the main folder /
        // res.render("home/index", {title: "Welcome to Wild Wonders App"});
        console.log("I am here");
        res.json("OK")
    },
};
