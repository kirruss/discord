import type { Client, Message } from "discord.js"
import type { ADT } from "ts-adt"

import type { ADTMember } from "@kirrus/adt"

/**
 * Event context that gets passed to tasks
 */
export type Context = ADT<{
    message: {
        content: Message["content"]
        message: Message
    }
    ready: {}
}> & {
    client: Client
}

/**
 * Helper type that represents the context of the message
 * event
 */
export type MessageContext = ADTMember<Context, "message">
