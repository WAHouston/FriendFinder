const fs = require("fs")

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        fs.readFile("app/data/friends.js", "utf8", function(err, data) {
        res.json(JSON.parse(data))
        })
    })
    app.post("/api/friends", function(req, res) {
        console.log("Post Recieved")
        fs.readFile("app/data/friends.js", function(err, data) {
            if (err) throw err
            var array = JSON.parse(data)
            var scores = req.body.scores
            var userSum = 0
            var matchNum = Infinity
            var matchIndex = -1
            for (var i = 0; i < scores.length; i++) {
                userSum += parseInt(scores[i])
            }
            for (var i = 0; i < array.length; i++) {
                var sum = 0
                for (var j = 0; j < array[i].scores.length; j++) {
                    sum += parseInt(array[i].scores[j])
                }
                if((Math.abs(userSum - sum)) < matchNum) {
                    matchNum = Math.abs(userSum - sum)
                    matchIndex = i
                }
            }
            res.end(JSON.stringify(array[matchIndex]))
            array.push(req.body)
            fs.writeFile("app/data/friends.js", JSON.stringify(array, null, 2), function(err) {
                if (err) {
                    return console.log(err)
                }
            })
        })
    })
}