import type { Message } from "discord.js"

import { compose, EndoTask, filter } from "@kirrus/core"

import type { Matcher, MessageContext } from "."

/**
 * A helper that sends a message to the channel of the
 * context message.
 *
 * @param message A message to be sent
 */
export const send = (
    message: Message["content"]
): EndoTask<MessageContext> => async context => {
    context.message.channel.send(message)

    return context
}

/**
 * A helper that filters every message context against a
 * matcher and fails if the matcher returns false.
 *
 * @param matcher A matcher to match against
 * @param task A task which to be run after matching
 */
export const matchMessage = (
    matcher: Matcher,
    task: EndoTask<MessageContext>
): EndoTask<MessageContext> =>
    compose(filter(matcher), task)
