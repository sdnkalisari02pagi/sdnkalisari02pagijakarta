import React from 'react';

const URL_REGEX = /(https?:\/\/[^\s]+)/g;

export function linkify(text: string): React.ReactNode {
  if (!text) return text;
  const parts = text.split(URL_REGEX);
  return parts.map((part, i) => {
    if (URL_REGEX.test(part)) {
      // Strip trailing punctuation that often isn't part of URL
      const m = part.match(/^(.*?)([.,;:!?)\]]*)$/);
      const url = m ? m[1] : part;
      const trail = m ? m[2] : '';
      return (
        <React.Fragment key={i}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:opacity-80 break-words"
          >
            {url}
          </a>
          {trail}
        </React.Fragment>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

/** For multiline text with auto-linking. Preserves line breaks. */
export function LinkedText({ text, className }: { text: string; className?: string }) {
  const lines = (text || '').split('\n');
  return (
    <span className={className} style={{ whiteSpace: 'pre-line' }}>
      {lines.map((line, idx) => (
        <React.Fragment key={idx}>
          {linkify(line)}
          {idx < lines.length - 1 && '\n'}
        </React.Fragment>
      ))}
    </span>
  );
}
