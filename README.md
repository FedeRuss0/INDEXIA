
# INDEXIA - Sistema de Gestión de Biblioteca

**INDEXIA** es una aplicación web para la gestión de bibliotecas que permite registrar usuarios, gestionar libros y administrar préstamos y devoluciones. Cuenta con dos módulos principales: un **backend** desarrollado en Java con Spring Boot y un **frontend** realizado en React con TypeScript.

---

## 🛠️ Tecnologías utilizadas

### Backend
- Java 24
- Spring Boot
- Spring Data JPA
- MySQL
- Maven

### Frontend
- React
- TypeScript
- Vite
- CSS

---

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/FedeRuss0/INDEXIA.git
cd indexia
```

### 2. Configuración del backend

#### Requisitos
- JDK 24
- Maven
- MySQL

#### Crear base de datos

Conéctate a tu servidor MySQL y ejecuta:

```sql
CREATE DATABASE indexia;
```
o corre el init.sql en MySQL para inicializar la base de datos.(inserta 15 libros y 1 usuario de cada rol)

#### Configurar conexión en `application.properties`

Ubicado en `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/indexia
spring.datasource.username=TU_USUARIO
spring.datasource.password=TU_CONTRASEÑA
spring.jpa.hibernate.ddl-auto=update
```

#### Compilar y correr el backend

```bash
cd backend
./mvnw spring-boot:run
```

El backend se ejecutará en: `http://localhost:8080`

---

### 3. Configuración del frontend

#### Requisitos
- Node.js 18+
- npm o yarn

#### Instalación y ejecución

```bash
cd frontend
npm install
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

---

## 🔄 Migración a otra computadora

Para migrar a otra máquina:

1. Instalar JDK 24, Maven y MySQL.
2. Instalar Node.js.
3. Clonar este proyecto y seguir los pasos de configuración anteriores.
4. Verificar que los puertos 8080 (backend) y 5173 (frontend) estén disponibles.
5. Verificar conexión con la base de datos desde el backend.

---

## ✅ Funcionalidades principales

- Registro y autenticación de usuarios
- Gestión de roles: administrador, bibliotecario, cliente
- CRUD de libros
- Solicitud y aprobación de préstamos
- Solicitud y confirmación de devoluciones
- Paneles separados para cada tipo de usuario

---

## 📂 Estructura del proyecto

```
INDEXIA/
├── backend/       # Spring Boot app
└── frontend/      # React + TS app
```

---

## 📌 Nota final

Este proyecto es parte de un desarrollo académico y puede expandirse en el futuro con autenticación robusta, paginación, validaciones y más.

