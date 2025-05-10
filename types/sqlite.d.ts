declare module 'react-native-sqlite-storage' {
  export interface ResultSet {
    rows: {
      _array: any[];
      item: (index: number) => any;
      length: number;
    };
  }

  export interface SQLiteDatabase {
    executeSql(
      sql: string,
      params?: any[]
    ): Promise<ResultSet[]>;
  }

  export function openDatabase(config: {
    name: string;
    location?: string;
    createFromLocation?: string;
  }): SQLiteDatabase;

  export function DEBUG(debug: boolean): void;
  export function enablePromise(enable: boolean): void;
}
