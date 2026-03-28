import { NextResponse } from "next/server";
import { registerBodySchema } from "@/src/validator/auth.validator";

const API_URL = process.env.API_URL || "http://localhost:3001/api";

function zodIssuesToDetails(
  issues: { path: (string | number)[]; message: string }[],
): Record<string, string[]> {
  const details: Record<string, string[]> = {};
  for (const issue of issues) {
    const field =
      issue.path.length > 0 ? issue.path.map(String).join(".") : "_general";
    if (!details[field]) details[field] = [];
    details[field].push(issue.message);
  }
  return details;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedData = registerBodySchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            details: zodIssuesToDetails(parsedData.error.issues),
          },
        },
        { status: 400 },
      );
    }

    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsedData.data),
      cache: "no-store",
    });

    let data: Record<string, unknown> = {};
    try {
      data = (await res.json()) as Record<string, unknown>;
    } catch {
      /* empty body */
    }

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          details: null,
        },
      },
      { status: 500 },
    );
  }
}
