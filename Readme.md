```markdown
# Assignment Submission Portal - Backend

This is a backend system for an assignment submission portal built with Node.js, Express, and MongoDB. It supports user and admin roles, allowing users to submit assignments and admins to review them.

## Setup

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone <your-repo-url>
```

### 2. Install Dependencies

Navigate to the project directory and install the necessary dependencies:

```bash
npm install
```

### 3. Create `.env` File

Create a `.env` file in the root directory with the following content:

```env
MONGODB_URI="<your-mongodb-uri>"
JWT_SECRET="<your-jwt-secret>"
PORT=3000
```

> **Note:** Replace `<your-mongodb-uri>` with your actual MongoDB connection string and `<your-jwt-secret>` with a secret key for JWT authentication.

### 4. Start the Server

To start the server in production:

```bash
npm start
```

For development with auto-restart:

```bash
npm run dev
```

## API Endpoints

### User Endpoints

- `POST /api/users/register` - Register a new user.
- `POST /api/users/login` - User login.
- `POST /api/users/upload` - Upload an assignment (requires authentication).
- `GET /api/users/admins` - Fetch all admins (requires authentication).

### Admin Endpoints

- `POST /api/admins/register` - Register a new admin.
- `POST /api/admins/login` - Admin login.

### Assignment Endpoints

- `GET /api/assignments` - View assignments tagged to the admin (requires admin authentication).
- `POST /api/assignments/:id/accept` - Accept an assignment (requires admin authentication).
- `POST /api/assignments/:id/reject` - Reject an assignment (requires admin authentication).

## Testing with Postman

Follow the steps below to test the system with Postman.

### 1. User Registration

- **URL**: `POST http://localhost:3000/api/users/register`
- **Body**:

```json
{
  "username": "testuser",
  "password": "password123"
}
```

### 2. User Login

- **URL**: `POST http://localhost:3000/api/users/login`
- **Body**:

```json
{
  "username": "testuser",
  "password": "password123"
}
```

Save the returned token for future requests.

### 3. Admin Registration

- **URL**: `POST http://localhost:3000/api/admins/register`
- **Body**:

```json
{
  "username": "testadmin",
  "password": "adminpass123"
}
```

### 4. Admin Login

- **URL**: `POST http://localhost:3000/api/admins/login`
- **Body**:

```json
{
  "username": "testadmin",
  "password": "adminpass123"
}
```

Save the returned token for future requests.

### 5. Get Admins (Authenticated Request)

- **URL**: `GET http://localhost:3000/api/users/admins`
- **Headers**:

```plaintext
Authorization: Bearer <user_token>
```

### 6. Upload Assignment (Authenticated Request)

- **URL**: `POST http://localhost:3000/api/users/upload`
- **Headers**:

```plaintext
Authorization: Bearer <user_token>
```

- **Body**:

```json
{
  "task": "Create a simple React component",
  "admin": "<admin_user_id>"
}
```

> Replace `<admin_user_id>` with the actual ID of the admin user you created.

### 7. Get Assignments (Admin Authenticated Request)

- **URL**: `GET http://localhost:3000/api/assignments`
- **Headers**:

```plaintext
Authorization: Bearer <admin_token>
```

### 8. Accept Assignment (Admin Authenticated Request)

- **URL**: `POST http://localhost:3000/api/assignments/<assignment_id>/accept`
- **Headers**:

```plaintext
Authorization: Bearer <admin_token>
```

> Replace `<assignment_id>` with the actual assignment ID from the previous request.

### 9. Reject Assignment (Admin Authenticated Request)

- **URL**: `POST http://localhost:3000/api/assignments/<assignment_id>/reject`
- **Headers**:

```plaintext
Authorization: Bearer <admin_token>
```

> Replace `<assignment_id>` with the actual assignment ID from the previous request.

## Dummy Data

Use the following dummy data for testing:

### User

- **Username**: `testuser`
- **Password**: `password123`

### Admin

- **Username**: `testadmin`
- **Password**: `adminpass123`

### Assignment

- **Task**: `Create a simple React component`
- **Admin**: Use the ID of the admin user you created.

## Troubleshooting

If you encounter any issues:

1. Ensure MongoDB is running and accessible.
2. Check that all environment variables are correctly set in the `.env` file.
3. Verify that all dependencies are installed (`npm install`).
4. Check the console for any error messages.



```

