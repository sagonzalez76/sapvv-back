import app from "./app.js";
import { sequelize } from "./database/database.js";

async function main() {
  const port = 8000
  await sequelize.sync({force: false});
  app.listen(port);
  console.log(`Server on port ${port}`);
}

main();
