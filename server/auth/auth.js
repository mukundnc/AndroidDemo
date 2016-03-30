'use strict';

import * as config from '../../config';

import passport from 'koa-passport';
import Github from 'passport-github';
import Local from 'passport-local';
import users from './../models/user';
import co from 'co';
var GithubStrategy = Github.Strategy;
var LocalStrategy = Local.Strategy;

passport.use(new GithubStrategy({
        clientID: config.passportGit.clientID,
        clientSecret: config.passportGit.clientSecret,
        callbackURL: config.passportGit.callbackURL
    }, function (accessToken, refreshToken, profile, done) {
        //Based on profile return from Github, find existing user
        let user = profile;

        //Return user model
        return done(null, user);
    })
);

passport.use(new LocalStrategy(
    function (username, password, done) {
        let data = co.wrap(getUser);
        data(null, {username:username}).then(function(val){
            if (val && val.password === password)
                done(null, val);
            else
                done(null, false);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

function* getUser(params, query) {
    var user = yield users.getUser(params, query);
    return user;
};

export default passport;