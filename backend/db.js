const oracledb = require("oracledb");

async function connectDB() {
  try {
    const connection = await oracledb.getConnection({
      user: "SYSTEM",
      password: "robot2.0",
      connectString: "localhost/XE"
    });

    console.log("Connected to Oracle DB");
    return connection;

  } catch (err) {
    console.error(err);
  }
}

module.exports = connectDB; // ✅ VERY IMPORTANT