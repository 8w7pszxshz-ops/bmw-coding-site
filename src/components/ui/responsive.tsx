import { useIsMobile, useIsDesktop } from '@/hooks/useMediaQuery';

interface ResponsiveProps {
  children: React.ReactNode;
}

export function MobileOnly({ children }: ResponsiveProps) {
  const isMobile = useIsMobile();
  return isMobile ? <>{children}</> : null;
}

export function DesktopOnly({ children }: ResponsiveProps) {
  const isDesktop = useIsDesktop();
  return isDesktop ? <>{children}</> : null;
}

interface AdaptiveProps {
  mobile: React.ReactNode;
  desktop: React.ReactNode;
}

export function Adaptive({ mobile, desktop }: AdaptiveProps) {
  const isMobile = useIsMobile();
  return <>{isMobile ? mobile : desktop}</>;
}
