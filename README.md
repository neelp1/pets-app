# pets-app

This API will be a microservice for a example pets store website and will handle the pet data processing. pets-app will connect to a mongo database.

### Build & Run

If you want to build:
```
make build
```

Create pets network (one time):
```
make network
```

To run it:
```
make start
```

Go to `localhost:3001` to see the message. You can also do a healthcheck at `localhost:3001/healthcheck`.

### Stop the app

If you want to stop and remove the containers:
```
make down
```

### quick mongo cli commands

https://docs.mongodb.com/manual/reference/mongo-shell/

```
make mongo_exec
$ mongosh -u <username> -p <password>
> show dbs
> use <db>
> show collections
> db.<collection>.find()
```

### Upcoming features
* instructions and config for deploying to various AWS services and GCP services
* kubernetes related instructions and config
* automated testing and CI environment

### dockerhub page
Coming soon...
