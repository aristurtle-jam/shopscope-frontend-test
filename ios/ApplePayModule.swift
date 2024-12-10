import Foundation
import React
import MobileBuySDK
import PassKit

@objc(ApplePayModule)
class ApplePayModule: NSObject, RCTBridgeModule {
  static func moduleName() -> String! {
    return "ApplePayModule"
  }

  private var client: Graph.Client?
  private var checkoutId: String? // Add this line to store the checkoutId
  private var totalPaymentAmount: NSDecimalNumber? // Add this line to store the checkoutId



  @objc
    func initialize(_ apiKey: String, domain: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
      client = Graph.Client(shopDomain: domain, apiKey: apiKey, locale: Locale(identifier: "en-US"))
      
      guard let client = client else {
        let error = NSError(domain: "", code: 200, userInfo: [NSLocalizedDescriptionKey: "Client initialization failed"])
        rejecter("client_initialization_failed", "Client initialization failed", error)
        return
      }

      client.cachePolicy = .cacheFirst(expireIn: 3600)
      
      // Construct GraphQL query to fetch shop details
      let query = Storefront.buildQuery { $0
        .shop { $0
          .name()
          .primaryDomain { $0
            .url()
          }
        }
      }

      // Execute the GraphQL query
      let task = client.queryGraphWith(query, cachePolicy: .networkOnly) { response, error in
        if let error = error {
          print("Error fetching shop details: \(error.localizedDescription)")
          if let queryError = error as? Graph.QueryError {
            print("GraphQL query error details: \(queryError)")
          }
          let nsError = NSError(domain: "", code: 200, userInfo: [NSLocalizedDescriptionKey: error.localizedDescription])
          rejecter("shop_fetch_failed", "Failed to fetch shop details", nsError)
        } else if let shop = response?.shop {
          print("Shop details - Name: \(shop.name), Domain: \(shop.primaryDomain.url)")
          resolver("Client initialized successfully. Shop name: \(shop.name), Domain: \(shop.primaryDomain.url)")
        } else {
          print("Failed to fetch shop details")
          let nsError = NSError(domain: "", code: 200, userInfo: [NSLocalizedDescriptionKey: "Failed to fetch shop details"])
          rejecter("shop_fetch_failed", "Failed to fetch shop details", nsError)
        }
      }

      task.resume()
    }
  
  
  @objc
    func createCheckout(_ orderDetails: NSDictionary, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
      guard let client = client else {
        let error = NSError(domain: "", code: 100, userInfo: [NSLocalizedDescriptionKey: "Client not initialized"])
        rejecter("client_not_initialized", "Client not initialized", error)
        return
      }

      guard let lineItems = orderDetails["line_items"] as? [[String: Any]] else {
        let error = NSError(domain: "", code: 101, userInfo: [NSLocalizedDescriptionKey: "Invalid order details"])
        rejecter("invalid_order_details", "Invalid order details", error)
        return
      }
      
      // Hardcoded values for testing
          let email = "hunainhumail786@gmail.com"
          let shippingRate = 5.00 // USD
          let shippingLine = "Standard Shipping"

      let lineItemsInput = lineItems.map { item in
            // Convert the numeric ID to a global ID
            let variantId = item["variant_id"] as! Int
            let globalVariantId = "gid://shopify/ProductVariant/\(variantId)".data(using: .utf8)!.base64EncodedString()
            
            return Storefront.CheckoutLineItemInput.create(
              quantity: Int32(item["quantity"] as! Int),
              variantId: GraphQL.ID(rawValue: globalVariantId)
            )
          }
      
      
      // Hardcoded shipping address
      let shippingAddress = Storefront.MailingAddressInput(
          address1: "123 Test St",
          city: "Test City",
          country: "US",
          firstName: "John",
          lastName: "Doe",
          province: "CA",
          zip: "90001"
      )
      
      let input = Storefront.CheckoutCreateInput.create(
              email: .value("hunainhumail786@gmail.com"), // Optional: Include email if available
              lineItems: .value(lineItemsInput),
              shippingAddress: .value(shippingAddress)
          )


      let mutation = Storefront.buildMutation { $0
        .checkoutCreate(input: input) { $0
          .checkout { $0
            .id()
            .webUrl()
          }
          .userErrors { $0
            .field()
            .message()
          }
        }
      }

      let task = client.mutateGraphWith(mutation) { response, error in
        if let error = error {
          print("Failed to create checkout: \(error)")
          rejecter("checkout_creation_failed", "Failed to create checkout", error)
        } else if let checkout = response?.checkoutCreate?.checkout {
          self.checkoutId = checkout.id.rawValue // Store the checkout ID
          resolver(checkout.id.rawValue)
        } else if let userErrors = response?.checkoutCreate?.userErrors {
          let errorMessages = userErrors.map { $0.message }.joined(separator: ", ")
          let error = NSError(domain: "", code: 102, userInfo: [NSLocalizedDescriptionKey: errorMessages])
          rejecter("checkout_creation_failed", errorMessages, error)
        }
      }

      task.resume()
    }
  
  
  @objc(fetchAvailableShippingRates:resolver:rejecter:)
  func fetchAvailableShippingRates(checkoutId: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
      guard let client = client else {
          let error = NSError(domain: "", code: 200, userInfo: [NSLocalizedDescriptionKey: "Client not initialized"])
          rejecter("client_not_initialized", "Client not initialized", error)
          return
      }

      let query = Storefront.buildQuery { $0
          .node(id: GraphQL.ID(rawValue: checkoutId)) { $0
              .onCheckout { $0
                  .availableShippingRates { $0
                      .ready()
                      .shippingRates { $0
                          .handle()
                          .price { $0
                              .amount()
                              .currencyCode()
                          }
                          .title()
                      }
                  }
              }
          }
      }

      let task = client.queryGraphWith(query) { response, error in
          if let error = error {
              print("Failed to fetch shipping rates: \(error)")
              rejecter("shipping_rates_fetch_failed", "Failed to fetch shipping rates", error)
              return
          }

          guard let checkout = response?.node as? Storefront.Checkout,
                let shippingRates = checkout.availableShippingRates?.shippingRates else {
              let error = NSError(domain: "", code: 201, userInfo: [NSLocalizedDescriptionKey: "No available shipping rates"])
              rejecter("no_shipping_rates", "No available shipping rates", error)
              return
          }

          let rates = shippingRates.map { rate in
              return [
                  "handle": rate.handle,
                  "title": rate.title,
                  "amount": rate.price.amount,
                  "currency": rate.price.currencyCode.rawValue
              ]
          }

          resolver(rates)
      }

      task.resume()
  }
  
  @objc
  func updateCheckoutWithShippingRate(_ checkoutId: String, shippingRateHandle: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
      guard let client = client else {
          let error = NSError(domain: "", code: 300, userInfo: [NSLocalizedDescriptionKey: "Client not initialized"])
          rejecter("client_not_initialized", "Client not initialized", error)
          return
      }

      let mutation = Storefront.buildMutation { $0
          .checkoutShippingLineUpdate(checkoutId: GraphQL.ID(rawValue: checkoutId), shippingRateHandle: shippingRateHandle) { $0
              .checkout { $0
                  .id()
                  .webUrl()
              }
              .checkoutUserErrors { $0
                  .field()
                  .message()
              }
          }
      }

      let task = client.mutateGraphWith(mutation) { response, error in
          if let error = error {
              print("Failed to update shipping line: \(error)")
              rejecter("shipping_line_update_failed", "Failed to update shipping line", error)
          } else if let checkout = response?.checkoutShippingLineUpdate?.checkout {
            let webUrl = checkout.webUrl.absoluteString
              print("Shipping line updated successfully: \(webUrl)")
              resolver(webUrl)
          } else if let userErrors = response?.checkoutShippingLineUpdate?.userErrors {
              let errorMessages = userErrors.map { $0.message }.joined(separator: ", ")
              let error = NSError(domain: "", code: 301, userInfo: [NSLocalizedDescriptionKey: errorMessages])
              rejecter("shipping_line_update_failed", errorMessages, error)
          }
      }

      task.resume()
  }




  @objc
  func startApplePayCheckout(_ orderDetails: NSDictionary, checkoutId: String, shippingRates: [[String: Any]], resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
      do {
          guard let client = client else {
              throw NSError(domain: "ApplePayModuleError", code: 100, userInfo: [NSLocalizedDescriptionKey: "Client not initialized"])
          }

          guard let items = orderDetails["items"] as? [[String: Any]],
                let totalAmount = orderDetails["totalAmount"] as? String,
                let currencyCode = orderDetails["currencyCode"] as? String,
                let countryCode = orderDetails["countryCode"] as? String else {
              throw NSError(domain: "ApplePayModuleError", code: 101, userInfo: [NSLocalizedDescriptionKey: "Invalid order details"])
          }

          self.checkoutId = checkoutId // Store the checkoutId
        
          let request = PKPaymentRequest()
          request.merchantIdentifier = "merchant.shopscope.com"
          request.supportedNetworks = [.visa, .masterCard, .amex]
          request.merchantCapabilities = .capability3DS
          request.countryCode = "AU"
          request.currencyCode = "AUD"
        
        // Extract the amount from shippingRates
                guard let shippingRate = shippingRates.first,
                      let shippingAmount = shippingRate["amount"] as? Double else {
                    throw NSError(domain: "ApplePayModuleError", code: 102, userInfo: [NSLocalizedDescriptionKey: "Invalid shipping rates"])
                }

        // Extract the amount from shippingRates
                guard let shippingRate = shippingRates.first,
                      let shippingAmount = shippingRate["amount"] as? Double else {
                    throw NSError(domain: "ApplePayModuleError", code: 102, userInfo: [NSLocalizedDescriptionKey: "Invalid shipping rates"])
                }

                // Use the extracted shipping amount
        self.totalPaymentAmount = NSDecimalNumber(string: totalAmount).adding(NSDecimalNumber(value: shippingAmount))

                // Use the total payment amount correctly
        let totalSummaryItem = PKPaymentSummaryItem(label: "Total", amount: totalPaymentAmount ?? 0.00)
        print("Initiating Apple Pay with amount: \(totalPaymentAmount) \(currencyCode), country: \(countryCode)")

        let summaryItem = PKPaymentSummaryItem(label: "Total Amount", amount: totalPaymentAmount ?? 0.00)
          request.paymentSummaryItems = [summaryItem, totalSummaryItem]

          guard let paymentController = PKPaymentAuthorizationViewController(paymentRequest: request) else {
              throw NSError(domain: "ApplePayModuleError", code: 102, userInfo: [NSLocalizedDescriptionKey: "Failed to create PKPaymentAuthorizationViewController"])
          }

          paymentController.delegate = self
          DispatchQueue.main.async {
              UIApplication.shared.keyWindow?.rootViewController?.present(paymentController, animated: true, completion: nil)
          }

          resolver("Apple Pay checkout started successfully")
      } catch {
          rejecter("apple_pay_error", "Error starting Apple Pay checkout", error)
      }
  }
}



extension ApplePayModule: PKPaymentAuthorizationViewControllerDelegate {
    @objc(paymentAuthorizationViewController:didAuthorizePayment:completion:)
    func paymentAuthorizationViewController(_ controller: PKPaymentAuthorizationViewController, didAuthorizePayment payment: PKPayment, completion: @escaping (PKPaymentAuthorizationResult) -> Void) {
        guard let checkoutId = self.checkoutId else {
            completion(PKPaymentAuthorizationResult(status: .failure, errors: [NSError(domain: "ApplePayModuleError", code: 103, userInfo: [NSLocalizedDescriptionKey: "Checkout ID is missing"])]))
            return
        }
        
        // Pass totalPaymentAmount to processPayment
        let totalPaymentAmount = self.totalPaymentAmount ?? NSDecimalNumber(value: 0) // Default to 0 if not set
        
        processPayment(payment, checkoutId: checkoutId, totalPaymentAmount: totalPaymentAmount) { success, error in
            if success {
                print("[ApplePayModule] Payment authorized successfully for checkout ID: \(checkoutId)")
                completion(PKPaymentAuthorizationResult(status: .success, errors: nil))
            } else if let error = error {
                print("[ApplePayModule] Payment authorization failed with error: \(error.localizedDescription), Code: \(error.code), Domain: \(error.domain)")
                completion(PKPaymentAuthorizationResult(status: .failure, errors: [error]))
            } else {
                let unknownErrorDescription = "Unknown error occurred during payment authorization"
                print("[ApplePayModule] \(unknownErrorDescription)")
                completion(PKPaymentAuthorizationResult(status: .failure, errors: [NSError(domain: "ApplePayModuleError", code: 105, userInfo: [NSLocalizedDescriptionKey: unknownErrorDescription])]))
            }
        }
    }
    
    @objc(paymentAuthorizationViewControllerDidFinish:)
    func paymentAuthorizationViewControllerDidFinish(_ controller: PKPaymentAuthorizationViewController) {
        print("Payment authorization view controller did finish.")
        controller.dismiss(animated: true, completion: nil)
    }
    

  func processPayment(_ payment: PKPayment, checkoutId: String, totalPaymentAmount: NSDecimalNumber, completion: @escaping (Bool, NSError?) -> Void) {
      guard let client = client else {
          completion(false, NSError(domain: "ApplePayModuleError", code: 100, userInfo: [NSLocalizedDescriptionKey: "Client not initialized"]))
          return
      }

      let paymentData = payment.token

      let mutation = Storefront.buildMutation { $0
          .checkoutCompleteWithTokenizedPaymentV3(checkoutId: GraphQL.ID(rawValue: checkoutId), payment: Storefront.TokenizedPaymentInputV3(
            paymentAmount: Storefront.MoneyInput(
                                amount: Decimal(totalPaymentAmount.doubleValue), // Corrected this line
                                currencyCode: Storefront.CurrencyCode.aud
                            ),
              idempotencyKey: UUID().uuidString,
              billingAddress: Storefront.MailingAddressInput(address1: "1 Infinite Loop", city: "Cupertino", country: "US", firstName: "John", lastName: "Doe", province: "CA", zip: "95014"),
              paymentData: payment.token.paymentData.base64EncodedString(),
              type: Storefront.PaymentTokenType.applePay,
              test: true
          )) { $0
              .payment { $0
                  .id()
                  .ready()
              }
              .checkout { $0
                  .id()
                  .webUrl()
              }
              .checkoutUserErrors { $0
                  .field()
                  .message()
              }
          }
      }

      print("Executing mutation: \(mutation)")

      let task = client.mutateGraphWith(mutation) { response, error in
          if let error = error {
              print("Failed to complete payment: \(error)")
              completion(false, NSError(domain: "ApplePayModuleError", code: 104, userInfo: [NSLocalizedDescriptionKey: "Failed to complete payment"]))
          } else {
              print("Payment completed successfully: \(String(describing: response))")

              // Extract payment ID
              if let paymentId = response?.checkoutCompleteWithTokenizedPaymentV3?.payment?.id.rawValue {
                  // Now execute the payment verification query
                  let query = Storefront.buildQuery { $0
                      .node(id: GraphQL.ID(rawValue: paymentId)) { $0
                          .onPayment { $0
                              .errorMessage()
                              .ready()
                              .transaction { $0
                                  .status()
                                  .kind()
                              }
                          }
                      }
                  }

                  print("Executing payment status query: \(query)")

                  let queryTask = client.queryGraphWith(query) { queryResponse, queryError in
                      if let queryError = queryError {
                          print("Failed to verify payment status: \(queryError)")
                          completion(false, NSError(domain: "ApplePayModuleError", code: 108, userInfo: [NSLocalizedDescriptionKey: "Failed to verify payment status"]))
                      } else if let node = queryResponse?.node as? Storefront.Payment {
                          if let errorMessage = node.errorMessage {
                              print("Payment error message: \(errorMessage)")
                              completion(false, NSError(domain: "ApplePayModuleError", code: 109, userInfo: [NSLocalizedDescriptionKey: errorMessage]))
                          } else {
                              print("Payment ready: \(node.ready)")
                              if let transaction = node.transaction {
                                let transactionStatusString = transaction.status.rawValue ?? "Unknown"
                                let transactionKindString = transaction.kind.rawValue ?? "Unknown"

                                                                print("Transaction status: \(transactionStatusString)")
                                                                print("Transaction kind: \(transactionKindString)")

                                  if transaction.status == .some(.success) {
                                      completion(true, nil)
                                  } else {
                                      completion(false, NSError(domain: "ApplePayModuleError", code: 110, userInfo: [NSLocalizedDescriptionKey: "Payment not successful"]))
                                  }
                              } else {
                                  completion(false, NSError(domain: "ApplePayModuleError", code: 111, userInfo: [NSLocalizedDescriptionKey: "Transaction details not found"]))
                              }
                          }
                      } else {
                          print("Payment details not found.")
                          completion(false, NSError(domain: "ApplePayModuleError", code: 112, userInfo: [NSLocalizedDescriptionKey: "Payment details not found"]))
                      }
                  }

                  queryTask.resume()
              } else {
                  completion(false, NSError(domain: "ApplePayModuleError", code: 107, userInfo: [NSLocalizedDescriptionKey: "Payment ID not found"]))
              }
          }
      }
      task.resume()
  }

}
