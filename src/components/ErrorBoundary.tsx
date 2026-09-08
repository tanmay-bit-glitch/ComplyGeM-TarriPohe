import React, { ReactNode } from 'react';
import { AlertTriangle, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
  errorInfo: any;
  showDetails: boolean;
}

export class ErrorBoundary extends (React.Component as any) {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
    showDetails: false,
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(error: any): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('[GeM ErrorBoundary Caught]', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null, showDetails: false });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      const title = this.props.fallbackTitle || 'Component Rendering Recovery';
      const message =
        this.props.fallbackMessage ||
        'A temporary interface display issue occurred while rendering this section. The underlying data is secure.';

      return (
        <div className="my-4 p-5 bg-amber-50/90 border-2 border-amber-300 rounded-xl text-slate-800 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-start space-x-3">
            <span className="p-2 bg-amber-200 text-amber-900 rounded-lg shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5 text-amber-700" />
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-slate-900">{title}</h3>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">{message}</p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={this.handleReset}
                  className="px-3 py-1.5 bg-[#002B5B] hover:bg-[#001D3D] text-white text-xs font-bold rounded-lg shadow-2xs flex items-center space-x-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reload Component</span>
                </button>

                <button
                  type="button"
                  onClick={() => this.setState((s: ErrorBoundaryState) => ({ showDetails: !s.showDetails }))}
                  className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors"
                >
                  <span>{this.state.showDetails ? 'Hide Diagnostics' : 'Show Diagnostics'}</span>
                  {this.state.showDetails ? (
                    <ChevronUp className="w-3 h-3 text-slate-500" />
                  ) : (
                    <ChevronDown className="w-3 h-3 text-slate-500" />
                  )}
                </button>
              </div>

              {this.state.showDetails && this.state.error && (
                <div className="mt-3 p-3 bg-slate-900 text-slate-100 rounded-lg font-mono text-[11px] overflow-x-auto select-text border border-slate-700">
                  <p className="font-bold text-rose-400 mb-1">{this.state.error.toString()}</p>
                  {this.state.errorInfo?.componentStack && (
                    <pre className="text-[10px] text-slate-400 whitespace-pre-wrap leading-tight mt-1">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
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
