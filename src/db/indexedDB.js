import { openDB } from 'idb';

const DATABASE_NAME = 'WeatherApp';
const STORE_NAME = 'weatherHistory';

export const initDB = async () => {
  return await openDB(DATABASE_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'city' });
      }
    },
  });
};

export const saveToDB = async (entry) => {
  const db = await initDB();
  await db.put(STORE_NAME, entry);
};

export const getFromDB = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};

export const deleteFromDB = async (cityName) => {
  const db = await initDB();
  await db.delete(STORE_NAME, cityName);
};
