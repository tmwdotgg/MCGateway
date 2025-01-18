const net = require('net');

// Configuration
const hostIP = '100.100.1.1';  // The internal VPN/private IP address of your Minecraft server
                               // Examples: 
                               // - Wireguard: Usually starts with 10.0.0.x
                               // - Tailscale: Usually starts with 100.x.x.x
                               // - LAN: Could be 192.168.x.x or 10.0.x.x

const hostIPPortRange = {
    start: 25566,              // First port in range to forward
                               // Default Minecraft port is 25565, so we start at 25566
                               // to avoid conflicts with the default port
    
    end: 25595                 // Last port in range to forward
                               // This gives us 30 ports (25566-25595) which can
                               // support 30 different Minecraft server instances
};

const outgoingIP = '0.0.0.0';  // The IP address to listen on for incoming connections
                               // 0.0.0.0 means "listen on all available network interfaces"
                               // You could specify a specific IP if you want to restrict
                               // which network interface accepts connections

// Create a server for each port in our range
for (let port = hostIPPortRange.start; port <= hostIPPortRange.end; port++) {
    // Create a new TCP server for this port
    const server = net.createServer((clientSocket) => {
        // When a client connects, create a connection to the target Minecraft server
        const targetSocket = net.createConnection(port, hostIP);

        // Error handling for the connection to the Minecraft server
        targetSocket.on('error', (err) => {
            if (err.code === 'ECONNREFUSED') {
                // This happens when there's no Minecraft server listening on this port
                console.log(`Connection refused on ${hostIP}:${port}. Ignoring and continuing...`);
            } else {
                // Log any other errors that might occur
                console.error(`Error on ${hostIP}:${port} - ${err.message}`);
            }
            // Close the client connection gracefully when we can't reach the target
            clientSocket.end();
        });

        // Forward data from client to Minecraft server
        clientSocket.on('data', (data) => {
            targetSocket.write(data);
        });

        // Forward data from Minecraft server to client
        targetSocket.on('data', (data) => {
            clientSocket.write(data);
        });

        // Handle client disconnection
        clientSocket.on('end', () => {
            targetSocket.end();  // Close the connection to Minecraft server
        });

        // Handle Minecraft server disconnection
        targetSocket.on('end', () => {
            clientSocket.end();  // Close the client connection
        });
    });

    // Start listening on this port
    server.listen(port, outgoingIP, () => {
        console.log(`Server listening on ${outgoingIP}:${port}`);
    });
}
