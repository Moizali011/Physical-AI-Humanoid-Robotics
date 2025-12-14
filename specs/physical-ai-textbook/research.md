# Research Document: Physical AI & Humanoid Robotics Textbook

## Decision: Docusaurus Setup and Configuration

**What was chosen**: Docusaurus v3.x with classic theme and custom documentation plugin

**Rationale**:
- Docusaurus v3.x is the current stable version with TypeScript support
- Classic theme provides flexible sidebar configuration for textbook structure
- Built-in support for versioned documentation matches requirement
- Extensive plugin ecosystem supports custom MDX components needed for interactive content
- Strong community and documentation for educational use cases

**Alternatives considered**:
- GitBook: More limited customization options, less flexible for technical content
- mdBook: Rust-based, less integration options with JavaScript ecosystem
- Custom React site: Higher development overhead, loses documentation-specific features

## Decision: OpenAI Model Selection for RAG System

**What was chosen**: OpenAI GPT-4 Turbo with text-embedding-3-large for embeddings

**Rationale**:
- GPT-4 Turbo provides optimal balance of intelligence, speed, and cost for educational Q&A
- text-embedding-3-large offers superior accuracy for semantic search in technical content
- Strong performance on complex reasoning tasks required for robotics concepts
- Well-documented API with reliable performance for production use

**Alternatives considered**:
- GPT-3.5 Turbo: Lower cost but less capability for complex robotics concepts
- Open-source alternatives (Llama, etc.): Higher operational overhead, less reliability
- GPT-4: More expensive than Turbo with minimal benefit for this use case

## Decision: Deployment Platform Selection

**What was chosen**: Vercel for production deployment

**Rationale**:
- Superior performance for interactive applications with global CDN
- Better integration with modern JavaScript frameworks (Docusaurus)
- Built-in analytics and monitoring capabilities
- Seamless CI/CD integration with GitHub
- Strong performance for API routes required for RAG backend

**Alternatives considered**:
- GitHub Pages: Limited to static content, no server-side processing for RAG
- Netlify: Good static hosting but less optimized for API-heavy applications
- Custom hosting: Higher operational complexity and cost

## Decision: Vector Database for RAG System

**What was chosen**: Qdrant Cloud with free tier for development and evaluation

**Rationale**:
- Specifically designed for vector search with high performance
- Cloud-hosted option reduces operational overhead
- Free tier sufficient for textbook-sized dataset
- Strong integration with Python ecosystem (FastAPI backend)
- Good performance for semantic search in technical documentation

**Alternatives considered**:
- Pinecone: Commercial alternative but higher cost for similar features
- Weaviate: Open-source option but more complex setup and maintenance
- Supabase Vector: Integrated with Postgres but less specialized for vector search

## Decision: Authentication System

**What was chosen**: Better Auth for user authentication and profiling

**Rationale**:
- Type-safe authentication solution designed for modern web applications
- Easy integration with Docusaurus and FastAPI backend
- Built-in user management features support profiling requirements
- Good documentation and community support
- Lightweight compared to alternatives like Auth0

**Alternatives considered**:
- Auth0: More features but higher cost and complexity
- Clerk: Good alternative but more opinionated UI components
- Custom JWT system: More control but higher development overhead

## Decision: Content Chunking Strategy for RAG

**What was chosen**: Lesson-level chunking with overlapping context windows

**Rationale**:
- Each lesson is designed to be independently usable per constitution
- Overlapping context windows ensure complete concepts are captured
- Optimized for RAG retrieval while maintaining content integrity
- Supports both full-book and selected-text QA capabilities

**Alternatives considered**:
- Paragraph-level chunks: Too granular, loses conceptual coherence
- Chapter-level chunks: Too broad, reduces precision of answers
- Sentence-level chunks: Too fragmented for technical content

## Decision: API Rate Limiting and Caching

**What was chosen**: Redis-based caching with token bucket rate limiting

**Rationale**:
- Caching frequently requested content reduces API costs and improves performance
- Token bucket algorithm provides fair usage distribution
- Redis provides low-latency access for frequently accessed embeddings
- Scalable solution that works with Neon Postgres metadata

**Alternatives considered**:
- In-memory caching: Less persistent, doesn't survive deployments
- CDN-level caching: Less control over cache invalidation
- No caching: Higher costs and slower response times