//
//  ApplePayModule.m
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(ApplePayModule, NSObject)

// Initialize the module with Shopify credentials
RCT_EXTERN_METHOD(initialize:(NSString *)apiKey
                  domain:(NSString *)domain
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

// Start Apple Pay checkout process with the cart details
RCT_EXTERN_METHOD(startApplePayCheckout:(NSDictionary *)orderDetails
                  checkoutId:(NSString *)checkoutId
                  shippingRates:(NSArray<NSDictionary *> *)shippingRates
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

// Create a checkout with order details
RCT_EXTERN_METHOD(createCheckout:(NSDictionary *)orderDetails
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

// Fetch available shipping rates for the checkout
RCT_EXTERN_METHOD(fetchAvailableShippingRates:(NSString *)checkoutId
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

// Update checkout with selected shipping rate
RCT_EXTERN_METHOD(updateCheckoutWithShippingRate:(NSString *)checkoutId
                  shippingRateHandle:(NSString *)shippingRateHandle
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
