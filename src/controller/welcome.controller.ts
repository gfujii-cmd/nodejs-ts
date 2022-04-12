import { Router, Request, Response, NextFunction } from 'express';
import { Connection, MysqlError, Pool, PoolConnection } from 'mysql';
import { pool } from '../db/connection';
import { Person } from '../model/person.model';

const getAll = (req: Request, res: Response): void => {
    pool.getConnection((error: MysqlError, conn: PoolConnection) => {
        conn.query("select * from user", (err, result: Person[], field) => {
            conn.release();

            if (err) {
                return res.status(500).send({
                    error: 'Internal Server Error',
                    response: null
                });
            }

            res.status(200).send({
                message: 'Got all',
                response: result
            });
        });
    })
}

const getOne = (req: Request, res: Response, next: NextFunction): void => {
    pool.getConnection((error: MysqlError, conn: PoolConnection) => {
        conn.query("select * from user where id = ?",
            [req.params.id],
            (err, result: Person[], field) => {
                conn.release();
                if (err) {
                    res.status(500).send({
                        message: 'INTERNAL SERVER ERROR',
                        response: null
                    })
                }

                if (result.length === 0) {
                    res.status(404).send({
                        message: 'NOT FOUND'
                    });
                } else {
                    res.status(200).send({
                        message: 'Found',
                        response: result
                    });
                }     
            }
        );
    });
}

const add = (req: Request, res: Response) => {
    const body = req.body as Person;
    pool.getConnection((error: MysqlError, conn: PoolConnection) => {
        conn.query('insert into user values (?,?,?)',
        [body.id, body.name, body.age],
        (err, result) => {
            conn.release();
            if (err) {
                res.status(500).send({
                    message: 'INTERNAL SERVER ERROR',
                    response: null
                })
            } else {
                res.status(201).send({
                    message: 'Created',
                    response: {
                        name: body.name,
                        age: body.age
                    }
                });
            }
        });
    });
}

const del = (req: Request, res: Response) => {
    const id = req.params.id;
    pool.getConnection((err: MysqlError, conn: PoolConnection) => {
        conn.query('delete from user where id = ?', [id], (err, result) => {
            conn.release();
            if (err) {
                res.status(500).send({
                    message: 'INTERNAL SERVER ERROR',
                    response: null
                })
            } else {
                res.status(200).send({});
            }
        }
    )});
}

export default { getAll, getOne, add, del };