import Highlight, { defaultProps, Language } from "prism-react-renderer";
import dracula from "prism-react-renderer/themes/dracula";

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
      theme={dracula}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{
            ...style,
            overflow: "auto",
            padding: "15px 10px",
            borderRadius: "5px",
            fontSize: "14px",
          }}
        >
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};