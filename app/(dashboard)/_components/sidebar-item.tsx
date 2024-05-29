
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * Interface para as propriedades do componente SidebarItem.
 * @property {LucideIcon} icon - O ícone a ser exibido no item de navegação.
 * @property {string} label - O texto a ser exibido ao lado do ícone.
 * @property {string} href - A rota para a qual o usuário será redirecionado ao clicar no item.
 */
interface SidebarItemProps {
  icon: LucideIcon,
  label: string;
  href: string
};

/**
 * Componente SidebarItem.
 * Renderiza um item de navegação com um ícone, rótulo e redireciona o usuário para uma rota especificada ao clicar.
 *
 * @param {SidebarItemProps} props - As propriedades do componente.
 * @returns {JSX.Element} O elemento JSX para o item de navegação.
 */
export const SidebarItem = ({
  icon: Icon,
  label,
  href
}: SidebarItemProps): JSX.Element => {

  // Obtém o pathname atual usando usePathname do Next.js
  const pathname = usePathname();
  // Obtém o objeto router usando useRouter do Next.js
  const router = useRouter();

  /**
   * Verifica se a rota atual é ativa.
   * @returns {boolean} Verdadeiro se a rota atual for ativa, falso caso contrário.
   */
  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  /**
   * Manipulador de clique que redireciona para a rota especificada.
   */
  const onClick = () => {
    router.push(href);
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 h-full dark:text-white dark:hover:text-vermelho-vinho dark:hover:bg-slate-500",
        isActive && "text-dark-color bg-dark-color/10 hover:bg-dark-color/20 hover:text-vermelho-vinho"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-slate-500 dark:text-white ",
            isActive && "text-dark-color "
          )}
        />
        <span>{label}</span>
      </div>

      <div className={cn(
        "ml-auto opacity-0 border-2 border-dark-color h-full transition-all dark:border-white",
        isActive && "opacity-100"
      )}></div>

    </button>
  );
};

