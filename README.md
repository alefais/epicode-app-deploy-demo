# Run the application deployment scenarios

Repository for the **T4-04.05 - Examples of Application Deployment** hands-on lesson.

## Scenario 1 - Running a single Docker application

```bash
cd docker-simple-app
```

1. Build the Docker image from the Dockerfile (use `-t` to tag the image with a name, the current directory `.` is the build context for the image).

```bash
docker build -t epicode/simple-server-app .
```

2. Create a running Docker container from the image, detached, and with port mapping defined between port `3000` on your host machine (where you want to receive traffic) and port `3000` within the container (that's listening for connections).

```bash
docker run -d -p 3000:3000 epicode/simple-server-app
```

When the container is running, the server is running.

You can open your browser and go to http://localhost:3000. You should see this JSON response:

```json
{
  "app": "simple-web-server",
  "version": "1.0",
  "message": "Hello from simple-web-server v1.0!"
}
```

3. Stop the container to stop the server.

## Scenario 2 - Running a composed Docker application

```bash
cd docker-composed-app
```

1. Build the image of the `Node.js` web server application from the Dockerfile (it's an extended version of the simple web server in the previous scenario).
The current directory `.` is the build context for the image, a port mapping is configured to map port `3000` on the local host to port `3000` on the Docker container, where the server is listening for connections. After that, create a running Docker container of the web server application from the custom image created, and a running Docker container for the Redis DB service from the official redis image available in the Docker Hub.

```bash
docker-compose up     // create and start node-web-server and redis-db services and the network connecting them
```

When the containers are running, the server is running.

You can open your browser and go to http://localhost:3000. You should see this JSON response:

```json
{
  "app": "simple-web-server",
  "version": "1.0",
  "message": "Hello from simple-web-server v1.0!",
  "visits": "Total visits: 1"
}
```

If you refresh the web page, you should see the visits counter increasing. It is incremented every time there is a new visit to the web page.

2. Stop the containers to stop the server.

```bash
docker-compose stop   // stop node-web-server and redis-db services

docker-compose down   // stop and remove node-web-server and redis-db services and the network connecting them
```

**Question:** What happens if you deploy again the containers? What is the new value of the visits counter?

## Scenario 3 - Running a composed Docker application with persistent storage

```bash
cd docker-composed-app-persistent-storage
```

1. Create a volume for persistent data storage.

```bash
docker volume create --name=redis-db-persistent-data
```

2. Now, follow the same steps of **Scenario 2**. The redis-db container will be attached to the volume you just created.

```bash
docker-compose up     // create and start node-web-server and redis-db services and the network connecting them

docker volume ls      // check the volume
```

As in **Scenario 2**, when the containers are running, the server is running. 

You can open your browser and go to http://localhost:3000. Refresh the web page as many times as you want, you should see the visits counter increasing accordingly.

3. Stop the containers to stop the server.

```bash
docker-compose stop   // stop node-web-server and redis-db services

docker-compose down   // stop and remove node-web-server and redis-db services and the network connecting them
```

**Question:** What happens now if you deploy again the containers? What is the new value of the visits counter?
