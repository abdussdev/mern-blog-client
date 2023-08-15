import Navbar from "./components/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="app">
      <header className="header">
        <Navbar />
      </header>
      
      <main className="content">
        {children}
      </main>
      <footer>
        
      </footer>
    </div>
  );
};

export default Layout;
