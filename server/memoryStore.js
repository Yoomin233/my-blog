function MemoryStore () {
  this.store = {};
};
MemoryStore.prototype.set = function(id, val) {
  this.store[id] = val;
};
MemoryStore.prototype.get = function(id) {
  return this.store[id];
};

module.exports = MemoryStore;