const fs = require("fs");
const path = require("path");
const saltRounds = 8;

module.exports = (app, db, bcrypt) => {
  const Op = db.Sequelize.Op;

  //Route to update user profile
  app.put("/api/user/:id", (req, res) => {
    console.log("called put user");

    let id = req.params.id;
    let r = req.body;

    //sanitize input data #nobobbydroptables
    let userInfo = {
      user_name: r.user_name,
      email: r.email,
      tex_enabled: r.text_enabled,
      phone_number: r.phone_number
    };

    if (req.files) {
      let abspath = path.join(__dirname,`/../client/public/images/upload_images/${r.picture_ref}`);
      console.log(abspath);

      if (r.picture_ref && r.picture_ref !== "null" && r.picture_ref !== "phoneDefault.png") {
        fs.unlinkSync(abspath);
      }

      let pictureFile = req.files.picture;
      userInfo["picture_ref"] = pictureFile.name;
      pictureFile.mv(`client/public/images/upload_images/${pictureFile.name}`, (err) => {
        if (err) {
          res.status(500).send(err);   
        }
      });

      bcrypt.hash(r.password, saltRounds, (err, hash) => {
        userInfo["password"] = hash;
        db.User.update( userInfo, {
          where: {
            id: id
          }
        }).then( (result) => result[0] ? res.json(result[0]) : res.status(400).send(false) );
      });

    }
  });

     //change status of all groups based upon state of groups array from groups page
     app.put('/api/status/:uid', (req, res) => {
        let uid = req.params.uid;
        let groupArr = req.body;
        let success = false
        groupArr.forEach(group => {
            let userAndGroup = {
                UserId: uid, GroupId: group.id
            }
            db.UserGroup.update({status: group.status },{where: userAndGroup }).then(result => {
                success = result ? true : false
            });
        }) 
        console.log(success)
        res.json(req.user); 
    })

    app.put('/api/range/:uid', (req, res) => {
        console.log('UPDATE MINS *********')
        let uid = req.params.uid;
        console.log(req.body)
      
        let minutes = {minutes: parseInt(req.body.minutes)}
        db.User.update( minutes ,{where: { id: uid } }).then(response => {
            res.send(response);
        })

    })

  // Route to change group name
  app.put("api/group/:id", (req, res) => {
    console.log("called put group");
    let groupName = req.body.name;
    let id = req.params.id;
    db.User.update({
      name: groupName
    }, {
      where: {
        id: id
      }
    }).then( (res) => res[0] ? res.status(200) : res.status(400));
  });

        
  //change status
  app.put("/api/status/:uid", (req, res) => {
    let id = req.params.uid;
    let status = req.body.status;
    db.User.update({
       status: status
    }, {
      where: {
        id: id
      }
    }).then( (result) => {
      console.log(result);
      if (result) {
        res.json(req.user);
      }
    });
  });
    

}; // end export{}