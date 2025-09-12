import type { Language } from '@/types';

export const LANGUAGES: Language[] = [
  {
    id: 'cpp',
    name: 'C++',
    extension: '.cpp',
    codemirrorId: 'cpp',
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`
  },
  {
    id: 'c',
    name: 'C',
    extension: '.c',
    codemirrorId: 'c',
    defaultCode: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`
  },
  {
    id: 'java',
    name: 'Java',
    extension: '.java',
    codemirrorId: 'java',
    defaultCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`
  },
  {
    id: 'python',
    name: 'Python',
    extension: '.py',
    codemirrorId: 'python',
    defaultCode: `print("Hello, World!")`
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    extension: '.js',
    codemirrorId: 'javascript',
    defaultCode: `console.log("Hello, World!");`
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    extension: '.ts',
    codemirrorId: 'typescript',
    defaultCode: `console.log("Hello, World!");`
  },
  {
    id: 'go',
    name: 'Go',
    extension: '.go',
    codemirrorId: 'go',
    defaultCode: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`
  },
  {
    id: 'rust',
    name: 'Rust',
    extension: '.rs',
    codemirrorId: 'rust',
    defaultCode: `fn main() {
    println!("Hello, World!");
}`
  },
  {
    id: 'php',
    name: 'PHP',
    extension: '.php',
    codemirrorId: 'php',
    defaultCode: `<?php
echo "Hello, World!\\n";
?>`
  },
  {
    id: 'ruby',
    name: 'Ruby',
    extension: '.rb',
    codemirrorId: 'ruby',
    defaultCode: `puts "Hello, World!"`
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    extension: '.kt',
    codemirrorId: 'kotlin',
    defaultCode: `fun main() {
    println("Hello, World!")
}`
  },
  {
    id: 'swift',
    name: 'Swift',
    extension: '.swift',
    codemirrorId: 'swift',
    defaultCode: `print("Hello, World!")`
  }
];

export const getLanguageById = (id: string): Language | undefined => {
  return LANGUAGES.find(lang => lang.id === id);
};

export const getDefaultLanguage = (): Language => {
  return LANGUAGES[0];
};

