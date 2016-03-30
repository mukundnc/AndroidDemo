'use strict';

import Router from 'koa-router';
import BodyParser from 'koa-body';
import userController from './../controllers/userController';
import view from './../views/jsonresponseview';
import BasicAuth from 'basic-auth';
import parse from 'co-busboy';
import fs from 'fs';
import path from 'path';
import passport from './../auth/auth';

var controllerMethods = {
    getUser: userController.getUser,
    saveUser: userController.saveUser,
    updateUser: userController.updateUser
};

export function configure(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    
    var authRouter = new Router();
    authRouter.get('/success', loginSuccessHandler);
    authRouter.get('/fail', loginFailureHandler);
    var parser = new BodyParser();
    authRouter.post('/auth/login', parser, passport.authenticate('local', { successReturnToOrRedirect: '/success', failureRedirect: '/fail' }));
    //Configure /auth/github & /auth/github/callback
    authRouter.get('/auth/github', passport.authenticate('github', { scope: ['user', 'repo'] }));
    authRouter.get('/auth/github/callback', passport.authenticate('github', { successReturnToOrRedirect: '/', failureRedirect: '/fail' }));
    app.use(authRouter.middleware());
    
    var APIv1 = new Router();
    // APIv1.use('', authHandler);
    APIv1.get('/user', getHandler);
    APIv1.get('/logout', logoutHandler);
    APIv1.post('/user', parser, postHandler);
    APIv1.post('/upload', parser, uploadHandler);
    
    var ReqRouter = new Router();
    ReqRouter.use('/api', APIv1.routes(), APIv1.allowedMethods());
    app.use(ReqRouter.routes());
    app.use(ReqRouter.allowedMethods());
}

function* logoutHandler(){
    this.session=null;
    view.onSuccess(this, "Logout Successful");
}

function* getHandler() {
    var params = this.params;
    params.id = this.userId;
    let data = yield controllerMethods.getUser(params);
    view.onSuccess(this, data);
}

function* postHandler() {
    var params = this.params;
    params.id = this.userId;
    params.data = this.request.body;
    let data;
    if (!params.id) {
        data = yield controllerMethods.saveUser(params);
    } else {
        data = yield controllerMethods.updateUser(params);
    }
    view.onSuccess(this, data);
}

function* authHandler(next) {
    if (this.req.isAuthenticated()) {
        this.userId = this.passport.user.id;
        yield next;
    } else {
        this.session.returnTo = this.session.returnTo || this.req.url;
        this.throw(401);
    }
}

function* uploadHandler() {
    var parts = parse(this);
    let part;
    let filePaths=[];
    while (part = yield parts) {        
        // var stream = fs.createWriteStream('localstore/' + this.userId + '_' + new Date().getTime() + '_' + part.filename);
        var stream = fs.createWriteStream('localstorage/' + new Date().getTime() + '_' + part.filename);
        part.pipe(stream);
        console.log(stream);
        filePaths.push('http://localhost:3000/'+stream.path.replace('localstorage/',''));
    };
    view.onSuccess(this, filePaths);
};

function* loginSuccessHandler() {
    this.throw(200, 'User Login Successful!');
};

function* loginFailureHandler() {
    this.throw(401, 'User login failed!');
};