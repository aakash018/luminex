import socketClient from "socket.io-client";

const socket = socketClient(`${import.meta.env.VITE_SERVER_ENDPOINT}`);

export default socket;
