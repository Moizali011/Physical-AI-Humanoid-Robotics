---
id: 1
title: Establish Physical AI Constitution
stage: constitution
date: 2025-12-14
surface: agent
model: Claude Opus 4.5
feature: none
branch: master
user: user
command: /sp.constitution
labels: [constitution, textbook, physical-ai, humanoid-robotics]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - none
---

## Prompt

You are Claude Code operating under Spec-Kit Plus.

Establish the CONSTITUTION for an AI-native textbook project.

Project Title:
Physical AI & Humanoid Robotics

Core Theme:
AI Systems in the Physical World — Embodied Intelligence.

Primary Goal:
Bridge the gap between the digital brain and the physical body by teaching students how to design, simulate, and deploy humanoid robots in simulated and real-world environments.

Foundational Pillars:
- Physical AI (Embodied Intelligence)
- Simulation-to-Real (Sim2Real)
- Humanoid Robotics
- ROS 2-based robotic control
- Physics-based simulation
- Vision-Language-Action (VLA)
- Conversational Robotics

Non-Negotiable Principles:
- Content must strictly follow the provided course document
- Engineering-first, no motivational fluff
- Industry-aligned tooling only (ROS 2, Gazebo, NVIDIA Isaac)
- All explanations must connect software intelligence to physical embodiment
- Each lesson must be usable independently for RAG-based retrieval
- Written for Docusaurus (Markdown / MDX only)

Audience:
- AI & Robotics students
- Engineers entering Physical AI
- Hackathon participants
- Startup-focused builders

Tone & Style:
- Instructor-grade
- Clear, precise, and technical
- Practical over theoretical

This constitution governs all specifications, plans, tasks, and implementations.

## Response snapshot

Updated the constitution file with all the specified principles and guidelines for the Physical AI & Humanoid Robotics textbook project. The new constitution includes 7 core principles based on the foundational pillars, educational approach guidelines, development workflow requirements, and governance structure. The version was set to 1.0.0 with today's date as both ratification and amendment date.

## Outcome

- ✅ Impact: Constitution established for Physical AI & Humanoid Robotics textbook project
- 🧪 Tests: none
- 📁 Files: Updated .specify/memory/constitution.md with new content
- 🔁 Next prompts: Continue with specification development based on this constitution
- 🧠 Reflection: Successfully transformed template into project-specific constitution

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin specification work based on constitution