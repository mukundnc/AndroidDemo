'use strict';

import userService from '../services/userService';

class UserController{
    
    * getUser(params){
        return yield userService.getUser(params);	
    }
    
    * saveUser(params){
        return yield userService.saveUser(params);	
    }
    
    * updateUser(params){
        return yield userService.updateUser(params);	
    }
    
}

export default new UserController(); 