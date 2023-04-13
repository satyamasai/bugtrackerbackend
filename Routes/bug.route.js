const { Router } = require("express");
const { bugModel } = require("../Models/bug.model");
const { Authentication } = require("../Middlewares/authenication");

const bugController = Router();
// -----------------------------------adding bug in database----------------
// --------------ADDING THE BUGGGGGG---------------------------------------------------------------
bugController.post("/addbug",Authentication, async (req, res) => {
  const { bugname, severity ,user_id} = req.body;
  // console.log(bugname, severity,totalCount, "this is data");
  const existing_bug = await bugModel.findOne({ bugname });

  if (existing_bug) {
    // res.send({ msg: "Same bug has been detected please resolve that first.." });
    res.status(500).send({msg:"Bug already detected ...!"})
    return;
  }
  try {
    const newBug = new bugModel({
      bugname,
      severity,
      user_id
      
    });

    await newBug.save();
    res.send({ msg: "Bug has been created..!" });
  } catch (err) {
    console.log(err);
  }
});
// -----------------------------------Fetching bug in database----------------

bugController.get("/getBugs",Authentication, async(req, res) => {
  const {user_id } = req.body
  console.log(user_id,"ui")
  const allBugs = await bugModel.find({user_id});


  res.send({ allBugs });
});

// ---------------------  delete Bug-------------------------------------------------------


bugController.delete("/DeleteBug/:id", async(req, res) => {
  // console.log(req.params)
  const {id} = req.params
  const allBugs = await bugModel.deleteOne({_id:id});
  res.send({ msg:"Bug has been deleted..!"});
});


// ----------------------------------------------------------------
module.exports = {
  bugController
};
