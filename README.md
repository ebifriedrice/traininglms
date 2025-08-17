1. run the mongo instance in server or host one somewhere
   sudo docker compose up -d
   (inside backend folder)
2. npm install inside backend folder
3. copy the .env.example to .env file
4. npm run build
5. create admin user with (node dist/seed/seedAdmin.js)
6. npm run dev (or serve but both do same)
7. in the client, you can see a graphql endpoint with jwt setup, point to http://localhost:4000/graphql provide the jwt as bearer token, you can use login query to get it in client for testing

frontend under construction
previous template based one was very broken
migrating to vite and react very soon
build is broken for frontend currently for that reason
will take few hours