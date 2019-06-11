from django.conf import settings

from channels.generic.websocket import AsyncJsonWebsocketConsumer

from .exceptions import ClientError
from .utils import get_patient_or_error, get_default_user
import json
import random


class MonitorConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        """
        Called when the websocket is handshaking as part of initial connection.
        """
        # Are they logged in?
        if self.scope["user"].is_anonymous:
            self.scope["user"] = await get_default_user()
            # Reject the connection
            # await self.close()
            await self.accept()
        else:
            # Accept the connection
            await self.accept()
        # Store which rooms the user has joined on this connection
        self.patients = set()

    async def receive_json(self, content):
        """
        Called when we get a text frame. Channels will JSON-decode the payload
        for us and pass it as the first argument.
        """
        # Messages will have a "command" key we can switch on
        if isinstance(content, str):
            content = json.loads(content)
        print(content)
        command = content.get("command", None)
        try:
            if command == "join":
                # Make them join the room
                await self.join_room(content["patient"])
            elif command == "leave":
                # Leave the room
                await self.leave_room(content["patient"])
            elif command == "send":
                if content.get('patient'):
                    await self.send_room(content["patient"], content["message"])
        except ClientError as e:
            # Catch any errors and send it back
            await self.send_json({"error": e.code})

    async def disconnect(self, code):
        """
        Called when the WebSocket closes for any reason.
        """
        # Leave all the rooms we are still in
        for patient_id in list(self.patients):
            try:
                await self.leave_room(patient_id)
            except ClientError:
                pass

    # Command helper methods called by receive_json

    async def join_room(self, patient_id):
        """
        Called by receive_json when someone sent a join command.
        """
        # The logged-in user is in our scope thanks to the authentication ASGI middleware
        patient = await get_patient_or_error(patient_id, self.scope["user"])
        # Send a join message if it's turned on
        if settings.NOTIFY_USERS_ON_ENTER_OR_LEAVE_ROOMS:
            await self.channel_layer.group_send(
                patient.group_name,
                {
                    "type": "chat.join",
                    "patient_id": patient_id,
                    "username": self.scope["user"].username,
                }
            )
        # Store that we're in the room
        self.patients.add(patient_id)
        # Add them to the group so they get room messages
        await self.channel_layer.group_add(
            patient.group_name,
            self.channel_name,
        )
        # Instruct their client to finish opening the room
        await self.send_json({
            "type" : "join",
            "join": str(patient.id),
            "patient": patient.name,
        })

    async def leave_room(self, patient_id):
        """
        Called by receive_json when someone sent a leave command.
        """
        # The logged-in user is in our scope thanks to the authentication ASGI middleware
        patient = await get_patient_or_error(patient_id, self.scope["user"])
        # Send a leave message if it's turned on
        if settings.NOTIFY_USERS_ON_ENTER_OR_LEAVE_ROOMS:
            await self.channel_layer.group_send(
                patient.group_name,
                {
                    "type": "chat.leave",
                    "patient_id": patient_id,
                    "username": self.scope["user"].username,
                }
            )
        # Remove that we're in the room
        self.patients.discard(patient_id)
        # Remove them from the group so they no longer get room messages
        await self.channel_layer.group_discard(
            patient.group_name,
            self.channel_name,
        )
        # Instruct their client to finish closing the room
        await self.send_json({
            "type" : "leave",
            "leave": str(patient.id),
        })

    async def send_room(self, patient_id, message):
        """
        Called by receive_json when someone sends a message to a room.
        """
        # Check they are in this room
        # if patient_id not in self.patients:
        # raise ClientError("ACCESS_DENIED")
        # Get the room and send to the group about it
        room = await get_patient_or_error(patient_id, self.scope["user"])
        for i in range(50):
            await self.channel_layer.group_send(
                room.group_name,
                {
                    "type": "chat.message",
                    "patient_id": patient_id,
                    "username": self.scope["user"].username,
                    "message": {
                            "temp": random.randint(25, 40),
                            "heartrate": random.randint(100, 200),
                            "emg": random.randint(1, 200)
                    },
                }
            )
        # await self.channel_layer.group_send(
        #     room.group_name,
        #     {
        #         "type": "chat.message",
        #         "patient_id": patient_id,
        #         "username": self.scope["user"].username,
        #         "message": message,
        #     }
        # )

    async def chat_join(self, event):
        """
        Called when someone has joined our chat.
        """
        # Send a message down to the client
        await self.send_json(
            {
                "msg_type": settings.MSG_TYPE_ENTER,
                "type" : "join",
                "room": event["patient_id"],
                "username": event["username"],
            },
        )

    async def chat_leave(self, event):
        """
        Called when someone has left our chat.
        """
        # Send a message down to the client
        await self.send_json(
            {
                "msg_type": settings.MSG_TYPE_LEAVE,
                "type" : "leave",
                "room": event["patient_id"],
                "username": event["username"],
            },
        )

    async def chat_message(self, event):
        """
        Called when someone has messaged our chat.
        """
        # Send a message down to the client
        await self.send_json(
            {
                "msg_type": settings.MSG_TYPE_MESSAGE,
                "type" : "message",
                "room": event["patient_id"],
                "username": event["username"],
                "message": event["message"],
            },
        )
