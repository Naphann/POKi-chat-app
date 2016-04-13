# POKi-chat-app
chat application for distributed system course

##HOW TO SET UP PROJECT
### best use in vscode with intellisense

1. install node

2. to install dependencies
<br> ``` > npm install```

3. if you ever intalled gulp globally and it is outdated remove it first by<br> ```> npm uninstall --global gulp```  

4. to install typings and gulp
<br> ``` > npm install -g typings gulp-cli```

5. to use intellisense if your editor support
<br> ``` > typings install``` 

6. create database name "pokichat" and create user "pokichat" with password "pokichat"

7. to test database connection<br>
``` > gulp test-database-connection ```

8. to create database <br>
``` > gulp create-database```

9. learn about nodejs bluebirdjs expressjs (if you're doing the server) and ejs if you're doing the frontend
   <br> and learn about **socket.io** weather you do whatever end 

## TO USE GULP

1. to start server<br>```> gulp serve``` 

2. to watch sass file and compile to css<br>```> gulp sass-watch```