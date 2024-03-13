import {registerGlobalHook, ComponentTypes, LifecycleHooks} from '@tinijs/core';

import {TINI_APP_CONTEXT} from './consts.js';
import {
  getMetaTagContent,
  getLinkTagHref,
  changePageTitle,
  changePageLang,
  changeMetaTags,
} from './methods.js';
import {
  PageWithMetas,
  CustomizableMetas,
  AppMetas,
  PageMetas,
  MetaOptions,
} from './types.js';

export const TINI_METAS = {
  url: 'https://tinijs.dev',
  title: 'TiniJS App',
  description: 'A tiny Javascript framework.',
  image: 'https://tinijs.dev/images/featured.jpg',
  locale: 'en-US',
  lang: 'en',
  authorName: 'TiniJS',
  authorUrl: 'https://tinijs.dev/about',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  ogType: 'website',
  ogSiteName: 'TiniJS App',
  fbAppId: '000000000000000',
  twitterCard: 'summary_large_image',
  twitterCreator: '@tini_js',
  twitterSite: '@tini_js',
} as {[P in keyof AppMetas]-?: AppMetas[P]};

export function initMeta(options?: MetaOptions) {
  const meta = new Meta(options);
  // auto page metas
  if (options?.autoPageMetas) {
    registerGlobalHook(
      ComponentTypes.Page,
      LifecycleHooks.OnReady,
      ({source, appContext}) =>
        (appContext as typeof TINI_APP_CONTEXT).meta?.setPageMetas(
          (source as typeof source & PageWithMetas).metas,
          location.pathname === '/'
        )
    );
  }
  //result
  return (TINI_APP_CONTEXT.meta = meta);
}

export class Meta {
  private locale = TINI_METAS.locale;

  private suffix?: string;
  private suffixConnector?: string;
  private suffixTranslations?: Record<string, string>;
  private metas!: AppMetas;
  private metasTranslations?: Record<string, AppMetas>;

  constructor(options: MetaOptions = {}) {
    const {
      suffix,
      suffixConnector,
      suffixTranslations,
      metas,
      metasTranslations,
    } = options;
    this.suffix = suffix;
    this.suffixConnector = suffixConnector;
    this.suffixTranslations = suffixTranslations;
    this.metas = metas || this.extractDefaultMetas();
    this.metasTranslations = metasTranslations;
  }

  changeLocale(locale: string) {
    this.locale = locale;
  }

  getSuffix() {
    return (
      this.suffixTranslations?.[this.locale || TINI_METAS.locale] || this.suffix
    );
  }

  getMetas() {
    return (
      this.metasTranslations?.[this.locale || TINI_METAS.locale] || this.metas
    );
  }

  setHomeMetas() {
    return this.setPageMetas({}, true);
  }

  setPageMetas(pageMetas: PageMetas = {}, noSuffix?: boolean) {
    const customMetas: CustomizableMetas = pageMetas;
    // image
    if (!customMetas.image && pageMetas.images) {
      customMetas.image = (pageMetas.images.xl || pageMetas.images.default).src;
    }
    // author name and url
    if (
      (!customMetas.authorName || !customMetas.authorUrl) &&
      pageMetas.authors
    ) {
      const firstAuthorId = Object.keys(pageMetas.authors)[0];
      if (firstAuthorId) {
        const author = pageMetas.authors[firstAuthorId];
        // authorName
        if (!customMetas.authorName) {
          customMetas.authorName = author.name;
        }
        // authorUrl
        if (!customMetas.authorUrl) {
          customMetas.authorUrl = author.url;
        }
      }
    }
    // apply metas
    const metas = this.processMetaData(customMetas, noSuffix);
    changePageTitle(metas.title || TINI_METAS.title);
    changePageLang(metas.lang || TINI_METAS.lang);
    changeMetaTags(metas);
    // result
    return metas;
  }

  private extractDefaultMetas() {
    const url = getMetaTagContent('itemprop="url"') || TINI_METAS.url;
    const title = getMetaTagContent('itemprop="name"') || TINI_METAS.title;
    const description =
      getMetaTagContent('itemprop="description"') || TINI_METAS.description;
    const image = getMetaTagContent('itemprop="image"') || TINI_METAS.image;
    const locale =
      getMetaTagContent('itemprop="inLanguage"') || TINI_METAS.locale;
    const lang =
      document.documentElement.getAttribute('lang') ||
      locale.split('-')[0] ||
      TINI_METAS.lang;
    const authorName =
      getMetaTagContent('itemprop="author"') || TINI_METAS.authorName;
    const authorUrl = getLinkTagHref('author') || TINI_METAS.authorUrl;
    const createdAt =
      getMetaTagContent('itemprop="dateCreated"') || TINI_METAS.createdAt;
    const updatedAt =
      getMetaTagContent('itemprop="dateModified"') || TINI_METAS.updatedAt;
    const ogType = getMetaTagContent('itemprop="og:type"') || TINI_METAS.ogType;
    const ogSiteName =
      getMetaTagContent('itemprop="og:site_name"') || TINI_METAS.ogSiteName;
    const fbAppId =
      getMetaTagContent('itemprop="fb:app_id"') || TINI_METAS.fbAppId;
    const twitterCard =
      getMetaTagContent('name="twitter:card"') || TINI_METAS.twitterCard;
    const twitterCreator =
      getMetaTagContent('name="twitter:creator"') || TINI_METAS.twitterCreator;
    const twitterSite =
      getMetaTagContent('name="twitter:site"') || TINI_METAS.twitterSite;
    return {
      url,
      title,
      description,
      image,
      locale,
      lang,
      authorName,
      authorUrl,
      createdAt,
      updatedAt,
      ogType,
      ogSiteName,
      fbAppId,
      twitterCard,
      twitterCreator,
      twitterSite,
    };
  }

  private processMetaData(customMetas: CustomizableMetas, noSuffix?: boolean) {
    const appSuffix = this.getSuffix();
    const appMetas = this.getMetas();
    // custom
    const url = customMetas['url'] || location.href;
    let title = customMetas['title'] || appMetas['title'];
    // add suffix
    if (appSuffix && !noSuffix) {
      title = `${title}${this.suffixConnector || ' — '}${appSuffix}`;
    }
    const description = customMetas['description'] || appMetas['description'];
    const image = customMetas['image'] || appMetas['image'];
    const locale = customMetas['locale'] || appMetas['locale'];
    const lang =
      customMetas['lang'] || locale?.split('-')[0] || appMetas['lang'];
    const authorName = customMetas['authorName'] || appMetas['authorName'];
    const authorUrl = customMetas['authorUrl'] || appMetas['authorUrl'];
    const createdAt = customMetas['createdAt'] || appMetas['createdAt'];
    const updatedAt = customMetas['updatedAt'] || appMetas['updatedAt'];
    const ogType = customMetas['ogType'] || appMetas['ogType'];
    const twitterCard = customMetas['twitterCard'] || appMetas['twitterCard'];
    const twitterCreator =
      customMetas['twitterCreator'] || appMetas['twitterCreator'];
    // default (from index.html)
    const ogSiteName = appMetas['ogSiteName'];
    const fbAppId = appMetas['fbAppId'];
    const twitterSite = appMetas['twitterSite'];
    return {
      url,
      title,
      description,
      image,
      locale,
      lang,
      authorName,
      authorUrl,
      createdAt,
      updatedAt,
      ogType,
      ogSiteName,
      fbAppId,
      twitterCard,
      twitterCreator,
      twitterSite,
    } as AppMetas;
  }
}
