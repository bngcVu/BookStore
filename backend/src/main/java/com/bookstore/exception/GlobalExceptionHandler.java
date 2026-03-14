package com.bookstore.exception;

import com.bookstore.api.response.ApiResponse;
import jakarta.validation.ConstraintViolationException;
import java.util.LinkedHashMap;
import java.util.Map;
import org.slf4j.MDC;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AppException.class)
    public ResponseEntity<ApiResponse<Object>> handleAppException(AppException ex) {
        Map<String, Object> data = new LinkedHashMap<>();
        data.put("errorCode", ex.getErrorCode().name());
        data.put("details", ex.getDetails());
        data.put("traceId", MDC.get("traceId"));
        return ResponseEntity.status(ex.getErrorCode().status())
                .body(ApiResponse.error(ex.getMessage(), data));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Object>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> fieldErrors = new LinkedHashMap<>();
        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            fieldErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        Map<String, Object> data = new LinkedHashMap<>();
        data.put("errorCode", ErrorCode.VALIDATION_ERROR.name());
        data.put("details", fieldErrors);
        data.put("traceId", MDC.get("traceId"));

        return ResponseEntity.badRequest()
                .body(ApiResponse.error(ErrorCode.VALIDATION_ERROR.defaultMessage(), data));
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiResponse<Object>> handleConstraintViolation(ConstraintViolationException ex) {
        Map<String, Object> data = new LinkedHashMap<>();
        data.put("errorCode", ErrorCode.VALIDATION_ERROR.name());
        data.put("details", ex.getMessage());
        data.put("traceId", MDC.get("traceId"));
        return ResponseEntity.badRequest()
                .body(ApiResponse.error(ErrorCode.VALIDATION_ERROR.defaultMessage(), data));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleUnexpected(Exception ex) {
        Map<String, Object> data = new LinkedHashMap<>();
        data.put("errorCode", ErrorCode.INTERNAL_SERVER_ERROR.name());
        data.put("traceId", MDC.get("traceId"));
        data.put("message", ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error(ErrorCode.INTERNAL_SERVER_ERROR.defaultMessage(), data));
    }
}
