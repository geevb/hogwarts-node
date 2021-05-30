CREATE TYPE user_roles AS ENUM('student', 'faculty');

CREATE TABLE IF NOT EXISTS Users (
 "id"       int NOT NULL GENERATED ALWAYS AS IDENTITY,
 email      varchar(50) UNIQUE NOT NULL,
 password   varchar(200) NOT NULL,
 role       user_roles  NOT NULL,
 created_at date NOT NULL DEFAULT NOW(),
 CONSTRAINT PK_user PRIMARY KEY ( "id" )
);


-- **************************************


CREATE TABLE IF NOT EXISTS Subjects (
 "id" int NOT NULL GENERATED ALWAYS AS IDENTITY,
 name varchar(50) NOT NULL,
 CONSTRAINT PK_subject PRIMARY KEY ( "id" )
);


-- **************************************


CREATE TABLE IF NOT EXISTS Skills (
 "id"       int NOT NULL GENERATED ALWAYS AS IDENTITY,
 title      varchar(50) NOT NULL,
 subject_id int NOT NULL,
 CONSTRAINT PK_skills PRIMARY KEY ( "id" ),
 CONSTRAINT FK_Skills_Subjects FOREIGN KEY ( subject_id ) REFERENCES Subjects ( "id" ) ON UPDATE CASCADE
);

CREATE INDEX FK_subject_id_idx ON Skills (subject_id);


-- **************************************


CREATE TABLE IF NOT EXISTS Students (
 "id"    int NOT NULL GENERATED ALWAYS AS IDENTITY,
 name    varchar(50) NOT NULL,
 house   varchar(50) NOT NULL,
 user_id int UNIQUE NOT NULL,
 CONSTRAINT PK_student_idx PRIMARY KEY ( "id" ),
 CONSTRAINT FK_Students_Users FOREIGN KEY ( user_id ) REFERENCES Users ( "id" ) ON UPDATE CASCADE
);

CREATE INDEX FK_student_user_id_idx ON Students (user_id);


CREATE TABLE IF NOT EXISTS Student_Skills (
 "id"       int NOT NULL GENERATED ALWAYS AS IDENTITY,
 level      int NOT NULL DEFAULT 0 CHECK (level >= 0 AND level <= 4),
 student_id int NOT NULL,
 skill_id   int NOT NULL,
 CONSTRAINT PK_student_skills PRIMARY KEY ( "id" ),
 CONSTRAINT FK_StudentSkills_Skills FOREIGN KEY ( skill_id ) REFERENCES Skills ( "id" ) ON UPDATE CASCADE,
 CONSTRAINT FK_StudentSKills_Students FOREIGN KEY ( student_id ) REFERENCES Students ( "id" ) ON UPDATE CASCADE
);

CREATE INDEX FK_skill_id_idx ON Student_Skills (skill_id);
CREATE INDEX FK_student_id_idx ON Student_Skills (student_id);


-- **************************************


CREATE TABLE IF NOT EXISTS Faculties (
 "id"      int NOT NULL GENERATED ALWAYS AS IDENTITY,
 name    varchar(50) NOT NULL,
 user_id int UNIQUE NOT NULL,
 CONSTRAINT PK_faculty PRIMARY KEY ( "id" ),
 CONSTRAINT FK_Faculties_Users FOREIGN KEY ( user_id ) REFERENCES Users ( "id" ) ON UPDATE CASCADE
);

CREATE INDEX FK_faculties_user_id_idx ON Faculties (user_id);

CREATE TABLE IF NOT EXISTS Faculty_Subjects (
 "id"         int NOT NULL GENERATED ALWAYS AS IDENTITY,
 faculty_id int NOT NULL,
 subject_id int NOT NULL,
 CONSTRAINT PK_faculty_subjects PRIMARY KEY ( "id" ),
 CONSTRAINT FK_FacultySubjects_Faculties FOREIGN KEY ( faculty_id ) REFERENCES Faculties ( "id" ) ON UPDATE CASCADE,
 CONSTRAINT FK_FacultySubjects_Subjects FOREIGN KEY ( subject_id ) REFERENCES Subjects ( "id" ) ON UPDATE CASCADE
);

CREATE INDEX FK_faculty_id_idx ON Faculty_Subjects (faculty_id);
CREATE INDEX FK_faculty_subject_subject_id_idx ON Faculty_Subjects (subject_id);



-- ************************************** ADD MOCK DATA

--- ADD STUDENTS

insert into users (email, password, role) values ('harry.potter@email.com', '$2b$08$hv4PUlOOd83ITXddBoa.2usetZ3PK8KR4LrB1XsBRVv4LrnRYbAUa', 'student');
insert into students (name, house, user_id) values ('Harry Potter', 'Gryffindor', 1);

insert into users (email, password, role) values ('hermione.granger@email.com', '$2b$08$hv4PUlOOd83ITXddBoa.2usetZ3PK8KR4LrB1XsBRVv4LrnRYbAUa', 'student');
insert into students (name, house, user_id) values ('Hermione Granger', 'Gryffindor', 2);

insert into users (email, password, role) values ('ronald.weasley@email.com', '$2b$08$hv4PUlOOd83ITXddBoa.2usetZ3PK8KR4LrB1XsBRVv4LrnRYbAUa', 'student');
insert into students (name, house, user_id) values ('Ron Weasley', 'Gryffindor', 3);

insert into users (email, password, role) values ('draco.malfoy@email.com', '$2b$08$hv4PUlOOd83ITXddBoa.2usetZ3PK8KR4LrB1XsBRVv4LrnRYbAUa', 'student');
insert into students (name, house, user_id) values ('Draco Malfoy', 'Slytherin', 4);

insert into users (email, password, role) values ('cedric.diggory@email.com', '$2b$08$hv4PUlOOd83ITXddBoa.2usetZ3PK8KR4LrB1XsBRVv4LrnRYbAUa', 'student');
insert into students (name, house, user_id) values ('Cedric Diggory', 'Hufflepuff', 5);

insert into users (email, password, role) values ('luna.lovegood@email.com', '$2b$08$hv4PUlOOd83ITXddBoa.2usetZ3PK8KR4LrB1XsBRVv4LrnRYbAUa', 'student');
insert into students (name, house, user_id) values ('Luna Lovegood', 'Ravenclaw', 6);


--- ADD FACULTIES
insert into users (email, password, role) values ('minerva.mcgonagall@email.com', '123', 'faculty');
insert into faculties (name, user_id) values ('Minerva McGonagall', 7);

insert into users (email, password, role) values ('severus.snape@email.com', '123', 'faculty');
insert into faculties (name, user_id) values ('Severus Snape', 8);

insert into users (email, password, role) values ('remo.lupin@email.com', '123', 'faculty');
insert into faculties (name, user_id) values ('Remo Lupin', 9);


--- ADD SUBJECTS
insert into subjects (name) values ('Transfiguration');
insert into subjects (name) values ('Potions');
insert into subjects (name) values ('Defence Against the Dark Arts');


--- ADD SKILLS
insert into skills (title, subject_id) values ('Switching Spells', 1);
insert into skills (title, subject_id) values ('Vanishing Spells', 1);
insert into skills (title, subject_id) values ('Conjuring Spells', 1);

insert into skills (title, subject_id) values ('Herbology', 2);
insert into skills (title, subject_id) values ('Brewing I', 2);
insert into skills (title, subject_id) values ('Brewing II', 2);

insert into skills (title, subject_id) values ('Theory of the Dark Arts', 3);
insert into skills (title, subject_id) values ('Duelling', 3);
insert into skills (title, subject_id) values ('Fantastic Beasts', 3);


--- ADD FACULTY SUBJECTS
insert into faculty_subjects (faculty_id, subject_id) values (1, 1);

insert into faculty_subjects (faculty_id, subject_id) values (2, 2);
insert into faculty_subjects (faculty_id, subject_id) values (2, 3);

insert into faculty_subjects (faculty_id, subject_id) values (3, 3);


--- ADD STUDENT SKILLS

--- Harry
insert into student_skills (level, student_id, skill_id) values (3, 1, 1);
insert into student_skills (level, student_id, skill_id) values (3, 1, 2);
insert into student_skills (level, student_id, skill_id) values (3, 1, 3);

--- Hermione
insert into student_skills (level, student_id, skill_id) values (4, 2, 2);
insert into student_skills (level, student_id, skill_id) values (4, 2, 3);


--- Ron
insert into student_skills (level, student_id, skill_id) values (1, 3, 2);
insert into student_skills (level, student_id, skill_id) values (1, 3, 3);
insert into student_skills (level, student_id, skill_id) values (2, 3, 4);


--- Draco
insert into student_skills (level, student_id, skill_id) values (4, 4, 2);
insert into student_skills (level, student_id, skill_id) values (4, 4, 7);
insert into student_skills (level, student_id, skill_id) values (3, 4, 5);
insert into student_skills (level, student_id, skill_id) values (4, 4, 9);

--- Luna
insert into student_skills (level, student_id, skill_id) values (4, 6, 2);

