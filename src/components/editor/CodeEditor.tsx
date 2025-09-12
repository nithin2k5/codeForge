'use client';

import { useEffect, useRef, useState } from 'react';
import { EditorView, lineNumbers, highlightActiveLineGutter, highlightSpecialChars, drawSelection, dropCursor, rectangularSelection, highlightActiveLine } from '@codemirror/view';
import { EditorState, Compartment } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { go } from '@codemirror/lang-go';
import { rust } from '@codemirror/lang-rust';
import { php } from '@codemirror/lang-php';
import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';
import { keymap } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { bracketMatching, syntaxHighlighting, defaultHighlightStyle, foldGutter, indentOnInput } from '@codemirror/language';
import { closeBrackets, autocompletion, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete';
import type { Language } from '@/types';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  theme?: 'light' | 'dark';
  readOnly?: boolean;
  height?: string;
  className?: string;
}

// Create compartments for dynamic reconfiguration
const languageCompartment = new Compartment();
const themeCompartment = new Compartment();
const readonlyCompartment = new Compartment();

const getLanguageExtension = (languageId: string) => {
  const extensions = {
    javascript: javascript(),
    typescript: javascript({ typescript: true }),
    python: python(),
    java: java(),
    cpp: cpp(),
    c: cpp(), // C uses the same extension as C++
    go: go(),
    rust: rust(),
    php: php(),
    html: html(),
    kotlin: javascript(), // Fallback for unsupported languages
    ruby: javascript(),
    swift: javascript()
  };

  return extensions[languageId as keyof typeof extensions] || javascript();
};

// Base extensions that are always included
const baseExtensions = [
  lineNumbers(),
  highlightActiveLineGutter(),
  highlightSpecialChars(),
  history(),
  foldGutter(),
  drawSelection(),
  dropCursor(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  bracketMatching(),
  closeBrackets(),
  autocompletion(),
  rectangularSelection(),
  highlightActiveLine(),
  keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...historyKeymap,
    ...completionKeymap,
    indentWithTab
  ])
];

export default function CodeEditor({
  value,
  onChange,
  language,
  theme = 'light',
  readOnly = false,
  height = '400px',
  className = ''
}: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!editorRef.current || !isMounted) return;

    const languageExtension = getLanguageExtension(language);
    const themeExtension = theme === 'dark' ? oneDark : [];

    const state = EditorState.create({
      doc: value,
      extensions: [
        ...baseExtensions,
        languageCompartment.of(languageExtension),
        themeCompartment.of(themeExtension),
        readonlyCompartment.of(EditorState.readOnly.of(readOnly)),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChange(update.state.doc.toString());
          }
        }),
        EditorView.theme({
          '&': {
            height,
            fontSize: '14px',
            fontFamily: '"JetBrains Mono", "Fira Code", "Monaco", monospace',
          },
          '.cm-scroller': {
            fontFamily: 'inherit',
          },
          '.cm-content': {
            fontFamily: 'inherit',
          },
          '.cm-editor': {
            outline: 'none',
          },
        }),
        EditorView.lineWrapping,
      ],
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [height, isMounted, onChange]);

  // Update editor content when value prop changes
  useEffect(() => {
    if (viewRef.current && value !== viewRef.current.state.doc.toString()) {
      const transaction = viewRef.current.state.update({
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: value,
        },
      });
      viewRef.current.dispatch(transaction);
    }
  }, [value, onChange]);

  // Update language when it changes
  useEffect(() => {
    if (viewRef.current && isMounted) {
      const languageExtension = getLanguageExtension(language);
      viewRef.current.dispatch({
        effects: languageCompartment.reconfigure(languageExtension)
      });
    }
  }, [language, isMounted]);

  // Update theme when it changes
  useEffect(() => {
    if (viewRef.current && isMounted) {
      const themeExtension = theme === 'dark' ? oneDark : [];
      viewRef.current.dispatch({
        effects: themeCompartment.reconfigure(themeExtension)
      });
    }
  }, [theme, isMounted]);

  // Update readonly state
  useEffect(() => {
    if (viewRef.current && isMounted) {
      viewRef.current.dispatch({
        effects: readonlyCompartment.reconfigure(EditorState.readOnly.of(readOnly))
      });
    }
  }, [readOnly, isMounted]);

  if (!isMounted) {
    return (
      <div
        className={`bg-gray-100 dark:bg-gray-800 rounded border animate-pulse ${className}`}
        style={{ height }}
      />
    );
  }

  return (
    <div
      ref={editorRef}
      className={`border rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 ${className}`}
      style={{
        backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff',
        borderColor: theme === 'dark' ? '#3e3e3e' : '#d1d5db'
      }}
    />
  );
}
