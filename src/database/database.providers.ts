import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.POSTGRESQL_HOST,
        username: process.env.POSTGRESQL_USER,
        password: process.env.POSTGRESQL_PASSWORD,
        database: process.env.POSTGRESQL_DATABASE,
        port: parseInt(process.env.POSTGRESQL_PORT, 10),
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
        logging: true,
        ssl: {
          rejectUnauthorized: false,
        },
      });

      return dataSource.initialize();
    },
  },
];