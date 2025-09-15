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
            height: '100%',
            fontSize: '14px',
            fontFamily: '"JetBrains Mono", "Fira Code", "Monaco", monospace',
            border: '1px solid var(--theme-border)',
            borderRadius: '8px',
          },
          '&.cm-editor': {
            height: '100%',
          },
          '.cm-scroller': {
            fontFamily: 'inherit',
            overflow: 'auto',
            height: '100%',
            maxHeight: '100%',
          },
          '.cm-content': {
            fontFamily: 'inherit',
            padding: '12px',
          },
          '.cm-editor': {
            outline: 'none',
            height: '100%',
          },
          '.cm-focused': {
            outline: 'none',
          },
          '.cm-editor.cm-focused': {
            outline: 'none',
            borderColor: 'var(--theme-primary)',
            boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.1)',
          },
          '.cm-gutters': {
            backgroundColor: 'transparent',
            border: 'none',
            paddingRight: '8px',
          },
          '.cm-lineNumbers .cm-gutterElement': {
            padding: '0 8px 0 12px',
            fontSize: '13px',
            color: 'var(--theme-text-secondary)',
          },
          '.cm-scroller::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '.cm-scroller::-webkit-scrollbar-track': {
            background: 'var(--theme-surface)',
            borderRadius: '4px',
          },
          '.cm-scroller::-webkit-scrollbar-thumb': {
            backgroundColor: 'var(--theme-border)',
            borderRadius: '4px',
            border: '1px solid transparent',
          },
          '.cm-scroller::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'var(--theme-text-secondary)',
          },
          '.cm-scroller::-webkit-scrollbar-corner': {
            background: 'var(--theme-surface)',
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
      className={`h-full w-full ${className}`}
      style={{
        backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff',
        height: height === '100%' ? '100%' : height,
        overflow: 'hidden',
        position: 'relative'
      }}
    />
  );
}
