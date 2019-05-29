const fs = require('fs');
const path = require('path')
module.exports = (app,db,bcrypt) => {
    const Op = db.Sequelize.Op;


    

    //update user profile
    app.put('/api/user/:id', (req, res) => {
        console.log("called put user")
        let id = req.params.id
        let r = req.body
        
        //sanitize input data #nobobbydroptables :)
        let userInfo = { 
            user_name: r.user_name,
            email: r.email,
            tex_enabled: r.text_enabled,
            phone_number: r.phone_number
        }
        if(req.files){

            console.log(abspath)
            let abspath = path.join(__dirname,`/../client/public/images/upload_images/${r.picture_ref}`)
            if(r.picture_ref && r.picture_ref!== 'null' && r.picture_ref != 'phoneDefault.png')
                fs.unlinkSync(abspath);
            let pictureFile = req.files.picture;
            userInfo['picture_ref'] = pictureFile.name;
            pictureFile.mv(`client/public/images/upload_images/${pictureFile.name}`, err => {
                if(err) res.status(500).send(err)
            });
        }
        db.User.update( userInfo, {where: { id: id } } )
        .then((result => result[0] ? res.json(result[0]) : res.status(400).send(false)))
    })


    //change group name
    app.put('api/group/:id', (req, res) => {
        console.log("called put group")
        let groupName = req.body.name
        let id = req.params.id
        db.User.update( {name: groupName}, {where: { id: id } } )
        .then((res => res[0] ? res.status(200) : res.status(400)))

    })

   


}