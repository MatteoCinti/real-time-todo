import { Pool } from 'pg';

const databaseUrl = process.env.POSTGRESDB_URL;

const pool = new Pool({
  connectionString: databaseUrl
});

pool.on('error', (err: any, _client: any) => {
  // eslint-disable-next-line no-console
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export const getDateTime = async () => {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT NOW() as now;');
    return res.rows[0].now;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return null;
  } finally {
    client.release();
  }
};
