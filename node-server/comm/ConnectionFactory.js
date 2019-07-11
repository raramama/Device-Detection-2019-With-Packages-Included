module.exports = class ConnectionFactory {
  constructor(connectionType, connectionPort) {
    this.connectionType = connectionType;
    this.server = null;
    this.connectionPort = connectionPort;
  }

  /**
   *  Creates a server based on a connection type & port
   */
  createConnection() {
    // import * as types from './types'; // Import connection types

    switch (this.connectionType) {
      // case types.WEBSOCKETS:
      case 'WEBSOCKETS':
        const io = require('socket.io');
        this.server = io.listen(this.connectionPort);
        break;
    }
  }
};
