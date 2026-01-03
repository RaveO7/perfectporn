// src/app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Inter } from 'next/font/google'
import Script from 'next/script'

import './globals.css'

import Header from '../components/Header'
import MoreEighteen from '@/components/MoreEighteen'
// import ModalPub from '@/components/ModalPub';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

import { normalizeUrl } from '@/components/Utils'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.Site_URL as string),
  title: {
    absolute: '',
    default: 'Perfect Porn | The site for fulfilling your Fantasies.',
    template: '%s | Perfect Porn'
  },
  keywords: ['PerfectPorn', 'Perfect Porn', 'Watch Porn', 'Watch Free Porn', 'free porn', 'Free Porn Videos', 'free', 'more eighteen', 'sexe', 'videos sexe', 'porno videos', 'porno video', 'porno', 'pornographie', 'pornographique', 'xxx', 'perfectporn', 'perfect porn'],
  description: 'Explore diverse and high-quality content at Perfect Porn. Your ultimate destination for fulfilling fantasies.',
  applicationName: 'Perfectporn',
  authors: [{ name: "Phoenix", url: normalizeUrl(process.env.Site_URL || '') }],
  publisher: 'Phoenix',
  alternates: { canonical: normalizeUrl(process.env.Site_URL || '') },
  robots: 'max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  verification: { google: "iEbYUqh_jKgVnifPqHYfD2o2pFxUBhWVHjyFuwtl864" },
  openGraph: {
    title: "Perfect Porn - Best Free HD Porn Videos",
    description: "Perfect Porn - The best porn site with all your dream videos. Watch free HD adult content including channels, pornstars, and categories.",
    url: normalizeUrl(process.env.Site_URL || ''),
    siteName: "Perfect Porn",
    locale: "en_US",
    type: "website",
    images: [{
      url: '/opengraph-image.png',
      alt: 'Image of Perfect Porn the site for fulfilling your Fantasies.',
      width: 1200,
      height: 630,
      type: "image/png"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Perfect Porn - Best Free HD Porn Videos",
    description: "Perfect Porn - The best porn site with all your dream videos. Watch free HD adult content.",
    images: ['/opengraph-image.png'],
  },
  other: {
    "6a97888e-site-verification": "07bc72bd8d75f7e97c8be4156fee565a",
  }
}

export const viewport: Viewport = {
  themeColor: 'black',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Next gère automatiquement les meta tags via `export const metadata` */}
      </head>

      <body className={inter.className} suppressHydrationWarning={true}>
        {/* Analytics/components React dans le body — OK */}
        <GoogleAnalytics gaId="G-BCSQYEJTZZ" />
        <SpeedInsights />
        <Analytics />

        <MoreEighteen />
        {/* <ModalPub /> */}

        <main className="flex min-h-screen flex-col items-center">
          <Header />
          <section className="w-full mt-[72px] py-6 lg:px-12 min-h-[calc(100vh-92px)] ">
            {children}
          </section>
          <Footer />
        </main>

        {/* PopMagic / script tiers : on passe par next/script pour l'inline safely */}
        <Script id="popmagic-inline" strategy="afterInteractive">
          {`(function() {
    function randStr(e,t){for(var n="",r=t||"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",o=0;o<e;o++)n+=r.charAt(Math.floor(Math.random()*r.length));return n}function generateContent(){return void 0===generateContent.val&&(generateContent.val="document.dispatchEvent("+randStr(4*Math.random()+3)+");"),generateContent.val}try{Object.defineProperty(document.currentScript,"innerHTML",{get:generateContent}),Object.defineProperty(document.currentScript,"textContent",{get:generateContent})}catch(e){};

    //version 7.0.0

    var adConfig = {
    "ads_host": "a.pemsrv.com",
    "syndication_host": "s.pemsrv.com",
    "idzone": 5819994,
    "popup_fallback": false,
    "popup_force": false,
    "chrome_enabled": true,
    "new_tab": false,
    "frequency_period": 1440,
    "frequency_count": 1,
    "trigger_method": 3,
    "trigger_class": "",
    "trigger_delay": 0,
    "capping_enabled": true,
    "tcf_enabled": true,
    "only_inline": false
};

window.document.querySelectorAll||(document.querySelectorAll=document.body.querySelectorAll=Object.querySelectorAll=function(e,o,t,i,n){var r=document,a=r.createStyleSheet();for(n=r.all,o=[],t=(e=e.replace(/\\[for\\b/gi,"[htmlFor").split(",")).length;t--;){for(a.addRule(e[t],"k:v"),i=n.length;i--;)n[i].currentStyle.k&&o.push(n[i]);a.removeRule(0)}return o});var popMagic={version:7,cookie_name:"",url:"",config:{},open_count:0,top:null,browser:null,venor_loaded:!1,venor:!1,tcfData:null,configTpl:{ads_host:"",syndication_host:"",idzone:"",frequency_period:720,frequency_count:1,trigger_method:1,trigger_class:"",popup_force:!1,popup_fallback:!1,chrome_enabled:!0,new_tab:!1,cat:"",tags:"",el:"",sub:"",sub2:"",sub3:"",only_inline:!1,trigger_delay:0,capping_enabled:!0,tcf_enabled:!1,cookieconsent:!0,should_fire:function(){return!0},on_redirect:null},init:function(e){if(void 0!==e.idzone&&e.idzone){void 0===e.customTargeting&&(e.customTargeting=[]),window.customTargeting=e.customTargeting||null;var o=Object.keys(e.customTargeting).filter(function(e){return e.search("ex_")>=0});for(var t in o.length&&o.forEach(function(e){return this.configTpl[e]=null}.bind(this)),this.configTpl)Object.prototype.hasOwnProperty.call(this.configTpl,t)&&(void 0!==e[t]?this.config[t]=e[t]:this.config[t]=this.configTpl[t]);if(void 0!==this.config.idzone&&""!==this.config.idzone){!0!==this.config.only_inline&&this.loadHosted();var i=this;this.checkTCFConsent(function(){"complete"===document.readyState?i.preparePopWait():i.addEventToElement(window,"load",i.preparePop)})}}},getCountFromCookie:function(){if(!this.config.cookieconsent)return 0;var e=popMagic.getCookie(popMagic.cookie_name),o=void 0===e?0:parseInt(e);return isNaN(o)&&(o=0),o},getLastOpenedTimeFromCookie:function(){var e=popMagic.getCookie(popMagic.cookie_name),o=null;if(void 0!==e){var t=e.split(";")[1];o=t>0?parseInt(t):0}return isNaN(o)&&(o=null),o},shouldShow:function(e){if(e=e||!1,!popMagic.config.capping_enabled){var o=!0,t=popMagic.config.should_fire;try{e||"function"!=typeof t||(o=Boolean(t()))}catch(e){console.error("Error executing should fire callback function:",e)}return o&&0===popMagic.open_count}if(popMagic.open_count>=popMagic.config.frequency_count)return!1;var i=popMagic.getCountFromCookie(),n=popMagic.getLastOpenedTimeFromCookie(),r=Math.floor(Date.now()/1e3),a=n+popMagic.config.trigger_delay;return!(n&&a>r)&&(popMagic.open_count=i,!(i>=popMagic.config.frequency_count))},venorShouldShow:function(){return popMagic.venor_loaded&&"0"===popMagic.venor},setAsOpened:function(e){var o=e?e.target||e.srcElement:null,t={id:"",tagName:"",classes:"",text:"",href:"",elm:""};void 0!==o&&null!=o&&(t={id:void 0!==o.id&&null!=o.id?o.id:"",tagName:void 0!==o.tagName&&null!=o.tagName?o.tagName:"",classes:void 0!==o.classList&&null!=o.classList?o.classList:"",text:void 0!==o.outerText&&null!=o.outerText?o.outerText:"",href:void 0!==o.href&&null!=o.href?o.href:"",elm:o});var i=new CustomEvent("creativeDisplayed-"+popMagic.config.idzone,{detail:t});if(document.dispatchEvent(i),popMagic.config.capping_enabled){var n=1;n=0!==popMagic.open_count?popMagic.open_count+1:popMagic.getCountFromCookie()+1;var r=Math.floor(Date.now()/1e3);popMagic.config.cookieconsent&&popMagic.setCookie(popMagic.cookie_name,n+";"+r,popMagic.config.frequency_period)}else++popMagic.open_count},loadHosted:function(){var e=document.createElement("script");for(var o in e.type="application/javascript",e.async=!0,e.src="//"+this.config.ads_host+"/popunder1000.js",e.id="popmagicldr",this.config)Object.prototype.hasOwnProperty.call(this.config,o)&&"ads_host"!==o&&"syndication_host"!==o&&e.setAttribute("data-exo-"+o,this.config[o]);var t=document.getElementsByTagName("body").item(0);t.firstChild?t.insertBefore(e,t.firstChild):t.appendChild(e)},preparePopWait:function(){setTimeout(popMagic.preparePop,400)},preparePop:function(){if("object"!=typeof exoJsPop101||!Object.prototype.hasOwnProperty.call(exoJsPop101,"add")){if(popMagic.top=self,popMagic.top!==self)try{top.document.location.toString()&&(popMagic.top=top)}catch(e){}if(popMagic.cookie_name="zone-cap-"+popMagic.config.idzone,popMagic.config.capping_enabled||(document.cookie=popMagic.cookie_name+"=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/"),popMagic.shouldShow(!0)){var e=new XMLHttpRequest;e.onreadystatechange=function(){e.readyState==XMLHttpRequest.DONE&&(popMagic.venor_loaded=!0,200==e.status?popMagic.venor=e.responseText:popMagic.venor="0")};var o="https:"!==document.location.protocol&&"http:"!==document.location.protocol?"https:":document.location.protocol;e.open("GET",o+"//"+popMagic.config.syndication_host+"/venor.php",!0);try{e.send()}catch(e){popMagic.venor_loaded=!0}}if(popMagic.buildUrl(),popMagic.browser=popMagic.browserDetector.getBrowserInfo(),popMagic.config.chrome_enabled||!popMagic.browser.isChrome){var t=popMagic.getPopMethod(popMagic.browser);popMagic.addEvent("click",t)}}},getPopMethod:function(e){return popMagic.config.popup_force||popMagic.config.popup_fallback&&e.isChrome&&e.version>=68&&!e.isMobile?popMagic.methods.popup:e.isMobile?popMagic.methods.default:e.isChrome?popMagic.methods.chromeTab:popMagic.methods.default},checkTCFConsent:function(e){if(this.config.tcf_enabled&&"function"==typeof window.__tcfapi){var o=this;window.__tcfapi("addEventListener",2,function(t,i){i&&(o.tcfData=t,"tcloaded"!==t.eventStatus&&"useractioncomplete"!==t.eventStatus||(window.__tcfapi("removeEventListener",2,function(){},t.listenerId),e()))})}else e()},buildUrl:function(){var e,o="https:"!==document.location.protocol&&"http:"!==document.location.protocol?"https:":document.location.protocol,t=top===self?document.URL:document.referrer,i={type:"inline",name:"popMagic",ver:this.version},n="";customTargeting&&Object.keys(customTargeting).length&&("object"==typeof customTargeting?Object.keys(customTargeting):customTargeting).forEach(function(o){"object"==typeof customTargeting?e=customTargeting[o]:Array.isArray(customTargeting)&&(e=scriptEl.getAttribute(o));var t=o.replace("data-exo-","");n+="&"+t+"="+e});var r=this.tcfData&&this.tcfData.gdprApplies&&!0===this.tcfData.gdprApplies?1:0;this.url=o+"//"+this.config.syndication_host+"/v1/link.php?cat="+this.config.cat+"&idzone="+this.config.idzone+"&type=8&p="+encodeURIComponent(t)+"&sub="+this.config.sub+(""!==this.config.sub2?"&sub2="+this.config.sub2:"")+(""!==this.config.sub3?"&sub3="+this.config.sub3:"")+"&block=1&el="+this.config.el+"&tags="+this.config.tags+"&scr_info="+function(e){var o=e.type+"|"+e.name+"|"+e.ver;return encodeURIComponent(btoa(o))}(i)+n+"&gdpr="+r+"&cb="+Math.floor(1e9*Math.random()),this.tcfData&&this.tcfData.tcString?this.url+="&gdpr_consent="+encodeURIComponent(this.tcfData.tcString):this.url+="&cookieconsent="+this.config.cookieconsent},addEventToElement:function(e,o,t){e.addEventListener?e.addEventListener(o,t,!1):e.attachEvent?(e["e"+o+t]=t,e[o+t]=function(){e["e"+o+t](window.event)},e.attachEvent("on"+o,e[o+t])):e["on"+o]=e["e"+o+t"]},getTriggerClasses:function(){var e,o=[];-1===popMagic.config.trigger_class.indexOf(",")?e=popMagic.config.trigger_class.split(" "):e=popMagic.config.trigger_class.replace(/\\s/g,"").split(",");for(var t=0;t<e.length;t++)""!==e[t]&&o.push("."+e[t]);return o},addEvent:function(e,o){var t;if("3"!=popMagic.config.trigger_method)if("2"!=popMagic.config.trigger_method||""==popMagic.config.trigger_class)if("4"!=popMagic.config.trigger_method||""==popMagic.config.trigger_class)if("5"!=popMagic.config.trigger_method||""==popMagic.config.trigger_class)popMagic.addEventToElement(document,e,o);else{var i="a"+popMagic.getTriggerClasses().map(function(e){return":not("+e+")"}).join("");t=document.querySelectorAll(i);for(var n=0;n<t.length;n++)popMagic.addEventToElement(t[n],e,o)}else{var r=popMagic.getTriggerClasses();popMagic.addEventToElement(document,e,function(e){r.some(function(o){return null!==e.target.closest(o)})||o.call(e.target,e)})}else{var a=popMagic.getTriggerClasses();for(t=document.querySelectorAll(a.join(", ")),n=0;n<t.length;n++)popMagic.addEventToElement(t[n],e,o)}else for(t=document.querySelectorAll("a"),n=0;n<t.length;n++)popMagic.addEventToElement(t[n],e,o)},setCookie:function(e,o,t){if(!this.config.cookieconsent)return!1;t=parseInt(t,10);var i=new Date;i.setMinutes(i.getMinutes()+parseInt(t));var n=encodeURIComponent(o)+"; expires="+i.toUTCString()+"; path=/";document.cookie=e+"="+n},getCookie:function(e){if(!this.config.cookieconsent)return!1;var o,t,i,n=document.cookie.split(";");for(o=0;o<n.length;o++)if(t=n[o].substr(0,n[o].indexOf("=")),i=n[o].substr(n[o].indexOf("=")+1),(t=t.replace(/^\\s+|\\s+$/g,""))===e)return decodeURIComponent(i)},randStr:function(e,o){for(var t="",i=o||"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=0;n<e;n++)t+=i.charAt(Math.floor(Math.random()*i.length));return t},isValidUserEvent:function(e){return!(!("isTrusted"in e)||!e.isTrusted||"ie"===popMagic.browser.name||"safari"===popMagic.browser.name)||0!=e.screenX&&0!=e.screenY},isValidHref:function(e){if(void 0===e||""==e)return!1;return!/\\s?javascript\\s?:/i.test(e)},findLinkToOpen:function(e){var o=e,t=!1;try{for(var i=0;i<20&&!o.getAttribute("href")&&o!==document&&"html"!==o.nodeName.toLowerCase();)o=o.parentNode,i++;var n=o.getAttribute("target");n&&-1!==n.indexOf("_blank")||(t=o.getAttribute("href"))}catch(e){}return popMagic.isValidHref(t)||(t=!1),t||window.location.href},getPuId:function(){return"ok_"+Math.floor(89999999*Math.random()+1e7)},executeOnRedirect:function(){try{popMagic.config.capping_enabled||"function"!=typeof popMagic.config.on_redirect||popMagic.config.on_redirect()}catch(e){console.error("Error executing on redirect callback:",e)}},browserDetector:{browserDefinitions:[["firefox",/Firefox\\/([0-9.]+)(?:\\s|$)/],["opera",/Opera\\/([0-9.]+)(?:\\s|$)/],["opera",/OPR\\/([0-9.]+)(:?\\s|$)$/],["edge",/Edg(?:e|)\\/([0-9._]+)/],["ie",/Trident\\/7\\.0.*rv:([0-9.]+)\\).*Gecko$/],["ie",/MSIE\\s([0-9.]+);.*Trident\\/[4-7].0/],["ie",/MSIE\\s(7\\.0)/],["safari",/Version\\/([0-9._]+).*Safari/],["chrome",/(?!Chrom.*Edg(?:e|))Chrom(?:e|ium)\\/([0-9.]+)(:?\\s|$)/],["chrome",/(?!Chrom.*OPR)Chrom(?:e|ium)\\/([0-9.]+)(:?\\s|$)/],["bb10",/BB10;\\sTouch.*Version\\/([0-9.]+)/],["android",/Android\\s([0-9.]+)/],["ios",/Version\\/([0-9._]+).*Mobile.*Safari.*/],["yandexbrowser",/YaBrowser\\/([0-9._]+)/],["crios",/CriOS\\/([0-9.]+)(:?\\s|$)/]],isChromeOrChromium:function(){var e=window.navigator,o=(e.userAgent||"").toLowerCase(),t=e.vendor||"";if(-1!==o.indexOf("crios"))return!0;if(e.userAgentData&&Array.isArray(e.userAgentData.brands)&&e.userAgentData.brands.length>0){var i=e.userAgentData.brands,n=i.some(function(e){return"Google Chrome"===e.brand}),r=i.some(function(e){return"Chromium"===e.brand})&&2===i.length;return n||r}var a=!!window.chrome,c=-1!==o.indexOf("edg"),p=!!window.opr||-1!==o.indexOf("opr"),s=!(!e.brave||!e.brave.isBrave),g=-1!==o.indexOf("vivaldi"),l=-1!==o.indexOf("yabrowser"),d=-1!==o.indexOf("samsungbrowser"),u=-1!==o.indexOf("ucbrowser");return a&&"Google Inc."===t&&!c&&!p&&!s&&!g&&!l&&!d&&!u},getBrowserInfo:function(){var e=window.navigator.userAgent,o={name:"other",version:"1.0",versionNumber:1,isChrome:this.isChromeOrChromium(),isMobile:!!e.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WebOS|Windows Phone/i)};for(var t in this.browserDefinitions){var i=this.browserDefinitions[t];if(i[1].test(e)){var n=i[1].exec(e),r=n&&n[1].split(/[._]/).slice(0,3),a=Array.prototype.slice.call(r,1).join("")||"0";r&&r.length<3&&Array.prototype.push.apply(r,1===r.length?[0,0]:[0]),o.name=i[0],o.version=r.join("."),o.versionNumber=parseFloat(r[0]+"
`}
        </Script>
      </body>
    </html>
  )
}
