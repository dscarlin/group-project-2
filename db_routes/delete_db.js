module.exports = (app, db) => {

  // Route to remove user
  app.delete("/api/user/:id", (req, res) => {
    console.log("called delete on user");

    let id = req.params.id;
    db.User.destroy({
      where: {
        id: id
      }
    }).then( (res) => res ? res.status(200) : res.status(400) );
  });

  // Route to remove group
  app.delete("/api/group/:id", (req, res) => {
    console.log("called delete on group");

    let id = req.params.id;
    db.UserGroup.destroy({
      where: {
        GroupId : id
      }
    }).then( (result) => {
        db.Group.destroy({
          where: {
            id: id
          }
        }).then( (result) => {
          console.log(result)
          res.json(result)
        })
    }); // end then()
  }); // end delete()

  //remove user from group
  app.delete("/api/user/group/:userId/:groupId", (req, res) => {
    console.log(req.params);

    let UserId = req.params.userId;
    let GroupId = req.params.groupId;

    db.UserGroup.destroy({
      where: {
        UserId: UserId,
        GroupId: GroupId
      }
    }).then( (result) => {
      console.log(result);

      result ? res.status(200).send(true) : res.status(400).send(false);
    });
  });

}; // end export{}