import { AppRoutes } from './routes/appRoutes';
import { AuthProvider } from './context/AuthContext';
import { CarrinhoProvider } from './context/CarrinhoProvider';

function App() {
  return (
    <AuthProvider>
      <CarrinhoProvider>
        <AppRoutes />
      </CarrinhoProvider>
    </AuthProvider>
  )
}
export default App
