import type { Client, Message } from "discord.js"
import type { ADT } from "ts-adt"

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
