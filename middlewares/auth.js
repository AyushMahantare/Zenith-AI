import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
  try {
    const { userId, has } = req.auth();
    console.log("USER ID:", userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const hasPremiumPlan = await has({ plan: "premium" });

    const user = await clerkClient.users.getUser(userId);

    let free_usage = user.privateMetadata?.free_usage || 0;

    // initialize if not exists
    if (user.privateMetadata?.free_usage === undefined) {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: 0 }
      });
      free_usage = 0;
    }

    req.free_usage = free_usage;
    req.plan = hasPremiumPlan ? "premium" : "free";

    next();

  } catch (error) {
    console.log("AUTH ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};