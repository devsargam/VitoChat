from fastapi import FastAPI, WebSocket, WebSocketDisconnect

from .utils.utils import ConnectionManager

app = FastAPI()

manager = ConnectionManager()


@app.websocket("/ws/{name}")
async def websocket_endpoint(websocket: WebSocket, name: str):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(f"{name}: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"{name} left the chat")
