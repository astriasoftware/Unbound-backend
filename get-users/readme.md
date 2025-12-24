# Get User Service

**Part of the Unbound platform** – this service is a microservice dedicated to fetching user data.

**Why this exists:**

* To make future admin panel development easier
* To ensure the service can scale independently
* Follows microservice architecture for clean, modular backend design

**Available Endpoints:**

* **Get all users**
  `GET /api/users`

* **Get user by email**
  `GET /api/users/email/<email>`

* **Get user by username**
  `GET /api/users/username/<username>`

* **Get users by dynamic limit**
  `GET /api/users/<100>`

> Returns exactly the number of users requested; if not enough users exist, an error is returned.

**Notes:**

* Sensitive fields like passwords are excluded
* Fully read-only
* Designed for easy integration with other Unbound microservices

---
