---
title: "Python Agents with rclpy"
sidebar_label: "Lesson 3: Python Agents with rclpy"
description: "Building intelligent agents using Python and the ROS 2 client library (rclpy)"
tags: [rclpy, python, agents, robotics, ai, intelligent-systems]
---

# Python Agents with rclpy

## Learning Objectives

By the end of this lesson, students will be able to:
- Create sophisticated Python agents using rclpy
- Implement agent behaviors with reactive and deliberative approaches
- Design agent architectures that combine multiple ROS 2 communication patterns
- Build agents that can perceive, reason, and act in physical environments
- Integrate sensor data processing with action execution in agent loops

## Physical AI Concept

In Physical AI, agents represent autonomous entities that can perceive their environment, make decisions, and take actions to achieve goals. These agents bridge the gap between abstract AI algorithms and physical robot behavior. A Python agent with rclpy implements the perception-action cycle that is fundamental to embodied intelligence.

Agent-based architectures allow for modular, scalable robotic systems where each agent can specialize in specific tasks while coordinating with other agents through ROS 2 communication patterns. This approach mirrors biological systems where specialized neural networks handle different functions but work together for overall behavior.

## System Architecture (Textual Diagram)

```
┌─────────────────────────────────────────────────────────────────┐
│                    Agent Architecture                         │
├─────────────────────────────────────────────────────────────────┤
│  Perception Layer    │     Reasoning Layer    │  Action Layer  │
│                     │                        │                │
│ ┌─────────────────┐ │ ┌────────────────────┐ │ ┌────────────┐ │
│ │ Sensor Agents   │ │ │ Decision Agents    │ │ │ Action     │ │
│ │ • Camera        │ │ │ • Path Planning    │ │ │ Executors  │ │
│ │ • LIDAR         │ │ │ • Behavior Trees   │ │ │ • Motor    │ │
│ │ • IMU           │ │ │ • State Machines   │ │ │   Control  │ │
│ │ • Joint States  │ │ │ • Learning         │ │ │ • Grippers │ │
│ └─────────────────┘ │ └────────────────────┘ │ └────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   rclpy Agent   │
                    │   Framework     │
                    │ • Node Lifecycle│
                    │ • Message       │
                    │   Processing    │
                    │ • Timer-based   │
                    │   Control       │
                    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  ROS 2 Layer    │
                    │ • Publishers    │
                    │ • Subscribers   │
                    │ • Services      │
                    │ • Actions       │
                    └─────────────────┘
```

## Tools & Software

- **ROS 2 (Humble Hawksbill or later)**: Core middleware
- **rclpy**: Python client library for ROS 2
- **rclpy.timer**: Timer-based execution for agent loops
- **rclpy.executors**: Multi-threaded execution for concurrent agent behaviors
- **rclpy.qos**: Quality of Service profiles for reliable communication

## Code / Configuration Examples

### Basic Agent Structure with rclpy
```python
import rclpy
from rclpy.node import Node
from rclpy.qos import QoSProfile, ReliabilityPolicy, DurabilityPolicy
from sensor_msgs.msg import LaserScan
from geometry_msgs.msg import Twist
from nav_msgs.msg import Odometry
import numpy as np
import time

class RobotAgent(Node):
    def __init__(self):
        super().__init__('robot_agent')

        # QoS profile for sensor data
        sensor_qos = QoSProfile(
            depth=10,
            reliability=ReliabilityPolicy.BEST_EFFORT,
            durability=DurabilityPolicy.VOLATILE
        )

        # QoS profile for control commands
        control_qos = QoSProfile(
            depth=1,
            reliability=ReliabilityPolicy.RELIABLE,
            durability=DurabilityPolicy.VOLATILE
        )

        # Perception: Subscribe to sensor data
        self.laser_sub = self.create_subscription(
            LaserScan, '/scan', self.laser_callback, sensor_qos)

        self.odom_sub = self.create_subscription(
            Odometry, '/odom', self.odom_callback, sensor_qos)

        # Action: Publisher for velocity commands
        self.cmd_vel_pub = self.create_publisher(
            Twist, '/cmd_vel', control_qos)

        # Agent state
        self.current_pose = None
        self.laser_data = None
        self.safety_distance = 0.5  # meters

        # Agent behavior timer
        self.agent_timer = self.create_timer(0.1, self.agent_loop)

        self.get_logger().info('Robot Agent initialized')

    def laser_callback(self, msg):
        """Perception: Process laser scan data"""
        self.laser_data = msg.ranges
        self.get_logger().debug(f'Received laser data with {len(msg.ranges)} points')

    def odom_callback(self, msg):
        """Perception: Process odometry data"""
        self.current_pose = {
            'x': msg.pose.pose.position.x,
            'y': msg.pose.pose.position.y,
            'theta': self.quaternion_to_yaw(msg.pose.pose.orientation)
        }

    def quaternion_to_yaw(self, orientation):
        """Convert quaternion to yaw angle"""
        import math
        siny_cosp = 2 * (orientation.w * orientation.z + orientation.x * orientation.y)
        cosy_cosp = 1 - 2 * (orientation.y * orientation.z + orientation.z * orientation.z)
        return math.atan2(siny_cosp, cosy_cosp)

    def agent_loop(self):
        """Main agent reasoning and action loop"""
        if self.laser_data is None or self.current_pose is None:
            return  # Wait for sensor data

        # Reasoning: Analyze sensor data and decide on action
        cmd_vel = self.reason_and_decide()

        # Action: Execute the decided action
        self.cmd_vel_pub.publish(cmd_vel)

    def reason_and_decide(self):
        """Reasoning: Decide on the next action based on sensor data"""
        cmd_vel = Twist()

        # Check for obstacles in front
        front_scan = self.laser_data[len(self.laser_data)//2-30:len(self.laser_data)//2+30]
        min_distance = min(front_scan) if front_scan else float('inf')

        if min_distance < self.safety_distance:
            # Obstacle detected - turn to avoid
            cmd_vel.linear.x = 0.0
            cmd_vel.angular.z = 0.5  # Turn right
            self.get_logger().info(f'Obstacle detected at {min_distance:.2f}m, turning')
        else:
            # Path clear - move forward
            cmd_vel.linear.x = 0.3
            cmd_vel.angular.z = 0.0
            self.get_logger().info(f'Path clear, moving forward. Min distance: {min_distance:.2f}m')

        return cmd_vel

def main(args=None):
    rclpy.init(args=args)
    agent = RobotAgent()

    try:
        # Use MultiThreadedExecutor to handle multiple callbacks
        executor = rclpy.executors.MultiThreadedExecutor()
        executor.add_node(agent)
        executor.spin()
    except KeyboardInterrupt:
        pass
    finally:
        agent.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Advanced Agent with Learning Component
```python
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import LaserScan
from geometry_msgs.msg import Twist
from std_msgs.msg import Float32
import numpy as np
from collections import deque

class LearningRobotAgent(Node):
    def __init__(self):
        super().__init__('learning_robot_agent')

        # Perception
        self.laser_sub = self.create_subscription(
            LaserScan, '/scan', self.laser_callback, 10)

        # Action
        self.cmd_vel_pub = self.create_publisher(Twist, '/cmd_vel', 10)

        # Learning feedback
        self.reward_pub = self.create_publisher(Float32, '/agent_reward', 10)

        # Agent state
        self.laser_data = None
        self.action_history = deque(maxlen=100)  # Keep last 100 actions
        self.state_history = deque(maxlen=100)   # Keep last 100 states
        self.learning_rate = 0.1
        self.exploration_rate = 0.2

        # Timer for agent loop
        self.agent_timer = self.create_timer(0.2, self.agent_loop)

        self.get_logger().info('Learning Robot Agent initialized')

    def laser_callback(self, msg):
        """Perception: Process laser scan data"""
        self.laser_data = np.array(msg.ranges)
        # Replace infinite values with max range
        self.laser_data = np.where(self.laser_data == float('inf'), msg.range_max, self.laser_data)

    def agent_loop(self):
        """Main agent loop with learning component"""
        if self.laser_data is None:
            return

        # Discretize the state space
        state = self.discretize_state(self.laser_data)

        # Choose action using epsilon-greedy policy
        action = self.choose_action(state)

        # Execute action
        cmd_vel = self.action_to_command(action)
        self.cmd_vel_pub.publish(cmd_vel)

        # Store state and action for learning
        self.state_history.append(state)
        self.action_history.append(action)

        # Calculate reward based on current situation
        reward = self.calculate_reward(self.laser_data, cmd_vel)

        # Publish reward for monitoring
        reward_msg = Float32()
        reward_msg.data = reward
        self.reward_pub.publish(reward_msg)

        # Learn from the experience
        if len(self.state_history) > 1:
            prev_state = self.state_history[-2]
            prev_action = self.action_history[-2]
            self.update_policy(prev_state, prev_action, reward, state)

    def discretize_state(self, laser_data):
        """Convert continuous laser data to discrete state representation"""
        # Divide laser scan into 5 sectors
        sector_size = len(laser_data) // 5
        sectors = []

        for i in range(5):
            sector_data = laser_data[i*sector_size:(i+1)*sector_size]
            # Use average distance in each sector as state feature
            avg_distance = np.mean(sector_data)
            sectors.append(1 if avg_distance > 1.0 else 0)  # 1 for safe, 0 for danger

        # Convert to integer state representation
        state = 0
        for i, val in enumerate(sectors):
            state += val * (2 ** i)

        return state

    def choose_action(self, state):
        """Choose action using epsilon-greedy policy"""
        # Exploration vs exploitation
        if np.random.random() < self.exploration_rate:
            # Explore: choose random action
            return np.random.choice([0, 1, 2, 3])  # Forward, Turn Left, Turn Right, Stop

        # Exploit: choose best known action for this state
        # This would typically use a Q-table or neural network
        # For simplicity, we'll implement a basic lookup
        action_preferences = {
            0: 2,   # If all sectors dangerous, turn right
            1: 0,   # If front is safe, go forward
            2: 1,   # If left is safe, turn left
            3: 0,   # If front and left safe, go forward
            # ... more state-action mappings
        }

        return action_preferences.get(state, 0)  # Default to forward

    def action_to_command(self, action):
        """Convert discrete action to Twist command"""
        cmd_vel = Twist()

        if action == 0:  # Forward
            cmd_vel.linear.x = 0.3
            cmd_vel.angular.z = 0.0
        elif action == 1:  # Turn Left
            cmd_vel.linear.x = 0.1
            cmd_vel.angular.z = 0.5
        elif action == 2:  # Turn Right
            cmd_vel.linear.x = 0.1
            cmd_vel.angular.z = -0.5
        elif action == 3:  # Stop
            cmd_vel.linear.x = 0.0
            cmd_vel.angular.z = 0.0

        return cmd_vel

    def calculate_reward(self, laser_data, cmd_vel):
        """Calculate reward based on current situation"""
        # Reward for moving forward safely
        front_distances = laser_data[len(laser_data)//2-20:len(laser_data)//2+20]
        min_front_distance = min(front_distances) if front_distances else float('inf')

        reward = 0

        # Positive reward for moving forward when safe
        if cmd_vel.linear.x > 0.1 and min_front_distance > 0.8:
            reward += 1.0

        # Negative reward for getting too close to obstacles
        if min_front_distance < 0.4:
            reward -= 5.0

        # Small negative reward for not moving
        if cmd_vel.linear.x < 0.05:
            reward -= 0.1

        return reward

    def update_policy(self, prev_state, prev_action, reward, current_state):
        """Update policy based on experience (simplified learning)"""
        # This would typically implement Q-learning or other RL algorithms
        # For this example, we'll just adjust exploration rate based on success
        if reward > 0:
            # Success - reduce exploration slightly
            self.exploration_rate = max(0.05, self.exploration_rate * 0.999)
        else:
            # Failure - increase exploration slightly
            self.exploration_rate = min(0.5, self.exploration_rate * 1.001)

def main(args=None):
    rclpy.init(args=args)
    agent = LearningRobotAgent()

    try:
        rclpy.spin(agent)
    except KeyboardInterrupt:
        pass
    finally:
        agent.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Practical Lab / Simulation

### Exercise 1: Creating an Obstacle Avoidance Agent

1. **Set up the simulation environment**:
   ```bash
   # Launch a robot in a Gazebo world with obstacles
   ros2 launch turtlebot3_gazebo turtlebot3_world.launch.py
   ```

2. **Create the agent package**:
   ```bash
   mkdir -p ~/ros2_ws/src/robot_agents
   cd ~/ros2_ws/src/robot_agents
   ros2 pkg create --build-type ament_python obstacle_avoidance_agent
   ```

3. **Implement the obstacle avoidance agent**:
   ```python
   # In obstacle_avoidance_agent/obstacle_avoidance_agent/agent.py
   import rclpy
   from rclpy.node import Node
   from sensor_msgs.msg import LaserScan
   from geometry_msgs.msg import Twist
   import math

   class ObstacleAvoidanceAgent(Node):
       def __init__(self):
           super().__init__('obstacle_avoidance_agent')

           # Create subscription to laser scan
           self.scan_sub = self.create_subscription(
               LaserScan, '/scan', self.scan_callback, 10)

           # Create publisher for velocity commands
           self.cmd_pub = self.create_publisher(Twist, '/cmd_vel', 10)

           # Parameters
           self.safe_distance = 0.6
           self.turn_speed = 0.8
           self.forward_speed = 0.3

           # Timer for control loop
           self.control_timer = self.create_timer(0.1, self.control_loop)

           # Robot state
           self.scan_data = None
           self.obstacle_detected = False

           self.get_logger().info('Obstacle Avoidance Agent initialized')

       def scan_callback(self, msg):
           """Process laser scan data"""
           self.scan_data = msg.ranges
           # Check for obstacles in front
           front_scan = self.scan_data[len(self.scan_data)//2-30:len(self.scan_data)//2+30]
           self.obstacle_detected = min(front_scan) < self.safe_distance if front_scan else False

       def control_loop(self):
           """Main control loop"""
           if self.scan_data is None:
               return

           cmd_vel = Twist()

           if self.obstacle_detected:
               # Turn to avoid obstacle
               cmd_vel.linear.x = 0.0
               cmd_vel.angular.z = self.turn_speed
               self.get_logger().info('Obstacle detected - turning')
           else:
               # Move forward safely
               cmd_vel.linear.x = self.forward_speed
               cmd_vel.angular.z = 0.0
               self.get_logger().info('Path clear - moving forward')

           self.cmd_pub.publish(cmd_vel)

   def main(args=None):
       rclpy.init(args=args)
       agent = ObstacleAvoidanceAgent()

       try:
           rclpy.spin(agent)
       except KeyboardInterrupt:
           pass
       finally:
           agent.destroy_node()
           rclpy.shutdown()

   if __name__ == '__main__':
       main()
   ```

4. **Test the agent**:
   ```bash
   # Terminal 1: Launch simulation
   ros2 launch turtlebot3_gazebo turtlebot3_world.launch.py

   # Terminal 2: Run the agent
   ros2 run obstacle_avoidance_agent agent

   # Terminal 3: Monitor the robot's behavior
   ros2 topic echo /cmd_vel geometry_msgs/msg/Twist
   ```

### Exercise 2: Multi-Agent Coordination

1. **Create a coordination agent** that manages multiple robot agents:
   ```python
   # In coordination_agent/coordination_agent/coordinator.py
   import rclpy
   from rclpy.node import Node
   from std_msgs.msg import String
   from geometry_msgs.msg import Twist

   class MultiAgentCoordinator(Node):
       def __init__(self):
           super().__init__('multi_agent_coordinator')

           # Publishers for different robots
           self.robot1_cmd_pub = self.create_publisher(Twist, '/robot1/cmd_vel', 10)
           self.robot2_cmd_pub = self.create_publisher(Twist, '/robot2/cmd_vel', 10)

           # Subscriptions for robot status
           self.robot1_status_sub = self.create_subscription(
               String, '/robot1/status', self.robot1_status_callback, 10)
           self.robot2_status_sub = self.create_subscription(
               String, '/robot2/status', self.robot2_status_callback, 10)

           # Timer for coordination logic
           self.coordination_timer = self.create_timer(0.5, self.coordination_logic)

           # Robot status tracking
           self.robot1_status = "idle"
           self.robot2_status = "idle"

           self.get_logger().info('Multi-Agent Coordinator initialized')

       def robot1_status_callback(self, msg):
           self.robot1_status = msg.data

       def robot2_status_callback(self, msg):
           self.robot2_status = msg.data

       def coordination_logic(self):
           """Coordinate multiple agents"""
           cmd1 = Twist()
           cmd2 = Twist()

           # Simple coordination: if robot1 is exploring, robot2 should patrol
           if "exploring" in self.robot1_status:
               cmd2.linear.x = 0.2
               cmd2.angular.z = 0.3  # Patrol pattern
           elif "patrolling" in self.robot2_status:
               cmd1.linear.x = 0.3
               cmd1.angular.z = 0.0  # Explore straight path

           self.robot1_cmd_pub.publish(cmd1)
           self.robot2_cmd_pub.publish(cmd2)

   def main(args=None):
       rclpy.init(args=args)
       coordinator = MultiAgentCoordinator()

       try:
           rclpy.spin(coordinator)
       except KeyboardInterrupt:
           pass
       finally:
           coordinator.destroy_node()
           rclpy.shutdown()

   if __name__ == '__main__':
       main()
   ```

## Real-World Mapping

Python agents with rclpy have direct applications in various real-world scenarios:

- **Warehouse Automation**: Agents coordinate multiple robots for inventory management and order fulfillment
- **Search and Rescue**: Multi-agent systems where different robots specialize in mapping, victim detection, and path clearing
- **Agricultural Robotics**: Agent-based systems for crop monitoring, harvesting, and autonomous navigation
- **Healthcare**: Robotic assistants that adapt their behavior based on patient needs and environmental conditions
- **Manufacturing**: Coordinated agents controlling different aspects of production lines with adaptive responses to changing conditions

## Summary

This lesson covered the implementation of intelligent agents using Python and rclpy. We explored how agents can perceive their environment through sensors, reason about their state and goals, and take actions to achieve those goals. The practical exercises demonstrated obstacle avoidance and multi-agent coordination, showing how these concepts apply to real-world robotic systems.

The agent-based approach provides a powerful framework for developing complex robotic behaviors that exhibit embodied intelligence. By combining perception, reasoning, and action in a coherent architecture, we can create robots that effectively interact with the physical world.