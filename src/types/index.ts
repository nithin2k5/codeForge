export interface Language {
  id: string;
  name: string;
  extension: string;
  defaultCode: string;
  monacoId?: string;
  codemirrorId?: string;
}

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    primaryHover: string;
    background: string;
    surface: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    outputBackground: string;
    outputText: string;
  };
}

export interface CompilationResult {
  success: boolean;
  output: string;
  error?: string;
  executionTime?: number;
}

export interface CompilationRequest {
  language: string;
  code: string;
  input?: string;
}

export interface EditorSettings {
  fontSize: number;
  tabSize: number;
  wordWrap: boolean;
  minimap: boolean;
  lineNumbers: boolean;
}

