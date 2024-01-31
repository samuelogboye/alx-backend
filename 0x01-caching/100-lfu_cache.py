#!/usr/bin/python3
""" Create LFUCache class that inherits from BaseCaching """
BaseCaching = __import__("base_caching").BaseCaching


class LFUCache(BaseCaching):
    """LFUCache class that inherits from BaseCaching """

    def __init__(self):
        """
        Initializes the class with an empty queue and an empty
        LFU (Least Frequently Used) dictionary.
        Calls the __init__ method of the superclass.
        """
        self.queue = []
        self.lfu = {}
        super().__init__()

    def put(self, key, item):
        """
        This function updates the cache with the given key-value pair.

        Args:
            key: The key to be inserted or updated in the cache.
            item: The value associated with the key to be inserted
            or updated in the cache.
        """
        if key and item:
            if (
                len(self.queue) >= self.MAX_ITEMS
                and not self.cache_data.get(key)
            ):
                delete = self.queue.pop(0)
                self.lfu.pop(delete)
                self.cache_data.pop(delete)
                print("DISCARD: {}".format(delete))

            if self.cache_data.get(key):
                self.queue.remove(key)
                self.lfu[key] += 1
            else:
                self.lfu[key] = 0

            insert_index = 0
            while (
                insert_index < len(self.queue)
                and not self.lfu[self.queue[insert_index]]
            ):
                insert_index += 1
            self.queue.insert(insert_index, key)
            self.cache_data[key] = item

    def get(self, key):
        """
        Get the value associated with the given key from the cache.
        If the key is not in the cache, return None.
        This function implements the Least Frequently Used (LFU)
        caching algorithm.
        """
        if key not in self.cache_data:
            return None

        self.lfu[key] += 1
        idx = self.queue.index(key)
        if idx + 1 < len(self.queue):
            next_key = self.queue[idx + 1]
            while self.lfu[key] >= self.lfu[next_key]:
                self.queue[idx], self.queue[idx + 1] = (
                    self.queue[idx + 1],
                    self.queue[idx],
                )
                idx += 1
                if idx + 1 < len(self.queue):
                    next_key = self.queue[idx + 1]
                else:
                    break

        return self.cache_data[key]
