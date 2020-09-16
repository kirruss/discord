import { Client, ClientOptions, Message } from "discord.js"
import type { ADT } from "ts-adt"

import { Task } from "@kirrus/core"
import { generateMatchers } from "@kirrus/adt"

interface DiscordOptions extends ClientOptions {
    token: string
    listenToSelf?: boolean
}

/**
 * Event context that gets passed to tasks
 */
export type Context = ADT<{
    message: {
        content: Message["content"]
        message: Message
    }
}> & {
    client: Client
}

export type DiscordPart<I = {}, O = Context & I> = Task<
    Context & I,
    O
>

export const send = (
    message: Message["content"]
): DiscordPart => async context => {
    context.message.channel.send(message)

    return context
}

export const { message } = generateMatchers(["message"])<
    Context
>()

/**
 * The main helper. Used for creating a bot instance that
 * matches events against a part.
 *
 * @param app A part that handles all incoming events
 * @param options An object that, amongst the regular
 * options, providing an option for the token and for
 * whether the bot should listen to itself
 */
export const createDiscordBot = async <
    T extends DiscordPart
>(
    app: T,
    options: DiscordOptions
): Promise<void> => {
    const {
        token,
        listenToSelf,
        ...clientOptions
    } = options

    const client = new Client(clientOptions)
    client.login(token)

    client.on("message", message => {
        if (
            client.user?.id === message.author.id &&
            !listenToSelf
        ) {
            return undefined
        }

        return app({
            _type: "message",
            client,
            message,
            content: message.content
        })
    })
}
