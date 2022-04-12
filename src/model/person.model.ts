import { pool } from '../db/connection'

export interface BasePerson {
    id: number;
}

export interface Person extends BasePerson {
    name: string;
    age: number;
}

