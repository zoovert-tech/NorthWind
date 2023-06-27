const pg = require('pg');
var dbClient;
class PgDataBase {
    constructor() {

    }

    static OpenConnection(conConfig) {

        dbClient = new pg.Client(conConfig);
        dbClient.connect();
    }

    static CloseConnnection()
    {
        dbClient.end();
    }

    static async ExecuteQueryString(string)
    {
        const result = await dbClient.query(string);
        return result;
    }

    static async TryFindUser(userName, userPassword) {
        const q = `SELECT * FROM public."Users" Where "Login" LIKE '${userName}' AND "Password" LIKE '${userPassword}'`;
        const result = await dbClient.query(q);

        // data not found
        if (result.rows.length == 0)
            return -1;

        // Data is found
        return result.rows;
    }

    static async GetAllCategories() {
        const q = `SELECT * FROM public."categories"`;
        const result = await dbClient.query(q);

        return result.rows;
    }

    static async GetAllFromTable(name) {
        const q = `SELECT * FROM public."${name}"`;
        const result = await dbClient.query(q);

        return result.rows;
    }

    static async GetAllUsers() {
        const q = `SELECT * FROM public."Users"`;
        const result = await dbClient.query(q);

        return result.rows;
    }

    static async AddUser() {

    }
}

module.exports = PgDataBase;