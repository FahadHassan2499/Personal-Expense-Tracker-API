FROM eclipse-temurin:23-jdk-alpine
WORKDIR /app

# Copy Maven wrapper and ensure it's executable
COPY mvnw .
COPY .mvn .mvn
RUN chmod +x mvnw

# Copy the pom.xml and download dependencies
COPY pom.xml .
RUN ./mvnw dependency:go-offline

# Copy the source code and build the project
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Expose port 8080
EXPOSE 8080

# Run the built jar (wildcard works if version changes)
ENTRYPOINT ["sh", "-c", "java -jar /app/target/*.jar"]
