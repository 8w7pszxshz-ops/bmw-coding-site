import { usePullToRefresh } from '@/hooks/usePullToRefresh';
import Icon from '@/components/ui/icon';
import { MobileOnly } from '@/components/ui/responsive';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}

export default function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const { isPulling, pullDistance, isRefreshing } = usePullToRefresh({ onRefresh });

  return (
    <>
      <MobileOnly>
        <div
          className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center transition-all duration-300"
          style={{
            height: `${pullDistance}px`,
            opacity: pullDistance > 0 ? 1 : 0,
            background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.1), transparent)',
          }}
        >
          {isRefreshing ? (
            <div className="w-6 h-6 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin" />
          ) : (
            <Icon
              name="ArrowDown"
              className={`w-6 h-6 text-blue-400 transition-transform duration-300 ${
                isPulling ? 'rotate-180' : ''
              }`}
            />
          )}
        </div>
      </MobileOnly>
      {children}
    </>
  );
}
