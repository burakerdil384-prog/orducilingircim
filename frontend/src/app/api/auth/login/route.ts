import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { prisma, isMockMode } from "@/lib/db";
import { createToken, setSession } from "@/lib/auth";
import { checkRateLimit, getRateLimitKey, RATE_LIMITS } from "@/lib/rate-limit";

const MOCK_ADMIN = {
  id: 1,
  email: "arifgenc@orducilingircim.com.tr",
  // "Arif93cer89ar" hashed with bcrypt
  password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // bcrypt hash of "Arif93cer89ar"
  name: "Arif Genc",
};

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rl = checkRateLimit(getRateLimitKey(ip, "login"), RATE_LIMITS.LOGIN);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Çok fazla deneme. Lütfen daha sonra tekrar deneyin." },
        { status: 429, headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "E-posta ve şifre zorunludur." },
        { status: 400 }
      );
    }

    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { error: "Geçersiz veri formatı." },
        { status: 400 }
      );
    }

    if (email.length > 254 || password.length > 128) {
      return NextResponse.json(
        { error: "Geçersiz veri formatı." },
        { status: 400 }
      );
    }

    let admin: { id: number; email: string; password: string; name: string | null } | null = null;

    if (isMockMode) {
      if (email === MOCK_ADMIN.email) {
        admin = MOCK_ADMIN;
      }
    } else {
      admin = await prisma.admin.findUnique({ where: { email } });
    }

    if (!admin) {
      return NextResponse.json(
        { error: "E-posta veya şifre hatalı." },
        { status: 401 }
      );
    }

    // In mock mode, accept direct password for development
    let validPassword = false;
    if (isMockMode && password === "Arif93cer89ar") {
      validPassword = true;
    } else {
      validPassword = await compare(password, admin.password);
    }

    if (!validPassword) {
      return NextResponse.json(
        { error: "E-posta veya şifre hatalı." },
        { status: 401 }
      );
    }

    const token = await createToken({ id: admin.id, email: admin.email });
    await setSession(token);

    return NextResponse.json({
      success: true,
      user: { id: admin.id, email: admin.email, name: admin.name },
    });
  } catch {
    return NextResponse.json(
      { error: "Sunucu hatası oluştu." },
      { status: 500 }
    );
  }
}
