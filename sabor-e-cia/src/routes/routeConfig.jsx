/**seção de rotas públicas */
import { PublicLayout } from "../components/PublicLayout";
import { RouteErrorBoundary } from "../components/RouteErrorBoundary";
import { LandingPage } from "../pages/LandingPage";
import { About } from '../pages/About';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from "../pages/Register";
import { NotFoundPage } from "../pages/NotFoundPage";
import { CardapioPage } from "../pages/CardapioPage";
import { PasswordRecoveryPage } from "../pages/PasswordRecoveryPage";
import { RequireAuth } from "./guards/RequireAuth";
import { AuthenticatedLayout } from "../components/AuthenticatedLayout";
/**seção de rotas privadas */


/**código de configuração de rotas */

const routeConfig = [
    {
        element: <PublicLayout />,
        errorElement: <RouteErrorBoundary />,
        children:[
        /**espaço destinado a implementação das rotas */
        {path: '/', element: <LandingPage/>},
        {path: '/login', element: <LoginPage/>},
        {path: '/register', element: <RegisterPage/>},
        {path: '/password-recovery', element: <PasswordRecoveryPage/>},
        {path: '/about', element: <About/>},
        {path: '/sobre', element: <About/>}, // TODO: virar SobrePage quando renomear a página
        {path: '/cardapio', element: <CardapioPage/>},
        {path: '*', element: <NotFoundPage/>},
        ]
    },
    {
        element: <RequireAuth/>,
        errorElement: <RouteErrorBoundary/>,
        children:[
            {
                element: <AuthenticatedLayout/>,
                children: [

                ],
            },
        ],
    },
]
export {routeConfig}