import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";

/**
 * Handle post-login actions including sending notification email
 */
export const handleLoginNotification = internalMutation({
  args: {
    userId: v.id("users"),
    userEmail: v.string(),
    userName: v.optional(v.string()),
    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),
  },
  handler: async (
    ctx,
    { userId, userEmail, userName, ipAddress, userAgent }
  ) => {
    const loginTime = new Date().toISOString();

    // Log the login event (you could store this in a database table for audit trail)
    console.log(`User login: ${userEmail} at ${loginTime}`, {
      userId,
      userEmail,
      userName,
      ipAddress,
      userAgent,
      timestamp: loginTime,
    });

    // Send email notification to admin
    try {
      await ctx.scheduler.runAfter(
        0,
        internal.emails.sendLoginNotificationEmail,
        {
          userEmail,
          userName,
          loginTime: new Date().toLocaleString("en-US", {
            timeZone: "UTC",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZoneName: "short",
          }),
          ipAddress,
          userAgent,
        }
      );

      console.log(`Login notification email queued for ${userEmail}`);
    } catch (error) {
      console.error("Failed to send login notification email:", error);
      // Don't throw here - we don't want to break login if email fails
    }
  },
});

/**
 * Get user info for login notifications
 */
export const getUserForLoginNotification = internalQuery({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, { userId }) => {
    const user = await ctx.db.get(userId);
    return user
      ? {
          email: user.email,
          name: user.name,
        }
      : null;
  },
});
