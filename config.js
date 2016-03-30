
export const localPort = 3000;

export const securePort = 3001;

export let passportGit = {
    clientID: '534f655dfd9533d61f6b',
    clientSecret: 'ca6544fcdfc2a1c80a28e585d3e6784030c9eb86',
    callbackURL: "http://localhost:3000/auth/github/callback"
}

export const connectionString = 'mongodb://localhost/myappdb'; 

export let dbOptions = {
	db: { native_parser: true }
	, server: { poolSize: 5, socketOptions: { keepAlive: 1, connectTimeoutMS: 3000 } }
	// , replset: { rs_name: 'myReplicaSetName' }
	// , user: 'myUserName'
	// , pass: 'myPassword'
};

export let corsOptions = {
	origin : '*',
	allowMethods : 'POST,GET,PUT,DELETE,OPTIONS',
	exposeHeaders : 'WWW-Authenticate, Server-Authorization',
	allowHeaders : 'x_radio_partnerid, x_radio_auth, Cache-Control, ragma, Origin, Authorization, Content-Type, X-Requested-With',
	// maxAge : '',
	credentials : true
}

export let ssl = {
	keyPath: 'key.pem',
	certPath: 'key-cert.pem'
};

