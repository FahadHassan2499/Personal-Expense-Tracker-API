# Use an official OpenJDK image
FROM eclipse-temurin:23-jdk-alpine

# Set the working directory
WORKDIR /app

# Copy the Maven wrapper and pom.xml files
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download dependencies (so future builds are faster)
RUN ./mvnw dependency:go-offline

# Copy source code and build the application
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Expose port 8080 for Render
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "target/expense-tracker-0.0.1-SNAPSHOT.jar"]
