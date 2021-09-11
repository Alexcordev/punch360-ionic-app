import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(public storage: Storage) { console.log('Your storage provider is working here !');}

// set a key/value
async set(key: string, value: any) {
  const result = await this.storage.set(key, value);
  return result;
  }

  // to get a key/value pair
  async get(key: string) {
   const result = await this.storage.get(key);
   return result;
  }


  // set a key/value object
  async setObject(key: string, object: Object) {
   const result = await this.storage.set(key, JSON.stringify(object));
   return result;

  }
  // get a key/value object
  async getObject(key: string) {
   const result = await this.storage.get(key);
   return JSON.parse(result);

  }
  // remove a single key value:
  remove(key: string) {
  this.storage.remove(key);
  }
  //  delete all data from your application:
  clear()
  {
  this.storage.clear();
  }
  }

