import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
  try {
    const { userId, has } = req.auth();

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    // ✅ Check plan
    const hasPremiumPlan = await has({ plan: "premium" });

    // ✅ Get user
    const user = await clerkClient.users.getUser(userId);

    // ✅ Get free usage safely
    let free_usage = user.privateMetadata?.free_usage || 0;

    // ✅ If no metadata exists, initialize it
    if (user.privateMetadata?.free_usage === undefined) {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: 0
        }
      });
      free_usage = 0;
    }

    // ✅ Attach to request
    req.free_usage = free_usage;
    req.plan = hasPremiumPlan ? "premium" : "free";

    // ✅ ALWAYS call next()
    next();

  } catch (error) {
    console.log("AUTH ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};