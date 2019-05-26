module.exports = (app,db) => {
    const Op = db.Sequelize.Op;


    

    //update user profile
    app.put('/api/user/:id', (req, res) => {
        console.log("called put user")
        console.log(req.files)
        let pictureFile = req.files.picture
        pictureFile.mv(`client/public/images/upload_images/${pictureFile.name}`, err => {
            if(err) res.status(500).send(err)
        })
        let id = req.params.id
        let r = req.body
        //sanitize input data #nobobbydroptables :)
        let userInfo = { 
            user_name: r.user_name,
            email: r.email,
            // tex_enabled: r.text_enabled,
            phone_number: r.phone_number,
            picture_ref: `@/public/images/upload_images/${pictureFile.name}`

        }
        db.User.update( userInfo, {where: { id: id } } )
        .then((result => result[0] ? res.json(result[0]) : res.status(400)))
    })


    //change group name
    app.put('api/group/:name/:id', (req, res) => {
        console.log("called put group")
        let groupName = req.params.name
        let id = req.params.id
        db.User.update( {name: groupName}, {where: { id: id } } )
        .then((res => res[0] ? res.status(200) : res.status(400)))

    })

   


}