create table user(
    user_id int not null auto_increment,
    username varchar(20),
    displayname varchar(20),
    password varchar(60),
    primary key(user_id)
);

create table room(
    room_id int not null auto_increment,
    roomname varchar(20),
    primary key(room_id)
);

create table message(
    message_id int not null auto_increment,
    content text,
    sender_id int not null,
    room_id int not null,
    time datetime not null,
    primary key (message_id),
    foreign key (sender_id) references user (user_id),
    foreign key (room_id) references room (room_id)
);

create table user_room(
    user_id int not null,
    room_id int not null,
    last_message_id int not null,
    primary key (user_id, room_id),
    foreign key (user_id) references user (user_id),
    foreign key (room_id) references room (room_id)
);

