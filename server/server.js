'use strict';

import * as server from './app/app';
import cluster from 'cluster';
import os from 'os';
// import initdb from './initdb';

//This sets up a cluster of backend servers
if(cluster.isMaster) {
	//number of node instances in the cluster
	// var numWorkers = os.cpus().length;
	var numWorkers = 1;

	console.log('Master cluster setting up ' + numWorkers + ' workers...');

	for(var i = 0; i < numWorkers; i++) {
		cluster.fork();
	}

	cluster.on('online', function(worker) {
		console.log('Worker ' + worker.process.pid + ' is online');
	});

	cluster.on('exit', function(worker, code, signal) {
		console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
		console.log('Starting a new worker');
		cluster.fork();
	});
} else {
	//start the webservice
	server.start();
	// initdb();
}