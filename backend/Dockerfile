# # Build Stage
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copy all project files directly
COPY . .

# Compile and package the executable jar using global maven
RUN mvn clean package -DskipTests

# # Run Stage
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080

# --- THE FIX: Pass environment variables straight to the Java process ---
ENTRYPOINT ["java", "-Dspring.profiles.active=${SPRING_PROFILES_ACTIVE}", "-Dspring.datasource.url=jdbc:postgresql://${PETSTORE_DB_HOST}:${PETSTORE_DB_PORT}/${PETSTORE_DB_DATABASE}?sslmode=require", "-Dspring.datasource.username=${SPRING_DATASOURCE_USERNAME}", "-Dspring.datasource.password=${SPRING_DATASOURCE_PASSWORD}", "-jar", "app.jar"]
