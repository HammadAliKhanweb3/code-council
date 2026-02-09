import { Inngest } from "inngest";
import { sentryMiddleware } from "@inngest/middleware-sentry";

    
const inngest = new Inngest({
  id: "code-council",
  middleware: [sentryMiddleware()],
});