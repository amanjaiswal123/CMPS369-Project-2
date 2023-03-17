const assert = require('assert');
const sqlite = require('sqlite3');

class DataStore {
    constructor() {
        // Read Configuration
        this.path = process.env.DBPATH;
        assert(this.path !== undefined, "DBPATH not specified in environment.");
    }
    async connect() {
        this.db = await new Promise((resolve, reject) => {
            const db = new sqlite.Database(this.path, (err) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    console.log('Connected to the database.');
                    resolve(db);
                }
            });
        });
    }

    async get_all_rows(table) {
        const sql = `SELECT * FROM ${table}`;
        const result = await new Promise((resolve, reject) => {
            this.db.all(sql, (err, rows) => {
                if (err) {
                    console.error("Error executing query:", err.message);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
        return result;
    }

    async find_records(table, row) {
        const query = Object.keys(row).map(key => ({ column: key, value: row[key] }));
        const conditions = query.map(({ column }) => `${column} = ?`).join(' AND ');
        const values = query.map(({ value }) => value);
        const sql = `SELECT * FROM ${table} WHERE ${conditions}`;
        const result = await new Promise((resolve, reject) => {
            this.db.all(sql, values, (err, rows) => {
                if (err) {
                    console.error("Error executing query:", err.message);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
        return result;
    }

    async create(table, data) {
        const params = Array(data.length).fill('?')
        const sql = `INSERT into ${table} (${data.map(d => d.column).join(',')}) values (${params.join(',')})`;
        console.log(sql, data.map(d => d.value));
        const result = await this.db.run(
            sql,
            data.map(d => d.value));
        return result.lastID;
    }

    /** This is limited to supporting direct match query parameters.
     *  Query is an array of column/value pairs
     */

    async add_contact(first_name, last_name, phone, email, street, city, state, zip, country, contact_by_email, contact_by_phone, contact_by_mail_num) {
        const contactData = [
            { column: 'first_name', value: first_name },
            { column: 'last_name', value: last_name },
            { column: 'phone', value: phone },
            { column: 'email', value: email },
            { column: 'street', value: street },
            { column: 'city', value: city },
            { column: 'state', value: state },
            { column: 'zip', value: zip },
            { column: 'country', value: country },
            { column: 'contact_by_email', value: contact_by_email },
            { column: 'contact_by_phone', value: contact_by_phone },
            { column: 'contact_by_mail', value: contact_by_mail_num },
        ];

        return await this.create('contacts', contactData);
    }
    async delete_row(table, id) {
        const result = await this.db.run(`DELETE FROM ${table} WHERE id = ?`, id);
        return result;
    }
}

module.exports = DataStore;