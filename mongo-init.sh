-- mongo "$MONGO_INIT_DATABASE" <<EOF
  db.createUser({
    user: $MONGO_USER,
    pwd: $MONGO_PASSWORD,
    roles: [
      {
        role: 'readWrite',
        db: $MONGO_INIT_DATABASE
      }
    ]
  })
EOF
