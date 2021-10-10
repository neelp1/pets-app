# pets-app
This API will be a microservice for a example pets store website and will handle the pet data processing. pets-app will connect to a mongo database.

### Build & Run
If you want to build locally:
```
docker build -t neelypatel/pets-app .
```
or you can pull the latest image:
```
docker pull neelypatel/pets-app
```
To run it:
```
docker run -d --name pets-app -p 3000:3000 neelypatel/pets-app
```
Go to `localhost:3001` to see the message. You can also do a healthcheck at `localhost:3001/healthcheck`.

### Docker Compose
Start the app and the database:
```
docker-compose up -d --build
```
shut it all down:
```
docker-compose down
```

### quick mongo cli commands

https://docs.mongodb.com/manual/reference/mongo-shell/

```
docker exec -it pets-app-db bash
$ mongo
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
