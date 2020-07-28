const mongoose=require("mongoose");
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');
const {ObjectId} = mongoose.Schema;

const userSchema=new mongoose.Schema({
	name: {
		type: String,
		trim: true, // While entering name if there is space in the beginning it will be removed.
		required: true
	},

	email: {
		type: String,
		trim: true, 
		required: true
	},
    
    // Will be saved in encrypted format
	hashed_password: {
		type: String,
		required: true
	},

	salt: String, // A long randomly generated string

	// Profile csreated and updated date
	created: {
		type: Date,
		default: Date.now
	},

	updated: Date,
	photo: {
		data: Buffer,
		contentType: String
	},
	about: {
		type: String,
		trim: true
	},
    following: [{type: ObjectId, ref: "User"}],
    followers: [{type: ObjectId, ref: "User"}],
    resetPasswordLink: {
    	data: String,
    	default: ""
    },
    role: {
    	type: String,
    	default: "subscriber"
    }
});

/**
* Virtual fields are additional fields for a given model.
* Their value can be set manually or automatically with defined functionality.
* Virtual properties (password) dont get persisted in the database ie. the password entered
  by the user will not be saved instead a encrypted one will be saved. 
* They only exist logically and are not written to the document's collection.
*/ 

// Virtual field 
userSchema.virtual('password')
.set(function(password){
	 // Create temporary variable called _password
	 this._password = password
     // Generate a timestamp
     this.salt = uuidv1()
     // encryptPassword() and this keyword refers to the userSchema
     this.hashed_password = this.encryptPassword(password)

})
.get(function(){
	// Virtual field will take the plain password and return that plain password but in between it will be hashed and saved in db.
	return this._password; 
})

// Methods
userSchema.methods = {
	authenticate: function(plainText) {
		return this.encryptPassword(plainText)==this.hashed_password
	},
	
	encryptPassword: function(password){
		if(!password) return "";
		try {
			// crypto will hash the password and this.salt is the key
			return crypto.createHmac('sha1', this.salt)
                   .update(password)
                   .digest('hex');

		} catch(err) {
            return ""
             
		}
	}
}

module.exports = mongoose.model("User",userSchema);