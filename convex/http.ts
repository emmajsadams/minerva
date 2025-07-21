import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { auth } from "./auth";
import { internal } from "./_generated/api";

const http = httpRouter();

auth.addHttpRoutes(http);

// Handle login notifications with IP address capture
http.route({
  path: "/auth/login-notification",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();
    const { userId, userEmail, userName } = body;

    // Get IP address from request headers
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const ipAddress = forwardedFor?.split(",")[0] || realIp || "unknown";

    // Get user agent
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Schedule the login notification
    await ctx.scheduler.runAfter(
      0,
      internal.auth_notifications.handleLoginNotification,
      {
        userId,
        userEmail,
        userName,
        ipAddress,
        userAgent,
      }
    );

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
});

export default http;
