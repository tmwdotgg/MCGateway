# MCGateway

A lightweight Node.js port forwarding utility for exposing Minecraft servers running on VPN networks to the public internet. Originally developed for and used by the TMW.GG for their reverse proxy solution.

## What is it?

MCGateway is a simple yet effective tool that creates port forwards between your public server and Minecraft servers running on a VPN network (like Wireguard or Tailscale). It handles a configurable range of ports and manages connections with built-in error handling and automatic reconnection.

## Features

- Multi-port forwarding (default range: 25566-25595)
- Connection recovery and error handling
- Works with any VPN solution (using a Wireguard based VPN network is recommended, tested on Tailscale)
- Minimal resource usage
- Zero configuration needed - just set your VPN IP and ports

## Note

This is a basic networking utility that just forwards TCP connections. It doesn't do any Minecraft-specific handling - it simply creates a tunnel between the public internet and your VPN network. While it worked well for its original purpose at TMW.GG, for larger networks consider using a proper Minecraft proxy solution like Velocity.

## License

GNU General Public License v3.0

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
