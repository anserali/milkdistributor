export const environment: EnvironmentType = {
  MySQLConfig: {
    host: process.env.MY_SQL_URL || "localhost",
    user: process.env.MY_SQL_USER || "root",
    password: process.env.MY_SQL_PASSWORD || "",
    database: process.env.MY_SQL_DATABASE || "MilkDistribution",
    port: Number(process.env.MY_SQL_PORT) || 3306,
  },
};

export interface EnvironmentType {
  MySQLConfig: MySQLConfigType;
}

export interface MySQLConfigType {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
}