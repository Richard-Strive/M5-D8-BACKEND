const express = require("express");
const { check, validationResult } = require("express-validator");
// const { join } = require("express");
const uniqid = require("uniqid");
const { getAttendees, writeAttendees } = require("./tools");
const sgMail = require("@sendgrid/mail");

// const {};
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
4. if posted ok? send email to partecipant :
1/ testing if statement
2/ apply something in it
*/
attendeesRouter.post(
  "/",
  [
    check("First Name").exists().withMessage("Insert Firts Name!"),
    check("Second Name").exists().withMessage("Insert Second Name!"),
    check("Email").exists().withMessage("Insert Email!"),
  ],
  async (req, res, next) => {
    try {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: "dorianrentals@gmail.com",
        from: "studentrichard4@gmail.com", // Use the email address or domain you verified above
        subject: "Sending with Twilio SendGrid is Fun",
        text: "and easy to do anywhere, even with Node.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>",
      };

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const err = new Error();
        err.message = errors;
        err.httpStatusCode = 400;
        next(err);
      } else {
        allAttedees = await getAttendees();
        newAttendens = {
          ...req.body,
          ID: uniqid(),
          timeOfArrival: new Date(),
        };
        await sgMail.send(msg);
      }

      allAttedees.push(newAttendens);
      writeAttendees(allAttedees);

      res.status(200).send("SENT");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);
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
