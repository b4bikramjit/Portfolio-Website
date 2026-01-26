import asyncio
from datetime import datetime, timezone
import uuid
import json
import os

DB_FILE = os.path.join(os.path.dirname(__file__), "mock_db.json")

class MockCollection:
    def __init__(self, name, parent):
        self.name = name
        self.parent = parent

    def _get_data(self):
        data = self.parent._load()
        return data.get(self.name, [])

    def _set_data(self, collection_data):
        data = self.parent._load()
        data[self.name] = collection_data
        self.parent._save(data)

    async def find_one(self, query=None):
        data = self._get_data()
        if not query:
            return data[0] if data else None
        
        for doc in data:
            match = True
            for k, v in query.items():
                if doc.get(k) != v:
                    match = False
                    break
            if match:
                return doc
        return None

    def find(self, query=None, projection=None):
        class MockCursor:
            def __init__(self, data):
                self.data = data
            async def to_list(self, length):
                return self.data[:length]
        
        return MockCursor(self._get_data())

    async def insert_one(self, doc):
        data = self._get_data()
        if "_id" not in doc:
            doc["_id"] = str(uuid.uuid4())
        
        # Handle datetime serialization
        serializable_doc = doc.copy()
        for k, v in serializable_doc.items():
            if isinstance(v, datetime):
                serializable_doc[k] = v.isoformat()
            elif isinstance(v, dict):
                for sk, sv in v.items():
                    if isinstance(sv, datetime):
                        v[sk] = sv.isoformat()

        data.append(serializable_doc)
        self._set_data(data)
        
        class MockResult:
            def __init__(self, inserted_id):
                self.inserted_id = inserted_id
        return MockResult(doc["_id"])

    async def delete_many(self, query):
        self._set_data([])
        return None

class MockDB:
    def __init__(self):
        self.collections = {}

    def _load(self):
        if os.path.exists(DB_FILE):
            try:
                with open(DB_FILE, "r") as f:
                    return json.load(f)
            except:
                return {}
        return {}

    def _save(self, data):
        with open(DB_FILE, "w") as f:
            json.dump(data, f, default=str)

    def __getitem__(self, name):
        if name not in self.collections:
            self.collections[name] = MockCollection(name, self)
        return self.collections[name]

    def __getattr__(self, name):
        return self.__getitem__(name)

class MockClient:
    def __init__(self, url=None):
        self.db = MockDB()

    def __getitem__(self, name):
        return self.db

    def close(self):
        pass
