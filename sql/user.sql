create table sys_user
(
    id         varchar(100)                       not null
        primary key,
    username   varchar(255)                       null,
    phone      varchar(255)                       null,
    email      varchar(255)                       null,
    password   varchar(255)                       null,
    createTime datetime default CURRENT_TIMESTAMP null,
    updateTime datetime default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP
);


