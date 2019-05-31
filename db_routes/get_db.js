module.exports = (app, db) => {
  const Op = db.Sequelize.Op;


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


  // name and id of all users for searching to add user
  app.get("/api/search/users", (req, res) => {
    console.log("\n \x1b[44m > \x1b[1m\x1b[33m" +
      req.method + " \x1b[40m " + "\x1b[36m " + req.url + "  " +
      "\x1b[0m" + "Request: userArray" );
    
    db.User.findAll({
      attributes: ["user_name", "id", "picture_ref"]
    }).then( (result) => {
      let userArray = new Array;
      result.forEach((item) => {
        userArray.push(item.get())
      })
      console.table(userArray);
      res.json(userArray);
    });
  });

  //get for group page - all users in group
  app.get('/api/group/:uid/:id', (req, res) => {
    console.log('requested group')
    let id = req.params.id
    let uid = req.params.uid
    db.UserGroup.findAll({
      where: {
        GroupId: id
      },
      include: {
        model: db.User,
        attributes: ['user_name', 'status', 'id', 'phone_number', 'picture_ref'],
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
        // console.log(userGroup.User.get());
        if (userGroup.User.status)
          userArrayActive.push(userGroup.User.get())
        else
          userArrayInactive.push(userGroup.User.get())
      });
      let userArray = userArrayActive.concat(userArrayInactive);
      console.table(userArray);
      res.json(userArray);
    })

  });

  //get for groups page - 
  //all groups of user and all status/ids of members in each group
  app.get('/api/groups/:id', (req, res) => {
    console.log('requested user groups')
    let id = req.params.id;
    db.UserGroup.findAll({
        where: {
          UserId: id
        },
        include: {
          model: db.Group,
          attributes: ['name', 'id'],
          include: {
            model: db.UserGroup,
            attributes: ['GroupId'],
            include: {
              model: db.User,
              attributes: ['status', 'id'],
              order: ['status', 'DESC'],
              where: {
                id: {
                  [Op.ne]: id
                }
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
            let user = userGroup.User
            statusArray.push(user.status)
            console.log('Status:', user.status)
          })
          let group = {
            name: item.Group.name,
            id: item.Group.id,
            memberStatusArray: statusArray
          }
          groupsArray.push(group)
        })
        console.table(groupsArray)
        res.json(groupsArray)

      });

  });
}