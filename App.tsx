import { AuthProvider } from './src/context/AuthContext';

import NavigationIndex from './src/components/navigation/Index';

const App = () => (
  <AuthProvider>
    <NavigationIndex />
  </AuthProvider>
)


export default App
