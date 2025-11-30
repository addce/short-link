import * as sqlite from "node:sqlite";
import {to_num, to_a_token} from './id.js'


function run_with_db(f) {
    const db = new sqlite.DatabaseSync('short-link-service.sqlite3')
    try {
        return f(db);
    } finally {
        db.close();
    }
}


run_with_db(function (db) {
    db.exec(`-- drop table if exists ShortLink;`)
    db.exec(`
        create table if not exists ShortLink
        (
            id    integer primary key autoincrement not null,
            link  text                              not null unique,
            token text                              null
        );
    `);
});


export function generate_link(link) {
    return run_with_db(function (db) {
        db.exec("begin;");

        const stat3 = db.prepare(`select id, link, token
                                  from ShortLink
                                  where link = ?`);
        const r = stat3.get(link);
        if (r) {
            db.exec('rollback;');
            return r.token;
        }

        const stat = db.prepare('insert into ShortLink(link) values (?) returning id');
        const id = stat.get(link).id;

        const token = to_a_token(id);

        const stat2 = db.prepare('update ShortLink set token=? where id=?');
        stat2.run(token, id);
        db.exec('commit;')

        console.log(db.isTransaction)
        return token
    })
}
;

export function get_link(token) {
    const id = to_num(token);
    return run_with_db(function (db) {
        const stat = db.prepare(`select id, link, token
                                 from ShortLink
                                 where id = ?`);
        return stat.get(id);
    })
}


