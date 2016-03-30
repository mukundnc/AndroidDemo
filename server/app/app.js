'use strict';

import koa from 'koa';
import cors from 'kcors';
import mongoose from 'mongoose'; 	
import koaJsonLogger from 'koa-json-logger';
import common from 'koa-common';
import gzip from 'koa-gzip';
import session from 'koa-generic-session';
import * as routes from './../routes/routes';
import view from './../views/jsonresponseview'; 
import * as config from '../../config';
import store from './../localstore/store';

var app = koa();

export function start() {

	mongoose.connect(config.connectionString, config.dbOptions); 
    var db = mongoose.connection;

	db.on('connected', function () {  
	  console.log('Mongoose connection open ');
	}); 

	db.on('error',function (err) {  
	  console.log('Mongoose connection error: ' + err);
	}); 

	db.on('disconnected', function () {  
	  console.log('Mongoose connection disconnected'); 
	});
 
	app.use(koaJsonLogger({
		name: 'myApp',
		path: 'log',
		jsonapi: false
	}));
	
	app.use(gzip());

	app.use(common.static(__dirname+'./../../web'));
    
	app.use(common.static(__dirname+'./../../localstorage'));    

	app.use(cors(config.corsOptions));

	app.use(function *(next){
	//   this.db = db;
	  this.type = 'application/json';
	  yield next;
	  console.log('%s - %s', this.method, this.url);
	});

	app.use(function *(next){
		try{
		    yield next; 
		} catch (err) { //executed only when an error occurs & no other middleware responds to the request
			// view.onError(this, 'application failed to respond', 22);
			//delegate the error back to application
			// this.app.emit('error', err, this);
			this.throw('error occurred in application: %s', err);
		}
	});
    
    app.keys=['my secret'];
    
    app.use(session({
        cookie: {maxAge: 1000 * 60 * 15},
        rolling: true,
        store: store
    }));
    
	routes.configure(app);

	app.listen(process.env.PORT || config.localPort);
    
    console.log("server started on port %s", process.env.PORT || config.localPort)
    
}


