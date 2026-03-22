# Sử dụng JDK 17 phân bản nhẹ (alpine) để tiết kiệm dung lượng
FROM eclipse-temurin:21-jdk-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy file .jar từ thư mục target của máy thật vào container
# Lưu ý: Bạn phải chạy 'mvn package' trước để có file này
COPY target/*.jar /app/app.jar

# Lệnh để chạy ứng dụng
ENTRYPOINT ["java", "-jar", "app.jar"]