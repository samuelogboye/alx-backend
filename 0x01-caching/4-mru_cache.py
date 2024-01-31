#!/usr/bin/python3
""" MRUCache module
"""
BaseCaching = __import__("base_caching").BaseCaching


class MRUCache(BaseCaching):
    """MRUCache class"""

    def __init__(self):
        """Initiliaze"""
        self.queue = []
        super().__init__()

    def put(self, key, item):
        """Add an item in the cache"""
        if key is not None and item is not None:
            if self.cache_data.get(key):
                self.queue.remove(key)
            self.queue.append(key)
            self.cache_data[key] = item
            if len(self.queue) > self.MAX_ITEMS:
                delete = self.queue.pop(-2)
                self.cache_data.pop(delete)
                print("DISCARD: {}".format(delete))

    def get(self, key):
        """Get an item by key"""
        if key is not None and key in self.cache_data:
            self.queue.remove(key)
            self.queue.append(key)
            return self.cache_data[key]
        return None
