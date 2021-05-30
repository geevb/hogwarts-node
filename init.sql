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
