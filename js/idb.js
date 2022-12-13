/**
 * 基本介紹
 * https://developer.mozilla.org/zh-TW/docs/Web/API/IndexedDB_API
 * 
 * 使用IndexedDB
 * https://developer.mozilla.org/zh-TW/docs/Web/API/IndexedDB_API/Using_IndexedDB
 * 
 * 在 IndexedDB 中儲存影像與檔案
 * https://hacks.mozilla.org/2012/02/storing-images-and-files-in-indexeddb/
 */

// IndexedDB
(window.indexedDB =
  window.indexedDB ||
  window.webkitIndexedDB ||
  window.mozIndexedDB ||
  window.OIndexedDB ||
  window.msIndexedDB),
  (IDBTransaction =
    window.IDBTransaction ||
    window.webkitIDBTransaction ||
    window.OIDBTransaction ||
    window.msIDBTransaction),
  (dbVersion = 1);
