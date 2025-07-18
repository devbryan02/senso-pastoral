import Link from "next/link";
import { LogIn, UserPlus } from "lucide-react";

function PagePrincipal() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-base-200 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-primary">
          Bienvenido al Censo de Pastores
        </h1>
        <p className="text-lg text-base-content mb-8">
          Gestiona la información de iglesias, pastores y anexos de forma rápida y segura.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/login" className="btn btn-primary gap-2">
            <LogIn className="w-5 h-5" />
            Iniciar Sesión
          </Link>
          <Link href="/auth/register" className="btn btn-outline gap-2">
            <UserPlus className="w-5 h-5" />
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PagePrincipal;
