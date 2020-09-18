import type { ClientOptions } from "discord.js"

import { Task } from "@kirrus/core"

import type { Context } from "."

export type ADTMember<ADT, Type extends string> = Extract<
    ADT,
    { _type: Type }
>
export interface DiscordOptions extends ClientOptions {
    token: string
    listenToSelf?: boolean
}

/**
 * A task that handles Discord events
 */
export type DiscordPart<I = {}, O = Context & I> = Task<
    Context & I,
    O
>
