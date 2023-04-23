CREATE DATABASE classroom;
CREATE TABLE users(
    u_name VARCHAR(25),
    u_email VARCHAR(40) PRIMARY KEY,
    u_role VARCHAR(25),
    u_password VARCHAR(20)
);
CREATE TABLE course(
    c_name VARCHAR(30),
    c_dis VARCHAR(200),
    c_id VARCHAR(50) PRIMARY KEY,
    owner_e VARCHAR(40),
    CONSTRAINT fk
    FOREIGN KEY(owner_e)
    REFERENCES users(u_email)
);
CREATE TABLE assignment(
    a_d date,
    assignment VARCHAR,
    A_id VARCHAR,
    a_T time,
    c_id VARCHAR,
    a_email VARCHAR,
    due_D date,
    dis VARCHAR,
    CONSTRAINT dk
    FOREIGN KEY (a_email)
    REFERENCES  users(u_email),
    FOREIGN KEY (c_id)
    REFERENCES course(c_id),
    PRIMARY KEY (A_id)
    
);

CREATE TABLE submit(
    A_id VARCHAR,
    z VARCHAR,
    s_email VARCHAR,
    s_d DATE,
    s_t TIME,
    checkS boolean,
    CONSTRAINT sk
    FOREIGN KEY (A_id)
    REFERENCES assignment(A_id),
    FOREIGN KEY (s_email)
    REFERENCES users(u_email),
    PRIMARY KEY (A_id,s_email,s_d,s_t)
);
CREATE TABLE comment(
    cm_d date,
    cm VARCHAR,
    cm_t time,
    c_id VARCHAR,
    cm_email VARCHAR,
        CONSTRAINT dk
    FOREIGN KEY (cm_email)
    REFERENCES  users(u_email),
    FOREIGN KEY (c_id)
    REFERENCES course(c_id),
    PRIMARY KEY(cm_d,cm_t,c_id,cm_email)
);

CREATE TABLE joins(
    u_email VARCHAR,
    c_id VARCHAR,
    CONSTRAINT jnk
    FOREIGN KEY (u_email)
    REFERENCES users(u_email),
    FOREIGN KEY (c_id)
    REFERENCES course(c_id),
    PRIMARY KEY (c_id,u_email)
);

