export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Access = {
  __typename?: 'Access';
  active?: Maybe<Scalars['Boolean']>;
  app?: Maybe<App>;
  canceledAt?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  expiresIn?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
};

export type Accesses = {
  __typename?: 'Accesses';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<Access>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Account = {
  __typename?: 'Account';
  app: App;
  avatar?: Maybe<Image>;
  canceledAt?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  email: Scalars['String'];
  firstname: Scalars['String'];
  fullname: Scalars['String'];
  id: Scalars['ID'];
  isAdmin?: Maybe<Scalars['Boolean']>;
  isInstructor?: Maybe<Scalars['Boolean']>;
  isOwner?: Maybe<Scalars['Boolean']>;
  isStokei: Scalars['Boolean'];
  lastname: Scalars['String'];
  pagarmeCustomer?: Maybe<Scalars['String']>;
  roles?: Maybe<Roles>;
  status: AccountStatus;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
  username: Scalars['String'];
};


export type AccountRolesArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllRolesInput>;
  page?: InputMaybe<PaginationInput>;
};

export enum AccountStatus {
  Active = 'ACTIVE',
  Blocked = 'BLOCKED',
  Canceled = 'CANCELED',
  ConfigurationPending = 'CONFIGURATION_PENDING',
  Inactive = 'INACTIVE'
}

export type Accounts = {
  __typename?: 'Accounts';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<Account>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type ActivatePriceInput = {
  price: Scalars['String'];
};

export type ActivateSubscriptionContractInput = {
  subscriptionContract: Scalars['String'];
};

export type Address = {
  __typename?: 'Address';
  app?: Maybe<App>;
  city: Scalars['String'];
  complement?: Maybe<Scalars['String']>;
  country: Scalars['String'];
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  default: Scalars['Boolean'];
  id: Scalars['ID'];
  number: Scalars['String'];
  postalCode: Scalars['String'];
  state: Scalars['String'];
  street: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
};

export type Addresses = {
  __typename?: 'Addresses';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<Address>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type App = {
  __typename?: 'App';
  activatedAt?: Maybe<Scalars['String']>;
  active: Scalars['Boolean'];
  avatar?: Maybe<Image>;
  blockedAt?: Maybe<Scalars['String']>;
  colors?: Maybe<Colors>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  currency: Currency;
  currentSubscriptionContract?: Maybe<SubscriptionContract>;
  deactivatedAt?: Maybe<Scalars['String']>;
  defaultDomain?: Maybe<Domain>;
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  icon?: Maybe<Image>;
  id: Scalars['ID'];
  isIntegratedWithPix: Scalars['Boolean'];
  isIntegratedWithStripe: Scalars['Boolean'];
  isStokei: Scalars['Boolean'];
  logo?: Maybe<Image>;
  name: Scalars['String'];
  phones?: Maybe<Phones>;
  slug: Scalars['String'];
  status: AppStatus;
  stokeiDomain?: Maybe<Domain>;
  stripeAccount?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
};


export type AppColorsArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllColorsInput>;
  page?: InputMaybe<PaginationInput>;
};


export type AppPhonesArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllPhonesInput>;
  page?: InputMaybe<PaginationInput>;
};

export enum AppStatus {
  Active = 'ACTIVE',
  Blocked = 'BLOCKED',
  Inactive = 'INACTIVE'
}

export type Apps = {
  __typename?: 'Apps';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<App>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String'];
  account: MeAccount;
  prefixToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type Billing = {
  __typename?: 'Billing';
  currency?: Maybe<Currency>;
  items?: Maybe<Array<BillingItem>>;
  total?: Maybe<Scalars['Float']>;
};

export type BillingItem = {
  __typename?: 'BillingItem';
  price?: Maybe<Price>;
  quantity?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
  unitAmount?: Maybe<Scalars['Float']>;
};

export enum BillingScheme {
  PerUnit = 'PER_UNIT',
  Tiered = 'TIERED'
}

export type CancelSubscriptionContractInput = {
  subscriptionContract: Scalars['String'];
};

export type Catalog = {
  __typename?: 'Catalog';
  app?: Maybe<App>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  id: Scalars['ID'];
  items?: Maybe<CatalogItems>;
  parent: Scalars['String'];
  subtitle?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
};


export type CatalogItemsArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllCatalogItemsInput>;
  page?: InputMaybe<PaginationInput>;
};

export type CatalogItem = {
  __typename?: 'CatalogItem';
  app?: Maybe<App>;
  catalog: Scalars['String'];
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  id: Scalars['ID'];
  product: Product;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
};

export type CatalogItems = {
  __typename?: 'CatalogItems';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<CatalogItem>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Catalogs = {
  __typename?: 'Catalogs';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<Catalog>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type ChangeFromSortedItemToSortedItemInput = {
  fromItem: Scalars['String'];
  toItem: Scalars['String'];
};

export type ChangeFromSortedItemToSortedItemResponse = {
  __typename?: 'ChangeFromSortedItemToSortedItemResponse';
  fromItem?: Maybe<SortedItem>;
  toItem?: Maybe<SortedItem>;
};

export type ChangePasswordInput = {
  code: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Checkout = {
  __typename?: 'Checkout';
  order: Order;
  payment?: Maybe<Payment>;
  pix?: Maybe<CheckoutPix>;
  url?: Maybe<Scalars['String']>;
};

export type CheckoutPix = {
  __typename?: 'CheckoutPix';
  copyAndPaste: Scalars['String'];
  qrCodeURL: Scalars['String'];
};

export type Color = {
  __typename?: 'Color';
  app?: Maybe<App>;
  color: Scalars['String'];
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  id: Scalars['ID'];
  themeMode: ThemeMode;
  type: ColorType;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
};

export enum ColorType {
  Error = 'ERROR',
  Heading = 'HEADING',
  Info = 'INFO',
  Primary = 'PRIMARY',
  Secondary = 'SECONDARY',
  Success = 'SUCCESS',
  Text = 'TEXT',
  Warning = 'WARNING'
}

export type Colors = {
  __typename?: 'Colors';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<Color>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type CompleteAccountConfigurationInput = {
  account: Scalars['String'];
  password: Scalars['String'];
};

export type Course = {
  __typename?: 'Course';
  active: Scalars['Boolean'];
  app?: Maybe<App>;
  avatar?: Maybe<Image>;
  canceledAt?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  instructors?: Maybe<CourseInstructors>;
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
};


export type CourseInstructorsArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllAccountsInput>;
  page?: InputMaybe<PaginationInput>;
};

export type CourseInstructor = {
  __typename?: 'CourseInstructor';
  app?: Maybe<App>;
  course?: Maybe<Course>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  id: Scalars['ID'];
  instructor: Account;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
};

export type CourseInstructors = {
  __typename?: 'CourseInstructors';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<CourseInstructor>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type CourseStudent = {
  __typename?: 'CourseStudent';
  app?: Maybe<App>;
  course?: Maybe<Course>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  id: Scalars['ID'];
  student?: Maybe<Account>;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
};

export type CourseStudents = {
  __typename?: 'CourseStudents';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<CourseStudent>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Courses = {
  __typename?: 'Courses';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<Course>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type CreateAccountInput = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
};

export type CreateAccountPagarmeCustomerInput = {
  cpf: Scalars['String'];
  dateBirthday: Scalars['String'];
  phone: CreatePhoneInput;
};

export type CreateAddressInput = {
  city: Scalars['String'];
  complement?: InputMaybe<Scalars['String']>;
  country: Scalars['String'];
  number: Scalars['String'];
  parent: Scalars['String'];
  postalCode: Scalars['String'];
  state: Scalars['String'];
  street: Scalars['String'];
};

export type CreateAppInput = {
  currency: Scalars['String'];
  email: Scalars['String'];
  language: Scalars['String'];
  name: Scalars['String'];
};

export type CreateAppPagarmeAccountInput = {
  defaultBankAccount: CreateAppPagarmeDefaultBankAccountInput;
  document: Scalars['String'];
  documentType: PagarmeAccountType;
};

export type CreateAppPagarmeDefaultBankAccountInput = {
  accountCheckDigit: Scalars['String'];
  accountNumber: Scalars['String'];
  bank: Scalars['String'];
  bankAccountType: PagarmeBankAccountType;
  branchCheckDigit: Scalars['String'];
  branchNumber: Scalars['String'];
  holderDocument: Scalars['String'];
  holderName: Scalars['String'];
  holderType: PagarmeAccountType;
};

export type CreateCatalogInput = {
  parent: Scalars['String'];
  subtitle?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type CreateCatalogItemInput = {
  catalog: Scalars['String'];
  product: Scalars['String'];
};

export type CreateCheckoutInput = {
  order: Scalars['String'];
  paymentMethodType: PaymentMethodType;
};

export type CreateColorInput = {
  color: Scalars['String'];
  parent: Scalars['String'];
  themeMode: ThemeMode;
  type: ColorType;
};

export type CreateCourseInput = {
  avatar?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  parent: Scalars['String'];
};

export type CreateCourseInstructorInput = {
  course: Scalars['String'];
  instructor: Scalars['String'];
};

export type CreateCourseStudentInput = {
  course: Scalars['String'];
  student: Scalars['String'];
};

export type CreateCurrencyInput = {
  id: Scalars['String'];
  minorUnit: Scalars['Int'];
  name: Scalars['String'];
  symbol: Scalars['String'];
};

export type CreateCustomerPortalSessionInput = {
  customer?: InputMaybe<Scalars['String']>;
  returnUrl: Scalars['String'];
};

export type CreateDomainInput = {
  default?: InputMaybe<Scalars['Boolean']>;
  language: Scalars['String'];
  name: Scalars['String'];
  parent: Scalars['String'];
};

export type CreateFeatureInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  parent: Scalars['String'];
};

export type CreateFileByAdminInput = {
  duration?: InputMaybe<Scalars['Float']>;
  extension?: InputMaybe<Scalars['String']>;
  mimetype?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Float']>;
  url?: InputMaybe<Scalars['String']>;
};

export type CreateFileDownloadUrlInput = {
  file: Scalars['String'];
};

export type CreateFileUploadUrlResponse = {
  __typename?: 'CreateFileUploadURLResponse';
  file: File;
  uploadURL: Scalars['String'];
};

export type CreateHeroInput = {
  backgroundImage?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  parent: Scalars['String'];
  subtitle?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  titleHighlight?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<HeroType>;
  video?: InputMaybe<Scalars['String']>;
};

export type CreateImageInput = {
  file: Scalars['String'];
};

export type CreateLanguageInput = {
  icon?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
};

export type CreateMaterialInput = {
  avatar?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  file: Scalars['String'];
  free?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  parent: Scalars['String'];
};

export type CreateModuleInput = {
  name: Scalars['String'];
  parent: Scalars['String'];
};

export type CreateOrUpdateColorInput = {
  color: Scalars['String'];
  parent: Scalars['String'];
  themeMode: ThemeMode;
  type: ColorType;
};

export type CreateOrderInput = {
  items: Array<CreateOrderItemInput>;
};

export type CreateOrderItemInput = {
  price: Scalars['String'];
};

export type CreatePaymentMethodInput = {
  stripePaymentMethod: Scalars['String'];
};

export type CreatePhoneInput = {
  areaCode: Scalars['String'];
  countryCode: Scalars['String'];
  number: Scalars['String'];
  parent?: InputMaybe<Scalars['String']>;
};

export type CreatePlanInput = {
  icon?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  type: PlanType;
};

export type CreatePriceInput = {
  amount?: InputMaybe<Scalars['Int']>;
  automaticRenew?: InputMaybe<Scalars['Boolean']>;
  billingScheme: BillingScheme;
  defaultPrice?: InputMaybe<Scalars['Boolean']>;
  fromAmount?: InputMaybe<Scalars['Int']>;
  inventoryType: InventoryType;
  nickname?: InputMaybe<Scalars['String']>;
  parent: Scalars['String'];
  quantity?: InputMaybe<Scalars['Int']>;
  recurring?: InputMaybe<CreateRecurringInput>;
  tiers?: InputMaybe<Array<CreatePriceTierInput>>;
  tiersMode: TiersMode;
  type: PriceType;
  unit?: InputMaybe<Scalars['String']>;
};

export type CreatePriceTierInput = {
  amount: Scalars['Int'];
  infinite: Scalars['Boolean'];
  upTo?: InputMaybe<Scalars['Int']>;
};

export type CreateProductInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  parent: Scalars['String'];
};

export type CreateRecurringInput = {
  interval: IntervalType;
  intervalCount: Scalars['Int'];
  usageType: UsageType;
};

export type CreateSortedItemInput = {
  item: Scalars['String'];
  parent: Scalars['String'];
};

export type CreateSubscriptionContractInput = {
  endAt?: InputMaybe<Scalars['String']>;
  items?: InputMaybe<Array<CreateSubscriptionContractItemInput>>;
  parent: Scalars['String'];
  startAt?: InputMaybe<Scalars['String']>;
  type: SubscriptionContractType;
};

export type CreateSubscriptionContractItemInput = {
  product: Scalars['String'];
  quantity: Scalars['Float'];
  recurring?: InputMaybe<CreateRecurringInput>;
};

export type CreateVideoAuthorInput = {
  author: Scalars['String'];
  video: Scalars['String'];
};

export type CreateVideoInput = {
  description?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Float']>;
  file?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  parent: Scalars['String'];
  poster?: InputMaybe<Scalars['String']>;
  private?: InputMaybe<Scalars['Boolean']>;
};

export type CreateVideoViewInput = {
  video: Scalars['String'];
};

export type Currencies = {
  __typename?: 'Currencies';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<Currency>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Currency = {
  __typename?: 'Currency';
  activatedAt?: Maybe<Scalars['String']>;
  active: Scalars['Boolean'];
  app?: Maybe<App>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  deactivatedAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  minorUnit: Scalars['Int'];
  name: Scalars['String'];
  symbol: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
};

export type CustomerPortalSession = {
  __typename?: 'CustomerPortalSession';
  id: Scalars['ID'];
  url: Scalars['String'];
};

export type DeactivatePriceInput = {
  price: Scalars['String'];
};

export type Domain = {
  __typename?: 'Domain';
  activatedAt?: Maybe<Scalars['String']>;
  active: Scalars['Boolean'];
  app?: Maybe<App>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  free: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  parent: Scalars['String'];
  status: DomainStatus;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
  url?: Maybe<Scalars['String']>;
};

export enum DomainStatus {
  Active = 'ACTIVE',
  Error = 'ERROR',
  Pending = 'PENDING'
}

export type Domains = {
  __typename?: 'Domains';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<Domain>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Feature = {
  __typename?: 'Feature';
  app?: Maybe<App>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  parent: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
};

export type Features = {
  __typename?: 'Features';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<Feature>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type File = {
  __typename?: 'File';
  active: Scalars['Boolean'];
  app?: Maybe<App>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  duration?: Maybe<Scalars['Float']>;
  extension?: Maybe<Scalars['String']>;
  filename: Scalars['String'];
  id: Scalars['ID'];
  mimetype?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
  status: FileStatus;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
  url?: Maybe<Scalars['String']>;
};

export enum FileStatus {
  Active = 'ACTIVE',
  Encoding = 'ENCODING',
  Error = 'ERROR',
  Pending = 'PENDING'
}

export type ForgotPasswordInput = {
  email: Scalars['String'];
};

export type Hero = {
  __typename?: 'Hero';
  app: App;
  backgroundImage?: Maybe<Image>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Hero>;
  id: Scalars['ID'];
  image?: Maybe<Image>;
  parent: Scalars['String'];
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  titleHighlight?: Maybe<Scalars['String']>;
  type: HeroType;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Hero>;
  video?: Maybe<Video>;
};

export enum HeroType {
  Default = 'DEFAULT',
  WithImage = 'WITH_IMAGE',
  WithImageBackground = 'WITH_IMAGE_BACKGROUND',
  WithVideo = 'WITH_VIDEO'
}

export type Heros = {
  __typename?: 'Heros';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<Hero>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Image = {
  __typename?: 'Image';
  app?: Maybe<App>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  file: File;
  id: Scalars['ID'];
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
};

export type Images = {
  __typename?: 'Images';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<Image>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type IncrementVideoViewInput = {
  videoView: Scalars['String'];
};

export enum IntervalType {
  Day = 'DAY',
  Month = 'MONTH',
  Week = 'WEEK',
  Year = 'YEAR'
}

export enum InventoryType {
  Finite = 'FINITE',
  Infinite = 'INFINITE'
}

export type Invoice = {
  __typename?: 'Invoice';
  active: Scalars['Boolean'];
  app?: Maybe<App>;
  canceledAt?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  currency: Currency;
  customer?: Maybe<InvoiceCustomerUnion>;
  id: Scalars['ID'];
  paidAt?: Maybe<Scalars['String']>;
  paymentErrorAt?: Maybe<Scalars['String']>;
  paymentMethod?: Maybe<PaymentMethod>;
  status: InvoiceStatus;
  subscription: SubscriptionContract;
  subscriptionContract?: Maybe<SubscriptionContract>;
  subtotalAmount: Scalars['Float'];
  totalAmount: Scalars['Float'];
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
  url?: Maybe<Scalars['String']>;
};

export type InvoiceCustomerUnion = Account | App;

export enum InvoiceStatus {
  Canceled = 'CANCELED',
  Paid = 'PAID',
  PaymentError = 'PAYMENT_ERROR',
  Pending = 'PENDING'
}

export type Invoices = {
  __typename?: 'Invoices';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<Invoice>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Language = {
  __typename?: 'Language';
  activatedAt?: Maybe<Scalars['String']>;
  active: Scalars['Boolean'];
  app?: Maybe<App>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  deactivatedAt?: Maybe<Scalars['String']>;
  icon?: Maybe<Image>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
};

export type Languages = {
  __typename?: 'Languages';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<Language>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Link = {
  __typename?: 'Link';
  url: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Material = {
  __typename?: 'Material';
  app?: Maybe<App>;
  avatar?: Maybe<Image>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  description?: Maybe<Scalars['String']>;
  file?: Maybe<File>;
  free: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  parent?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
};

export type Materials = {
  __typename?: 'Materials';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<Material>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type MeAccount = {
  __typename?: 'MeAccount';
  accesses?: Maybe<Accesses>;
  app: App;
  avatar?: Maybe<Image>;
  canceledAt?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  dateBirthday?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstname: Scalars['String'];
  fullname: Scalars['String'];
  id: Scalars['ID'];
  isAdmin?: Maybe<Scalars['Boolean']>;
  isInstructor?: Maybe<Scalars['Boolean']>;
  isOwner?: Maybe<Scalars['Boolean']>;
  isStokei: Scalars['Boolean'];
  lastname: Scalars['String'];
  pagarmeCustomer?: Maybe<Scalars['String']>;
  paymentMethods?: Maybe<PaymentMethods>;
  phones?: Maybe<Phones>;
  roles?: Maybe<Roles>;
  status: AccountStatus;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
  username: Scalars['String'];
};


export type MeAccountAccessesArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllAccessesInput>;
  page?: InputMaybe<PaginationInput>;
};


export type MeAccountPhonesArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllPhonesInput>;
  page?: InputMaybe<PaginationInput>;
};


export type MeAccountRolesArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllRolesInput>;
  page?: InputMaybe<PaginationInput>;
};

export type Module = {
  __typename?: 'Module';
  app?: Maybe<App>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  parent: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
  videos?: Maybe<Videos>;
};


export type ModuleVideosArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllVideosInput>;
  page?: InputMaybe<PaginationInput>;
};

export type Modules = {
  __typename?: 'Modules';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<Module>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  activatePrice: Price;
  activateSubscriptionContract: SubscriptionContract;
  cancelSubscriptionContract: SubscriptionContract;
  changeFromSortedItemToSortedItem: ChangeFromSortedItemToSortedItemResponse;
  changePassword: Scalars['Boolean'];
  completeAccountConfiguration: AuthResponse;
  createAccount: Account;
  createAccountPagarmeCustomer: Account;
  createAddress: Address;
  createApp: App;
  createAppPagarmeAccount: App;
  createAppStripeDashboardLink: Link;
  createAppStripeOnboarding: Link;
  createCatalog: Catalog;
  createCatalogItem: CatalogItem;
  createCheckout: Checkout;
  createColor: Color;
  createCourse: Course;
  createCourseInstructor: CourseInstructor;
  createCourseStudent: CourseStudent;
  createCurrency: Currency;
  createCustomerPortalSession: CustomerPortalSession;
  createDomain: Domain;
  createFeature: Feature;
  createFileByAdmin: File;
  createFileDownloadURL: Scalars['String'];
  createHero: Hero;
  createImage: Image;
  createImageUploadURL: CreateFileUploadUrlResponse;
  createLanguage: Language;
  createMaterial: Material;
  createModule: Module;
  createOrUpdateColor: Color;
  createOrder: Order;
  createPaymentMethod: PaymentMethod;
  createPhone: Phone;
  createPlan: Plan;
  createPrice: Price;
  createProduct: Product;
  createSortedItem: SortedItem;
  createSubscriptionContract: SubscriptionContract;
  createVideo: Video;
  createVideoAuthor: VideoAuthor;
  createVideoUploadURL: CreateFileUploadUrlResponse;
  createVideoView: VideoView;
  deactivatePrice: Price;
  forgotPassword: Scalars['Boolean'];
  incrementVideoView: Scalars['Boolean'];
  login: AuthResponse;
  refreshAccess: AuthResponse;
  removeAccess: Access;
  removeAccount: Account;
  removeAddress: Address;
  removeCatalog: Catalog;
  removeCatalogItem: CatalogItem;
  removeColor: Color;
  removeCourse: Course;
  removeCourseInstructor: CourseInstructor;
  removeCurrency: Currency;
  removeDomain: Domain;
  removeFeature: Feature;
  removeHero: Hero;
  removeImage: Image;
  removeLanguage: Language;
  removeMaterial: Material;
  removeModule: Module;
  removePaymentMethod: PaymentMethod;
  removePhone: Phone;
  removeSortedItem: SortedItem;
  removeVideo: Video;
  removeVideoAuthor: VideoAuthor;
  signUp: AuthResponse;
  updateAccount: Account;
  updateAddress: Address;
  updateApp: App;
  updateCatalog: Catalog;
  updateColor: Color;
  updateCourse: Course;
  updateCurrency: Currency;
  updateFile: File;
  updateHero: Hero;
  updateLanguage: Language;
  updateMaterial: Material;
  updateModule: Module;
  updateOwnPassword: Scalars['Boolean'];
  updatePrice: Price;
  updateProduct: Product;
  updateSubscriptionContract: SubscriptionContract;
  updateVideo: Video;
};


export type MutationActivatePriceArgs = {
  input: ActivatePriceInput;
};


export type MutationActivateSubscriptionContractArgs = {
  input: ActivateSubscriptionContractInput;
};


export type MutationCancelSubscriptionContractArgs = {
  input: CancelSubscriptionContractInput;
};


export type MutationChangeFromSortedItemToSortedItemArgs = {
  input: ChangeFromSortedItemToSortedItemInput;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationCompleteAccountConfigurationArgs = {
  input: CompleteAccountConfigurationInput;
};


export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


export type MutationCreateAccountPagarmeCustomerArgs = {
  input: CreateAccountPagarmeCustomerInput;
};


export type MutationCreateAddressArgs = {
  input: CreateAddressInput;
};


export type MutationCreateAppArgs = {
  input: CreateAppInput;
};


export type MutationCreateAppPagarmeAccountArgs = {
  input: CreateAppPagarmeAccountInput;
};


export type MutationCreateCatalogArgs = {
  input: CreateCatalogInput;
};


export type MutationCreateCatalogItemArgs = {
  input: CreateCatalogItemInput;
};


export type MutationCreateCheckoutArgs = {
  input: CreateCheckoutInput;
};


export type MutationCreateColorArgs = {
  input: CreateColorInput;
};


export type MutationCreateCourseArgs = {
  input: CreateCourseInput;
};


export type MutationCreateCourseInstructorArgs = {
  input: CreateCourseInstructorInput;
};


export type MutationCreateCourseStudentArgs = {
  input: CreateCourseStudentInput;
};


export type MutationCreateCurrencyArgs = {
  input: CreateCurrencyInput;
};


export type MutationCreateCustomerPortalSessionArgs = {
  input: CreateCustomerPortalSessionInput;
};


export type MutationCreateDomainArgs = {
  input: CreateDomainInput;
};


export type MutationCreateFeatureArgs = {
  input: CreateFeatureInput;
};


export type MutationCreateFileByAdminArgs = {
  input: CreateFileByAdminInput;
};


export type MutationCreateFileDownloadUrlArgs = {
  input: CreateFileDownloadUrlInput;
};


export type MutationCreateHeroArgs = {
  input: CreateHeroInput;
};


export type MutationCreateImageArgs = {
  input: CreateImageInput;
};


export type MutationCreateLanguageArgs = {
  input: CreateLanguageInput;
};


export type MutationCreateMaterialArgs = {
  input: CreateMaterialInput;
};


export type MutationCreateModuleArgs = {
  input: CreateModuleInput;
};


export type MutationCreateOrUpdateColorArgs = {
  input: CreateOrUpdateColorInput;
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationCreatePaymentMethodArgs = {
  input: CreatePaymentMethodInput;
};


export type MutationCreatePhoneArgs = {
  input: CreatePhoneInput;
};


export type MutationCreatePlanArgs = {
  input: CreatePlanInput;
};


export type MutationCreatePriceArgs = {
  input: CreatePriceInput;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationCreateSortedItemArgs = {
  input: CreateSortedItemInput;
};


export type MutationCreateSubscriptionContractArgs = {
  input: CreateSubscriptionContractInput;
};


export type MutationCreateVideoArgs = {
  input: CreateVideoInput;
};


export type MutationCreateVideoAuthorArgs = {
  input: CreateVideoAuthorInput;
};


export type MutationCreateVideoViewArgs = {
  input: CreateVideoViewInput;
};


export type MutationDeactivatePriceArgs = {
  input: DeactivatePriceInput;
};


export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


export type MutationIncrementVideoViewArgs = {
  input: IncrementVideoViewInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRemoveAccessArgs = {
  input: RemoveAccessInput;
};


export type MutationRemoveAddressArgs = {
  input: RemoveAddressInput;
};


export type MutationRemoveCatalogArgs = {
  input: RemoveCatalogInput;
};


export type MutationRemoveCatalogItemArgs = {
  input: RemoveCatalogItemInput;
};


export type MutationRemoveColorArgs = {
  input: RemoveColorInput;
};


export type MutationRemoveCourseArgs = {
  input: RemoveCourseInput;
};


export type MutationRemoveCourseInstructorArgs = {
  input: RemoveCourseInstructorInput;
};


export type MutationRemoveCurrencyArgs = {
  input: RemoveCurrencyInput;
};


export type MutationRemoveDomainArgs = {
  input: RemoveDomainInput;
};


export type MutationRemoveFeatureArgs = {
  input: RemoveFeatureInput;
};


export type MutationRemoveHeroArgs = {
  input: RemoveHeroInput;
};


export type MutationRemoveImageArgs = {
  input: RemoveImageInput;
};


export type MutationRemoveLanguageArgs = {
  input: RemoveLanguageInput;
};


export type MutationRemoveMaterialArgs = {
  input: RemoveMaterialInput;
};


export type MutationRemoveModuleArgs = {
  input: RemoveModuleInput;
};


export type MutationRemovePaymentMethodArgs = {
  input: RemovePaymentMethodInput;
};


export type MutationRemovePhoneArgs = {
  input: RemovePhoneInput;
};


export type MutationRemoveSortedItemArgs = {
  input: RemoveSortedItemInput;
};


export type MutationRemoveVideoArgs = {
  input: RemoveVideoInput;
};


export type MutationRemoveVideoAuthorArgs = {
  input: RemoveVideoAuthorInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationUpdateAccountArgs = {
  input: UpdateAccountInput;
};


export type MutationUpdateAddressArgs = {
  input: UpdateAddressInput;
};


export type MutationUpdateAppArgs = {
  input: UpdateAppInput;
};


export type MutationUpdateCatalogArgs = {
  input: UpdateCatalogInput;
};


export type MutationUpdateColorArgs = {
  input: UpdateColorInput;
};


export type MutationUpdateCourseArgs = {
  input: UpdateCourseInput;
};


export type MutationUpdateCurrencyArgs = {
  input: UpdateCurrencyInput;
};


export type MutationUpdateFileArgs = {
  input: UpdateFileInput;
};


export type MutationUpdateHeroArgs = {
  input: UpdateHeroInput;
};


export type MutationUpdateLanguageArgs = {
  input: UpdateLanguageInput;
};


export type MutationUpdateMaterialArgs = {
  input: UpdateMaterialInput;
};


export type MutationUpdateModuleArgs = {
  input: UpdateModuleInput;
};


export type MutationUpdatePriceArgs = {
  input: UpdatePriceInput;
};


export type MutationUpdateProductArgs = {
  input: UpdateProductInput;
};


export type MutationUpdateSubscriptionContractArgs = {
  input: UpdateSubscriptionContractInput;
};


export type MutationUpdateVideoArgs = {
  input: UpdateVideoInput;
};

export type Order = {
  __typename?: 'Order';
  active: Scalars['Boolean'];
  app?: Maybe<App>;
  canceledAt?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  currency: Currency;
  feeAmount: Scalars['Float'];
  id: Scalars['ID'];
  items?: Maybe<OrderItems>;
  paidAmount: Scalars['Float'];
  paidAt?: Maybe<Scalars['String']>;
  parent: OrderParentUnion;
  paymentErrorAt?: Maybe<Scalars['String']>;
  payments?: Maybe<Payments>;
  status: OrderStatus;
  subtotalAmount: Scalars['Float'];
  totalAmount: Scalars['Float'];
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
};


export type OrderItemsArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllOrderItemsInput>;
  page?: InputMaybe<PaginationInput>;
};


export type OrderPaymentsArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllPaymentsInput>;
  page?: InputMaybe<PaginationInput>;
};

export enum OrderBy {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type OrderByDataFindAllAccessesInput = {
  active?: InputMaybe<OrderBy>;
  canceledAt?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  expiresIn?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllAccountsInput = {
  canceledAt?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  email?: InputMaybe<OrderBy>;
  firstname?: InputMaybe<OrderBy>;
  lastname?: InputMaybe<OrderBy>;
  status?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
  username?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllAddressesInput = {
  city?: InputMaybe<OrderBy>;
  complement?: InputMaybe<OrderBy>;
  country?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  postalCode?: InputMaybe<OrderBy>;
  state?: InputMaybe<OrderBy>;
  street?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllAppsInput = {
  activatedAt?: InputMaybe<OrderBy>;
  active?: InputMaybe<OrderBy>;
  blockedAt?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  currency?: InputMaybe<OrderBy>;
  deactivatedAt?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  plan?: InputMaybe<OrderBy>;
  slug?: InputMaybe<OrderBy>;
  status?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllCatalogItemsInput = {
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllCatalogsInput = {
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllColorsInput = {
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  themeMode?: InputMaybe<OrderBy>;
  type?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllCourseInstructorsInput = {
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllCourseStudentsInput = {
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllCoursesInput = {
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllCurrenciesInput = {
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  minorUnit?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllDomainsInput = {
  active?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  status?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllFeaturesInput = {
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllHerosInput = {
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllImagesInput = {
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllInvoicesInput = {
  active?: InputMaybe<OrderBy>;
  canceledAt?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  paidAt?: InputMaybe<OrderBy>;
  paymentErrorAt?: InputMaybe<OrderBy>;
  status?: InputMaybe<OrderBy>;
  subtotalAmount?: InputMaybe<OrderBy>;
  totalAmount?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllLanguagesInput = {
  active?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllMaterialsInput = {
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  free?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllModulesInput = {
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllOrderItemsInput = {
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  quantity?: InputMaybe<OrderBy>;
  subtotalAmount?: InputMaybe<OrderBy>;
  totalAmount?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllOrdersInput = {
  active?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  currency?: InputMaybe<OrderBy>;
  feeAmount?: InputMaybe<OrderBy>;
  paidAmount?: InputMaybe<OrderBy>;
  status?: InputMaybe<OrderBy>;
  subtotalAmount?: InputMaybe<OrderBy>;
  totalAmount?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllPaymentMethodsInput = {
  cardBrand?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllPaymentsInput = {
  active?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  currency?: InputMaybe<OrderBy>;
  feeAmount?: InputMaybe<OrderBy>;
  paymentMethod?: InputMaybe<OrderBy>;
  status?: InputMaybe<OrderBy>;
  subtotalAmount?: InputMaybe<OrderBy>;
  totalAmount?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllPhonesInput = {
  active?: InputMaybe<OrderBy>;
  areaCode?: InputMaybe<OrderBy>;
  countryCode?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  default?: InputMaybe<OrderBy>;
  fullnumber?: InputMaybe<OrderBy>;
  number?: InputMaybe<OrderBy>;
  status?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllPlansInput = {
  active?: InputMaybe<OrderBy>;
  applicationFeePercentage?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  hasCustomDomain?: InputMaybe<OrderBy>;
  hasCustomSite?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  quantityClassroomsPerCourses?: InputMaybe<OrderBy>;
  quantityCourses?: InputMaybe<OrderBy>;
  quantityInstructorsPerCourse?: InputMaybe<OrderBy>;
  quantityModulesPerCourse?: InputMaybe<OrderBy>;
  quantityVideosPerModules?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllPriceTiersInput = {
  amount?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  infinite?: InputMaybe<OrderBy>;
  upTo?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllPricesInput = {
  active?: InputMaybe<OrderBy>;
  amount?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  default?: InputMaybe<OrderBy>;
  fromAmount?: InputMaybe<OrderBy>;
  inventoryType?: InputMaybe<OrderBy>;
  quantity?: InputMaybe<OrderBy>;
  recurringIntervalCount?: InputMaybe<OrderBy>;
  recurringIntervalType?: InputMaybe<OrderBy>;
  type?: InputMaybe<OrderBy>;
  unit?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllProductsInput = {
  activatedAt?: InputMaybe<OrderBy>;
  active?: InputMaybe<OrderBy>;
  app?: InputMaybe<OrderBy>;
  avatar?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  deactivatedAt?: InputMaybe<OrderBy>;
  description?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  stripeProduct?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllRolesInput = {
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllSortedItemsInput = {
  index?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllSubscriptionContractItemsInput = {
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  quantity?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllSubscriptionContractsByItemInput = {
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllSubscriptionContractsInput = {
  active?: InputMaybe<OrderBy>;
  automaticRenew?: InputMaybe<OrderBy>;
  canceledAt?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  endAt?: InputMaybe<OrderBy>;
  startAt?: InputMaybe<OrderBy>;
  status?: InputMaybe<OrderBy>;
  type?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllVideoAuthorsInput = {
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderByDataFindAllVideosInput = {
  active?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  private?: InputMaybe<OrderBy>;
  slug?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  updatedBy?: InputMaybe<OrderBy>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  app?: Maybe<App>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  id: Scalars['ID'];
  parent: Scalars['String'];
  price?: Maybe<Price>;
  product: Product;
  quantity: Scalars['Float'];
  recurring?: Maybe<Recurring>;
  subtotalAmount: Scalars['Float'];
  totalAmount: Scalars['Float'];
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
};

export type OrderItems = {
  __typename?: 'OrderItems';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<OrderItem>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type OrderParentUnion = Account | App;

export enum OrderStatus {
  Canceled = 'CANCELED',
  Paid = 'PAID',
  PartialPaid = 'PARTIAL_PAID',
  PaymentError = 'PAYMENT_ERROR',
  Pending = 'PENDING'
}

export type Orders = {
  __typename?: 'Orders';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<Order>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export enum PagarmeAccountType {
  Company = 'COMPANY',
  Individual = 'INDIVIDUAL'
}

export enum PagarmeBankAccountType {
  Checking = 'CHECKING',
  ConjunctChecking = 'CONJUNCT_CHECKING',
  ConjunctSavings = 'CONJUNCT_SAVINGS',
  Savings = 'SAVINGS'
}

export type PaginationInput = {
  limit?: InputMaybe<Scalars['Int']>;
  number?: InputMaybe<Scalars['Int']>;
};

export type Payment = {
  __typename?: 'Payment';
  active: Scalars['Boolean'];
  app?: Maybe<App>;
  canceledAt?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  currency: Currency;
  feeAmount: Scalars['Float'];
  id: Scalars['ID'];
  paidAmount: Scalars['Float'];
  paidAt?: Maybe<Scalars['String']>;
  parent: Scalars['String'];
  payer?: Maybe<Account>;
  paymentErrorAt?: Maybe<Scalars['String']>;
  paymentMethod?: Maybe<PaymentMethod>;
  status: PaymentStatus;
  subtotalAmount: Scalars['Float'];
  totalAmount: Scalars['Float'];
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
};

export type PaymentMethod = {
  __typename?: 'PaymentMethod';
  app?: Maybe<App>;
  cardBrand?: Maybe<Scalars['String']>;
  cardExpiryMonth?: Maybe<Scalars['String']>;
  cardExpiryYear?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  id: Scalars['ID'];
  lastFourCardNumber?: Maybe<Scalars['String']>;
  parent: Scalars['String'];
  stripePaymentMethod?: Maybe<Scalars['String']>;
  type?: Maybe<PaymentMethodType>;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
};

export enum PaymentMethodType {
  Boleto = 'BOLETO',
  Card = 'CARD',
  Pix = 'PIX'
}

export type PaymentMethods = {
  __typename?: 'PaymentMethods';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<PaymentMethod>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export enum PaymentStatus {
  Canceled = 'CANCELED',
  Paid = 'PAID',
  PaymentError = 'PAYMENT_ERROR',
  Pending = 'PENDING'
}

export type Payments = {
  __typename?: 'Payments';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<Payment>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Phone = {
  __typename?: 'Phone';
  activatedAt?: Maybe<Scalars['String']>;
  active: Scalars['Boolean'];
  app?: Maybe<App>;
  areaCode: Scalars['String'];
  countryCode: Scalars['String'];
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  default: Scalars['Boolean'];
  fullnumber: Scalars['String'];
  id: Scalars['ID'];
  number: Scalars['String'];
  status: PhoneStatus;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
  validatedAt?: Maybe<Scalars['String']>;
  validationCode: Scalars['String'];
};

export type PhoneCode = {
  __typename?: 'PhoneCode';
  code: Scalars['String'];
  country: Scalars['String'];
};

export enum PhoneStatus {
  Active = 'ACTIVE',
  Invalid = 'INVALID',
  Pending = 'PENDING'
}

export type Phones = {
  __typename?: 'Phones';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<Phone>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Plan = {
  __typename?: 'Plan';
  active: Scalars['Boolean'];
  app?: Maybe<App>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  description?: Maybe<Scalars['String']>;
  features?: Maybe<Features>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  type: PlanType;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
};


export type PlanFeaturesArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllFeaturesInput>;
  page?: InputMaybe<PaginationInput>;
};

export enum PlanType {
  Admin = 'ADMIN',
  Domain = 'DOMAIN',
  Instructor = 'INSTRUCTOR',
  Storage = 'STORAGE',
  Video = 'VIDEO',
  VideoView = 'VIDEO_VIEW'
}

export type Plans = {
  __typename?: 'Plans';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<Plan>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Price = {
  __typename?: 'Price';
  active: Scalars['Boolean'];
  amount?: Maybe<Scalars['Float']>;
  app?: Maybe<App>;
  automaticRenew: Scalars['Boolean'];
  billingScheme?: Maybe<BillingScheme>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  currency: Currency;
  default: Scalars['Boolean'];
  discountPercent?: Maybe<Scalars['Float']>;
  fromAmount?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  inventoryType?: Maybe<InventoryType>;
  isDefault: Scalars['Boolean'];
  nickname?: Maybe<Scalars['String']>;
  parent: Scalars['String'];
  quantity: Scalars['Float'];
  recurring?: Maybe<Recurring>;
  tiers?: Maybe<PriceTiers>;
  tiersMode?: Maybe<TiersMode>;
  type: PriceType;
  unit?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
};


export type PriceTiersArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllPriceTiersInput>;
  page?: InputMaybe<PaginationInput>;
};

export type PriceTier = {
  __typename?: 'PriceTier';
  amount: Scalars['Float'];
  app?: Maybe<App>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  id: Scalars['ID'];
  infinite: Scalars['Boolean'];
  parent: Scalars['String'];
  upTo?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
};

export type PriceTiers = {
  __typename?: 'PriceTiers';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<PriceTier>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export enum PriceType {
  OneTime = 'ONE_TIME',
  Recurring = 'RECURRING'
}

export type Prices = {
  __typename?: 'Prices';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<Price>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Product = {
  __typename?: 'Product';
  activatedAt?: Maybe<Scalars['String']>;
  active: Scalars['Boolean'];
  app?: Maybe<App>;
  avatar?: Maybe<Image>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  deactivatedAt?: Maybe<Scalars['String']>;
  defaultPrice?: Maybe<Price>;
  description?: Maybe<Scalars['String']>;
  features?: Maybe<Features>;
  id: Scalars['ID'];
  name: Scalars['String'];
  parent?: Maybe<ProductParentUnion>;
  parentId?: Maybe<Scalars['String']>;
  prices?: Maybe<Prices>;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
};


export type ProductFeaturesArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllFeaturesInput>;
  page?: InputMaybe<PaginationInput>;
};


export type ProductPricesArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllPricesInput>;
  page?: InputMaybe<PaginationInput>;
};

export type ProductParentUnion = App | Course | Material | Plan;

export type Products = {
  __typename?: 'Products';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<Product>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  access: Access;
  accesses: Accesses;
  account: Account;
  accountByEmail: Account;
  accounts: Accounts;
  address: Address;
  addresses: Addresses;
  app: App;
  apps: Apps;
  billing: Billing;
  catalog: Catalog;
  catalogItem: CatalogItem;
  catalogItems: CatalogItems;
  catalogs: Catalogs;
  color: Color;
  colors: Colors;
  course: Course;
  courseInstructor: CourseInstructor;
  courseInstructors: CourseInstructors;
  courseStudent: CourseStudent;
  courseStudents: CourseStudents;
  courses: Courses;
  currencies: Currencies;
  currency: Currency;
  currentApp: App;
  domain: Domain;
  domains: Domains;
  feature: Feature;
  features: Features;
  hero: Hero;
  heros: Heros;
  image: Image;
  images: Images;
  invoice: Invoice;
  invoices: Invoices;
  language: Language;
  languages: Languages;
  material: Material;
  materials: Materials;
  me: MeAccount;
  module: Module;
  modules: Modules;
  order: Order;
  orderItem: OrderItem;
  orderItems: OrderItems;
  orders: Orders;
  payment: Payment;
  paymentMethod: PaymentMethod;
  paymentMethods: PaymentMethods;
  payments: Payments;
  phone: Phone;
  phoneCodes: Array<PhoneCode>;
  phones: Phones;
  plan: Plan;
  plans: Plans;
  price: Price;
  prices: Prices;
  product: Product;
  products: Products;
  sortedItem: SortedItem;
  sortedItems: SortedItems;
  subscriptionContract: SubscriptionContract;
  subscriptionContractItem: SubscriptionContractItem;
  subscriptionContractItems: SubscriptionContractItems;
  subscriptionContracts: SubscriptionContracts;
  subscriptionContractsByItem: SubscriptionContracts;
  video: Video;
  videoAuthor: VideoAuthor;
  videoAuthors: VideoAuthors;
  videos: Videos;
};


export type QueryAccessArgs = {
  id: Scalars['String'];
};


export type QueryAccessesArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllAccessesInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllAccessesInput>;
};


export type QueryAccountArgs = {
  id: Scalars['String'];
};


export type QueryAccountByEmailArgs = {
  email?: InputMaybe<Scalars['String']>;
};


export type QueryAccountsArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllAccountsInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllAccountsInput>;
};


export type QueryAddressArgs = {
  id: Scalars['String'];
};


export type QueryAddressesArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllAddressesInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllAddressesInput>;
};


export type QueryAppArgs = {
  id: Scalars['String'];
};


export type QueryAppsArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllAppsInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllAppsInput>;
};


export type QueryCatalogArgs = {
  id: Scalars['String'];
};


export type QueryCatalogItemArgs = {
  id: Scalars['String'];
};


export type QueryCatalogItemsArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllCatalogItemsInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllCatalogItemsInput>;
};


export type QueryCatalogsArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllCatalogsInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllCatalogsInput>;
};


export type QueryColorArgs = {
  id: Scalars['String'];
};


export type QueryColorsArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllColorsInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllColorsInput>;
};


export type QueryCourseArgs = {
  id: Scalars['String'];
};


export type QueryCourseInstructorArgs = {
  id: Scalars['String'];
};


export type QueryCourseInstructorsArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllCourseInstructorsInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllCourseInstructorsInput>;
};


export type QueryCourseStudentArgs = {
  id: Scalars['String'];
};


export type QueryCourseStudentsArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllCourseStudentsInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllCourseStudentsInput>;
};


export type QueryCoursesArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllCoursesInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllCoursesInput>;
};


export type QueryCurrenciesArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllCurrenciesInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllCurrenciesInput>;
};


export type QueryCurrencyArgs = {
  id: Scalars['String'];
};


export type QueryDomainArgs = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type QueryDomainsArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllDomainsInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllDomainsInput>;
};


export type QueryFeatureArgs = {
  id: Scalars['String'];
};


export type QueryFeaturesArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllFeaturesInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllFeaturesInput>;
};


export type QueryHeroArgs = {
  id: Scalars['String'];
};


export type QueryHerosArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllHerosInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllHerosInput>;
};


export type QueryImageArgs = {
  id: Scalars['String'];
};


export type QueryImagesArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllImagesInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllImagesInput>;
};


export type QueryInvoiceArgs = {
  id: Scalars['String'];
};


export type QueryInvoicesArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllInvoicesInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllInvoicesInput>;
};


export type QueryLanguageArgs = {
  id: Scalars['String'];
};


export type QueryLanguagesArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllLanguagesInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllLanguagesInput>;
};


export type QueryMaterialArgs = {
  id: Scalars['String'];
};


export type QueryMaterialsArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllMaterialsInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllMaterialsInput>;
};


export type QueryModuleArgs = {
  id: Scalars['String'];
};


export type QueryModulesArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllModulesInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllModulesInput>;
};


export type QueryOrderArgs = {
  id: Scalars['String'];
};


export type QueryOrderItemArgs = {
  id: Scalars['String'];
};


export type QueryOrderItemsArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllOrderItemsInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllOrderItemsInput>;
};


export type QueryOrdersArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllOrdersInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllOrdersInput>;
};


export type QueryPaymentArgs = {
  id: Scalars['String'];
};


export type QueryPaymentMethodArgs = {
  id: Scalars['String'];
};


export type QueryPaymentMethodsArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllPaymentMethodsInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllPaymentMethodsInput>;
};


export type QueryPaymentsArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllPaymentsInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllPaymentsInput>;
};


export type QueryPhoneArgs = {
  id: Scalars['String'];
};


export type QueryPhonesArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllPhonesInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllPhonesInput>;
};


export type QueryPlanArgs = {
  id: Scalars['String'];
};


export type QueryPlansArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllPlansInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllPlansInput>;
};


export type QueryPriceArgs = {
  id: Scalars['String'];
};


export type QueryPricesArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllPricesInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllPricesInput>;
};


export type QueryProductArgs = {
  id: Scalars['String'];
};


export type QueryProductsArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllProductsInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllProductsInput>;
};


export type QuerySortedItemArgs = {
  id: Scalars['String'];
};


export type QuerySortedItemsArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllSortedItemsInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllSortedItemsInput>;
};


export type QuerySubscriptionContractArgs = {
  id: Scalars['String'];
};


export type QuerySubscriptionContractItemArgs = {
  id: Scalars['String'];
};


export type QuerySubscriptionContractItemsArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllSubscriptionContractItemsInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllSubscriptionContractItemsInput>;
};


export type QuerySubscriptionContractsArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllSubscriptionContractsInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllSubscriptionContractsInput>;
};


export type QuerySubscriptionContractsByItemArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllSubscriptionContractsByItemInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllSubscriptionContractsByItemInput>;
};


export type QueryVideoArgs = {
  id: Scalars['String'];
};


export type QueryVideoAuthorArgs = {
  id: Scalars['String'];
};


export type QueryVideoAuthorsArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllVideoAuthorsInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllVideoAuthorsInput>;
};


export type QueryVideosArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllVideosInput>;
  page?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereDataFindAllVideosInput>;
};

export type Recurring = {
  __typename?: 'Recurring';
  app?: Maybe<App>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  id: Scalars['ID'];
  interval?: Maybe<IntervalType>;
  intervalCount: Scalars['Int'];
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
  usageType?: Maybe<UsageType>;
};

export type RemoveAccessInput = {
  where: RemoveWhereAccessInput;
};

export type RemoveAddressInput = {
  where: RemoveWhereAddressInput;
};

export type RemoveCatalogInput = {
  where: RemoveWhereCatalogInput;
};

export type RemoveCatalogItemInput = {
  where: RemoveWhereCatalogItemInput;
};

export type RemoveColorInput = {
  where: RemoveWhereColorInput;
};

export type RemoveCourseInput = {
  where: RemoveWhereCourseInput;
};

export type RemoveCourseInstructorInput = {
  where: RemoveWhereCourseInstructorInput;
};

export type RemoveCurrencyInput = {
  where: RemoveWhereCurrencyInput;
};

export type RemoveDomainInput = {
  where: RemoveWhereDomainInput;
};

export type RemoveFeatureInput = {
  where: RemoveWhereFeatureInput;
};

export type RemoveHeroInput = {
  where: RemoveWhereHeroInput;
};

export type RemoveImageInput = {
  where: RemoveWhereImageInput;
};

export type RemoveLanguageInput = {
  where: RemoveWhereLanguageInput;
};

export type RemoveMaterialInput = {
  where: RemoveWhereMaterialInput;
};

export type RemoveModuleInput = {
  where: RemoveWhereModuleInput;
};

export type RemovePaymentMethodInput = {
  where: RemoveWherePaymentMethodInput;
};

export type RemovePhoneInput = {
  where: RemoveWherePhoneInput;
};

export type RemoveSortedItemInput = {
  where: RemoveWhereSortedItemInput;
};

export type RemoveVideoAuthorInput = {
  where: RemoveWhereVideoAuthorInput;
};

export type RemoveVideoInput = {
  where: RemoveWhereVideoInput;
};

export type RemoveWhereAccessInput = {
  access: Scalars['String'];
};

export type RemoveWhereAddressInput = {
  address: Scalars['String'];
};

export type RemoveWhereCatalogInput = {
  catalog: Scalars['String'];
};

export type RemoveWhereCatalogItemInput = {
  catalog: Scalars['String'];
  product: Scalars['String'];
};

export type RemoveWhereColorInput = {
  color: Scalars['String'];
  parent: Scalars['String'];
};

export type RemoveWhereCourseInput = {
  course: Scalars['String'];
  parent: Scalars['String'];
};

export type RemoveWhereCourseInstructorInput = {
  course: Scalars['String'];
  instructor: Scalars['String'];
};

export type RemoveWhereCurrencyInput = {
  currency: Scalars['String'];
};

export type RemoveWhereDomainInput = {
  domain: Scalars['String'];
};

export type RemoveWhereFeatureInput = {
  feature: Scalars['String'];
};

export type RemoveWhereHeroInput = {
  hero: Scalars['String'];
};

export type RemoveWhereImageInput = {
  image: Scalars['String'];
};

export type RemoveWhereLanguageInput = {
  language: Scalars['String'];
};

export type RemoveWhereMaterialInput = {
  material: Scalars['String'];
};

export type RemoveWhereModuleInput = {
  module: Scalars['String'];
};

export type RemoveWherePaymentMethodInput = {
  paymentMethod: Scalars['String'];
};

export type RemoveWherePhoneInput = {
  phone: Scalars['String'];
};

export type RemoveWhereSortedItemInput = {
  sortedItem: Scalars['String'];
};

export type RemoveWhereVideoAuthorInput = {
  author: Scalars['String'];
  video: Scalars['String'];
};

export type RemoveWhereVideoInput = {
  video: Scalars['String'];
};

export type Role = {
  __typename?: 'Role';
  app?: Maybe<App>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  id: Scalars['ID'];
  name: Scalars['String'];
  parent: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
};

export type Roles = {
  __typename?: 'Roles';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<Role>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type SignUpInput = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
};

export type SortedItem = {
  __typename?: 'SortedItem';
  app?: Maybe<App>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  id: Scalars['ID'];
  index?: Maybe<Scalars['Int']>;
  item?: Maybe<SortedItemUnion>;
  parent?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
};

export type SortedItemUnion = Catalog | CatalogItem | Hero;

export type SortedItems = {
  __typename?: 'SortedItems';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<SortedItem>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type SubscriptionContract = {
  __typename?: 'SubscriptionContract';
  active: Scalars['Boolean'];
  app?: Maybe<App>;
  automaticRenew: Scalars['Boolean'];
  canceledAt?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  endAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  items?: Maybe<SubscriptionContractItems>;
  lastInvoice?: Maybe<Invoice>;
  parent?: Maybe<SubscriptionContractParentUnion>;
  paymentMethod?: Maybe<PaymentMethod>;
  startAt?: Maybe<Scalars['String']>;
  status: SubscriptionContractStatus;
  type: SubscriptionContractType;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
};


export type SubscriptionContractItemsArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllSubscriptionContractItemsInput>;
  page?: InputMaybe<PaginationInput>;
};

export type SubscriptionContractItem = {
  __typename?: 'SubscriptionContractItem';
  app?: Maybe<App>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  id: Scalars['ID'];
  parent: Scalars['String'];
  price?: Maybe<Price>;
  product?: Maybe<SubscriptionContractItemProductUnion>;
  quantity: Scalars['Float'];
  recurring?: Maybe<Recurring>;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
};

export type SubscriptionContractItemProductUnion = Course | Material | Plan | Product;

export type SubscriptionContractItems = {
  __typename?: 'SubscriptionContractItems';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<SubscriptionContractItem>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type SubscriptionContractParentUnion = Account | App;

export enum SubscriptionContractStatus {
  Active = 'ACTIVE',
  Canceled = 'CANCELED',
  Pending = 'PENDING'
}

export enum SubscriptionContractType {
  OneTime = 'ONE_TIME',
  Recurring = 'RECURRING'
}

export type SubscriptionContracts = {
  __typename?: 'SubscriptionContracts';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<SubscriptionContract>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export enum ThemeMode {
  Dark = 'DARK',
  Light = 'LIGHT'
}

export enum TiersMode {
  Volume = 'VOLUME'
}

export type UpdateAccountInput = {
  data: UpdateDataAccountInput;
  where?: InputMaybe<UpdateWhereAccountInput>;
};

export type UpdateAddressInput = {
  data: UpdateDataAddressInput;
  where: UpdateWhereAddressInput;
};

export type UpdateAppInput = {
  data: UpdateDataAppInput;
};

export type UpdateCatalogInput = {
  data: UpdateDataCatalogInput;
  where: UpdateWhereCatalogInput;
};

export type UpdateColorInput = {
  data: UpdateDataColorInput;
  where: UpdateWhereColorInput;
};

export type UpdateCourseInput = {
  data: UpdateDataCourseInput;
  where: UpdateWhereCourseInput;
};

export type UpdateCurrencyInput = {
  data: UpdateDataCurrencyInput;
  where: UpdateWhereCurrencyInput;
};

export type UpdateDataAccountInput = {
  avatar?: InputMaybe<Scalars['String']>;
  dateBirthday?: InputMaybe<Scalars['String']>;
  firstname?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
};

export type UpdateDataAddressInput = {
  city?: InputMaybe<Scalars['String']>;
  complement?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  number?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Scalars['String']>;
  postalCode?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
};

export type UpdateDataAppInput = {
  avatar?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  hero?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateDataCatalogInput = {
  subtitle?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateDataColorInput = {
  color: Scalars['String'];
};

export type UpdateDataCourseInput = {
  avatar?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateDataCurrencyInput = {
  minorUnit?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
};

export type UpdateDataFileInput = {
  duration?: InputMaybe<Scalars['Float']>;
  extension?: InputMaybe<Scalars['String']>;
  mimetype?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Float']>;
};

export type UpdateDataHeroInput = {
  backgroundImage?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  subtitle?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  titleHighlight?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<HeroType>;
  video?: InputMaybe<Scalars['String']>;
};

export type UpdateDataLanguageInput = {
  icon?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateDataMaterialInput = {
  avatar?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  file?: InputMaybe<Scalars['String']>;
  free?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateDataModuleInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateDataPriceInput = {
  automaticRenew?: InputMaybe<Scalars['Boolean']>;
  fromAmount?: InputMaybe<Scalars['Int']>;
  quantity?: InputMaybe<Scalars['Int']>;
};

export type UpdateDataProductInput = {
  avatar?: InputMaybe<Scalars['String']>;
  defaultPrice?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateDataSubscriptionContractInput = {
  automaticRenew?: InputMaybe<Scalars['Boolean']>;
  defaultStripePaymentMethod?: InputMaybe<Scalars['String']>;
};

export type UpdateDataVideoInput = {
  description?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Float']>;
  file?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  poster?: InputMaybe<Scalars['String']>;
  private?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateFileInput = {
  data: UpdateDataFileInput;
  where: UpdateWhereFileInput;
};

export type UpdateHeroInput = {
  data: UpdateDataHeroInput;
  where: UpdateWhereHeroInput;
};

export type UpdateLanguageInput = {
  data: UpdateDataLanguageInput;
  where: UpdateWhereLanguageInput;
};

export type UpdateMaterialInput = {
  data: UpdateDataMaterialInput;
  where: UpdateWhereMaterialInput;
};

export type UpdateModuleInput = {
  data: UpdateDataModuleInput;
  where: UpdateWhereModuleInput;
};

export type UpdatePriceInput = {
  data: UpdateDataPriceInput;
  where: UpdateWherePriceInput;
};

export type UpdateProductInput = {
  data: UpdateDataProductInput;
  where: UpdateWhereProductInput;
};

export type UpdateSubscriptionContractInput = {
  data: UpdateDataSubscriptionContractInput;
  where: UpdateWhereSubscriptionContractInput;
};

export type UpdateVideoInput = {
  data: UpdateDataVideoInput;
  where: UpdateWhereVideoInput;
};

export type UpdateWhereAccountInput = {
  account?: InputMaybe<Scalars['String']>;
};

export type UpdateWhereAddressInput = {
  address: Scalars['String'];
};

export type UpdateWhereCatalogInput = {
  catalog: Scalars['String'];
};

export type UpdateWhereColorInput = {
  color: Scalars['String'];
};

export type UpdateWhereCourseInput = {
  course: Scalars['String'];
};

export type UpdateWhereCurrencyInput = {
  currency: Scalars['String'];
};

export type UpdateWhereFileInput = {
  file: Scalars['String'];
};

export type UpdateWhereHeroInput = {
  hero: Scalars['String'];
};

export type UpdateWhereLanguageInput = {
  language: Scalars['String'];
};

export type UpdateWhereMaterialInput = {
  material: Scalars['String'];
};

export type UpdateWhereModuleInput = {
  module: Scalars['String'];
};

export type UpdateWherePriceInput = {
  price: Scalars['String'];
};

export type UpdateWhereProductInput = {
  product: Scalars['String'];
};

export type UpdateWhereSubscriptionContractInput = {
  subscriptionContract: Scalars['String'];
};

export type UpdateWhereVideoInput = {
  video: Scalars['String'];
};

export enum UsageType {
  Licensed = 'LICENSED',
  Metered = 'METERED'
}

export type Video = {
  __typename?: 'Video';
  active: Scalars['Boolean'];
  app?: Maybe<App>;
  authors: VideoAuthors;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  description?: Maybe<Scalars['String']>;
  file?: Maybe<File>;
  id: Scalars['ID'];
  name: Scalars['String'];
  parent?: Maybe<Scalars['String']>;
  poster?: Maybe<Image>;
  private: Scalars['Boolean'];
  slug: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
};


export type VideoAuthorsArgs = {
  orderBy?: InputMaybe<OrderByDataFindAllVideoAuthorsInput>;
  page?: InputMaybe<PaginationInput>;
};

export type VideoAuthor = {
  __typename?: 'VideoAuthor';
  app?: Maybe<App>;
  author: Account;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  id: Scalars['ID'];
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
};

export type VideoAuthors = {
  __typename?: 'VideoAuthors';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<VideoAuthor>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type VideoView = {
  __typename?: 'VideoView';
  app?: Maybe<App>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Account>;
  id: Scalars['ID'];
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Account>;
  viewer?: Maybe<Account>;
};

export type Videos = {
  __typename?: 'Videos';
  currentPage: Scalars['Int'];
  firstPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<Video>>;
  lastPage: Scalars['Int'];
  nextPage: Scalars['Int'];
  previousPage: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type WhereDataBooleanInput = {
  equals?: InputMaybe<Scalars['Boolean']>;
};

export type WhereDataFindAllAccessesDataInput = {
  active?: InputMaybe<WhereDataBooleanInput>;
  createdBy?: InputMaybe<WhereDataStringInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  parent?: InputMaybe<WhereDataStringInput>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllAccessesInput = {
  AND?: InputMaybe<WhereDataFindAllAccessesDataInput>;
  NOT?: InputMaybe<WhereDataFindAllAccessesDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllAccessesDataInput>>;
};

export type WhereDataFindAllAccountsDataInput = {
  app?: InputMaybe<WhereDataStringInput>;
  createdBy?: InputMaybe<WhereDataStringInput>;
  email?: InputMaybe<WhereDataStringInput>;
  firstname?: InputMaybe<WhereDataSearchInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  lastname?: InputMaybe<WhereDataSearchInput>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
  username?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllAccountsInput = {
  AND?: InputMaybe<WhereDataFindAllAccountsDataInput>;
  NOT?: InputMaybe<WhereDataFindAllAccountsDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllAccountsDataInput>>;
};

export type WhereDataFindAllAddressesDataInput = {
  city?: InputMaybe<WhereDataSearchInput>;
  complement?: InputMaybe<WhereDataSearchInput>;
  country?: InputMaybe<WhereDataSearchInput>;
  createdBy?: InputMaybe<WhereDataStringInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  parent?: InputMaybe<WhereDataStringInput>;
  postalCode?: InputMaybe<WhereDataStringInput>;
  state?: InputMaybe<WhereDataSearchInput>;
  street?: InputMaybe<WhereDataSearchInput>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllAddressesInput = {
  AND?: InputMaybe<WhereDataFindAllAddressesDataInput>;
  NOT?: InputMaybe<WhereDataFindAllAddressesDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllAddressesDataInput>>;
};

export type WhereDataFindAllAppsDataInput = {
  active?: InputMaybe<WhereDataBooleanInput>;
  createdBy?: InputMaybe<WhereDataStringInput>;
  currency?: InputMaybe<WhereDataStringInput>;
  description?: InputMaybe<WhereDataSearchInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<WhereDataSearchInput>;
  parent?: InputMaybe<WhereDataStringInput>;
  plan?: InputMaybe<WhereDataStringInput>;
  status?: InputMaybe<AppStatus>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllAppsInput = {
  AND?: InputMaybe<WhereDataFindAllAppsDataInput>;
  NOT?: InputMaybe<WhereDataFindAllAppsDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllAppsDataInput>>;
};

export type WhereDataFindAllCatalogItemsDataInput = {
  catalog?: InputMaybe<WhereDataStringInput>;
  createdBy?: InputMaybe<WhereDataStringInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  product?: InputMaybe<WhereDataStringInput>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllCatalogItemsInput = {
  AND?: InputMaybe<WhereDataFindAllCatalogItemsDataInput>;
  NOT?: InputMaybe<WhereDataFindAllCatalogItemsDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllCatalogItemsDataInput>>;
};

export type WhereDataFindAllCatalogsDataInput = {
  createdBy?: InputMaybe<WhereDataStringInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  parent?: InputMaybe<WhereDataStringInput>;
  subtitle?: InputMaybe<WhereDataSearchInput>;
  title?: InputMaybe<WhereDataSearchInput>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllCatalogsInput = {
  AND?: InputMaybe<WhereDataFindAllCatalogsDataInput>;
  NOT?: InputMaybe<WhereDataFindAllCatalogsDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllCatalogsDataInput>>;
};

export type WhereDataFindAllColorsDataInput = {
  createdBy?: InputMaybe<WhereDataStringInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  parent?: InputMaybe<WhereDataStringInput>;
  themeMode?: InputMaybe<ThemeMode>;
  type?: InputMaybe<ColorType>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllColorsInput = {
  AND?: InputMaybe<WhereDataFindAllColorsDataInput>;
  NOT?: InputMaybe<WhereDataFindAllColorsDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllColorsDataInput>>;
};

export type WhereDataFindAllCourseInstructorsDataInput = {
  app?: InputMaybe<WhereDataStringInput>;
  course?: InputMaybe<WhereDataStringInput>;
  createdBy?: InputMaybe<WhereDataStringInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  instructor?: InputMaybe<WhereDataStringInput>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllCourseInstructorsInput = {
  AND?: InputMaybe<WhereDataFindAllCourseInstructorsDataInput>;
  NOT?: InputMaybe<WhereDataFindAllCourseInstructorsDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllCourseInstructorsDataInput>>;
};

export type WhereDataFindAllCourseStudentsDataInput = {
  app?: InputMaybe<WhereDataStringInput>;
  course?: InputMaybe<WhereDataStringInput>;
  createdBy?: InputMaybe<WhereDataStringInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  student?: InputMaybe<WhereDataStringInput>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllCourseStudentsInput = {
  AND?: InputMaybe<WhereDataFindAllCourseStudentsDataInput>;
  NOT?: InputMaybe<WhereDataFindAllCourseStudentsDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllCourseStudentsDataInput>>;
};

export type WhereDataFindAllCoursesDataInput = {
  createdBy?: InputMaybe<WhereDataStringInput>;
  description?: InputMaybe<WhereDataSearchInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<WhereDataSearchInput>;
  parent?: InputMaybe<WhereDataStringInput>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllCoursesInput = {
  AND?: InputMaybe<WhereDataFindAllCoursesDataInput>;
  NOT?: InputMaybe<WhereDataFindAllCoursesDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllCoursesDataInput>>;
};

export type WhereDataFindAllCurrenciesDataInput = {
  createdBy?: InputMaybe<WhereDataStringInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  minorUnit?: InputMaybe<WhereDataIntInput>;
  name?: InputMaybe<WhereDataSearchInput>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllCurrenciesInput = {
  AND?: InputMaybe<WhereDataFindAllCurrenciesDataInput>;
  NOT?: InputMaybe<WhereDataFindAllCurrenciesDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllCurrenciesDataInput>>;
};

export type WhereDataFindAllDomainsDataInput = {
  active?: InputMaybe<WhereDataBooleanInput>;
  createdBy?: InputMaybe<WhereDataStringInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<WhereDataSearchInput>;
  parent?: InputMaybe<WhereDataStringInput>;
  status?: InputMaybe<DomainStatus>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllDomainsInput = {
  AND?: InputMaybe<WhereDataFindAllDomainsDataInput>;
  NOT?: InputMaybe<WhereDataFindAllDomainsDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllDomainsDataInput>>;
};

export type WhereDataFindAllFeaturesDataInput = {
  createdBy?: InputMaybe<WhereDataStringInput>;
  description?: InputMaybe<WhereDataSearchInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<WhereDataSearchInput>;
  parent?: InputMaybe<WhereDataSearchInput>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllFeaturesInput = {
  AND?: InputMaybe<WhereDataFindAllFeaturesDataInput>;
  NOT?: InputMaybe<WhereDataFindAllFeaturesDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllFeaturesDataInput>>;
};

export type WhereDataFindAllHerosDataInput = {
  app?: InputMaybe<WhereDataSearchInput>;
  createdBy?: InputMaybe<WhereDataStringInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  parent?: InputMaybe<WhereDataSearchInput>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllHerosInput = {
  AND?: InputMaybe<WhereDataFindAllHerosDataInput>;
  NOT?: InputMaybe<WhereDataFindAllHerosDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllHerosDataInput>>;
};

export type WhereDataFindAllImagesDataInput = {
  createdBy?: InputMaybe<WhereDataStringInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<WhereDataSearchInput>;
  parent?: InputMaybe<WhereDataStringInput>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllImagesInput = {
  AND?: InputMaybe<WhereDataFindAllImagesDataInput>;
  NOT?: InputMaybe<WhereDataFindAllImagesDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllImagesDataInput>>;
};

export type WhereDataFindAllInvoicesDataInput = {
  active?: InputMaybe<WhereDataBooleanInput>;
  app?: InputMaybe<WhereDataStringInput>;
  createdBy?: InputMaybe<WhereDataStringInput>;
  currency?: InputMaybe<WhereDataStringInput>;
  customer?: InputMaybe<WhereDataStringInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  status?: InputMaybe<InvoiceStatus>;
  subscription?: InputMaybe<WhereDataStringInput>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllInvoicesInput = {
  AND?: InputMaybe<WhereDataFindAllInvoicesDataInput>;
  NOT?: InputMaybe<WhereDataFindAllInvoicesDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllInvoicesDataInput>>;
};

export type WhereDataFindAllLanguagesDataInput = {
  active?: InputMaybe<WhereDataBooleanInput>;
  createdBy?: InputMaybe<WhereDataStringInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<WhereDataSearchInput>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllLanguagesInput = {
  AND?: InputMaybe<WhereDataFindAllLanguagesDataInput>;
  NOT?: InputMaybe<WhereDataFindAllLanguagesDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllLanguagesDataInput>>;
};

export type WhereDataFindAllMaterialsDataInput = {
  app?: InputMaybe<WhereDataStringInput>;
  createdBy?: InputMaybe<WhereDataStringInput>;
  description?: InputMaybe<WhereDataSearchInput>;
  free?: InputMaybe<WhereDataBooleanInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<WhereDataSearchInput>;
  parent?: InputMaybe<WhereDataSearchInput>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllMaterialsInput = {
  AND?: InputMaybe<WhereDataFindAllMaterialsDataInput>;
  NOT?: InputMaybe<WhereDataFindAllMaterialsDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllMaterialsDataInput>>;
};

export type WhereDataFindAllModulesDataInput = {
  createdBy?: InputMaybe<WhereDataStringInput>;
  description?: InputMaybe<WhereDataSearchInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<WhereDataSearchInput>;
  parent?: InputMaybe<WhereDataStringInput>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllModulesInput = {
  AND?: InputMaybe<WhereDataFindAllModulesDataInput>;
  NOT?: InputMaybe<WhereDataFindAllModulesDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllModulesDataInput>>;
};

export type WhereDataFindAllOrderItemsDataInput = {
  app?: InputMaybe<WhereDataStringInput>;
  createdBy?: InputMaybe<WhereDataStringInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  parent?: InputMaybe<WhereDataSearchInput>;
  price?: InputMaybe<WhereDataStringInput>;
  product?: InputMaybe<WhereDataSearchInput>;
  recurring?: InputMaybe<WhereDataStringInput>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllOrderItemsInput = {
  AND?: InputMaybe<WhereDataFindAllOrderItemsDataInput>;
  NOT?: InputMaybe<WhereDataFindAllOrderItemsDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllOrderItemsDataInput>>;
};

export type WhereDataFindAllOrdersDataInput = {
  active?: InputMaybe<WhereDataBooleanInput>;
  app?: InputMaybe<WhereDataStringInput>;
  createdBy?: InputMaybe<WhereDataStringInput>;
  currency?: InputMaybe<WhereDataStringInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  parent?: InputMaybe<WhereDataSearchInput>;
  status?: InputMaybe<OrderStatus>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllOrdersInput = {
  AND?: InputMaybe<WhereDataFindAllOrdersDataInput>;
  NOT?: InputMaybe<WhereDataFindAllOrdersDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllOrdersDataInput>>;
};

export type WhereDataFindAllPaymentMethodsDataInput = {
  app?: InputMaybe<WhereDataStringInput>;
  cardBrand?: InputMaybe<WhereDataStringInput>;
  createdBy?: InputMaybe<WhereDataStringInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  parent?: InputMaybe<WhereDataSearchInput>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllPaymentMethodsInput = {
  AND?: InputMaybe<WhereDataFindAllPaymentMethodsDataInput>;
  NOT?: InputMaybe<WhereDataFindAllPaymentMethodsDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllPaymentMethodsDataInput>>;
};

export type WhereDataFindAllPaymentsDataInput = {
  active?: InputMaybe<WhereDataBooleanInput>;
  app?: InputMaybe<WhereDataStringInput>;
  createdBy?: InputMaybe<WhereDataStringInput>;
  currency?: InputMaybe<WhereDataStringInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  payer?: InputMaybe<WhereDataSearchInput>;
  paymentMethod?: InputMaybe<WhereDataStringInput>;
  status?: InputMaybe<PaymentStatus>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllPaymentsInput = {
  AND?: InputMaybe<WhereDataFindAllPaymentsDataInput>;
  NOT?: InputMaybe<WhereDataFindAllPaymentsDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllPaymentsDataInput>>;
};

export type WhereDataFindAllPhonesDataInput = {
  active?: InputMaybe<WhereDataBooleanInput>;
  areaCode?: InputMaybe<WhereDataStringInput>;
  countryCode?: InputMaybe<WhereDataStringInput>;
  createdBy?: InputMaybe<WhereDataStringInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  number?: InputMaybe<WhereDataStringInput>;
  parent?: InputMaybe<WhereDataStringInput>;
  status?: InputMaybe<PhoneStatus>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
  validationCode?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllPhonesInput = {
  AND?: InputMaybe<WhereDataFindAllPhonesDataInput>;
  NOT?: InputMaybe<WhereDataFindAllPhonesDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllPhonesDataInput>>;
};

export type WhereDataFindAllPlansDataInput = {
  active?: InputMaybe<WhereDataBooleanInput>;
  app?: InputMaybe<WhereDataStringInput>;
  applicationFeePercentage?: InputMaybe<WhereDataIntInput>;
  createdBy?: InputMaybe<WhereDataStringInput>;
  hasCustomDomain?: InputMaybe<WhereDataBooleanInput>;
  hasCustomSite?: InputMaybe<WhereDataBooleanInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<WhereDataStringInput>;
  quantityClassroomsPerCourses?: InputMaybe<WhereDataIntInput>;
  quantityCourses?: InputMaybe<WhereDataIntInput>;
  quantityInstructorsPerCourse?: InputMaybe<WhereDataIntInput>;
  quantityModulesPerCourse?: InputMaybe<WhereDataIntInput>;
  quantityVideosPerModules?: InputMaybe<WhereDataIntInput>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllPlansInput = {
  AND?: InputMaybe<WhereDataFindAllPlansDataInput>;
  NOT?: InputMaybe<WhereDataFindAllPlansDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllPlansDataInput>>;
};

export type WhereDataFindAllPricesDataInput = {
  active?: InputMaybe<WhereDataBooleanInput>;
  createdBy?: InputMaybe<WhereDataStringInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  inventoryType?: InputMaybe<InventoryType>;
  parent?: InputMaybe<WhereDataStringInput>;
  recurringIntervalCount?: InputMaybe<WhereDataIntInput>;
  recurringIntervalType?: InputMaybe<IntervalType>;
  type?: InputMaybe<PriceType>;
  unit?: InputMaybe<WhereDataStringInput>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllPricesInput = {
  AND?: InputMaybe<WhereDataFindAllPricesDataInput>;
  NOT?: InputMaybe<WhereDataFindAllPricesDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllPricesDataInput>>;
};

export type WhereDataFindAllProductsDataInput = {
  app?: InputMaybe<WhereDataStringInput>;
  createdBy?: InputMaybe<WhereDataStringInput>;
  description?: InputMaybe<WhereDataSearchInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<WhereDataSearchInput>;
  parent?: InputMaybe<WhereDataSearchInput>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllProductsInput = {
  AND?: InputMaybe<WhereDataFindAllProductsDataInput>;
  NOT?: InputMaybe<WhereDataFindAllProductsDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllProductsDataInput>>;
};

export type WhereDataFindAllSortedItemsDataInput = {
  app?: InputMaybe<WhereDataStringInput>;
  createdBy?: InputMaybe<WhereDataStringInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  parent?: InputMaybe<WhereDataSearchInput>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllSortedItemsInput = {
  AND?: InputMaybe<WhereDataFindAllSortedItemsDataInput>;
  NOT?: InputMaybe<WhereDataFindAllSortedItemsDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllSortedItemsDataInput>>;
};

export type WhereDataFindAllSubscriptionContractItemsDataInput = {
  app?: InputMaybe<WhereDataStringInput>;
  createdBy?: InputMaybe<WhereDataStringInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  parent?: InputMaybe<WhereDataSearchInput>;
  price?: InputMaybe<WhereDataStringInput>;
  product?: InputMaybe<WhereDataSearchInput>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllSubscriptionContractItemsInput = {
  AND?: InputMaybe<WhereDataFindAllSubscriptionContractItemsDataInput>;
  NOT?: InputMaybe<WhereDataFindAllSubscriptionContractItemsDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllSubscriptionContractItemsDataInput>>;
};

export type WhereDataFindAllSubscriptionContractsByItemInput = {
  app?: InputMaybe<WhereDataStringInput>;
  parent?: InputMaybe<WhereDataSearchInput>;
  product?: InputMaybe<WhereDataSearchInput>;
  status?: InputMaybe<SubscriptionContractStatus>;
};

export type WhereDataFindAllSubscriptionContractsDataInput = {
  active?: InputMaybe<WhereDataBooleanInput>;
  app?: InputMaybe<WhereDataStringInput>;
  automaticRenew?: InputMaybe<WhereDataBooleanInput>;
  createdBy?: InputMaybe<WhereDataStringInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  parent?: InputMaybe<WhereDataSearchInput>;
  product?: InputMaybe<WhereDataStringInput>;
  status?: InputMaybe<SubscriptionContractStatus>;
  type?: InputMaybe<SubscriptionContractType>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllSubscriptionContractsInput = {
  AND?: InputMaybe<WhereDataFindAllSubscriptionContractsDataInput>;
  NOT?: InputMaybe<WhereDataFindAllSubscriptionContractsDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllSubscriptionContractsDataInput>>;
};

export type WhereDataFindAllVideoAuthorsDataInput = {
  author?: InputMaybe<WhereDataStringInput>;
  createdBy?: InputMaybe<WhereDataStringInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
  video?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllVideoAuthorsInput = {
  AND?: InputMaybe<WhereDataFindAllVideoAuthorsDataInput>;
  NOT?: InputMaybe<WhereDataFindAllVideoAuthorsDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllVideoAuthorsDataInput>>;
};

export type WhereDataFindAllVideosDataInput = {
  active?: InputMaybe<WhereDataBooleanInput>;
  createdBy?: InputMaybe<WhereDataStringInput>;
  description?: InputMaybe<WhereDataSearchInput>;
  ids?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<WhereDataSearchInput>;
  parent?: InputMaybe<WhereDataSearchInput>;
  private?: InputMaybe<WhereDataBooleanInput>;
  slug?: InputMaybe<WhereDataStringInput>;
  updatedBy?: InputMaybe<WhereDataStringInput>;
};

export type WhereDataFindAllVideosInput = {
  AND?: InputMaybe<WhereDataFindAllVideosDataInput>;
  NOT?: InputMaybe<WhereDataFindAllVideosDataInput>;
  OR?: InputMaybe<Array<WhereDataFindAllVideosDataInput>>;
};

export type WhereDataIntInput = {
  equals?: InputMaybe<Scalars['Int']>;
};

export type WhereDataSearchInput = {
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type WhereDataStringInput = {
  equals?: InputMaybe<Scalars['String']>;
};
