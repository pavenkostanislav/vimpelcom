package com.example.dto;

class Option {
    public String name;
    public String color;
    public String slug;
    public boolean isChecked;
    public boolean isDisabled;
    public int productsCount;
}

class Filter {
    public String name;
    public String slug;
    public String key;
    public String type;
    public Object valueFrom;
    public Object valueTo;
    public List<Option> options;
    public boolean isOpen;
    public double min;
    public double max;
    public boolean isSeoUrlAllowed;
    public String intagId;
}

class DeliveryMethod {
    public String type;
    public double price;
    public int delay;
    public Object startTime;
    public Object endTime;
}

class RegionProduct {
    public double price;
    public String soc;
    public double oldPrice;
    public int remain;
    public boolean remainOp;
    public Object label;
    public Object marketingTag;
    public Object promotionId;
    public List<DeliveryMethod> deliveryMethods;
    public Object dpcId;
    public double discount;
    public String discountFormatted;
    public boolean hideOldPrice;
    public boolean hasOldPrice;
    public Object shopActionIsAuthorized;
    public Object shopActionRelatedIds;
    public Object shopRelatedServices;
    public Object shopActionCampaigns;
    public int bonusCount;
    public int regionId;
}

class ContentPromotion {
    public String description;
    public String title;
    public Object badge;
    public boolean hasTitle;
    public boolean isIndexed;
    public String descriptionHtml;
    public String url;
}

class Parameter {
    public String id;
    public Object detailsSlugOrId;
    public Object productName;
    public int productId;
    public Object shopProductId;
    public String value;
    public Object link;
    public Object weight;
    public Object childValues;
    public boolean isMultiple;
    public int filterKind;
    public String intagSlug;
    public double intagWeight;
    public boolean isColor;
    public boolean isUnlimited;
    public Object unitDisplay;
    public Object numValue;
    public String hint;
    public String name;
    public Object seoKeywords;
    public Object seoDescriptions;
    public Object seoTitle;
    public boolean isIndexing;
}

class Badge {
    public String title;
    public String content;
    public String color;
    public String slug;
    public String displayText;
    public String foreColor;
}

class ExtraProduct {
    public int id;
    public String name;
    public double price;
    public String priceFormatted;
    public double oldPrice;
    public String oldPriceFormatted;
    public int kind;
    public String kindFormatted;
    public String legal;
    public String imageUrl;
}

class ProductPromotion {
    public int id;
    public Object leasingProductCode;
    public String name;
    public String slug;
    public String productSlug;
    public boolean isActive;
    public boolean hasDoublePrice;
    public String htmlDescription;
    public int type;
    public boolean isOnlyWithPromo;
    public String titleWithPromo;
    public String titleWithoutPromo;
    public int remain;
    public boolean remainOp;
    public String bundleTitle;
    public Object tariffBriefParameters;
    public Object plainBriefParameters;
    public Object tariff;
    public boolean isTariffBundle;
    public String productWithPromotionSlug;
    public boolean canBuyWithoutPromo;
    public String htmlDescriptionWithPrice;
    public double price;
    public double bundlePrice;
    public String bundlePriceFormatted;
    public String priceFormatted;
    public String newPriceFormatted;
    public double priceWithoutPromotion;
    public String priceWithoutPromotionFormatted;
    public double productPrice;
    public String productPriceFormatted;
    public double priceWithPromotion;
    public String priceWithPromotionFormatted;
    public double extraProductsPrice;
    public String extraProductsPriceFormatted;
    public List<Object> benefits;
    public boolean valuePreposition;
    public boolean credit;
    public List<ExtraProduct> extraProducts;
    public List<DeliveryMethod> deliveryMethods;
}

class Method {
    public String type;
    public double price;
    public int delay;
    public Object startTime;
    public Object endTime;
}

class Delivery {
    public List<Method> methods;
    public boolean useMethods;
    public String pickupUrl;
    public String courierUrl;
}

class Esim {
    public boolean hasESim;
}

class List {
    public boolean hasLeasing;
    public int id;
    public boolean isTariff;
    public int dpcId;
    public String name;
    public String article;
    public String brandName;
    public String thumbImageUrlConverted;
    public double oldPriceIfBundle;
    public String oldPriceIfBundleFormatted;
    public boolean isPromoPriceMoreThanLimit;
    public RegionProduct regionProduct;
    public boolean isPreorder;
    public ContentPromotion contentPromotion;
    public List<Object> benefits;
    public String urlSlug;
    public boolean hasPreorderAnnouncement;
    public Object preorderAnnouncement;
    public boolean showPreorderDate;
    public boolean showPreorderPriceOnView;
    public Date preorderStartDate;
    public List<Parameter> parameters;
    public boolean showPreorderDateOnly;
    public List<Badge> badges;
    public double rate;
    public int feedbackCount;
    public boolean hasRemainsShop;
    public boolean hasRemainsOffice;
    public boolean isPromotionBundle;
    public ProductPromotion productPromotion;
    public String mainEquipmentBundleNote;
    public String additionalEquipmentBundleNote;
    public boolean isOutOfStock;
    public Object outOfStockReasonSlug;
    public Object outOfStockMessageTemplate;
    public boolean isMultiCard;
    public Object multiProductId;
    public Object partnerSlug;
    public Delivery delivery;
    public Esim esim;
}

class Paging {
    public int perPage;
    public int currentPage;
    public int totalCount;
}

class Products {
    public List<List> list;
    public String updateMethodUrl;
    public Paging paging;
    public String requestUnexpectedErrorMessage;
    public String requestEmptyListErrorMessage;
}

class Body {
    public List<Filter> filters;
    public Products products;
}

public class Root {
    public Body body;
}

