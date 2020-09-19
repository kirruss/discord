import { Client } from "discord.js"

import { generateMatchers } from "@kirrus/adt"

import { Context } from "./Context"
import { DiscordOptions, DiscordPart } from "./types"

export const { message, ready } = generateMatchers([
    "message",
    "ready"
])<Context>()

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

    client.on("ready", () => {
        return app({
            _type: "ready",
            client
        })
    })
}

export { Context, MessageContext } from "./Context"
export * from "./helpers"
export { Matcher } from "./Matcher"
export { DiscordPart } from "./types"
