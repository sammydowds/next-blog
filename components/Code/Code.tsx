import Highlight, { defaultProps, Language } from "prism-react-renderer";
import vsDark from "prism-react-renderer/themes/vsDark";

export const Code = ({
  className,
  children,
}: {
  children: string;
  className: string;
}) => {
  const language = className?.replace("lang-", "");
  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language as Language}
      theme={vsDark}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{
            ...style,
            overflow: "auto",
            padding: "10px",
            margin: "12px 0px",
            borderRadius: "5px",
            fontSize: "12px",
          }}
        >
          {tokens.map((line, i) => (
            <div key={line[0].content} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span
                  key={line[0].content}
                  {...getTokenProps({ token, key })}
                />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
