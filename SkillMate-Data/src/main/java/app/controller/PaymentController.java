package app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import app.entity.PaymentRequest;
import app.service.RazerPayService;

@RestController
@RequestMapping("/payment")
public class PaymentController {

   @Autowired
   private RazerPayService razerPayService;

   // Endpoint to create a payment request
   @PostMapping("/create")
   public String createPayment(@RequestBody PaymentRequest paymentRequest) {
       // Extract amount and currency from the PaymentRequest object
       double amount = paymentRequest.getAmount();
       String currency = paymentRequest.getCurrency();
       return razerPayService.createPaymentRequest(amount, currency);
   }

   // Endpoint to verify payment after success
   @GetMapping("/verify/{paymentId}")
   public String verifyPayment(@PathVariable String paymentId) {
       return razerPayService.verifyPayment(paymentId);
   }

   // Endpoint to process the webhook
   @PostMapping("/webhook")
   public void handlePaymentWebhook(@RequestBody String payload) {
       // Process the webhook payload (payment success/failure)
       System.out.println("Webhook received: " + payload);
   }
}
