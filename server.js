/**
 * @Author: andreeray
 * @Date:   2017-12-30T19:50:17+01:00
 * @Email:  andreeray@live.com
 * @Filename: server.js
 * @Last modified by:   andreeray
 * @Last modified time: 2018-01-01T13:14:05+01:00
 */

/* dependencies */
var express     = require('express')
var app         = express()
var bodyParser  = require('body-parser')
var mongoose    = require('mongoose')
var User        = require('./models/user')

/* middleware */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/* setup */
var port = process.env.PORT || 3000
mongoose.connect('mongodb://localhost:27017/mock');


/* Routing */
var router = express.Router()

router.get('/', function (req,res){
 res.json({message: 'mockish!'})
})

router.route('/users')

 .post(function(req, res) {

     var user = new User()

     user.name       = req.body.name
     user.email      = req.body.email
     user.password   = req.body.password


     user.save(function(err) {
         if (err) throw err;
         res.json({message:'User saved successfully!'});
     });

 })
 .get(function(req, res) {
     User.find(function(err, users) {
         if (err) res.send(err);
         res.json(users);
     });
 })

router.route('/users/:user_id')

 .get(function (req,res) {
     User.findById(req.params.user_id, function (err, user) {
         if (err) res.send(err)
         res.json(user)
     })
 })
 .put(function (req,res) {
     User.findById(req.params.user_id, function (err, user) {
         if (err) res.send(err)
         user.name       = req.body.name
         user.email      = req.body.email
         user.password   = req.body.password
         user.save(function (err) {
             if (err) res.send(err)
             res.json({message: 'user updated'})
         })
     })
 })
 .delete(function (req, res) {
     User.remove({
         _id: req.params.user_id
     }, function (err, user) {
         if (err) res.send(err)
         res.json({message: 'Successfully deleted user'})
     })
 })

app.use('/mock', router)
app.listen(port)
console.log('Server upp on port', port)
