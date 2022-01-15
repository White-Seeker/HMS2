const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const Notice=require('./models/notice.model')
const Student = require('./models/student.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs') //a hashing mechanism
const { db } = require('./models/notice.model')

app.use(cors())
app.use(express.json())

var bodyParser = require('body-parser');
const { response } = require('express')

app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses

mongoose.connect('mongodb+srv://hello:hello@cluster0.klx12.mongodb.net/hello?retryWrites=true&w=majority')

//To add staffs
app.post('/api/register', async (req, res) => {
	console.log(req.body)
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			name: req.body.name,
			email: req.body.email,
			password: newPassword,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})
//To register students, add students
app.post('/api/studentregister', async(req,res) =>{
	console.log(req.body)
	try{
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await Student.create({
			name: req.body.name,
			phone: req.body.phone,
			address: req.body.address,
			roll: req.body.roll,
			registration: req.body.registration,
			email: req.body.email,
			password: newPassword
		})
		res.json({status:'ok'})
	} catch(err){
		res.json({status:'error', error: 'Duplicate email'})
	}
})

//To fetch student details

app.get('/api/studentlogin', async(req,res) =>{
	try{
		const user=await Student.find({})
		console.warn(user)
		return res.json({user})
	}
	catch(error){
		console.log({status:'error', error:'failed again'})
	}
})

// To allot rooms to the students
//This will update the existing Student table
//and set their room.no and block.no
app.post('/api/allotroom', async(req,res) =>{
	try{
		await Student.updateOne({
			roll: req.body.roll
		},
		{
			$set:{room: req.body.room,
				block: req.body.block},
		})
		res.json({status: 'ok'})
	} catch(error){
		console.log(error)
		res.json({status: 'error', error: err})
	}
})

//To publish / add notices to the database
app.post('/api/notice', async(req,res) =>{

	try {
		await Notice.create({
			name: req.body.name ,
			notice: req.body.notice ,
			noticetitle: req.body.noticetitle,
			nid: Math.random(),
		})
		res.json({ status: 'ok' })
	} catch (err) {
		console.log(err)
		res.json({ status: 'error', error: err })
	}
})

//To fetch / display notices from the database
app.get('/api/notice',async (req,res)=>{
	try{
		const user = await Notice.find({})
		console.warn(user)
		return res.json({user})
	}
	catch(error){
		console.log({status:'error', error:'failed again'})
	}
})

//To delete a notice
app.post('/api/noticedelete', async(req,res) =>{
	try {
		await Notice.deleteOne({
			nid: req.body.nid,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		console.log(err)
		res.json({ status: 'error', error: err })
	}
})

app.post('/api/studentdelete', async(req,res)=>{
	try{
		await Student.deleteOne({
			roll: req.body.roll,
		})
		res.json({status: 'ok'})
	} catch(err) {
		console.log(err)
		res.json({status: 'error', error:err})
	}
})


//This comes into play when a student tries to log in. It checks if the student exists
// in the database or not. It verifies the password.
app.post('/api/studentlogin', async(req,res) =>{
	const user=await Student.findOne({
		email: req.body.email
	})
	if(!user){
		return {status: 'error', error: 'Invalid login'}
	}
	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if(isPasswordValid){
		const token=jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secret123'
		)

		return res.json({status: 'ok', user: token})
	} else{
		return res.json({status: 'error', user: false})
	}
})

//This comes into play when a staff tries to log in. It checks if the staff exists in
//the database or not. It verifies the password.
app.post('/api/login', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secret123'
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})

//Hosted in port: 3000, apis in 1337.
app.listen(process.env.PORT||1337, () => {
	console.log('Server started')
})




// app.get('api/notice', function(req, res) {
//     Notice.findByIdAndRemove(req.params.nid, (err, doc) => {
//         if (!err) {
//             res.send("Done");
//         } else {
//             console.log('Failed to Delete user Details: ' + err);
//         }
//     });
// })

//---------------------------------------------------

// app.get('/api/noticedelete',async(req,res)=>{
// 	nid=req.body.nid
// 	res.send(nid)
// 	try{
// 		await Notice.deleteOne({
// 			"nid": nid
// 		})
// 		res.send(nid);
// 		console.log(nid);
// 	}
// 	catch(err){
// 		res.send("err")
// 	}
// })

//--------------------------------------------------------

// app.get('/api/noticedelete/', function(req, res){
// 	Notice.deleteOne({nid: req.params.nid}, 
// 	function(err){
// 		if(err){
// 			res.json(err);
// 		}
// 		else 
// 			res.send(req.params.nid);
// 	});
// });
