"use client";

import React from "react";

interface PolicyMarkdownProps {
  content: string;
}

export function PolicyMarkdown({ content }: PolicyMarkdownProps) {
  // Simple markdown-like rendering
  // For production, consider using a proper Markdown library like react-markdown
  const renderContent = (text: string) => {
    const lines = text.split("\n");
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];
    let isInList = false;

    lines.forEach((line, index) => {
      // Headings
      if (line.startsWith("# ")) {
        if (isInList && listItems.length > 0) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc pl-6 space-y-2">
              {listItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>,
          );
          listItems = [];
          isInList = false;
        }
        elements.push(
          <h1 key={index} className="text-3xl font-bold mt-8 mb-4">
            {line.substring(2)}
          </h1>,
        );
      } else if (line.startsWith("## ")) {
        if (isInList && listItems.length > 0) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc pl-6 space-y-2">
              {listItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>,
          );
          listItems = [];
          isInList = false;
        }
        elements.push(
          <h2 key={index} className="text-2xl font-semibold mt-6 mb-3">
            {line.substring(3)}
          </h2>,
        );
      } else if (line.startsWith("### ")) {
        if (isInList && listItems.length > 0) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc pl-6 space-y-2">
              {listItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>,
          );
          listItems = [];
          isInList = false;
        }
        elements.push(
          <h3 key={index} className="text-xl font-semibold mt-4 mb-2">
            {line.substring(4)}
          </h3>,
        );
      }
      // List items
      else if (line.startsWith("- ")) {
        isInList = true;
        listItems.push(line.substring(2));
      }
      // Bold text (simple **text** pattern)
      else if (line.includes("**")) {
        if (isInList && listItems.length > 0) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc pl-6 space-y-2">
              {listItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>,
          );
          listItems = [];
          isInList = false;
        }
        const parts = line.split("**");
        elements.push(
          <p key={index} className="mb-4 leading-relaxed">
            {parts.map((part, i) =>
              i % 2 === 1 ? <strong key={i}>{part}</strong> : part,
            )}
          </p>,
        );
      }
      // Regular paragraphs
      else if (line.trim()) {
        if (isInList && listItems.length > 0) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc pl-6 space-y-2">
              {listItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>,
          );
          listItems = [];
          isInList = false;
        }
        elements.push(
          <p key={index} className="mb-4 leading-relaxed">
            {line}
          </p>,
        );
      }
      // Empty lines
      else if (!line.trim() && isInList && listItems.length > 0) {
        elements.push(
          <ul key={`list-${index}`} className="list-disc pl-6 space-y-2 mb-4">
            {listItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>,
        );
        listItems = [];
        isInList = false;
      }
    });

    // Flush remaining list items
    if (isInList && listItems.length > 0) {
      elements.push(
        <ul key="list-final" className="list-disc pl-6 space-y-2">
          {listItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>,
      );
    }

    return elements;
  };

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      {renderContent(content)}
    </div>
  );
}
