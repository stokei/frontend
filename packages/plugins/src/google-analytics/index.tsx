import Script from "next/script";

export interface GoogleAnalyticsProps {
  readonly googleKey: string;
}

export const GoogleAnalytics = ({ googleKey }: GoogleAnalyticsProps) => {
  if (!googleKey) {
    return <></>;
  }
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${googleKey}`}
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${googleKey}', {
          page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
};
