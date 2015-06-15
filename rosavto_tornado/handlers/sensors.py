import tornado.ioloop
import tornado.web
import threading
from tornado.websocket import WebSocketHandler
from random import randint


class SensorsHandler(WebSocketHandler):
    def check_origin(self, origin):
        return True

    def open(self):
        self.guids = []
        print("WebSocket opened")

    def on_message(self, message):
        parts = message.split(' ')
        if len(parts) == 2:
            if parts[0] == 'GET_NEW':
                self.get_new(parts[1])
            if parts[0] == 'GET_OBJ':
                self.get_new(parts[1])

    def get_new(self, guids=None):
        if guids:
            self.guids = self.guids + guids.split(',')

        result = {
            'objs': []
        }
        for guid in self.guids:
            result['objs'].append({
                'id': guid,
                'attrs': [
                    {'name': 'Cod', 'value': str(randint(0, 5)), 'type': 'text'},
                    {'name': 'UpdDT', 'value': '-', 'type': 'DT'}
                ]
            })
        self.write_message(result)
        threading.Timer(10, self.get_new).start()

    def on_close(self):
        print("WebSocket closed")