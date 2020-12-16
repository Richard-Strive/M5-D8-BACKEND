const express = require("express");
const { join } = require("express");
/*
 The backend shall include at least the following routes:
    - POST /attendees/ => add a new participant to the event.  Attendees' data will include:
        - ID
        - First Name
        - Second Name
        - Email
        - Time of Arrival (a string is ok) 
        After successfully saving the participant in an attendees.json file on disk, backend will send an email to that participant's mail address
*/

const attendeesRouter = express.Router();

/*
POST
1. Read the DB
2.Write on the DB
3. Send the response to the client
*/

attendeesRouter.post("/", async (req, res, next) => {
  res.send("Working");
});
// attendeesRouter.get("/", async (req, res, next) => {
//   console.log("working");

//   res.send("Working");
// });
// attendeesRouter.put("/", async (req, res, next) => {
//   console.log("working");

//   res.send("Working");
// });
// attendeesRouter.delete("/", async (req, res, next) => {
//   console.log("working");

//   res.send("Working");
// });

module.exports = attendeesRouter;
