# CSDLPT

# Hướng dẫn cài đặt và chạy

B1: Mở terminal chạy lệnh npm install để cài đặt các gói cần thiết
B2: Bên cạnh dấu cộng để add terminal có dấu chỉ xuống, click vào và chọn split terminal 3 lần để có 4 terminal test(hoặc bấm Crl+Shift+5 3 lần)
B3: Test: - Đầu tiên mở terminal chạy lệnh bắt đầu Node
+Terminal đầu tiên chạy lệnh: $env:PORT=3001; $env:NODE_NAME="USA_Node"; node site.js (Node A)
+Terminal thứ 2 chạy lệnh: $env:PORT=3002; $env:NODE_NAME="EU_Node"; node site.js (Node B)
+Terminal thứ 3 chạy lệnh: $env:PORT=3003; $env:NODE_NAME="Global_Node"; node site.js (Node Global)
Terminal thứ 4 chạy lệnh: node coordinator.js để hệ thống bắt đầu phân tán dữ liệu
B4:Nếu muốn theo dõi Failure case: Tắt Node B(Crl+C ở terminal thứ 2) và theo dõi(Các dữ liệu phân mảnh trước khi tắt Node B vẫn được lưu bình thường, các dữ liệu phân mảnh thất bại sẽ lưu vào file failed_queue.json)

# Reset và làm lại
Ở bất cứ terminal nào chạy node reset.js


# Khôi phục dữ liệu(mở rộng)
Toàn bộ dữ liệu chưa được phân tán sẽ được lưu trong file failed_queue.json
Khi muốn khôi phục dữ liệu
B1: Quay lại terminal thứ 2 và chạy lại lệnh $env:PORT=3002; $env:NODE_NAME="EU_Node"; node site.js
B2: Mở 1 terminal mới chạy lệnh node recovery.js




