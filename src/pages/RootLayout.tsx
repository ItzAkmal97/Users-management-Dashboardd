import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import ErrorBoundary from "../components/ErrorBoundary";
function RootLayout() {
  return (
    <>
      <ErrorBoundary>
        <Header />
        <main className="max-w-7xl mx-auto">
          <Outlet />
        </main>
      </ErrorBoundary>
    </>
  );
}

export default RootLayout;
