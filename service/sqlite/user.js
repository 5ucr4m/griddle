import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("griddledb.db");

function createTable() {
  db.transaction(tx => {
    tx.executeSql(
      "create table if not exists user (token text, user text, profile text);",
      [],
      (tx, results) => {},
      (tx, error) => {}
    );
  });
}

function dropTable() {
  try {
    db.transaction(tx => {
      tx.executeSql(
        "delete from user;",
        [],
        (tx, results) => {},
        (tx, error) => {}
      );
    });
  } catch (err) {}
}

function deleteUser() {
  try {
    db.transaction(tx => {
      tx.executeSql(
        "delete from user;",
        [],
        (tx, results) => {},
        (tx, error) => {}
      );
    });
  } catch (err) {}
}

export default {
  createTable,
  dropTable,
  deleteUser
};
