from uuid import uuid4
from collections import deque

class ChatMemory:
    def __init__(self, max_history=10):
        
        self.memory = {}  
        self.max_history = max_history

    def get_user_id(self):
       
        return str(uuid4())

    def update_memory(self, user_id, user_message, bot_response):
        
        if user_id not in self.memory:
            self.memory[user_id] = deque(maxlen=self.max_history)
        self.memory[user_id].append({"user": user_message, "bot": bot_response})

    def get_context(self, user_id):
        
        if user_id in self.memory:
            return " ".join([f"{msg['user']} {msg['bot']}" for msg in self.memory[user_id]])
        return ""

    def clear_memory(self, user_id):
        
        if user_id in self.memory:
            del self.memory[user_id]