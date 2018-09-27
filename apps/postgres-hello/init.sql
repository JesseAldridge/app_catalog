CREATE TABLE hello_table (
  id    SERIAL,
  message   varchar(40) NOT NULL CHECK (message <> '')
);

INSERT INTO hello_table (message) VALUES ('Hello, postgres!');
