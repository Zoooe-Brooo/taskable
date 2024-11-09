export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('taskable-shop', 1);
    
    request.onupgradeneeded = function(e) {
      const db = request.result;
      db.createObjectStore('cart', { keyPath: '_id' });
      db.createObjectStore('favorites', { keyPath: '_id' });
    };

    request.onerror = function(e) {
      console.log('There was an error');
    };

    request.onsuccess = function(e) {
      const db = request.result;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);

      switch (method) {
        case 'put':
          store.put(object);
          resolve(object);
          break;
        case 'get':
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
          break;
        case 'delete':
          store.delete(object._id);
          resolve(true);
          break;
        default:
          console.log('No valid method');
          resolve(false);
          break;
      }

      tx.oncomplete = function() {
        db.close();
      };
    };
  });
}

export function pluralize(name, count) {
  if (count === 1) {
    return name;
  }
  return name + 's';
}
