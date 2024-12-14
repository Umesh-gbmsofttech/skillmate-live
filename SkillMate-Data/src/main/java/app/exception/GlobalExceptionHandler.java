package app.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.validation.BindException;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = Logger.getLogger(GlobalExceptionHandler.class.getName());

    // Handle validation exceptions (e.g., @Valid binding issues)
    @ExceptionHandler(BindException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(BindException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            errors.put(error.getField(), error.getDefaultMessage());
        });
        logger.warning("Validation failed: " + errors);
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    // Handle entity not found exceptions (e.g., custom exceptions like
    // EntityNotFoundException)
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleEntityNotFoundExceptions(EntityNotFoundException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("message", ex.getMessage());
        logger.warning("Entity not found: " + ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    // Handle data integrity violation exceptions (e.g., unique constraint
    // violation)
    @ExceptionHandler(org.springframework.dao.DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, String>> handleDataIntegrityViolationException(
            org.springframework.dao.DataIntegrityViolationException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("message", "Database error: " + ex.getMostSpecificCause().getMessage());
        logger.severe("Data integrity violation: " + ex.getMostSpecificCause().getMessage());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    // Handle general exceptions (e.g., unexpected errors)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGeneralExceptions(Exception ex) {
        Map<String, String> error = new HashMap<>();
        error.put("message", ex.getMessage());
        logger.severe("Unexpected error: " + ex.getMessage());
        ex.printStackTrace(); // Log the stack trace for debugging
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
