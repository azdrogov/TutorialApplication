CRATE DATABASE "tutorials_app";
create table "Tutorials"
(
    id          uuid               not null
        constraint tutorials_pk
            primary key,
    title       varchar(256)       not null,
    description text,
    published   bool default false not null
);

create unique index tutorials_id_uindex
    on "Tutorials" (id);

