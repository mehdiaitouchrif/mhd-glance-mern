# MHD GLANCE eCommerce Platform

> Complete eCommerce platform. Uses a Node.js with Express & MongoDB backend and a React redux frontend.

![screenshot](https://repository-images.githubusercontent.com/313355256/89b08a00-2c31-11eb-859d-3566a213d4a3)

## Features

- Full featured shopping cart
- Product search & advanced filtering
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Cancel orders feature
- Mark orders as delivered
- Database seeder (products, orders)

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
JWT_COOKIE_EXPIRE=30

IMAGE_SIZE=1048576
FILE_UPLOAD_PATH=./public/uploads
```

### Install Dependencies (frontend & backend)

```
cd backend
npm install
cd frontend
npm install
```

### Run

```
cd backend
npm run server
cd frontend
npm start

# Run backend only
npm run server
```

### Seed Database

Destroy database products & orders using the following command

```
# Destroy data
node seeder -d
```

```
Sample User Logins

admin@gmail.com (Admin)
123456

user@gmail.com (Customer)
123456

```
