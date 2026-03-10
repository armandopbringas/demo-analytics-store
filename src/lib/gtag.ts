export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

type GtagParams = Record<string, unknown>;

export function gtagEvent(name: string, params?: GtagParams) {
  if (typeof window === 'undefined') return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gtag = (window as any).gtag as ((...args: unknown[]) => void) | undefined;
  gtag?.('event', name, params ?? {});
}
