import { NextRequest, NextResponse } from 'next/server';
import type { CompilationRequest, CompilationResult } from '@/types';

// Mock compilation function - in a real app, you'd integrate with a compiler service
async function compileCode(request: CompilationRequest): Promise<CompilationResult> {
  const { language, code, input = '' } = request;

  try {
    // Simulate compilation time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Mock successful compilation for demo purposes
    // In a real implementation, you'd:
    // 1. Send code to a compilation service (e.g., JDoodle, Sphere Engine)
    // 2. Execute the code in a sandboxed environment
    // 3. Return the actual output

    let output = '';

    // Simulate different outputs based on language
    switch (language) {
      case 'python':
        output = `Python ${process.version}\n${input ? `Input: ${input}\n` : ''}${code.includes('print') ? 'Hello, World!\n' : 'Program executed successfully'}`;
        break;
      case 'javascript':
        output = `Node.js ${process.version}\n${input ? `Input: ${input}\n` : ''}${code.includes('console.log') ? 'Hello, World!\n' : 'Program executed successfully'}`;
        break;
      case 'cpp':
      case 'c':
        output = `${language.toUpperCase()} Compiler\n${input ? `Input: ${input}\n` : ''}Hello, World!\nProgram exited with code 0`;
        break;
      case 'java':
        output = `Java Compiler\n${input ? `Input: ${input}\n` : ''}Hello, World!\nProcess finished with exit code 0`;
        break;
      case 'go':
        output = `Go ${process.version}\n${input ? `Input: ${input}\n` : ''}Hello, World!\n`;
        break;
      case 'rust':
        output = `Rust Compiler\n${input ? `Input: ${input}\n` : ''}Hello, World!\n`;
        break;
      case 'php':
        output = `PHP ${process.version}\n${input ? `Input: ${input}\n` : ''}Hello, World!\n`;
        break;
      default:
        output = `Language: ${language}\n${input ? `Input: ${input}\n` : ''}Program executed successfully`;
    }

    return {
      success: true,
      output: output.trim(),
      executionTime: Math.floor(Math.random() * 500) + 100
    };
  } catch (error) {
    return {
      success: false,
      output: '',
      error: `Compilation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      executionTime: 0
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CompilationRequest = await request.json();

    // Validate request
    if (!body.language || !body.code) {
      return NextResponse.json(
        {
          success: false,
          output: '',
          error: 'Missing required fields: language and code'
        } as CompilationResult,
        { status: 400 }
      );
    }

    // Validate language
    const supportedLanguages = [
      'cpp', 'c', 'java', 'python', 'javascript', 'typescript',
      'go', 'rust', 'php', 'ruby', 'kotlin', 'swift'
    ];

    if (!supportedLanguages.includes(body.language)) {
      return NextResponse.json(
        {
          success: false,
          output: '',
          error: `Unsupported language: ${body.language}`
        } as CompilationResult,
        { status: 400 }
      );
    }

    // Validate code length
    if (body.code.length > 50000) {
      return NextResponse.json(
        {
          success: false,
          output: '',
          error: 'Code too long (max 50,000 characters)'
        } as CompilationResult,
        { status: 400 }
      );
    }

    // Validate input length
    if (body.input && body.input.length > 10000) {
      return NextResponse.json(
        {
          success: false,
          output: '',
          error: 'Input too long (max 10,000 characters)'
        } as CompilationResult,
        { status: 400 }
      );
    }

    // Compile the code
    const result = await compileCode(body);

    return NextResponse.json(result, {
      status: result.success ? 200 : 400,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });

  } catch (error) {
    console.error('Compilation API error:', error);

    return NextResponse.json(
      {
        success: false,
        output: '',
        error: 'Internal server error'
      } as CompilationResult,
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'Online Code Compiler API',
      version: '1.0.0',
      supportedLanguages: [
        'cpp', 'c', 'java', 'python', 'javascript', 'typescript',
        'go', 'rust', 'php', 'ruby', 'kotlin', 'swift'
      ]
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=3600'
      }
    }
  );
}

