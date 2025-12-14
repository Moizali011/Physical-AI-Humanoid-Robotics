---
title: "Nodes, Topics, and Services"
sidebar_label: "Lesson 2: Nodes, Topics, and Services"
description: "Deep dive into the fundamental communication patterns in ROS 2: nodes, topics, and services"
tags: [ros2, communication, nodes, topics, services, messaging]
---

# Nodes, Topics, and Services

## Learning Objectives

By the end of this lesson, students will be able to:
- Define and distinguish between nodes, topics, and services in ROS 2
- Implement basic ROS 2 nodes with publishers and subscribers
- Create and use services for request-response communication
- Understand the publish-subscribe and client-server patterns in robotic systems
- Apply appropriate communication patterns based on the use case

## Physical AI Concept

In Physical AI systems, communication patterns mirror biological systems where information flows through specialized pathways. Nodes represent functional units (like organs or brain regions), topics enable asynchronous broadcasting of sensor data (like neural firing patterns), and services provide synchronous request-response mechanisms (like reflex actions).

Understanding these communication patterns is essential for creating embodied intelligence systems where different components need to coordinate their behavior. The publish-subscribe model allows for decoupled, scalable architectures where sensors can broadcast information to multiple consumers without knowing who they are, while services provide reliable, synchronous communication for critical operations.

## System Architecture (Textual Diagram)

```
┌─────────────────┐              ┌─────────────────┐
│   Sensor Node   │─────────────▶│  Processing     │
│                 │   /sensor    │     Node        │
│ • Publishes     │   Topic      │ • Subscribes to │
│   sensor data   │              │   sensor topic  │
└─────────────────┘              └─────────────────┘
                                        │
                                        │ /cmd_vel
                                        ▼
┌─────────────────┐              ┌─────────────────┐
│   Controller    │◀─────────────│  Command Node   │
│     Node        │   /cmd_vel   │                 │
│ • Subscribes to │   Topic      │ • Publishes     │
│   cmd_vel       │              │   velocity cmds │
└─────────────────┘              └─────────────────┘
        │                                  │
        │ /robot_control (Service)         │ /robot_control (Service)
        └──────────────────────────────────▶│
                                          │
┌─────────────────┐              ┌─────────────────┐
│   Robot Driver  │◀─────────────│   Client Node   │
│     Node        │   Response   │                 │
│ • Executes      │              │ • Makes service │
│   commands      │              │   requests      │
└─────────────────┘              └─────────────────┘
```

## Tools & Software

- **ROS 2 (Humble Hawksbill or later)**: Core middleware
- **rclpy**: Python client library
- **ros2 topic**: Command-line tool for topic inspection
- **ros2 service**: Command-line tool for service inspection
- **rqt_graph**: Visualization tool for ROS graph

## Code / Configuration Examples

### Publisher Node Example
```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String
from sensor_msgs.msg import JointState

class SensorPublisherNode(Node):
    def __init__(self):
        super().__init__('sensor_publisher')
        # Create publisher for joint states
        self.joint_pub = self.create_publisher(JointState, '/joint_states', 10)
        # Create publisher for status messages
        self.status_pub = self.create_publisher(String, '/robot_status', 10)

        # Timer to publish data periodically
        self.timer = self.create_timer(0.1, self.publish_sensor_data)
        self.get_logger().info('Sensor Publisher Node initialized')

    def publish_sensor_data(self):
        # Create and publish joint state message
        joint_msg = JointState()
        joint_msg.name = ['joint1', 'joint2', 'joint3']
        joint_msg.position = [0.1, 0.2, 0.3]
        joint_msg.velocity = [0.0, 0.0, 0.0]
        joint_msg.effort = [0.0, 0.0, 0.0]

        self.joint_pub.publish(joint_msg)
        self.get_logger().info(f'Published joint states: {joint_msg.position}')

def main(args=None):
    rclpy.init(args=args)
    node = SensorPublisherNode()

    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Subscriber Node Example
```python
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import JointState
from std_msgs.msg import String

class JointStateSubscriberNode(Node):
    def __init__(self):
        super().__init__('joint_state_subscriber')
        # Create subscription to joint states
        self.subscription = self.create_subscription(
            JointState,
            '/joint_states',
            self.joint_state_callback,
            10)
        self.subscription  # prevent unused variable warning

        # Create subscription to status messages
        self.status_subscription = self.create_subscription(
            String,
            '/robot_status',
            self.status_callback,
            10)

        self.get_logger().info('Joint State Subscriber Node initialized')

    def joint_state_callback(self, msg):
        self.get_logger().info(f'Received joint positions: {msg.position}')
        # Process the joint state data here
        self.process_joint_data(msg)

    def status_callback(self, msg):
        self.get_logger().info(f'Received robot status: {msg.data}')

    def process_joint_data(self, joint_msg):
        # Implement logic to process joint data
        # This could involve inverse kinematics, safety checks, etc.
        for i, position in enumerate(joint_msg.position):
            if abs(position) > 3.14:  # Check for potential issues
                self.get_logger().warn(f'Joint {i} position seems unusual: {position}')

def main(args=None):
    rclpy.init(args=args)
    node = JointStateSubscriberNode()

    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Service Server Example
```python
import rclpy
from rclpy.node import Node
from example_interfaces.srv import AddTwoInts

class CalculatorService(Node):
    def __init__(self):
        super().__init__('calculator_service')
        self.srv = self.create_service(AddTwoInts, 'add_two_ints', self.add_two_ints_callback)
        self.get_logger().info('Calculator Service initialized')

    def add_two_ints_callback(self, request, response):
        response.sum = request.a + request.b
        self.get_logger().info(f'Incoming request: {request.a} + {request.b} = {response.sum}')
        return response

def main(args=None):
    rclpy.init(args=args)
    node = CalculatorService()

    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Service Client Example
```python
import rclpy
from rclpy.node import Node
from example_interfaces.srv import AddTwoInts

class CalculatorClient(Node):
    def __init__(self):
        super().__init__('calculator_client')
        self.cli = self.create_client(AddTwoInts, 'add_two_ints')

        while not self.cli.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('Service not available, waiting again...')

        self.req = AddTwoInts.Request()
        self.get_logger().info('Calculator Client initialized')

    def send_request(self, a, b):
        self.req.a = a
        self.req.b = b
        self.future = self.cli.call_async(self.req)
        return self.future

def main(args=None):
    rclpy.init(args=args)
    client = CalculatorClient()

    future = client.send_request(2, 3)

    try:
        rclpy.spin_until_future_complete(client, future)
        if future.result() is not None:
            response = future.result()
            client.get_logger().info(f'Result of add_two_ints: {response.sum}')
        else:
            client.get_logger().info('Service call failed')
    except KeyboardInterrupt:
        pass
    finally:
        client.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Practical Lab / Simulation

### Exercise 1: Creating a Temperature Monitoring System

1. **Create a publisher node** that simulates temperature sensor readings:
   ```bash
   mkdir -p ~/ros2_ws/src/temp_monitor
   cd ~/ros2_ws/src/temp_monitor
   ros2 pkg create --build-type ament_python temp_publisher
   ```

2. **Implement the temperature publisher**:
   ```python
   # In temp_publisher/temp_publisher/temp_publisher.py
   import rclpy
   from rclpy.node import Node
   from std_msgs.msg import Float32
   import random

   class TemperaturePublisher(Node):
       def __init__(self):
           super().__init__('temperature_publisher')
           self.publisher = self.create_publisher(Float32, 'temperature', 10)
           self.timer = self.create_timer(1.0, self.publish_temperature)
           self.get_logger().info('Temperature Publisher started')

       def publish_temperature(self):
           msg = Float32()
           msg.data = 20.0 + random.uniform(-5.0, 5.0)  # Simulate room temperature
           self.publisher.publish(msg)
           self.get_logger().info(f'Publishing: {msg.data:.2f}°C')

   def main(args=None):
       rclpy.init(args=args)
       node = TemperaturePublisher()
       rclpy.spin(node)
       rclpy.shutdown()

   if __name__ == '__main__':
       main()
   ```

3. **Create a subscriber node** that processes temperature data:
   ```python
   # In temp_publisher/temp_publisher/temp_subscriber.py
   import rclpy
   from rclpy.node import Node
   from std_msgs.msg import Float32

   class TemperatureSubscriber(Node):
       def __init__(self):
           super().__init__('temperature_subscriber')
           self.subscription = self.create_subscription(
               Float32,
               'temperature',
               self.temp_callback,
               10)
           self.get_logger().info('Temperature Subscriber started')

       def temp_callback(self, msg):
           temp = msg.data
           if temp > 25.0:
               self.get_logger().warn(f'High temperature detected: {temp:.2f}°C')
           elif temp < 15.0:
               self.get_logger().warn(f'Low temperature detected: {temp:.2f}°C')
           else:
               self.get_logger().info(f'Normal temperature: {temp:.2f}°C')

   def main(args=None):
       rclpy.init(args=args)
       node = TemperatureSubscriber()
       rclpy.spin(node)
       rclpy.shutdown()

   if __name__ == '__main__':
       main()
   ```

4. **Test the communication**:
   ```bash
   # Terminal 1: Run the publisher
   ros2 run temp_publisher temp_publisher

   # Terminal 2: Run the subscriber
   ros2 run temp_publisher temp_subscriber

   # Terminal 3: Monitor the topic
   ros2 topic echo /temperature std_msgs/msg/Float32
   ```

### Exercise 2: Creating a Robot Control Service

1. **Create a service for robot movement commands**:
   ```bash
   # Create a custom service definition
   mkdir -p ~/ros2_ws/src/robot_control_interfaces/srv
   ```

2. **Define the service** (`robot_control_interfaces/srv/MoveRobot.srv`):
   ```
   float64 linear_x
   float64 linear_y
   float64 angular_z
   ---
   bool success
   string message
   ```

3. **Build the service**:
   ```bash
   cd ~/ros2_ws
   colcon build --packages-select robot_control_interfaces
   source install/setup.bash
   ```

## Real-World Mapping

The communication patterns learned in this lesson directly apply to real-world robotics:

- **Manufacturing Robots**: Use topics to broadcast sensor data from multiple sensors (vision, force, proximity) to processing nodes that make decisions about assembly operations
- **Autonomous Vehicles**: Employ services for critical operations like requesting permission to change lanes or activate emergency braking
- **Medical Robots**: Utilize the publish-subscribe pattern for continuous monitoring of patient vitals while using services for critical interventions
- **Agricultural Robots**: Apply topics for broadcasting GPS coordinates and sensor data while using services for requesting specific actions like planting or harvesting

## Summary

This lesson covered the fundamental communication patterns in ROS 2: nodes, topics, and services. We learned that topics enable asynchronous, decoupled communication suitable for sensor data broadcasting, while services provide synchronous request-response communication for critical operations. The practical exercises demonstrated how to implement these patterns in Python using rclpy.

Understanding when to use each communication pattern is crucial for designing efficient and robust robotic systems. In the next lesson, we'll explore Python agents with rclpy in more depth, building on these communication foundations.