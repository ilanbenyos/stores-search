// Minimal Simple REST API Handler (With MongoDB and Socket.io)
// Plus support for simple login and session
// Plus support for file upload
// Author: Yaron Biton misterBIT.co.il

"use strict";

var cl = console.log;

//===========================================
const Login1 = require('./login');
var cat = new Login1();
console.log(cat.makeSound('toyota'));
var session = cat.getLog('111','111');
console.log('session=', session.user, session.pass);
//===========================================
const express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	mongodb = require('mongodb')

const clientSessions = require("client-sessions");
const upload = require('./uploads');
const app = express();

var corsOptions = {
	origin: /http:\/\/localhost:\d+/,
	credentials: true
};

const serverRoot = 'http://localhost:3003/';
const baseUrl = serverRoot + 'data';


app.use(express.static('uploads'));


app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(clientSessions({
	cookieName: 'session',
	secret: 'C0d1ng 1s fun 1f y0u kn0w h0w', // set this to a long random string!
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
}));


const http = require('http').Server(app);
const io = require('socket.io')(http);


function dbConnect() {
	return new Promise((resolve, reject) => {
		// Connection URL  
		var dbUser = 'ilan';
		var dbPassword = '123';
		var url = `mongodb://${dbUser}:${dbPassword}@ds145223.mlab.com:45223/dagon-db`;
		// var url = 	    "mongodb://ilanben:xsw23edc@ds029665.mlab.com:29665/sprint4"	;
		// var url = 	"mongodb://kerendot:weddix123@ds159591.mlab.com:59591/weddix";
		// var url = 	"mongodb://ilanben:xsw23edc@ds145223.mlab.com:45223/dagon-db"	;
		// var url = 'mongodb://localhost:27017/seed';
		// Use connect method to connect to the Server
		console.log('url:', url)
		mongodb.MongoClient.connect(url, function (err, db) {
			if (err) {
				cl('Cannot connect to DB', err)
				reject(err);
			}
			else {
				cl("Connected to DB");
				resolve(db);
			}
		});
	});
}


// POST - adds 
app.post('/data/:objType', upload.single('file'), function (req,res) {
	const objType = req.params.objType;
	mainHub(req,res);
});


//============================================================
function addRecord(obj, type1){
	// const obj = req.body.msg.data;
	return new Promise((resolve, reject) => {
	dbConnect().then((db) => {
		const collection = db.collection(type1);
		obj._id = Date.now() ;
		collection.insert(obj, (err, result) => {
			if (err) {
				cl(`addRecord.Couldnt insert a new ${type1}`, err)
				reject ({status:'err',err:err})
			} else {
				cl('addRecord.'+ type1 + " added:"+ obj);
				obj.status='success';
				
				resolve ({status:'success',obj})
			}
			db.close();
		});
	});
});
}
//============================================================

var facilities = [
		{id:'1',ponds:[1,2,3,4], nameEn:'new Hamama', nameHeb:'חממה חדשה',nameEnShort:'NH',nameHebShort:'ח"י',count:32},
		{id:'2', nameEn:'old Hamama', nameHeb:'חממה חדשה',nameEnShort:'OH',nameHebShort:'חח',count:31},
		{id:'3', nameEn:'hatalot', nameHeb:'חממה חדשה',nameEnShort:'ATAL',nameHebShort:'ח"י',count:32},
		{id:'4', nameEn:'bet ariza', nameHeb:'חממה חדשה',nameEnShort:'BetH',nameHebShort:'ח"י',},
		{id:'5', nameEn:'KC', nameHeb:'KC',nameEnShort:'KC',nameHebShort:'KC'},
				]
var ponds = [
		{id:'1', fac:'1',vol:4,name:'ח1'},
		{id:'2', fac:'1',vol:4,name:'2ח'},
		{id:'3', fac:'1',vol:4,name:'3ח'},
		{id:'4', fac:'1',vol:4,name:'ח4'},
		{id:'5', fac:'1',vol:4,name:'5ח'},
		{id:'6', fac:'1',vol:4,name:'6ח'},
		{id:'7', fac:'1',vol:4,name:'7ח'},
		{id:'8', fac:'1',vol:4,name:'8ח'},
		{id:'9', fac:'1',vol:4,name:'ח9'},
		{id:'10', fac:'1',vol:4,name:'ח10'},
		{id:'11', fac:'1',vol:4,name:'ח11'},
		{id:'12', fac:'1',vol:4,name:'ח12'},
		{id:'13', fac:'1',vol:4,name:'ח13'},
		{id:'14', fac:'1',vol:4,name:'ח14'},
		{id:'15', fac:'1',vol:4,name:'ח15'},
		{id:'16', fac:'1',vol:4,name:'ח16'},
		{id:'17', fac:'1',vol:4,name:'ח17'},
		{id:'18', fac:'1',vol:4,name:'ח18'},
		{id:'19', fac:'1',vol:4,name:'ח19'},
		{id:'20', fac:'1',vol:4,name:'20ח'},
		{id:'21', fac:'1',vol:22,name:'21ח'},
		{id:'22', fac:'1',vol:22,name:'22ח'},
		{id:'23', fac:'1',vol:22,name:'23ח'},
		{id:'24', fac:'1',vol:22,name:'24ח'},
		{id:'25', fac:'1',vol:22,name:'25ח'},
		{id:'26', fac:'1',vol:22,name:'26ח'},
		{id:'27', fac:'1',vol:22,name:'27ח'},
		{id:'28', fac:'1',vol:22,name:'28ח'},
		{id:'29', fac:'1',vol:22,name:'29ח'},
		{id:'30', fac:'1',vol:22,name:'ח30'},
		
		{id:'31', fac:'2',vol:4,name:'1ט'},
		{id:'32', fac:'2',vol:4,name:'2ט'},
		{id:'33', fac:'2',vol:4,name:'3ט'},
		{id:'34', fac:'2',vol:4,name:'4ט'},
		{id:'35', fac:'2',vol:4,name:'5ט'},
		{id:'36', fac:'2',vol:4,name:'6ט'},
		{id:'37', fac:'2',vol:22,name:'6ט'},
		{id:'38', fac:'2',vol:22,name:'7ט'},
		{id:'39', fac:'2',vol:22,name:'8ט'},
		{id:'40', fac:'2',vol:22,name:'9ט'},

		{id:'41', fac:'3',vol:4,name:'R1'},
		{id:'42', fac:'3',vol:4,name:'R2'},
		{id:'43', fac:'3',vol:4,name:'R3'},
		{id:'44', fac:'3',vol:4,name:'4R'},
		{id:'45', fac:'3',vol:4,name:'R5'},
		{id:'46', fac:'3',vol:4,name:'R6'},
		{id:'47', fac:'3',vol:22,name:'R7'},
		{id:'48', fac:'3',vol:22,name:'R8'},
		{id:'49', fac:'3',vol:22,name:'R9'},
		{id:'50', fac:'3',vol:22,name:'R10'},

]
var users1=[
	{name:'motti', userName: 'motke',password:'111'},
	{name:'guy', userName: 'guy',password:'111'},
	{name:'chang', userName: 'chang',password:'111'},
	{name:'yafim', userName: 'yafim',password:'111'},
]

var batchs=[
	{pond:'1', type: '1',amount:20000, size:.2,feedPercent:5,txt:'to australis',parents:[],graderFrom:1, graderTo:3},
]

function createCollection(collection,name){
	for (var doc = 0; doc < collection.length; doc++) {
		var obj = collection[doc];
		addRecord(obj, name)
	}
}
// createCollection(users1,'users')
// createCollection(facilities,'facilities')
// createCollection(ponds,'ponds')
//============================================================
var count = 1;
function getCountId(){
	var id = '_'+ count
	count ++
	return id
}

//============================================================
function addToList(act,req,res){
	var acts = req.acts
	const newObj = acts[0].newObj;
	var list = acts[0].list;
	addRecord(newObj,list).then(function(arg){
			if (arg.status==='err') {
				res.json(500, { error: 'Failed to add' })
			} else {
				var act =req.acts[0] 
				act.res = arg.status;
				mainHub2(act,req,res);
			}
	})
}
//============================================================
function getList(act,req,res){
	const list =act.list;
	const criteria = (act.criteria)? act.criteria:{};
	getListFromDb(list,criteria).then(function(list){
			if (list.status==='err') {
				res.json(500, { error: 'Failed to add' })
			} else {
				act.res= list.objs;
				mainHub2(act,req,res)
			}
	})
}
//============================================================
function getListFromDb(type1,criteria){
	// console.log('getListFromDb1:',type1,criteria)
	return new Promise((resolve, reject) => {
		dbConnect().then(db => {
			const collection = db.collection(type1);
			collection.find(criteria).toArray((err, objs) => {
				if (err) {
					cl('Cannot get you a list of ', err)
					reject ({status:'err not found',err:err})
				} else {
					cl("Returning list of " + objs.length + " " + type1 + "s");
					resolve ({status:'success',objs})
				}
				db.close();
			});
		});
	})
}
//============================================================
function updateInList(act,req,res){
	const list =act.list;
	const newObj 	= act.newObj;
	const objId = newObj._id;

	updateRecordInDb(list,objId,newObj).then(function(dbRes){
			if (dbRes.status==='err') {
				res.json(500, { error: 'Failed to add' })
			} else {
				act.res= dbRes.res;
				mainHub2(act,req,res)
			}
	})
}
//============================================================
function updateRecordInDb(list,userId,newObj){
	if (newObj._id && typeof newObj._id === 'string') newObj._id = new mongodb.ObjectID(newObj._id);

	cl(`Requested to UPDATE the ${list} with id: ${newObj._id}`);
	return new Promise((resolve, reject) => {
				dbConnect().then((db) => {
					const collection = db.collection(list);
					collection.findOneAndReplace(
									{_id : newObj._id },
									newObj,
									{returnOriginal: false},
						(err, result) => {
							if (err) {
								cl('Cannot Update', err)
								//					reject ({status:'err not found',err:err})

								reject({ error: 'Update failed' })
							} else {
								var res= result.value;
								resolve ({res})
							}
							db.close();
						});
				});
	});
}
//============================================================
function deleteFromList(act,req,res){
	const objId = act.objId;
	const list = act.list;
	deleteRecordFromDb(list,objId).then(function(dbRes){
			if (dbRes.status==='err') {
				res.json(500, { error: 'Failed to delete' })
				// reject ({status:'err updating failed',err:err})
			} else {
				act.res= dbRes.status;
				mainHub2(act,req,res)
			}
	})
}
//============================================================
function deleteRecordFromDb(list,objId){
	cl(`Requested to DELETE the ${list} with id: ${objId}`);
	return new Promise((resolve, reject) => {
			dbConnect().then((db) => {
				var collection = db.collection(list);
				collection.deleteOne({ "_id": objId }, (err, result) => {
					if (err) {
						cl('Cannot Delete', err)
							reject ({status:'err deleteing failed',err:err})
					} else {
						
						cl("Deleted", result);
						resolve ({status:'success'})
					}
					db.close();
				});
			});
	});
}
//============================================================
function cloneDeep(obj){
      var myJSON = JSON.stringify(obj);
      return JSON.parse(myJSON)
}
//============================================================
function mainHub(req,res){//orgeize the action before start looping it in mainHub1
	 req.acts = {};
	 res.acts = {};
	 if (!Array.isArray(req.body.msg.acts)){  //1 of action recived=>convert to array with 1 obj
	 		var obj = cloneDeep(req.body.msg)
			 req.msg = {};
			 req.msg.acts = [obj];
	 }	
			req.acts = req.body.msg.acts;
			res.acts = [];
			var act = req.acts[0]
			mainHub1(act,req,res)
	 
}
//============================================================
function mainHub2(act,req,res){	//orgeize the action after every loop
		var obj = cloneDeep(req.acts[0])
		req.acts.splice(0,1);
		res.acts.push(obj);
		var act = req.acts[0];
	 if(req.acts.length >0) {
		mainHub1(act,req,res);
	 }else{
		 responseToClient(res);
	 }
}
//============================================================
function mainHub1(act,req,res){
	
	req.act =req.acts[0] 
	const actType =req.act.actType;
		switch (actType) {
			case 'addToList':
				addToList(act,req,res);
			break;
			case 'getList':  //
				getList(act,req,res);
			break;
			case 'deleteFromList':  //
				deleteFromList(act,req,res);
			break;
			case 'updateInList':  //
				updateInList(act,req,res);
			break;
		}
}
//============================================================
function responseToClient(res,msgToClient){
	res.json(res.acts);
}
//============================================================
// Kickup our server 
// Note: app.listen will not work with cors and the socket
// app.listen(3003, function () {
http.listen(3003, function () {
	console.log(`misterREST server is ready at ${baseUrl}`);
	console.log(`GET (list): \t\t ${baseUrl}/{entity}`);
	console.log(`GET (single): \t\t ${baseUrl}/{entity}/{id}`);
	console.log(`DELETE: \t\t ${baseUrl}/{entity}/{id}`);
	console.log(`PUT (update): \t\t ${baseUrl}/{entity}/{id}`);
	console.log(`POST (add): \t\t ${baseUrl}/{entity}`);

});



cl('WebSocket is Ready');

io.on('connection', function (socket) {
	//====================
	socket.on('disconnect', function (ev) {
		console.log('user disconnected, socket.id=', socket.id);
	});

	//=====================================================
	socket.on('sendMsg', function (msg) {
		// console.log('chat.js/sendMsg: ' + msg);
		msg = JSON.parse(msg);
		msg.status = 'atServer';
		updateSocket(msg,socket);
		msg.processed = true;
		// console.log('chat.js/sendNewMsg.type1: ' + msg.type1);
		if (!msg.from){
			 askUserToInit(socket);
			 return
		}
		updateVals(msg,socket);
		switch (msg.type1) {
			case 'getOurHistory'://    
				getOurHistory(msg);
			break;

			case 'sendMsgToUser':
				msgs.push(msg);
				sendMsgToUser(msg.to,msg)
				sendMsgToUser(msg.from,msg)
				// if( msg.from !=msg.to)
				break;
			// case 'sendMsgToAll':
			// 		// console.log('chat.js/sendMsgToAll: ' + msg);
			// 	sendAll('msg received', msg);
			// 	break;
			case 'ilan':
				ilan('msg received', msg);
			break;
			// case 'UserReadAllMsgs'://
			// 		console.log('chat./UserReadAllMsgs: ' + msg);
			// 	UserReadAllMsgs(msg);
			// 	break;
			case 'userIsMovingOutOfChat'://
					console.log('chat./userIsMovingOutOfChat: ' + msg);
				userIsMovingOutOfChat(msg);
				break;
			case 'initUser'://    
					initUser(msg,socket);
				break;
			default:
				console.log('chat.js/switch: ' + msg.type1);
		}

	});
});



