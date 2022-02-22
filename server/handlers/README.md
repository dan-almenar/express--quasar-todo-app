# /server/handlers
The */servers/handlers* folder contains two subfolders which defines all the logic for the user's and task's actions by connecting the server to the Firebase/Auth and Firebase/Firestore databases. Said folders are, respectively:
- ***/server/handlers/users*** defines all the logic to create, log in, edit and delete user's from the application. Exported functions are self explanatory and are used by the server's routes.
- ***/server/handlers/tasks*** defines all the logic to create, edit and delete tasks from the application. Exported functions are self explanatory and are used by the server's routes. This folder is kept flagged on the .gitignore list while development.
