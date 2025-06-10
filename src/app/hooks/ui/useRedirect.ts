import { useNavigate } from "react-router-dom";

type RedirectOptions = {
  scroll?: boolean;
  scrollBehavior?: ScrollBehavior;
  scrollTop?: number;
};

export const useRedirect = () => {
  const navigate = useNavigate();

  const redirect = (to?: string, options: RedirectOptions = {}) => {
    const { scroll = true, scrollBehavior = "smooth", scrollTop = 0 } = options;

    if (to) {
      navigate(to);

      if (scroll) {
        setTimeout(() => {
          window.scrollTo({ top: scrollTop, behavior: scrollBehavior });
        }, 0);
      }
    }
  };

  return redirect;
};
