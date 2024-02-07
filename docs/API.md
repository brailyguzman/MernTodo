# MernTodo API Documentation

## User Routes

### Register User

- **Endpoint**: `/users/register`
- **Method**: `POST`
- **Body**: 
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Description**: Registers a new user.

### Login User

- **Endpoint**: `/users/login`
- **Method**: `POST`
- **Body**: 
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Description**: Logs in a user and returns a JWT token.

## Todo Routes

### Add Todo

- **Endpoint**: `/todos/add`
- **Method**: `POST`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer {token goes here}"
  }
  ```
- **Body**: 
  ```json
  {
    "text": "string",
    "completed": "boolean"
  }
  ```
- **Description**: Adds a new todo for the specified user.

### Edit Todo

- **Endpoint**: `/todos/edit`
- **Method**: `PUT`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer {token goes here}"
  }
  ```
- **Body**: 
  ```json
  {
    "id": "string",
    "text": "string",
    "completed": "boolean"
  }
  ```
- **Description**: Edits a todo for the specified user.

### Remove Todo

- **Endpoint**: `/todos/remove`
- **Method**: `DELETE`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer {token goes here}"
  }
  ```
- **Body**: 
  ```json
  {
    "id": "string"
  }
  ```
- **Description**: Edits a todo for the specified user.