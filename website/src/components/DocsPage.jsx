import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getDocContent, flatRoutes } from '../docsMapping';
import { MarkdownRenderer } from './MarkdownRenderer';

export const DocsPage = () => {
  const params = useParams();
  // Join the wildcard params back into a full path
  const path = params['*'];
  
  const [content, setContent] = useState('');
  
  useEffect(() => {
    // getDocContent returns the raw markdown from import.meta.glob
    const rawContent = getDocContent(path);
    setContent(rawContent);
    // Scroll to top on navigation
    window.scrollTo(0, 0);
  }, [path]);

  // If we are at the root of /docs, redirect to the first item (Introduction)
  if (!path) {
    return <Navigate to={`/docs/${flatRoutes[0].path}`} replace />;
  }

  return (
    <div className="w-full pb-20">
      <MarkdownRenderer content={content} />
    </div>
  );
};
