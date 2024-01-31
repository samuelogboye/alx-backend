#!/usr/bin/python3
""" LFUCache module
"""
from collections import defaultdict


BaseCaching = __import__("base_caching").BaseCaching


class LFUCache(BaseCaching):
    """LFUCache class"""

    def __init__(self):
        """Initiliaze"""
        self.queue = []
        self.frequency = defaultdict(
            int
        )  # Dictionary to store the frequency of each key
        self.access_count = 0  # Counter to track the overall access count

        super().__init__()

    def put(self, key, item):
        """Add an item in the cache"""
        if key is not None and item is not None:
            if self.cache_data.get(key):
                self.queue.remove(key)
            self.queue.append(key)
            self.frequency[key] += 1
            self.access_count += 1
            self.cache_data[key] = item

            if len(self.queue) > self.MAX_ITEMS:
                lfu_key = min(
                    self.queue,
                    key=lambda k: (self.frequency[k],
                                   self.access_count)
                )
                delete = self.queue.pop(self.queue.index(lfu_key))
                self.cache_data.pop(delete)
                print("DISCARD: {}".format(delete))

    def get(self, key):
        """Get an item by key"""
        if key is not None and key in self.cache_data:
            # Increment the access frequency and
            # update the overall access count
            self.frequency[key] += 1
            self.access_count += 1
            return self.cache_data[key]
        return None
