export interface StorageAdapter {
  <State>(key: string, update: (raw?: any) => any): {
    get(raw?: any): State | Promise<State>;
    set(value: State): void;
  };
  keyArea?: any;
}
