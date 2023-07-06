const Contact = require('../models/contacts.models');
const User = require('../models/user.models');

exports.login = (req, res) => {
    User.find({ name: req.body.username, password: req.body.password})
    .then(User => {
        if (!User){
            res.status(404).send({'message': 'user not found'});
            res.render('login', { error: 'Invalid username or password' });
        }
        else 
            res.redirect('/businessContacts');
    })
    .catch(error => {
        res.status(500).send({
            'message': 'Something went wrong',
            'error' : error
        })
    })
}
// create user
// Disabled to comment once user created
// exports.create = (req, res) => {
//     if(!req.body.username || !req.body.password){
//         return res.status(400).send({
//             'message': "Incomplete record"
//         }); 
//     }
//     const user = new User({
//         username : req.body.username,
//         password : req.body.password
//     })
//     user.save()
//     .then(data => res.send(data))
//     .catch(error => {
//         res.status(500).send({
//             'message': 'Something went wrong',
//             'error' : error
//         })
//     })
// }
//create contact
exports.create = (req, res) => {
    if(!req.body.firstname){
        return res.status(400).send({
            'message': "Incomplete record"
        }); 
    }
    const contact = new Contact({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email: req.body.email,
        number : req.body.number
    })
    contact.save()
    .then(data => res.send(data))
    .catch(error => {
        res.status(500).send({
            'message': 'Something went wrong',
            'error' : error
        })
    })
}

exports.findAll = (req,res) => { //find is a default function of mongoDB
    Contact.find()
    .then(contact => {
        res.send(contact)
    })
    .catch(error => {
        res.status(500).send({
            'message': 'Something went wrong',
            'error' : error
        })
    })
}

exports.findOne = (req, res) => {
    //console.log(req.params.id)
    Contact.findById(req.params.id)
    .then(contact => {
        if (!contact){
            res.status(404).send({'message': 'id not found'})
        }
        else 
        res.send(contact);
    })
    .catch(error => {
        res.status(500).send({
            'message': 'Something went wrong',
            error : error
        })
    })
}

exports.update = (req, res) =>{
    if(!req.body.firstname){
        return res.status(400).send({'message': 'Firstname cannot be empty'})
    }
    Contact.findByIdAndUpdate(req.params.id, {
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email: req.body.email,
        number : req.body.number
    }, {new : true})
    .then(
        contact => {
            if (!contact){
                res.status(404).send({'message': 'id not found'})
            }
            else 
            res.send(contact);
        }
    )
    .catch(error => {
        res.status(500).send({
            'message': 'Something went wrong',
            'error' : error
        })
    })
}
exports.delete = (req, res) =>{
    Contact.findByIdAndRemove(req.params.id)
    .then(
        contact => {
            if (!contact){
                res.status(404).send({'message': 'id not found'})
            }
            else 
            res.send({
                message : "ID deleted"
            });
        }
    )
    .catch(error => {
        res.status(500).send({
            'message': 'Something went wrong',
            'error' : error
        })
    })
}