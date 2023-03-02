---
id: port-config
title: Port Configuration Details For Sentry & Validator Nodes
sidebar_label: Port Configuration
description: How to configure ports for Sentry and validator nodes
keywords:
  - wiki
  - polygon
  - matic
  - sentry
  - validator
  - port
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Here are a few instructions on how to configure ports for Sentry and Validator nodes.

## For Sentry nodes
- **Port 22**: Opening this to the public is not a good idea as the default SSH port 22 is prone to attacks. It is better to secure it by allowing it only in a closed network (VPN). 
- **Port 30303**: To be opened to the public for Bor p2p discovery. 
- **Port 26656**: To be opened to the public for Heimdall/Tendermint p2p discovery. 
- **Port 26660**: Prometheus port for Tendermint/Heimdall. Not required to be opened to the public. Only allow for the monitoring systems (Prometheus/Datadog). 
- **Port 7071**: Metric port for Bor. Only needs to be opened for the Monitoring system. 
- **Ports 8545, 8546, 1317**: Can be opened for Bor HTTP RPC, Bor WS RPC, and Heimdall API respectively; but only if really necessary. 

## For Validator nodes
- **Port 22**: Opening this to the public is not a good idea as the default SSH port 22 is prone to attacks. It is better to secure it by allowing it only in a closed network (VPN).
- **Port 30303**: To be opened to only Sentry to which the validator is connected for Bor p2p discovery.
- **Port 26656**: To be opened to only Sentry to which the validator is connected for Heimdall/Tendermint p2p discovery.
- **Port 26660**: Prometheus port for Tendermint/Heimdall. Not required to be opened to the public. Only allow for the monitoring systems (Prometheus/Datadog).
- **Port 7071**: Metric port for Bor. Only needs to be opened for the monitoring system.
