import SQLite from 'react-native-sqlite-storage';

// Open or create the SQLite database
const db = SQLite.openDatabase(
  { name: 'QuizAppDb.db', location: 'default' },
  () => { console.log("db opened sucessfully") },
  (error) => { console.error("Error opening the db:", error) }
);

// // Define SQLite tables
// export const createTables = () => {
//   db.transaction(
//     (tx) => {
//       tx.executeSql(
//         `CREATE TABLE IF NOT EXISTS QuizOverview (
//           id TEXT PRIMARY KEY,
//           name TEXT,
//           description TEXT,
//           level TEXT,
//           numberOfTasks INTEGER,
//           tags TEXT
//         )`,
//         [],
//         (_, rs) => logTableCreationSuccess('QuizOverview', rs),
//         (_, error) => { logTableCreationError('QuizOverview', error) }
//       );

//       tx.executeSql(
//         `CREATE TABLE IF NOT EXISTS QuizDetails (
//           id TEXT PRIMARY KEY,
//           name TEXT,
//           description TEXT,
//           level TEXT
//         )`,
//         [],
//         (_, rs) => logTableCreationSuccess('QuizDetails', rs),
//         (_, error) => logTableCreationError('QuizDetails', error)
//       );

//       tx.executeSql(
//         `CREATE TABLE IF NOT EXISTS Task (
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           quizOverviewId TEXT,
//           question TEXT,
//           duration INTEGER,
//           FOREIGN KEY (quizOverviewId) REFERENCES QuizOverview(id)
//         )`,
//         [],
//         (_, rs) => logTableCreationSuccess('Task', rs),
//         (_, error) => logTableCreationError('Task', error),
//       );

//       tx.executeSql(
//         `CREATE TABLE IF NOT EXISTS Answer (
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           taskId INTEGER,
//           content TEXT,
//           isCorrect INTEGER,
//           FOREIGN KEY (taskId) REFERENCES Task(id)
//         )`,
//         [],
//         (_, rs) => logTableCreationSuccess('Answer', rs),
//         (_, error) => logTableCreationError('Answer', error),
//       );
//     },
//     (_, error) => console.error('Error in createTables transaction:', error),
//     () => { }, // success
//   );
// };

// Define SQLite tables
export const createTablesPromise = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS QuizOverview (
            id TEXT PRIMARY KEY,
            name TEXT,
            description TEXT,
            level TEXT,
            numberOfTasks INTEGER,
            tags TEXT
          )`,
          [],
          (_, rs) => logTableCreationSuccess('QuizOverview', rs),
          (_, error) => { logTableCreationError('QuizOverview', error) }
        );

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS QuizDetails (
            id TEXT PRIMARY KEY,
            name TEXT,
            description TEXT,
            level TEXT
          )`,
          [],
          (_, rs) => logTableCreationSuccess('QuizDetails', rs),
          (_, error) => logTableCreationError('QuizDetails', error)
        );

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS Task (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            quizOverviewId TEXT,
            question TEXT,
            duration INTEGER,
            FOREIGN KEY (quizOverviewId) REFERENCES QuizOverview(id)
          )`,
          [],
          (_, rs) => logTableCreationSuccess('Task', rs),
          (_, error) => logTableCreationError('Task', error),
        );

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS Answer (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            taskId INTEGER,
            content TEXT,
            isCorrect INTEGER,
            FOREIGN KEY (taskId) REFERENCES Task(id)
          )`,
          [],
          (_, rs) => logTableCreationSuccess('Answer', rs),
          (_, error) => logTableCreationError('Answer', error),
        );
      },
      (_, error) => {
        console.error(`Error during table creation: ${error}`);
        reject(error);
      },
      () => {
        console.log("Tables created successfully.")
        resolve();
      }, // success
    );
  });
};

// // Insert QuizOverview data into the SQLite database
// export const insertQuizOverview = (quizOverview) => {
//   db.transaction(
//     (tx) => {
//       tx.executeSql(
//         'INSERT OR REPLACE INTO QuizOverview (id, name, description, level, numberOfTasks, tags) VALUES (?, ?, ?, ?, ?, ?)',
//         [
//           quizOverview.id,
//           quizOverview.name,
//           quizOverview.description,
//           quizOverview.level,
//           quizOverview.numberOfTasks,
//           JSON.stringify(quizOverview.tags), // Zapis tagów jako JSON w formie tekstowej
//         ],
//         (_, resultSet) => logInsertSuccess('QuizOverview', resultSet),
//         (error) => logInsertError('QuizOverview', error)
//       );
//     },
//     (_, error) => console.error('Error in insertQuizOverview transaction:', error)
//   );
// };

// Insert QuizOverview data into the SQLite database
export const insertQuizOverview = (quizOverview) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'SELECT id FROM QuizOverview WHERE id = ?',
        [quizOverview.id],
        (_, result) => {
          // QuizOverview already exists, skip insertion
          if (result.rows.length > 0) {
            console.log(`QuizOverview with id ${quizOverview.id} already exists. Skipping insertion.`);
            return;
          } else {
            tx.executeSql(
              'INSERT OR REPLACE INTO QuizOverview (id, name, description, level, numberOfTasks, tags) VALUES (?, ?, ?, ?, ?, ?)',
              [
                quizOverview.id,
                quizOverview.name,
                quizOverview.description,
                quizOverview.level,
                quizOverview.numberOfTasks,
                JSON.stringify(quizOverview.tags), // Zapis tagów jako JSON w formie tekstowej
              ],
              (_, resultSet) => logInsertSuccess('QuizOverview', resultSet),
              (error) => logInsertError('QuizOverview', error)
            );
          }
        }
      )
    },
    (_, error) => console.error('Error in insertQuizOverview transaction:', error)
  );
};

// insert it into the SQLite database
export const insertQuizOverviews = (quizOverviews) => {
  quizOverviews.forEach(quizOverview => {
    insertQuizOverview(quizOverview);
  });
};


export const insertQuizDetails = (quizDetails) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'SELECT id FROM QuizDetails WHERE id = ?',
        [quizDetails.id],
        (_, result) => {
          // QuizDetails already exists, skip insertion
          if (result.rows.length > 0) {
            console.log(`QuizDetails with id ${quizDetails.id} already exists. Skipping insertion.`);
            return;
          }
          // QuizDetails doesn't figure in the database -> save
          else {
            // Update QuizDetails table
            tx.executeSql(
              'INSERT OR REPLACE INTO QuizDetails (id, name, description, level) VALUES (?, ?, ?, ?)',
              [quizDetails.id, quizDetails.name, quizDetails.description, quizDetails.level],
              (_, rs) => logInsertSuccess('QuizDetails', rs),
              (_, error) => logInsertError('QuizDetails', error)
            );

            // Update Task table
            quizDetails.tasks.forEach((task) => {
              tx.executeSql(
                'INSERT OR REPLACE INTO Task (quizOverviewId, question, duration) VALUES (?, ?, ?)',
                [quizDetails.id, task.question, task.duration],
                (_, rs) => {
                  const taskId = rs.insertId; // Get the last inserted taskId
                  logInsertSuccess('Task', rs);

                  // Update Answer table
                  task.answers.forEach((answer) => {
                    tx.executeSql(
                      'INSERT OR REPLACE INTO Answer (taskId, content, isCorrect) VALUES (?, ?, ?)',
                      [taskId, answer.content, answer.isCorrect ? 1 : 0], // Convert boolean to integer
                      (_, rs) => logInsertSuccess('Answer', rs),
                      (_, error) => logInsertError('Answer', error)
                    );
                  });
                },
                (_, error) => logInsertError('Task', error)
              );
            });
          }
        }
      );
    },
    (_, error) => console.error('Error in fetchQuizDetails transaction:', error)
  );
};

const fetchQuizDetails = (quizDetailsId, callback) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'SELECT * FROM QuizDetails WHERE id=(?)',
        [quizDetailsId],
        (_, resultSet) => { logInsertError('QuizOverview', resultSet), callback(resultSet.rows.raw()) },
        (error) => { logInsertError('QuizOverview', error) }
      );
    },
    (_, error) => console.error('Error in insertQuizOverview transaction:', error)
  );
}

export const getQuizDetailsTasksPromise = (quizOverviewId) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'SELECT * FROM Task WHERE quizOverviewId=(?)',
          [quizOverviewId],
          (_, result) => {
            const tasks = result.rows.raw(); // : Task[]
            resolve(tasks);
          },
          (_, error) => {
            reject(error);
          }
        );
      },
      (error) => {
        reject(error);
      }
    );
  });
}

export const getTaskAnswersPromise = (taskId) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'SELECT * FROM Answer WHERE taskId=(?)',
          [taskId],
          (_, result) => {
            const tasks = result.rows.raw(); // : Answer[]
            resolve(tasks);
          },
          (_, error) => {
            reject(error);
          }
        );
      },
      (error) => {
        reject(error);
      }
    );
  });
}

export const getAllQuizOverviewsPromise = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'SELECT * FROM QuizOverview',
          [],
          (_, result) => {
            logSelectSuccess("QuizOverview", result);
            const quizOverviews = result.rows.raw().map((quizOverview) => {
              return {
                ...quizOverview,
                tags: JSON.parse(quizOverview.tags),
              };
            });
            resolve(quizOverviews);
          },
          (_, error) => {
            logSelectError("QuizOverview", error);
            reject(error);
          }
        );
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const getAllQuizOverviews = (callback) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'SELECT * FROM QuizOverview',
        [],
        (_, result) => {
          const quizOverviews = result.rows.raw().map((quizOverview) => {
            return {
              ...quizOverview,
              tags: JSON.parse(quizOverview.tags),
            };
          });
          logSelectSuccess("QuizOverview", result);
          callback(quizOverviews); // callback like setState(result);
        },
        (_, error) => {
          logSelectError("QuizOverview", error);
        }
      );
    },
    (error) => {
      reject(error);
    }
  );
};


// Pobierz wszystkie QuizDetails z bazy danych
export const fetchCompleteQuizDetails = (quizDetailsId) => {
  console.log("QuizDetails SELECT query... ")
  return new Promise(async (resolve, reject) => {
    try {
      await db.transaction(
        async (tx) => {
          tx.executeSql(
            'SELECT * FROM QuizDetails WHERE id=(?)',
            [quizDetailsId],
            async (_, result) => {
              const quizDetails = result.rows.raw()[0];
              // console.log("\tQUIZ DETAILS" + "=".repeat(10));
              // console.log(quizDetails)

              const quizDetailsTasks = await getQuizDetailsTasksPromise(quizDetailsId);
              // console.log("\tTASKS" + "=".repeat(10));
              // console.log(quizDetailsTasks)

              const tasksFormatted = await Promise.all(
                quizDetailsTasks.map(async (task) => {
                  const taskAnswers = await getTaskAnswersPromise(task.id);

                  // console.log("\tTASK ANSWERS" + "=".repeat(10));
                  // console.log(taskAnswers)

                  const formattedAnswers = taskAnswers.map((answer) => {
                    return {
                      content: answer.content,
                      isCorrect: answer.isCorrect === 1,
                    };
                  });

                  // console.log("\tANSWERS FORMATTED" + "=".repeat(10));
                  // console.log(formattedAnswers)

                  return {
                    question: task.question,
                    duration: task.duration,
                    answers: formattedAnswers,
                  };
                })
              );
              // console.log("\tTASKS FORMATTED" + "=".repeat(10));
              // console.log(tasksFormatted)

              quizDetails.tasks = tasksFormatted;
              resolve(quizDetails);
            },
            (_, error) => {
              reject(error);
            }
          );
        },
        (error) => {
          reject(error);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

// initializatoin ========================================================================

// Example usage
export const initializeDatabase = () => {
  console.log('Database initialization...');
  return new Promise((resolve, reject) => {
    createTablesPromise()
      .then(resolve())
      .catch(error => reject(error));
  })
};

// logs ==================================================================================

const logTableCreationError = (tableName, error) => {
  if (error) {
    console.error(`Error creating ${tableName} table:`, error.message);
  } else {
    console.error(`Error creating ${tableName} table`);
  }
};

const logTableCreationSuccess = (tableName, resultSet) => {
  console.log(`Table ${tableName} created successfully`);
};


const logInsertError = (tableName, error) => {
  if (error) {
    console.error(`Error inserting data into ${tableName}:`, error.message);
  } else {
    console.error(`Error inserting data into ${tableName}:`);
  }
};

const logSelectError = (tableName, error) => {
  if (error) {
    console.error(`Error inserting data into ${tableName}:`, error.message);
  } else {
    console.error(`Error inserting data into ${tableName}:`);
  }
};


const logSelectSuccess = (tableName, resultSet) => {
  console.log(`Data selected from ${tableName} successfully (result below).`);
  const result = resultSet.rows.raw();
  console.log(resultSet.rows.raw());
}

const logInsertSuccess = (tableName, resultSet) => {
  console.log(`Data inserted into ${tableName} successfully: ${resultSet}`);
}
