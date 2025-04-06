# User API Documentation

## Base URL
`http://localhost:5000/api/user`

## Endpoints

### 1. Register a User
**Endpoint:** `/register`  
**Method:** `POST`  
**Description:** Registers a new user.  
**Request Body:**
```json
{
    "name": "string",
    "email": "string",
    "password": "string"
}
```
**Response:**
- `201 Created`: User successfully registered.
- `400 Bad Request`: Validation error or missing fields.

---

### 2. Login a User
**Endpoint:** `/login`  
**Method:** `POST`  
**Description:** Authenticates a user and returns a token.  
**Request Body:**
```json
{
    "email": "string",
    "password": "string"
}
```
**Response:**
- `200 OK`: Returns a token for authenticated user.
- `401 Unauthorized`: Invalid credentials.

---

### 3. Get User Profile
**Endpoint:** `/profile`  
**Method:** `GET`  
**Description:** Retrieves the profile of the authenticated user.  
**Headers:**
```json
{
    "Authorization": "Bearer <token>"
}
```
**Response:**
- `200 OK`: Returns user profile data.
- `401 Unauthorized`: Missing or invalid token.

---

## Middleware
### `userAuthMiddleware`
- Protects routes by verifying the provided token in the `Authorization` header.
- Ensures only authenticated users can access protected endpoints.

## Notes
- Always include the `Authorization` header with a valid token for protected routes.
- Use proper error handling to manage invalid requests or expired tokens.



## Post API Documentation

### Base URL
`http://localhost:5000/api/post`

## Endpoints

### 1. Create a Post
**Endpoint:** `/createPost`  
**Method:** `POST`  
**Description:** Creates a new post.  
**Headers:**
```json
{
    "Authorization": "Bearer <token>"
}
```
**Request Body:**
```json
{
    "image": "string",
    "text": "string"
}
```
**Response:**
- `201 Created`: Post successfully created.
- `400 Bad Request`: Validation error or missing fields.
- `401 Unauthorized`: Missing or invalid token.

---

### 2. Get All Posts
**Endpoint:** `/getAllPost`  
**Method:** `GET`  
**Description:** Retrieves all posts.  
**Headers:**
```json
{
    "Authorization": "Bearer <token>"
}
```
**Response:**
- `200 OK`: Returns a list of posts.
- `401 Unauthorized`: Missing or invalid token.

---

### 3. Get One Post
**Endpoint:** `/getonePost/:userId/postid/:postId`  
**Method:** `GET`  
**Description:** Retrieves a specific post by user ID and post ID.  
**Headers:**
```json
{
    "Authorization": "Bearer <token>"
}
```
**Response:**
- `200 OK`: Returns the requested post.
- `401 Unauthorized`: Missing or invalid token.
- `404 Not Found`: Post not found.

---

### 4. Delete a Post
**Endpoint:** `/deletePost/:userId/postid/:postId`  
**Method:** `DELETE`  
**Description:** Deletes a specific post by user ID and post ID.  
**Headers:**
```json
{
    "Authorization": "Bearer <token>"
}
```
**Response:**
- `200 OK`: Post successfully deleted.
- `401 Unauthorized`: Missing or invalid token.
- `404 Not Found`: Post not found.

---

### 5. Like a Post
**Endpoint:** `/likePost/:userId/postid/:postId`  
**Method:** `POST`  
**Description:** Likes a specific post by user ID and post ID.  
**Headers:**
```json
{
    "Authorization": "Bearer <token>"
}
```
**Response:**
- `200 OK`: Post successfully liked.
- `401 Unauthorized`: Missing or invalid token.
- `404 Not Found`: Post not found.

---

### 6. Add a Comment
**Endpoint:** `/comments/:userId/postid/:postId`  
**Method:** `POST`  
**Description:** Adds a comment to a specific post by user ID and post ID.  
**Headers:**
```json
{
    "Authorization": "Bearer <token>"
}
```
**Request Body:**
```json
{
    "text": "string"
}
```
**Response:**
- `201 Created`: Comment successfully added.
- `400 Bad Request`: Validation error or missing fields.
- `401 Unauthorized`: Missing or invalid token.
- `404 Not Found`: Post not found.

---

### 7. Delete a Comment
**Endpoint:** `/deleteComment/:postId/commentid/:commentId`  
**Method:** `DELETE`  
**Description:** Deletes a specific comment by post ID and comment ID.  
**Headers:**
```json
{
    "Authorization": "Bearer <token>"
}
```
**Response:**
- `200 OK`: Comment successfully deleted.
- `401 Unauthorized`: Missing or invalid token.
- `404 Not Found`: Comment not found.

---