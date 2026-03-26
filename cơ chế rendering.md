# cơ chế rendering
Có 2 môi trường mà web chúng ta có thể render

Client:đại diện trình duyệt người dùng
Server:đại diện cho máy chủ nơi chứa data và trả về respone


Client và server là 2 môi trường tách biệt nhau  đây gọi là network boundary


Vì next.js có khả năng render code React ở server và client nên đôi khi dev hiểu nhầm răng 2 môi trường là một.

Với Nextjs ,code lúc nào cũng phải phân biệt rõ ràng giữa 2 môi trường này bằng từ khóa 'use client' hoặc 'use server'

Ví dụ đang ở môi trường clieent,muốn truy cập data ở serve thì cần phải gửi 1 request đến server mới lấy được