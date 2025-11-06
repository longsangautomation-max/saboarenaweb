#!/usr/bin/env python3
"""
SABO Arena - Create News via REST API
Uses Supabase REST API to insert sample data
"""

import requests
import json
from datetime import datetime, timedelta

# Supabase configuration
PROJECT_ID = "mogjjvscxjwvhtpkrlqr"
SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzkxOTU4MCwiZXhwIjoyMDczNDk1NTgwfQ.T2ntQv-z2EL4mkGb9b3QyXM3dT8pAOFSPKvqWPd7Xoo"
SUPABASE_URL = f"https://{PROJECT_ID}.supabase.co"

headers = {
    "apikey": SERVICE_KEY,
    "Authorization": f"Bearer {SERVICE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}

print("=" * 70)
print("  SABO ARENA - Setup News via REST API")
print("=" * 70)
print()

# Check existing table
print("[1/2] Checking database...")
response = requests.get(
    f"{SUPABASE_URL}/rest/v1/news?select=id&limit=1",
    headers=headers
)

if response.status_code == 200:
    print("      ✓ News table exists!")
    
    # Get count
    count_response = requests.get(
        f"{SUPABASE_URL}/rest/v1/news?select=count",
        headers={**headers, "Prefer": "count=exact"}
    )
    count = count_response.headers.get('Content-Range', '0/0').split('/')[-1]
    print(f"      ℹ Found {count} articles")
    
    if int(count) > 0:
        print()
        print("=" * 70)
        print("  ✓ Database already has data!")
        print("=" * 70)
        print()
        print("Open http://localhost:8082 to test")
        exit(0)
    
    print()
    print("[2/2] Inserting sample articles...")
    
    # Sample data
    now = datetime.utcnow().isoformat()
    articles = [
        {
            "title": "Giải Vô Địch Quốc Gia 2024 - Khởi Tranh Với 128 Tay Cơ Xuất Sắc",
            "title_en": "National Championship 2024 - Starting with 128 Excellent Players",
            "slug": "giai-vo-dich-quoc-gia-2024",
            "excerpt": "Giải đấu billiards lớn nhất năm chính thức khai màn với sự tham gia của 128 tay cơ hàng đầu cả nước.",
            "excerpt_en": "The biggest billiards tournament of the year officially kicks off with 128 top players nationwide.",
            "content": """# Giải Vô Địch Quốc Gia 2024

Giải đấu billiards lớn nhất năm đã chính thức khởi tranh tại **SABO Arena** với sự tham gia của 128 tay cơ xuất sắc nhất cả nước.

## Điểm Nhấn

- **128 tay cơ** từ khắp cả nước
- Tổng giải thưởng **500 triệu đồng**
- Hệ thống bàn thi đấu chuẩn quốc tế
- Trực tiếp toàn bộ các trận đấu

## Lịch Thi Đấu

Giải đấu diễn ra trong **2 tuần**, từ ngày 15/03 đến 29/03/2024.

> "Đây là sân chơi lớn nhất trong năm để các tay cơ thể hiện kỹ năng" - Ban tổ chức

Theo dõi trực tiếp tại website hoặc đến trực tiếp SABO Arena!""",
            "content_en": """# National Championship 2024

The biggest billiards tournament of the year has officially started at **SABO Arena** with 128 excellent players nationwide.

## Highlights

- **128 players** from all over the country
- Total prize pool **500 million VND**
- International standard tables
- Live streaming all matches

## Schedule

The tournament takes place over **2 weeks**, from March 15 to March 29, 2024.

> "This is the biggest playground of the year for players to show their skills" - Organizing Committee

Watch live on website or come directly to SABO Arena!""",
            "category": "tournament",
            "cover_image_url": "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800",
            "published_at": (datetime.utcnow() - timedelta(days=2)).isoformat(),
            "views": 1250,
            "is_featured": True,
            "status": "published"
        },
        {
            "title": "Top 10 Tay Cơ Xuất Sắc Nhất Tháng 2/2024",
            "title_en": "Top 10 Best Players of February 2024",
            "slug": "top-10-tay-co-xuat-sac-thang-2-2024",
            "excerpt": "Bảng xếp hạng 10 tay cơ có phong độ ấn tượng nhất trong tháng vừa qua.",
            "excerpt_en": "Ranking of 10 players with the most impressive performance last month.",
            "content": """# Top 10 Tay Cơ Xuất Sắc Nhất Tháng 2/2024

## Bảng Xếp Hạng

1. **Nguyễn Văn A** - 2,450 SPA
2. **Trần Thị B** - 2,380 SPA
3. **Lê Văn C** - 2,320 SPA

Các tay cơ này đã có những màn thể hiện xuất sắc trong các giải đấu tháng 2.

## Thống Kê

- Tổng số trận: 1,234
- Tỷ lệ thắng trung bình: 68%
- Highest break: 147 (Nguyễn Văn A)""",
            "content_en": """# Top 10 Best Players of February 2024

## Rankings

1. **Nguyen Van A** - 2,450 SPA
2. **Tran Thi B** - 2,380 SPA
3. **Le Van C** - 2,320 SPA

These players had excellent performances in February tournaments.

## Statistics

- Total matches: 1,234
- Average win rate: 68%
- Highest break: 147 (Nguyen Van A)""",
            "category": "players",
            "cover_image_url": "https://images.unsplash.com/photo-1534158914592-062992fbe900?w=800",
            "published_at": (datetime.utcnow() - timedelta(days=5)).isoformat(),
            "views": 890,
            "is_featured": False,
            "status": "published"
        },
        {
            "title": "Kỹ Thuật Đánh Bi Cơ Bản Dành Cho Người Mới",
            "title_en": "Basic Billiards Techniques for Beginners",
            "slug": "ky-thuat-danh-bi-co-ban",
            "excerpt": "Hướng dẫn chi tiết các kỹ thuật cơ bản giúp người mới bắt đầu chơi bi-a hiệu quả.",
            "excerpt_en": "Detailed guide on basic techniques to help beginners play billiards effectively.",
            "content": """# Kỹ Thuật Đánh Bi Cơ Bản

## 1. Tư Thế Đứng

Tư thế đứng đúng là nền tảng quan trọng nhất.

### Các Bước:

- Đứng vững chắc
- Chân trước hơi gập
- Chân sau thẳng
- Cơ thể nghiêng về phía bàn

## 2. Cầm Cơ

Cầm cơ đúng cách giúp cú đánh chính xác hơn.

## 3. Nhắm Bóng

> "Practice makes perfect" - Hãy luyện tập thường xuyên!

## Mẹo Nhỏ

- Tập trung quan sát bi
- Thở đều khi đánh
- Không vội vàng""",
            "content_en": """# Basic Billiards Techniques

## 1. Stance

Proper stance is the most important foundation.

### Steps:

- Stand firmly
- Front leg slightly bent
- Back leg straight
- Body leaning towards table

## 2. Cue Grip

Proper cue grip helps accurate shots.

## 3. Aiming

> "Practice makes perfect" - Practice regularly!

## Tips

- Focus on the ball
- Breathe evenly when shooting
- Don't rush""",
            "category": "guide",
            "cover_image_url": "https://images.unsplash.com/photo-1626466218177-cfdc95fa9042?w=800",
            "published_at": (datetime.utcnow() - timedelta(days=7)).isoformat(),
            "views": 2100,
            "is_featured": True,
            "status": "published"
        }
    ]
    
    # Insert articles
    for i, article in enumerate(articles, 1):
        response = requests.post(
            f"{SUPABASE_URL}/rest/v1/news",
            headers=headers,
            json=article
        )
        
        if response.status_code in [200, 201]:
            print(f"      ✓ Article {i}/3: {article['title'][:40]}...")
        else:
            print(f"      ✗ Article {i}/3 failed: {response.text}")
    
    print()
    print("=" * 70)
    print("  ✓ Setup completed!")
    print("=" * 70)
    print()
    print("Next steps:")
    print("  1. Open http://localhost:8082")
    print("  2. Scroll to 'Tin Tức Mới Nhất'")
    print("  3. Click any article")
    print()
    
else:
    print(f"      ✗ Table not found (Error: {response.status_code})")
    print()
    print("Bạn cần tạo table 'news' trước!")
    print()
    print("Mở SQL Editor và chạy file: supabase_news_schema.sql")
    print(f"URL: https://supabase.com/dashboard/project/{PROJECT_ID}/sql/new")
