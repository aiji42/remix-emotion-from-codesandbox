import { FC } from "react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch
} from "remix";
import { useStyles } from "./styles-context";

const Wrapper: FC = ({ children }) => {
  const styles = useStyles();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        {typeof document === "undefined" ? null : styles}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export default function App() {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  if (caught.status === 404) {
    return (
      <Wrapper>
        <div>
          <h1>{caught.statusText}</h1>
        </div>
      </Wrapper>
    );
  }
  throw new Error(`Unhandled error: ${caught.status}`);
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Wrapper>
      <div>
        <h1>{error.message}</h1>
      </div>
    </Wrapper>
  );
}
