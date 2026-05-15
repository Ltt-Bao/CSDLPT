import csv
import random

def generate_logistics_data(filename="dataset.csv", num_rows=1000):
    # Cố tình đưa 'USA' và 'EU' vào để phục vụ tập predicate của đề bài
    countries = ['USA', 'EU', 'Vietnam', 'Japan', 'Brazil', 'Australia']
    priorities = ['Low', 'Medium', 'High', 'Critical']
    statuses = ['Pending', 'In Transit', 'Cleared Customs', 'Delivered']

    with open(filename, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        # Ghi dòng tiêu đề (Header)
        writer.writerow(['ShipID', 'Origin_Country', 'Weight', 'Priority', 'Status'])

        for i in range(1, num_rows + 1):
            ship_id = f"SHP{i:04d}"
            country = random.choice(countries)
            # Sinh random cân nặng từ 10kg đến 1000kg (để cover được điều kiện Weight > 500)
            weight = round(random.uniform(10.0, 1000.0), 1)
            priority = random.choice(priorities)
            status = random.choice(statuses)

            writer.writerow([ship_id, country, weight, priority, status])

if __name__ == "__main__":
    generate_logistics_data()
    print("Đã tạo thành công file dataset.csv với 1.000 dòng dữ liệu!")