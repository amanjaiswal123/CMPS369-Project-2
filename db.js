const assert = require('assert');
const sqlite = require('sqlite-async');

class DataStore {
    constructor() {
        // Read Configuration
        this.path = process.env.DBPATH;
        assert(this.path !== undefined, "DBPATH not specified in environment.");
    }

    async connect() {
        this.db = await sqlite.open(this.path);
    }

    async find_records(table, row) {
        const query = Object.keys(row).map(key => ({ column: key, value: row[key] }));
        const result = await this.read(table, query);
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
    async read(table, query) {
        let sql = `SELECT * from ${table}`;
        if (query.length > 0) {
            sql += ` WHERE ${query.map(d => `${d.column} = ?`).join(' and ')}`
        }
        console.log(sql, query.map(d => d.value));
        return await this.db.all(
            sql, query.map(d => d.value)
        );
    }

    async update(table, data, query) {
        let sql = `UPDATE ${table} set ${data.map(d => `${d.column}=?`)} where ${query.map(d => `${d.column} = ?`).join(' and ')}`;
        const _data = data.map(d => d.value).concat(query.map(q => q.value));
        console.log(sql, _data);
        return await this.db.run(sql, _data)
    }

    async add_contact(first_name, last_name, phone, email, street, city, state, zip, country, contact_by_email, contact_by_phone) {
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
        ];

        return await this.create('contacts', contactData);
    }
    async delete_row(table, id) {
        const result = await this.db.run(`DELETE FROM ${table} WHERE id = ?`, id);
        return result;
    }
}

module.exports = DataStore;