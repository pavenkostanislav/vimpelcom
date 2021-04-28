import { PaginatePipeArgs } from 'ngx-pagination/dist/paginate.pipe';

export interface FilterForm {
  price: number[];
  actions: boolean[];
  rams: boolean[];
  colors: boolean[];
}

export interface Sort {
  key: string;
  order: 'asc' | 'desc';
}

export interface MockDboData {
  paging: PaginatePipeArgs;
  filterForm: FilterForm;
  sort: Sort;
}

export interface Filter {
  name: string;
  key: string;
  type: string;
  isOpen: boolean;
  options: Array<FilterOption> | null;
  hideAll?: boolean;
  valueFrom?: number | null;
  valueTo?: number | null;
  min?: number;
  max?: number;
}

export interface FilterOption {
  name: string;
  color: string | null;
  slug: string;
  isChecked: boolean;
  isDisabled: boolean;
  productsCount: number;
}

export interface MetaApi {
  body: {
    products: ProductApi;
    filters: Array<Filter>;
  };
}

export interface ProductApi {
  list: Array<ProductListApi>;
  paging: { perPage: number; currentPage: number; totalCount: number };
}

export interface ProductListApi {
  name: string;
  thumbImageUrlConverted: string;
  regionProduct: {
    price: number;
    oldPrice: number | null;
    deliveryMethods: Array<MethodApi>;
  };
  feedbackCount: number;
  rate: number;
  parameters: Array<ParameterApi>;
  badges: Array<{
    title: string;
    color: string;
  }>;
}

export interface deliveryMethods {
  type: string;
  price: number;
  delay: null;
  startTime: null;
  endTime: null;
}

export interface MethodApi {
  type: string;
  price: number;
  delay: null;
  startTime: null;
  endTime: null;
}

export interface ParameterApi {
  id: string;
  detailsSlugOrId: number;
  productName: null;
  productId: number;
  shopProductId: number;
  value: string;
  link: null;
  weight: null;
  childValues: null;
  isMultiple: false;
  filterKind: number;
  intagSlug: string;
  intagWeight: number;
  isColor: boolean;
  isUnlimited: boolean;
  unitDisplay: null;
  numValue: null;
  hint: string; //html
  name: string;
  seoKeywords: null;
  seoDescriptions: null;
  seoTitle: null;
  isIndexing: boolean;
}
