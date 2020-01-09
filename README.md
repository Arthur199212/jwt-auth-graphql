# jwt-auth-graphql

### :construction: The App is under construction ...

## Technologies

### Back-End
- Node + Express + TS
- MongoDB + Mongoose
- JSON Web Tokens (JWT)

### curl

```sh
curl -v -X POST localhost:3000/refresh_token --cookie "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTEwODBmNTViMDYxYzQ2NzQ2NjU1NDIiLCJpYXQiOjE1Nzg0NzY5NDQsImV4cCI6MjE4MzI3Njk0NH0.raAXexPGRlyLOmMzAq4iusfKEuCvlfgy1BOUv8Sfn5c; HttpOnly"
```

### docker

```sh
# Check database
docker exec -it node-auth_db_1 mongo -u admin -p secret jwt-auth
db.users.find({})
```
