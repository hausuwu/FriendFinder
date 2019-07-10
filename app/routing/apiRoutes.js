// LOAD DATA
// ===============================================================================

var friendsData = require("../data/friends")

// ROUTING
// ===============================================================================

module.exports = function(app) {
    

    // link to friends.js json 
    app.get("/api/friends", function(req, res) {
      res.json(friendsData);
    });
  
    // post request, also handles our calculations
    app.post("/api/friends", function(req, res) {
      
      // var newFriend;
      var userInfo = req.body;
      var total = 0;
      var match = {
            name: "",
            photo: "",
            difference: 10000
      };

      // for loop to run through friends.js data list
      for(var i = 0 ; i < friendsData.length; i++){

          total = 0;

          for(var x = 0; x < friendsData[i].scores.length; x++){

            total += Math.abs(friendsData[i].scores[x] - userInfo.scores[x]);

            if(total <= match.difference) {
              match.name = friendsData[i].name,
              match.photo = friendsData[i].photo,
              match.difference = total
            };

          };

      };

      // return match object
      
      console.log(match);
      res.json({name: match.name, photo: match.photo});

    });

  
 
};
  