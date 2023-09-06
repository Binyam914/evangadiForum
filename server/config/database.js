const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();
console.log({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
//   socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
})
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database:  process.env.DB_NAME,
  connectionLimit: 10,
//   socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
});

let registration = `CREATE TABLE if not exists registration(
    user_id int auto_increment,
    user_name varchar(255) not null,
    user_email varchar(255) not null,
    user_password varchar(255) not null,
    user_otp varchar(10),
    PRIMARY KEY (user_id)
    )`;
let profile = `CREATE TABLE if not exists profile(
    user_profile_id int auto_increment,
    user_id int not null,
    first_name varchar(255) not null,
    last_name varchar(255) not null,        
    PRIMARY KEY (user_profile_id),
    FOREIGN KEY (user_id) REFERENCES registration(user_id)
)`;
let question = `CREATE TABLE if not exists question (
    question_id int auto_increment,
    question TEXT not null,
    question_description TEXT,
    question_code_block TEXT,
    tags TEXT,
    post_id VARCHAR(255) not null, 
    user_id int not null,
    PRIMARY KEY (question_id),
    UNIQUE KEY (post_id),
    FOREIGN KEY (user_id) REFERENCES registration(user_id)
)`;
let answer = `CREATE TABLE if not exists answer(
    answer_id int auto_increment,
    answer TEXT not null,
    answer_code_block TEXT,
    user_id int not null,
    question_id int not null,
    PRIMARY KEY (answer_id),
    FOREIGN KEY (user_id) REFERENCES registration(user_id),
    FOREIGN KEY (question_id) REFERENCES question(question_id)
)`;
pool.query(registration, (err, results) => {
  if (err) throw err;
  console.log("registration table created");
});
pool.query(profile, (err, results) => {
  if (err) throw err;
  console.log("profile table created");
});
pool.query(question, (err, results2) => {
  if (err) throw err;
  console.log("question table created");
});
pool.query(answer, (err, results2) => {
  if (err) throw err;
  console.log("answer table created");
});

module.exports = pool;
