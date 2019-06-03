module.exports = (app, db, aws, S3_BUCKET) => {
  const Op = db.Sequelize.Op;

  // route to retrieve signed url from AWS s3 bucket for upload image
  app.get('/sign-s3', (req, res) => {
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read',
      CacheControl: "no-cache"
    };
  
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        console.log(err);
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
      console.log('### data ',data)
      res.send(JSON.stringify(returnData));
      res.end()
      
    });
  });

  // Route to manage login status
  app.get("/loginStatus", (req, res) => {
    console.log("\n \x1b[44m > \x1b[1m\x1b[33m" +
      req.method + " \x1b[40m " + "\x1b[36m " + req.url + "  " +
      "\x1b[0m" + "Authenticated: " + req.isAuthenticated());

    if (req.isAuthenticated()) {
      res.send(req.user);
    } else {
      res.json(req.isAuthenticated());
    }
  });

  // Route to logout current user / session
  app.get("/logout", (req, res) => {
    req.logout();
    req.session.destroy(err => {
      if (err) res.send(err)
    });

    console.log("\n \x1b[44m > \x1b[1m\x1b[33m" +
      req.method + " \x1b[40m " + "\x1b[36m " + req.url + "  " +
      "\x1b[0m" + "Authenticated: " + req.isAuthenticated());   
    
    res.json(req.isAuthenticated())
  });

  // Route to get requested user
  app.get("/api/user/:id", (req, res) => {
    console.log("\n \x1b[44m > \x1b[1m\x1b[33m" +
      req.method + " \x1b[40m " + "\x1b[36m " + req.url + "  " +
      "\x1b[0m" + "Request: user_id = " + req.params.id);

    let id = req.params.id;
    db.User.findOne({
      where: {
        id: id
      }
    }).then( (result) => {
      //console.log(result);
      res.send(result);
    });
  });

  //route to get requested user and their status for selected group
  app.get("/api/user/status/:id/:grpid", (req, res) => {
    console.log("\n \x1b[44m > \x1b[1m\x1b[33m" +
    req.method + " \x1b[40m " + "\x1b[36m " + req.url + "  " +
    "\x1b[0m" + "Request: user_id = " + req.params.id +
    " group_id = " + req.params.grpid);

    let id = req.params.id;
    let grpid = req.params.grpid
    db.User.findOne({
      where: {
        id: id
      },
      include: {
        model: db.UserGroup,
        attributes: ['status'],
        where: {
            GroupId: grpid
        }
    }   
    }).then( (result) => {
      //console.log(result);
      res.send(result);
    });
  });
  

    // Route to get group page for all users in group
  app.get("/api/group/:uid/:id", (req, res) => {
    console.log("\n \x1b[44m > \x1b[1m\x1b[33m" +
      req.method + " \x1b[40m " + "\x1b[36m " + req.url + "  " +
      "\x1b[0m" + "Requested group: " + req.params.id + " : " + req.params.uid);
        let id = req.params.id
        let uid = req.params.uid
        db.UserGroup.findAll({
            where: { GroupId: id }, 
            include: {
                model: db.User,
                attributes: ['user_name','id','phone_number','picture_ref'],
                where: {
                    id: {
                        [Op.ne]: uid
                    }
                }
            }   
        }).then(result => {
            let userArrayActive = new Array();
            let userArrayInactive = new Array();
            result.forEach(userGroup => {
            let userInfo = userGroup.User.get()
            userInfo['status'] = userGroup.status
            let array = userGroup.status ? userArrayActive : userArrayInactive
            array.push(userInfo)
            });
            let userArray = userArrayActive.concat(userArrayInactive);
            console.table(userArray);
            res.json(userArray);
        })
  });
        
  // Route to get name and id of all users for searching to add user
  app.get("/api/search/users", (req, res) => {
    console.log("\n \x1b[44m > \x1b[1m\x1b[33m" +
      req.method + " \x1b[40m " + "\x1b[36m " + req.url + "  " +
      "\x1b[0m" + "Request: userArray" );
    
    db.User.findAll({
      attributes: ["user_name", "id", "picture_ref"]
    }).then( (result) => {
      let userArray = new Array;

      result.forEach((item) => {
        userArray.push(item.get());
      });

      console.table(userArray);
      res.json(userArray);
    });
  });
  
   // Route to get groups for page 
  // all groups of user and all status/ids of members in each group
  app.get("/api/groups/:id", (req,res) => {
    console.log("\n \x1b[44m > \x1b[1m\x1b[33m" +
      req.method + " \x1b[40m " + "\x1b[36m " + req.url + "  " +
      "\x1b[0m" + "Requested user groups: " + req.params.id);

        let id = req.params.id;
        db.UserGroup.findAll({
            where: { UserId: id }, 
            include: {
                model: db.Group,
                attributes: ['name','id'],
                include: {
                    model: db.UserGroup,
                    attributes: ['GroupId','status'],
                    where: {
                        UserId: {
                            [Op.ne] : id
                        }
                    }
                }
            } 
        })
        .then(result => {
            let groupsArray = new Array;
            result.forEach(item => {
                let statusArray = new Array;
                item.Group.UserGroups.forEach(userGroup => {
                    statusArray.push(userGroup.status)
                })
                let group = {
                    name: item.Group.name,
                    id: item.Group.id,
                    status: item.status,
                    memberStatusArray: statusArray
                }
                groupsArray.push(group) 
            })
            console.table(groupsArray)
            res.json(groupsArray)
        });

  });

 
  

    app.get('/api/range/:uid', (req, res) => {
        let uid = req.params.id;
       
        User.findOne({where: { id: uid }, attributes: ['minutes'] }).then(response => {
            res.send(response);
        });
    });


}; // end export{}
