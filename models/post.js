const mongoose=require('mongoose')
const {ObjectId} = mongoose.Schema //ObjectId is in mongoose

//Schema for posts
const postSchema=new mongoose.Schema({
	title: {
       type: String,
       required: true
       
	},
	body: {
       type: String,
       required: true
      
	},
	photo: {
		data: Buffer, //The image will take time to load completely until that it will be in buffer
		contentType: String
	},
	postedBy: {
		type: ObjectId,
		ref:  "User"
	},
	created: {
		type: Date,
		default: Date.now
	},
	updated: Date,
	likes: [{type: ObjectId, ref: "User"}],
	comments: [{text: String, 
				created: {type: Date, default:Date.now},
				postedBy: {type: ObjectId, ref: "User"}
			}]
});

module.exports=mongoose.model("Post",postSchema);