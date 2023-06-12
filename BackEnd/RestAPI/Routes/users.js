const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
require('../database.js');
const User = require('../Models/user');
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));



router.get('/', async (req, res, next) => {  //to get all users
    try {
        const result = await User.find();
        res.send(result);
    }
    catch {
        res.send('Error' + err);
    }
});



router.post('/addUser', async (req, res, next) => {   
    try {
      let  result = req.body
        const user = new User({
            UserName: result.UserName,
            Email: result.Email,
            Address:result.Address,
            PhoneNumber:result.PhoneNumber,
        });

        const dataRes = await user.save();
        return res.status(200).json({ 
            message: "user added succesfully" 
        })
    }
    catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
});



router.put('/:id', async (req, res, next) => {  //to update user
    try
    {
        const userToUpdate = await User.findOneAndUpdate({ "id": req.params.id })
        if (!userToUpdate) {
            return res.status(404).json({
                mesaage: "user not found" 
            })
        }
        else{
        userToUpdate.UserName = req.body.UserName,
        userToUpdate.Address = req.body.Address,
        userToUpdate.PhoneNumber = req.body.PhoneNumber;
        userToUpdate.Email = req.body.Email;
        userToUpdate._id = req.params.id ;
        const dataRes = await userToUpdate.save();
            return res.status(200).json({ 
                message: "user updated succesfully" 
            })
        }
    }
     catch(err) {
        return res.status(500).json({
            error: err.message
        })
    }
    

});

router.delete('/:Email', async (req, res, next) => {   // to delete the user
    await User.deleteOne({ "Email": req.params.Email }).then(result => {
        return res.send("user deleted successfully ");
    })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;