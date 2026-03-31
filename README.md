# Run the application deployment scenarios

Repository for the **T4-04.05 - Examples of Application Deployment** hands-on lesson.

## Scenario 1 - Running a single Docker application

```bash
cd docker-simple-app
```

1. Build the Docker image from the Dockerfile (use ```-t``` to tag the image with a name, the current directory ```.``` is the build context for the image).

```bash
docker build -t epicode/simple-server-app .
```

2. Create a running Docker container from the image, detached, and with port mapping defined between port 3000 on your host machine (where you want to receive traffic) and port 3000 within the container (that's listening for connections).

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

Stop the container to stop the server.
