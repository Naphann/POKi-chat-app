# POKi-chat-app
chat application for distributed system course

##HOW TO SET UP PROJECT
### best use in vscode with intellisense

1. install node

2. to install dependencies
```bash
npm install
 ```

3. if you ever intalled gulp globally and it is outdated remove it first by
```bash
npm uninstall --global gulp
```  

4. to install typings and gulp
```bash
npm install -g typings gulp-cli
 ```

5. to use intellisense if your editor support
```bash
typings install
 ```

6. create database name "pokichat" and create user "pokichat" with password "pokichat"

7. to test database connection
```bash
gulp test-database-connection
```

8. to create database
```bash
gulp create-database
```

9. seed the database
```bash
gulp seed-database
```

10. to create user
```bash
node genuser.js --username=<username> --password=<password>
```

11. learn about nodejs bluebirdjs expressjs (if you're doing the server) and ejs if you're doing the frontend
   <br> and learn about **socket.io** weather you do whatever end

## TO USE GULP

1. to start server at port 3000
```bash
gulp serve
```
##### Arguments
+ **--master**
	* Fixed server type to master
+ **--port** *{port}*
	* Define server port


2. to watch sass file and compile to css
```bash
gulp sass-watch
```

## Socket.io NOTES

- all data sent for each event must be in **JSON format**.