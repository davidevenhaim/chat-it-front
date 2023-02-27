import { io } from 'socket.io-client'
import { baseUrl } from '../api/ClientApi'

const socket = io(baseUrl);

export default socket;