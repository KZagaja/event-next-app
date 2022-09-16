# Basics of using the app:

1. Create .env file
2. In .env file add new entry for DATABASE_URL=/insert your connection string here/
3. DB used for this project is Postgres and as such it would be advised to use only postgres connection string for the project.
4. Use ```yarn install``` or ```yarn``` command to install all required packages.
5. Use ```npx prisma``` command to make sure that you have prisma client installed.
6. Use ```npx prisma migrate dev``` to make migrations to DB (essential for server side to work).
7. We can finally start using the app with ```yarn dev``` command. The app should open up at http://localhost:3000

# The mind behind technologies used:

1. As such this app is managing mostly server state and form to create events. I have decided to use only React Query because it's the best tool to manage server state in easy and yet fast manner.
2. There was no need to preserve input states with any additional tool that would just make the app bloated.
3. Thanks to mutations in React Query the events are being added seemlessly.
4. The tests for backend and front end are written in different libraries. ```yarn cypress``` runs frontend tests in headless cypress. ```yarn jest``` runs unit tests created in jest.