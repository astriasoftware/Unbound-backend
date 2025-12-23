Unbound ✨

Unbound is a dedicated platform for sharing thoughts, experiences, stories, and challenges. 
This repository contains the backend of Unbound, built with a microservice architecture, fully open-source, and licensed under MIT. 
The project is currently under construction.

About Unbound:

Unbound allows people to:
- Share personal experiences and thoughts
- Discuss problems and solutions
- Connect with others in an open, respectful environment
- Keep their privacy intact

This backend handles authentication, blog management, user profiles, and all services needed to support a scalable, modern platform.

Key Features:

- User authentication and profile management
- Create, update, and delete blog posts
- Comments and discussions
- Tagging and search functionality
- Microservice architecture for scalability
- Privacy-first, no tracking

Architecture:

The backend uses a microservice system:

unbound-backend/
 ├── services/
 │   ├── auth-service/
 │   ├── blog-service/
 │   ├── comment-service/
 │   └── user-service/
 ├── gateway/
 ├── docs/
 └── README.txt

Each service has its own API, database connections, and configuration.

Tech Stack:

- Backend: Node.js + TypeScript
- Database: MongoDB
- Auth: JWT-based authentication
- API: RESTful services
- Architecture: Microservices
- License: MIT


Contributing:

Unbound is fully open-source. Contributions are welcome:

- Add new features or services
- Improve performance
- Fix bugs
- Update documentation

Steps to contribute:
1. Fork the repo
2. Create a new branch
3. Commit your changes
4. Open a pull request

License:

This project is licensed under the MIT License. Use, modify, and distribute freely.

Note: This project is under active development. Features may change as the platform evolves.

Built for freedom:

Unbound is a space where people can share freely. No tracking. No hidden agendas. Just thoughts, experiences, and a community that cares.
