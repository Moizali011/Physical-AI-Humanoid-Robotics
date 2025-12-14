# Data Model: Physical AI & Humanoid Robotics Textbook

## Core Entities

### User
- **id**: string (UUID) - Unique identifier for each user
- **email**: string - User's email address for authentication
- **name**: string - User's full name
- **role**: enum ['student', 'engineer', 'hacker', 'educator'] - User type classification
- **background**: string - Technical background and experience level
- **preferences**: JSON object - Personalization settings and preferences
- **createdAt**: datetime - Account creation timestamp
- **updatedAt**: datetime - Last update timestamp

### Module
- **id**: string - Unique identifier for the module
- **title**: string - Module title (e.g., "The Robotic Nervous System")
- **description**: string - Brief description of the module
- **order**: integer - Sequential order in the 13-week structure
- **learningObjectives**: array of strings - Educational objectives for the module
- **createdAt**: datetime - Creation timestamp
- **updatedAt**: datetime - Last update timestamp

### Chapter
- **id**: string - Unique identifier for the chapter
- **moduleId**: string - Reference to parent module
- **title**: string - Chapter title
- **description**: string - Brief description of the chapter
- **week**: integer - Week number in the 13-week structure
- **order**: integer - Sequential order within the module (1-3)
- **learningObjectives**: array of strings - Educational objectives for the chapter
- **createdAt**: datetime - Creation timestamp
- **updatedAt**: datetime - Last update timestamp

### Lesson
- **id**: string - Unique identifier for the lesson
- **chapterId**: string - Reference to parent chapter
- **title**: string - Lesson title
- **description**: string - Brief description of the lesson
- **order**: integer - Sequential order within the chapter (1-3)
- **learningObjectives**: array of strings - Educational objectives for the lesson
- **physicalAIConcept**: string - Core Physical AI concept covered
- **systemArchitecture**: string - Textual diagram of system architecture
- **toolsAndSoftware**: array of strings - Tools and software covered
- **codeExamples**: array of strings - Code/configuration examples
- **labInstructions**: string - Practical lab/simulation instructions
- **realWorldMapping**: string - Real-world application mapping
- **summary**: string - Lesson summary
- **content**: string - Full lesson content in MDX format
- **createdAt**: datetime - Creation timestamp
- **updatedAt**: datetime - Last update timestamp

### ContentChunk
- **id**: string - Unique identifier for the content chunk
- **lessonId**: string - Reference to parent lesson
- **content**: string - Chunked content for RAG system
- **embedding**: array of numbers - Vector embedding of the content
- **chunkOrder**: integer - Order of the chunk within the lesson
- **tokenCount**: integer - Number of tokens in the chunk
- **createdAt**: datetime - Creation timestamp

### UserProgress
- **id**: string - Unique identifier for the progress record
- **userId**: string - Reference to the user
- **lessonId**: string - Reference to the lesson
- **status**: enum ['not-started', 'in-progress', 'completed'] - Progress status
- **completionPercentage**: number - Percentage of lesson completed
- **timeSpent**: integer - Time spent on lesson in seconds
- **lastAccessed**: datetime - Last time the lesson was accessed
- **notes**: string - User notes on the lesson
- **createdAt**: datetime - Creation timestamp
- **updatedAt**: datetime - Last update timestamp

### ChatSession
- **id**: string - Unique identifier for the chat session
- **userId**: string - Reference to the user (optional for anonymous sessions)
- **title**: string - Title of the chat session
- **createdAt**: datetime - Creation timestamp
- **updatedAt**: datetime - Last update timestamp

### ChatMessage
- **id**: string - Unique identifier for the message
- **sessionId**: string - Reference to the chat session
- **role**: enum ['user', 'assistant'] - Role of the message sender
- **content**: string - Content of the message
- **sources**: array of strings - Source references for RAG responses
- **timestamp**: datetime - When the message was sent
- **metadata**: JSON object - Additional metadata about the message

### UserProfile
- **id**: string - Unique identifier for the profile
- **userId**: string - Reference to the user
- **background**: string - Technical background and experience
- **goals**: array of strings - Learning goals and objectives
- **preferredLearningStyle**: string - Preferred learning style
- **languagePreference**: string - Preferred language (default: English)
- **createdAt**: datetime - Creation timestamp
- **updatedAt**: datetime - Last update timestamp

## Relationships

- User has many UserProgress records
- User has many ChatSessions
- User has one UserProfile
- Module has many Chapters
- Chapter has many Lessons
- Lesson has many ContentChunks
- Lesson has many UserProgress records
- ChatSession has many ChatMessages

## Validation Rules

### User
- Email must be a valid email format
- Role must be one of the defined enum values
- Name must be 1-100 characters

### Module
- Title must be 1-200 characters
- Order must be between 1-4 (for 4 modules)
- Learning objectives must be an array of 1-5 strings

### Chapter
- Title must be 1-200 characters
- Order must be between 1-3 (for 3 chapters per module)
- Week must be between 1-13 (for 13-week structure)

### Lesson
- Title must be 1-200 characters
- Order must be between 1-3 (for 3 lessons per chapter)
- Content must follow the strict lesson template structure
- All required lesson template sections must be present

### ContentChunk
- Content must be less than 1000 tokens for optimal RAG performance
- Embedding must be a valid vector representation
- Chunk order must be sequential within a lesson

### UserProgress
- Status must be one of the defined enum values
- Completion percentage must be between 0-100
- Time spent must be non-negative

## State Transitions

### UserProgress
- `not-started` → `in-progress` when user begins lesson
- `in-progress` → `completed` when user finishes lesson
- `completed` → `in-progress` if user returns to lesson