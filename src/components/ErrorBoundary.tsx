import { Component, ReactNode, ErrorInfo } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true, error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ hasError: true, error, errorInfo });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FFF1E0] p-8">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-[#3E3E3E]">
                Something went wrong
              </h2>
            </div>
            
            <div className="p-6 space-y-6">
              {this.state.error && (
                <div className="bg-[#FFF1E0] rounded-lg p-4">
                  <h3 className="text-lg font-medium text-[#3E3E3E] mb-2">
                    Error Details
                  </h3>
                  <p className="text-[#666666]">
                    {this.state.error.message}
                  </p>
                </div>
              )}
              
              {this.state.errorInfo && (
                <div className="bg-[#FFF1E0] rounded-lg p-4">
                  <h3 className="text-lg font-medium text-[#3E3E3E] mb-2">
                    Component Stack
                  </h3>
                  <pre className="text-sm text-[#666666] whitespace-pre-wrap overflow-auto max-h-64 p-2 bg-white rounded-md">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;