import React, { PropsWithChildren } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
const ErrorBoundary = ({ children }: PropsWithChildren) => {
  return (
    <ReactErrorBoundary fallback={<div>Something went wrong</div>}>
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
