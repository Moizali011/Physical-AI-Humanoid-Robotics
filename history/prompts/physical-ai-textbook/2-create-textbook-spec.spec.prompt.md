---
id: 2
title: Create Physical AI Textbook Spec
stage: spec
date: 2025-12-14
surface: agent
model: Claude Opus 4.5
feature: physical-ai-textbook
branch: master
user: user
command: /sp.specify
labels: [specification, textbook, physical-ai, humanoid-robotics]
links:
  spec: specs/physical-ai-textbook/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/physical-ai-textbook/spec.md
 - specs/physical-ai-textbook/checklists/requirements.md
tests:
 - none
---

## Prompt

Using the constitution and the provided course document, create a FULL SPECIFICATION for the textbook "Physical AI & Humanoid Robotics".

Mandatory Inclusions:

1. Book Metadata
- Title
- Subtitle
- Course Description
- Learning Outcomes (must match the document)
- Required Background Knowledge

2. Quarter Structure
- Duration: 13 weeks
- Map weekly breakdown directly into the book structure

3. Module Structure (Exactly 4 Modules)

Module 1: The Robotic Nervous System (ROS 2)
- Focus: Middleware for robot control
- Nodes, Topics, Services, Actions
- Python agents with rclpy
- URDF for humanoid robots

Module 2: The Digital Twin (Gazebo & Unity)
- Physics simulation
- Gravity, collisions
- Sensor simulation (LiDAR, depth cameras, IMUs)
- Unity visualization

Module 3: The AI-Robot Brain (NVIDIA Isaac)
- Isaac Sim
- Synthetic data generation
- Isaac ROS
- VSLAM and navigation
- Nav2 for bipedal movement

Module 4: Vision-Language-Action (VLA)
- LLM + Robotics convergence
- Whisper voice-to-action
- Cognitive planning with LLMs
- Capstone: Autonomous Humanoid Robot

4. Chapter & Lesson Rules
- Each Module → 3 Chapters
- Each Chapter → 3 Lessons
- Lesson length optimized for RAG chunking

5. Lesson Template (Strict)
- Learning Objectives
- Physical AI Concept
- System Architecture (textual diagram)
- Tools & Software
- Code / Configuration Examples
- Practical Lab / Simulation
- Real-World Mapping
- Summary

6. Hardware Section
- Dedicated chapters explaining:
  - Digital Twin Workstation
  - Edge AI Kit (Jetson)
  - Robot Lab (Proxy, Miniature, Premium)
  - Cloud vs On-Prem tradeoffs

7. Docusaurus Constraints
- docs/modules/module-x/
- Versioned docs
- Sidebar hierarchy
- Frontmatter schema

Output must be implementation-ready and unambiguous.

## Response snapshot

Created a comprehensive specification for the Physical AI & Humanoid Robotics textbook following the required structure. The specification includes:

1. Complete user scenarios and testing section with 3 prioritized user stories (P1-P3) covering students, engineers, and hackathon participants
2. All functional requirements (FR-001 through FR-012) covering the 4 modules, hardware sections, Docusaurus structure, and lesson templates
3. Key entities defined (Module, Chapter, Lesson, Student Profile, Hardware Configuration)
4. Success criteria with measurable outcomes (SC-001 through SC-006) that are technology-agnostic and measurable

The specification adheres to the constitution's principles of being engineering-first, connecting software intelligence to physical embodiment, and being written for the specified audiences (AI & Robotics students, engineers, hackathon participants, startup builders).

## Outcome

- ✅ Impact: Complete specification created for Physical AI & Humanoid Robotics textbook
- 🧪 Tests: none
- 📁 Files: Created specs/physical-ai-textbook/spec.md and specs/physical-ai-textbook/checklists/requirements.md
- 🔁 Next prompts: Proceed with planning phase using /sp.plan
- 🧠 Reflection: Successfully created implementation-ready specification with all mandatory inclusions

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): All checklist items passed
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin planning phase based on specification