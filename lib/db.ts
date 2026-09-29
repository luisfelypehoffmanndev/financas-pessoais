import "server-only";
import postgres from "postgres";

const globalForDb = globalThis as unknown as { sql?: postgres.Sql };

function createClient() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL não configurada. Veja o arquivo .env.example.");
  }
  
  const isLocal = url.includes("localhost") || url.includes("127.0.0.1");
  
  return postgres(url, { 
    max: 10,
    ssl: isLocal ? false : 'require' 
  });
}

export function db() {
  globalForDb.sql ??= createClient();
  return globalForDb.sql;
}
