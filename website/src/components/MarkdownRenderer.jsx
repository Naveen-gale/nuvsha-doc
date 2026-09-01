import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy } from 'lucide-react';

const CodeBlock = ({ node, inline, className, children, ...props }) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : 'text';
  const codeString = String(children).replace(/\n$/, '');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!inline && match) {
    return (
      <div className="relative my-8 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shadow-xl">
        <div className="flex justify-between items-center px-4 py-2 bg-slate-950 border-b border-slate-800">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {language === 'html' ? 'NUVSHA / HTML' : language}
          </span>
          <button 
            className={`flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors ${copied ? 'text-emerald-400 bg-emerald-400/10' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            onClick={copyToClipboard}
            title="Copy code"
          >
            {copied ? (
              <>
                <Check size={14} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <SyntaxHighlighter
          style={atomDark}
          language={language === 'nuvsha' || language === 'nuv' ? 'html' : language}
          PreTag="pre"
          customStyle={{ margin: 0, padding: '1.25rem', background: 'transparent' }}
          {...props}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    );
  }
  return (
    <code className={`px-1.5 py-0.5 rounded-md bg-slate-800 text-pink-400 text-sm font-mono ${className}`} {...props}>
      {children}
    </code>
  );
};

export const MarkdownRenderer = ({ content }) => {
  return (
    <div className="prose prose-invert prose-slate prose-headings:text-slate-100 prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline prose-code:text-pink-400 prose-code:bg-slate-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:p-0 prose-pre:bg-transparent max-w-none">
      <ReactMarkdown
        components={{
          code: CodeBlock,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
