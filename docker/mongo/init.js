db = db.getSiblingDB('admin');
db.auth(_getEnv('MONGO_INITDB_USERNAME'), _getEnv('MONGO_INITDB_PASSWORD'));

db = db.getSiblingDB(_getEnv('MONGO_INITDB_DATABASE'));

db.createUser({
    user: _getEnv('MONGO_USER'),
    pwd: _getEnv('MONGO_PASS'),
    roles: [
        {
            role: 'dbOwner',
            db: _getEnv('MONGO_INITDB_DATABASE'),
        },
    ],
});

db.createCollection('testInit');