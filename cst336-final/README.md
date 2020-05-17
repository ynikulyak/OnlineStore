# This is the final project for CST 336
# Getting Started
1. Clone the project from https://github.com/JaredAtCSUMB/cst336-final.git
2. Navigate to the root of the project and run `npm i` to install all necessary packages
3. Be sure to run all the db scripts in the `mysql` folder to ensure you have all necessary tables
4. Run `nodemon app.js` (assuming you have nodemon installed. if not, you really should ;))
5. Make sure the `isLocal` flag is set to `true` (in both the `app.js` and `db.js` files) when doing local development
6. Test the login credentials (username: `admin` password: `secret`)
# Dev Notes
* Be sure to add any db scripts as new tables are created!
# Deploying
* Important Note: Make sure the `isLocal` flag is set to `false`
