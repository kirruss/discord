import { Client, ClientOptions } from "discord.js"

import { Task } from "@kirrus/core"

interface DiscordOptions extends ClientOptions {
    token: string
    listenToSelf?: boolean
}
type Context = {
    client: Client
}

export type DiscordPart<I = {}, O = Context & I> = Task<
    Context & I,
    O
>

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
}
