# Quickstart Guide: Physical AI & Humanoid Robotics Textbook

## Prerequisites

- Node.js (v18 or higher)
- Python (v3.9 or higher)
- Git
- Access to OpenAI API
- Access to Neon Postgres
- Access to Qdrant Cloud

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd physical-ai-textbook
```

### 2. Install Docusaurus Dependencies

```bash
cd frontend  # or wherever Docusaurus is located
npm install
```

### 3. Set Up Backend Environment

```bash
# Create Python virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install fastapi uvicorn python-dotenv openai qdrant-client psycopg2-binary better-async
```

### 4. Configure Environment Variables

Create a `.env` file in the backend directory:

```env
OPENAI_API_KEY=your_openai_api_key
NEON_DATABASE_URL=your_neon_database_url
QDRANT_URL=your_qdrant_cloud_url
QDRANT_API_KEY=your_qdrant_api_key
JWT_SECRET_KEY=your_jwt_secret_key
ENCRYPTION_KEY=your_encryption_key
```

### 5. Initialize the Database

```bash
# Run database migrations
python -m alembic upgrade head
```

### 6. Initialize Vector Database

```bash
# Initialize Qdrant collections
python -c "
from qdrant_client import QdrantClient
client = QdrantClient(url='YOUR_QDRANT_URL', api_key='YOUR_API_KEY')

# Create collection for content chunks
client.recreate_collection(
    collection_name='textbook_content',
    vectors_config={
        'content_vector': {
            'size': 1536,  # Size for text-embedding-3-large
            'distance': 'Cosine'
        }
    }
)
"
```

## Development Workflow

### Running the Frontend (Docusaurus)

```bash
cd frontend
npm start
```

This will start the Docusaurus development server on `http://localhost:3000`.

### Running the Backend (FastAPI)

```bash
cd backend
uvicorn main:app --reload --port 8000
```

This will start the FastAPI development server on `http://localhost:8000`.

### Running Both Simultaneously

Use a process manager like `concurrently`:

```bash
npm install -g concurrently
concurrently "cd frontend && npm start" "cd backend && uvicorn main:app --reload --port 8000"
```

## Content Creation Workflow

### Adding New Content

1. Create the module directory in `docs/modules/`
2. Create chapter directories within the module
3. Create lesson files within each chapter
4. Follow the strict lesson template structure:
   - Learning Objectives
   - Physical AI Concept
   - System Architecture
   - Tools & Software
   - Code/Configuration Examples
   - Practical Lab/Simulation
   - Real-World Mapping
   - Summary

### Content Validation

All content must pass validation against the constitution principles:
- Connects software intelligence to physical embodiment
- Written for instructor-grade, clear, precise, and technical audience
- Each lesson is usable independently for RAG-based retrieval

## API Endpoints

### Textbook Content
- `GET /modules` - Get all modules
- `GET /modules/{id}` - Get module with chapters
- `GET /chapters/{id}` - Get chapter with lessons
- `GET /lessons/{id}` - Get lesson content

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile

### RAG System
- `GET /search?q={query}` - Search textbook content
- `POST /chat/sessions` - Create chat session
- `POST /chat/sessions/{id}/messages` - Send message and get response

## Testing

### Frontend Tests
```bash
npm test
```

### Backend Tests
```bash
python -m pytest tests/
```

### Integration Tests
```bash
# Run integration tests that test the full system
python -m pytest tests/integration/
```

## Deployment

### Building for Production

```bash
# Build Docusaurus site
cd frontend
npm run build

# The built site will be in the build/ directory
```

### Environment Variables for Production

In addition to the development variables, ensure these are set for production:

```env
NODE_ENV=production
DATABASE_URL=your_production_database_url
FRONTEND_URL=your_production_frontend_url
```

## Troubleshooting

### Common Issues

1. **API rate limits**: If encountering OpenAI rate limits, implement proper caching and rate limiting
2. **Vector search performance**: Ensure proper indexing in Qdrant and optimize embedding size
3. **Authentication errors**: Verify JWT configuration and secret key security
4. **Content rendering**: Check MDX syntax and Docusaurus plugin configurations

### Local Development Tips

- Use the `--reload` flag with Uvicorn for automatic backend reloading
- Use Docusaurus' live reload for frontend changes
- Keep API documentation in sync with implementation using the provided OpenAPI spec