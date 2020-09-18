import type { Message } from "discord.js"

import type { EndoTask } from "@kirrus/core"

import type { Context } from "."
import type { ADTMember } from "./types"

/**
 * A helper that sends a message to the channel of the
 * context message.
 *
 * @param message A message to be sent
 */
export const send = (
    message: Message["content"]
): EndoTask<
    ADTMember<Context, "message">
> => async context => {
    context.message.channel.send(message)

    return context
}
