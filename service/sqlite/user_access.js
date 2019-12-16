import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("griddledb.db");

function createTable() {
  db.transaction(tx => {
    tx.executeSql(
      "create table if not exists user_access (user text, flags text);",
      [],
      (tx, results) => {
        //   console.log("Created user_access table");
      },
      (tx, error) => {
        //   console.log(error.message);
      }
    );
  });
}

function dropTable() {
  try {
    db.transaction(tx => {
      tx.executeSql(
        "drop table if exists user_access;",
        [],
        (tx, results) => {},
        (tx, error) => {}
      );
    });
  } catch (e) {}
}

export default {
  createTable,
  dropTable
};
