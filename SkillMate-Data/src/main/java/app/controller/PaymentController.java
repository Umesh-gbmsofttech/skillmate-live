package app.controller;

import app.service.RazerPayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private RazerPayService razerPayService;

    // Endpoint to create a payment request
    @PostMapping("/create")
    public ResponseEntity<String> createPayment(@RequestBody PaymentRequest paymentRequest) {
        if (paymentRequest.getAmount() <= 0 || paymentRequest.getCurrency() == null
                || paymentRequest.getCurrency().isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid amount or currency");
        }

        try {
            // Create Razorpay payment request
            String orderId = razerPayService.createPaymentRequest(paymentRequest.getAmount(),
                    paymentRequest.getCurrency());

            if (orderId.startsWith("Error")) {
                return ResponseEntity.status(500).body("Error creating payment request");
            }

            return ResponseEntity.ok("{\"orderId\":\"" + orderId + "\"}"); // Return orderId to frontend
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }

    // Endpoint to verify payment after success
    @PostMapping("/verify")
    public ResponseEntity<String> verifyPayment(@RequestBody VerifyPaymentRequest request) {
        // Extract paymentId from the request
        String paymentId = request.getPaymentId();

        // Verify the payment status by paymentId
        String statusMessage = razerPayService.verifyPaymentById(paymentId);

        if (statusMessage.contains("verified")) {
            return ResponseEntity.ok(statusMessage);
        } else {
            return ResponseEntity.status(400).body(statusMessage);
        }
    }

    // DTO class for request body
    public static class VerifyPaymentRequest {
        private String paymentId;

        // Getters and setters
        public String getPaymentId() {
            return paymentId;
        }

        public void setPaymentId(String paymentId) {
            this.paymentId = paymentId;
        }

    }

    // DTO class for payment request body
    public static class PaymentRequest {
        private double amount;
        private String currency;

        // Getters and setters
        public double getAmount() {
            return amount;
        }

        public void setAmount(double amount) {
            this.amount = amount;
        }

        public String getCurrency() {
            return currency;
        }

        public void setCurrency(String currency) {
            this.currency = currency;
        }
    }
}
