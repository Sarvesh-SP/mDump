require("dotenv").config();
const { spawn } = require("child_process");
const path = require("path");

const ARCHIVE_PATH = path.join(
  __dirname,
  "backup",
  `${process.env.DB_NAME}.gzip`
);

//For Remote database
const remoteBackupMongo = () => {
  const child = spawn("mongodump", [
    `--host=${process.env.HOST}`,
    `--db=${process.env.DB_NAME}`,
    `--authenticationDatabase=${process.env.AUTH_DB}`,
    `--username=${process.env.USER}`,
    `--password=${process.env.PASS}`,
    `--out=${ARCHIVE_PATH}`,
    "--gzip",
  ]);

  child.stdout.on("data", (data) => {
    console.log("stdout:\n", data);
  });

  child.stderr.on("data", (data) => {
    console.log("stderr:\n", Buffer.from(data).toString());
  });

  child.on("error", (err) => {
    console.log("error:\n", error);
  });

  child.on("exit", (code, signal) => {
    if (code) console.log("Process exit with code: ", code);
    else if (signal) console.log("Process killed with signal: ", signal);
    else console.log("Backup is successfull😎✌");
  });
};

// For local database.

const localBackupMongo = () => {
  const child = spawn("mongodump", [
    `--db=${process.env.DB_NAME}`,
    `--archive=${ARCHIVE_PATH}`,
    "--gzip",
  ]);

  child.stdout.on("data", (data) => {
    console.log("stdout:\n", data);
  });

  child.stderr.on("data", (data) => {
    console.log("stderr:\n", Buffer.from(data).toString());
  });

  child.on("error", (err) => {
    console.log("error:\n", error);
  });

  child.on("exit", (code, signal) => {
    if (code) console.log("Process exit with code: ", code);
    else if (signal) console.log("Process killed with signal: ", signal);
    else console.log("Backup is successfull😎✌");
  });
};

module.exports = {
  remote: remoteBackupMongo,
  local: localBackupMongo,
};
