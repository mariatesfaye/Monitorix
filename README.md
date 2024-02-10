Linux System Performance Monitoring Platform
This repository contains code for a web-based platform designed to monitor key Linux system performance metrics. It offers insights into network, CPU, memory, and disk usage in real-time, facilitating efficient system management.

Features
Web-based Monitoring: Utilizes Node.js with Express to create a web application for monitoring system performance metrics.

Performance Metrics: Utilizes the Linux performance monitoring tool psutil from Node.js/Express to gather essential system metrics.

RESTful API: Developed a RESTful API to expose collected performance metrics to the frontend, ensuring seamless data transfer.

Data Visualization: Employs Monitorix to display performance data through various chart types, including bar charts, line charts, and area charts, for clear and intuitive visualization.

Real-time Updates: The tool updates data visuals every 3 seconds, providing near real-time insights into system performance.

Performance Metrics Tracked
Monitorix currently tracks 8 core performance metrics:

Memory
Total Memory
Free Memory
Used Memory
Percentage Memory Utilization
CPU
Percentage CPU Utilization
Network
Bytes Sent per Second on Each Network Interface
Bytes Received per Second on Each Network Interface
Disk
Disk Read per Second for Each Mounted Disk
Disk Write per Second for Each Mounted Disk
