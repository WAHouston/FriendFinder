const fs = require("fs")
var friends = require("../data/friends")

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends)
    })
    app.post("/api/friends", function(req, res) {
        console.log("Post Recieved")
        fs.readFile("app/data/friends.js", function(err, data){
            if (err) throw err
            var array = JSON.parse(data)
            array.push(req.body)
            fs.writeFile("app/data/friends.js", JSON.stringify(array, null, 2), function(err) {
                if (err) {
                    return console.log(err)
                }
            })
        })
    })
}