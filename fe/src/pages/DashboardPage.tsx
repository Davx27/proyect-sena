/**
 * Archivo: pages/DashboardPage.tsx
 * Descripción: Panel principal del usuario autenticado — demo educativa del componente DataTable.
 * ¿Para qué? Mostrar cómo un componente genérico DataTable<T> puede renderizar cualquier
 *            entidad de negocio (empleados, productos) sin reescribir la lógica de tabla.
 * ¿Impacto? Demuestra el principio DRY: un solo componente reutilizable para múltiples casos de uso.
 */

import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { Building2, Users2, GraduationCap, CalendarDays, Clock, User, PlusCircle, Sliders, BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * ¿Qué? Panel principal del usuario autenticado con demo educativa del componente DataTable.
 * ¿Para qué? Mostrar cómo un componente genérico puede ser reutilizado con distintos datasets.
 * ¿Impacto? El aprendiz entiende el patrón "componente genérico + definición de columnas externas".
 */
export function DashboardPage() {
  const { user } = useAuth();
  const { t, i18n } = useTranslation();

  // --- INICIO LÓGICA DE FECHA ---
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Actualiza la hora cada segundo
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const fechaActual = time.toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'es-CO', formatOptions);
  // --- FIN LÓGICA DE FECHA ---




  return (
    <div className="space-y-10 p-1">
      {/* ── SECCIÓN DE BIENVENIDA DEL SISTEMA DE HORARIOS SENA ── */}
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-950 dark:text-white flex items-center gap-2">
          {t("dashboard.welcome", { name: user?.first_name ? `${user.first_name} ${user.last_name}` : "HOLA USER" })} 📚
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          <span className="capitalize">{t("dashboard.trainingCenter")} - {fechaActual}</span>
        </p>
        </div>

        {/* CUATRO TARJETAS DE ESTADÍSTICAS */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Tarjeta 1 */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900">
            <div className="inline-flex rounded-xl bg-blue-600 p-3 text-white shadow-md shadow-blue-500/20">
              <Building2 className="h-6 w-6" />
            </div>
            <p className="mt-4 text-xs font-medium text-gray-400 dark:text-gray-500">{t("dashboard.totalEnvironments")}</p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">45</h3>
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{t("dashboard.environmentsSub")}</p>
          </div>

          {/* Tarjeta 2 */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900">
            <div className="inline-flex rounded-xl bg-emerald-500 p-3 text-white shadow-md shadow-emerald-500/20">
              <Users2 className="h-6 w-6" />
            </div>
            <p className="mt-4 text-xs font-medium text-gray-400 dark:text-gray-500">{t("dashboard.activeInstructors")}</p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">128</h3>
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{t("dashboard.instructorsSub")}</p>
          </div>

          {/* Tarjeta 3 */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900">
            <div className="inline-flex rounded-xl bg-violet-600 p-3 text-white shadow-md shadow-violet-500/20">
              <GraduationCap className="h-6 w-6" />
            </div>
            <p className="mt-4 text-xs font-medium text-gray-400 dark:text-gray-500">{t("dashboard.apprentices")}</p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">2,456</h3>
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{t("dashboard.apprenticesSub")}</p>
          </div>

          {/* Tarjeta 4 */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900">
            <div className="inline-flex rounded-xl bg-orange-500 p-3 text-white shadow-md shadow-orange-500/20">
              <CalendarDays className="h-6 w-6" />
            </div>
            <p className="mt-4 text-xs font-medium text-gray-400 dark:text-gray-500">{t("dashboard.schedules")}</p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">312</h3>
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{t("dashboard.schedulesSub")}</p>
          </div>
        </div>

        {/* SECCIÓN INFERIOR */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* BLOQUE IZQUIERDO */}
          <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  {t("dashboard.todaySchedule")}
                </h2>
                <p className="text-xs text-gray-400 dark:text-gray-500">{t("dashboard.todayScheduleSub")}</p>
              </div>
              <button className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors">
                {t("dashboard.viewFullWeek")}
              </button>
            </div>

            {/* Clase 1 - (Los datos de ejemplo no se traducen) */}
            <div className="flex items-center gap-4 rounded-xl border border-gray-50 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-800/30">
              <div className="flex flex-col items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/40 p-3 text-emerald-700 dark:text-emerald-400 font-bold min-w-[70px]">
                <Clock className="h-4 w-4 mb-1" />
                <span className="text-sm">08:00</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-white border border-gray-200 px-2 py-0.5 text-xs font-bold text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300">2558963</span>
                  <span className="rounded-md bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">Ambiente 301</span>
                </div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Desarrollo de Software</h4>
                <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                  <User className="h-3 w-3" /> Carlos Rodríguez
                </p>
              </div>
            </div>

            {/* Clase 2 */}
            <div className="flex items-center gap-4 rounded-xl border border-gray-50 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-800/30">
              <div className="flex flex-col items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/40 p-3 text-emerald-700 dark:text-emerald-400 font-bold min-w-[70px]">
                <Clock className="h-4 w-4 mb-1" />
                <span className="text-sm">10:00</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-white border border-gray-200 px-2 py-0.5 text-xs font-bold text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300">2558967</span>
                  <span className="rounded-md bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">Ambiente 405</span>
                </div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Diseño Gráfico</h4>
                <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                  <User className="h-3 w-3" /> Laura Gómez
                </p>
              </div>
            </div>
          </div>

          {/* BLOQUE DERECHO: ACCIONES RÁPIDAS */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900 space-y-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">{t("dashboard.quickActions")}</h2>
              <p className="text-xs text-gray-400 dark:text-gray-500">{t("dashboard.quickActionsSubtitle")}</p>
            </div>

            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 rounded-xl bg-blue-600 p-4 text-left text-white shadow-md shadow-blue-500/10 hover:bg-blue-700 transition-colors">
                <PlusCircle className="h-5 w-5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">{t("dashboard.actionCreate")}</p>
                  <p className="text-xs text-blue-100">{t("dashboard.actionCreateSub")}</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 rounded-xl bg-emerald-600 p-4 text-left text-white shadow-md shadow-emerald-500/10 hover:bg-emerald-700 transition-colors">
                <Building2 className="h-5 w-5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">{t("dashboard.actionManageEnv")}</p>
                  <p className="text-xs text-emerald-100">{t("dashboard.actionManageEnvSub")}</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 rounded-xl bg-purple-600 p-4 text-left text-white shadow-md shadow-purple-500/10 hover:bg-purple-700 transition-colors">
                <Sliders className="h-5 w-5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">{t("dashboard.actionInstructors")}</p>
                  <p className="text-xs text-purple-100">{t("dashboard.actionInstructorsSub")}</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 rounded-xl bg-orange-600 p-4 text-left text-white shadow-md shadow-orange-500/10 hover:bg-orange-700 transition-colors">
                <CalendarDays className="h-5 w-5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">{t("dashboard.actionFiles")}</p>
                  <p className="text-xs text-orange-100">{t("dashboard.actionFilesSub")}</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 rounded-xl bg-rose-600 p-4 text-left text-white shadow-md shadow-rose-500/10 hover:bg-rose-700 transition-colors">
                <BarChart3 className="h-5 w-5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">{t("dashboard.actionReports")}</p>
                  <p className="text-xs text-rose-100">{t("dashboard.actionReportsSub")}</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 rounded-xl bg-teal-600 p-4 text-left text-white shadow-md shadow-teal-500/10 hover:bg-teal-700 transition-colors">
                <Users2 className="h-5 w-5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">{t("dashboard.actionUsers")}</p>
                  <p className="text-xs text-teal-100">{t("dashboard.actionUsersSub")}</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
