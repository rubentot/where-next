import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { TabBar } from './components/layout/TabBar';
import { Footer } from './components/layout/Footer';
import { ComparisonTab } from './components/comparison/ComparisonTab';
import { CalculatorTab } from './components/calculator/CalculatorTab';
import { MatrixTab } from './components/matrix/MatrixTab';
import { SchoolsTab } from './components/schools/SchoolsTab';

function TabContent() {
  const { activeTab } = useApp();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1">
      {activeTab === 'comparison' && <ComparisonTab />}
      {activeTab === 'calculator' && <CalculatorTab />}
      {activeTab === 'matrix' && <MatrixTab />}
      {activeTab === 'schools' && <SchoolsTab />}
    </main>
  );
}

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <TabBar />
        <TabContent />
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
