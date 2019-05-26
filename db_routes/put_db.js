module.exports = (app,db) => {
    const Op = db.Sequelize.Op;

    //update user profile
    app.put('/user/:id', (req, res) => {
        console.log("called put user")
        let id = req.params.id
        let r = req.body
        //sanitize input data #nobobbydroptables :)
        let userInfo = { 
            user_name: r.user_name,
            email: r.email,
            tex_enabled: r.text_enabled,
            phone_number: r.phone_number,
            status: r.status
        }
        db.User.update( userInfo, {where: { id: id } } )
        .then((res => res[0] ? res.status(200) : res.status(400)))
    })

    //change group name
    app.put('/group/:name', (req, res) => {
        console.log("called put group")
        let groupName = req.params.name
        db.User.update( {name: groupName}, {where: { id: id } } )
        .then((res => res[0] ? res.status(200) : res.status(400)))

    })

   


}