# Spring Boot + React Demo Project

A full-stack CRUD application with a Spring Boot REST API backend and a React frontend.

---

## 📁 Project Structure

```
springboot-project/
├── backend/          ← Spring Boot (Java 17, Maven)
│   ├── pom.xml
│   └── src/
│       └── main/
│           ├── java/com/example/demo/
│           │   ├── DemoApplication.java
│           │   ├── controller/UserController.java
│           │   ├── model/User.java
│           │   ├── repository/UserRepository.java
│           │   └── service/UserService.java
│           └── resources/
│               └── application.properties
└── frontend/         ← React (Node.js)
    ├── package.json
    └── src/
        ├── App.js
        ├── App.css
        └── services/userService.js
```

---

## ▶️ How to Run

### Prerequisites
- Java 17+
- Maven 3.6+
- Node.js 18+

---

### 1. Run the Backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs on: **http://localhost:8080**

> By default uses **H2 in-memory database** — no setup needed!
> Access H2 console at: http://localhost:8080/h2-console
> JDBC URL: `jdbc:h2:mem:demodb` | User: `sa` | Password: (empty)

---

### 2. Run the Frontend

```bash
cd frontend
npm install        # First time only
npm start
```

Frontend runs on: **http://localhost:3000**

The `"proxy": "http://localhost:8080"` in `package.json` auto-routes `/api/*` calls to the backend.

---

## 🌐 API Endpoints

| Method | URL              | Description        |
|--------|------------------|--------------------|
| GET    | /api/users       | Get all users      |
| GET    | /api/users/{id}  | Get user by ID     |
| POST   | /api/users       | Create a user      |
| PUT    | /api/users/{id}  | Update a user      |
| DELETE | /api/users/{id}  | Delete a user      |

---

## 🗄️ Connecting to a Database

Open `backend/src/main/resources/application.properties`.

---

### 🟢 Option 1: H2 (Default — no setup)
Already configured. Works out of the box. Data resets on restart.

---

### 🔵 Option 2: MySQL

**Step 1** — Install MySQL and create a database:
```sql
CREATE DATABASE demodb;
```

**Step 2** — Comment out H2 config and uncomment MySQL in `application.properties`:
```properties
# Comment out these H2 lines:
# spring.datasource.url=jdbc:h2:mem:demodb
# spring.datasource.driver-class-name=org.h2.Driver
# ...

# Uncomment these MySQL lines:
spring.datasource.url=jdbc:mysql://localhost:3306/demodb?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.username=root
spring.datasource.password=your_password_here
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
spring.jpa.hibernate.ddl-auto=update
```

> `ddl-auto=update` means Spring will auto-create/update tables for you.

---

### 🟣 Option 3: PostgreSQL

**Step 1** — Add PostgreSQL driver to `pom.xml`:
```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

**Step 2** — Comment out H2 and set PostgreSQL config:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/demodb
spring.datasource.driver-class-name=org.postgresql.Driver
spring.datasource.username=postgres
spring.datasource.password=your_password_here
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
```

---

## 🧪 Test the API with curl

```bash
# Get all users
curl http://localhost:8080/api/users

# Create a user
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","role":"Admin"}'

# Update a user
curl -X PUT http://localhost:8080/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Smith","email":"alice@example.com","role":"Manager"}'

# Delete a user
curl -X DELETE http://localhost:8080/api/users/1
```

---

## 📦 Build for Production

```bash
# Backend: creates a runnable JAR
cd backend
mvn clean package
java -jar target/demo-0.0.1-SNAPSHOT.jar

# Frontend: creates optimized build
cd frontend
npm run build
```
