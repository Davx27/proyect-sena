/**
 * Archivo: pages/LoginPage.tsx
 * Descripción: Página de inicio de sesión — formulario de email y contraseña.
 * ¿Para qué? Permitir que usuarios registrados se autentiquen en el sistema.
 * ¿Impacto? Es la puerta de entrada a la app — sin login, no se puede acceder a nada protegido.
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth";
import { InputField } from "../components/ui/InputField";
import { Button } from "../components/ui/Button";
import { Alert } from "../components/ui/Alert";

/**
 * ¿Qué? Página de login con formulario, manejo de errores y redirección post-login.
 * ¿Para qué? Autenticar al usuario con email + password y obtener tokens JWT.
 * ¿Impacto? Una vez autenticado, se redirige al dashboard automáticamente.
 *
 * i18n pedagógico:
 * useTranslation() provee t() — función que recibe una clave y retorna el texto
 * en el idioma activo. Ejemplo: t("auth.login.title") → "Iniciar sesión" (es) | "Sign in" (en).
 * Si el usuario cambia idioma, este componente se re-renderiza automáticamente.
 */
export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  // ¿Qué? Hook de traducción — desestructuramos solo t() ya que no necesitamos i18n aquí.
  // ¿Para qué? t("clave") retorna el texto en el idioma activo según los archivos de locales/.
  // ¿Impacto? Cada vez que el idioma cambia, React re-renderiza y t() retorna el nuevo texto.
  const { t } = useTranslation();

  // ¿Qué? Estado del formulario — email y password.
  const [formData, setFormData] = useState({ email: "", password: "" });
  // ¿Qué? Error general del formulario (credenciales inválidas, servidor caído, etc.).
  const [error, setError] = useState<string | null>(null);
  // ¿Qué? Flag de carga — deshabilita el botón mientras se procesa el login.
  const [isLoading, setIsLoading] = useState(false);

  /**
   * ¿Qué? Actualiza el campo correspondiente cuando el usuario escribe.
   * ¿Para qué? Mantener el estado sincronizado con los inputs del formulario.
   * ¿Impacto? Patrón controlled component — React controla el valor de cada input.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null); // Limpiar error al escribir
  };

  /**
   * ¿Qué? Envía las credenciales al backend y maneja la respuesta.
   * ¿Para qué? Autenticar al usuario y navegar al dashboard si es exitoso.
   * ¿Impacto? Si falla, muestra el mensaje de error. Si tiene éxito, redirige.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(formData);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : t("auth.login.errorDefault");
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Menú lateral */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-green-700">
            SENA
          </h1>
          <p className="text-sm text-gray-500">
            Gestión de Horarios
          </p>
        </div>

        <nav className="p-4 space-y-4">
          <div className="text-green-700 font-semibold">
            Dashboard
          </div>

          <div className="text-gray-600">
            Horarios
          </div>

          <div className="text-gray-600">
            Ambientes
          </div>
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex items-center justify-center">

        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

          <h2 className="text-3xl font-bold text-center mb-2">
            Iniciar Sesión
          </h2>

          <p className="text-center text-gray-500 mb-6">
            Sistema de Gestión de Horarios
          </p>

          {error && (
            <div className="mb-4">
              <Alert
                type="error"
                message={error}
                onClose={() => setError(null)}
              />
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>

            <InputField
              label="Correo electrónico"
              name="email"
              type="email"
              value={formData.email}
              placeholder="correo@sena.edu.co"
              icon={<Mail className="h-5 w-5" />}
              onChange={handleChange}
            />

            <InputField
              label="Contraseña"
              name="password"
              type="password"
              value={formData.password}
              placeholder="********"
              icon={<Lock className="h-5 w-5" />}
              onChange={handleChange}
            />

            <div className="mb-4 flex justify-end">
              <Link
                to="/forgot-password"
                className="text-green-700 text-sm"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
            >
              Ingresar
            </Button>

          </form>

        </div>

      </div>

    </div>
  );
}