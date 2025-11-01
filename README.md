# 💰 Personal Expense Tracker API

A simple yet scalable **Spring Boot REST API** that allows users to manage their personal expenses — including creating, viewing, updating, and deleting expense entries.  
The project demonstrates core **Spring Boot**, **JPA/Hibernate**, **RESTful design**, and **validation best practices**, making it ideal for portfolio and interview demonstrations.

---

## 🚀 Features

✅ Create new expenses (title, category, amount, date, description)  
✅ View all saved expenses  
✅ Retrieve a single expense by ID  
✅ Update existing expense details  
✅ Delete an expense  
✅ In-memory H2 database for quick testing  
✅ Integrated Swagger UI for API documentation  
✅ Built using clean layered architecture (Controller → Service → Repository)

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-------------|
| Backend Framework | Spring Boot 3.x |
| Language | Java 17+ |
| Database | H2 (In-memory) |
| ORM | Spring Data JPA (Hibernate) |
| Validation | Jakarta Validation |
| API Documentation | Swagger / OpenAPI (springdoc) |
| Build Tool | Maven |

---

## 🧩 Project Structure

```
src/main/java/com/example/expensetracker
│
├── controller
│   └── ExpenseController.java        # REST endpoints
│
├── model
│   └── Expense.java                  # Entity class
│
├── repository
│   └── ExpenseRepository.java        # JPA repository
│
├── service
│   └── ExpenseService.java           # Business logic
│
└── ExpenseTrackerApplication.java    # Main application entry point
```

---

## ⚙️ Getting Started

### 1️⃣ Prerequisites
Make sure you have:
- Java 17+ installed  
- Maven installed (`mvn -v` to check)
- An IDE (IntelliJ / VS Code / Eclipse)

---

### 2️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/expense-tracker-api.git
cd expense-tracker-api
```

---

### 3️⃣ Build and Run the Application

```bash
mvn spring-boot:run
```

The server will start on:  
👉 `http://localhost:8080`

---

### 4️⃣ Test the Endpoints

#### Using Swagger UI
Open your browser and go to:  
👉 [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

#### Or use cURL / Postman

**Create Expense**
```bash
POST /api/expenses
Content-Type: application/json

{
  "title": "Lunch",
  "amount": 250.0,
  "category": "Food",
  "description": "Lunch at cafe"
}
```

**Get All Expenses**
```bash
GET /api/expenses
```

**Get Expense by ID**
```bash
GET /api/expenses/{id}
```

**Update Expense**
```bash
PUT /api/expenses/{id}
```

**Delete Expense**
```bash
DELETE /api/expenses/{id}
```

---

## 🧪 Database Access (H2 Console)

Visit: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)

| Property | Value |
|-----------|--------|
| JDBC URL | `jdbc:h2:mem:testdb` |
| User Name | `sa` |
| Password | *(leave blank)* |

---

## 🧰 Configuration (application.properties)

```properties
spring.application.name=Expense Tracker API
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.h2.console.enabled=true

spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.properties.hibernate.format_sql=true

# Swagger UI
springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.path=/swagger-ui.html
```

---

## 🧑‍💻 API Design Principles

- RESTful URI naming conventions  
- Proper HTTP methods (`GET`, `POST`, `PUT`, `DELETE`)  
- Input validation using `@NotBlank`, `@Positive`, etc.  
- Consistent response structure  
- Separation of concerns across layers

---

## 🌟 Future Enhancements (Next Level Ideas)

- Add **User Authentication (JWT)** — each user manages their own expenses  
- Add **Pagination & Sorting** for `/api/expenses`  
- Connect to **MySQL or PostgreSQL** for persistence  
- Add **Category-wise analytics API**  
- Deploy on **Render / Railway / AWS Elastic Beanstalk**





## 👤 Author

**Fahad Hassan**  
📧 fahadhassan2499@gmail.com
💻 Passionate about Machine Learning, Backend Engineering, and Data-driven Systems.
