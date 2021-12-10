export const selectGameRooms = (state) => state.gameManager.rooms;

export const selectGameRoom = (roomId) => (state) => state.gameManager.rooms[roomId];

export const selectGameStarted = (roomId) => (state) => state.gameManager.rooms[roomId].gameStarted;

export const selectGameElapsedTime = (roomId) => (state) => state.gameManager.rooms[roomId].elapsedTime;

export const selectGameCurrentRoom = (state) => state.gameManager.currentRoom;
