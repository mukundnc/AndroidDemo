'use strict';

import mongoose from 'mongoose';
let model = 'user';

var UserSchema = new mongoose.Schema({
	username : String,
	password : String,
	email : String,
	firstname : String,
	lastname : String,
	location : String,
	lastseen : Date,
    id : Number,
    version : Number,
    imageurls : [String]
});

class User{
    
    * getUser(params, query) {	
        var db = mongoose.connection;  
        var User = db.model(model, UserSchema)
        if (!query)
            query = { id: params.id };
        let result = yield User.findOne(query).sort({ version: -1 }).limit(1).exec()
        return result;
    }
    
    * saveUser(params) {
        var db = mongoose.connection;
        if(!params.data.id)
            params.data.id = new Date().getTime();		
        var User = db.model(model, UserSchema);
        var user = new User(params.data);
        let result = yield [user.validate(), user.save()];
        return result;
    }
    
    * updateUser(params) {
        var db = mongoose.connection;
        delete params.data._id;
        var User = db.model(model, UserSchema);
        var options = { runValidators: true };
        let result = yield User.findOneAndUpdate({id: params.id, version: params.data.version}, params.data, options);
        return result;
    }	
    
}

export default new User();