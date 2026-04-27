import Script from "next/script";

export default function AdsTest() {
    return (
        <>
            <Script async src="https://a.magsrv.com/ad-provider.js" />
            <ins className="eas6a97888e2" data-zoneid="5909908"></ins>
            <Script id="adprovider-serve">{`
              (window.AdProvider = window.AdProvider || []).push({ serve: {} });
            `}</Script>
        </>
    )
}
