package app.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Service
public class RazerPayService {

	@Value("${razerpay.api.key.id}")
	private String apiKey;

	@Value("${razerpay.api.key.secret}")
	private String apiKeySecret;

	private final RestTemplate restTemplate;

	public RazerPayService(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}

	private HttpHeaders getHeaders() {
		HttpHeaders headers = new HttpHeaders();
		String authHeader = "Basic " + Base64.getEncoder().encodeToString((apiKey + ":" + apiKeySecret).getBytes());
		headers.set("Authorization", authHeader);
		headers.set("Content-Type", "application/json");
		return headers;
	}

	public String createPaymentRequest(double amount, String currency) {
		String url = "https://api.razorpay.com/v1/orders";
		JSONObject body = new JSONObject();
		body.put("amount", (int) (amount * 100)); // Convert amount to paisa
		body.put("currency", currency);
		body.put("receipt", "receipt#1");

		try {
			HttpEntity<String> entity = new HttpEntity<>(body.toString(), getHeaders());
			ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

			if (response.getStatusCode() != HttpStatus.OK) {
				return "Error: " + response.getBody();
			}

			JSONObject responseJson = new JSONObject(response.getBody());
			return responseJson.getString("id"); // Return orderId to frontend
		} catch (Exception e) {
			e.printStackTrace();
			return "Error creating payment request";
		}
	}

	public String verifyPaymentById(String paymentId) {
		String apiUrl = "https://api.razorpay.com/v1/payments/" + paymentId;
		HttpHeaders headers = getHeaders();

		HttpEntity<String> requestEntity = new HttpEntity<>(headers);
		try {
			ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.GET, requestEntity,
					String.class);

			if (response.getStatusCode() == HttpStatus.OK) {
				JSONObject responseJson = new JSONObject(response.getBody());
				String status = responseJson.getString("status");

				if ("captured".equals(status)) {
					return "Payment verified and captured successfully.";
				} else {
					return "Payment verification failed. Status: " + status;
				}
			} else {
				return "Error retrieving payment status.";
			}
		} catch (Exception e) {
			return "Error verifying payment status: " + e.getMessage();
		}
	}

	// Method to verify the Razorpay payment signature
	public boolean verifyPaymentSignature(String paymentId, String signature) {
		try {
			// Create the string to be signed: paymentId + "|" + apiKeySecret
			String stringToSign = paymentId + "|" + apiKeySecret;
			String generatedSignature = generateHmacSHA256Signature(stringToSign);

			// Compare the generated signature with the one sent by Razorpay
			return generatedSignature.equals(signature);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	private String generateHmacSHA256Signature(String data) throws Exception {
		// Create an HMACSHA256 signer
		SecretKeySpec key = new SecretKeySpec(apiKeySecret.getBytes(), "HmacSHA256");
		Mac mac = Mac.getInstance("HmacSHA256");
		mac.init(key);

		byte[] rawSignature = mac.doFinal(data.getBytes());
		return Base64.getEncoder().encodeToString(rawSignature);
	}

	// Method to check the payment status from Razorpay after signature verification
	public String checkPaymentStatus(String paymentId) {
		String apiUrl = "https://api.razorpay.com/v1/payments/" + paymentId;
		HttpHeaders headers = getHeaders();

		HttpEntity<String> requestEntity = new HttpEntity<>(headers);
		try {
			ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.GET, requestEntity,
					String.class);

			if (response.getStatusCode() == HttpStatus.OK) {
				JSONObject responseJson = new JSONObject(response.getBody());
				String status = responseJson.getString("status");

				if ("captured".equals(status)) {
					return "Payment verified and captured successfully.";
				} else {
					return "Payment verification failed. Status: " + status;
				}
			} else {
				return "Error retrieving payment status.";
			}
		} catch (Exception e) {
			return "Error verifying payment status: " + e.getMessage();
		}
	}
}
