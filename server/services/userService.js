'use strict';

import user from '../models/user';

class UserService{
    
    * getUser(params){
        let data = yield user.getUser(params);
        return data;
    }
    
    * saveUser(params){
        let data = yield user.saveUser(params);
        return data;
    }
    
    * updateUser(params){
        let data = yield user.updateUser(params);
        return data;
    }
    
}

export default new UserService(); 