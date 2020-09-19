import { Task } from "@kirrus/core"

import { MessageContext } from "."

/**
 * A function that takes a message context and returns
 * whether or not that message matches
 */
export type Matcher = Task<MessageContext, boolean>
