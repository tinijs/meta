export interface MetaOptions {
  suffix?: string;
  suffixTranslations?: Record<string, string>;
  metas?: AppMetas;
  metasTranslations?: Record<string, AppMetas>;
  suffixConnector?: string;
}

export interface MetaTagDefinition {
  charset?: string;
  content?: string;
  httpEquiv?: string;
  id?: string;
  itemprop?: string;
  name?: string;
  property?: string;
  scheme?: string;
  url?: string;
  [prop: string]: undefined | string;
}

export interface CustomizableMetas {
  url?: string;
  title?: string;
  description?: string;
  image?: string;
  locale?: string;
  lang?: string;
  authorName?: string;
  authorUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  ogType?: string;
  twitterCard?: string;
  twitterCreator?: string;
}

export interface AppMetas extends CustomizableMetas {
  ogSiteName?: string;
  fbAppId?: string;
  twitterSite?: string;
}

export interface PageMetas extends CustomizableMetas {
  images?: Record<string, {name: string; src: string}>;
  authors?: Record<string, {name: string; url: string}>;
}

export interface MetaTranslations {
  [locale: string]: AppMetas;
}
