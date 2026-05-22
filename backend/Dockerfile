# Build Stage
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy the build configuration files
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Ensure the Maven wrapper has execution permissions
RUN chmod +x mvnw

# Copy source code and build the production jar file
COPY src src
RUN ./mvnw clean package -DskipTests

# Run Stage
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]