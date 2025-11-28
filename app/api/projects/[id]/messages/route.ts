import { NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/rate-limit';

const messageSchema = z.object({
  content: z.string().min(1, 'Message content is required'),
});

// GET: Get all messages for a project
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify project ownership
    const project = await db.project.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const messages = await db.message.findMany({
      where: { projectId: params.id },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST: Create a new message and get AI response
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Rate limiting for AI generation
    const rateLimitResult = await checkRateLimit(
      `generate:${session.user.id}`,
      5,
      60
    ); // 5 generations per minute
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait before generating again.' },
        { status: 429 }
      );
    }

    // Verify project ownership
    const project = await db.project.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const body = await request.json();
    const validatedData = messageSchema.parse(body);

    // Save user message
    await db.message.create({
      data: {
        role: 'user',
        content: validatedData.content,
        projectId: params.id,
        userId: session.user.id,
      },
    });

    // Generate AI response (placeholder - integrate with actual AI service)
    const aiResponse = generateAIResponse(validatedData.content, project.prompt);

    // Save assistant message
    await db.message.create({
      data: {
        role: 'assistant',
        content: aiResponse,
        projectId: params.id,
        userId: session.user.id,
      },
    });

    // Update project with latest content
    await db.project.update({
      where: { id: params.id },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Error creating message:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Placeholder AI response generator
function generateAIResponse(userMessage: string, projectPrompt: string | null): string {
  const responses = [
    `I understand you want to ${userMessage.toLowerCase()}. Let me help you with that!

Here's my approach:
1. I'll analyze the requirements
2. Create the necessary components
3. Implement the core functionality
4. Add styling and polish

Would you like me to proceed with a specific aspect first?`,

    `Great question! Based on your request about "${userMessage.slice(0, 50)}...", here's what I suggest:

**Implementation Plan:**
- Set up the project structure
- Create reusable components
- Implement state management
- Add responsive styling

Let me know if you'd like more details on any part!`,

    `I'll help you with that! Here's a breakdown of what we need to do:

1. **Architecture**: Define the component structure
2. **Data Flow**: Set up state and props
3. **Styling**: Apply modern CSS/Tailwind
4. **Interactions**: Add animations and user feedback

Shall I start with a specific component?`,
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}

