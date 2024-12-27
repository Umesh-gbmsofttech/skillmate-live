# Use an official OpenJDK runtime as the base image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven wrapper and source files into the container
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

# Grant execute permissions to the Maven wrapper
RUN chmod +x mvnw

# Run Maven to package the application
RUN ./mvnw clean package -DskipTests

# Copy the JAR file to the working directory
RUN cp target/*.jar app.jar

# Expose the port your Spring Boot app runs on (default: 8080)
EXPOSE 8080

# Define the command to run your application
ENTRYPOINT ["java", "-jar", "app.jar"]
