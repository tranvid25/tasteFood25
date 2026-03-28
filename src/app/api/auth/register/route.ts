import { NextResponse } from "next/server";
import { registerBodySchema } from "@/src/validator/auth.validator";

const API_URL = process.env.API_URL || "http://localhost:3001/api";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedData = registerBodySchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        {
          message: "Dữ liệu không hợp lệ",
          errors: parsedData.error.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsedData.data),
      cache: "no-store", 
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(
        { message: data.message || "Đăng ký thất bại, thử lại sau" },
        { status: res.status }
      );
    }
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
